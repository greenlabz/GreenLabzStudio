import { useState, useRef, useEffect } from 'react'
import { CheckCircle2, TrendingUp, Search, CalendarCheck, ShieldCheck, Zap } from 'lucide-react'

const caseResults = [
  {
    icon: Search,
    title: 'Jetzt Top 3 bei Google in der Region',
    desc: 'Lokale SEO & GEO-Optimierung für Neuer Ansturm',
  },
  {
    icon: CalendarCheck,
    title: 'Vereinfachte Terminvergabe',
    desc: 'Direkter 2-Klick Termin-CTA ohne Hürden',
  },
  {
    icon: TrendingUp,
    title: '+43% Mehr Patienten-Anfragen',
    desc: 'Binnen 60 Tagen nach Relaunch erzielt',
  },
  {
    icon: ShieldCheck,
    title: 'Vertrauen & 100% Barrierefreiheit',
    desc: 'Mobile-First Design mit perfekter Führung',
  },
  {
    icon: Zap,
    title: '0.7s Ladezeit & KI-Sichtbarkeit',
    desc: 'Optimiert für Google, ChatGPT & Co',
  },
]

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Nur 1 Zeile gleichzeitig eingeblendet - rotiert alle 3.2 Sekunden
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

  const currentResult = caseResults[activeItemIndex]
  const CurrentIcon = currentResult.icon

  return (
    <div className="ba-case-side-grid ba-case-side-grid--flipped">
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

      {/* Rechts: alle 5 Karten im 2-spaltigem Grid */}
      <div className="ba-grid-results-panel">
        <div className="ba-results-header">
          <span className="ba-results-tag">RELAUNCH ERFOLGE</span>
          <h4>Was das Redesign bewirkt hat:</h4>
        </div>

        <div className="ba-cards-2col">
          {caseResults.map((item, idx) => {
            const isActive = idx === activeItemIndex
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`ba-mini-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveItemIndex(idx)}
              >
                <div className="ba-mini-card-top">
                  <CheckCircle2 className={`check-svg ${isActive ? 'glow' : ''}`} size={18} />
                  <Icon size={15} className="ba-mini-icon" />
                </div>
                <h5>{item.title}</h5>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
