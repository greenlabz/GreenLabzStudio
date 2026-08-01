import { useState, useRef, useEffect } from 'react'
import { CheckCircle2, TrendingUp, Search, CalendarCheck, ShieldCheck, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const caseResults = [
  {
    icon: Search,
    title: 'Jetzt Top 3 bei Google in der Region',
    desc: 'Lokale SEO & GEO-Optimierung für Neuer Ansturm',
    badge: 'TOP 3 GOOGLE',
  },
  {
    icon: CalendarCheck,
    title: 'Vereinfachte Terminvergabe',
    desc: 'Direkter 2-Klick Termin-CTA ohne Hürden',
    badge: '2-KLICK TERMIN',
  },
  {
    icon: TrendingUp,
    title: '+43% Mehr Patienten-Anfragen',
    desc: 'Binnen 60 Tagen nach Relaunch erzielt',
    badge: '+43% ERFOLG',
  },
  {
    icon: ShieldCheck,
    title: 'Vertrauen & 100% Barrierefreiheit',
    desc: 'Mobile-First Design mit perfekter Führung',
    badge: '100% MOBILE-FIRST',
  },
  {
    icon: Zap,
    title: '0.7s Ladezeit & KI-Sichtbarkeit',
    desc: 'Optimiert für Google, ChatGPT & Co',
    badge: '0.7s ULTRA-FAST',
  },
]

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // GSAP ScrollTrigger für den echten Scroll-Stop (Pinned Stacking Cards)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const matchMedia = window.matchMedia('(min-width: 768px)')
    if (!matchMedia.matches) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top+=80px',
      end: `+=${caseResults.length * 280}px`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        const index = Math.min(
          caseResults.length - 1,
          Math.floor(progress * caseResults.length)
        )
        setActiveCardIndex(index)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(position)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  return (
    <div ref={sectionRef} className="ba-case-pinned-wrapper">
      <div className="ba-case-grid">
        {/* Linke Seite: Vorher / Nachher Slider */}
        <div
          ref={containerRef}
          className="ba-slider-container"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          {/* NACHHER Bild (GreenLabz Studio Redesign) */}
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

          {/* VORHER Bild (Abgeschnitten durch Slider %) */}
          <div
            className="ba-image ba-before-image"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
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

          {/* Interaktiver Trenn-Regler */}
          <div
            className="ba-divider-handle"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="ba-divider-line" />
            <div className="ba-handle-button">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>

        {/* Rechte Seite: 3D Stacking Cards mit Scroll-Stop */}
        <div className="ba-stacking-cards-container">
          <div className="ba-stack-header">
            <span className="ba-results-tag">RELAUNCH ERFOLGE</span>
            <h4>Was das Redesign bewirkt hat:</h4>
          </div>

          <div className="ba-cards-stack">
            {caseResults.map((item, idx) => {
              const isStacked = idx <= activeCardIndex
              const isCurrent = idx === activeCardIndex
              const offsetTop = idx * 16
              const scale = 1 - (caseResults.length - 1 - idx) * 0.02

              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className={`ba-stacked-card ${isStacked ? 'stacked' : ''} ${isCurrent ? 'current' : ''}`}
                  style={{
                    top: `${offsetTop}px`,
                    transform: isStacked
                      ? `scale(${scale}) translateY(0)`
                      : `translateY(${120 + (idx - activeCardIndex) * 40}px) scale(0.92)`,
                    opacity: isStacked ? 1 : 0.25,
                    zIndex: idx + 1,
                  }}
                  onClick={() => setActiveCardIndex(idx)}
                >
                  <div className="ba-card-top">
                    <span className="ba-card-badge">{item.badge}</span>
                    <div className="ba-check-icon">
                      <CheckCircle2 className="check-svg glow" size={24} />
                    </div>
                  </div>

                  <div className="ba-card-body">
                    <div className="ba-card-icon-box">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="ba-stack-indicator">
            <span>Scrollen zum Aufstapeln ({activeCardIndex + 1} / {caseResults.length})</span>
            <div className="ba-stack-dots">
              {caseResults.map((_, i) => (
                <span
                  key={i}
                  className={`stack-dot ${i <= activeCardIndex ? 'active' : ''}`}
                  onClick={() => setActiveCardIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
