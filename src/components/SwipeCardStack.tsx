import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Check, X } from 'lucide-react'

// Abstract Website Cards for the Swipe Stack
const initialCards = [
  {
    id: 'card-1',
    type: 'good',
    badge: 'BLEIBT',
    color: '#00CC6A',
    headerTitle: 'Zahnarzt Praxis Redesign',
    heroGradient: 'linear-gradient(135deg, rgba(0, 204, 106, 0.25), rgba(0, 180, 216, 0.15))',
    statusText: '0.04s • Top Eindruck',
  },
  {
    id: 'card-2',
    type: 'bad',
    badge: 'GEHT',
    color: '#ef4444',
    headerTitle: 'Alte Veraltete Website',
    heroGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(100, 100, 100, 0.15))',
    statusText: '0.05s • Unübersichtlich',
  },
  {
    id: 'card-3',
    type: 'good',
    badge: 'BLEIBT',
    color: '#00CC6A',
    headerTitle: 'Moderne KI-Klinik Web',
    heroGradient: 'linear-gradient(135deg, rgba(0, 204, 106, 0.3), rgba(167, 139, 250, 0.2))',
    statusText: '0.03s • Ultra Fast',
  },
]

export function SwipeCardStack() {
  const stackRef = useRef<HTMLDivElement>(null)
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const stackContainer = stackRef.current
    if (!stackContainer) return

    const cards = cardElsRef.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length < 3) return

    // Position initial stack: 0 top, 1 middle, 2 back
    const updateStackPositions = () => {
      gsap.set(cards[0], { y: 0, scale: 1, zIndex: 3, opacity: 1, rotation: 0, x: 0 })
      gsap.set(cards[1], { y: 7, scale: 0.94, zIndex: 2, opacity: 0.85, rotation: -1, x: 0 })
      gsap.set(cards[2], { y: 14, scale: 0.88, zIndex: 1, opacity: 0.6, rotation: 1, x: 0 })
    }

    updateStackPositions()

    let currentIndex = 0
    let activeTimeline: gsap.core.Timeline | null = null

    // Main automated swipe loop
    const runSwipeSequence = () => {
      const cardOrder = [
        (currentIndex) % 3,
        (currentIndex + 1) % 3,
        (currentIndex + 2) % 3,
      ]

      const topCard = cards[cardOrder[0]]
      const midCard = cards[cardOrder[1]]
      const botCard = cards[cardOrder[2]]

      const isBleibt = cardOrder[0] % 2 === 0 // Even index = Bleibt (Right), Odd = Geht (Left)
      const dirX = isBleibt ? 130 : -130
      const rotationDeg = isBleibt ? 9 : -9

      const bleibtBadge = topCard.querySelector('.swipe-badge-bleibt')
      const gehtBadge = topCard.querySelector('.swipe-badge-geht')
      const cardGlow = topCard.querySelector('.swipe-card-glow')

      const tl = gsap.timeline({
        onComplete: () => {
          // Reset swiped topCard to bottom of stack
          gsap.set(topCard, {
            x: 0,
            y: 14,
            scale: 0.88,
            rotation: (currentIndex % 2 === 0 ? 1 : -1),
            opacity: 0.6,
            zIndex: 1,
          })
          if (bleibtBadge) gsap.set(bleibtBadge, { opacity: 0, scale: 0.7 })
          if (gehtBadge) gsap.set(gehtBadge, { opacity: 0, scale: 0.7 })
          if (cardGlow) gsap.set(cardGlow, { opacity: 0 })

          currentIndex = (currentIndex + 1) % 3

          // Schedule next swipe iteration
          timerId = setTimeout(runSwipeSequence, 1200)
        },
      })

      activeTimeline = tl

      // Phase 1: Glow & Badge Flash
      if (isBleibt && bleibtBadge) {
        tl.to(bleibtBadge, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(1.7)' }, 0)
      } else if (!isBleibt && gehtBadge) {
        tl.to(gehtBadge, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(1.7)' }, 0)
      }

      if (cardGlow) {
        tl.to(cardGlow, { opacity: 0.8, duration: 0.15 }, 0)
      }

      // Phase 2: Swipe Top Card away
      tl.to(
        topCard,
        {
          x: dirX,
          rotation: rotationDeg,
          opacity: 0,
          duration: 0.48,
          ease: 'power2.inOut',
        },
        0.15
      )

      // Phase 3: Shift lower cards up into top/mid position
      tl.to(
        midCard,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          zIndex: 3,
          duration: 0.42,
          ease: 'power2.out',
        },
        0.18
      )

      tl.to(
        botCard,
        {
          y: 7,
          scale: 0.94,
          opacity: 0.85,
          zIndex: 2,
          duration: 0.42,
          ease: 'power2.out',
        },
        0.22
      )
    }

    let timerId = setTimeout(runSwipeSequence, 1000)

    return () => {
      clearTimeout(timerId)
      if (activeTimeline) activeTimeline.kill()
    }
  }, [])

  return (
    <div ref={stackRef} className="gl-swipe-stack-container">
      {initialCards.map((card, idx) => (
        <div
          key={card.id}
          ref={(el) => { cardElsRef.current[idx] = el }}
          className={`gl-swipe-card gl-swipe-card-${card.type}`}
        >
          {/* Subtler Background Glow Effect */}
          <div
            className="swipe-card-glow"
            style={{
              background: card.type === 'good'
                ? 'radial-gradient(circle at 50% 0%, rgba(0, 204, 106, 0.35), transparent 70%)'
                : 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.3), transparent 70%)',
            }}
          />

          {/* Swipe Badges Overlay */}
          <div className="swipe-badge swipe-badge-bleibt">
            <Check size={11} strokeWidth={3} />
            <span>BLEIBT</span>
          </div>

          <div className="swipe-badge swipe-badge-geht">
            <X size={11} strokeWidth={3} />
            <span>GEHT</span>
          </div>

          {/* Abstract Website Skeleton UI */}
          <div className="swipe-card-inner">
            {/* Header / Nav Bar */}
            <div className="swipe-card-nav">
              <span className="swipe-card-dot" style={{ background: card.color }} />
              <div className="swipe-card-title-bar">{card.headerTitle}</div>
              <span className="swipe-card-status">{card.statusText}</span>
            </div>

            {/* Abstract Hero Banner */}
            <div className="swipe-card-hero" style={{ background: card.heroGradient }}>
              <div className="swipe-card-hero-text">
                <div className="swipe-line swipe-line-title" />
                <div className="swipe-line swipe-line-sub" />
              </div>
              <div className="swipe-card-hero-cta" style={{ background: card.color }}>
                {card.type === 'good' ? '1-Klick' : 'Ladezeit...'}
              </div>
            </div>

            {/* Content Lines */}
            <div className="swipe-card-body">
              <div className="swipe-line swipe-line-full" />
              <div className="swipe-line swipe-line-half" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
