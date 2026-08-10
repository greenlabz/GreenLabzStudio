import { useEffect, useRef } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowLeft, ArrowRight, Code, Smartphone, Laptop, Plus, Minus, Calendar, Users, GlassWater, Settings, Layers, Bell, MapPin, Filter, Sparkles, TrendingUp, CheckCircle, Star, Paintbrush, Zap, Hammer, Sliders, Camera, Trash2, Info, Receipt, Send, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appProjects } from './appsData'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AppsPageProps {
  onNavigate: (route: string) => void
}

export default function AppsPage({ onNavigate }: AppsPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }

    const container = containerRef.current
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Reveal animations for App blocks
      gsap.utils.toArray<HTMLElement>('.app-reveal-block').forEach((block) => {
        const phone = block.querySelector('.app-phone-container')
        const copy = block.querySelector('.app-copy-container')
        const isLeft = block.classList.contains('layout-phone-left')

        if (phone && copy) {
          gsap.fromTo(phone, 
            { 
              opacity: 0, 
              x: isLeft ? -80 : 80, 
              rotationY: isLeft ? 15 : -15, 
              rotationZ: isLeft ? -3 : 3,
              transformPerspective: 1200 
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              rotationZ: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )

          gsap.fromTo(copy,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })

      // Reveal animations for System blocks
      gsap.utils.toArray<HTMLElement>('.system-reveal-block').forEach((block) => {
        const mock = block.querySelector('.system-mockup-container')
        const details = block.querySelector('.system-details-container')
        const isLeft = block.classList.contains('layout-mockup-left')

        if (mock && details) {
          gsap.fromTo(mock,
            { 
              opacity: 0, 
              y: 60,
              rotationX: 8,
              transformPerspective: 1200 
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 82%',
                toggleActions: 'play none none reverse'
              }
            }
          )

          gsap.fromTo(details,
            { opacity: 0, x: isLeft ? 60 : -60 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 82%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  const apps = appProjects.filter(p => p.type === 'app')
  const systems = appProjects.filter(p => p.type === 'system')

  return (
    <div ref={containerRef} className="apps-page-wrapper">
      <Head>
        <title>Software, SaaS &amp; Apps aus dem Lab | GreenLabz Studio Heilbronn</title>
        <meta name="description" content="Maßgeschneiderte Web-Apps, Gastronomie-Schichtplaner, B2B-Scraper und CRM-Systeme von GreenLabz Studio Baden-Württemberg." />
        <meta property="og:title" content="Software, SaaS &amp; Apps aus dem Lab | GreenLabz Studio" />
        <meta property="og:description" content="Maßgeschneiderte Web-Apps, Gastronomie-Schichtplaner, B2B-Scraper und CRM-Systeme von GreenLabz Studio Baden-Württemberg." />
        <meta property="og:url" content="https://greenlabz-studio.de/apps" />
      </Head>

      <main className="apps-page">
        <div className="page-header-nav">
          <button
            className="back-btn"
            type="button"
            onClick={() => {
              onNavigate('home#lab')
            }}
          >
            <ArrowLeft size={16} /> Zurück zur Übersicht
          </button>
        </div>

        {/* Hero Sektion */}
        <section className="section apps-hero-section">
          <div className="section-head text-center">
            <p className="section-code"><span></span> [LAB &amp; SAAS]</p>
            <h2>
              Apps und Systeme, die ich <span className="text-accent">selbst baue</span> und <span className="section-title-serif">nutze.</span>
            </h2>
            <p className="section-subtitle">
              Vom mobilen Gastronomie-Schichtplaner bis zur automatisierten Enterprise-Data-Pipeline – schlanke Software ohne Ballast.
            </p>
          </div>
        </section>

        {/* Sektion Apps */}
        <section className="section apps-list-section">
          <div className="apps-section-header">
            <span className="apps-section-badge"><Smartphone size={16} /> Mobile Apps</span>
            <h3>Fokus auf mobile Usability</h3>
          </div>

          <div className="apps-zigzag-list">
            {apps.map((app, index) => {
              const isLeft = index % 2 === 0
              return (
                <div 
                  key={app.id} 
                  id={app.id === 'bar-shift-planner' ? 'app-bar-shift-planner' : `app-${app.id}`}
                  className={`app-reveal-block layout-phone-${isLeft ? 'left' : 'right'} ${index > 0 ? 'offset-block' : ''}`}
                >
                  {/* Phone container */}
                  <div className="app-phone-container">
                    <div className="gl-exact-phone-bezel">
                      <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                      <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                      <div className="gl-exact-hardware gl-exact-hardware-right" />
                      <div className="gl-exact-screen">
                        <div className="gl-exact-screen-glare" />
                        <div className="gl-exact-notch"><span></span></div>
                        <div className={`gl-exact-screen-content ${['bar-shift-planner', 'shaker', 'vnpro', 'pricebolt'].includes(app.id) ? 'gl-custom-mockup-screen' : ''}`}>
                          {app.id === 'bar-shift-planner' || app.id === 'shaker' ? (
                            <div className="shaker-mockup-app">
                              {/* Sticky elements for Screen 2 (Schedule) - animated with CSS opacity fade */}
                              <div className="shaker-sticky-header">
                                <div className="shaker-header-info">
                                  <span className="shaker-title">The Shaker</span>
                                  <span className="shaker-sub">Cocktail Bar · Diese Woche</span>
                                </div>
                                <div className="shaker-avatar">JG</div>
                              </div>

                              <div className="shaker-sticky-cal-bar">
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

                              {/* Scrolling Track */}
                              <div className="shaker-scroll-track">
                                
                                {/* SCREEN 1: Splash / Landing Page */}
                                <div className="shaker-screen-splash">
                                  {/* Background image & overlay */}
                                  <div className="shaker-splash-bg" />
                                  <div className="shaker-splash-overlay" />
                                  
                                  {/* Canvas Content */}
                                  <div className="shaker-splash-canvas">
                                    {/* Logo matching Bild 2 */}
                                    <div className="shaker-splash-logo-wrap animate-float">
                                      <div className="shaker-splash-logo-circle">
                                        <GlassWater size={22} className="text-[#e2725b]" />
                                        <span className="shaker-splash-logo-text">The Shaker</span>
                                      </div>
                                    </div>
                                    
                                    {/* Typography matching Bild 2 */}
                                    <h1 className="shaker-splash-headline">Next Level Gastro Management</h1>
                                    <p className="shaker-splash-subtext">Die intelligente Schichtplanung für erstklassige Cocktailbars.</p>
                                    
                                    {/* Call to Actions */}
                                    <div className="shaker-splash-cta">
                                      <button className="shaker-btn-primary flex items-center justify-center gap-1 w-full">
                                        Jetzt starten <ArrowRight size={12} />
                                      </button>
                                      <button className="shaker-btn-secondary w-full">Login für Mitarbeiter</button>
                                    </div>

                                    {/* Features grid */}
                                    <div className="shaker-splash-features-grid">
                                      <div className="shaker-feature-item">
                                        <span className="material-symbols-outlined text-[16px] text-accent">auto_awesome</span>
                                        <h6>Intelligente Planung</h6>
                                        <p>Optimierte Schichten basierend auf Bedarf.</p>
                                      </div>
                                      <div className="shaker-feature-item">
                                        <span className="material-symbols-outlined text-[16px] text-accent">chat</span>
                                        <h6>Team-Kommunikation</h6>
                                        <p>Direkter Austausch für reibungslose Abläufe.</p>
                                      </div>
                                      <div className="shaker-feature-item">
                                        <span className="material-symbols-outlined text-[16px] text-accent">inventory_2</span>
                                        <h6>Echtzeit-Inventur</h6>
                                        <p>Bestände immer im Blick behalten.</p>
                                      </div>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="shaker-splash-testimonial">
                                      <p>"The Shaker hat unsere Effizienz hinter der Bar verdoppelt. Endlich mehr Zeit für die Gäste!"</p>
                                      <div className="shaker-testimonial-author">
                                        <div className="shaker-author-avatar">M</div>
                                        <span>Marc S., Bar Manager @ Velvet Lounge</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* SCREEN 2: Main Schedule View */}
                                <div className="shaker-screen-schedule">
                                  {/* Wednesday Shifts */}
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

                                  {/* Thursday Shifts */}
                                  <div className="shaker-day-label">DONNERSTAG, 12. JUNI</div>

                                  <div className="shaker-shift-card">
                                    <span className="shaker-dot" style={{ background: '#f4a26b' }} />
                                    <div className="shaker-shift-info">
                                      <strong>Day Prep &amp; Clean</strong>
                                      <small>12:00 – 16:00 Uhr</small>
                                    </div>
                                    <div className="shaker-shift-avatars">
                                      <span>MR</span><span>JG</span>
                                    </div>
                                    <span className="shaker-shift-count">2</span>
                                  </div>

                                  <div className="shaker-shift-card">
                                    <span className="shaker-dot" style={{ background: '#e07060' }} />
                                    <div className="shaker-shift-info">
                                      <strong>Dinner Rush</strong>
                                      <small>18:00 – 00:00 Uhr</small>
                                    </div>
                                    <div className="shaker-shift-avatars">
                                      <span>LK</span><span>TW</span>
                                    </div>
                                    <span className="shaker-shift-count">2</span>
                                  </div>

                                  {/* Friday Shifts */}
                                  <div className="shaker-day-label">FREITAG, 13. JUNI</div>

                                  <div className="shaker-shift-card">
                                    <span className="shaker-dot" style={{ background: '#e07060' }} />
                                    <div className="shaker-shift-info">
                                      <strong>Weekend Opening</strong>
                                      <small>16:00 – 22:00 Uhr</small>
                                    </div>
                                    <div className="shaker-shift-avatars">
                                      <span>AN</span><span>LK</span><span>MR</span>
                                    </div>
                                    <span className="shaker-shift-count">3</span>
                                  </div>

                                  <div className="shaker-shift-card">
                                    <span className="shaker-dot" style={{ background: '#6bbfb5' }} />
                                    <div className="shaker-shift-info">
                                      <strong>Late Night / Closing</strong>
                                      <small>22:00 – 04:00 Uhr</small>
                                    </div>
                                    <span className="shaker-open-badge">2 offen</span>
                                  </div>

                                  {/* Add button inside scrolling track */}
                                  <button className="shaker-add-shift-btn">
                                    <Plus size={14} /> Schicht hinzufügen
                                  </button>
                                </div>

                              </div>

                              {/* Sticky Navigation Bar */}
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
                          ) : app.id === 'pricebolt' ? (
                            <div className="pricebolt-phone-scroll-wrapper w-full h-full relative overflow-hidden bg-[#f9f9fe] text-[#1a1c1f]">
                              <div className="pricebolt-phone-scroll-track w-full flex flex-col">
                                
                                {/* SCREEN 1: Start / Landing */}
                                <div className="w-full min-h-[380px] bg-[#f9f9fe] flex flex-col justify-between p-3 select-none relative font-sans text-left">
                                  <div>
                                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                                      <ArrowLeft size={13} className="text-gray-500" />
                                      <span className="font-black text-sm tracking-tight text-[#8c5000]">PriceBolt</span>
                                      <div className="w-3" />
                                    </div>

                                    <div className="mt-2.5 rounded-xl overflow-hidden relative h-24 bg-gradient-to-br from-[#8c5000]/20 to-[#ff9500]/10 border border-[#8c5000]/20 flex items-center justify-center p-2 text-center">
                                      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80')" }} />
                                      <div className="relative z-10">
                                        <span className="bg-[#8c5000] text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">SOFORT-ANGEBOT</span>
                                      </div>
                                    </div>

                                    <div className="mt-3 text-center space-y-1">
                                      <h4 className="text-xs font-bold text-gray-900 leading-tight">Erhalten Sie Ihr Angebot in 60 Sekunden</h4>
                                      <p className="text-[9px] text-gray-500 leading-snug">Professionelle Angebote, schnell, einfach, sofort.</p>
                                    </div>

                                    <div className="mt-2.5 flex items-center justify-center gap-1.5 bg-gray-100/80 py-1 px-2.5 rounded-full border border-gray-200/60 w-max mx-auto">
                                      <div className="flex text-[#FFB400]">
                                        {[...Array(5)].map((_, i) => (
                                          <Star key={i} size={9} fill="#FFB400" className="text-[#FFB400]" />
                                        ))}
                                      </div>
                                      <span className="text-[8px] font-semibold text-gray-600">500+ Angebote erstellt</span>
                                    </div>
                                  </div>

                                  <button className="w-full bg-[#8c5000] hover:bg-[#a66000] text-white font-extrabold py-2 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-sm mt-3" type="button">
                                    Jetzt starten <ArrowRight size={11} />
                                  </button>
                                </div>

                                {/* SCREEN 2: Serviceauswahl (Schritt 1 von 4) */}
                                <div className="w-full min-h-[380px] bg-[#f9f9fe] flex flex-col justify-between p-3 select-none relative font-sans text-left">
                                  <div>
                                    <div className="flex items-center justify-between pb-1.5">
                                      <ArrowLeft size={13} className="text-gray-500" />
                                      <span className="font-black text-xs tracking-tight text-[#8c5000]">PriceBolt</span>
                                      <div className="w-3" />
                                    </div>
                                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-2.5">
                                      <div className="h-full bg-[#8c5000] w-1/4 rounded-full" />
                                    </div>

                                    <span className="text-[8px] font-bold text-[#8c5000] uppercase tracking-wider block">Schritt 1 von 4</span>
                                    <h4 className="text-xs font-bold text-gray-900 mt-0.5 leading-tight">Wobei kann ich Ihnen helfen?</h4>
                                    <p className="text-[8px] text-gray-500 mt-0.5 leading-snug">Wählen Sie die Hauptdienstleistung aus.</p>

                                    <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                                      <div className="bg-white border-2 border-[#8c5000] rounded-xl p-2 flex flex-col items-center justify-center text-center gap-1 shadow-sm bg-[#ffdcbf]/20">
                                        <div className="w-7 h-7 rounded-full bg-[#ff9500] text-white flex items-center justify-center">
                                          <Paintbrush size={12} />
                                        </div>
                                        <span className="text-[9px] font-bold text-gray-900">Malerarbeiten</span>
                                      </div>
                                      <div className="bg-white border border-gray-200 rounded-xl p-2 flex flex-col items-center justify-center text-center gap-1">
                                        <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                                          <Layers size={12} />
                                        </div>
                                        <span className="text-[9px] font-medium text-gray-700">Bodenlegen</span>
                                      </div>
                                      <div className="bg-white border border-gray-200 rounded-xl p-2 flex flex-col items-center justify-center text-center gap-1">
                                        <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                                          <Zap size={12} />
                                        </div>
                                        <span className="text-[9px] font-medium text-gray-700">Elektro</span>
                                      </div>
                                      <div className="bg-white border border-gray-200 rounded-xl p-2 flex flex-col items-center justify-center text-center gap-1">
                                        <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                                          <Hammer size={12} />
                                        </div>
                                        <span className="text-[9px] font-medium text-gray-700">Schreinerei</span>
                                      </div>
                                    </div>
                                  </div>

                                  <button className="w-full bg-[#8c5000] text-white font-extrabold py-1.5 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-sm mt-2" type="button">
                                    Weiter <ArrowRight size={11} />
                                  </button>
                                </div>

                                {/* SCREEN 3: Umfang & Größe (Schritt 2 von 4) */}
                                <div className="w-full min-h-[380px] bg-[#f9f9fe] flex flex-col justify-between p-3 select-none relative font-sans text-left">
                                  <div>
                                    <div className="flex items-center justify-between pb-1.5">
                                      <ArrowLeft size={13} className="text-gray-500" />
                                      <span className="font-black text-xs tracking-tight text-[#8c5000]">PriceBolt</span>
                                      <div className="w-3" />
                                    </div>
                                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-2.5">
                                      <div className="h-full bg-[#8c5000] w-1/2 rounded-full" />
                                    </div>

                                    <span className="text-[8px] font-bold text-[#8c5000] uppercase tracking-wider block">Schritt 2 von 4</span>
                                    <h4 className="text-xs font-bold text-gray-900 mt-0.5 leading-tight">Wie groß ist das Projekt?</h4>
                                    <p className="text-[8px] text-gray-500 mt-0.5 leading-snug">Definieren Sie den Umfang für einen genauen Preis.</p>

                                    {/* Slider Card */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-2 mt-2 space-y-1 shadow-sm">
                                      <div className="flex justify-between items-center text-[9px]">
                                        <span className="font-bold text-gray-800">Gesamtfläche</span>
                                        <span className="font-extrabold text-[#8c5000] text-xs">1.200 m²</span>
                                      </div>
                                      <div className="w-full h-1.5 bg-gray-200 rounded-full relative">
                                        <div className="h-full bg-[#8c5000] w-2/5 rounded-full" />
                                        <div className="w-3 h-3 bg-white border-2 border-[#8c5000] rounded-full absolute top-1/2 left-2/5 -translate-y-1/2 -translate-x-1/2 shadow" />
                                      </div>
                                      <div className="flex justify-between text-[7px] text-gray-400">
                                        <span>10 m²</span>
                                        <span>500+ m²</span>
                                      </div>
                                    </div>

                                    {/* Stepper Card */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-2 mt-1.5 flex items-center justify-between shadow-sm">
                                      <div>
                                        <span className="text-[9px] font-bold text-gray-800 block">Räume</span>
                                        <span className="text-[7px] text-gray-400">Haupträume</span>
                                      </div>
                                      <div className="flex items-center gap-2 bg-gray-100 px-2 py-0.5 rounded-full">
                                        <Minus size={10} className="text-gray-600" />
                                        <span className="font-bold text-[10px] text-gray-900">3</span>
                                        <Plus size={10} className="text-gray-600" />
                                      </div>
                                    </div>

                                    {/* Pro-Tipp Card */}
                                    <div className="bg-[#ffdcbf]/30 border border-[#ff9500]/40 rounded-xl p-2 mt-1.5 flex items-start gap-1.5">
                                      <Info size={11} className="text-[#8c5000] mt-0.5 flex-shrink-0" />
                                      <p className="text-[7px] text-gray-700 leading-snug">Pro-Tipp: Schließen Sie Flure und Schränke in die Gesamtfläche ein.</p>
                                    </div>
                                  </div>

                                  <button className="w-full bg-[#8c5000] text-white font-extrabold py-1.5 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-sm mt-2" type="button">
                                    Weiter <ArrowRight size={11} />
                                  </button>
                                </div>

                                {/* SCREEN 4: Foto-Upload (Schritt 3 von 4) */}
                                <div className="w-full min-h-[380px] bg-[#f9f9fe] flex flex-col justify-between p-3 select-none relative font-sans text-left">
                                  <div>
                                    <div className="flex items-center justify-between pb-1.5">
                                      <ArrowLeft size={13} className="text-gray-500" />
                                      <span className="font-black text-xs tracking-tight text-[#8c5000]">PriceBolt</span>
                                      <div className="w-3" />
                                    </div>
                                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-2.5">
                                      <div className="h-full bg-[#8c5000] w-3/4 rounded-full" />
                                    </div>

                                    <span className="text-[8px] font-bold text-[#8c5000] uppercase tracking-wider block">Schritt 3 von 4</span>
                                    <h4 className="text-xs font-bold text-gray-900 mt-0.5 leading-tight">Zeigen Sie uns den Raum</h4>
                                    <p className="text-[8px] text-gray-500 mt-0.5 leading-snug">Laden Sie Fotos hoch für ein genaues Angebot.</p>

                                    {/* Upload Box */}
                                    <div className="border-2 border-dashed border-[#8c5000]/40 bg-[#ffdcbf]/20 rounded-xl p-2.5 text-center flex flex-col items-center justify-center gap-0.5 mt-2">
                                      <Camera size={16} className="text-[#8c5000]" />
                                      <span className="text-[9px] font-bold text-gray-800">Fotos hochladen...</span>
                                      <span className="text-[7px] text-gray-400">PNG, JPG bis zu 10MB</span>
                                    </div>

                                    {/* Thumbnails */}
                                    <div className="grid grid-cols-2 gap-1.5 mt-2">
                                      <div className="h-14 rounded-lg overflow-hidden relative border border-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80')" }}>
                                        <div className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full">
                                          <Trash2 size={8} />
                                        </div>
                                      </div>
                                      <div className="h-14 rounded-lg overflow-hidden relative border border-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=300&q=80')" }}>
                                        <div className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full">
                                          <Trash2 size={8} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-[8px] text-gray-400 underline block text-center mb-1 cursor-pointer">Vorerst überspringen</span>
                                    <button className="w-full bg-[#8c5000] text-white font-extrabold py-1.5 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-sm" type="button">
                                      Weiter <ArrowRight size={11} />
                                    </button>
                                  </div>
                                </div>

                                {/* SCREEN 5: Kontaktdaten (Schritt 4 von 4) */}
                                <div className="w-full min-h-[380px] bg-[#f9f9fe] flex flex-col justify-between p-3 select-none relative font-sans text-left">
                                  <div>
                                    <div className="flex items-center justify-between pb-1.5">
                                      <ArrowLeft size={13} className="text-gray-500" />
                                      <span className="font-black text-xs tracking-tight text-[#8c5000]">PriceBolt</span>
                                      <div className="w-3" />
                                    </div>
                                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-2.5">
                                      <div className="h-full bg-[#8c5000] w-full rounded-full" />
                                    </div>

                                    <span className="text-[8px] font-bold text-[#8c5000] uppercase tracking-wider block">Schritt 4 von 4</span>
                                    <h4 className="text-xs font-bold text-gray-900 mt-0.5 leading-tight">Wohin sollen wir das Angebot senden?</h4>
                                    <p className="text-[8px] text-gray-500 mt-0.5 leading-snug">Nur ein paar Details für den Preis.</p>

                                    <div className="space-y-1.5 mt-2">
                                      <div className="bg-white border border-gray-300 rounded-lg px-2 py-1">
                                        <span className="text-[7px] text-[#8c5000] font-bold block">Vollständiger Name</span>
                                        <span className="text-[9px] text-gray-800 font-medium">Max Mustermann</span>
                                      </div>
                                      <div className="bg-white border border-gray-300 rounded-lg px-2 py-1">
                                        <span className="text-[7px] text-[#8c5000] font-bold block">E-Mail-Adresse</span>
                                        <span className="text-[9px] text-gray-800 font-medium">max@example.de</span>
                                      </div>
                                      <div className="bg-white border border-gray-300 rounded-lg px-2 py-1 flex items-center justify-between">
                                        <span className="text-[8px] text-gray-400">Bevorzugte Kontaktzeit...</span>
                                        <ChevronDown size={10} className="text-gray-400" />
                                      </div>
                                    </div>
                                  </div>

                                  <button className="w-full bg-[#8c5000] text-white font-extrabold py-2 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-sm mt-2" type="button">
                                    Preis berechnen <Zap size={11} fill="currentColor" />
                                  </button>
                                </div>

                                {/* SCREEN 6: Kostenschätzung / Ergebnis */}
                                <div className="w-full min-h-[380px] bg-[#f9f9fe] flex flex-col justify-between p-3 select-none relative font-sans text-left">
                                  <div>
                                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                                      <ArrowLeft size={13} className="text-gray-500" />
                                      <span className="font-black text-xs tracking-tight text-[#8c5000]">PriceBolt</span>
                                      <div className="w-3" />
                                    </div>

                                    <div className="mt-2 text-center">
                                      <div className="inline-flex items-center gap-1 bg-[#00CC6A]/15 text-[#00CC6A] px-2 py-0.5 rounded-full text-[8px] font-bold">
                                        <CheckCircle size={9} /> Berechnung abgeschlossen
                                      </div>
                                      <h4 className="text-xs font-bold text-gray-900 mt-1">Ihre Kostenschätzung</h4>
                                    </div>

                                    {/* Price Card */}
                                    <div className="bg-white border border-[#8c5000]/30 rounded-xl p-2.5 text-center mt-2 shadow-sm bg-gradient-to-br from-white to-[#ffdcbf]/20">
                                      <span className="text-[7px] text-gray-400 font-bold uppercase tracking-wider block">Geschätzter Gesamtbereich</span>
                                      <span className="text-sm font-black text-[#8c5000] mt-0.5 block">1.200 € - 1.500 €</span>
                                    </div>

                                    {/* Details */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-2 mt-2 space-y-1 text-[8px]">
                                      <div className="flex justify-between items-center text-gray-700">
                                        <span className="flex items-center gap-1"><Paintbrush size={9} /> Dienstleistung</span>
                                        <span className="font-bold text-gray-900">Malerarbeiten</span>
                                      </div>
                                      <div className="flex justify-between items-center text-gray-700">
                                        <span className="flex items-center gap-1"><Sliders size={9} /> Größe</span>
                                        <span className="font-bold text-gray-900">45 m²</span>
                                      </div>
                                      <div className="flex justify-between items-center text-gray-700">
                                        <span className="flex items-center gap-1"><Receipt size={9} /> Arbeitskosten</span>
                                        <span className="font-bold text-gray-900">800 €</span>
                                      </div>
                                    </div>
                                  </div>

                                  <button className="w-full bg-[#8c5000] text-white font-extrabold py-2 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-sm mt-2" type="button">
                                    Anfrage senden <Send size={10} />
                                  </button>
                                </div>

                                {/* SCREEN 7: Anfrage gesendet! (Bestätigungs-Screen) */}
                                <div className="w-full min-h-[380px] bg-[#f9f9fe] flex flex-col justify-between p-3 select-none relative font-sans text-left">
                                  <div>
                                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                                      <ArrowLeft size={13} className="text-gray-500" />
                                      <span className="font-black text-xs tracking-tight text-[#8c5000]">PriceBolt</span>
                                      <div className="w-3" />
                                    </div>

                                    <div className="mt-6 flex flex-col items-center text-center">
                                      <div className="w-16 h-16 rounded-full bg-[#ffdcbf]/40 border border-[#ff9500]/30 flex items-center justify-center relative mb-3 shadow-inner">
                                        <div className="absolute inset-0 bg-[#ff9500]/20 rounded-full blur-md animate-pulse" />
                                        <CheckCircle size={32} className="text-[#8c5000] relative z-10" />
                                      </div>
                                      <h4 className="text-sm font-black text-gray-900 leading-tight">Anfrage gesendet!</h4>
                                      <p className="text-[9px] text-gray-500 mt-2 leading-relaxed max-w-[200px] mx-auto">
                                        Vielen Dank für Ihr Vertrauen. Wir melden uns innerhalb von 24 Stunden mit einem endgültigen Angebot.
                                      </p>
                                    </div>
                                  </div>

                                  <button className="w-full bg-[#8c5000] text-white font-extrabold py-2 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-sm mt-3" type="button">
                                    Zur Startseite <ArrowRight size={11} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : app.id === 'leadradar' ? (
                            <div className="leadradar-mockup-app">
                              {/* Top App Bar */}
                              <div className="leadradar-app-header">
                                <div className="leadradar-header-left">
                                  <div className="leadradar-pulse-dot" />
                                  <span className="leadradar-logo-text">LeadRadar</span>
                                </div>
                                <div className="leadradar-header-actions">
                                  <span className="leadradar-badge-live">LIVE SCAN</span>
                                  <Bell size={14} className="leadradar-bell-icon" />
                                </div>
                              </div>

                              {/* Live Scanning Stats Banner */}
                              <div className="leadradar-stats-banner">
                                <div className="leadradar-stat-item">
                                  <small>REGION</small>
                                  <strong>DACH</strong>
                                </div>
                                <div className="leadradar-stat-item">
                                  <small>GEFUNDEN</small>
                                  <strong className="text-accent">482</strong>
                                </div>
                                <div className="leadradar-stat-item">
                                  <small>HEUTE</small>
                                  <strong style={{ color: '#10b981' }}>+18</strong>
                                </div>
                              </div>

                              {/* Scroll Area */}
                              <div className="leadradar-app-scroll">
                                <div className="leadradar-app-scroll-track">
                                  
                                  {/* Lead Card 1 */}
                                  <div className="leadradar-card">
                                    <div className="leadradar-card-header">
                                      <div className="leadradar-card-title-group">
                                        <h6>Zahnarztpraxis Dr. Stein</h6>
                                        <div className="leadradar-meta-row">
                                          <MapPin size={10} /> <small>München</small>
                                        </div>
                                      </div>
                                      <span className="leadradar-score-badge red">Audit: Mangelhaft</span>
                                    </div>
                                    <p className="leadradar-card-desc">
                                      Keine mobil-optimierte Website, eklatante NAP-Inkonsistenzen in Branchenbüchern. SSL-Zertifikat abgelaufen.
                                    </p>
                                    <div className="leadradar-card-footer">
                                      <span className="leadradar-card-source">Google Maps</span>
                                      <span className="leadradar-card-time">Vor 4 Min.</span>
                                    </div>
                                  </div>

                                  {/* Lead Card 2 */}
                                  <div className="leadradar-card">
                                    <div className="leadradar-card-header">
                                      <div className="leadradar-card-title-group">
                                        <h6>Kreativ Malerbetrieb Gbr</h6>
                                        <div className="leadradar-meta-row">
                                          <MapPin size={10} /> <small>Stuttgart</small>
                                        </div>
                                      </div>
                                      <span className="leadradar-score-badge yellow">GBP: Fehlt</span>
                                    </div>
                                    <p className="leadradar-card-desc">
                                      Kein Google Business Profile Eintrag vorhanden. Hervorragende Option für Repute SaaS Kaltakquise.
                                    </p>
                                    <div className="leadradar-card-footer">
                                      <span className="leadradar-card-source">Gelbe Seiten</span>
                                      <span className="leadradar-card-time">Vor 18 Min.</span>
                                    </div>
                                  </div>

                                  {/* Lead Card 3 */}
                                  <div className="leadradar-card">
                                    <div className="leadradar-card-header">
                                      <div className="leadradar-card-title-group">
                                        <h6>Restaurant Bella Vista</h6>
                                        <div className="leadradar-meta-row">
                                          <MapPin size={10} /> <small>Heilbronn</small>
                                        </div>
                                      </div>
                                      <span className="leadradar-score-badge red">3.2 ★ (Rezensionen)</span>
                                    </div>
                                    <p className="leadradar-card-desc">
                                      12 unbeantwortete negative Rezensionen in den letzten 30 Tagen. Extrem hohes Conversion-Potenzial.
                                    </p>
                                    <div className="leadradar-card-footer">
                                      <span className="leadradar-card-source">TripAdvisor</span>
                                      <span className="leadradar-card-time">Vor 1 Std.</span>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              {/* Navigation Footer */}
                              <div className="leadradar-app-footer">
                                <div className="active">
                                  <Sparkles size={16} />
                                  <span>Leads</span>
                                </div>
                                <div>
                                  <TrendingUp size={16} />
                                  <span>Stats</span>
                                </div>
                                <div>
                                  <Filter size={16} />
                                  <span>Filter</span>
                                </div>
                                <div>
                                  <Settings size={16} />
                                  <span>Optionen</span>
                                </div>
                              </div>
                            </div>
                          ) : app.id === 'vnpro' ? (
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
                                        <Plus size={12} />
                                      </div>
                                      <span className="text-[10px] font-bold text-gray-800">Vorher-Bild hochladen</span>
                                      <span className="text-[8px] text-gray-400">Drag &amp; Drop oder klicken</span>
                                    </div>

                                    <div className="border border-dashed border-gray-300 bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-center space-y-0.5">
                                      <span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full self-start">Nachher</span>
                                      <div className="w-6 h-6 rounded-full bg-[#00CC6A]/10 text-[#00CC6A] flex items-center justify-center my-0.5">
                                        <Plus size={12} />
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
                          ) : app.previewImage ? (
                            <img src={app.previewImage} alt={app.name} className="phone-screenshot-img" />
                          ) : (
                            <div className="phone-placeholder">
                              <Smartphone size={32} className="text-accent" />
                              <span>{app.name} UI</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Copy container */}
                  <div className="app-copy-container">
                    <div className="app-meta">
                      <span className="app-badge-tag">App</span>
                      <span className="app-status-badge">
                        <i className={`status-dot dot-${app.statusType}`} />
                        {app.status}
                      </span>
                    </div>
                    <h3>{app.name}</h3>
                    <p className="app-tagline-text">{app.tagline}</p>
                    {app.hasMore && (
                      <span className="app-ghost-link">
                        Mehr erfahren <ArrowRight size={15} />
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Sektion Systeme */}
        <section className="section systems-list-section">
          <div className="apps-section-header">
            <span className="apps-section-badge systems-badge"><Laptop size={16} /> Enterprise Systeme</span>
            <h3>Verwaltung &amp; Skalierung</h3>
          </div>

          <div className="systems-vertical-list">
            {systems.map((system, index) => {
              const isLeft = index % 2 === 0
              return (
                <div 
                  key={system.id} 
                  className={`system-reveal-block layout-mockup-${isLeft ? 'left' : 'right'}`}
                >
                  {/* Browser Mockup */}
                  <div className="system-mockup-container">
                    {system.id === 'repute' ? (
                      <img 
                        src="/assets/apps/repute-preview.png" 
                        alt="Repute Dashboard" 
                        className="medreview-teaser-img"
                      />
                    ) : system.id === 'greenlabz-crm' ? (
                      <img 
                        src="/assets/apps/crm-preview.png" 
                        alt="GreenLabz CRM Dashboard" 
                        className="medreview-teaser-img"
                      />
                    ) : (
                      <div className="lab-preview-browser">
                        <div className="lab-preview-bar">
                          <span className="dot dot-red" />
                          <span className="dot dot-yellow" />
                          <span className="dot dot-green" />
                          <span className="lab-preview-url">https://{system.id}.greenlabz.de</span>
                        </div>
                        <div className="lab-preview-content system-preview-content">
                          {system.previewImage ? (
                            <img src={system.previewImage} alt={system.name} className="system-screenshot-img" />
                          ) : (
                            <div className="system-placeholder">
                              <Laptop size={36} className="text-accent" />
                              <span>{system.name} Dashboard</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* System Details */}
                  <div className="system-details-container">
                    <div className="system-meta">
                      <span className="system-badge-tag">{system.badge}</span>
                      <span className="system-status-badge">
                        <i className={`status-dot dot-${system.statusType}`} />
                        {system.status}
                      </span>
                    </div>
                    <h3>{system.name}</h3>
                    
                    <div className="system-breakdown">
                      <div className="system-box">
                        <strong>Problem</strong>
                        <p>{system.problem}</p>
                      </div>
                      <div className="system-box">
                        <strong>Lösung</strong>
                        <p>{system.solution}</p>
                      </div>
                      <div className="system-box highlight-box">
                        <strong>Ergebnis</strong>
                        <p>{system.result}</p>
                      </div>
                    </div>

                    <div className="system-footer">
                      <div className="tech-tags-list">
                        <span className="tags-label"><Code size={14} /> Tech Stack:</span>
                        {system.techStack.map(tech => (
                          <span className="tech-tag" key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA-Sektion am Seitenende */}
        <section className="section apps-cta-section text-center">
          <div className="apps-cta-box premium-card">
            <p className="section-code"><span></span> [KOOPERATION]</p>
            <h2>
              Möchtest du ein eigenes <span className="text-accent">System</span> oder eine <span className="section-title-serif">App</span> entwickeln lassen?
            </h2>
            <p>
              Ob maßgeschneiderte SaaS-Lösungen, interne Verwaltungsportale oder automatisierte APIs – ich baue deine Software schnell, wartungsarm und absolut performant.
            </p>
            <div className="apps-cta-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => {
                  onNavigate('home')
                  window.requestAnimationFrame(() => {
                    document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })
                  })
                }}
              >
                <span className="cta-label">Kostenloses Erstgespräch vereinbaren</span>
                <span className="cta-dots" aria-hidden="true" />
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
