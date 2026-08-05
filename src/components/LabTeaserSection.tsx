import { ArrowRight, ArrowUpRight, Plus, Calendar, Users, GlassWater, Settings, Star, TrendingUp } from 'lucide-react'

interface LabTeaserSectionProps {
  onNavigate: (route: string) => void
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <p className="section-code"><span /> [{number}] {label}</p>
}

export function LabTeaserSection({ onNavigate }: LabTeaserSectionProps) {
  return (
    <section className="section lab-teaser-section" id="lab" data-reveal>
      <div className="section-head">
        <SectionLabel number="05" label="Apps &amp; SaaS aus dem Lab" />
        <h2>
          Eigene <span className="section-title-serif">Tools</span> statt träger <span className="section-title-serif">Baukästen.</span>
        </h2>
        <p className="lab-teaser-lead">
          Neben Kundenwebsites entwickle ich eigene digitale Produkte und interne Werkzeuge, um Prozesse zu automatisieren und echte Ergebnisse zu liefern.
        </p>
      </div>

      <div className="lab-teaser-rows">
        {/* Row 1: MedReview Pro (SaaS) */}
        <div className="lab-teaser-row layout-left">
          <div className="lab-teaser-preview">
            <div className="lab-preview-browser">
              <div className="lab-preview-bar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <span className="lab-preview-url">medreview.greenlabz.de</span>
              </div>
              <div className="lab-preview-content">
                <div className="crm-mockup-ui medreview-mockup-ui">
                  <div className="crm-mockup-nav">
                    <span>MedReview Pro</span>
                    <div className="crm-nav-items">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn5luFPWlrHX0DNcPp36U29XU3jWyB5hLpTkOchUVjsxOW9-yKqoTDmPVdk6OJbdj-4142hBjTjRdM0zAiGreLnudC5AEKqeoLVn6eIqLyWMMZllcrs54iU2D6KrY-glr3Jt-qOGnA2lDp6vf05cRi8vIP5mmNPobar_9xtw1liG8ZSG2d3x6T12VaDjZKMuabpTllcLa6F0Ug1kGcK6OLxqSja9MUvUwvIVfMrvYPpNPtGXHZUzT3" 
                        alt="Provider Avatar"
                        className="w-5 h-5 rounded-full object-cover border border-outline-variant"
                      />
                    </div>
                  </div>
                  
                  {/* KPI Row */}
                  <div className="crm-grid-preview">
                    <div className="crm-card">
                      <small>Versendete Anfragen</small>
                      <strong className="text-accent flex items-center gap-1">
                        1.248 <TrendingUp size={11} />
                      </strong>
                    </div>
                    <div className="crm-card">
                      <small>Google-Bewertungen</small>
                      <strong>342</strong>
                    </div>
                    <div className="crm-card">
                      <small>Schnitt-Sterne</small>
                      <strong className="flex items-center gap-1 text-[#fea619]">
                        4,8 <Star size={12} fill="#fea619" />
                      </strong>
                    </div>
                  </div>

                  {/* Tiny Trend Chart Visualization */}
                  <div className="medreview-trend-chart">
                    <div className="trend-labels">
                      <span>Google-Sterne-Trend</span>
                      <small>6-Monats-Übersicht</small>
                    </div>
                    <svg className="trend-svg" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="medreview-chart-gradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25"></stop>
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <path d="M0,30 Q20,22 40,15 T80,8 T100,5 L100,30 L0,30 Z" fill="url(#medreview-chart-gradient)"></path>
                      <path d="M0,30 Q20,22 40,15 T80,8 T100,5" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"></path>
                      <circle cx="100" cy="5" fill="#10b981" r="1.5" stroke="#ffffff" strokeWidth="0.5"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lab-teaser-info">
            <div className="lab-card-top">
              <span className="lab-card-kicker">CLINICAL REPUTATION SAAS</span>
              <span className="lab-badge">SaaS</span>
            </div>
            <h3>MedReview Pro</h3>
            <p>Automatisiertes Reputations- und Bewertungsmanagement für Arztpraxen und Kliniken zur nachhaltigen Patientenakquise.</p>
            <div className="lab-tech-list">
              <span>React</span><span>Node.js</span><span>Tailwind CSS</span><span>FastAPI</span><span>Vercel</span>
            </div>
            <div className="lab-card-footer" style={{ marginTop: '0.5rem' }}>
              <span className="lab-card-link" onClick={() => { onNavigate('apps'); window.scrollTo(0, 0); }}>
                Mehr erfahren <ArrowRight size={15} />
              </span>
              <span className="lab-status-dot" title="Live in Produktion">
                <i className="dot-live" />
                <small>Live in Produktion</small>
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: GreenLabz CRM */}
        <div className="lab-teaser-row layout-right">
          <div className="lab-teaser-preview">
            <div className="lab-preview-browser">
              <div className="lab-preview-bar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <span className="lab-preview-url">crm.greenlabz.de</span>
              </div>
              <div className="lab-preview-content">
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
              </div>
            </div>
          </div>

          <div className="lab-teaser-info">
            <div className="lab-card-top">
              <span className="lab-card-kicker">KUNDEN &amp; PROJEKT CONTROL</span>
              <span className="lab-badge">CRM System</span>
            </div>
            <h3>GreenLabz CRM</h3>
            <p>Das zentrale Steuerungselement für Kundenbeziehungen, Projektfortschritt und automatisierte Rechnungsstellung.</p>
            <div className="lab-tech-list">
              <span>React</span><span>TypeScript</span><span>Node.js</span><span>Supabase</span><span>PostgreSQL</span>
            </div>
            <div className="lab-card-footer" style={{ marginTop: '0.5rem' }}>
              <span className="lab-card-link" onClick={() => { onNavigate('apps'); window.scrollTo(0, 0); }}>
                Mehr erfahren <ArrowRight size={15} />
              </span>
              <span className="lab-status-dot" title="Interne Nutzung">
                <i className="dot-live" />
                <small>Interne Nutzung</small>
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: The Shaker */}
        <div className="lab-teaser-row layout-left">
          <div className="lab-teaser-preview">
            <div className="app-phone-container" style={{ transform: 'scale(0.95)' }}>
              <div className="gl-exact-phone-bezel">
                <div className="gl-exact-hardware gl-exact-hardware-left-one" />
                <div className="gl-exact-hardware gl-exact-hardware-left-two" />
                <div className="gl-exact-hardware gl-exact-hardware-right" />
                <div className="gl-exact-screen">
                  <div className="gl-exact-screen-glare" />
                  <div className="gl-exact-notch"><span></span></div>
                  <div className="gl-exact-screen-content">
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lab-teaser-info">
            <div className="lab-card-top">
              <span className="lab-card-kicker">BAR-SCHICHTPLANER</span>
              <span className="lab-badge">App</span>
            </div>
            <h3>The Shaker</h3>
            <p>Dienstplanung, Rollenverteilung und Umsatz-Auswertung für Gastronomie-Betriebe direkt auf dem Smartphone.</p>
            <div className="lab-tech-list">
              <span>React</span><span>TypeScript</span><span>Tailwind CSS</span><span>Supabase</span><span>Vercel</span>
            </div>
            <div className="lab-card-footer" style={{ marginTop: '0.5rem' }}>
              <span className="lab-card-link" onClick={() => { onNavigate('apps'); window.scrollTo(0, 0); }}>
                Mehr erfahren <ArrowRight size={15} />
              </span>
              <span className="lab-status-dot" title="Live">
                <i className="dot-live" />
                <small>Live</small>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lab-teaser-cta">
        <button
          className="btn secondary"
          type="button"
          onClick={() => {
            onNavigate('apps')
            window.scrollTo(0, 0)
          }}
        >
          <span className="cta-dot" />
          <span className="cta-label">Alle Projekte &amp; Tools ansehen</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  )
}
