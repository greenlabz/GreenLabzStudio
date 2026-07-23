import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from 'pdf-lib'
import type { AuditResult } from './types.js'

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

function drawBackgroundAndFrame(page: PDFPage, pageNumber: string) {
  // Page background
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colors.background })
  // Outer decorative rounded frame
  page.drawRectangle({
    x: 20,
    y: 20,
    width: pageWidth - 40,
    height: pageHeight - 40,
    borderColor: colors.border,
    borderWidth: 1,
  })
  // Footer text
  page.drawText(`GREENLABZ STUDIO / WEBSITE-ANALYSE`, {
    x: margin,
    y: 34,
    size: 8,
    font: null as any,
    color: colors.muted,
  })
  page.drawText(pageNumber, {
    x: pageWidth - margin - 15,
    y: 34,
    size: 8,
    font: null as any,
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

function drawProcessDiagram(page: PDFPage, y: number, steps: Array<{ num: string; top: string; bottom: string }>, bold: PDFFont, regular: PDFFont) {
  const totalSteps = steps.length
  const startX = margin + 40
  const availableWidth = pageWidth - margin * 2 - 80
  const stepGap = availableWidth / (totalSteps - 1)

  steps.forEach((step, index) => {
    const cx = startX + index * stepGap
    const cy = y - 30

    // Connecting line to next step
    if (index < totalSteps - 1) {
      const nextX = startX + (index + 1) * stepGap
      page.drawLine({
        start: { x: cx + 24, y: cy },
        end: { x: nextX - 24, y: cy },
        thickness: 1,
        color: colors.accent,
      })
    }

    // Outer circle
    page.drawCircle({
      x: cx,
      y: cy,
      size: 24,
      borderColor: colors.accent,
      borderWidth: 1,
      color: colors.panel,
    })

    // Inner text
    page.drawText(step.num, { x: cx - 5, y: cy + 8, size: 7, font: bold, color: colors.accent })
    page.drawText(cleanText(step.top), { x: cx - 12, y: cy - 4, size: 7.5, font: bold, color: colors.text })
    page.drawText(cleanText(step.bottom), { x: cx - 18, y: cy - 38, size: 7, font: regular, color: colors.muted })
  })
}

function drawCallout(page: PDFPage, y: number, title: string, body: string, bold: PDFFont, regular: PDFFont) {
  const boxHeight = 90
  page.drawRectangle({
    x: margin,
    y: y - boxHeight,
    width: pageWidth - margin * 2,
    height: boxHeight,
    color: colors.callout,
    borderColor: colors.border,
    borderWidth: 1,
  })

  page.drawText(cleanText(title), { x: margin + 20, y: y - 28, size: 14, font: bold, color: colors.accent })
  drawWrapped(page, body, regular, 9.5, margin + 20, y - 50, pageWidth - margin * 2 - 40, colors.muted, 14)
}

export async function createAuditPdf(audit: AuditResult) {
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const date = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeZone: 'Europe/Berlin' }).format(new Date(audit.createdAt))

  // -------------------------------------------------------------
  // PAGE 1: COVER
  // -------------------------------------------------------------
  const page1 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page1, '01')
  page1.drawText('[ GREENLABZ STUDIO / QUICK CHECK ]', { x: margin, y: pageHeight - 75, size: 9, font: bold, color: colors.accent })
  page1.drawText('Website-Analyse', { x: margin, y: pageHeight - 140, size: 36, font: bold, color: colors.text })
  page1.drawText(`für ${cleanText(audit.domain)}`, { x: margin, y: pageHeight - 175, size: 20, font: regular, color: colors.accent })

  drawWrapped(
    page1,
    'Prüfe in wenigen Minuten, ob deine Website Vertrauen schafft, gefunden wird und den nächsten Schritt klar macht.',
    regular,
    12,
    margin,
    pageHeight - 225,
    pageWidth - margin * 2,
    colors.muted,
    17
  )

  page1.drawText('15 PUNKTE  /  3 BEREICHE  /  1 KLARER NÄCHSTER SCHRITT', {
    x: margin,
    y: pageHeight - 290,
    size: 9,
    font: bold,
    color: colors.accent,
  })

  // Overview Card
  page1.drawRectangle({
    x: margin,
    y: 160,
    width: pageWidth - margin * 2,
    height: 330,
    color: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
  })
  page1.drawText(String(audit.overallScore), { x: margin + 35, y: 320, size: 105, font: bold, color: colors.accent })
  page1.drawText('GESAMT-SCORE', { x: margin + 250, y: 390, size: 11, font: bold, color: colors.muted })
  page1.drawText(`Status: ${audit.overallScore >= 70 ? 'Stark aufgestellt' : 'Optimierungsbedarf'}`, {
    x: margin + 250,
    y: 360,
    size: 16,
    font: bold,
    color: colors.text,
  })
  page1.drawText(`Erstellt am ${date}`, { x: margin, y: 90, size: 9, font: regular, color: colors.muted })

  // -------------------------------------------------------------
  // PAGE 2: 01 KLARHEIT
  // -------------------------------------------------------------
  const page2 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page2, '02')
  page2.drawText('[ 01 / WEBSITE-ANALYSE ]', { x: margin, y: pageHeight - 75, size: 9, font: bold, color: colors.accent })
  page2.drawText('01  Klarheit', { x: margin, y: pageHeight - 125, size: 30, font: bold, color: colors.text })
  page2.drawText('Versteht man dein Angebot?', { x: margin, y: pageHeight - 155, size: 16, font: regular, color: colors.accent })

  let y2 = pageHeight - 200
  audit.mobile.items.forEach((item) => {
    // Hollow Circle ◯
    page2.drawCircle({ x: margin + 8, y: y2 - 2, size: 6, borderColor: colors.accent, borderWidth: 1, color: colors.background })
    drawWrapped(page2, item.label, bold, 11, margin + 24, y2, pageWidth - margin * 2 - 40, colors.text)
    y2 -= 34
  })

  drawProcessDiagram(page2, y2 - 20, [
    { num: '01', top: '3 SEK.', bottom: 'ERSTER BLICK' },
    { num: '02', top: 'KLAR', bottom: 'ANGEBOT' },
    { num: '03', top: 'VERSTANDEN', bottom: 'NÄCHSTER SCHRITT' },
  ], bold, regular)

  drawCallout(
    page2,
    165,
    'Wenn du hier stockst',
    'Dann braucht deine Startseite wahrscheinlich weniger Text und mehr Führung: Angebot, Vertrauen, Beweis und Handlung in dieser Reihenfolge.',
    bold,
    regular
  )

  // -------------------------------------------------------------
  // PAGE 3: 02 SICHTBARKEIT
  // -------------------------------------------------------------
  const page3 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page3, '03')
  page3.drawText('[ 02 / WEBSITE-ANALYSE ]', { x: margin, y: pageHeight - 75, size: 9, font: bold, color: colors.accent })
  page3.drawText('02  Sichtbarkeit', { x: margin, y: pageHeight - 125, size: 30, font: bold, color: colors.text })
  page3.drawText('Wird deine Seite gefunden?', { x: margin, y: pageHeight - 155, size: 16, font: regular, color: colors.accent })

  let y3 = pageHeight - 200
  audit.seo.items.forEach((item) => {
    page3.drawCircle({ x: margin + 8, y: y3 - 2, size: 6, borderColor: colors.accent, borderWidth: 1, color: colors.background })
    drawWrapped(page3, item.label, bold, 11, margin + 24, y3, pageWidth - margin * 2 - 40, colors.text)
    y3 -= 34
  })

  drawProcessDiagram(page3, y3 - 20, [
    { num: '01', top: 'LEISTUNG+ORT', bottom: 'SUCHSIGNAL' },
    { num: '02', top: 'GEFUNDEN', bottom: 'SICHTBARKEIT' },
    { num: '03', top: 'BESUCH', bottom: 'RICHTIGE SEITE' },
  ], bold, regular)

  drawCallout(
    page3,
    165,
    'Wenn du kaum gefunden wirst',
    'Prüfe zuerst Technik, Leistungsseiten und dein Google-Unternehmensprofil. Sichtbarkeit entsteht durch klare Signale, nicht durch möglichst viele Suchbegriffe.',
    bold,
    regular
  )

  // -------------------------------------------------------------
  // PAGE 4: 03 VERTRAUEN & ANFRAGEN
  // -------------------------------------------------------------
  const page4 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page4, '04')
  page4.drawText('[ 03 / WEBSITE-ANALYSE ]', { x: margin, y: pageHeight - 75, size: 9, font: bold, color: colors.accent })
  page4.drawText('03  Vertrauen & Anfragen', { x: margin, y: pageHeight - 125, size: 30, font: bold, color: colors.text })
  page4.drawText('Entsteht aus Interesse eine Anfrage?', { x: margin, y: pageHeight - 155, size: 16, font: regular, color: colors.accent })

  let y4 = pageHeight - 200
  audit.geo.items.forEach((item) => {
    page4.drawCircle({ x: margin + 8, y: y4 - 2, size: 6, borderColor: colors.accent, borderWidth: 1, color: colors.background })
    drawWrapped(page4, item.label, bold, 11, margin + 24, y4, pageWidth - margin * 2 - 40, colors.text)
    y4 -= 34
  })

  drawProcessDiagram(page4, y4 - 20, [
    { num: '01', top: 'ECHTE BELEGE', bottom: 'ZEIGEN' },
    { num: '02', top: 'VERTRAUEN', bottom: 'ENTSTEHT' },
    { num: '03', top: 'ANFRAGE', bottom: 'WIRD LEICHTER' },
  ], bold, regular)

  drawCallout(
    page4,
    165,
    'Deine Priorität',
    'Zähle deine offenen Kreise. Beginne dort, wo Klarheit, Vertrauen und Handlung gleichzeitig fehlen. Das bringt meist mehr als einzelne Designkorrekturen.',
    bold,
    regular
  )

  // -------------------------------------------------------------
  // PAGE 5: NÄCHSTER SCHRITT
  // -------------------------------------------------------------
  const page5 = pdf.addPage([pageWidth, pageHeight])
  drawBackgroundAndFrame(page5, '05')
  page5.drawText('[ NÄCHSTER SCHRITT ]', { x: margin, y: pageHeight - 75, size: 9, font: bold, color: colors.accent })
  page5.drawText('Du weißt jetzt,', { x: margin, y: pageHeight - 130, size: 32, font: bold, color: colors.text })
  page5.drawText('wo es hakt.', { x: margin, y: pageHeight - 170, size: 32, font: bold, color: colors.accent })

  drawWrapped(
    page5,
    'Markiere die drei Punkte, die du zuerst verbessern willst. Damit hast du eine klare Prioritätenliste statt einer endlosen Baustelle.',
    regular,
    11,
    margin,
    pageHeight - 215,
    pageWidth - margin * 2,
    colors.muted,
    16
  )

  drawProcessDiagram(page5, pageHeight - 270, [
    { num: '01', top: 'KLAR', bottom: '' },
    { num: '02', top: 'SICHTBAR', bottom: '' },
    { num: '03', top: 'VERTRAUEN', bottom: '' },
    { num: '04', top: '25 MIN PLAN', bottom: '' },
  ], bold, regular)

  let y5 = pageHeight - 370
  const points = [
    'Welche drei Änderungen zuerst Wirkung bringen',
    'Was du selbst lösen kannst und wo Unterstützung Sinn ergibt',
    'Ob Relaunch, SEO oder laufende Begleitung der richtige Schritt ist',
  ]
  points.forEach((pt) => {
    page5.drawCircle({ x: margin + 6, y: y5 - 2, size: 4, color: colors.accent })
    drawWrapped(page5, pt, bold, 11, margin + 20, y5, pageWidth - margin * 2 - 30, colors.text)
    y5 -= 32
  })

  // Primary CTA box at bottom
  page5.drawRectangle({
    x: margin,
    y: 100,
    width: pageWidth - margin * 2,
    height: 120,
    color: colors.callout,
    borderColor: colors.border,
    borderWidth: 1,
  })

  page5.drawText('25 MINUTEN. KLARE PRIORITÄTEN.', { x: margin + 20, y: 195, size: 10, font: bold, color: colors.accent })
  drawWrapped(
    page5,
    '25 Minuten deiner Zeit gegen Klarheit, welche drei Änderungen zuerst Wirkung bringen. Kein Verkaufstheater. Keine Verpflichtung.',
    bold,
    11,
    margin + 20,
    175,
    pageWidth - margin * 2 - 40,
    colors.text,
    15
  )

  page5.drawRectangle({
    x: margin + 20,
    y: 115,
    width: pageWidth - margin * 2 - 40,
    height: 32,
    color: colors.accent,
  })
  page5.drawText('KOSTENLOSES ERSTGESPRÄCH BUCHEN', {
    x: margin + 110,
    y: 126,
    size: 10,
    font: bold,
    color: colors.background,
  })

  pdf.setTitle(`Website Audit Report – ${audit.domain}`)
  pdf.setAuthor('GreenLabz Studio')
  pdf.setSubject('Website-Analyse und Quick-Check')
  return Buffer.from(await pdf.save())
}
