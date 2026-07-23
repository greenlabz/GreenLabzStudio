import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const maxHtmlBytes = 2_000_000
const allowedProtocols = new Set(['http:', 'https:'])

function isPrivateAddress(address: string) {
  if (address === '::1' || address.startsWith('fc') || address.startsWith('fd') || address.startsWith('fe80:')) return true
  if (!isIP(address)) return true
  const parts = address.split('.').map(Number)
  if (parts.length !== 4) return false
  return parts[0] === 10
    || parts[0] === 127
    || (parts[0] === 169 && parts[1] === 254)
    || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
    || (parts[0] === 192 && parts[1] === 168)
    || parts[0] === 0
}

export function normalizeDomain(input: unknown) {
  if (typeof input !== 'string') throw new Error('Bitte gib eine gültige Domain ein.')
  const trimmed = input.trim()
  if (!trimmed || trimmed.length > 253) throw new Error('Bitte gib eine gültige Domain ein.')
  const withProtocol = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  const url = new URL(withProtocol)
  if (!allowedProtocols.has(url.protocol) || url.username || url.password || url.port) {
    throw new Error('Bitte gib eine öffentlich erreichbare Website ein.')
  }
  url.hash = ''
  url.search = ''
  return url
}

async function assertPublicHostname(hostname: string) {
  if (hostname === 'localhost' || hostname.endsWith('.local')) throw new Error('Lokale Adressen können nicht geprüft werden.')
  const addresses = await lookup(hostname, { all: true })
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error('Diese Adresse kann aus Sicherheitsgründen nicht geprüft werden.')
  }
}

export async function safeFetch(url: URL, accept = 'text/html,application/xhtml+xml', redirects = 0): Promise<Response> {
  if (redirects > 4) throw new Error('Die Website leitet zu oft weiter.')
  await assertPublicHostname(url.hostname)
  const response = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(15_000),
    headers: {
      accept,
      'user-agent': 'GreenLabz-Website-Audit/1.0 (+https://greenlabz-studio.de)',
    },
  })
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')
    if (!location) throw new Error('Die Website leitet ungültig weiter.')
    return safeFetch(new URL(location, url), accept, redirects + 1)
  }
  return response
}

export async function fetchHtml(input: unknown) {
  let url = normalizeDomain(input)
  let response: Response
  try {
    response = await safeFetch(url)
  } catch (error) {
    if (url.protocol !== 'https:') throw error
    url = new URL(url)
    url.protocol = 'http:'
    response = await safeFetch(url)
  }
  if (!response.ok) throw new Error(`Die Website antwortet mit Status ${response.status}.`)
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('text/html')) throw new Error('Unter dieser Adresse wurde keine HTML-Website gefunden.')
  const contentLength = Number(response.headers.get('content-length') ?? 0)
  if (contentLength > maxHtmlBytes) throw new Error('Die Startseite ist zu groß für den automatischen Check.')
  const html = await response.text()
  if (Buffer.byteLength(html) > maxHtmlBytes) throw new Error('Die Startseite ist zu groß für den automatischen Check.')
  return {
    requestedUrl: url.toString(),
    finalUrl: response.url || url.toString(),
    html,
    status: response.status,
  }
}

export function getBody<T>(request: VercelRequest) {
  if (request.body && typeof request.body === 'object') return request.body as T
  if (typeof request.body === 'string') return JSON.parse(request.body) as T
  return {} as T
}

export function allowPost(request: VercelRequest, response: VercelResponse) {
  if (request.method === 'POST') return true
  response.setHeader('Allow', 'POST')
  response.status(405).json({ error: 'Methode nicht erlaubt.' })
  return false
}

export function sendError(response: VercelResponse, error: unknown, status = 400) {
  const message = error instanceof Error ? error.message : 'Der Check konnte nicht abgeschlossen werden.'
  response.status(status).json({ error: message })
}

