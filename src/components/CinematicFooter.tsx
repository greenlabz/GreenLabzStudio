import * as React from 'react'
import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUp, ArrowUpRight, ExternalLink, Mail, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type CinematicFooterProps = {
  onPrimaryClick: () => void
  onContactClick: () => void
  onNavigate: (route: string) => void
  onOpenImpressum: () => void
  onOpenDatenschutz?: () => void
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
  { number: '04', label: 'Investition', target: 'pricing' },
  { number: '05', label: 'Fragen & Antworten', target: 'faq' },
] as const

export default function CinematicFooter({ onPrimaryClick, onContactClick, onNavigate, onOpenImpressum, onOpenDatenschutz }: CinematicFooterProps) {
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
              <MagneticButton type="button" onClick={onPrimaryClick} className="cinematic-footer-nav-link">
                <span>06</span>
                <strong>Kostenloses Erstgespräch</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton type="button" onClick={() => onNavigate('ratgeber')} className="cinematic-footer-nav-link">
                <span>07</span>
                <strong>Ratgeber</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton type="button" onClick={onContactClick} className="cinematic-footer-nav-link">
                <span>08</span>
                <strong>Kontakt</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
            </nav>
            <nav className="cinematic-footer-legal" aria-label="Rechtliches">
              <MagneticButton type="button" onClick={onOpenImpressum}>Impressum</MagneticButton>
              <MagneticButton type="button" onClick={onOpenDatenschutz}>Datenschutz</MagneticButton>
            </nav>
          </div>
        </div>

        <div className="cinematic-footer-bottom">
          <div className="cinematic-footer-socials" aria-label="Social Links">
            <MagneticAnchor href="mailto:hallo@greenlabz.de" aria-label="E-Mail"><Mail size={17} /></MagneticAnchor>
            <MagneticAnchor href="https://wa.me/491604928749" aria-label="WhatsApp"><MessageCircle size={17} /></MagneticAnchor>
            <MagneticAnchor href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><ExternalLink size={17} /></MagneticAnchor>
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
