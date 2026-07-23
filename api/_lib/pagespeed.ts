import * as cheerio from 'cheerio'
import { clampScore, scoreItems } from './scoring.js'
import type { AuditItem, MobileAuditCategory, SiteDocument } from './types.js'

interface LighthouseAudit {
  score?: number | null
  displayValue?: string
  numericValue?: number
}

interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: { performance?: { score?: number | null } }
    audits?: Record<string, LighthouseAudit>
  }
}

function statusFromScore(score: number | null | undefined) {
  if (score == null) return 'warning' as const
  if (score >= .9) return 'pass' as const
  if (score >= .5) return 'warning' as const
  return 'fail' as const
}

export async function runPageSpeedAudit(site: SiteDocument): Promise<MobileAuditCategory> {
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')
  endpoint.searchParams.set('url', site.finalUrl)
  endpoint.searchParams.set('strategy', 'mobile')
  endpoint.searchParams.append('category', 'performance')
  if (process.env.GOOGLE_PAGESPEED_API_KEY) endpoint.searchParams.set('key', process.env.GOOGLE_PAGESPEED_API_KEY)

  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(45_000) })
    if (!response.ok) throw new Error(`PageSpeed ${response.status}`)
    const data = await response.json() as PageSpeedResponse
    const audits = data.lighthouseResult?.audits ?? {}
    const performance = data.lighthouseResult?.categories?.performance?.score
    const viewport = audits.viewport?.score
    const tapTargets = audits['tap-targets']?.score
    const fontSizes = audits['font-size']?.score
    const lcp = audits['largest-contentful-paint']
    const cls = audits['cumulative-layout-shift']
    const tbt = audits['total-blocking-time']
    const items: AuditItem[] = [
      {
        id: 'performance',
        label: 'Mobile-Geschwindigkeit',
        status: statusFromScore(performance),
        value: performance == null ? null : Math.round(performance * 100),
        explanation: performance == null
          ? 'Die mobile Geschwindigkeit konnte nicht vollständig bewertet werden.'
          : `Google bewertet die mobile Geschwindigkeit mit ${Math.round(performance * 100)} von 100 Punkten.`,
      },
      {
        id: 'viewport',
        label: 'Mobile Ansicht',
        status: statusFromScore(viewport),
        value: viewport,
        explanation: viewport === 1
          ? 'Die Website teilt mobilen Browsern korrekt mit, wie sie dargestellt werden soll.'
          : 'Die mobile Darstellung ist technisch nicht eindeutig eingerichtet.',
      },
      {
        id: 'tap-targets',
        label: 'Klickflächen auf dem Handy',
        status: statusFromScore(tapTargets),
        value: tapTargets,
        explanation: tapTargets === 1
          ? 'Links und Buttons sind auf dem Handy ausreichend groß und gut antippbar.'
          : 'Einige Links oder Buttons liegen zu eng zusammen oder sind zu klein.',
      },
      {
        id: 'font-size',
        label: 'Lesbare Schriftgrößen',
        status: statusFromScore(fontSizes),
        value: fontSizes,
        explanation: fontSizes === 1
          ? 'Die geprüften Texte sind auf dem Handy ohne Zoomen lesbar.'
          : 'Einige Texte sind auf dem Handy zu klein.',
      },
      {
        id: 'lcp',
        label: 'Zeit bis zum Hauptinhalt',
        status: lcp?.numericValue == null ? 'warning' : lcp.numericValue <= 2500 ? 'pass' : lcp.numericValue <= 4000 ? 'warning' : 'fail',
        value: lcp?.displayValue ?? null,
        explanation: lcp?.displayValue
          ? `Der wichtigste sichtbare Inhalt erscheint nach ${lcp.displayValue}.`
          : 'Die Zeit bis zum wichtigsten sichtbaren Inhalt konnte nicht gemessen werden.',
      },
      {
        id: 'cls',
        label: 'Stabilität beim Laden',
        status: cls?.numericValue == null ? 'warning' : cls.numericValue <= .1 ? 'pass' : cls.numericValue <= .25 ? 'warning' : 'fail',
        value: cls?.displayValue ?? null,
        explanation: cls?.numericValue == null
          ? 'Die visuelle Stabilität konnte nicht gemessen werden.'
          : cls.numericValue <= .1
            ? 'Die Inhalte springen beim Laden kaum sichtbar.'
            : 'Einige Inhalte verschieben sich beim Laden sichtbar.',
      },
      {
        id: 'tbt',
        label: 'Reaktionsbereitschaft',
        status: tbt?.numericValue == null ? 'warning' : tbt.numericValue <= 200 ? 'pass' : tbt.numericValue <= 600 ? 'warning' : 'fail',
        value: tbt?.displayValue ?? null,
        explanation: tbt?.displayValue
          ? `Die Seite blockiert Eingaben während des Ladens für insgesamt ${tbt.displayValue}.`
          : 'Die Reaktionsbereitschaft konnte nicht gemessen werden.',
      },
    ]
    return {
      score: performance == null ? scoreItems(items) : clampScore(performance * 100),
      items,
      metrics: {
        lcp: lcp?.displayValue ?? null,
        cls: cls?.displayValue ?? null,
        tbt: tbt?.displayValue ?? null,
      },
      source: 'pagespeed',
    }
  } catch {
    const $ = cheerio.load(site.html)
    const viewport = Boolean($('meta[name="viewport"]').attr('content'))
    const items: AuditItem[] = [
      {
        id: 'performance',
        label: 'Mobile-Geschwindigkeit',
        status: 'warning',
        value: null,
        explanation: 'Google PageSpeed war während des Checks nicht erreichbar. Dieser Punkt bleibt zur Sicherheit offen.',
      },
      {
        id: 'viewport',
        label: 'Mobile Ansicht',
        status: viewport ? 'pass' : 'fail',
        value: viewport,
        explanation: viewport
          ? 'Die Website teilt mobilen Browsern korrekt mit, wie sie dargestellt werden soll.'
          : 'Die mobile Darstellung ist technisch nicht eindeutig eingerichtet.',
      },
      {
        id: 'tap-targets',
        label: 'Klickflächen auf dem Handy',
        status: 'warning',
        explanation: 'Die Größe der Klickflächen konnte ohne PageSpeed-Daten nicht sicher bewertet werden.',
      },
      {
        id: 'font-size',
        label: 'Lesbare Schriftgrößen',
        status: 'warning',
        explanation: 'Die mobilen Schriftgrößen konnten ohne PageSpeed-Daten nicht sicher bewertet werden.',
      },
    ]
    return {
      score: scoreItems(items),
      items,
      metrics: { lcp: null, cls: null, tbt: null },
      source: 'fallback',
    }
  }
}

