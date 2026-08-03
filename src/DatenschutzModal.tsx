import { X } from 'lucide-react'
import './ContactModal.css'

interface DatenschutzModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DatenschutzModal({ isOpen, onClose }: DatenschutzModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose} data-lenis-prevent>
      <div
        className="modal-content"
        style={{ maxWidth: '680px', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(event) => event.stopPropagation()}
        data-lenis-prevent
      >
        <button className="modal-close" onClick={onClose} aria-label="Schließen">
          <X size={24} />
        </button>

        <div style={{ textWrap: 'pretty', color: 'var(--muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
          <h2 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>Datenschutzerklärung</h2>
          <p style={{ color: 'var(--dim)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
            Stand: Juli 2026 – GreenLabz Studio
          </p>

          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. Verantwortlicher</h3>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
              <strong>GreenLabz Studio</strong><br />
              E-Mail: <a href="mailto:hello@greenlabz-studio.de" style={{ color: 'var(--accent)' }}>hello@greenlabz-studio.de</a><br />
              Telefon: +49 160 4928746
            </p>
          </section>

          <section style={{ marginBottom: '1.5rem', background: 'rgba(0, 204, 106, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0, 204, 106, 0.2)' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              2. Datenerfassung bei Website-Audits &amp; PDF-Downloads (Lead-Erfassung)
            </h3>
            <p style={{ marginBottom: '0.75rem' }}>
              Wenn du unser kostenloses Website-Audit-Tool nutzt oder den PDF-Report anforderst, verarbeiten wir folgende Daten:
            </p>
            <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.75rem' }}>
              <li>Website-Domain / URL</li>
              <li>E-Mail-Adresse</li>
              <li>Name (falls angegeben)</li>
              <li>Erzeugte Analyse-Ergebnisse (SEO, Ladezeiten, KI-Sichtbarkeit)</li>
            </ul>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>Zweck der Verarbeitung:</strong> Die Erfassung dient der technischen Durchführung der Website-Analyse, der automatischen Erstellung und Zustellung deines individuellen PDF-Reports sowie der Kontaktaufnahme zur Besprechung der Analyse-Ergebnisse.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>E-Mail-Marketing &amp; Informationen:</strong> Mit der Anforderung des Reports erklärst du dich einverstanden, dass wir dich gegebenenfalls per E-Mail mit weiterführenden Tipps zur Website-Optimierung, SEO-Strategien sowie passenden Angeboten von GreenLabz Studio kontaktieren dürfen.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Widerrufsrecht:</strong> Du kannst dieser Einwilligung sowie der Nutzung deiner E-Mail-Adresse für E-Mail-Marketing jederzeit ohne Angabe von Gründen kostenfrei mit Wirkung für die Zukunft widersprechen. Nutze hierzu den Abmeldelink in jeder E-Mail oder sende eine kurze Nachricht an <a href="mailto:hello@greenlabz-studio.de" style={{ color: 'var(--accent)' }}>hello@greenlabz-studio.de</a>.
            </p>
          </section>

          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. Rechtsgrundlagen</h3>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung für den Empfang des Reports und Marketing-Informationen).
            </p>
          </section>

          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>4. Empfänger der Daten &amp; Tools</h3>
            <p style={{ marginBottom: '0.5rem' }}>
              Zur sicheren Durchführung nutzen wir folgende Dienstleister:
            </p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li><strong>Hosting &amp; Infrastruktur:</strong> Vercel Inc. (Bereitstellung der Webanwendung &amp; Serverless APIs)</li>
              <li><strong>E-Mail-Zustellung:</strong> SMTP-Mail-Provider zur Zustellung der Audit-Berichte</li>
              <li><strong>Interne Organisation:</strong> Google Sheets API zur strukturierten Verwaltung von Anfragen</li>
            </ul>
          </section>

          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>5. Speicherdauer</h3>
            <p>
              Wir speichern deine Daten nur so lange, wie es für die Erfüllung des Zweckes (Zustellung des Reports, Auswertung des Erstgesprächs) erforderlich ist oder bis du deine Einwilligung widerrufst bzw. der Löschung deiner Daten widersprichst.
            </p>
          </section>

          <section style={{ marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>6. Deine Rechte</h3>
            <p>
              Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.
            </p>
          </section>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn primary" onClick={onClose}>
              Verstanden &amp; Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
