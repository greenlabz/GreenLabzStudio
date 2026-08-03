import type { VercelRequest, VercelResponse } from '@vercel/node'
import { allowPost, getBody, sendError } from './_lib/http.js'
import { sendLeadMagnetEmail, appendLeadMagnetToSheet } from './_lib/delivery.js'

interface LeadMagnetPayload {
  name?: string
  email?: string
  consent?: boolean
  honey?: string
  aktion?: string
  zeitpunkt?: string
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!allowPost(request, response)) return

  try {
    // FormData aus dem Frontend kommt als multipart/form-data
    // Vercel Node Runtime parst FormData nicht automatisch, daher JSON-Body
    const payload = getBody<LeadMagnetPayload>(request)

    // Honeypot-Spamschutz
    if (payload.honey) {
      response.status(200).json({ ok: true })
      return
    }

    const name  = payload.name?.trim().slice(0, 120) || ''
    const email = payload.email?.trim().toLocaleLowerCase().slice(0, 254) || ''

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Bitte gib eine gültige E-Mail-Adresse ein.')
    }

    const input = {
      name,
      email,
      aktion: payload.aktion || '5-Minuten-Checkliste angefordert',
      createdAt: new Date().toISOString(),
    }

    // Parallel: Google Sheets + E-Mail-Benachrichtigung
    await Promise.allSettled([
      appendLeadMagnetToSheet(input),
      sendLeadMagnetEmail(input),
    ])

    response.setHeader('Cache-Control', 'no-store')
    response.status(200).json({ ok: true })
  } catch (error) {
    sendError(response, error)
  }
}
