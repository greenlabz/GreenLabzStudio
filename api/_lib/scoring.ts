import type { AuditItem, AuditStatus } from './types.js'

const weights: Record<AuditStatus, number> = {
  pass: 1,
  warning: .5,
  fail: 0,
}

export function scoreItems(items: AuditItem[]) {
  if (!items.length) return 0
  return Math.round(items.reduce((sum, item) => sum + weights[item.status], 0) / items.length * 100)
}

export function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

