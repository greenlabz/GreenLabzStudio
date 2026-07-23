import { PDFDocument, StandardFonts, rgb, PDFString, type PDFPage, type PDFFont } from 'pdf-lib'
import type { AuditItem, AuditResult, AuditStatus } from './types.js'

const pageWidth = 595.28
const pageHeight = 841.89
const margin = 44
const colors = {
  background: rgb(.02, .035, .025),
  panel: rgb(.045, .07, .055),
  callout: rgb(.03, .055, .04),
  text: rgb(.96, .98, .96),
  muted: rgb(.65, .75, .68),
  accent: rgb(0, .8, .416),
  pass: rgb(0, .8, .416),
  warning: rgb(.95, .68, .2),
  fail: rgb(.92, .3, .3),
  line: rgb(.08, .16, .11),
  border: rgb(0, .45, .22),
}

function addLinkAnnotation(page: PDFPage, uri: string, x: number, y: number, width: number, height: number) {
  const linkAnnotation = page.doc.context.register(
    page.doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      C: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(uri),
      },
    })
  )
  page.node.addAnnot(linkAnnotation)
}

interface ItemInsight {
  pass: { psy: string; solution: string }
  fail: { psy: string; solution: string }
}

const itemInsights: Record<string, ItemInsight> = {
  performance: {
    pass: {
      psy: 'Psychologie: Hohe Ladezeit erzeugt sofortiges Vertrauen und Unterbewusstsein von Spitzenqualität.',
      solution: 'Lösung: Assets und Caching-Strategie beibehalten.',
    },
    fail: {
      psy: 'Psychologie: Jede Sekunde Ladezeit erhöht die Abbrecherquote um 20%. Kunden schlussfolgern: Träge Seite = träger Service.',
      solution: 'Lösung: Bilder in WebP umwandeln, Skripte verzögert laden und Caching aktivieren.',
    },
  },
  viewport: {
    pass: {
      psy: 'Psychologie: Sauberes mobiles Responsive-Verhalten erzeugt sofortige Barrierefreiheit.',
      solution: 'Lösung: Darstellung auf allen Displaygrößen beibehalten.',
    },
    fail: {
      psy: 'Psychologie: Auf dem Handy zoomen zu müssen erzeugt kognitive Frustration. Der Interessent verlässt die Seite sofort.',
      solution: 'Lösung: Viewport-Meta-Tag konfigurieren und flexibles Grid-Design nutzen.',
    },
  },
  'tap-targets': {
    pass: {
      psy: 'Psychologie: Müheloses Antippen führt den Kunden ohne Barrieren direkt zur Kontaktaufnahme.',
      solution: 'Lösung: Button-Größen großzügig belassen.',
    },
    fail: {
      psy: 'Psychologie: Fehlklicks erzeugen Unmut. Das Kaufinteresse bricht im Entscheidungsmoment ab.',
      solution: 'Lösung: Klickflächen auf mindestens 48x48px vergrößern und Abstände erhöhen.',
    },
  },
  'font-size': {
    pass: {
      psy: 'Psychologie: Mühelose Lesbarkeit verhindert kognitive Ermüdung.',
      solution: 'Lösung: Typografie-Standard beibehalten.',
    },
    fail: {
      psy: 'Psychologie: Zu kleine Texte überfordern das Auge. Der Besucher stoppt den Lesefluss.',
      solution: 'Lösung: Schriftgrößen auf mobilen Geräten auf mindestens 16px anheben.',
    },
  },
  lcp: {
    pass: {
      psy: 'Psychologie: Sofort sichtbarer Hauptinhalt hält die Aufmerksamkeit zu 100% gebunden.',
      solution: 'Lösung: Hauptinhalte weiter priorisiert laden.',
    },
    fail: {
      psy: 'Psychologie: Baut sich der Hero-Bereich zu langsam auf, zweifelt der Nutzer am Nutzen und springt ab.',
      solution: 'Lösung: Hero-Bilder komprimieren und kritische CSS inline einbinden.',
    },
  },
  cls: {
    pass: {
      psy: 'Psychologie: Visuelle Stabilität wirkt ruhig, souverän und technisch ausgereift.',
      solution: 'Lösung: Layout-Stabilität sichern.',
    },
    fail: {
      psy: 'Psychologie: Springende Elemente wirken unprofessionell und führen zu Fehlklicks.',
      solution: 'Lösung: Feste Abmessungen für Bilder und dynamische Blöcke hinterlegen.',
    },
  },

  title: {
    pass: {
      psy: 'Psychologie: Ein prägnanter Titel zieht den Blick in den Google-Ergebnissen sofort auf sich.',
      solution: 'Lösung: Seitentitel beibehalten.',
    },
    fail: {
      psy: 'Psychologie: Ohne aussagekräftigen Titel geht dein Ergebnis bei Google unter. Nutzer klicken zum Mitbewerber.',
      solution: 'Lösung: Seitentitel (30-60 Zeichen) mit Kernleistung & Ort formulieren.',
    },
  },
  description: {
    pass: {
      psy: 'Psychologie: Eine starke Meta-Beschreibung wirkt wie ein kostenloser Werbebanner bei Google.',
      solution: 'Lösung: Beschreibung optimiert halten.',
    },
    fail: {
      psy: 'Psychologie: Fehlt die Vorschau, wählt Google wahllose Textfetzen. Das senkt die Klickrate drastisch.',
      solution: 'Lösung: Meta-Description (120-160 Zeichen) mit Nutzenversprechen hinterlegen.',
    },
  },
  h1: {
    pass: {
      psy: 'Psychologie: Die eindeutige H1 beantwortet sofort die Frage: „Bin ich hier richtig?“',
      solution: 'Lösung: Klare H1 beibehalten.',
    },
    fail: {
      psy: 'Psychologie: Ohne eindeutige Hauptüberschrift entsteht Verwirrung. Der Besucher klickt wieder zurück.',
      solution: 'Lösung: Genau eine klare H1-Überschrift mit der Kernleistung definieren.',
    },
  },
  headings: {
    pass: {
      psy: 'Psychologie: Eine klare Überschriften-Hierarchie ermöglicht schnelles Überfliegen und Entscheiden.',
      solution: 'Lösung: Zwischenüberschriften-Struktur pflegen.',
    },
    fail: {
      psy: 'Psychologie: Unstrukturierte Textwüsten überfordern das Gehirn. Entscheider brechen das Lesen ab.',
      solution: 'Lösung: Logische H2- und H3-Zwischenüberschriften für Abschnitte nutzen.',
    },
  },
  alt: {
    pass: {
      psy: 'Psychologie: Bildbeschreibungen stärken die Sichtbarkeit und vermitteln Barrierefreiheit.',
      solution: 'Lösung: Alt-Texte konsequent pflegen.',
    },
    fail: {
      psy: 'Psychologie: Bilder ohne Alt-Texte sind für Suchmaschinen unsichtbar. Wertvoller Traffic geht verloren.',
      solution: 'Lösung: Beschreibende Alt-Texte bei allen Bildern hinterlegen.',
    },
  },
  schema: {
    pass: {
      psy: 'Psychologie: Maschinenlesbare Firmendaten ermöglichen auffällige Rich-Snippets in den Suchergebnissen.',
      solution: 'Lösung: Schema-Daten aktuell halten.',
    },
    fail: {
      psy: 'Psychologie: Ohne strukturierte Daten wirkt dein Unternehmen bei Suchmaschinen weniger etabliert.',
      solution: 'Lösung: JSON-LD Unternehmensdaten (LocalBusiness) einbinden.',
    },
  },

  llms: {
    pass: {
      psy: 'Psychologie: KI-Systeme wie ChatGPT können deine Leistungen direkt und fehlerfrei empfehlen.',
      solution: 'Lösung: llms.txt bei Angebotserweiterungen pflegen.',
    },
    fail: {
      psy: 'Psychologie: Wenn KI-Assistenten deine Inhalte nicht erfassen, empfehlen sie stattdessen deine Konkurrenten.',
      solution: 'Lösung: Eine llms.txt Datei im Root-Verzeichnis bereitstellen.',
    },
  },
  'business-schema': {
    pass: {
      psy: 'Psychologie: Strukturierte Daten sichern deine Positionierung in regionalen KI-Suchen.',
      solution: 'Lösung: Schema-Qualität aufrechterhalten.',
    },
    fail: {
      psy: 'Psychologie: KI-Modelle können dein Angebot regional nicht zuordnen und übergehen deine Website.',
      solution: 'Lösung: Strukturiertes Firmenschema mit Adresse und Leistungsprofil ergänzen.',
    },
  },
  nap: {
    pass: {
      psy: 'Psychologie: Leicht auffindbare Kontaktdaten vermitteln maximale Sicherheit und Seriosität.',
      solution: 'Lösung: Kontaktdaten prominent platziert lassen.',
    },
    fail: {
      psy: 'Psychologie: Versteckte Kontaktdaten lösen unbewusstes Misstrauen aus. Interessenten fragen nicht an.',
      solution: 'Lösung: Telefonnummer und Adresse im sichtbaren Bereich platzieren.',
    },
  },
  services: {
    pass: {
      psy: 'Psychologie: Präzise benannte Leistungen führen den Kunden direkt zur Anfrageentscheidung.',
      solution: 'Lösung: Leistungsangebot klar strukturiert lassen.',
    },
    fail: {
      psy: 'Psychologie: Vage Formulierungen lassen Kunden zweifeln, ob du ihr konkretes Problem lösen kannst.',
      solution: 'Lösung: Kernleistungen mit konkreten Begriffen klar beschreiben.',
    },
  },
  facts: {
    pass: {
      psy: 'Psychologie: Konkrete Zahlen und Fakten überzeugen rational und sichern den Zuspruch.',
      solution: 'Lösung: Fakten und Erfolge weiterhin herausstellen.',
    },
    fail: {
      psy: 'Psychologie: Ohne Belege wirkt der Auftritt beliebig. Der Kunde sucht nach harten Fakten beim Wettbewerb.',
      solution: 'Lösung: Konkrete Kennzahlen, Erfahrungswerte und Resultate veröffentlichen.',
    },
  },
  language: {
    pass: {
      psy: 'Psychologie: Ehrliche, direkte Sprache baut echtes Vertrauen und Nähe auf.',
      solution: 'Lösung: Authentische Tonalität bewahren.',
    },
    fail: {
      psy: 'Psychologie: Hohle Phrasen („innovativ“, „führend“) erzeugen Skepsis und entlarven fehlenden Inhalt.',
      solution: 'Lösung: Marketing-Floskeln durch konkrete Beschreibungen deines Nutzens ersetzen.',
    },
  },
}

function drawBackgroundAndFrame(page: PDFPage, pageNumber: string, font: PDFFont) {
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colors.background })
  page.drawRectangle({
    x: 20,
    y: 20,
    width: pageWidth - 40,
    height: pageHeight - 40,
    borderColor: colors.border,
    borderWidth: 1,
  })
  page.drawText(`GREENLABZ STUDIO / WEBSITE-ANALYSE`, {
    x: margin,
    y: 34,
    size: 8,
    font,
    color: colors.muted,
  })
  page.drawText(pageNumber, {
    x: pageWidth - margin - 15,
    y: 34,
    size: 8,
    font,
    color: colors.muted,
  })
}

function cleanText(value: string) {
  return value.replace(/[^\u0020-\u007E\u00A0-\u00FF\u2013\u2014\u2018\u2019\u201C\u201D]/g, '')
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = cleanText(text).split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate
    } else {
      if (line) lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines
}

function drawWrapped(page: PDFPage, text: string, font: PDFFont, size: number, x: number, y: number, maxWidth: number, color = colors.text, lineHeight = size * 1.35) {
  const lines = wrapText(text, font, size, maxWidth)
  lines.forEach((line, index) => page.drawText(line, { x, y: y - index * lineHeight, size, font, color }))
  return y - lines.length * lineHeight
}

function statusBadge(status: AuditStatus) {
  if (status === 'pass') return { label: '[ OK ]', color: colors.pass }
  if (status === 'warning') return { label: '[ HINWEIS ]', color: colors.warning }
  return { label: '[ FEHLT ]', color: colors.fail }
}

function drawItemCard(page: PDFPage, item: AuditItem, y: number, bold: PDFFont, regular: PDFFont) {
  const badge = statusBadge(item.status)
  const defaultInsight = {
    pass: { psy: 'Psychologie: Punkt ist optimal gelöst und stärkt das Vertrauen.', solution: 'Lösung: Qualität beibehalten.' },
    fail: { psy: 'Psychologie: Schwachstelle erzeugt unbewussten Abruf-Widerstand.', solution: 'Lösung: Punkt zeitnah optimieren.' },
  }
  const insightMap = itemInsights[item.id] || defaultInsight
  const insight = item.status === 'pass' ? insightMap.pass : insightMap.fail

  const cardHeight = 60
  page.drawRectangle({
    x: margin,
    y: y - cardHeight,
    width: pageWidth - margin * 2,
    height: cardHeight,
    color: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
  })

  // Status Badge
  page.drawText(badge.label, { x: margin + 12, y: y - 20, size: 8, font: bold, color: badge.color })

  // Item Title
  page.drawText(cleanText(item.label), { x: margin + 80, y: y - 20, size: 10.5, font: bold, color: colors.text })

  // Psychological Impact
  drawWrapped(page, insight.psy, regular, 8.5, margin + 80, y - 34, pageWidth - margin * 2 - 95, colors.muted, 11)

  // Recommended Solution
  drawWrapped(page, insight.solution, bold, 8.5, margin + 80, y - 47, pageWidth - margin * 2 - 95, colors.accent, 11)

  return y - cardHeight - 8
}

function drawCallout(page: PDFPage, y: number, title: string, body: string, bold: PDFFont, regular: PDFFont) {
  const boxHeight = 75
  page.drawRectangle({
    x: margin,
    y: y - boxHeight,
    width: pageWidth - margin * 2,
    height: boxHeight,
    color: colors.callout,
    borderColor: colors.border,
    borderWidth: 1,
  })

  page.drawText(cleanText(title), { x: margin + 18, y: y - 24, size: 12, font: bold, color: colors.accent })
  drawWrapped(page, body, regular, 9, margin + 18, y - 44, pageWidth - margin * 2 - 36, colors.muted, 13)
}

export async function createAuditPdf(audit: AuditResult) {
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const date = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeZone: 'Europe/Berlin' }).format(new Date(audit.createdAt))

  // -------------------------------------------------------------
  // PAGE 1: COVER & OVERVIEW
  // -------------------------------------------------------------
  const page1 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page1, '01', regular)
  page1.drawText('[ GREENLABZ STUDIO / WEBSITE-AUDIT REPORT ]', { x: margin, y: pageHeight - 75, size: 9, font: bold, color: colors.accent })
  page1.drawText('Website-Analyse', { x: margin, y: pageHeight - 130, size: 34, font: bold, color: colors.text })
  page1.drawText(`für ${cleanText(audit.domain)}`, { x: margin, y: pageHeight - 165, size: 18, font: regular, color: colors.accent })

  drawWrapped(
    page1,
    'Psychologische Auswertung & konkrete Handlungsempfehlungen für maximale Vertrauensbildung und Anfragen.',
    regular,
    11,
    margin,
    pageHeight - 205,
    pageWidth - margin * 2,
    colors.muted,
    16
  )

  // Overall Score Card
  page1.drawRectangle({
    x: margin,
    y: 420,
    width: pageWidth - margin * 2,
    height: 180,
    color: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
  })
  page1.drawText(String(audit.overallScore), { x: margin + 30, y: 470, size: 90, font: bold, color: colors.accent })
  page1.drawText('GESAMT-SCORE', { x: margin + 220, y: 550, size: 11, font: bold, color: colors.muted })
  page1.drawText(`Status: ${audit.overallScore >= 70 ? 'Stark aufgestellt' : 'Optimierungsbedarf'}`, {
    x: margin + 220,
    y: 525,
    size: 15,
    font: bold,
    color: colors.text,
  })
  drawWrapped(
    page1,
    'Jeder gemessene Punkt auf den Folgeseiten enthält die psychologische Auswirkung auf deine Kunden sowie die direkte technische Lösung.',
    regular,
    9.5,
    margin + 220,
    495,
    pageWidth - margin * 2 - 240,
    colors.muted,
    14
  )

  // 3 Category Score Overview Cards
  const categories = [
    { title: '01 Klarheit & Mobile', score: audit.mobile.score },
    { title: '02 Sichtbarkeit & SEO', score: audit.seo.score },
    { title: '03 Vertrauen & KI', score: audit.geo.score },
  ]
  categories.forEach((cat, idx) => {
    const x = margin + idx * 172
    page1.drawRectangle({ x, y: 220, width: 160, height: 160, color: colors.panel, borderColor: colors.line, borderWidth: 1 })
    page1.drawText(String(cat.score), { x: x + 20, y: 290, size: 48, font: bold, color: colors.accent })
    page1.drawText(cat.title, { x: x + 16, y: 250, size: 9.5, font: bold, color: colors.text })
    page1.drawText(`${cat.score >= 70 ? 'Optimal' : 'Handlungsbedarf'} (max. 100)`, { x: x + 16, y: 234, size: 8.5, font: regular, color: colors.muted })
  })

  page1.drawText('* Maximal 100 erreichbare Punkte pro Kategorie', { x: margin + 4, y: 198, size: 8, font: regular, color: colors.muted })

  page1.drawText(`Erstellt am ${date} · GreenLabz Studio Audit`, { x: margin, y: 70, size: 9, font: regular, color: colors.muted })

  // -------------------------------------------------------------
  // PAGE 2: 01 KLARHEIT & MOBILE (6 ITEM INSIGHTS)
  // -------------------------------------------------------------
  const page2 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page2, '02', regular)
  page2.drawText('[ 01 / WEBSITE-ANALYSE ]', { x: margin, y: pageHeight - 65, size: 9, font: bold, color: colors.accent })
  page2.drawText('01  Klarheit & Mobile', { x: margin, y: pageHeight - 105, size: 24, font: bold, color: colors.text })
  page2.drawText('Versteht der Nutzer dein Angebot auf dem Handy in 3 Sekunden?', { x: margin, y: pageHeight - 128, size: 12, font: regular, color: colors.accent })

  let y2 = pageHeight - 155
  audit.mobile.items.forEach((item) => {
    y2 = drawItemCard(page2, item, y2, bold, regular)
  })

  drawCallout(
    page2,
    115,
    'Psychologisches Fazit: Klarheit',
    'Nutzer treffen Kaufentscheidungen auf dem Handy intuitiv in wenigen Sekunden. Jede technische Hürde zerstört die Conversion-Rate.',
    bold,
    regular
  )

  // -------------------------------------------------------------
  // PAGE 3: 02 SICHTBARKEIT & SEO (6 ITEM INSIGHTS)
  // -------------------------------------------------------------
  const page3 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page3, '03', regular)
  page3.drawText('[ 02 / WEBSITE-ANALYSE ]', { x: margin, y: pageHeight - 65, size: 9, font: bold, color: colors.accent })
  page3.drawText('02  Sichtbarkeit & SEO', { x: margin, y: pageHeight - 105, size: 24, font: bold, color: colors.text })
  page3.drawText('Wird deine Website bei Google von echten Kaufinteressenten gefunden?', { x: margin, y: pageHeight - 128, size: 12, font: regular, color: colors.accent })

  let y3 = pageHeight - 155
  audit.seo.items.forEach((item) => {
    y3 = drawItemCard(page3, item, y3, bold, regular)
  })

  drawCallout(
    page3,
    115,
    'Psychologisches Fazit: Sichtbarkeit',
    'Wer bei Google nicht auf Seite 1 steht, existiert für Neukunden nicht. Relevante Snippets ziehen qualifizierte Käufer an.',
    bold,
    regular
  )

  // -------------------------------------------------------------
  // PAGE 4: 03 VERTRAUEN & KI-READY (6 ITEM INSIGHTS)
  // -------------------------------------------------------------
  const page4 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page4, '04', regular)
  page4.drawText('[ 03 / WEBSITE-ANALYSE ]', { x: margin, y: pageHeight - 65, size: 9, font: bold, color: colors.accent })
  page4.drawText('03  Vertrauen & KI-Sichtbarkeit', { x: margin, y: pageHeight - 105, size: 24, font: bold, color: colors.text })
  page4.drawText('Werden deine Fakten von Kunden und KI-Systemen wie ChatGPT verstanden?', { x: margin, y: pageHeight - 128, size: 12, font: regular, color: colors.accent })

  let y4 = pageHeight - 155
  audit.geo.items.forEach((item) => {
    y4 = drawItemCard(page4, item, y4, bold, regular)
  })

  drawCallout(
    page4,
    115,
    'Psychologisches Fazit: Vertrauen',
    'Vertrauen entsteht durch Beweise, klare Fakten und maschinenlesbare Signale. Fehlen sie, entscheidet sich der Kunde für den Mitbewerber.',
    bold,
    regular
  )

  // -------------------------------------------------------------
  // PAGE 5: NÄCHSTER SCHRITT & UMSETZUNG
  // -------------------------------------------------------------
  const page5 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page5, '05', regular)
  page5.drawText('[ NÄCHSTER SCHRITT ]', { x: margin, y: pageHeight - 75, size: 9, font: bold, color: colors.accent })
  page5.drawText('Du weißt jetzt,', { x: margin, y: pageHeight - 130, size: 32, font: bold, color: colors.text })
  page5.drawText('wo es hakt.', { x: margin, y: pageHeight - 170, size: 32, font: bold, color: colors.accent })

  drawWrapped(
    page5,
    'Markiere die drei rot gekennzeichneten Punkte, die du zuerst verbessern willst. Damit hast du eine klare Prioritätenliste statt einer endlosen Baustelle.',
    regular,
    11,
    margin,
    pageHeight - 215,
    pageWidth - margin * 2,
    colors.muted,
    16
  )

  let y5 = pageHeight - 280
  const points = [
    '1. Welche 3 Optimierungen sofort mehr Anfragen auslösen',
    '2. Wie du Schwachstellen ohne teuren Relaunch schnell behebst',
    '3. Ob SEO, Mobile-Tuning oder KI-Optimierung der wichtigste Hebel ist',
  ]
  points.forEach((pt) => {
    page5.drawCircle({ x: margin + 6, y: y5 - 2, size: 4, color: colors.accent })
    drawWrapped(page5, pt, bold, 11, margin + 20, y5, pageWidth - margin * 2 - 30, colors.text)
    y5 -= 36
  })

  // Primary CTA Box (Gefuehrtes Design im Website-Stil)
  page5.drawRectangle({
    x: margin,
    y: 95,
    width: pageWidth - margin * 2,
    height: 165,
    color: colors.callout,
    borderColor: colors.border,
    borderWidth: 1,
  })

  page5.drawText('25 MINUTEN. KLARE PRIORITÄTEN.', { x: margin + 24, y: 234, size: 9.5, font: bold, color: colors.accent })
  drawWrapped(
    page5,
    '25 Minuten deiner Zeit gegen Klarheit, welche 3 Änderungen deine Website sofort in eine Kundenmaschine verwandeln. Kein Verkaufstheater.',
    bold,
    10.5,
    margin + 24,
    215,
    pageWidth - margin * 2 - 48,
    colors.text,
    15
  )

  const calendarUrl = 'https://greenlabz-studio.de/#calendar'

  // Primary Pill Button style (Dunkler Hintergund + Smaragd-Rahmen)
  const buttonWidth = pageWidth - margin * 2 - 48
  const buttonX = margin + 24
  const buttonY = 138
  const buttonHeight = 40

  page5.drawRectangle({
    x: buttonX,
    y: buttonY,
    width: buttonWidth,
    height: buttonHeight,
    color: rgb(.04, .08, .05),
    borderColor: colors.accent,
    borderWidth: 1.5,
  })

  page5.drawText('KOSTENLOSES ERSTGESPRÄCH BUCHEN', {
    x: buttonX + 104,
    y: buttonY + 15,
    size: 10.5,
    font: bold,
    color: colors.text,
  })

  // Interaktiven PDF-Hyperlink auf den gesamten CTA-Button legen
  addLinkAnnotation(page5, calendarUrl, buttonX, buttonY, buttonWidth, buttonHeight)

  // Link auf den Kalender-Bereich der Website
  page5.drawText('Zum Kalender-Bereich auf der Website: https://greenlabz-studio.de/#calendar', {
    x: margin + 24,
    y: 110,
    size: 8.5,
    font: regular,
    color: colors.accent,
  })

  // Interaktiven PDF-Hyperlink auf die URL-Zeile legen
  addLinkAnnotation(page5, calendarUrl, margin + 24, 105, buttonWidth, 18)

  pdf.setTitle(`Website Audit Report – ${audit.domain}`)
  pdf.setAuthor('GreenLabz Studio')
  pdf.setSubject('Website-Analyse, Psychologische Auswertung & Handlungsempfehlungen')
  return Buffer.from(await pdf.save())
}
