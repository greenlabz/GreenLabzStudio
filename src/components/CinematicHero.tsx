import { useEffect, useLayoutEffect, useRef } from 'react'
import { Ban, Bolt, CheckCircle2, Handshake, MessageCircle, ScanSearch, TrendingUp, UserRound } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroWave from './HeroWave'
import WebsiteAuditTool from './WebsiteAuditTool'
import GreenLabzLaser from './GreenLabzLaser'

gsap.registerPlugin(ScrollTrigger)

interface CinematicHeroProps {
  onOpenDatenschutz?: () => void
}

export default function CinematicHero({ onOpenDatenschutz }: CinematicHeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const mainCardRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(0)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const handleMouseMove = (event: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return
      cancelAnimationFrame(requestRef.current)
      requestRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return
        const rect = mainCardRef.current.getBoundingClientRect()
        mainCardRef.current.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
        mainCardRef.current.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
        const x = (event.clientX / window.innerWidth - .5) * 2
        const y = (event.clientY / window.innerHeight - .5) * 2
        gsap.to(mockupRef.current, { rotationY: x * 12, rotationX: -y * 12, ease: 'power3.out', duration: 1.2, overwrite: true })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const all = (selector: string) => root.querySelectorAll(selector)
      if (reduce) {
        gsap.set(all('.gl-exact-reveal, .gl-exact-card-copy, .gl-exact-phone-wrap, .gl-exact-badge, .gl-exact-cta'), { autoAlpha: 1, clearProps: 'transform,filter' })
        return
      }

      gsap.set(all('.gl-exact-text-track'), { autoAlpha: 0, y: 60, scale: .85, filter: 'blur(20px)', rotationX: -20 })
      gsap.set(all('.gl-exact-text-days'), { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' })
      gsap.set(all('.gl-exact-main-card'), { y: window.innerHeight + 200, autoAlpha: 1 })
      gsap.set(all('.gl-exact-card-left, .gl-exact-card-right, .gl-exact-phone-wrap, .gl-exact-badge, .gl-exact-phone-state-one .gl-exact-phone-widget'), { autoAlpha: 0 })
      gsap.set(all('.gl-exact-phone-state, .gl-exact-card-copy'), { filter: 'blur(0px)' })
      gsap.set(all('.gl-exact-phone-state-two, .gl-exact-phone-state-three, .gl-exact-phone-state-four, .gl-exact-card-copy-two, .gl-exact-card-copy-three, .gl-exact-card-copy-four'), { autoAlpha: 0 })
      gsap.set(all('.gl-exact-speed-value, .gl-exact-speed-flash, .gl-exact-speed-point'), { autoAlpha: 0 })
      gsap.set(all('.gl-exact-cta'), { autoAlpha: 0, scale: .8, filter: 'blur(30px)' })

      gsap.timeline({ delay: .3 })
        .to(all('.gl-exact-text-track'), { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, ease: 'expo.out' })
        .to(all('.gl-exact-text-days'), { duration: 1.4, clipPath: 'inset(0 0% 0 0)', ease: 'power4.inOut' }, '-=1')

      const isMobile = window.innerWidth < 768
      const inquiryCounter = { value: 0 }
      const resultCounter = { value: 0 }
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=7000',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .to([...all('.gl-exact-hero-text-wrapper'), ...all('.gl-exact-bg-grid'), ...all('.gl-exact-scroll-cue')], { scale: 1.15, filter: 'blur(20px)', opacity: .2, ease: 'power2.inOut', duration: 2 }, 0)
        .to(all('.gl-exact-main-card'), { y: 0, ease: 'power3.inOut', duration: 2 }, 0)
        .to(all('.gl-exact-main-card'), { width: '100%', height: '100%', borderRadius: 0, ease: 'power3.inOut', duration: 1.5 })
        .fromTo(all('.gl-exact-phone-wrap'), { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: .6 }, { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2.5 }, '-=.8')
        .fromTo(all('.gl-exact-card-right'), { x: 50, autoAlpha: 0, scale: .8 }, { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2.5 }, '<')
        .addLabel('beat1')
        .fromTo(all('.gl-exact-phone-state-one .gl-exact-phone-widget'), { y: 40, autoAlpha: 0, scale: .95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: .15, ease: 'power3.out', duration: 1.5 }, 'beat1')
        .to(all('.gl-exact-progress-ring'), { strokeDashoffset: 60, duration: 2, ease: 'power3.inOut' }, '-=1.2')
        .fromTo(all('.gl-exact-badge-top'), { y: 100, autoAlpha: 0, scale: .7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'power3.out', duration: 1.5 }, 'beat1')
        .fromTo(all('.gl-exact-card-left'), { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 1.5 }, 'beat1')
        .to(all('.gl-exact-phone-state-one, .gl-exact-card-copy-one'), { y: -14, autoAlpha: 0, duration: .7, ease: 'power2.inOut' }, '+=.2')
        .fromTo(all('.gl-exact-phone-state-two, .gl-exact-card-copy-two'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85, ease: 'power3.out' }, '<+.1')
        .fromTo(inquiryCounter, { value: 0 }, { value: 12, duration: .6, ease: 'power3.out', onUpdate: () => all('.gl-exact-counter-value').forEach((element) => { element.textContent = `+${Math.round(inquiryCounter.value)}` }) }, '<')
        .fromTo(all('.gl-exact-badge-bottom'), { y: 100, autoAlpha: 0, scale: .7, rotationZ: 10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'power3.out', duration: .85 }, '<')
        .fromTo(all('.gl-exact-phone-notification'), { y: -48, autoAlpha: 0, scale: .92 }, { y: 0, autoAlpha: 1, scale: 1, duration: .8, ease: 'back.out(1.8)' }, '<+.2')
        .to(all('.gl-exact-phone-state-two, .gl-exact-card-copy-two'), { y: -14, autoAlpha: 0, duration: .7, ease: 'power2.inOut' }, '+=.35')
        .fromTo(all('.gl-exact-phone-state-three, .gl-exact-card-copy-three'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85, ease: 'power3.out' }, '<+.1')
        .fromTo(all('.gl-exact-badge-right'), { y: 100, autoAlpha: 0, scale: .7, rotationZ: 10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'power3.out', duration: .85 }, '<')
        .fromTo(all('.gl-exact-speed-line'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .45, ease: 'power4.out' }, '<+.1')
        .fromTo(all('.gl-exact-speed-point'), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: .25, ease: 'back.out(2)' }, '<+.35')
        .fromTo(all('.gl-exact-speed-value, .gl-exact-speed-flash'), { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, duration: .35, ease: 'back.out(2.4)' }, '<+.35')
        .to(all('.gl-exact-phone-state-three, .gl-exact-card-copy-three'), { y: -14, autoAlpha: 0, duration: .7, ease: 'power2.inOut' }, '+=.35')
        .fromTo(all('.gl-exact-phone-state-four, .gl-exact-card-copy-four'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85, ease: 'power3.out' }, '<+.1')
        .fromTo(all('.gl-exact-result-bar'), { scaleY: 0 }, { scaleY: 1, stagger: .1, duration: .55, ease: 'power3.out' }, '<+.1')
        .fromTo(resultCounter, { value: 0 }, { value: 38, duration: .75, ease: 'power3.out', onUpdate: () => all('.gl-exact-result-value').forEach((element) => { element.textContent = `+${Math.round(resultCounter.value)}%` }) }, '<')
        .fromTo(all('.gl-exact-result-arrow'), { autoAlpha: 0, y: 12, scale: .7 }, { autoAlpha: 1, y: 0, scale: 1, duration: .4, ease: 'back.out(2)' }, '<+.35')
        .fromTo(all('.gl-exact-badge-left'), { y: 100, autoAlpha: 0, scale: .7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'power3.out', duration: .85 }, '<')
        .to({}, { duration: 2.5 })
        .set(all('.gl-exact-hero-text-wrapper'), { autoAlpha: 0 })
        .to({}, { duration: 1.5 })
        .to([...all('.gl-exact-phone-wrap'), ...all('.gl-exact-badge'), ...all('.gl-exact-card-left'), ...all('.gl-exact-card-right')], { scale: .9, y: -40, z: -200, autoAlpha: 0, ease: 'power3.in', duration: 1.2, stagger: .05 })
        .set(all('.gl-exact-cta'), { autoAlpha: 1 }, 'pullback')
        .to(all('.gl-exact-main-card'), { width: isMobile ? '92vw' : '85vw', height: isMobile ? '92vh' : '85vh', borderRadius: isMobile ? '32px' : '40px', ease: 'expo.inOut', duration: 1.8 }, 'pullback')
        .to(all('.gl-exact-cta'), { scale: 1, filter: 'blur(0px)', ease: 'expo.inOut', duration: 1.8 }, 'pullback')
        .to(
          [...all('.gl-exact-main-card'), ...all('.gl-exact-cta')],
          {
            y: () => isMobile ? -window.innerHeight : -window.innerHeight - 300,
            ease: 'power3.in',
            duration: isMobile ? .6 : 1.5,
          },
        )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="gl-exact-hero" id="top">
      <div className="gl-exact-film-grain" aria-hidden="true" />
      <HeroWave />
      <div className="gl-exact-bg-grid" aria-hidden="true" />

      <div className="gl-exact-hero-text-wrapper" style={{ position: 'relative' }}>
        <GreenLabzLaser />
        <div className="gl-exact-text-track">
          <h1 className="gl-exact-text-3d">Umsatzstarke <span className="gl-exact-serif">Websites</span> &amp;</h1>
          <h1 className="gl-exact-text-days">Software <span className="gl-exact-serif">die verkaufen.</span></h1>
        </div>
      </div>

      <div className="gl-exact-cta">
        <WebsiteAuditTool onOpenDatenschutz={onOpenDatenschutz} />
      </div>

      <div className="gl-exact-foreground">
        <div ref={mainCardRef} className="gl-exact-main-card">
          <div className="gl-exact-card-sheen" aria-hidden="true" />
          <div className="gl-exact-card-layout">
            <div className="gl-exact-card-right"><h2>GreenLabz Studio</h2></div>

            <div className="gl-exact-phone-wrap">
              <div className="gl-exact-phone-inner">
                <div ref={mockupRef} className="gl-exact-phone-bezel">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" aria-hidden="true" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" aria-hidden="true" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" aria-hidden="true" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" aria-hidden="true" />
                    <div className="gl-exact-notch" aria-hidden="true"><span /></div>
                    <div className="gl-exact-screen-content">
                      <div className="gl-exact-phone-top"><span>GreenLabz Studio</span><b>01</b></div>
                      <div className="gl-exact-phone-state gl-exact-phone-state-one">
                        <div className="gl-exact-phone-widget gl-exact-phone-header"><span>WEBDESIGN &amp; SEO</span><strong>Gefunden werden, statt suchen lassen</strong></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-result"><strong>GreenLabz Studio</strong><CheckCircle2 size={13} /><small>Empfohlen für Websites mit Anspruch</small></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-score"><svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="68" /><circle className="gl-exact-progress-ring" cx="90" cy="90" r="68" /></svg><strong className="gl-exact-score-value">94%</strong><span>Sichtbarkeit</span></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-row"><ScanSearch size={15} /><span>SEO &amp; KI-SUCHE</span><i /></div>
                      </div>
                      <div className="gl-exact-phone-state gl-exact-phone-state-two">
                        <div className="gl-exact-phone-widget gl-exact-phone-header"><span>KONTAKT &amp; KONVERSION</span><strong>Aus Besuchern werden Anfragen</strong></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-score gl-exact-phone-counter"><strong className="gl-exact-counter-value">+12</strong><span>Neue Anfragen diese Woche</span></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-notification"><span><UserRound size={15} /></span><div><strong>Neue Anfrage von Lisa M.</strong><small>gerade eben</small></div></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-row"><MessageCircle size={15} /><span>FORMULAR &amp; WHATSAPP</span><i /></div>
                      </div>
                      <div className="gl-exact-phone-state gl-exact-phone-state-three">
                        <div className="gl-exact-phone-widget gl-exact-phone-header"><span>PERFORMANCE &amp; SPEED</span><strong>Geladen, bevor du blinzelst</strong></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-score gl-exact-phone-speedometer"><svg className="gl-exact-speed-chart" viewBox="0 0 180 120" aria-hidden="true"><path className="gl-exact-speed-grid" d="M10 100H170M10 70H170M10 40H170" /><path className="gl-exact-speed-line" pathLength="1" d="M8 104C18 92 24 82 37 86C49 90 53 77 65 75C77 73 84 67 93 55C103 42 108 30 118 28C129 26 136 20 147 14C157 9 165 8 172 7" /><circle className="gl-exact-speed-point" cx="172" cy="7" r="4" /></svg><strong className="gl-exact-speed-value">0.8s</strong><span>Ladezeit</span><Bolt className="gl-exact-speed-flash" size={15} /></div>
                        <div className="gl-exact-phone-widget gl-exact-speed-compare"><div><span className="gl-exact-speed-bar gl-exact-speed-bar-fast" /><small>Deine Seite</small></div><div><span className="gl-exact-speed-bar gl-exact-speed-bar-average" /><small>Durchschnitt: 4.2s</small></div></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-row"><Bolt size={15} /><span>SPEED &amp; PERFORMANCE</span><i /></div>
                      </div>
                      <div className="gl-exact-phone-state gl-exact-phone-state-four">
                        <div className="gl-exact-phone-widget gl-exact-phone-header"><span>KONVERSION &amp; ERGEBNIS</span><strong>Aus Besuchern werden zahlende Kunden</strong></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-score gl-exact-result-score"><div className="gl-exact-result-chart" aria-hidden="true"><span className="gl-exact-result-bar" /><span className="gl-exact-result-bar" /><span className="gl-exact-result-bar" /><span className="gl-exact-result-bar" /></div><strong className="gl-exact-result-value">+0%</strong><span>Mehr Terminbuchungen</span><TrendingUp className="gl-exact-result-arrow" size={17} /></div>
                        <div className="gl-exact-phone-widget gl-exact-result-compare"><TrendingUp size={14} /><span>vs. alte Website</span></div>
                        <div className="gl-exact-phone-widget gl-exact-phone-row"><TrendingUp size={15} /><span>UMSATZ &amp; KONVERSION</span><i /></div>
                      </div>
                      <div className="gl-exact-phone-home" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="gl-exact-badge gl-exact-badge-top"><span><ScanSearch size={17} /></span><div><strong>Google &amp; KI-Suche</strong><small>Sichtbarkeit, die bleibt</small></div></div>
                <div className="gl-exact-badge gl-exact-badge-bottom"><span><Handshake size={17} /></span><div><strong>1:1 umgesetzt</strong><small>Direkt mit mir</small></div></div>
                <div className="gl-exact-badge gl-exact-badge-right"><span><Bolt size={17} /></span><div><strong>Ultraschnell</strong><small>Ladezeit unter 1 Sekunde</small></div></div>
                <div className="gl-exact-badge gl-exact-badge-left"><span><TrendingUp size={17} /></span><div><strong>Mehr Umsatz</strong><small>Eine Website, die für dich arbeitet</small></div></div>
              </div>
            </div>

            <div className="gl-exact-card-left">
              <div className="gl-exact-card-copy gl-exact-card-copy-one">
                <p className="gl-exact-card-label">[01] SICHTBARKEIT, DIE BLEIBT</p>
                <h3>Gefunden werden, wenn gesucht wird</h3>
                <p>Ich baue deine Website so, dass Google und ChatGPT sie verstehen. Kein SEO-Voodoo, sondern saubere Struktur, die Maschinen und Menschen gleichermaßen lieben.</p>
              </div>
              <div className="gl-exact-card-copy gl-exact-card-copy-two">
                <p className="gl-exact-card-label">[02] NEUE KUNDEN, NICHT NUR BESUCHER</p>
                <h3>Aus Klicks werden Termine</h3>
                <p>Eine schöne Website reicht nicht. Ich baue Kontaktwege, die wirklich genutzt werden, klare Buttons, kurze Formulare, direkte WhatsApp-Anbindung.</p>
              </div>
              <div className="gl-exact-card-copy gl-exact-card-copy-three">
                <p className="gl-exact-card-label">[03] SCHNELLIGKEIT, DIE MAN SPÜRT</p>
                <h3>Schnell geladen, schnell überzeugt</h3>
                <p>Jede Sekunde Ladezeit kostet dich Kunden. Meine Websites sind schlank programmiert und laden, bevor der Daumen vom Bildschirm geht.</p>
              </div>
              <div className="gl-exact-card-copy gl-exact-card-copy-four">
                <p className="gl-exact-card-label">[04] MEHR UMSATZ, WENIGER AUFWAND</p>
                <h3>Eine Website, die für dich arbeitet</h3>
                <p>Deine Website soll nicht nur gut aussehen, sie soll Termine füllen. Jedes Element ist so gebaut, dass aus Besuchern zahlende Kunden werden, ganz automatisch.</p>
              </div>
              <div className="gl-exact-metrics"><div><Handshake size={16} /><strong>1:1</strong><span>Direkt mit mir</span></div><div><ScanSearch size={16} /><strong>SEO</strong><span>Google &amp; KI-Suche</span></div><div><Ban size={16} /><strong>0</strong><span>Agentur-Blabla</span></div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="gl-exact-scroll-cue" aria-hidden="true">
        <span>Scrollen</span>
        <i />
      </div>
    </section>
  )
}
