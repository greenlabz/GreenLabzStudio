import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Check, LoaderCircle, Zap } from 'lucide-react'

export function CountdownRace() {
  const containerRef = useRef<HTMLDivElement>(null)
  const greenBarRef = useRef<HTMLDivElement>(null)
  const greyBarRef = useRef<HTMLDivElement>(null)
  const greenTimeRef = useRef<HTMLElement>(null)
  const greyTimeRef = useRef<HTMLElement>(null)
  const greenBadgeRef = useRef<HTMLDivElement>(null)
  const greyBadgeRef = useRef<HTMLDivElement>(null)
  const deltaLabelRef = useRef<HTMLDivElement>(null)
  const greenGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const times = { green: 0, grey: 0 }

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.8,
        delay: 0.2,
      })

      // Reset state at start of loop
      tl.set(times, { green: 0, grey: 0 })
      tl.set(greenBarRef.current, { width: '0%' })
      tl.set(greyBarRef.current, { width: '0%' })
      tl.set(greenBadgeRef.current, { opacity: 0, scale: 0.6 })
      tl.set(greyBadgeRef.current, { opacity: 0, scale: 0.6 })
      tl.set(deltaLabelRef.current, { opacity: 0, y: 6 })
      tl.set(greenGlowRef.current, { opacity: 0 })

      // ── FAST WINNER: GreenLabz Bar (0s -> 0:03 in 0.9s) ──
      tl.to(times, {
        green: 3,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: () => {
          if (greenTimeRef.current) {
            const sec = Math.round(times.green)
            greenTimeRef.current.textContent = `0:${sec < 10 ? '0' : ''}${sec}`
          }
        },
      }, 0)

      tl.to(greenBarRef.current, {
        width: '100%',
        duration: 0.9,
        ease: 'power2.out',
      }, 0)

      // Green Winner Check Badge & Glow Pulse
      tl.to(greenBadgeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(2)',
      }, 0.85)

      tl.to(greenGlowRef.current, {
        opacity: 0.9,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.9)
      .to(greenGlowRef.current, {
        opacity: 0.3,
        duration: 0.5,
        ease: 'power2.inOut',
      })

      // Delta Badge "+3 Min schneller" fades in upon green victory!
      tl.to(deltaLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'back.out(1.7)',
      }, 1.0)

      // ── SLOW SLUG: Grey Competitor Bar (0s -> 0:47 in 3.8s) ──
      tl.to(times, {
        grey: 47,
        duration: 3.2,
        ease: 'linear',
        onUpdate: () => {
          if (greyTimeRef.current) {
            const sec = Math.round(times.grey)
            greyTimeRef.current.textContent = `0:${sec < 10 ? '0' : ''}${sec}`
          }
        },
      }, 0)

      tl.to(greyBarRef.current, {
        width: '85%',
        duration: 3.2,
        ease: 'linear',
      }, 0)

      tl.to(greyBadgeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.5)',
      }, 2.8)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="gl-race-card">
      {/* Race Track 1: GreenLabz (Winner) */}
      <div className="gl-race-row gl-race-winner">
        <div className="gl-race-meta">
          <span className="gl-race-name gl-name-green">GreenLabz</span>
          <span className="gl-race-time"><strong ref={greenTimeRef}>0:03</strong></span>
        </div>

        <div className="gl-race-track">
          <div ref={greenBarRef} className="gl-race-fill gl-fill-green">
            <div ref={greenGlowRef} className="gl-race-glow" aria-hidden="true" />
          </div>
          <div ref={greenBadgeRef} className="gl-race-badge gl-badge-green">
            <Check size={9} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Race Track 2: Wettbewerb (Slow) */}
      <div className="gl-race-row gl-race-loser">
        <div className="gl-race-meta">
          <span className="gl-race-name gl-name-grey">Wettbewerb</span>
          <span className="gl-race-time"><strong ref={greyTimeRef}>0:47</strong></span>
        </div>

        <div className="gl-race-track">
          <div ref={greyBarRef} className="gl-race-fill gl-fill-grey" />
          <div ref={greyBadgeRef} className="gl-race-badge gl-badge-grey">
            <LoaderCircle size={9} className="gl-race-spin" />
          </div>
        </div>
      </div>

      {/* Delta Victory Badge */}
      <div ref={deltaLabelRef} className="gl-race-delta">
        <Zap size={10} />
        <span>+3 Min schneller</span>
      </div>
    </div>
  )
}
