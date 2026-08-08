import { useEffect, useRef } from 'react'
import { 
  ArrowRight, 
  ArrowUpRight, 
  Star, 
  Layers, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Bell, 
  MapPin, 
  Calendar, 
  Users, 
  GlassWater, 
  Settings, 
  ArrowLeft,
  Upload
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section lab-teaser-section bg-[#0A0A0B] py-20 border-t border-b border-white/5" id="lab" ref={sectionRef}>
      
      {/* ═══════════════════════════════════════
          SUBSECTION 1: Fokus auf mobile Usability
          ═══════════════════════════════════════ */}
      <div className="lab-subsection-mobile mb-24">
        <div className="section-head mb-12 md:mb-16">
          <p className="section-code">
            <span /> MOBILE APPS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-2">
            Fokus auf mobile Usability
          </h2>
        </div>

        <div className="lab-teaser-rows space-y-20 md:space-y-28">
          
          {/* 1. The Shaker */}
          <div className="lab-teaser-row lab-item-card layout-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-center">
              <div className="app-phone-container max-w-[290px] md:max-w-[310px] w-full" style={{ transform: 'scale(0.96)' }}>
                <div className="gl-exact-phone-bezel border-2 border-[#00CC6A]/50 shadow-[0_0_35px_rgba(0,204,106,0.18)]">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" />
                    <div className="gl-exact-notch"><span></span></div>
                    <div className="gl-exact-screen-content gl-custom-mockup-screen">
                      <div className="shaker-mockup-app">
                        <div className="shaker-app-header-schedule">
                          <div className="shaker-header-info">
                            <span className="shaker-title">The Shaker</span>
                            <span className="shaker-sub">Cocktail Bar · Diese Woche</span>
                          </div>
                          <div className="shaker-avatar">JG</div>
                        </div>

                        <div className="shaker-cal-bar">
                          <div className="shaker-cal-nav">
                            <span>‹</span>
                            <strong>9. – 15. Juni 2025</strong>
                            <span>›</span>
                          </div>
                          <div className="shaker-cal-days">
                            {['MO', 'DI', 'MI', 'DO', 'FR', 'SA'].map((d, i) => (
                              <div key={d} className={`shaker-cal-day${i === 2 ? ' active' : ''}`}>
                                <small>{d}</small>
                                <strong>{9 + i}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="shaker-app-scroll">
                          <div className="shaker-app-scroll-track">
                            <div className="shaker-day-label">MITTWOCH, 11. JUNI</div>
                            
                            <div className="shaker-shift-card">
                              <span className="shaker-dot" style={{ background: '#f4a26b' }} />
                              <div className="shaker-shift-info">
                                <strong>Opening / Prep</strong>
                                <small>14:00 – 18:00 Uhr</small>
                              </div>
                              <div className="shaker-shift-avatars">
                                <span>AN</span><span>LK</span><span>MR</span>
                              </div>
                              <span className="shaker-shift-count">3</span>
                            </div>

                            <div className="shaker-shift-card">
                              <span className="shaker-dot" style={{ background: '#e07060' }} />
                              <div className="shaker-shift-info">
                                <strong>Dinner Rush</strong>
                                <small>18:00 – 00:00 Uhr</small>
                              </div>
                              <div className="shaker-shift-avatars">
                                <span>TW</span><span>AN</span>
                              </div>
                              <span className="shaker-shift-count">2</span>
                            </div>

                            <div className="shaker-shift-card">
                              <span className="shaker-dot" style={{ background: '#6bbfb5' }} />
                              <div className="shaker-shift-info">
                                <strong>Late Night / Closing</strong>
                                <small>22:00 – 04:00 Uhr</small>
                              </div>
                              <span className="shaker-open-badge">1 offen</span>
                            </div>
                          </div>
                        </div>

                        <div className="shaker-sticky-footer">
                          <div className="active">
                            <Calendar size={15} />
                            <span>Woche</span>
                          </div>
                          <div>
                            <Users size={15} />
                            <span>Team</span>
                          </div>
                          <div>
                            <GlassWater size={15} />
                            <span>Bar</span>
                          </div>
                          <div>
                            <Settings size={15} />
                            <span>Settings</span>
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
                  className="lab-card-link text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('apps#app-bar-shift-planner')}
                >
                  Mehr erfahren <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

          {/* 2. PriceBolt */}
          <div className="lab-teaser-row lab-item-card layout-right flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-center">
              <div className="app-phone-container max-w-[290px] md:max-w-[310px] w-full" style={{ transform: 'scale(0.96)' }}>
                <div className="gl-exact-phone-bezel border-2 border-[#00CC6A]/50 shadow-[0_0_35px_rgba(0,204,106,0.18)]">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" />
                    <div className="gl-exact-notch"><span></span></div>
                    <div className="gl-exact-screen-content gl-custom-mockup-screen">
                      <div className="pricebolt-mockup-app">
                        <div className="pricebolt-app-header">
                          <ArrowLeft size={16} className="pricebolt-back-icon" />
                          <span className="font-bold text-white text-sm tracking-wide">PriceBolt</span>
                          <div style={{ width: 16 }} />
                        </div>

                        <div className="pricebolt-app-scroll">
                          <div className="pricebolt-app-scroll-track p-3 space-y-3">
                            <div className="pricebolt-screen-section">
                              <div className="pricebolt-text-cluster text-center">
                                <h4 className="text-xs font-bold text-white mb-1">Erhalten Sie Ihr Angebot in 60 Sekunden</h4>
                                <p className="text-[10px] text-white/60">Professionelle Angebote für Ihr nächstes Projekt, sofort.</p>
                              </div>

                              <div className="pricebolt-trust-badge flex items-center justify-center gap-1.5 my-2">
                                <div className="pricebolt-stars flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={10} fill="#FFB400" stroke="none" />
                                  ))}
                                </div>
                                <span className="text-[9px] text-white/70">500+ Angebote erstellt</span>
                              </div>

                              <div className="bg-white/5 border border-dashed border-white/20 rounded-lg p-2.5 text-center my-2">
                                <Upload size={14} className="mx-auto text-[#00CC6A] mb-1" />
                                <span className="text-[10px] text-white/80 block font-medium">Fotos oder Bauplan hochladen</span>
                                <small className="text-[8px] text-white/40">Optional für präzise Schätzung</small>
                              </div>

                              <div className="pricebolt-service-grid grid grid-cols-2 gap-1.5 my-2">
                                <div className="pricebolt-service-card bg-white/5 border border-white/10 rounded-lg p-2 text-center cursor-pointer">
                                  <Paintbrush size={13} className="mx-auto text-[#00CC6A] mb-0.5" />
                                  <span className="text-[10px] text-white/90 font-semibold block">Maler</span>
                                </div>
                                <div className="pricebolt-service-card selected bg-[#00CC6A]/20 border border-[#00CC6A] rounded-lg p-2 text-center cursor-pointer">
                                  <Layers size={13} className="mx-auto text-[#00CC6A] mb-0.5" />
                                  <span className="text-[10px] text-white font-semibold block">Trockenbau</span>
                                </div>
                                <div className="pricebolt-service-card bg-white/5 border border-white/10 rounded-lg p-2 text-center cursor-pointer">
                                  <Zap size={13} className="mx-auto text-[#00CC6A] mb-0.5" />
                                  <span className="text-[10px] text-white/90 font-semibold block">Elektro</span>
                                </div>
                                <div className="pricebolt-service-card bg-white/5 border border-white/10 rounded-lg p-2 text-center cursor-pointer">
                                  <Hammer size={13} className="mx-auto text-[#00CC6A] mb-0.5" />
                                  <span className="text-[10px] text-white/90 font-semibold block">Boden</span>
                                </div>
                              </div>

                              <button className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1 shadow-md transition-colors mt-2" type="button">
                                Angebot berechnen <ArrowRight size={12} />
                              </button>
                            </div>
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
                  className="lab-card-link text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('apps#app-pricebolt')}
                >
                  Mehr erfahren <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

          {/* 3. vnPro */}
          <div className="lab-teaser-row lab-item-card layout-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-center">
              <div className="app-phone-container max-w-[290px] md:max-w-[310px] w-full" style={{ transform: 'scale(0.96)' }}>
                <div className="gl-exact-phone-bezel border-2 border-[#00CC6A]/50 shadow-[0_0_35px_rgba(0,204,106,0.18)]">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" />
                    <div className="gl-exact-notch"><span></span></div>
                    <div className="gl-exact-screen-content gl-custom-mockup-screen">
                      <div className="vnpro-mockup-app">
                        <div className="vnpro-app-header">
                          <span className="vnpro-logo-text">vnPro</span>
                          <div className="vnpro-profile-thumb" />
                        </div>

                        <div className="vnpro-app-scroll">
                          <div className="vnpro-app-scroll-track p-3 space-y-3">
                            <div className="vnpro-screen">
                              <div className="vnpro-cases-list space-y-2.5">
                                
                                {/* Pair 1 */}
                                <div className="vnpro-case-card bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                  <div className="vnpro-photo-split flex h-24 relative">
                                    <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=300&q=80')" }}>
                                      <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Vorher</span>
                                    </div>
                                    <div className="w-1/2 bg-cover bg-center relative border-l border-white/30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80')" }}>
                                      <span className="absolute top-1.5 right-1.5 bg-[#00CC6A] text-black text-[8px] font-bold px-1.5 py-0.5 rounded">Nachher</span>
                                    </div>
                                  </div>
                                  <div className="p-2 flex items-center justify-between">
                                    <span className="text-[10px] text-white/80 font-medium">Badezimmer Sanierung</span>
                                    <span className="text-[9px] text-[#00CC6A] font-bold">Fertiggestellt</span>
                                  </div>
                                </div>

                                {/* Pair 2 */}
                                <div className="vnpro-case-card bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                  <div className="vnpro-photo-split flex h-24 relative">
                                    <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=300&q=80')" }}>
                                      <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Vorher</span>
                                    </div>
                                    <div className="w-1/2 bg-cover bg-center relative border-l border-white/30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=300&q=80')" }}>
                                      <span className="absolute top-1.5 right-1.5 bg-[#00CC6A] text-black text-[8px] font-bold px-1.5 py-0.5 rounded">Nachher</span>
                                    </div>
                                  </div>
                                  <div className="p-2 flex items-center justify-between">
                                    <span className="text-[10px] text-white/80 font-medium">Zahn-Veneers Relaunch</span>
                                    <span className="text-[9px] text-[#00CC6A] font-bold">Freigegeben</span>
                                  </div>
                                </div>

                              </div>

                              <button className="w-full bg-[#00CC6A] text-black font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 mt-3 shadow-lg" type="button">
                                <Upload size={13} /> Vorher/Nachher Upload
                              </button>
                            </div>
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
                  In aktiver Entwicklung
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
                  className="lab-card-link text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('apps#app-vnpro')}
                >
                  Mehr erfahren <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

          {/* 4. LeadRadar */}
          <div className="lab-teaser-row lab-item-card layout-right flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-center">
              <div className="app-phone-container max-w-[290px] md:max-w-[310px] w-full" style={{ transform: 'scale(0.96)' }}>
                <div className="gl-exact-phone-bezel border-2 border-[#00CC6A]/50 shadow-[0_0_35px_rgba(0,204,106,0.18)]">
                  <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                  <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                  <div className="gl-exact-hardware gl-exact-hardware-right" />
                  <div className="gl-exact-screen">
                    <div className="gl-exact-screen-glare" />
                    <div className="gl-exact-notch"><span></span></div>
                    <div className="gl-exact-screen-content gl-custom-mockup-screen">
                      <div className="leadradar-mockup-app">
                        <div className="leadradar-app-header flex items-center justify-between p-3 bg-[#161819] border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00CC6A] animate-pulse" />
                            <span className="font-bold text-white text-xs">LeadRadar</span>
                          </div>
                          <span className="bg-[#00CC6A]/20 text-[#00CC6A] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#00CC6A]/40">
                            LIVE SCAN
                          </span>
                        </div>

                        <div className="leadradar-app-scroll">
                          <div className="p-3 space-y-2.5">
                            
                            {/* Push Notification Banner */}
                            <div className="bg-gradient-to-r from-[#00CC6A]/20 to-[#00CC6A]/5 border border-[#00CC6A]/40 rounded-xl p-2.5 flex items-start gap-2">
                              <Bell size={14} className="text-[#00CC6A] mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-[10px] font-bold text-white block">🔔 Neuer Lead in Heilbronn!</span>
                                <p className="text-[9px] text-white/70">Praxis Dr. Weber sucht Relaunch &amp; Local SEO</p>
                              </div>
                            </div>

                            {/* Lead Card */}
                            <div className="leadradar-card bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-white">Klinik Dr. Stein</span>
                                <span className="bg-[#00CC6A] text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded">
                                  94% Match
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] text-white/60">
                                <MapPin size={9} /> <span>München · Dermatologie</span>
                              </div>
                              <p className="text-[9px] text-white/70 leading-normal">
                                Veraltete Website ohne Mobiloptimierung. Hohes Anfragepotenzial.
                              </p>
                              <div className="flex gap-1.5 pt-1">
                                <button type="button" className="flex-1 bg-white/10 text-white text-[9px] font-semibold py-1 rounded border border-white/15">
                                  Details
                                </button>
                                <button type="button" className="flex-1 bg-[#00CC6A] text-black text-[9px] font-bold py-1 rounded">
                                  Kontaktieren
                                </button>
                              </div>
                            </div>

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
                <span className="lab-status-dot flex items-center gap-1.5 text-xs font-semibold text-[#9CA3AF]">
                  <i className="w-2 h-2 rounded-full bg-[#6B7280]" />
                  Interne Testung
                </span>
              </div>
              <h3 className="lab-anim-child text-2xl md:text-3xl font-bold text-white tracking-tight">
                LeadRadar
              </h3>
              <p className="lab-anim-child text-white/70 text-base leading-relaxed">
                Echtzeit-Push-Benachrichtigungen und Detail-Recherche für Neukunden-Leads im DACH-Raum von unterwegs.
              </p>
              <div className="lab-anim-child mt-2">
                <span 
                  className="lab-card-link text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('apps#app-leadradar')}
                >
                  Mehr erfahren <ArrowRight size={15} />
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
            Eigene <span className="font-serif italic text-[#00CC6A]">Tools</span> statt träger <br className="hidden md:inline" />
            <span className="font-serif italic text-white">Baukästen.</span>
          </h2>
          <p className="lab-teaser-lead text-white/70 text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
            Neben Kundenwebsites entwickle ich eigene digitale Produkte und interne Werkzeuge, um Prozesse zu automatisieren und echte Ergebnisse zu liefern.
          </p>
        </div>

        <div className="lab-teaser-rows space-y-24 md:space-y-36">
          
          {/* 1. Repute */}
          <div className="lab-teaser-row lab-item-card layout-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-7/12 flex justify-center">
              <div className="w-full max-w-[620px] rounded-xl overflow-hidden border border-white/10 bg-[#121414] shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="bg-[#1c1e1f] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 bg-[#121414]/60 rounded-md px-3 py-1 text-[11px] text-white/40 font-mono text-center truncate">
                    repute.greenlabz-studio.de/dashboard
                  </div>
                </div>
                <div className="p-1 bg-[#0d0e0f]">
                  <img 
                    src="/assets/apps/repute-preview.png" 
                    alt="Repute Dashboard Preview" 
                    className="w-full h-auto rounded-b-lg block"
                  />
                </div>
              </div>
            </div>

            <div className="lab-teaser-info lab-item-content w-full md:w-5/12 flex flex-col items-start gap-4">
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
                  className="lab-card-link text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('apps#app-repute')}
                >
                  Mehr erfahren <ArrowRight size={15} /> · <span className="text-white/60 font-normal">14+ aktive Betriebe</span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. GreenLabz CRM */}
          <div className="lab-teaser-row lab-item-card layout-right flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-16">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-7/12 flex justify-center">
              <div className="w-full max-w-[620px] rounded-xl overflow-hidden border border-white/10 bg-[#121414] shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="bg-[#1c1e1f] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 bg-[#121414]/60 rounded-md px-3 py-1 text-[11px] text-white/40 font-mono text-center truncate">
                    crm.greenlabz-studio.de/dashboard
                  </div>
                </div>
                <div className="p-1 bg-[#0d0e0f]">
                  <img 
                    src="/assets/apps/crm-preview.png" 
                    alt="GreenLabz CRM Dashboard Preview" 
                    className="w-full h-auto rounded-b-lg block"
                  />
                </div>
              </div>
            </div>

            <div className="lab-teaser-info lab-item-content w-full md:w-5/12 flex flex-col items-start gap-4">
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
                  className="lab-card-link text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('apps#app-crm')}
                >
                  Mehr erfahren <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════
          SECTION FOOTER BUTTON
          ═══════════════════════════════════════ */}
      <div className="lab-teaser-cta text-center mt-16 md:mt-24">
        <button
          className="btn secondary group inline-flex items-center gap-2 bg.white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-full transition-all duration-300"
          type="button"
          onClick={() => onNavigate('apps')}
        >
          <span className="w-2 h-2 rounded-full bg-[#00CC6A] animate-pulse" />
          <span className="font-semibold text-sm md:text-base">Alle Projekte &amp; Tools ansehen</span>
          <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#00CC6A]" />
        </button>
      </div>

    </section>
  )
}
