import { useEffect, useRef } from 'react'
import { 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  Calendar, 
  Users, 
  GlassWater, 
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
                    <div className="gl-exact-screen-content gl-custom-mockup-screen overflow-hidden relative">
                      <div className="w-full h-full relative overflow-hidden bg-[#f9f9fe]">
                        <img 
                          src="/assets/apps/pricebolt-screen1.png" 
                          alt="PriceBolt Startbild" 
                          className="w-full h-auto block object-cover" 
                        />
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
                    <div className="gl-exact-screen-content gl-custom-mockup-screen overflow-hidden relative">
                      <div className="w-full h-full bg-[#FAFAFA] text-[#1A1A1A] flex flex-col relative overflow-hidden select-none font-sans text-left">
                        
                        {/* Header */}
                        <div className="pt-6 pb-2.5 px-3.5 bg-white border-b border-gray-200/80 flex items-center justify-between z-20">
                          <span className="font-extrabold text-base tracking-tight text-[#00CC6A]">vnPro</span>
                          <div className="flex items-center gap-2">
                            <Settings size={13} className="text-gray-400" />
                            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>

                        {/* Scroll Track Container */}
                        <div className="vnpro-native-scroll-wrapper flex-1 overflow-hidden relative">
                          <div className="vnpro-native-scroll-track flex flex-col w-full">
                            
                            {/* SCREEN 1: Projektgalerie */}
                            <div className="p-3 space-y-2.5 bg-[#FAFAFA] min-h-[380px]">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900 tracking-tight">Projektgalerie</h4>
                                <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Übersicht aller abgeschlossenen und laufenden Restaurierungen.</p>
                              </div>

                              <button className="w-full bg-[#00CC6A] text-black font-extrabold py-1.5 rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-sm" type="button">
                                <Plus size={13} /> Neues Projekt
                              </button>

                              {/* Card 1 */}
                              <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-sm">
                                <div className="flex h-24 relative">
                                  <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=400&q=80')" }}>
                                    <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-md text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Vorher</span>
                                  </div>
                                  <div className="w-1/2 bg-cover bg-center relative border-l border-white/40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80')" }}>
                                    <span className="absolute top-1.5 right-1.5 bg-[#00CC6A] text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full">Nachher</span>
                                  </div>
                                </div>
                                <div className="p-2">
                                  <h5 className="text-[11px] font-bold text-gray-900">Parkett-Restaurierung Villa Schmidt</h5>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-[9px] text-gray-400 font-medium">12. Okt 2023</span>
                                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#00CC6A]/15 text-[#00CC6A]">Abgeschlossen</span>
                                  </div>
                                </div>
                              </div>

                              {/* Card 2 */}
                              <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-sm">
                                <div className="flex h-20 relative">
                                  <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80')" }}>
                                    <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-md text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Vorher</span>
                                  </div>
                                  <div className="w-1/2 bg-cover bg-center relative border-l border-white/40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=400&q=80')" }}>
                                    <span className="absolute top-1.5 right-1.5 bg-[#00CC6A] text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full">Nachher</span>
                                  </div>
                                </div>
                                <div className="p-2">
                                  <h5 className="text-[11px] font-bold text-gray-900">Badezimmer Sanierung</h5>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-[9px] text-gray-400 font-medium">05. Sep 2023</span>
                                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#00CC6A]/15 text-[#00CC6A]">Fertiggestellt</span>
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
          
          {/* 1. Repute (layout-right: Text LEFT, Mockup RIGHT) */}
          <div className="lab-teaser-row lab-item-card layout-right flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-12">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-end items-center">
              <div className="lab-teaser-preview-card w-full max-w-[500px] h-auto bg-[#121414]">
                <img 
                  src="/assets/apps/repute-preview.png" 
                  alt="Repute Dashboard Preview" 
                  className="w-full h-auto object-contain max-h-none block"
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
                  className="lab-card-link text-[#00CC6A] hover:text-[#00FF84] inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => onNavigate('apps#app-repute')}
                >
                  Mehr erfahren <ArrowRight size={15} /> · <span className="text-white/60 font-normal">14+ aktive Betriebe</span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. GreenLabz CRM (layout-left: Mockup LEFT, Text RIGHT) */}
          <div className="lab-teaser-row lab-item-card layout-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="lab-teaser-preview lab-item-mockup w-full md:w-1/2 flex justify-start items-center">
              <div className="lab-teaser-preview-card w-full max-w-[500px] h-auto bg-[#121414]">
                <img 
                  src="/assets/apps/crm-preview.png" 
                  alt="GreenLabz CRM Dashboard Preview" 
                  className="w-full h-auto object-contain max-h-none block"
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
