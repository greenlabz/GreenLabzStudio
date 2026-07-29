import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyAudit } from '../_lib/audit.js'
import { appendLeadToSheet, sendAuditEmails } from '../_lib/delivery.js'
import { allowPost, getBody, sendError } from '../_lib/http.js'
import { createAuditPdf } from '../_lib/pdf.js'
import type { LeadPayload } from '../_lib/types.js'

export const config = { maxDuration: 60 }

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!allowPost(request, response)) return
  try {
    const payload = getBody<LeadPayload>(request)
    const email = payload.email?.trim().toLocaleLowerCase()
    if (!payload.consent) throw new Error('Bitte bestätige die Einwilligung zum einmaligen Report-Versand.')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Bitte gib eine gültige E-Mail-Adresse ein.')
    if (!payload.audit || !verifyAudit(payload.audit)) throw new Error('Die Analyse ist nicht mehr gültig. Bitte starte den Check erneut.')

    const fileName = `greenlabz-website-audit-${payload.audit.domain.replace(/[^a-z0-9.-]/gi, '-')}.pdf`
    const pdf = await createAuditPdf(payload.audit)
    const deliveryInput = {
      audit: payload.audit,
      name: payload.name?.trim().slice(0, 120),
      email,
      pdf,
      fileName,
    }
    const [emailResult, sheetResult] = await Promise.allSettled([
      sendAuditEmails(deliveryInput),
      appendLeadToSheet(deliveryInput),
    ])
    const emailSent = emailResult.status === 'fulfilled' && Boolean(emailResult.value)
    const leadStored = sheetResult.status === 'fulfilled' && Boolean(sheetResult.value)
    if (emailResult.status === 'rejected') console.error('Audit email delivery failed:', emailResult.reason)
    if (sheetResult.status === 'rejected') console.error('Audit sheet delivery failed:', sheetResult.reason)

    response.setHeader('Cache-Control', 'no-store')
    response.status(200).json({
      fileName,
      pdfBase64: pdf.toString('base64'),
      emailSent,
      leadStored,
    })
  } catch (error) {
    sendError(response, error)
  }
}
