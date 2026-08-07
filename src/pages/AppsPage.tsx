import { useEffect, useRef } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowLeft, ArrowRight, Code, Smartphone, Laptop, Plus, Calendar, Users, GlassWater, Settings, Star, Paintbrush, Layers, Zap, Hammer, Minus, Info, Bell, MapPin, Filter, Sparkles, TrendingUp, Camera, CheckCircle2, Trash2, ImagePlus, UploadCloud, Store, Save } from 'lucide-react'
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
                            <div className="pricebolt-mockup-app">
                              {/* Top App Bar */}
                              <div className="pricebolt-app-header">
                                <ArrowLeft size={16} className="pricebolt-back-icon" />
                                <img 
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3yG_uGVN0DwhuaVsNdshij4dMfz1GmvkwXBYMI0mbNfKcl7sybq0XgT4OxZ7hlVMFoJh2oarp_rxGrjwt39vmNK9HU4dSoQNJzSlULE9fPcyAF57VakDD2R8B4L_UlH9FzXKI--nI8ncmv3Im8dbquCOCHGAcxXjtDOtBMKveRcFpr_Q0eWvaAeutW_YU3TSXD0nEi_LkuA8ZrQJAOLSg2JxAFhTKX3rpR_5TJGzYt5k_ab-5FpNE8xjv7HGvC0y0mg" 
                                  alt="PriceBolt Logo" 
                                  className="pricebolt-logo-img" 
                                />
                                <div style={{ width: 16 }} />
                              </div>

                              {/* Scroll Area */}
                              <div className="pricebolt-app-scroll">
                                <div className="pricebolt-app-scroll-track">
                                  {/* SCREEN 1 */}
                                  <div className="pricebolt-screen-section">
                                    {/* Hero Card */}
                                    <div className="pricebolt-hero-card">
                                      <img 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD3g-G_C2INqWvQc29oY8uLMVVbrP_8yZCznzdh1TV77TzcCOovg6k9EK71ecKTBixBEem7xYVFP5zs-skZIsksb5ywOdKMV97DgeqEcifkhIMukuJc-8u1emcJ9rYLXzq-T_Gb3r2JIo7NbDgNCrS5AoIo7qspjEpBqFY4BnfcLTliDMbPXV4zFyL7abBiGxc3LUtrgevjlYOXz1MTgCIwbtoBfvQtaqEghSxV292EmeAcHUq974c" 
                                        alt="Clipboard" 
                                        className="pricebolt-hero-img" 
                                      />
                                    </div>

                                    {/* Typography Cluster */}
                                    <div className="pricebolt-text-cluster">
                                      <h4>Erhalten Sie Ihr Angebot in 60 Sekunden</h4>
                                      <p>Professionelle Angebote für Ihr nächstes Projekt, sofort.</p>
                                    </div>

                                    {/* Trust Badge */}
                                    <div className="pricebolt-trust-badge">
                                      <div className="pricebolt-stars">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                          <Star key={s} size={11} fill="#FFB400" stroke="none" />
                                        ))}
                                      </div>
                                      <span>500+ Angebote erstellt</span>
                                    </div>

                                    <button className="pricebolt-start-btn" type="button" style={{ marginTop: 8 }}>
                                      Jetzt starten <ArrowRight size={14} />
                                    </button>
                                  </div>

                                  {/* Divider / Transition spacing */}
                                  <div className="pricebolt-screen-divider">
                                    <span>NÄCHSTER SCHRITT</span>
                                  </div>

                                  {/* SCREEN 2: Service Selection */}
                                  <div className="pricebolt-screen-section">
                                    <div className="pricebolt-progress-bar">
                                      <div className="pricebolt-progress-fill" />
                                    </div>
                                    <span className="pricebolt-step-badge">SCHRITT 1 VON 4</span>
                                    <h4 className="pricebolt-section-title">Wobei können wir Ihnen helfen?</h4>
                                    <p className="pricebolt-section-subtitle">
                                      Wählen Sie die Hauptdienstleistung aus für ein genaues Angebot.
                                    </p>

                                    {/* Grid */}
                                    <div className="pricebolt-service-grid">
                                      <div className="pricebolt-service-card">
                                        <div className="pricebolt-card-icon"><Paintbrush size={16} /></div>
                                        <span>Malerarbeiten</span>
                                      </div>
                                      <div className="pricebolt-service-card selected">
                                        <div className="pricebolt-card-icon"><Layers size={16} /></div>
                                        <span>Bodenlegen</span>
                                      </div>
                                      <div className="pricebolt-service-card">
                                        <div className="pricebolt-card-icon"><Zap size={16} /></div>
                                        <span>Elektro</span>
                                      </div>
                                      <div className="pricebolt-service-card">
                                        <div className="pricebolt-card-icon"><Hammer size={16} /></div>
                                        <span>Schreinerei</span>
                                      </div>
                                    </div>

                                    <button className="pricebolt-start-btn" type="button" style={{ marginTop: 14 }}>
                                      Weiter <ArrowRight size={14} />
                                    </button>
                                  </div>

                                  {/* Divider / Transition spacing */}
                                  <div className="pricebolt-screen-divider">
                                    <span>NÄCHSTER SCHRITT</span>
                                  </div>

                                  {/* SCREEN 3: Scope & Size */}
                                  <div className="pricebolt-screen-section">
                                    <div className="pricebolt-progress-bar">
                                      <div className="pricebolt-progress-fill" style={{ width: '50%' }} />
                                    </div>
                                    <span className="pricebolt-step-badge">SCHRITT 2 VON 4</span>
                                    <h4 className="pricebolt-section-title">Wie groß ist das Projekt?</h4>
                                    <p className="pricebolt-section-subtitle">
                                      Definieren Sie den Umfang für einen genauen Kostenvoranschlag.
                                    </p>

                                    {/* Slider Card */}
                                    <div className="pricebolt-bento-card">
                                      <div className="pricebolt-bento-card-header">
                                        <div>
                                          <h5>Gesamtfläche</h5>
                                          <p>Geschätzte m²</p>
                                        </div>
                                        <div className="pricebolt-bento-val">
                                          <strong>120</strong> <span>m²</span>
                                        </div>
                                      </div>
                                      <div className="pricebolt-slider-container">
                                        <input 
                                          type="range" 
                                          min="10" 
                                          max="500" 
                                          value="120" 
                                          readOnly 
                                          className="pricebolt-slider-input" 
                                        />
                                        <div className="pricebolt-slider-labels">
                                          <span>10 m²</span>
                                          <span>500+ m²</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Stepper Card */}
                                    <div className="pricebolt-bento-card pricebolt-bento-card-center">
                                      <div className="pricebolt-bento-card-header-simple">
                                        <h5>Räume</h5>
                                        <p>Zu bearbeitende Haupträume</p>
                                      </div>
                                      <div className="pricebolt-stepper">
                                        <button className="pricebolt-stepper-btn" type="button"><Minus size={14} /></button>
                                        <span className="pricebolt-stepper-val">3</span>
                                        <button className="pricebolt-stepper-btn" type="button"><Plus size={14} /></button>
                                      </div>
                                    </div>

                                    {/* Pro-Tipp Card */}
                                    <div className="pricebolt-info-card">
                                      <Info size={18} className="pricebolt-info-icon" />
                                      <div className="pricebolt-info-text">
                                        <h6>Pro-Tipp</h6>
                                        <p>
                                          Schließen Sie Flure und große Schränke in Ihre Schätzung ein, um ein genaueres Angebot zu erhalten.
                                        </p>
                                      </div>
                                    </div>

                                    <button className="pricebolt-start-btn" type="button" style={{ marginTop: 14 }}>
                                      Weiter <ArrowRight size={14} />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Footer */}
                              <div className="pricebolt-app-footer">
                                <button className="pricebolt-start-btn" type="button">
                                  Jetzt starten <ArrowRight size={14} />
                                </button>
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
                            <div className="vnpro-mockup-app">
                              {/* Top Dynamic Bar / Title Bar */}
                              <div className="vnpro-app-header">
                                <span className="vnpro-logo-text">vnPro</span>
                                <div className="flex items-center gap-2">
                                  <Settings size={14} className="text-secondary" />
                                  <div className="vnpro-profile-thumb" />
                                </div>
                              </div>

                              {/* Scrolling Track Container */}
                              <div className="vnpro-app-scroll">
                                <div className="vnpro-app-scroll-track">
                                  
                                  {/* SCREEN 1: Dashboard */}
                                  <div className="vnpro-screen">
                                    <div className="vnpro-screen-header">
                                      <h2>Projektgalerie</h2>
                                      <p>Übersicht aller abgeschlossenen und laufenden Restaurierungen.</p>
                                      
                                      {/* New Project Button */}
                                      <button className="vnpro-dashboard-btn mt-3 flex items-center justify-center gap-1 w-full bg-[#00CC6A] text-white py-2 rounded-xl text-xs font-bold border-none cursor-pointer">
                                        <Plus size={14} /> Neues Projekt
                                      </button>
                                    </div>

                                    {/* Grid Cases */}
                                    <div className="vnpro-cases-list">
                                      {/* Card 1 */}
                                      <div className="vnpro-case-card">
                                        <div className="vnpro-card-image">
                                          <div className="vnpro-photo-split">
                                            <div className="vnpro-photo-half before" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=300&q=80')" }}>
                                              <span className="vnpro-image-capsule">Vorher</span>
                                            </div>
                                            <div className="vnpro-photo-half after" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80')" }}>
                                              <span className="vnpro-image-capsule right-capsule">Nachher</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="vnpro-card-info">
                                          <h5>Parkett-Restaurierung Villa Schmidt</h5>
                                          <div className="vnpro-card-row">
                                            <span className="vnpro-card-date-new">12. Oktober 2023</span>
                                            <span className="vnpro-badge bg-primary-container text-on-primary">
                                              Abgeschlossen
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Card 2 */}
                                      <div className="vnpro-case-card">
                                        <div className="vnpro-card-image">
                                          <div className="vnpro-photo-split">
                                            <div className="vnpro-photo-half before" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=300&q=80')" }}>
                                              <span className="vnpro-image-capsule">Vorher</span>
                                            </div>
                                            <div className="vnpro-photo-half after" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=300&q=80')" }}>
                                              <span className="vnpro-image-capsule right-capsule">Nachher</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="vnpro-card-info">
                                          <h5>Bodenaufbereitung Kanzlei Meyer</h5>
                                          <div className="vnpro-card-row">
                                            <span className="vnpro-card-date-new">05. September 2023</span>
                                            <span className="vnpro-badge bg-primary-container text-on-primary">
                                              Abgeschlossen
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Card 3 */}
                                      <div className="vnpro-case-card">
                                        <div className="vnpro-card-image">
                                          <div className="vnpro-photo-split">
                                            <div className="vnpro-photo-half before" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=300&q=80')" }}>
                                              <span className="vnpro-image-capsule">Vorher</span>
                                            </div>
                                            <div className="vnpro-photo-half after" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80')" }}>
                                              <span className="vnpro-image-capsule right-capsule">Nachher</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="vnpro-card-info">
                                          <h5>Epoxidharz Medical Center</h5>
                                          <div className="vnpro-card-row">
                                            <span className="vnpro-card-date-new">In Bearbeitung</span>
                                            <span className="vnpro-badge bg-surface-container-highest text-on-surface">
                                              Laufend
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Card 4 */}
                                      <div className="vnpro-case-card">
                                        <div className="vnpro-card-image">
                                          <div className="vnpro-photo-placeholder bg-surface-container">
                                            <Camera size={20} className="text-secondary opacity-30" style={{ marginBottom: 4 }} />
                                            <span style={{ fontSize: '0.52rem', color: '#5f5e60' }}>Keine Bilder</span>
                                          </div>
                                        </div>
                                        <div className="vnpro-card-info">
                                          <h5>Treppensanierung Altbau</h5>
                                          <div className="vnpro-card-row">
                                            <span className="vnpro-card-date-new">Geplant</span>
                                            <span className="vnpro-badge bg-surface-container-highest text-on-surface">
                                              Entwurf
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* SCREEN SEPARATOR 1 */}
                                  <div className="vnpro-step-divider">
                                    <div className="vnpro-divider-line" />
                                    <span className="vnpro-divider-text">NÄCHSTER SCREEN: UPLOAD</span>
                                    <div className="vnpro-divider-line" />
                                  </div>

                                  {/* SCREEN 2: Upload */}
                                  <div className="vnpro-screen">
                                    <div className="vnpro-screen-header">
                                      <h2>Neues Projekt erstellen</h2>
                                      <p>Laden Sie Ihre Vorher/Nachher-Aufnahmen hoch, um ein neues Vergleichsprojekt anzulegen.</p>
                                    </div>

                                    {/* Upload Form */}
                                    <div className="vnpro-upload-form">
                                      {/* Upload zones */}
                                      <div className="vnpro-upload-zones">
                                        <div className="vnpro-upload-zone">
                                          <span className="vnpro-zone-badge">Vorher</span>
                                          <div className="vnpro-upload-circle">
                                            <ImagePlus size={18} className="text-primary" />
                                          </div>
                                          <h5>Vorher-Bild hochladen</h5>
                                          <small>Drag &amp; Drop oder klicken</small>
                                        </div>
                                        <div className="vnpro-upload-zone">
                                          <span className="vnpro-zone-badge">Nachher</span>
                                          <div className="vnpro-upload-circle">
                                            <ImagePlus size={18} className="text-primary" />
                                          </div>
                                          <h5>Nachher-Bild hochladen</h5>
                                          <small>Drag &amp; Drop oder klicken</small>
                                        </div>
                                      </div>

                                      <div className="vnpro-input-group">
                                        <label>Projekttitel</label>
                                        <div className="vnpro-input-field text-secondary">z.B. Frontzahnästhetik Restauration</div>
                                      </div>

                                      <div className="vnpro-input-group">
                                        <label>Beschreibung (Optional)</label>
                                        <div className="vnpro-input-field text-secondary" style={{ minHeight: '38px', height: 'auto', display: 'flex', alignItems: 'flex-start', paddingTop: '6px' }}>
                                          Kurze Details zur Behandlung...
                                        </div>
                                      </div>

                                      <div className="flex justify-end gap-2 border-t border-surface-container pt-3 mt-1">
                                        <button className="vnpro-btn-secondary">Abbrechen</button>
                                        <button className="vnpro-btn-primary flex items-center justify-center gap-1">
                                          <UploadCloud size={11} /> Projekt speichern
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* SCREEN SEPARATOR 2 */}
                                  <div className="vnpro-step-divider">
                                    <div className="vnpro-divider-line" />
                                    <span className="vnpro-divider-text">NÄCHSTER SCREEN: SETTINGS</span>
                                    <div className="vnpro-divider-line" />
                                  </div>

                                  {/* SCREEN 3: Settings */}
                                  <div className="vnpro-screen" style={{ paddingBottom: 70 }}>
                                    <div className="vnpro-screen-header text-center">
                                      <h2>Einstellungen &amp; Branding</h2>
                                      <p>Passen Sie das Erscheinungsbild Ihres Studios an. Diese Einstellungen werden für alle veroffentlichten Galerien und Vorher/Nachher-Präsentationen verwendet.</p>
                                    </div>

                                    {/* Settings Form */}
                                    <div className="vnpro-settings-form">
                                      
                                      {/* Identity section */}
                                      <div className="vnpro-section-card-new">
                                        <div className="vnpro-section-title-new">
                                          <div className="vnpro-icon-backdrop">
                                            <Store size={14} className="text-[#006d36]" />
                                          </div>
                                          <div className="flex flex-col text-left">
                                            <h6>Studio Identität</h6>
                                            <span className="vnpro-section-sub">Der offizielle Name, der auf allen Kundenpräsentationen erscheint.</span>
                                          </div>
                                        </div>
                                        <div className="vnpro-input-card mt-3">
                                          <label>Studioname</label>
                                          <div className="vnpro-input-value">Dr. med. Ästhetik</div>
                                        </div>
                                      </div>

                                      {/* Logo Upload section */}
                                      <div className="vnpro-section-card-new">
                                        <div className="vnpro-section-title-new">
                                          <div className="vnpro-icon-backdrop">
                                            <ImagePlus size={14} className="text-[#006d36]" />
                                          </div>
                                          <div className="flex flex-col text-left">
                                            <h6>Markenlogo</h6>
                                            <span className="vnpro-section-sub">Laden Sie ein klares, hochauflösendes Logo hoch (bevorzugt SVG oder PNG).</span>
                                          </div>
                                        </div>
                                        
                                        {/* Logo preview */}
                                        <div className="vnpro-logo-card mt-3">
                                          <div className="vnpro-logo-thumb-custom" />
                                          <div className="vnpro-logo-details">
                                            <h6>logo_dr_aesthetik.png</h6>
                                            <small>245 KB</small>
                                          </div>
                                          <Trash2 size={12} className="text-secondary hover:text-error cursor-pointer" />
                                        </div>
                                      </div>

                                      {/* Color selection */}
                                      <div className="vnpro-section-card-new">
                                        <div className="vnpro-section-title-new">
                                          <div className="vnpro-icon-backdrop">
                                            <Paintbrush size={14} className="text-[#006d36]" />
                                          </div>
                                          <div className="flex flex-col text-left">
                                            <h6>Akzentfarbe</h6>
                                            <span className="vnpro-section-sub">Wählen Sie die primäre Markenfarbe für Ihre Buttons.</span>
                                          </div>
                                        </div>

                                        <div className="vnpro-color-grid mt-3">
                                          <button className="vnpro-color-dot-new active" style={{ background: '#00CC6A' }}>
                                            <CheckCircle2 size={8} className="text-white" />
                                          </button>
                                          <button className="vnpro-color-dot-new" style={{ background: '#1A1C1C' }} />
                                          <button className="vnpro-color-dot-new" style={{ background: '#005227' }} />
                                          <button className="vnpro-color-dot-new" style={{ background: '#4A90E2' }} />
                                          <button className="vnpro-color-dot-new" style={{ background: '#9B51E0' }} />
                                          <button className="vnpro-color-dot-new" style={{ background: '#F2994A' }} />
                                        </div>
                                      </div>

                                      {/* Floating save actions inside phone mockup */}
                                      <div className="vnpro-save-action-bar">
                                        <button className="vnpro-btn-cancel">Abbrechen</button>
                                        <button className="vnpro-btn-save flex items-center justify-center gap-1">
                                          <Save size={10} /> Änderungen speichern
                                        </button>
                                      </div>

                                    </div>
                                  </div>

                                </div>
                              </div>

                              {/* Floating Action Button */}
                              <div className="vnpro-fab-button">
                                <Plus size={18} />
                              </div>

                              {/* Mobile Navigation Footer */}
                              <div className="vnpro-app-footer">
                                <div className="vnpro-foot-item vnpro-foot-item-projekte">
                                  <div className="vnpro-foot-icon-wrap">
                                    <Layers size={14} />
                                  </div>
                                  <span>Projekte</span>
                                </div>
                                <div className="vnpro-foot-item vnpro-foot-item-upload">
                                  <div className="vnpro-foot-icon-wrap">
                                    <Plus size={14} />
                                  </div>
                                  <span>Upload</span>
                                </div>
                                <div className="vnpro-foot-item vnpro-foot-item-profil">
                                  <div className="vnpro-foot-icon-wrap">
                                    <Settings size={14} />
                                  </div>
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
