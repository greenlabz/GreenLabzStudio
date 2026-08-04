import { ArrowRight, ArrowUpRight, Database, Sparkles } from 'lucide-react'
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
                    <div className="shaker-mockup">
                      <div className="shaker-header">
                        <div>
                          <div className="shaker-title">The Shaker</div>
                          <div className="shaker-sub">Cocktail Bar · Diese Woche</div>
                        </div>
                        <div className="shaker-avatar">JG</div>
                      </div>
                      <div className="shaker-cal">
                        <span className="shaker-cal-nav">‹</span>
                        <span className="shaker-cal-range">9. – 15. Juni 2025</span>
                        <span className="shaker-cal-nav">›</span>
                      </div>
                      <div className="shaker-days">
                        {['MO','DI','MI','DO','FR','SA'].map((d, i) => (
                          <div key={d} className={`shaker-day${i === 2 ? ' active' : ''}`}>
                            <span>{d}</span><b>{9 + i}</b>
                          </div>
                        ))}
                      </div>
                      <div className="shaker-label">MITTWOCH, 11. JUNI</div>
                      <div className="shaker-shift">
                        <span className="shaker-dot" style={{ background: '#f4a26b' }} />
                        <div className="shaker-shift-info"><strong>Opening / Prep</strong><small>14:00 – 18:00 Uhr</small></div>
                        <div className="shaker-avatars"><span>AN</span><span>LK</span><span>MR</span></div>
                      </div>
                      <div className="shaker-shift">
                        <span className="shaker-dot" style={{ background: '#e07060' }} />
                        <div className="shaker-shift-info"><strong>Dinner Rush</strong><small>18:00 – 00:00 Uhr</small></div>
                        <div className="shaker-avatars"><span>TW</span><span>AN</span></div>
                      </div>
                      <div className="shaker-shift shaker-shift-open">
                        <span className="shaker-dot" style={{ background: '#6bbfb5' }} />
                        <div className="shaker-shift-info"><strong>Late Night / Closing</strong><small>22:00 – 04:00 Uhr</small></div>
                        <span className="shaker-open-badge">1 offen</span>
                      </div>
                      <div className="shaker-add-btn">+ Schicht hinzufügen</div>
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
          <span className="cta-label">Alle Produkte &amp; Tools im Detail ansehen</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  )
}
