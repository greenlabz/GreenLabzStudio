import { useEffect, useRef } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowLeft, ArrowRight, Code, Smartphone, Laptop, Plus, Calendar, Users, GlassWater, Settings } from 'lucide-react'
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
              onNavigate('home')
              window.scrollTo(0, 0)
            }}
          >
            <ArrowLeft size={16} /> Zurück zur Startseite
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
                        <div className="gl-exact-screen-content">
                          {app.id === 'bar-shift-planner' ? (
                            <div className="shaker-mockup-app">
                              {/* Top App Bar */}
                              <div className="shaker-app-header-schedule">
                                <div className="shaker-header-info">
                                  <span className="shaker-title">The Shaker</span>
                                  <span className="shaker-sub">Cocktail Bar · Diese Woche</span>
                                </div>
                                <div className="shaker-avatar">JG</div>
                              </div>

                              {/* Calendar Navigation Bar */}
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

                              {/* Scroll Area */}
                              <div className="shaker-app-scroll">
                                <div className="shaker-app-scroll-track">
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

                              {/* Bottom Nav Bar */}
                              <div className="shaker-app-footer-schedule">
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
                    <div className="lab-preview-browser">
                      <div className="lab-preview-bar">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                        <span className="lab-preview-url">https://{system.id}.greenlabz.de</span>
                      </div>
                      <div className="lab-preview-content system-preview-content">
                        {system.id === 'greenlabz-crm' ? (
                          <div className="crm-mockup-ui">
                            <div className="crm-mockup-nav">
                              <span>GreenLabz CRM</span>
                              <div className="crm-nav-items"><span className="active" /><span /><span /></div>
                            </div>
                            <div className="crm-grid-preview">
                              <div className="crm-card">
                                <small>Aktive Projekte</small>
                                <strong>6 laufend</strong>
                              </div>
                              <div className="crm-card">
                                <small>Onboarding Status</small>
                                <strong className="text-accent">100% Bereit</strong>
                              </div>
                              <div className="crm-card">
                                <small>Rechnungs-Quote</small>
                                <strong>99.8% Bezahlt</strong>
                              </div>
                            </div>
                            <div className="crm-table-preview">
                              <div className="crm-table-row head"><span>Kunde</span><span>Status</span><span>Budget</span></div>
                              <div className="crm-table-row"><span>Dr. Roth Zahnarzt</span><span>Entwicklung</span><span>€ 3.200</span></div>
                              <div className="crm-table-row"><span>Praxis Heilbronn</span><span>Freigegeben</span><span>€ 1.890</span></div>
                            </div>
                          </div>
                        ) : system.id === 'scrapemaster-pro' ? (
                          <div className="crm-mockup-ui scrapemaster-mockup-ui">
                            <div className="crm-mockup-nav">
                              <span>ScrapeMaster Pro</span>
                            </div>
                            <div className="crm-grid-preview">
                              <div className="crm-card">
                                <small>API-Status</small>
                                <strong className="text-accent">Aktiv</strong>
                              </div>
                              <div className="crm-card">
                                <small>Verifizierungs-Rate</small>
                                <strong>99.4%</strong>
                              </div>
                              <div className="crm-card">
                                <small>Speed</small>
                                <strong>120 req/s</strong>
                              </div>
                            </div>
                          </div>
                        ) : system.previewImage ? (
                          <img src={system.previewImage} alt={system.name} className="system-screenshot-img" />
                        ) : (
                          <div className="system-placeholder">
                            <Laptop size={36} className="text-accent" />
                            <span>{system.name} Dashboard</span>
                          </div>
                        )}
                      </div>
                    </div>
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
