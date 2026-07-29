import { useEffect, useState } from 'react'
import './ContactModal.css'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenDatenschutz?: () => void
}

const contactEndpoint = '/api/contact'

export function ContactModal({ isOpen, onClose, onOpenDatenschutz }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

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
          message: formData.get('message'),
          consent: formData.get('consent') === 'on',
          honey: formData.get('_honey'),
        }),
      })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error || 'Deine Anfrage konnte nicht gesendet werden. Schreib mir bitte direkt an hello@greenlabz-studio.de')
      window.clearInterval(interval)
      setProgress(100)
      window.setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
      }, 300)
    } catch (submitError) {
      window.clearInterval(interval)
      setProgress(0)
      setIsSubmitting(false)
      setError(submitError instanceof Error ? submitError.message : 'Deine Anfrage konnte nicht gesendet werden.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Schließen"><X size={24} /></button>

        {!isSuccess ? (
          <div className="funnel-step">
            <p className="section-code">[KONTAKT]</p>
            <h2>Lass uns <span className="text-accent">reden</span></h2>
            <p className="modal-subtitle">Erzähl mir von deinem Projekt oder stelle deine Frage. Ich antworte innerhalb von 24 Stunden.</p>

            <form onSubmit={handleSubmit} className="modal-form">
              <input type="text" name="_honey" className="form-honey" tabIndex={-1} autoComplete="off" />

              <div className="input-group">
                <label htmlFor="modal-name">Name</label>
                <input type="text" id="modal-name" name="name" required placeholder="Dein Name" disabled={isSubmitting} />
              </div>

              <div className="input-group">
                <label htmlFor="modal-email">E-Mail-Adresse</label>
                <input type="email" id="modal-email" name="email" required placeholder="deine@email.de" disabled={isSubmitting} />
              </div>

              <div className="input-group">
                <label htmlFor="modal-phone">Telefonnummer <span style={{ opacity: 0.6, fontWeight: 400 }}>(optional)</span></label>
                <input type="tel" id="modal-phone" name="phone" placeholder="+49 160 1234567 (optional)" disabled={isSubmitting} />
              </div>

              <div className="input-group">
                <label htmlFor="modal-message">Deine Nachricht / Frage</label>
                <textarea id="modal-message" name="message" required placeholder="Worum geht es?" rows={4} disabled={isSubmitting} />
              </div>

              <label className="audit-consent" style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: '0.6rem', alignItems: 'start', fontSize: '0.78rem', color: 'var(--muted)' }}>
                <input type="checkbox" name="consent" required disabled={isSubmitting} />
                <span>
                  Ich stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme gemäß der{' '}
                  <button
                    type="button"
                    onClick={onOpenDatenschutz}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}
                  >
                    Datenschutzerklärung
                  </button>{' '}
                  zu.
                </span>
              </label>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn primary submit-btn" disabled={isSubmitting}>
                <span className="cta-label">{isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}</span>
                <ArrowRight size={18} />
              </button>

              {isSubmitting && (
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="modal-success">
            <div className="success-icon-wrapper"><CheckCircle2 size={64} className="success-icon" /></div>
            <h2>Danke für deine <span className="text-accent">Nachricht!</span></h2>
            <p>Ich habe deine Anfrage erhalten und melde mich innerhalb von 24 Stunden persönlich bei dir.</p>
            <button className="btn primary" onClick={onClose}>Schließen</button>
          </div>
        )}
      </div>
    </div>
  )
}
