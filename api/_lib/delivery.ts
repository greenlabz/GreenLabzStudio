import { GoogleAuth } from 'google-auth-library'
import nodemailer from 'nodemailer'
import type { AuditResult } from './types.js'

interface DeliveryInput {
  audit: AuditResult
  name?: string
  email: string
  pdf: Buffer
  fileName: string
}

function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = Number(process.env.SMTP_PORT)
    return {
      transporter: nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }),
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
    }
  }

  if (process.env.GMAIL_USER && process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const gmailUser = process.env.GMAIL_USER
    return {
      transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: gmailUser,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        },
      }),
      from: process.env.EMAIL_ALIAS || gmailUser,
    }
  }

  return null
}

export async function sendAuditEmails(input: DeliveryInput) {
  const mailer = createTransporter()
  if (!mailer) return false

  const { transporter, from } = mailer
  await transporter.sendMail({
    from: `GreenLabz Studio <${from}>`,
    to: input.email,
    subject: `Dein Website Audit Report für ${input.audit.domain}`,
    text: `Hallo${input.name ? ` ${input.name}` : ''},\n\nim Anhang findest du deinen Website Audit Report für ${input.audit.domain}.\n\nViele Grüße\nJames von GreenLabz Studio`,
    attachments: [{ filename: input.fileName, content: input.pdf, contentType: 'application/pdf' }],
  })

  await transporter.sendMail({
    from: `GreenLabz Website Audit <${from}>`,
    to: process.env.LEAD_NOTIFICATION_EMAIL || from,
    subject: `Neuer Lead: ${input.audit.domain} – ${input.email}`,
    text: [
      `Domain: ${input.audit.domain}`,
      `E-Mail: ${input.email}`,
      `Name: ${input.name || 'nicht angegeben'}`,
      `SEO: ${input.audit.seo.score}`,
      `Mobile: ${input.audit.mobile.score}`,
      `KI-Sichtbarkeit: ${input.audit.geo.score}`,
    ].join('\n'),
  })
  return true
}

export async function appendLeadToSheet(input: Omit<DeliveryInput, 'pdf' | 'fileName'>) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!clientEmail || !privateKey || !sheetId) return false

  const auth = new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const client = await auth.getClient()
  const token = await client.getAccessToken()
  const tab = process.env.GOOGLE_SHEET_TAB || 'Leads'
  const range = encodeURIComponent(`${tab}!A:G`)
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token.token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      values: [[
        input.audit.createdAt,
        input.audit.domain,
        input.email,
        input.name || '',
        input.audit.seo.score,
        input.audit.mobile.score,
        input.audit.geo.score,
      ]],
    }),
  })
  if (!response.ok) throw new Error(`Google Sheets: ${response.status}`)
  return true
}
