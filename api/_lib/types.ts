export type AuditStatus = 'pass' | 'warning' | 'fail'

export interface AuditItem {
  id: string
  label: string
  status: AuditStatus
  value?: string | number | boolean | null
  explanation: string
}

export interface AuditCategory {
  score: number
  items: AuditItem[]
}

export interface MobileAuditCategory extends AuditCategory {
  metrics: {
    lcp: string | null
    cls: string | null
    tbt: string | null
  }
  source: 'pagespeed' | 'fallback'
}

export interface AuditResult {
  id: string
  domain: string
  url: string
  createdAt: string
  overallScore: number
  seo: AuditCategory
  mobile: MobileAuditCategory
  geo: AuditCategory
  signature: string
}

export interface SiteDocument {
  requestedUrl: string
  finalUrl: string
  html: string
  status: number
}

export interface LeadPayload {
  name?: string
  email: string
  consent: boolean
  audit: AuditResult
}

