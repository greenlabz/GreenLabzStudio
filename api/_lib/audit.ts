import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { fetchHtml, normalizeDomain } from './http.js'
import { runGeoAudit } from './geo.js'
import { runPageSpeedAudit } from './pagespeed.js'
import { runSeoAudit } from './seo.js'
import type { AuditResult } from './types.js'

const signingSecret = process.env.AUDIT_SIGNING_SECRET || 'greenlabz-local-development'

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key, item]) => key !== 'signature' && item !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, canonicalize(item)]),
    )
  }
  return value
}

function unsignedAudit(result: Omit<AuditResult, 'signature'> | AuditResult) {
  return JSON.stringify(canonicalize({
    id: result.id,
    domain: result.domain,
    url: result.url,
    createdAt: result.createdAt,
    overallScore: result.overallScore,
    seo: result.seo,
    mobile: result.mobile,
    geo: result.geo,
  }))
}

export function signAudit(result: Omit<AuditResult, 'signature'>) {
  return createHmac('sha256', signingSecret).update(unsignedAudit(result)).digest('hex')
}

export function verifyAudit(result: AuditResult) {
  const expected = Buffer.from(signAudit(result))
  const actual = Buffer.from(result.signature || '')
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

export async function runFullAudit(input: unknown): Promise<AuditResult> {
  const normalized = normalizeDomain(input)
  const site = await fetchHtml(normalized.toString())
  const [seo, mobile, geo] = await Promise.all([
    runSeoAudit(site),
    runPageSpeedAudit(site),
    runGeoAudit(site),
  ])
  const domain = new URL(site.finalUrl).hostname.replace(/^www\./, '')
  const createdAt = new Date().toISOString()
  const result = {
    id: createHash('sha256').update(`${domain}:${createdAt}`).digest('hex').slice(0, 20),
    domain,
    url: site.finalUrl,
    createdAt,
    overallScore: Math.round((seo.score + mobile.score + geo.score) / 3),
    seo,
    mobile,
    geo,
  }
  return { ...result, signature: signAudit(result) }
}
