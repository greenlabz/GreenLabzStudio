import { useEffect, useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'

export function FloatingContactWidget() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Einblenden zusammen mit der Menu-Bar / Nav-Leiste (ab 250px Scroll)
      if (window.scrollY > 250) {
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
      {/* WhatsApp Button (CTA Optik -> dehnt sich beim Hovern zur transparenten Glasmorphism-Pille aus) */}
      <a
        href="https://wa.me/491604928749"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta-btn floating-whatsapp-cta"
        aria-label="WhatsApp Chat starten"
      >
        <span className="cta-expand-text">WhatsApp</span>
        <div className="cta-icon-badge" aria-hidden="true">
          <MessageCircle size={19} />
        </div>
      </a>

      {/* E-Mail Button (CTA Optik -> dehnt sich beim Hovern zur transparenten Glasmorphism-Pille aus) */}
      <a
        href="mailto:hallo@greenlabz-studio.de"
        className="floating-cta-btn floating-email-cta"
        aria-label="E-Mail schreiben"
      >
        <span className="cta-expand-text">E-Mail</span>
        <div className="cta-icon-badge" aria-hidden="true">
          <Mail size={19} />
        </div>
      </a>
    </aside>
  )
}
