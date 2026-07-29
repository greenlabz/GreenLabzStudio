import { X } from 'lucide-react'
import './ContactModal.css'

interface ImpressumModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImpressumModal({ isOpen, onClose }: ImpressumModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Schließen">
          <X size={24} />
        </button>

        <div style={{ textWrap: 'pretty', color: 'var(--muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
          <h2 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>Impressum</h2>

          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Angaben gemäß § 5 DDG
            </h3>
            <p>
              <strong>GreenLabz Studio</strong><br />
              Inhaber: James Green<br />
              Baden-Württemberg, Deutschland
            </p>
          </section>

          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Kontakt</h3>
            <p>
              Telefon: +49 160 4928746<br />
              E-Mail: <a href="mailto:hello@greenlabz-studio.de" style={{ color: 'var(--accent)' }}>hello@greenlabz-studio.de</a>
            </p>
          </section>

          <section style={{ marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Verbraucherstreitbeilegung
            </h3>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn primary" onClick={onClose}>Schließen</button>
          </div>
        </div>
      </div>
    </div>
  )
}
