import { ArrowRight, ArrowUpRight, Database, Sparkles, Bell, Clock, Award, Zap, FileText, CheckCircle } from 'lucide-react'
import { appProjects } from '../pages/appsData'

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

      <div className="lab-card-grid">
        {appProjects.map((project, index) => (
          <article 
            className="lab-card premium-card" 
            key={project.id}
            onClick={() => {
              onNavigate('apps')
              window.scrollTo(0, 0)
            }}
          >
            {/* Visual Frame Mockup */}
            <div className="lab-card-preview" aria-hidden="true">
              <div className="lab-preview-browser">
                <div className="lab-preview-bar">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                  <span className="lab-preview-url">{project.id}.greenlabz.de</span>
                </div>
                <div className="lab-preview-content">
                  {index === 2 ? (
                    <div className="shaker-mockup-app">
                      {/* Top App Bar */}
                      <div className="shaker-app-header">
                        <div className="shaker-app-header-left">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHs2TNwhgoK55rR7oX1IK7BOaTedNIJXEPyzUX8iLK_uTCGjf4MoDIfcAYvhtHL6HT7KnsWF0H4ZJ8XqICvN99UQ9DBCfkilCXHeC9NNiA4MbTE73yU05T2V1P3-4Fg_vqyS36RaP43ec_fV1pUENzMkRWSXLEGGTCxyYKytiBQhm0Bo6IoLurWvm_e01O9wkTLEofNphyTL_1yVcOSekUKYPMQ8s-n_kueq7bw88XeXLwMlcYHpFkdJQ1a2S6N8w0gI3AjLtywSHE" alt="User" />
                          <span>The Shaker</span>
                        </div>
                        <Bell size={14} className="shaker-app-notif" />
                      </div>

                      {/* Scroll Area */}
                      <div className="shaker-app-scroll">
                        <div className="shaker-app-scroll-track">
                          {/* Profile Header */}
                          <div className="shaker-app-profile">
                            <div className="shaker-app-avatar-wrap">
                              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH0FzmGgc8xDkxhO4gUa2Y5--SpDYDZRPDdl02LPWX8Envs4Qhz9gkCBAJU_rhsWof1bYeEiMRNG_LDUl78uhTjvzHJHKE7oCXRxsy3GiOAGpPWWX9b5F2DocCX6aXcF7RTq9S-CE9naWn1rdrNKfVaD3XIEFzWtr2oY0Ra8BKoYCFHBXEjskck0tUrMDweGYN5jpeeDCmehDgEQjjz72iWnn5bkZSX0F3qC2ppAfSh50zcllWaaTNI8mItKOSABq88nu8bRiYJeQH" alt="Marco Polo" />
                              <span className="shaker-app-verified-badge"><CheckCircle size={10} fill="currentColor" className="text-[#ffb4a5]" /></span>
                            </div>
                            <h3>Marco Polo</h3>
                            <p>Senior Bartender</p>
                            <button>Profil bearbeiten</button>
                          </div>

                          {/* Stats */}
                          <div className="shaker-app-section">
                            <h4>Statistiken</h4>
                            <div className="shaker-app-stats">
                              <div className="shaker-app-stat-box box-hours">
                                <Clock size={16} />
                                <strong>142h</strong>
                                <small>Std / Monat</small>
                              </div>
                              <div className="shaker-app-stat-sub">
                                <div className="shaker-app-stat-row">
                                  <Award size={14} />
                                  <span>24 Schichten</span>
                                </div>
                                <div className="shaker-app-stat-row">
                                  <Zap size={14} />
                                  <span>98% Pünktlich</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Shifts */}
                          <div className="shaker-app-section">
                            <h4>Meine Schichten</h4>
                            <div className="shaker-app-shifts">
                              <div className="shaker-app-shift-row border-primary">
                                <div className="shaker-app-shift-date">
                                  <span>FR</span>
                                  <strong>12.</strong>
                                </div>
                                <div className="shaker-app-shift-details">
                                  <strong>Main Bar Night Shift</strong>
                                  <small>18:00 - 02:30 • Lead</small>
                                </div>
                              </div>
                              <div className="shaker-app-shift-row border-secondary">
                                <div className="shaker-app-shift-date date-secondary">
                                  <span>SA</span>
                                  <strong>13.</strong>
                                </div>
                                <div className="shaker-app-shift-details">
                                  <strong>Cocktail Terrace</strong>
                                  <small>16:00 - 00:00 • Mix</small>
                                </div>
                              </div>
                              <div className="shaker-app-shift-row border-tertiary">
                                <div className="shaker-app-shift-date date-tertiary">
                                  <span>DI</span>
                                  <strong>16.</strong>
                                </div>
                                <div className="shaker-app-shift-details">
                                  <strong>Inventory &amp; Prep</strong>
                                  <small>10:00 - 15:00 • Support</small>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quals */}
                          <div className="shaker-app-section">
                            <h4>Qualifikationen</h4>
                            <div className="shaker-app-quals">
                              <span className="qual-badge badge-primary">Mixology Expert</span>
                              <span className="qual-badge badge-secondary">First Aid</span>
                              <span className="qual-badge badge-tertiary">Lead</span>
                            </div>
                          </div>

                          {/* Docs */}
                          <div className="shaker-app-section">
                            <h4>Dokumente</h4>
                            <div className="shaker-app-docs">
                              <div className="shaker-app-doc-row">
                                <FileText size={14} />
                                <span>Arbeitsvertrag_2024.pdf</span>
                              </div>
                              <div className="shaker-app-doc-row">
                                <FileText size={14} />
                                <span>Gesundheitszeugnis.pdf</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Bottom Nav Bar */}
                      <div className="shaker-app-footer">
                        <div><span>Woche</span></div>
                        <div><span>Team</span></div>
                        <div><span>Bar</span></div>
                        <div className="active"><span>Einstellungen</span></div>
                      </div>
                    </div>
                  ) : project.previewImage ? (
                    <div className="lab-mockup-img-wrap">
                      <img src={project.previewImage} alt={project.name} className="lab-preview-img" />
                    </div>
                  ) : (
                    <div className="lab-mockup-graphic">
                      {index === 0 && (
                        <div className="mockup-ui mockup-ui-scrape">
                          <div className="mockup-header">
                            <Database size={16} className="text-accent" />
                            <span>ScrapeMaster Pro Dashboard</span>
                          </div>
                          <div className="mockup-bars">
                            <div className="mockup-bar flex-1" style={{ width: '85%' }} />
                            <div className="mockup-bar" style={{ width: '60%' }} />
                            <div className="mockup-bar" style={{ width: '75%' }} />
                          </div>
                          <div className="mockup-pills">
                            <span className="pill green">+1.420 Leads</span>
                            <span className="pill">99.4% Valid</span>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="mockup-ui mockup-ui-geo">
                          <div className="mockup-header">
                            <Sparkles size={16} className="text-accent" />
                            <span>GEO &amp; AI Search Scanner</span>
                          </div>
                          <div className="mockup-ring-row">
                            <div className="mini-ring">98%</div>
                            <div className="mini-stats">
                              <span>ChatGPT Ready</span>
                              <small>Perplexity Index 100%</small>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="lab-card-body">
              <div className="lab-card-top">
                <span className="lab-card-kicker">{project.kicker}</span>
                <span className={`lab-badge ${project.badge === 'Internal Tool' ? 'lab-badge-internal' : ''}`}>
                  {project.badge}
                </span>
              </div>

              <h3>{project.name}</h3>
              <p>{project.tagline}</p>

              <div className="lab-card-footer">
                <span className="lab-card-link">
                  Mehr erfahren <ArrowRight size={15} />
                </span>
                <span className="lab-status-dot" title={project.status}>
                  <i className={`dot-${project.statusType}`} />
                  <small>{project.status}</small>
                </span>
              </div>
            </div>
          </article>
        ))}
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
