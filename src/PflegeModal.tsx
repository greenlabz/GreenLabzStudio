import { useEffect, useState } from 'react'
import './ContactModal.css'
import { ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react'

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
      if (!response.ok) throw new Error(result.error || 'Deine Anfrage konnte nicht gesendet werden. Schreib mir bitte direkt an info@greenlabz-studio.de')
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
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pflege-modal-title">
        <button className="contact-modal-close" onClick={onClose} aria-label="Schließen">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="contact-modal-success">
            <CheckCircle2 size={48} className="text-accent" />
            <h3 id="pflege-modal-title">Anfrage erfolgreich übermittelt!</h3>
            <p>
              Vielen Dank! Ich habe deine Angaben für <strong>{selectedPackage}</strong> erhalten. Ich analysiere deine Website und melde mich innerhalb von 24 Stunden mit einer Einschätzung bei dir zurück.
            </p>
            <button className="pricing-cta" onClick={onClose}>
              <span className="cta-label">Schließen</span>
            </button>
          </div>
        ) : (
          <form className="contact-modal-form" onSubmit={handleSubmit}>
            <div className="contact-modal-header">
              <span className="contact-modal-tag">[04] WEBSITE-ANALYSE &amp; PFLEGE</span>
              <h3 id="pflege-modal-title">Anfrage: <span className="text-accent">{selectedPackage}</span></h3>
              <p>
                Gib mir kurz deine Website-URL und Ansprechpartner an. Ich schaue mir den Ist-Zustand deiner Seite an und melde mich persönlich bei dir zurück.
              </p>
            </div>

            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            {error && <div className="contact-modal-error">{error}</div>}

            <div className="contact-form-group">
              <label htmlFor="pf-package">Gewähltes Paket</label>
              <select
                id="pf-package"
                name="package"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="contact-form-input"
              >
                <option value="Pflege Basis">Pflege Basis (59 €/mtl.)</option>
                <option value="Pflege Business">Pflege Business (129 €/mtl. - Empfohlen)</option>
                <option value="Pflege Premium">Pflege Premium (249 €/mtl.)</option>
                <option value="Shop & E-Commerce">Shop &amp; E-Commerce (auf Anfrage)</option>
                <option value="Individuell & Web-App">Individuell &amp; Web-App (auf Anfrage)</option>
              </select>
            </div>

            <div className="contact-form-group">
              <label htmlFor="pf-url">Website-URL *</label>
              <input
                id="pf-url"
                type="text"
                name="websiteUrl"
                required
                placeholder="z.B. www.deine-domain.de"
                className="contact-form-input"
              />
            </div>

            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="pf-name">Dein Name / Firma *</label>
                <input
                  id="pf-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Max Mustermann / Muster GmbH"
                  className="contact-form-input"
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="pf-email">E-Mail-Adresse *</label>
                <input
                  id="pf-email"
                  type="email"
                  name="email"
                  required
                  placeholder="max@firma.de"
                  className="contact-form-input"
                />
              </div>
            </div>

            <div className="contact-form-group">
              <label htmlFor="pf-phone">Telefonnummer / WhatsApp (Optional)</label>
              <input
                id="pf-phone"
                type="tel"
                name="phone"
                placeholder="Für schnelle Rückfragen"
                className="contact-form-input"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="pf-message">Besondere Wünsche oder Anmerkungen (Optional)</label>
              <textarea
                id="pf-message"
                name="message"
                rows={3}
                placeholder="z.B. WordPress läuft langsam, brauche regelmäßige Content-Pfleger usw."
                className="contact-form-input"
              />
            </div>

            <div className="contact-form-consent">
              <label className="checkbox-label">
                <input type="checkbox" name="consent" required />
                <span>
                  Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.{' '}
                  {onOpenDatenschutz && (
                    <button type="button" className="link-button" onClick={onOpenDatenschutz}>
                      Datenschutzhinweise
                    </button>
                  )}
                </span>
              </label>
            </div>

            {isSubmitting && (
              <div className="contact-modal-progress">
                <div className="contact-modal-progress-bar" style={{ width: `${progress}%` }} />
              </div>
            )}

            <button type="submit" className="pricing-cta" disabled={isSubmitting}>
              <span className="cta-dots" aria-hidden="true" />
              <span className="cta-label">
                {isSubmitting ? 'Wird übermittelt...' : 'Kostenlose Analyse & Angebot anfragen'}
              </span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
