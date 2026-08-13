import { useEffect, useRef } from 'react'
import { 
  ArrowRight, 
  Layers, 
  Users, 
  Settings, 
  Upload,
  Plus
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface LabTeaserSectionProps {
  onNavigate: (route: string) => void
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="section-code">
      <span /> [{number}] {label}
    </p>
  )
}

export function LabTeaserSection({ onNavigate }: LabTeaserSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const shakerTrackRef = useRef<HTMLDivElement>(null)
  const priceBoltTrackRef = useRef<HTMLDivElement>(null)
  const vnProTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const isMobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.lab-item-card', sectionRef.current)
      cards.forEach((card) => {
        const mockup = card.querySelector('.lab-item-mockup')
        const content = card.querySelector('.lab-item-content')
        const isRight = card.classList.contains('layout-right')

        if (mockup) {
          gsap.from(mockup, {
            x: isMobile ? 0 : (isRight ? 80 : -80),
            y: isMobile ? 40 : 0,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }

        if (content) {
          const animChildren = content.querySelectorAll('.lab-anim-child')
          if (animChildren.length > 0) {
            gsap.from(animChildren, {
              y: 20,
              opacity: 0,
              duration: 0.7,
              stagger: 0.08,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            })
          } else {
            gsap.from(content, {
              y: 20,
              opacity: 0,
              duration: 0.7,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            })
          }
        }
      })

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const createScreenTimeline = (track: HTMLDivElement | null, triggerSelector: string, slideCount: number) => {
        if (!track) return

        gsap.set(track, { yPercent: 0 })
        if (prefersReducedMotion) return

        const trigger = track.closest<HTMLElement>(triggerSelector)
        if (!trigger) return

        const timeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.8,
          scrollTrigger: {
            trigger,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play pause resume reset',
            invalidateOnRefresh: true,
          },
        })

        timeline.to({}, { duration: 1.2 })

        for (let screenIndex = 1; screenIndex < slideCount; screenIndex += 1) {
          timeline
            .to(track, {
              yPercent: -(screenIndex * 100) / slideCount,
              duration: 0.65,
              ease: 'power3.inOut',
              force3D: true,
            })
            .to({}, { duration: 1.15 })
        }

        timeline.to(track, {
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          force3D: true,
        })
      }

      createScreenTimeline(shakerTrackRef.current, '.shaker-showcase-row', 6)
      createScreenTimeline(priceBoltTrackRef.current, '.pricebolt-showcase-row', 6)
      createScreenTimeline(vnProTrackRef.current, '.vnpro-showcase-row', 6)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section lab-teaser-section bg-[#0A0A0B] py-20 border-t border-b border-white/5" id="lab" ref={sectionRef}>
      
      {/* ═══════════════════════════════════════
          SUBSECTION 1: Individuell entwickelte Apps
          ═══════════════════════════════════════ */}
      <div className="lab-subsection-mobile mb-24">
        <div className="section-head mb-12 md:mb-16">
          <p className="section-code">
            <span /> MOBILE APPS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-2">
            <span className="lab-highlight">Individuell</span> entwickelte <span className="lab-highlight">Apps</span>, die den <span className="lab-highlight">Alltag</span> meiner Kunden <span className="lab-highlight">leichter</span> machen
          </h2>
        </div>

        <div className="lab-teaser-rows space-y-20 md:space-y-28">
          
          {/* 1. The Shaker */}
          <div className="lab-teaser-row lab-item-card shaker-showcase-row layout-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-center">
              <div className="app-phone-container max-w-[290px] md:max-w-[310px] w-full">
                <div className="gl-exact-phone-bezel app-phone-frame">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" />
                        
                    <div className="gl-exact-screen-content gl-custom-mockup-screen overflow-hidden relative">
                      <div className="shaker-phone-scroll-wrapper">
                        <div className="shaker-phone-scroll-track" ref={shakerTrackRef}>
                          {[
                            ['shaker-screen1.png', 'The Shaker Teamübersicht'],
                            ['shaker-screen2.png', 'The Shaker Einstellungen'],
                            ['shaker-screen3.png', 'The Shaker Schicht bearbeiten'],
                            ['shaker-screen4.png', 'The Shaker Wochenplan'],
                            ['shaker-screen5.png', 'The Shaker Bar-Verwaltung'],
                            ['shaker-screen6.png', 'The Shaker Profil'],
                          ].map(([fileName, altText]) => (
                            <div className="shaker-screen-slide" key={fileName}>
                              <img src={`/assets/apps/${fileName}`} alt={altText} loading="lazy" decoding="async" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lab-teaser-info lab-item-content w-full md:w-1/2 flex flex-col items-start gap-4">
              <div className="lab-anim-child lab-card-top flex items-center gap-3">
                <span className="lab-badge border border-white/20 text-xs px-3 py-1 rounded-full text-white/90 font-semibold tracking-wider uppercase">
                  APP
                </span>
                <span className="lab-status-dot flex items-center gap-1.5 text-xs font-semibold text-[#00CC6A]">
                  <i className="w-2 h-2 rounded-full bg-[#00CC6A] animate-pulse" />
                  Live
                </span>
              </div>
              <h3 className="lab-anim-child text-2xl md:text-3xl font-bold text-white tracking-tight">
                The Shaker
              </h3>
              <p className="lab-anim-child text-white/70 text-base leading-relaxed">
                Dienstplanung, Rollenverteilung und Umsatz-Auswertung für Gastronomie-Betriebe direkt auf dem Smartphone.
              </p>
              <div className="lab-anim-child mt-2">
                <span 
                  className="lab-card-link btn secondary text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('shaker')}
                >
                  <span className="cta-label">Mehr dazu</span> <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

          {/* 2. PriceBolt */}
          <div className="lab-teaser-row lab-item-card pricebolt-showcase-row layout-right flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-center">
              <div className="app-phone-container max-w-[290px] md:max-w-[310px] w-full">
                <div className="gl-exact-phone-bezel app-phone-frame">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" />
                        
                    <div className="gl-exact-screen-content gl-custom-mockup-screen overflow-hidden relative">
                      <div className="pricebolt-phone-scroll-wrapper">
                        <div className="pricebolt-phone-scroll-track" ref={priceBoltTrackRef}>
                          {[
                            ['pricebolt-screen1.png', 'PriceBolt Startseite'],
                            ['pricebolt-screen2.png', 'PriceBolt Serviceauswahl'],
                            ['pricebolt-screen3.png', 'PriceBolt Projektgröße'],
                            ['pricebolt-screen4.png', 'PriceBolt Foto-Upload'],
                            ['pricebolt-screen5.png', 'PriceBolt Kontaktdaten'],
                            ['pricebolt-screen6.png', 'PriceBolt Anfragebestätigung'],
                          ].map(([fileName, altText]) => (
                            <div className="pricebolt-screen-slide" key={fileName}>
                              <img src={`/assets/apps/${fileName}`} alt={altText} loading="lazy" decoding="async" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lab-teaser-info lab-item-content w-full md:w-1/2 flex flex-col items-start gap-4">
              <div className="lab-anim-child lab-card-top flex items-center gap-3">
                <span className="lab-badge border border-white/20 text-xs px-3 py-1 rounded-full text-white/90 font-semibold tracking-wider uppercase">
                  APP
                </span>
                <span className="lab-status-dot flex items-center gap-1.5 text-xs font-semibold text-[#00CC6A]">
                  <i className="w-2 h-2 rounded-full bg-[#00CC6A] animate-pulse" />
                  Live
                </span>
              </div>
              <h3 className="lab-anim-child text-2xl md:text-3xl font-bold text-white tracking-tight">
                PriceBolt
              </h3>
              <p className="lab-anim-child text-white/70 text-base leading-relaxed">
                Erhalten Sie Ihr Angebot in 60 Sekunden – professionelle Angebote für Ihr nächstes Projekt, sofort.
              </p>
              <div className="lab-anim-child mt-2">
                <span 
                  className="lab-card-link btn secondary text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('app-pricebolt')}
                >
                  <span className="cta-label">Mehr dazu</span> <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

          {/* 3. vnPro */}
          <div className="lab-teaser-row lab-item-card vnpro-showcase-row layout-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-center">
              <div className="app-phone-container max-w-[290px] md:max-w-[310px] w-full">
                <div className="gl-exact-phone-bezel app-phone-frame">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" />
                    
                    <div className="gl-exact-screen-content gl-custom-mockup-screen overflow-hidden relative">
                      <div className="vnpro-phone-scroll-wrapper">
                        <div className="vnpro-phone-scroll-track" ref={vnProTrackRef}>
                          {[
                            ['vnpro-mobile-dashboard.png', 'vnPro mobile Projektübersicht'],
                            ['vnpro-screen1.png', 'vnPro mobile Projektgalerie'],
                            ['vnpro-mobile-upload.png', 'vnPro mobiler Upload'],
                            ['vnpro-mobile-editor.png', 'vnPro mobiler Vorher-Nachher-Editor'],
                            ['vnpro-mobile-share.png', 'vnPro mobiles Teilen und Export'],
                            ['vnpro-mobile-settings.png', 'vnPro mobile Einstellungen und Branding'],
                          ].map(([fileName, altText]) => (
                            <div className="vnpro-screen-slide" key={fileName}>
                              <img src={`/assets/apps/${fileName}`} alt={altText} loading="lazy" decoding="async" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="vnpro-native-mockup hidden">
                        
                        {/* Header */}
                        <div className="pt-6 pb-2.5 px-3.5 bg-white border-b border-gray-200/80 flex items-center justify-between z-20">
                          <span className="font-extrabold text-base tracking-tight text-[#00CC6A]">vnPro</span>
                          <div className="flex items-center gap-2">
                            <Settings size={13} className="text-gray-400" />
                            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                            </div>
                          </div>
                        </div>

                        {/* Scroll Track Container */}
                        <div className="vnpro-native-scroll-wrapper flex-1 overflow-hidden relative">
                          <div className="vnpro-native-scroll-track flex flex-col w-full">
                            
                            {/* SCREEN 1: Projektgalerie */}
                            <div className="p-3 space-y-2.5 bg-[#F9F9F9] min-h-[380px]">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900 tracking-tight">Projektgalerie</h4>
                                <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Übersicht aller abgeschlossenen und laufenden Restaurierungen.</p>
                              </div>
                              <button className="w-full bg-[#00CC6A] text-white font-bold py-1.5 rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-sm" type="button">
                                <Plus size={13} /> Neues Projekt
                              </button>
                              <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-sm">
                                <div className="flex h-20 relative">
                                  <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=400&q=80')" }}>
                                    <span className="inline-block mt-1.5 ml-1.5 bg-[#1D1D1F]/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Vorher</span>
                                  </div>
                                  <div className="w-1/2 bg-cover bg-center border-l border-white/40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80')" }}>
                                    <span className="inline-block mt-1.5 ml-1.5 bg-[#1D1D1F]/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Nachher</span>
                                  </div>
                                </div>
                                <div className="p-2">
                                  <h5 className="text-[10px] font-bold text-gray-900 leading-tight">Parkett-Restaurierung Villa Schmidt</h5>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-[8px] text-gray-500">12. Oktober 2023</span>
                                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#e6f7ec] text-[#006d36]">Abgeschlossen</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-sm">
                                <div className="p-2">
                                  <h5 className="text-[10px] font-bold text-gray-900 leading-tight">Bodenaufbereitung Kanzlei Meyer</h5>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-[8px] text-gray-500">05. September 2023</span>
                                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#e6f7ec] text-[#006d36]">Abgeschlossen</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* SCREEN 2: Upload */}
                            <div className="p-3 space-y-2 bg-[#FAFAFA] min-h-[380px]">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900 tracking-tight">Neues Projekt erstellen</h4>
                                <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Vorher/Nachher-Aufnahmen hochladen.</p>
                              </div>

                              <div className="border border-dashed border-gray-300 bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-center space-y-0.5">
                                <span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full self-start">Vorher</span>
                                <div className="w-6 h-6 rounded-full bg-[#00CC6A]/10 text-[#00CC6A] flex items-center justify-center my-0.5">
                                  <Upload size={12} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-800">Vorher-Bild hochladen</span>
                                <span className="text-[8px] text-gray-400">Drag &amp; Drop oder klicken</span>
                              </div>

                              <div className="border border-dashed border-gray-300 bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-center space-y-0.5">
                                <span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full self-start">Nachher</span>
                                <div className="w-6 h-6 rounded-full bg-[#00CC6A]/10 text-[#00CC6A] flex items-center justify-center my-0.5">
                                  <Upload size={12} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-800">Nachher-Bild hochladen</span>
                                <span className="text-[8px] text-gray-400">Drag &amp; Drop oder klicken</span>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="h-10 bg-white border-t border-gray-200/80 flex items-center justify-around z-20 px-2">
                          <div className="flex flex-col items-center gap-0.5 text-[#00CC6A] font-bold text-[9px]">
                            <Layers size={13} />
                            <span>Projekte</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 text-gray-400 text-[9px]">
                            <Plus size={13} />
                            <span>Upload</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 text-gray-400 text-[9px]">
                            <Users size={13} />
                            <span>Profil</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lab-teaser-info lab-item-content w-full md:w-1/2 flex flex-col items-start gap-4">
              <div className="lab-anim-child lab-card-top flex items-center gap-3">
                <span className="lab-badge border border-white/20 text-xs px-3 py-1 rounded-full text-white/90 font-semibold tracking-wider uppercase">
                  APP
                </span>
                <span className="lab-status-dot flex items-center gap-1.5 text-xs font-semibold text-[#F59E0B]">
                  <i className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  Live
                </span>
              </div>
              <h3 className="lab-anim-child text-2xl md:text-3xl font-bold text-white tracking-tight">
                vnPro
              </h3>
              <p className="lab-anim-child text-white/70 text-base leading-relaxed">
                Die premium Vorher-Nachher Galerie für Web und Social Media. Perfekt für Ärzte, Kliniken und Detail-Handwerk.
              </p>
              <div className="lab-anim-child mt-2">
                <span 
                  className="lab-card-link btn secondary text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('app-vnpro')}
                >
                  <span className="cta-label">Mehr dazu</span> <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════
          SUBSECTION 2: Haupt-Showcase (große Cards)
          ═══════════════════════════════════════ */}
      <div className="lab-subsection-showcase pt-12">
        <div className="section-head mb-14 md:mb-20">
          <SectionLabel number="03" label="APPS & SAAS AND DEV LAB" />
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-3">
            <span className="lab-highlight">Eigene</span> <span className="font-serif italic text-white">Tools</span> <span className="lab-highlight">statt</span> träger <br className="hidden md:inline" />
            <span className="lab-highlight">Baukästen.</span>
          </h2>
          <p className="lab-teaser-lead text-white/70 text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
            Neben Kundenwebsites entwickle ich eigene digitale Produkte und interne Werkzeuge, um Prozesse zu automatisieren und echte Ergebnisse zu liefern.
          </p>
        </div>

        <div className="lab-teaser-rows space-y-24 md:space-y-36">
          
          {/* 1. Repute (layout-right: Text LEFT, Mockup RIGHT) */}
          <div className="lab-teaser-row lab-item-card layout-right flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-12">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-end items-center">
              <div className="lab-teaser-preview-card repute-preview-card">
                <img 
                  src="/assets/apps/repute-preview.png" 
                  alt="Repute Dashboard Preview" 
                  className="repute-preview-image"
                  width={1280}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="lab-teaser-info lab-item-content w-full md:w-1/2 flex flex-col items-start gap-4 text-left pl-0">
              <div className="lab-anim-child lab-card-top flex items-center gap-3">
                <span className="lab-badge border border-white/20 text-xs px-3 py-1 rounded-full text-white/90 font-semibold tracking-wider uppercase">
                  AUTOMATISIERTES SAAS
                </span>
                <span className="lab-status-dot flex items-center gap-1.5 text-xs font-semibold text-[#00CC6A]">
                  <i className="w-2 h-2 rounded-full bg-[#00CC6A] animate-pulse" />
                  Live
                </span>
              </div>
              <h3 className="lab-anim-child text-2xl md:text-4xl font-bold text-white tracking-tight">
                Repute
              </h3>
              <p className="lab-anim-child text-white/70 text-base leading-relaxed">
                Automatisches Bewertungsmanagement für Praxen, Betriebe und Dienstleister, die nachhaltig neue Kunden gewinnen wollen.
              </p>
              
              <div className="lab-anim-child lab-tech-list flex flex-wrap gap-2 my-1">
                {['Resend', 'Node.js', 'TailwindCSS', 'PostgreSQL', 'Laravel'].map((tag) => (
                  <span key={tag} className="border border-white/15 rounded-full text-[11px] px-3 py-1 text-white/80 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="lab-anim-child mt-2">
                <span 
                  className="lab-card-link btn secondary text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('app-repute')}
                >
                  <span className="cta-label">Mehr dazu</span> <ArrowRight size={15} /> · <span className="text-white/60 font-normal">14+ aktive Betriebe</span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. GreenLabz CRM (layout-left: Mockup LEFT, Text RIGHT) */}
          <div className="lab-teaser-row lab-item-card layout-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-start items-center">
              <div className="lab-teaser-preview-card crm-preview-card">
                <img 
                  src="/assets/apps/crm-preview.png" 
                  alt="GreenLabz CRM Dashboard Preview" 
                  className="crm-preview-image"
                  width={885}
                  height={697}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="lab-teaser-info lab-item-content w-full md:w-1/2 flex flex-col items-start gap-4 text-left pl-0">
              <div className="lab-anim-child lab-card-top flex items-center gap-3">
                <span className="lab-badge border border-white/20 text-xs px-3 py-1 rounded-full text-white/90 font-semibold tracking-wider uppercase">
                  INTERN &amp; PROJEKT CONTROL
                </span>
                <span className="lab-status-dot flex items-center gap-1.5 text-xs font-semibold text-[#F59E0B]">
                  <i className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  In Entwicklung
                </span>
              </div>
              <h3 className="lab-anim-child text-2xl md:text-4xl font-bold text-white tracking-tight">
                GreenLabz CRM
              </h3>
              <p className="lab-anim-child text-white/70 text-base leading-relaxed">
                Das zentrale Steuerungselement für Kundenbeziehungen, Projektfortschritt und automatisierte Rechnungsstellung.
              </p>

              <div className="lab-anim-child lab-tech-list flex flex-wrap gap-2 my-1">
                {['React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'].map((tag) => (
                  <span key={tag} className="border border-white/15 rounded-full text-[11px] px-3 py-1 text-white/80 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="lab-anim-child mt-2">
                <span 
                  className="lab-card-link btn secondary text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('app-greenlabz-crm')}
                >
                  <span className="cta-label">Mehr dazu</span> <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════
          SECTION FOOTER BUTTON
          ═══════════════════════════════════════ */}
    </section>
  )
}
