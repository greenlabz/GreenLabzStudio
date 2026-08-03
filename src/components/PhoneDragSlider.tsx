import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { Check, X, ChevronsLeftRight } from 'lucide-react'

export function PhoneDragSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState<number>(50) // percentage 0 to 100
  const isDraggingRef = useRef<boolean>(false)

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    if (containerRef.current) containerRef.current.setPointerCapture(e.pointerId)
    updatePosFromEvent(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    updatePosFromEvent(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      if (containerRef.current) containerRef.current.releasePointerCapture(e.pointerId)
    }
  }

  const updatePosFromEvent = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const posPercent = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(posPercent)
  }, [])

  // Auto Reveal Animation (GSAP timeline on mount/viewport trigger)
  useEffect(() => {
    const obj = { val: 20 }

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3.5,
      delay: 0.4,
    })

    // Sweep from 20% (mostly Vorher) -> 85% (mostly Nachher) -> settle at 55%
    tl.to(obj, {
      val: 85,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => setSliderPos(obj.val),
    })
    .to(obj, {
      val: 55,
      duration: 0.9,
      ease: 'sine.out',
      onUpdate: () => setSliderPos(obj.val),
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="gl-phone-drag-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* ── LAYER 1 (BOTTOM): NACHHER / GOOD STATE (GREEN) ── */}
      <div className="gl-drag-layer gl-drag-layer-after">
        <div className="gl-drag-badge gl-badge-after">
          <Check size={10} strokeWidth={3} />
          <span>NACHHER</span>
        </div>

        {/* Clean Website UI */}
        <div className="gl-drag-ui">
          <div className="gl-drag-nav">
            <span className="gl-drag-dot gl-dot-green" />
            <div className="gl-drag-title">Modern &amp; Ultraschnell</div>
            <span className="gl-drag-tag">0.7s</span>
          </div>

          <div className="gl-drag-hero gl-hero-good">
            <div className="gl-drag-hero-title" />
            <div className="gl-drag-hero-sub" />
            <div className="gl-drag-cta gl-cta-green">Termin buchen</div>
          </div>

          <div className="gl-drag-features">
            <div className="gl-drag-pill"><Check size={8} /> 100% Mobile</div>
            <div className="gl-drag-pill"><Check size={8} /> KI-SEO</div>
          </div>
        </div>
      </div>

      {/* ── LAYER 2 (TOP CLIPPED): VORHER / BAD STATE (RED/DESATURATED) ── */}
      <div
        className="gl-drag-layer gl-drag-layer-before"
        style={{
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
        }}
      >
        <div className="gl-drag-badge gl-badge-before">
          <X size={10} strokeWidth={3} />
          <span>VORHER</span>
        </div>

        {/* Cluttered / Bad Website UI */}
        <div className="gl-drag-ui gl-ui-bad">
          <div className="gl-drag-nav">
            <span className="gl-drag-dot gl-dot-red" />
            <div className="gl-drag-title gl-title-bad">Alte Unübersichtliche Web</div>
            <span className="gl-drag-tag gl-tag-bad">8.5s</span>
          </div>

          <div className="gl-drag-hero gl-hero-bad">
            <div className="gl-drag-hero-title gl-line-broken" />
            <div className="gl-drag-hero-sub gl-line-cluttered" />
            <div className="gl-drag-cta gl-cta-bad">Versteckt...</div>
          </div>

          <div className="gl-drag-features">
            <div className="gl-drag-pill gl-pill-bad"><X size={8} /> 50% Absprung</div>
            <div className="gl-drag-pill gl-pill-bad"><X size={8} /> Langsam</div>
          </div>
        </div>
      </div>

      {/* ── DRAG HANDLE (VERTICAL LINE & KNOB) ── */}
      <div
        className="gl-drag-handle-line"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="gl-drag-knob">
          <ChevronsLeftRight size={12} />
        </div>
      </div>
    </div>
  )
}
