import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from 'pdf-lib'
import type { AuditCategory, AuditResult, AuditStatus } from './types.js'

const pageWidth = 595.28
const pageHeight = 841.89
const margin = 48
const colors = {
  background: rgb(.035, .045, .04),
  panel: rgb(.06, .085, .07),
  text: rgb(.94, .97, .95),
  muted: rgb(.62, .68, .64),
  accent: rgb(0, .8, .416),
  pass: rgb(0, .8, .416),
  warning: rgb(.95, .68, .2),
  fail: rgb(.92, .3, .3),
  line: rgb(.15, .2, .17),
}

function drawBackground(page: PDFPage) {
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colors.background })
  page.drawRectangle({ x: 0, y: pageHeight - 10, width: pageWidth, height: 10, color: colors.accent })
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

function scoreColor(score: number) {
  if (score >= 90) return colors.pass
  if (score >= 50) return colors.warning
  return colors.fail
}

function scoreComment(score: number) {
  if (score >= 90) return 'Gut'
  if (score >= 50) return 'Verbesserungsbedarf'
  return 'Kritisch'
}

function statusLabel(status: AuditStatus) {
  if (status === 'pass') return 'OK'
  if (status === 'warning') return 'HINWEIS'
  return 'FEHLT'
}

function statusColor(status: AuditStatus) {
  return colors[status]
}

function drawHeader(page: PDFPage, title: string, regular: PDFFont, bold: PDFFont) {
  drawBackground(page)
  page.drawText('GREENLABZ STUDIO', { x: margin, y: pageHeight - 52, size: 10, font: bold, color: colors.accent })
  page.drawText(title, { x: margin, y: pageHeight - 93, size: 24, font: bold, color: colors.text })
  page.drawLine({ start: { x: margin, y: pageHeight - 112 }, end: { x: pageWidth - margin, y: pageHeight - 112 }, thickness: 1, color: colors.line })
  page.drawText('Website Audit', { x: pageWidth - margin - 76, y: 28, size: 8, font: regular, color: colors.muted })
}

function addCategoryPages(pdf: PDFDocument, categoryName: string, intro: string, category: AuditCategory, regular: PDFFont, bold: PDFFont) {
  let page = pdf.addPage([pageWidth, pageHeight])
  drawHeader(page, categoryName, regular, bold)
  let y = drawWrapped(page, intro, regular, 11, margin, pageHeight - 144, pageWidth - margin * 2, colors.muted, 16) - 14

  for (const item of category.items) {
    const explanationLines = wrapText(item.explanation, regular, 9.5, pageWidth - margin * 2 - 28)
    const boxHeight = Math.max(70, 45 + explanationLines.length * 13)
    if (y - boxHeight < 58) {
      page = pdf.addPage([pageWidth, pageHeight])
      drawHeader(page, categoryName, regular, bold)
      y = pageHeight - 140
    }
    page.drawRectangle({
      x: margin,
      y: y - boxHeight,
      width: pageWidth - margin * 2,
      height: boxHeight,
      color: colors.panel,
      borderColor: colors.line,
      borderWidth: 1,
    })
    page.drawText(statusLabel(item.status), { x: margin + 14, y: y - 23, size: 8, font: bold, color: statusColor(item.status) })
    page.drawText(cleanText(item.label), { x: margin + 78, y: y - 24, size: 12, font: bold, color: colors.text })
    explanationLines.forEach((line, index) => {
      page.drawText(line, { x: margin + 78, y: y - 43 - index * 13, size: 9.5, font: regular, color: colors.muted })
    })
    y -= boxHeight + 10
  }
}

export async function createAuditPdf(audit: AuditResult) {
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const date = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeZone: 'Europe/Berlin' }).format(new Date(audit.createdAt))

  const cover = pdf.addPage([pageWidth, pageHeight])
  drawBackground(cover)
  cover.drawText('GREENLABZ STUDIO', { x: margin, y: pageHeight - 58, size: 11, font: bold, color: colors.accent })
  cover.drawText('Website Audit Report', { x: margin, y: pageHeight - 170, size: 34, font: bold, color: colors.text })
  cover.drawText(`für ${cleanText(audit.domain)}`, { x: margin, y: pageHeight - 215, size: 22, font: regular, color: colors.muted })
  cover.drawRectangle({ x: margin, y: 260, width: pageWidth - margin * 2, height: 210, color: colors.panel, borderColor: colors.line, borderWidth: 1 })
  cover.drawText(String(audit.overallScore), { x: margin + 30, y: 325, size: 92, font: bold, color: scoreColor(audit.overallScore) })
  cover.drawText('GESAMT-SCORE', { x: margin + 230, y: 382, size: 11, font: bold, color: colors.muted })
  drawWrapped(
    cover,
    scoreComment(audit.overallScore),
    bold,
    18,
    margin + 230,
    340,
    pageWidth - margin * 2 - 230,
    colors.text,
    22,
  )
  cover.drawText(`Erstellt am ${date}`, { x: margin, y: 74, size: 10, font: regular, color: colors.muted })

  const overview = pdf.addPage([pageWidth, pageHeight])
  drawHeader(overview, 'So steht deine Website heute da', regular, bold)
  drawWrapped(
    overview,
    'Drei Bereiche, ein Blick. Alles Weitere findest du auf den nächsten Seiten, mit klarer Erklärung, was es bedeutet und was du tun kannst.',
    regular,
    11,
    margin,
    pageHeight - 146,
    pageWidth - margin * 2,
    colors.muted,
    16,
  )
  const scores = [
    ['SEO', audit.seo.score],
    ['Mobile', audit.mobile.score],
    ['KI-Sichtbarkeit', audit.geo.score],
  ] as const
  scores.forEach(([label, score], index) => {
    const x = margin + index * 168
    overview.drawRectangle({ x, y: 400, width: 150, height: 210, color: colors.panel, borderColor: colors.line, borderWidth: 1 })
    overview.drawText(String(score), { x: x + 35, y: 490, size: 48, font: bold, color: scoreColor(score) })
    overview.drawText(label, { x: x + 18, y: 450, size: 11, font: bold, color: colors.text })
    overview.drawText(scoreComment(score), { x: x + 18, y: 424, size: 8.5, font: regular, color: colors.muted })
  })

  addCategoryPages(pdf, 'SEO', 'Findet Google dich überhaupt?', audit.seo, regular, bold)
  addCategoryPages(pdf, 'Mobile', 'Funktioniert deine Seite da, wo die meisten Kunden sie öffnen: auf dem Handy?', audit.mobile, regular, bold)
  addCategoryPages(pdf, 'KI-Sichtbarkeit', 'Wenn jemand ChatGPT nach einem Anbieter wie dir fragt, taucht deine Website überhaupt auf?', audit.geo, regular, bold)

  const closing = pdf.addPage([pageWidth, pageHeight])
  drawHeader(closing, 'Was jetzt?', regular, bold)
  drawWrapped(
    closing,
    'Die meisten Punkte hier kannst du selbst angehen, wenn du Zeit und Lust hast. Wenn du lieber loslegen willst ohne dich selbst einzuarbeiten: Ich übernehme das für dich, Schritt für Schritt, ohne dass du dich um Technik kümmern musst.',
    regular,
    13,
    margin,
    pageHeight - 170,
    pageWidth - margin * 2,
    colors.text,
    20,
  )
  closing.drawRectangle({ x: margin, y: 420, width: pageWidth - margin * 2, height: 74, color: colors.accent })
  closing.drawText('Kostenloses Erstgespräch buchen', { x: margin + 25, y: 449, size: 16, font: bold, color: colors.background })
  closing.drawText('greenlabz-studio.de/#calendar', { x: margin, y: 378, size: 11, font: regular, color: colors.accent })
  closing.drawText('GreenLabz Studio · Heilbronn · hello@greenlabz-studio.de · +49 160 4928746', {
    x: margin,
    y: 62,
    size: 8.5,
    font: regular,
    color: colors.muted,
  })

  pdf.setTitle(`Website Audit Report – ${audit.domain}`)
  pdf.setAuthor('GreenLabz Studio')
  pdf.setSubject('SEO, Mobile und KI-Sichtbarkeits-Bereitschaft')
  return Buffer.from(await pdf.save())
}
