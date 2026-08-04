import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Laptop, Smartphone } from 'lucide-react'

export function MobileDesktopSplitBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopBarRef = useRef<HTMLDivElement>(null)
  const mobileBarRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const desktopCountRef = useRef<HTMLElement>(null)
  const mobileCountRef = useRef<HTMLElement>(null)
  const mobileGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { desktop: 0, mobile: 0 }

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.8,
        delay: 0.2,
      })

      // Reset state at start of loop
      tl.set(counter, { desktop: 0, mobile: 0 })
      tl.set(desktopBarRef.current, { width: '0%' })
      tl.set(mobileBarRef.current, { width: '0%' })
      tl.set(dividerRef.current, { opacity: 0, scale: 0.5 })
      tl.set(mobileGlowRef.current, { opacity: 0 })

      // Animate Counter + Widths parallelly (1.4s ease-out)
      tl.to(counter, {
        desktop: 19,
        mobile: 81,
        duration: 1.35,
        ease: 'power2.out',
        onUpdate: () => {
          if (desktopCountRef.current) desktopCountRef.current.textContent = `${Math.round(counter.desktop)}%`
          if (mobileCountRef.current) mobileCountRef.current.textContent = `${Math.round(counter.mobile)}%`
        },
      }, 0)

      tl.to(desktopBarRef.current, {
        width: '19%',
        duration: 1.35,
        ease: 'power2.out',
      }, 0)

      tl.to(mobileBarRef.current, {
        width: '81%',
        duration: 1.35,
        ease: 'power2.out',
      }, 0)

      // Divider pop-in at the junction
      tl.to(dividerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'back.out(1.8)',
      }, 1.1)

      // Green Glow Pulse on Mobile segment completion
      tl.to(mobileGlowRef.current, {
        opacity: 0.9,
        duration: 0.45,
        ease: 'power2.out',
      }, 1.25)
      .to(mobileGlowRef.current, {
        opacity: 0.35,
        duration: 0.6,
        ease: 'power2.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="gl-split-bar-card">
      {/* Top Labels with Live Counters */}
      <div className="gl-split-bar-labels">
        <div className="gl-split-label gl-split-label-desktop">
          <Laptop size={11} className="gl-split-icon" />
          <span>Desktop</span>
          <strong ref={desktopCountRef} className="gl-split-num">19%</strong>
        </div>

        <div className="gl-split-label gl-split-label-mobile">
          <strong ref={mobileCountRef} className="gl-split-num">81%</strong>
          <span>Mobile</span>
          <Smartphone size={11} className="gl-split-icon" />
        </div>
      </div>

      {/* Track & Segments */}
      <div className="gl-split-bar-track">
        {/* Desktop Segment (Left - 19%) */}
        <div className="gl-split-segment-wrapper gl-wrapper-desktop">
          <div ref={desktopBarRef} className="gl-split-bar-segment gl-bar-desktop" />
        </div>

        {/* Moving Divider / Seam */}
        <div ref={dividerRef} className="gl-split-divider" aria-hidden="true" />

        {/* Mobile Segment (Right - 81%) */}
        <div className="gl-split-segment-wrapper gl-wrapper-mobile">
          <div ref={mobileBarRef} className="gl-split-bar-segment gl-bar-mobile">
            <div ref={mobileGlowRef} className="gl-segment-glow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}
