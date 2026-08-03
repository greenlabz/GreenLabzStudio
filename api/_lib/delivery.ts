import { GoogleAuth, OAuth2Client } from 'google-auth-library'
import nodemailer from 'nodemailer'
import type { AuditResult } from './types.js'

interface DeliveryInput {
  audit: AuditResult
  name?: string
  email: string
  pdf: Buffer
  fileName: string
}

interface ContactInput {
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
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

export async function sendContactEmail(input: ContactInput) {
  const mailer = createTransporter()
  if (!mailer) return false

  const { transporter, from } = mailer
  await transporter.sendMail({
    from: `GreenLabz Kontaktformular <${from}>`,
    to: process.env.LEAD_NOTIFICATION_EMAIL || from,
    replyTo: input.email,
    subject: `Neue Kontaktanfrage von ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `E-Mail: ${input.email}`,
      `Telefon: ${input.phone || 'nicht angegeben'}`,
      '',
      input.message,
    ].join('\n'),
  })
  return true
}

interface LeadMagnetInput {
  name: string
  email: string
  aktion: string
  createdAt: string
}

export async function sendLeadMagnetEmail(input: LeadMagnetInput) {
  const mailer = createTransporter()
  if (!mailer) return false

  const { transporter, from } = mailer
  await transporter.sendMail({
    from: `GreenLabz Lead-Magnet <${from}>`,
    to: process.env.LEAD_NOTIFICATION_EMAIL || from,
    replyTo: input.email,
    subject: `🟢 Neuer Lead: ${input.aktion}`,
    text: [
      `Aktion: ${input.aktion}`,
      `Name: ${input.name || 'nicht angegeben'}`,
      `E-Mail: ${input.email}`,
      `Zeitpunkt: ${new Intl.DateTimeFormat('de-DE', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        timeZone: 'Europe/Berlin',
      }).format(new Date(input.createdAt))}`,
    ].join('\n'),
  })
  return true
}

export async function appendLeadMagnetToSheet(input: LeadMagnetInput) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) return false

  const accessToken = await getGoogleSheetsAccessToken()
  if (!accessToken) return false

  const tab = process.env.GOOGLE_LEAD_MAGNET_TAB || 'Lead-Magnets'
  const headers = ['Zeitpunkt', 'Name', 'E-Mail', 'Aktion']
  await ensureSheetTab(accessToken, sheetId, tab, headers)

  const escapedTab = tab.replace(/'/g, "''")
  const range = encodeURIComponent(`'${escapedTab}'!A:D`)
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      values: [[input.createdAt, input.name, input.email, input.aktion]],
    }),
  })
  if (!res.ok) {
    const details = (await res.text()).slice(0, 500)
    throw new Error(`Google Sheets: ${res.status} ${details}`)
  }
  return true
}

async function getGoogleSheetsAccessToken() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (clientEmail && privateKey) {
    const auth = new GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const client = await auth.getClient()
    return (await client.getAccessToken()).token
  }

  if (
    process.env.GOOGLE_CLIENT_ID
    && process.env.GOOGLE_CLIENT_SECRET
    && process.env.GOOGLE_REFRESH_TOKEN
  ) {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    )
    client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
    return (await client.getAccessToken()).token
  }

  return null
}

async function ensureSheetTab(accessToken: string, sheetId: string, tab: string, headers: string[]) {
  const metadataEndpoint = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}?fields=sheets.properties.title`
  const metadataResponse = await fetch(metadataEndpoint, {
    headers: { authorization: `Bearer ${accessToken}` },
  })
  if (!metadataResponse.ok) {
    const details = (await metadataResponse.text()).slice(0, 500)
    throw new Error(`Google Sheets: ${metadataResponse.status} ${details}`)
  }

  const metadata = await metadataResponse.json() as {
    sheets?: Array<{ properties?: { title?: string } }>
  }
  const exists = metadata.sheets?.some((sheet) => sheet.properties?.title === tab)
  if (!exists) {
    const createResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          requests: [{ addSheet: { properties: { title: tab } } }],
        }),
      },
    )
    if (!createResponse.ok) {
      const details = (await createResponse.text()).slice(0, 500)
      throw new Error(`Google Sheets: ${createResponse.status} ${details}`)
    }
  }

  const escapedTab = tab.replace(/'/g, "''")
  const headerRange = encodeURIComponent(`'${escapedTab}'!A1:${String.fromCharCode(64 + headers.length)}1`)
  const headerResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${headerRange}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ values: [headers] }),
    },
  )
  if (!headerResponse.ok) {
    const details = (await headerResponse.text()).slice(0, 500)
    throw new Error(`Google Sheets: ${headerResponse.status} ${details}`)
  }
}

export async function appendLeadToSheet(input: Omit<DeliveryInput, 'pdf' | 'fileName'>) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) return false

  const accessToken = await getGoogleSheetsAccessToken()
  if (!accessToken) return false

  const tab = process.env.GOOGLE_SHEET_TAB || 'Leads'
  const range = encodeURIComponent(`${tab}!A:G`)
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
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
  if (!response.ok) {
    const details = (await response.text()).slice(0, 500)
    throw new Error(`Google Sheets: ${response.status} ${details}`)
  }
  return true
}

export async function appendContactToSheet(input: ContactInput) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) return false

  const accessToken = await getGoogleSheetsAccessToken()
  if (!accessToken) return false

  const tab = process.env.GOOGLE_CONTACT_SHEET_TAB || 'Kontaktanfragen'
  const headers = ['Zeitpunkt', 'Name', 'E-Mail', 'Telefon', 'Nachricht', 'Quelle']
  await ensureSheetTab(accessToken, sheetId, tab, headers)

  const escapedTab = tab.replace(/'/g, "''")
  const range = encodeURIComponent(`'${escapedTab}'!A:F`)
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      values: [[
        input.createdAt,
        input.name,
        input.email,
        input.phone || '',
        input.message,
        'Kontaktformular',
      ]],
    }),
  })
  if (!response.ok) {
    const details = (await response.text()).slice(0, 500)
    throw new Error(`Google Sheets: ${response.status} ${details}`)
  }
  return true
}
