import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUp, ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type CinematicFooterProps = {
  onPrimaryClick: () => void
  onContactClick: () => void
  onNavigate: (route: string) => void
}

type MagneticAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function useMagnetic<T extends HTMLElement>(elementRef: React.RefObject<T | null>) {
  useEffect(() => {
    const element = elementRef.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return

    const move = (event: MouseEvent) => {
      const bounds = element.getBoundingClientRect()
      const x = event.clientX - bounds.left - bounds.width / 2
      const y = event.clientY - bounds.top - bounds.height / 2
      gsap.to(element, { x: x * .16, y: y * .16, rotationX: -y * .08, rotationY: x * .08, scale: 1.025, duration: .35, ease: 'power3.out', overwrite: true })
    }
    const leave = () => gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: .55, ease: 'power3.out', overwrite: true })

    element.addEventListener('mousemove', move)
    element.addEventListener('mouseleave', leave)
    return () => {
      element.removeEventListener('mousemove', move)
      element.removeEventListener('mouseleave', leave)
      gsap.killTweensOf(element)
    }
  }, [elementRef])
}

function MagneticAnchor({ className = '', children, ...props }: MagneticAnchorProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref)
  return <a ref={ref} className={`cinematic-footer-magnetic ${className}`} {...props}>{children}</a>
}

function MagneticButton({ className = '', children, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  useMagnetic(ref)
  return <button ref={ref} className={`cinematic-footer-magnetic ${className}`} {...props}>{children}</button>
}

function BrandMark({ type }: { type: 'instagram' | 'tiktok' | 'linkedin' }) {
  if (type === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" /></svg>
  if (type === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8 10v6M8 8v.1M11.5 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M11.5 10v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4v9.1a3.5 3.5 0 1 1-3.5-3.5M14.5 4c.7 1.8 2 3 4 3.3v2.2c-1.5-.1-2.8-.6-4-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function MarqueeItem() {
  return (
    <div className="cinematic-footer-marquee-item">
      <span>Webdesign, das auff&auml;llt</span><b aria-hidden="true">&#10022;</b>
      <span>SEO &amp; KI-Suche</span><b>✦</b>
      <span>Direkt mit mir</span><b aria-hidden="true">&#10022;</b>
      <span>Ultraschnell</span><b>✦</b>
      <span>1:1 umgesetzt</span><b aria-hidden="true">&#10022;</b>
    </div>
  )
}

const footerLinks = [
  { number: '01', label: 'Startseite', target: 'top' },
  { number: '02', label: 'Projekte & Ergebnisse', target: 'cases' },
  { number: '03', label: 'Leistungen', target: 'services' },
] as const

export default function CinematicFooter({ onPrimaryClick, onContactClick, onNavigate }: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault()
    onNavigate('home')
    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.fromTo([headingRef.current, linksRef.current], { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: .15, ease: 'power3.out',
        scrollTrigger: { trigger: wrapper, start: 'top 40%', end: 'bottom bottom', scrub: 1 },
      })
    }, wrapper)

    return () => context.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="cinematic-footer-shell">
      <footer className="cinematic-footer">
        <div className="cinematic-footer-aurora" aria-hidden="true" />
        <div className="cinematic-footer-grid" aria-hidden="true" />

        <div className="cinematic-footer-marquee" aria-hidden="true">
          <div className="cinematic-footer-marquee-track">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div className="cinematic-footer-center">
          <a className="cinematic-footer-brand" href="#top" onClick={(event) => goToSection(event, 'top')} aria-label="GreenLabz Studio Startseite">
            <img src="/assets/greenlabz-studio-logo.svg" alt="GreenLabz Studio" width="56" height="56" />
            <span>GreenLabz Studio</span>
          </a>
          <h2 ref={headingRef}>Bereit f&uuml;r <span>Sichtbarkeit?</span></h2>
          <div ref={linksRef} className="cinematic-footer-actions">
            <div className="cinematic-footer-main-actions">
              <MagneticButton type="button" onClick={onPrimaryClick} className="cinematic-footer-pill cinematic-footer-primary">
                Kostenloses Erstgespräch <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton type="button" onClick={onContactClick} className="cinematic-footer-pill cinematic-footer-secondary">
                Nachricht senden <MessageCircle size={18} />
              </MagneticButton>
            </div>
            <nav className="cinematic-footer-nav" aria-label="Seitennavigation">
              {footerLinks.map((link) => (
                <MagneticAnchor
                  key={link.number}
                  href={`#${link.target}`}
                  onClick={(event) => goToSection(event, link.target)}
                  className="cinematic-footer-nav-link"
                >
                  <span>{link.number}</span>
                  <strong>{link.label}</strong>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </MagneticAnchor>
              ))}
              <MagneticButton type="button" onClick={() => onNavigate('home#lab')} className="cinematic-footer-nav-link">
                <span>04</span>
                <strong>Apps &amp; Tools</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
              <MagneticAnchor
                href="#pricing"
                onClick={(event) => goToSection(event, 'pricing')}
                className="cinematic-footer-nav-link"
              >
                <span>05</span>
                <strong>Investition</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticAnchor>
              <MagneticAnchor
                href="#faq"
                onClick={(event) => goToSection(event, 'faq')}
                className="cinematic-footer-nav-link"
              >
                <span>06</span>
                <strong>Fragen &amp; Antworten</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticAnchor>
              <MagneticButton type="button" onClick={onPrimaryClick} className="cinematic-footer-nav-link">
                <span>07</span>
                <strong>Kostenloses Erstgespräch</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton type="button" onClick={() => onNavigate('ratgeber')} className="cinematic-footer-nav-link">
                <span>08</span>
                <strong>Ratgeber</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton type="button" onClick={onContactClick} className="cinematic-footer-nav-link">
                <span>09</span>
                <strong>Kontakt</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
            </nav>
            <nav className="cinematic-footer-legal" aria-label="Rechtliches">
              <MagneticAnchor href="/impressum">Impressum</MagneticAnchor>
              <MagneticAnchor href="/datenschutz">Datenschutz</MagneticAnchor>
            </nav>
          </div>
        </div>

        <div className="cinematic-footer-bottom">
          <div className="cinematic-footer-socials" aria-label="Social Links">
            <MagneticAnchor href="mailto:hallo@greenlabz.de" aria-label="E-Mail"><Mail size={17} /></MagneticAnchor>
            <MagneticAnchor href="https://wa.me/491604928749" aria-label="WhatsApp"><MessageCircle size={17} /></MagneticAnchor>
            <MagneticAnchor href="https://www.instagram.com/greenlabz.studio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><BrandMark type="instagram" /></MagneticAnchor>
            <MagneticAnchor href="https://www.tiktok.com/@greenlabz.studio" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><BrandMark type="tiktok" /></MagneticAnchor>
            <MagneticAnchor href="https://www.linkedin.com/company/greenlabz-studio/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BrandMark type="linkedin" /></MagneticAnchor>
          </div>
          <span>&copy; 2026 GreenLabz Studio. Engineering, Design and Strategy.</span>
          <MagneticButton type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Nach oben" className="cinematic-footer-top"><ArrowUp size={18} /></MagneticButton>
        </div>

        <div className="cinematic-footer-contact">
          <span>hallo@greenlabz.de</span>
          <span>Baden-W&uuml;rttemberg, DE</span>
          <span>Direkt mit mir</span>
        </div>
      </footer>
    </div>
  )
}
