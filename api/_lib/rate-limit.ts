const checks = new Map<string, number>()
const oneDay = 24 * 60 * 60 * 1000

export function enforceRateLimit(ip: string, domain: string) {
  if (process.env.NODE_ENV !== 'production') return
  const now = Date.now()
  const key = `${ip}:${domain.toLocaleLowerCase()}`
  const previous = checks.get(key)
  if (previous && now - previous < oneDay) {
    const error = new Error('Für diese Domain wurde heute bereits eine Analyse gestartet.')
    Object.assign(error, { statusCode: 429 })
    throw error
  }
  checks.set(key, now)
  for (const [storedKey, timestamp] of checks) {
    if (now - timestamp > oneDay) checks.delete(storedKey)
  }
}

