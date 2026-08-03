import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, CalendarCheck, TrendingUp, ShieldCheck, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const caseResults = [
  { icon: Search,        label: 'TOP 3 GOOGLE',   title: 'Jetzt Top 3 bei Google in der Region' },
  { icon: CalendarCheck, label: '2-KLICK TERMIN',  title: 'Vereinfachte Terminvergabe' },
  { icon: TrendingUp,    label: '+43% ERFOLG',     title: '+43% Mehr Patienten-Anfragen' },
  { icon: ShieldCheck,   label: '100% MOBILE-FIRST', title: 'Vertrauen & 100% Barrierefreiheit' },
  { icon: Zap,           label: '0.7s ULTRA-FAST', title: '0.7s Ladezeit & KI-Sichtbarkeit' },
]

export function BeforeAfterSlider() {
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const beforeRef    = useRef<HTMLDivElement>(null)
  const cardsRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current || !beforeRef.current || !cardsRef.current) return

      const cards = cardsRef.current.querySelectorAll<HTMLElement>('.ba-scroll-card')

      // Timeline: clipPath des Vorher-Bilds schrumpft von 100 % → 0 %
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 60%',
          end: '+=700',
          scrub: 1.2,
          pin: false,
        },
      })

      // Vorher-Bild verschwindet von rechts nach links
      tl.fromTo(
        beforeRef.current,
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)', ease: 'none' },
        0
      )

      // Karten faden zeitversetzt ein
      tl.fromTo(
        cards,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, stagger: 0.12, ease: 'power2.out' },
        0.1
      )
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

        {/* Badges */}
        <div className="ba-badge before-badge">VORHER</div>
        <div className="ba-badge after-badge">NACHHER</div>
      </div>

      {/* ── RECHTS: Ergebnis-Karten ── */}
      <div ref={cardsRef} className="ba-scroll-cards-panel">
        <p className="ba-scroll-cards-label">RELAUNCH ERFOLGE</p>
        <h4 className="ba-scroll-cards-heading">Was das Redesign bewirkt hat:</h4>

        {caseResults.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="ba-scroll-card">
              <div className="ba-scroll-card-icon">
                <Icon size={18} />
              </div>
              <div className="ba-scroll-card-body">
                <span className="ba-scroll-card-tag">{item.label}</span>
                <p>{item.title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
