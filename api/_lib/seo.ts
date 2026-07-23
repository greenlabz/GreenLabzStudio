import * as cheerio from 'cheerio'
import { safeFetch } from './http.js'
import { scoreItems } from './scoring.js'
import type { AuditCategory, AuditItem, SiteDocument } from './types.js'

function lengthStatus(length: number, minimum: number, maximum: number) {
  if (!length) return 'fail' as const
  return length >= minimum && length <= maximum ? 'pass' as const : 'warning' as const
}

async function resourceStatus(baseUrl: string, path: string, kind: 'robots' | 'sitemap') {
  try {
    const response = await safeFetch(new URL(path, baseUrl), 'text/plain,application/xml,text/xml,*/*')
    if (!response.ok) return false
    const body = await response.text()
    if (kind === 'robots') return /(?:^|\n)\s*(?:user-agent|sitemap)\s*:/i.test(body)
    return /<(?:urlset|sitemapindex)(?:\s|>)/i.test(body)
  } catch {
    return false
  }
}

export async function runSeoAudit(site: SiteDocument): Promise<AuditCategory> {
  const $ = cheerio.load(site.html)
  const title = $('title').first().text().trim()
  const description = $('meta[name="description"]').attr('content')?.trim() ?? ''
  const h1Count = $('h1').length
  const h2Count = $('h2').length
  const images = $('img').toArray()
  const missingAlt = images.filter((image) => !($(image).attr('alt') ?? '').trim()).length
  const schemas = $('script[type="application/ld+json"]').length
  const [robots, sitemap] = await Promise.all([
    resourceStatus(site.finalUrl, '/robots.txt', 'robots'),
    resourceStatus(site.finalUrl, '/sitemap.xml', 'sitemap'),
  ])

  // SEO-Basics werden bewusst als verständliche Einzelprüfungen bewertet.
  const items: AuditItem[] = [
    {
      id: 'title',
      label: 'Seitentitel',
      status: lengthStatus(title.length, 30, 60),
      value: title.length,
      explanation: !title
        ? 'Deine Startseite hat keinen Seitentitel. Google und Besucher können sie dadurch schlechter einordnen.'
        : title.length < 30 || title.length > 60
          ? `Dein Seitentitel hat ${title.length} Zeichen. Gut lesbar sind meistens 30 bis 60 Zeichen.`
          : 'Dein Seitentitel ist vorhanden und hat eine sinnvolle Länge.',
    },
    {
      id: 'description',
      label: 'Google-Beschreibung',
      status: lengthStatus(description.length, 120, 160),
      value: description.length,
      explanation: !description
        ? 'Deine Meta-Beschreibung fehlt. Google entscheidet sonst selbst, was in der Suche unter deinem Titel steht, und das ist meistens nicht in deinem Sinne.'
        : description.length < 120 || description.length > 160
          ? `Deine Google-Beschreibung hat ${description.length} Zeichen. 120 bis 160 Zeichen sind meist klarer.`
          : 'Deine Google-Beschreibung ist vorhanden und sinnvoll lang.',
    },
    {
      id: 'h1',
      label: 'Klare Hauptüberschrift',
      status: h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warning',
      value: h1Count,
      explanation: h1Count === 1
        ? 'Deine Seite hat genau eine klare Hauptüberschrift.'
        : h1Count === 0
          ? 'Deiner Startseite fehlt eine klar erkennbare Hauptüberschrift.'
          : `Deine Seite nutzt ${h1Count} Hauptüberschriften. Eine klare Hauptüberschrift wäre leichter zu verstehen.`,
    },
    {
      id: 'headings',
      label: 'Überschriften-Struktur',
      status: h2Count > 0 ? 'pass' : 'warning',
      value: h2Count,
      explanation: h2Count > 0
        ? `Deine Inhalte sind mit ${h2Count} Zwischenüberschriften gegliedert.`
        : 'Deine Inhalte haben keine erkennbare Gliederung mit Zwischenüberschriften.',
    },
    {
      id: 'alt',
      label: 'Bildbeschreibungen',
      status: images.length === 0 || missingAlt === 0 ? 'pass' : missingAlt === images.length ? 'fail' : 'warning',
      value: `${missingAlt}/${images.length}`,
      explanation: images.length === 0
        ? 'Auf der Startseite wurden keine klassischen Bilder gefunden.'
        : missingAlt === 0
          ? 'Alle gefundenen Bilder haben eine Beschreibung für Google und Screenreader.'
          : missingAlt === images.length
            ? 'Kein einziges Bild auf deiner Seite hat eine Beschreibung hinterlegt (Alt-Text). Für Google sind das unsichtbare Bilder.'
            : `${missingAlt} von ${images.length} Bildern haben keine Beschreibung für Google und Screenreader.`,
    },
    {
      id: 'schema',
      label: 'Strukturierte Unternehmensdaten',
      status: schemas > 0 ? 'pass' : 'fail',
      value: schemas,
      explanation: schemas > 0
        ? 'Deine Website liefert strukturierte Daten, die Suchmaschinen direkt lesen können.'
        : 'Deine Website liefert Suchmaschinen keine strukturierten Unternehmensdaten.',
    },
    {
      id: 'robots',
      label: 'robots.txt',
      status: robots ? 'pass' : 'warning',
      value: robots,
      explanation: robots
        ? 'Eine robots.txt ist erreichbar und gibt Suchmaschinen technische Hinweise.'
        : 'Es wurde keine erreichbare robots.txt gefunden.',
    },
    {
      id: 'sitemap',
      label: 'XML-Sitemap',
      status: sitemap ? 'pass' : 'warning',
      value: sitemap,
      explanation: sitemap
        ? 'Eine Sitemap ist erreichbar und hilft Google, deine Seiten zu finden.'
        : 'Es wurde keine Sitemap unter /sitemap.xml gefunden.',
    },
    {
      id: 'https',
      label: 'Sichere Verbindung',
      status: new URL(site.finalUrl).protocol === 'https:' ? 'pass' : 'fail',
      value: new URL(site.finalUrl).protocol,
      explanation: new URL(site.finalUrl).protocol === 'https:'
        ? 'Deine Seite ist verschlüsselt (HTTPS). Nutzer und Google vertrauen dir dafür.'
        : 'Deine Website wird nicht sicher über HTTPS ausgeliefert.',
    },
  ]

  return { score: scoreItems(items), items }
}
