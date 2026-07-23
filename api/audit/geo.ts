import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runGeoAudit } from '../_lib/geo.js'
import { allowPost, fetchHtml, getBody, sendError } from '../_lib/http.js'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!allowPost(request, response)) return
  try {
    const { domain } = getBody<{ domain?: string }>(request)
    const site = await fetchHtml(domain)
    response.status(200).json({ geo: await runGeoAudit(site), url: site.finalUrl })
  } catch (error) {
    sendError(response, error)
  }
}

