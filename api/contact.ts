import type { VercelRequest, VercelResponse } from '@vercel/node'
import { appendContactToSheet, sendContactEmail } from './_lib/delivery.js'
import { allowPost, getBody, sendError } from './_lib/http.js'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  message?: string
  consent?: boolean
  honey?: string
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!allowPost(request, response)) return

  try {
    const payload = getBody<ContactPayload>(request)
    if (payload.honey) {
      response.status(200).json({ stored: true, emailSent: true })
      return
    }

    const name = payload.name?.trim().slice(0, 120)
    const email = payload.email?.trim().toLocaleLowerCase().slice(0, 254)
    const phone = payload.phone?.trim().slice(0, 80)
    const message = payload.message?.trim().slice(0, 5000)

    if (!payload.consent) throw new Error('Bitte bestätige die Einwilligung zur Kontaktaufnahme.')
    if (!name || name.length < 2) throw new Error('Bitte gib deinen Namen ein.')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Bitte gib eine gültige E-Mail-Adresse ein.')
    if (!message || message.length < 5) throw new Error('Bitte beschreibe kurz dein Anliegen.')

    const input = {
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    }
    const stored = await appendContactToSheet(input)
    if (!stored) throw new Error('Kontaktformular ist noch nicht vollständig eingerichtet.')

    let emailSent = false
    try {
      emailSent = await sendContactEmail(input)
    } catch (emailError) {
      console.error('Contact email delivery failed:', emailError)
    }

    response.setHeader('Cache-Control', 'no-store')
    response.status(200).json({ stored, emailSent })
  } catch (error) {
    sendError(response, error)
  }
}
