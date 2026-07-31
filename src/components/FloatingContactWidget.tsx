import { useEffect, useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'

export function FloatingContactWidget() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <aside className={`floating-contact-sidebar ${isVisible ? 'is-visible' : ''}`} aria-label="Schnellkontakt">
      {/* WhatsApp Button: Kreis, der sich beim Hovern zur Pille ausdehnt */}
      <a
        href="https://wa.me/491604928749"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-expand-btn floating-whatsapp"
        aria-label="WhatsApp Chat starten"
      >
        <span className="expand-text">WhatsApp</span>
        <div className="expand-icon-circle" aria-hidden="true">
          <MessageCircle size={20} />
        </div>
      </a>

      {/* E-Mail Button: Kreis, der sich beim Hovern zur Pille ausdehnt */}
      <a
        href="mailto:hallo@greenlabz-studio.de"
        className="floating-expand-btn floating-email"
        aria-label="E-Mail schreiben"
      >
        <span className="expand-text">E-Mail</span>
        <div className="expand-icon-circle" aria-hidden="true">
          <Mail size={20} />
        </div>
      </a>
    </aside>
  )
}
