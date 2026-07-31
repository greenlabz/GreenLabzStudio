import { Mail, MessageCircle } from 'lucide-react'

export function FloatingContactWidget() {
  return (
    <aside className="floating-contact-widget" aria-label="Schnellkontakt">
      <a
        href="https://wa.me/491604928749"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-btn floating-whatsapp"
        aria-label="WhatsApp Nachricht senden"
      >
        <MessageCircle size={22} />
        <span className="floating-tooltip">WhatsApp</span>
      </a>

      <a
        href="mailto:hallo@greenlabz-studio.de"
        className="floating-contact-btn floating-email"
        aria-label="E-Mail schreiben"
      >
        <Mail size={21} />
        <span className="floating-tooltip">E-Mail</span>
      </a>
    </aside>
  )
}
