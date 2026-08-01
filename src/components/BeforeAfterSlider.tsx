import { useState, useRef } from 'react'

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
      {/* NACHHER Bild (Vollmilch-Grün / Echtes Redesign) */}
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
        <span className="ba-badge after-badge">NACHHER (GreenLabz Studio)</span>
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
        <span className="ba-badge before-badge">VORHER (Alte Website)</span>
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
  )
}
