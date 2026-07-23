import type { VercelRequest, VercelResponse } from '@vercel/node'
import { allowPost, fetchHtml, getBody, sendError } from '../_lib/http.js'
import { runPageSpeedAudit } from '../_lib/pagespeed.js'

export const config = { maxDuration: 60 }

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!allowPost(request, response)) return
  try {
    const { domain } = getBody<{ domain?: string }>(request)
    const site = await fetchHtml(domain)
    response.status(200).json({ mobile: await runPageSpeedAudit(site), url: site.finalUrl })
  } catch (error) {
    sendError(response, error)
  }
}

