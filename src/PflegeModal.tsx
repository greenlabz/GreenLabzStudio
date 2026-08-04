import { useEffect, useState } from 'react'
import './ContactModal.css'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'

interface PflegeModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
  onOpenDatenschutz?: () => void
}

const contactEndpoint = '/api/contact'

export function PflegeModal({ isOpen, onClose, packageName, onOpenDatenschutz }: PflegeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const [selectedPackage, setSelectedPackage] = useState(packageName || 'Pflege Business')

  useEffect(() => {
    if (packageName) {
      setSelectedPackage(packageName)
    }
  }, [packageName])

  useEffect(() => {
    if (isOpen) return
    const timer = window.setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(false)
      setError('')
      setProgress(0)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    setProgress(0)
    const interval = window.setInterval(() => setProgress((value) => Math.min(value + 5, 92)), 50)

    try {
      const formData = new FormData(event.currentTarget)
      const websiteUrl = formData.get('websiteUrl') as string
      const messageText = formData.get('message') as string

      const fullMessage = `Anfrage für Paket: ${selectedPackage}\nWebsite-URL: ${websiteUrl}\n\nZusätzliche Infos / Wunsch:\n${messageText || 'Keine Angabe'}`

      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: fullMessage,
          consent: formData.get('consent') === 'on',
          honey: formData.get('_honey'),
        }),
      })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error || 'Deine Anfrage konnte nicht gesendet werden. Schreib mir bitte direkt an hallo@greenlabz.de')
      window.clearInterval(interval)
      setProgress(100)
      window.setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
      }, 150)
    } catch (err) {
      window.clearInterval(interval)
      setIsSubmitting(false)
      setError(err instanceof Error ? err.message : 'Ein unerwarteter Fehler ist aufgetreten.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose} data-lenis-prevent>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pflege-modal-title" data-lenis-prevent>
        <button className="modal-close" onClick={onClose} aria-label="Schließen">
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="modal-success">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={52} />
            </div>
            <h2 id="pflege-modal-title">Anfrage übermittelt!</h2>
            <p>
              Vielen Dank! Ich habe deine Angaben für <strong>{selectedPackage}</strong> erhalten. Ich analysiere deine Website und melde mich innerhalb von 24 Stunden persönlich bei dir zurück.
            </p>
            <button className="btn primary submit-btn" onClick={onClose}>
              <span>Schließen</span>
            </button>
          </div>
        ) : (
          <div className="funnel-step">
            <p className="section-code">[04] WEBSITE-ANALYSE &amp; PFLEGE</p>
            <h2 id="pflege-modal-title">Anfrage: <span className="text-accent">{selectedPackage}</span></h2>
            <p className="modal-subtitle">
              Gib mir kurz deine Website-URL und Ansprechpartner an. Ich schaue mir den Ist-Zustand deiner Seite an und melde mich persönlich bei dir zurück.
            </p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <input type="text" name="_honey" className="form-honey" tabIndex={-1} autoComplete="off" />

              {error && <p className="form-error">{error}</p>}

              <div className="input-group">
                <label htmlFor="pf-package">Gewähltes Paket</label>
                <select
                  id="pf-package"
                  name="package"
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    padding: '0.8rem 1rem',
                    color: 'var(--ink)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem'
                  }}
                >
                  <option value="Pflege Basis" style={{ background: '#0d110e', color: '#fff' }}>Pflege Basis (59 €/mtl.)</option>
                  <option value="Pflege Business" style={{ background: '#0d110e', color: '#fff' }}>Pflege Business (129 €/mtl. - Empfohlen)</option>
                  <option value="Pflege Premium" style={{ background: '#0d110e', color: '#fff' }}>Pflege Premium (249 €/mtl.)</option>
                  <option value="Shop & E-Commerce" style={{ background: '#0d110e', color: '#fff' }}>Shop &amp; E-Commerce (auf Anfrage)</option>
                  <option value="Individuell & Web-App" style={{ background: '#0d110e', color: '#fff' }}>Individuell &amp; Web-App (auf Anfrage)</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="pf-url">Website-URL *</label>
                <input
                  id="pf-url"
                  type="text"
                  name="websiteUrl"
                  required
                  placeholder="z.B. www.deine-domain.de"
                  disabled={isSubmitting}
                />
              </div>

              <div className="input-group">
                <label htmlFor="pf-name">Dein Name / Firma *</label>
                <input
                  id="pf-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Max Mustermann / Muster GmbH"
                  disabled={isSubmitting}
                />
              </div>

              <div className="input-group">
                <label htmlFor="pf-email">E-Mail-Adresse *</label>
                <input
                  id="pf-email"
                  type="email"
                  name="email"
                  required
                  placeholder="max@firma.de"
                  disabled={isSubmitting}
                />
              </div>

              <div className="input-group">
                <label htmlFor="pf-phone">Telefonnummer / WhatsApp <span style={{ opacity: 0.6, fontWeight: 400 }}>(optional)</span></label>
                <input
                  id="pf-phone"
                  type="tel"
                  name="phone"
                  placeholder="Für schnelle Rückfragen (optional)"
                  disabled={isSubmitting}
                />
              </div>

              <div className="input-group">
                <label htmlFor="pf-message">Besondere Wünsche oder Anmerkungen <span style={{ opacity: 0.6, fontWeight: 400 }}>(optional)</span></label>
                <textarea
                  id="pf-message"
                  name="message"
                  rows={3}
                  placeholder="z.B. WordPress läuft langsam, brauche regelmäßige Content-Pflege usw."
                  disabled={isSubmitting}
                />
              </div>

              <label className="audit-consent" style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: '0.6rem', alignItems: 'start', fontSize: '0.78rem', color: 'var(--muted)' }}>
                <input type="checkbox" name="consent" required disabled={isSubmitting} />
                <span>
                  Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.{' '}
                  {onOpenDatenschutz && (
                    <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }} onClick={onOpenDatenschutz}>
                      Datenschutzhinweise
                    </button>
                  )}
                </span>
              </label>

              <div className="modal-action">
                {isSubmitting && (
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                )}

                <button type="submit" className="btn primary submit-btn" disabled={isSubmitting}>
                  <span className="btn-label">
                    {isSubmitting ? 'Wird übermittelt...' : 'Kostenlose Analyse & Angebot anfragen'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
