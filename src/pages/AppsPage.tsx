import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Code, Cpu, Database, Sparkles } from 'lucide-react'
import { appProjects } from './appsData'

interface AppsPageProps {
  onNavigate: (route: string) => void
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <p className="section-code"><span /> [{number}] {label}</p>
}

export default function AppsPage({ onNavigate }: AppsPageProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
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

      <section className="section apps-hero-section">
        <div className="section-head text-center">
          <p className="section-code"><span></span> [LAB &amp; SAAS]</p>
          <h2>
            Eigene Produkte &amp; <span className="text-accent">intelligente Tools</span>
          </h2>
          <p className="section-subtitle">
            Ich baue nicht nur Websites für Kunden, sondern entwickle eigene digitale Produkte und Automatisierungen. Hier siehst du ausgewählte Systeme aus meinem eigenen Lab.
          </p>
        </div>
      </section>

      <section className="section apps-list-section">
        <div className="apps-detail-grid">
          {appProjects.map((project, index) => (
            <article className="app-detail-card premium-card" key={project.id} id={project.id}>
              <div className="app-detail-header">
                <div className="app-detail-title-wrap">
                  <span className="app-kicker">{project.kicker}</span>
                  <h3>{project.name}</h3>
                  <p className="app-tagline">{project.tagline}</p>
                </div>
                <div className="app-status-wrap">
                  <span className={`lab-badge ${project.badge === 'Internal Tool' ? 'lab-badge-internal' : ''}`}>
                    {project.badge}
                  </span>
                  <span className={`status-pill status-${project.statusType}`}>
                    <i /> {project.status}
                  </span>
                </div>
              </div>

              {/* Visual Showcase Frame */}
              <div className="app-detail-visual" aria-label={`Vorschau für ${project.name}`}>
                <div className="lab-preview-browser app-large-browser">
                  <div className="lab-preview-bar">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                    <span className="lab-preview-url">https://{project.id}.greenlabz.de</span>
                  </div>
                  <div className="lab-preview-content large-preview">
                    {project.previewImage ? (
                      <div className="lab-mockup-img-wrap full-img-wrap">
                        <img src={project.previewImage} alt={project.name} className="lab-preview-img-full" />
                      </div>
                    ) : (
                      <div className="app-mockup-full">
                        {index === 0 && (
                          <div className="mockup-screen-full mockup-scrape-screen">
                            <div className="screen-header">
                              <Database size={18} className="text-accent" />
                              <strong>ScrapeMaster Pro — Data Pipeline Engine</strong>
                            </div>
                            <div className="screen-grid">
                              <div className="screen-card">
                                <small>Extrahiert diese Woche</small>
                                <strong>14.280 Leads</strong>
                              </div>
                              <div className="screen-card">
                                <small>Genauigkeit</small>
                                <strong>99,4% Verified</strong>
                              </div>
                              <div className="screen-card">
                                <small>Export Format</small>
                                <strong>CSV / API / Webhook</strong>
                              </div>
                            </div>
                            <div className="screen-table-preview">
                              <div className="table-row head"><span>Unternehmen</span><span>Ort</span><span>E-Mail Status</span></div>
                              <div className="table-row"><span>Dr. Roth Zahnmedizin</span><span>Heilbronn</span><span className="verified">Verifiziert</span></div>
                              <div className="table-row"><span>Schuster Haustechnik</span><span>Stuttgart</span><span className="verified">Verifiziert</span></div>
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="mockup-screen-full mockup-geo-screen">
                            <div className="screen-header">
                              <Sparkles size={18} className="text-accent" />
                              <strong>GEO Engine — KI &amp; Search Auditor</strong>
                            </div>
                            <div className="screen-grid">
                              <div className="screen-card">
                                <small>Google Index Score</small>
                                <strong>100 / 100</strong>
                              </div>
                              <div className="screen-card">
                                <small>ChatGPT Readiness</small>
                                <strong>Optimal (98%)</strong>
                              </div>
                              <div className="screen-card">
                                <small>Perplexity Visibility</small>
                                <strong>Rang #1 Region Heilbronn</strong>
                              </div>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="mockup-screen-full mockup-portal-screen">
                            <div className="screen-header">
                              <Cpu size={18} className="text-accent" />
                              <strong>Bar Shift Planner — The Shaker Gastro Suite</strong>
                            </div>
                            <div className="screen-grid">
                              <div className="screen-card">
                                <small>Geplante Schichten</small>
                                <strong>48 Schichten / Woche</strong>
                              </div>
                              <div className="screen-card">
                                <small>Personalkostenquote</small>
                                <strong>24.2% (Ziel: &lt;28%)</strong>
                              </div>
                              <div className="screen-card">
                                <small>Ausfallquote</small>
                                <strong>0% (Auto-Substitute)</strong>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Case Study Breakdown Grid */}
              <div className="app-breakdown-grid">
                <div className="breakdown-box">
                  <h4>Das Problem</h4>
                  <p>{project.problem}</p>
                </div>
                <div className="breakdown-box">
                  <h4>Die Lösung</h4>
                  <p>{project.solution}</p>
                </div>
                <div className="breakdown-box highlight-box">
                  <h4>Ergebnis &amp; Nutzen</h4>
                  <p>{project.result}</p>
                </div>
              </div>

              {/* Tech Stack Footer */}
              <div className="app-detail-footer">
                <div className="tech-tags-list">
                  <span className="tags-label"><Code size={14} /> Tech Stack:</span>
                  {project.techStack.map(tech => (
                    <span className="tech-tag" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Page Bottom CTA */}
      <section className="section apps-cta-section text-center">
        <div className="apps-cta-box premium-card">
          <SectionLabel number="19" label="Eigene Idee umsetzen" />
          <h2>
            Möchtest du eine eigene <span className="text-accent">Web-App</span> oder ein <span className="section-title-serif">Tool</span> bauen lassen?
          </h2>
          <p>
            Ob komplexe Web-Anwendung, internes Kundenportal oder maßgeschneiderte Schnittstelle. Ich baue dein digitales Produkt schnell, sicher und skalierbar.
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
  )
}
