import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runFullAudit } from '../_lib/audit.js'
import { allowPost, getBody, normalizeDomain, sendError } from '../_lib/http.js'
import { enforceRateLimit } from '../_lib/rate-limit.js'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!allowPost(request, response)) return
  try {
    const { domain } = getBody<{ domain?: string }>(request)
    const normalized = normalizeDomain(domain)
    const forwarded = request.headers['x-forwarded-for']
    const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) || request.socket?.remoteAddress || 'unknown'
    enforceRateLimit(ip.trim(), normalized.hostname)
    const audit = await runFullAudit(normalized.toString())
    response.setHeader('Cache-Control', 'no-store')
    response.status(200).json({ audit })
  } catch (error) {
    const status = typeof error === 'object' && error && 'statusCode' in error ? Number(error.statusCode) : 400
    sendError(response, error, status)
  }
}

