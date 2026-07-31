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
      {/* WhatsApp Pill Button (wie im Referenzbild im GreenLabz Stil) */}
      <a
        href="https://wa.me/491604928749"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-pill-btn floating-whatsapp-pill"
        aria-label="WhatsApp Chat starten"
      >
        <span>WhatsApp</span>
        <div className="pill-icon-circle" aria-hidden="true">
          <MessageCircle size={18} />
        </div>
      </a>

      {/* E-Mail Circle Button */}
      <a
        href="mailto:hallo@greenlabz-studio.de"
        className="floating-circle-btn floating-email-circle"
        aria-label="E-Mail schreiben"
        title="E-Mail schreiben"
      >
        <Mail size={22} />
        <span className="circle-tooltip">E-Mail</span>
      </a>
    </aside>
  )
}
