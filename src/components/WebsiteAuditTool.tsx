import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, LoaderCircle, ShieldCheck, X } from 'lucide-react'
import gsap from 'gsap'

type AuditStatus = 'pass' | 'warning' | 'fail'

interface AuditItem {
  id: string
  label: string
  status: AuditStatus
  explanation: string
}

interface AuditCategory {
  score: number
  items: AuditItem[]
}

interface AuditResult {
  id: string
  domain: string
  url: string
  createdAt: string
  overallScore: number
  seo: AuditCategory
  mobile: AuditCategory & {
    metrics: { lcp: string | null; cls: string | null; tbt: string | null }
    source: 'pagespeed' | 'fallback'
  }
  geo: AuditCategory
  signature: string
}

type AuditView = 'input' | 'loading' | 'result-preview' | 'email-gate' | 'success'

const loadingMessages = [
  'Prüfe deine Ladezeit …',
  'Prüfe deine Sichtbarkeit bei Google …',
  'Prüfe, ob deine Website mobil funktioniert …',
  'Prüfe deine Bereitschaft für die KI-Suche …',
  'Fast fertig, letzte Checks laufen …',
]

const teaserFindings = [
  ['warning', 'Deine Website lädt zu langsam auf dem Handy …'],
  ['warning', 'Google findet nicht genug Informationen über dich …'],
  ['fail', 'Ein Punkt fehlt komplett …'],
] as const

function ScoreRing({ label, score }: { label: string; score: number }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - score / 100 * circumference
  return (
    <div className="audit-score">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} />
        <circle
          className={`audit-score-value ${score >= 90 ? 'is-good' : score >= 50 ? 'is-warning' : 'is-critical'}`}
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <strong>{score}</strong>
      <span>{label}</span>
    </div>
  )
}

interface WebsiteAuditToolProps {
  onOpenDatenschutz?: () => void
}

export default function WebsiteAuditTool({ onOpenDatenschutz }: WebsiteAuditToolProps = {}) {
  const [view, setView] = useState<AuditView>('input')
  const [domain, setDomain] = useState('')
  const [audit, setAudit] = useState<AuditResult | null>(null)
  const [statusIndex, setStatusIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [delivery, setDelivery] = useState({ emailSent: false, leadStored: false })
  const statusRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (view !== 'loading') return
    const progressTimer = window.setInterval(() => setProgress((value) => Math.min(value + Math.max(1, Math.round((92 - value) / 12)), 92)), 500)
    const statusTimer = window.setInterval(() => {
      setStatusIndex((value) => Math.min(value + 1, loadingMessages.length - 1))
      if (statusRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(statusRef.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .35, ease: 'power2.out' })
      }
    }, 3400)
    return () => {
      window.clearInterval(progressTimer)
      window.clearInterval(statusTimer)
    }
  }, [view])

  const startAudit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setAudit(null)
    setProgress(4)
    setStatusIndex(0)
    setView('loading')
    try {
      const response = await fetch('/api/audit/start', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ domain }),
      })
      const data = await response.json() as { audit?: AuditResult; error?: string }
      if (!response.ok || !data.audit) throw new Error(data.error || 'Die Analyse konnte nicht abgeschlossen werden.')
      setProgress(100)
      setAudit(data.audit)
      window.setTimeout(() => setView('result-preview'), 350)
    } catch (auditError) {
      setError(auditError instanceof Error ? auditError.message : 'Die Analyse konnte nicht abgeschlossen werden.')
      setView('input')
    }
  }

  const requestReport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!audit) return
    setError('')
    setSending(true)
    try {
      const response = await fetch('/api/audit/generate-pdf', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, consent, audit }),
      })
      const data = await response.json() as {
        fileName?: string
        pdfBase64?: string
        emailSent?: boolean
        leadStored?: boolean
        error?: string
      }
      if (!response.ok || !data.fileName || !data.pdfBase64) throw new Error(data.error || 'Der Report konnte nicht erstellt werden.')
      const bytes = Uint8Array.from(atob(data.pdfBase64), (character) => character.charCodeAt(0))
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
      const download = document.createElement('a')
      download.href = url
      download.download = data.fileName
      document.body.appendChild(download)
      download.click()
      download.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setDelivery({ emailSent: Boolean(data.emailSent), leadStored: Boolean(data.leadStored) })
      setView('success')
    } catch (reportError) {
      setError(reportError instanceof Error ? reportError.message : 'Der Report konnte nicht erstellt werden.')
    } finally {
      setSending(false)
    }
  }

  if (view === 'loading') {
    return (
      <div className="website-audit-tool audit-loading" aria-live="polite">
        <LoaderCircle className="audit-loader" size={34} aria-hidden="true" />
        <p ref={statusRef}>{loadingMessages[statusIndex]}</p>
        <div className="audit-progress" aria-label={`Analyse zu ${progress} Prozent abgeschlossen`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <small>{progress} %</small>
      </div>
    )
  }

  if (view === 'result-preview' && audit) {
    return (
      <div className="website-audit-tool audit-result">
        <h2>Deine Analyse ist da.</h2>
        <div className="audit-scores" aria-label="Ergebnisse der Website-Analyse">
          <ScoreRing label="SEO" score={audit.seo.score} />
          <ScoreRing label="Mobile" score={audit.mobile.score} />
          <ScoreRing label="KI-Sichtbarkeit" score={audit.geo.score} />
        </div>
        <p>Ich hab 3 Dinge gefunden, die dich gerade Kunden kosten. Zum Beispiel:</p>
        <div className="audit-teasers">
          {teaserFindings.map(([status, text]) => (
            <div key={text} className={status === 'fail' ? 'is-critical' : 'is-warning'}>
              {status === 'fail' ? <X size={15} /> : <ShieldCheck size={15} />}
              <span>{text}</span>
            </div>
          ))}
        </div>
        <button className="gl-audit-submit" type="button" onClick={() => setView('email-gate')}>
          <span>Vollständigen Report als PDF erhalten</span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    )
  }

  if (view === 'email-gate' && audit) {
    return (
      <div className="website-audit-tool audit-email-gate">
        <h2>Wohin soll dein Report?</h2>
        <p>Trag deine E-Mail ein, ich schick dir den vollständigen Bericht als PDF. Mit allen Punkten, verständlich erklärt, und was du konkret tun kannst.</p>
        <form className="gl-audit-form" onSubmit={requestReport}>
          <label className="gl-audit-field" htmlFor="audit-name">
            <span>Name</span>
            <input id="audit-name" type="text" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
          </label>
          <label className="gl-audit-field" htmlFor="audit-email">
            <span>E-Mail-Adresse</span>
            <input id="audit-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
          </label>
          <label className="audit-consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>
              Ja, schickt mir das Audit. Ich bin damit einverstanden, dass GreenLabz Studio mir regelmäßig per E-Mail Angebote und Tipps zu Webdesign &amp; SEO zusendet. Meine Einwilligung kann ich jederzeit widerrufen.{' '}
              <button
                type="button"
                onClick={onOpenDatenschutz}
                style={{ background: 'none', border: 'none', padding: 0, color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}
              >
                Datenschutz
              </button>
            </span>
          </label>
          {error && <p className="audit-error" role="alert">{error}</p>}
          <button className="gl-audit-submit" type="submit" disabled={sending}>
            <span>{sending ? 'Report wird erstellt …' : 'Report jetzt zusenden'}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>
      </div>
    )
  }

  if (view === 'success') {
    return (
      <div className="website-audit-tool audit-success" aria-live="polite">
        <span className="audit-success-icon"><Check size={22} /></span>
        <h2>Fertig. Dein Report ist unterwegs.</h2>
        <p>
          {delivery.emailSent
            ? 'Check dein Postfach, der Download-Link zum PDF ist gerade angekommen. Falls nicht innerhalb von 2 Minuten: Spam-Ordner checken.'
            : 'Der PDF-Download wurde gestartet. Der E-Mail-Versand wird aktiv, sobald die SMTP-Zugangsdaten hinterlegt sind.'}
        </p>
        {!delivery.leadStored && <small>Die Google-Sheet-Speicherung wird aktiv, sobald die Service-Account-Daten hinterlegt sind.</small>}
        <strong>Willst du direkt besprechen, wie wir die gefundenen Punkte angehen?</strong>
        <a className="gl-audit-submit" href="#calendar">
          <span>Kostenloses Erstgespräch buchen</span>
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <div className="website-audit-tool audit-input">
      <h2>Ist deine <span className="text-accent">Website</span> <span className="text-accent">bereit</span> für neue Kunden<span className="text-accent">?</span></h2>
      <p id="audit-description">Gib deine Domain ein. Ich zeige dir in 30 Sekunden, wie du bei Google und bei Kunden ankommst.</p>
      <form className="gl-audit-form" aria-describedby="audit-description" onSubmit={startAudit}>
        <div className="gl-audit-start-row">
          <label className="gl-audit-field" htmlFor="audit-domain">
            <span>Website-Domain</span>
            <input
              id="audit-domain"
              name="domain"
              type="text"
              inputMode="url"
              autoComplete="url"
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              placeholder="deine-domain.de"
              required
            />
          </label>
          <button className="gl-audit-submit" type="submit">
            <span>Kostenlose Analyse starten</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        {error && <p className="audit-error" role="alert">{error}</p>}
        <p className="gl-audit-privacy-note">Kein Spam. Kein Verkaufsgespräch. Nur klare Fakten.</p>
      </form>
    </div>
  )
}
