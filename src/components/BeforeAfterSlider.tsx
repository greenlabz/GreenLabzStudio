import { useState, useRef, useEffect } from 'react'
import { CheckCircle2, TrendingUp, Search, CalendarCheck, ShieldCheck, Zap } from 'lucide-react'

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
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Automatische Rotation der Erfolgs-Features mit leuchtendem Häkchen
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % caseResults.length)
    }, 3200)
    return () => clearInterval(timer)
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
    <div className="ba-case-side-grid">
      {/* Links: Vorher / Nachher Slider */}
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

      {/* Rechts (rot markierter Bereich): Aufleuchtende Erfolgs-Karten */}
      <div className="ba-live-results-panel">
        <div className="ba-results-header">
          <span className="ba-results-tag">RELAUNCH ERFOLGE</span>
          <h4>Was das Redesign bewirkt hat:</h4>
        </div>

        <div className="ba-results-list">
          {caseResults.map((item, idx) => {
            const isActive = idx === activeItemIndex
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`ba-result-row ${isActive ? 'active' : ''}`}
                onClick={() => setActiveItemIndex(idx)}
              >
                <div className="ba-check-icon">
                  <CheckCircle2 className={`check-svg ${isActive ? 'glow' : ''}`} size={20} />
                </div>
                <div className="ba-result-text">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
                <div className="ba-result-feature-icon">
                  <Icon size={16} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="ba-results-progress-bar">
          <div
            className="ba-results-progress-fill"
            style={{ width: `${((activeItemIndex + 1) / caseResults.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
