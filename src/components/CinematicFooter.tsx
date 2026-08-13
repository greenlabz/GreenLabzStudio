import { ArrowRight, MessageCircle } from 'lucide-react'

type StandardFooterProps = {
  onPrimaryClick: () => void
  onContactClick: () => void
  onNavigate: (route: string) => void
}

const links = [
  ['Startseite', 'top'],
  ['Projekte & Ergebnisse', 'cases'],
  ['Leistungen', 'services'],
  ['Apps & Tools', 'home#lab'],
  ['Investition', 'pricing'],
  ['Fragen & Antworten', 'faq'],
] as const

export default function StandardFooter({ onPrimaryClick, onContactClick, onNavigate }: StandardFooterProps) {
  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault()
    onNavigate(target.includes('#') ? target : 'home')
    const section = target.includes('#') ? target.split('#')[1] : target
    window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  return (
    <footer className="standard-footer">
      <div className="standard-footer-inner">
        <div className="standard-footer-top">
          <div className="standard-footer-brand-column">
            <a href="#top" className="standard-footer-brand" onClick={(event) => goToSection(event, 'top')}>
              <span className="standard-footer-logo" role="img" aria-label="GreenLabz Studio" />
            </a>
            <p>Websites, Apps und digitale Systeme für Unternehmen, die sichtbar werden wollen.</p>
            <button type="button" className="standard-footer-cta" onClick={onPrimaryClick}>
              Kostenloses Erstgespräch <ArrowRight size={17} />
            </button>
          </div>

          <nav aria-label="Footer-Navigation" className="standard-footer-column">
            <h2>Navigation</h2>
            {links.map(([label, target]) => (
              <a key={target} href={target.includes('#') ? `/${target}` : `#${target}`} onClick={(event) => goToSection(event, target)}>{label}</a>
            ))}
          </nav>

          <div className="standard-footer-column standard-footer-contact-column">
            <h2>Kontakt</h2>
            <a href="mailto:hallo@greenlabz.de">hallo@greenlabz.de</a>
            <button type="button" onClick={onContactClick}>Nachricht senden <MessageCircle size={15} /></button>
            <span>Baden-Württemberg, Deutschland</span>
            <div className="standard-footer-socials" aria-label="Social Links">
              <a href="https://www.instagram.com/greenlabz.studio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://www.linkedin.com/company/greenlabz-studio/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              <a href="https://wa.me/491604928749" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a>
            </div>
          </div>
        </div>

        <div className="standard-footer-bottom">
          <span>© 2026 GreenLabz Studio</span>
          <div className="standard-footer-legal">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutzerklärung</a>
          </div>
          <span>Engineering, Design and Strategy.</span>
        </div>
      </div>
    </footer>
  )
}
