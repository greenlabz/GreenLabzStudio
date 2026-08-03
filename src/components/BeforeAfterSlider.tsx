import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Eigene SVG-Icons pro Karte
const IconGoogle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
    <path d="M11 8v6M8 11h6" strokeWidth="2.5"/>
  </svg>
)
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M9 15l2 2 4-4"/>
  </svg>
)
const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
)
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const caseResults = [
  { Icon: IconGoogle,   label: 'TOP 3 GOOGLE',     metric: '#1–3',  title: 'Jetzt Top 3 bei Google in der Region', color: '#00cc6a' },
  { Icon: IconCalendar, label: '2-KLICK TERMIN',   metric: '2×',    title: 'Vereinfachte Terminvergabe',           color: '#00b4d8' },
  { Icon: IconTrend,    label: '+43% ERFOLG',      metric: '+43%',  title: 'Mehr Patienten-Anfragen',              color: '#f4a261' },
  { Icon: IconShield,   label: '100% MOBILE-FIRST',metric: '100%',  title: 'Vertrauen & Barrierefreiheit',         color: '#a78bfa' },
  { Icon: IconZap,      label: '0.7s ULTRA-FAST',  metric: '0.7s',  title: 'Ladezeit & KI-Sichtbarkeit',          color: '#fbbf24' },
]

export function BeforeAfterSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const beforeRef  = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current || !beforeRef.current || !cardsRef.current) return

      const cards = Array.from(
        cardsRef.current.querySelectorAll<HTMLElement>('.ba-stack-card')
      )

      // Karten initial versteckt (von unten)
      gsap.set(cards, { yPercent: 105, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 55%',
          end: '+=1200',
          scrub: 1.5,
          // Kein pin – zu tief im Container-Nesting für position:fixed
        },
      })

      // Phase 1 (0–22%): Vorher-Bild verschwindet
      tl.fromTo(
        beforeRef.current,
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)', ease: 'none', duration: 0.22 },
        0
      )

      // Phase 2 (22–100%): Karten stapeln sich
      const step = 0.17
      cards.forEach((card, i) => {
        tl.to(
          card,
          { yPercent: 0, opacity: 1, ease: 'power3.out', duration: 0.16 },
          0.24 + i * step
        )
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="ba-scroll-wrapper">

      {/* ── LINKS: Vorher / Nachher Slider ── */}
      <div className="ba-slider-container">
        {/* NACHHER */}
        <div className="ba-image ba-after-image">
          <div className="ba-browser-bar">
            <div className="ba-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="ba-url">zahnaerzte-roth.de (NEU / REDESIGN)</div>
          </div>
          <img src="/cases/roth.png" alt="Zahnarzt Dr. Roth Redesign Nachher" />
        </div>

        {/* VORHER – clipPath per GSAP gesteuert */}
        <div ref={beforeRef} className="ba-image ba-before-image">
          <div className="ba-browser-bar">
            <div className="ba-dots">
              <span className="dot" style={{ background: '#555' }} />
              <span className="dot" style={{ background: '#555' }} />
              <span className="dot" style={{ background: '#555' }} />
            </div>
            <div className="ba-url" style={{ color: '#888' }}>zahnaerzte-roth.de (VORHER / ALT)</div>
          </div>
          <img src="/cases/roth-before.jpg" alt="Zahnarzt Praxis Alte Website Vorher" />
        </div>

        <div className="ba-badge before-badge">VORHER</div>
        <div className="ba-badge after-badge">NACHHER</div>
      </div>

      {/* ── RECHTS: Stapel-Karten ── */}
      <div className="ba-stack-panel">
        <p className="ba-scroll-cards-label">RELAUNCH ERFOLGE</p>
        <h4 className="ba-scroll-cards-heading">Was das Redesign bewirkt hat:</h4>

        <div ref={cardsRef} className="ba-stack-deck">
          {caseResults.map((item) => (
            <div
              key={item.label}
              className="ba-stack-card"
              style={{ '--card-color': item.color } as React.CSSProperties}
            >
              <div className="ba-stack-card-icon">
                <item.Icon />
              </div>
              <div className="ba-stack-card-content">
                <span className="ba-stack-card-tag">{item.label}</span>
                <div className="ba-stack-card-metric">{item.metric}</div>
                <p className="ba-stack-card-title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
