import * as cheerio from 'cheerio'
import { safeFetch } from './http.js'
import { scoreItems } from './scoring.js'
import type { AuditCategory, AuditItem, SiteDocument } from './types.js'

const vagueWords = ['innovativ', 'revolutionär', 'führend', 'einzigartig', 'maßgeschneidert', 'zukunftsweisend']
const serviceWords = ['leistung', 'service', 'angebot', 'behandlung', 'montage', 'beratung', 'praxis', 'termin']

export async function runGeoAudit(site: SiteDocument): Promise<AuditCategory> {
  const $ = cheerio.load(site.html)
  const schemaScripts = $('script[type="application/ld+json"]').toArray()
  const schemaText = schemaScripts.map((node) => $(node).text()).join(' ')
  $('script,style,noscript,svg').remove()
  const text = $('body').text().replace(/\s+/g, ' ').trim()
  const lowerText = text.toLocaleLowerCase('de-DE')
  const hasBusinessSchema = /LocalBusiness|Organization|Dentist|MedicalBusiness|ProfessionalService/i.test(schemaText)
  const hasPhone = /(?:\+49|0049|0)[\s()/.-]*\d(?:[\s()/.-]*\d){6,}/.test(text)
  const hasAddress = /\b\d{5}\s+[A-ZÄÖÜ][\p{L}\s.-]{2,}/u.test(text)
  const hasServices = serviceWords.some((word) => lowerText.includes(word))
  const factSentences = text.split(/[.!?]+/).filter((sentence) =>
    /\d|€|Jahr|Ort|Region|Termin|Leistung|Service|Behandlung|Montage/i.test(sentence)
    && sentence.trim().split(/\s+/).length >= 5,
  )
  const vagueHits = vagueWords.filter((word) => lowerText.includes(word)).length
  let llms = false
  try {
    const response = await safeFetch(new URL('/llms.txt', site.finalUrl), 'text/plain,text/markdown')
    const body = response.ok ? await response.text() : ''
    llms = response.ok && body.length > 20 && !/<(?:html|body|script)(?:\s|>)/i.test(body)
  } catch {
    llms = false
  }

  // Der KI-Check misst technische Lesbarkeit und Fakten, nicht die Meinung eines Sprachmodells.
  const items: AuditItem[] = [
    {
      id: 'llms',
      label: 'llms.txt',
      status: llms ? 'pass' : 'warning',
      value: llms,
      explanation: llms
        ? 'Eine llms.txt fasst wichtige Inhalte für KI-Systeme maschinenlesbar zusammen.'
        : 'Es wurde keine llms.txt gefunden. Sie kann KI-Systemen den Einstieg in deine Inhalte erleichtern.',
    },
    {
      id: 'business-schema',
      label: 'Maschinenlesbare Firmendaten',
      status: hasBusinessSchema ? 'pass' : 'fail',
      value: hasBusinessSchema,
      explanation: hasBusinessSchema
        ? 'Firmen- oder Praxisdaten sind strukturiert und maschinenlesbar hinterlegt.'
        : 'Firmen- oder Praxisdaten sind nicht klar als strukturierte Daten ausgezeichnet.',
    },
    {
      id: 'nap',
      label: 'Name, Adresse und Telefon',
      status: hasPhone && hasAddress ? 'pass' : hasPhone || hasAddress ? 'warning' : 'fail',
      value: `${hasPhone ? 'Telefon erkannt' : 'Telefon fehlt'}, ${hasAddress ? 'Adresse erkannt' : 'Adresse fehlt'}`,
      explanation: hasPhone && hasAddress
        ? 'Adresse und Telefonnummer sind im lesbaren Seiteninhalt vorhanden.'
        : 'Adresse oder Telefonnummer sind im lesbaren Seiteninhalt nicht vollständig erkennbar.',
    },
    {
      id: 'services',
      label: 'Leistungen klar benannt',
      status: hasServices ? 'pass' : 'warning',
      value: hasServices,
      explanation: hasServices
        ? 'Deine Website benennt Leistungen so, dass Such- und KI-Systeme sie zuordnen können.'
        : 'Deine konkreten Leistungen sind im Text nicht klar genug erkennbar.',
    },
    {
      id: 'facts',
      label: 'Konkrete Fakten',
      status: factSentences.length >= 3 ? 'pass' : factSentences.length > 0 ? 'warning' : 'fail',
      value: factSentences.length,
      explanation: factSentences.length >= 3
        ? 'Mehrere konkrete Aussagen helfen KI-Systemen, dein Angebot korrekt zusammenzufassen.'
        : 'Es wurden nur wenige konkrete, direkt zitierbare Aussagen über dein Angebot gefunden.',
    },
    {
      id: 'language',
      label: 'Klare statt vage Sprache',
      status: vagueHits === 0 ? 'pass' : vagueHits <= 2 ? 'warning' : 'fail',
      value: vagueHits,
      explanation: vagueHits === 0
        ? 'Die Texte kommen weitgehend ohne typische leere Marketingbegriffe aus.'
        : `Es wurden ${vagueHits} typische Marketingbegriffe ohne direkten Beleg gefunden.`,
    },
  ]

  return { score: scoreItems(items), items }
}
