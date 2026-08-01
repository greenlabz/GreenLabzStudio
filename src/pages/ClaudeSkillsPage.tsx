import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Copy, Check, Terminal, ExternalLink, Sparkles, X, ShieldCheck, Tag, Code2, Cpu } from 'lucide-react'
import { claudeSkillsData, skillsCategories, type SkillsItem } from './claudeSkillsData'

interface ClaudeSkillsPageProps {
  onNavigate: (route: string) => void
  initialSkillId?: string | null
}

export default function ClaudeSkillsPage({ onNavigate, initialSkillId }: ClaudeSkillsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeSkill, setActiveSkill] = useState<SkillsItem | null>(null)

  useEffect(() => {
    if (initialSkillId) {
      const found = claudeSkillsData.find(s => s.id === initialSkillId)
      if (found) setActiveSkill(found)
    }
  }, [initialSkillId])

  const copyCommand = (command: string, id: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation()
    navigator.clipboard.writeText(command)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2200)
  }

  const openSkillDetail = (skill: SkillsItem) => {
    setActiveSkill(skill)
    window.history.replaceState(null, '', `#skills/${skill.id}`)
  }

  const closeSkillDetail = () => {
    setActiveSkill(null)
    window.history.replaceState(null, '', '#skills')
  }

  const filteredSkills = claudeSkillsData.filter(skill => {
    const matchesCategory = selectedCategory === 'Alle' || skill.category === selectedCategory
    const matchesSearch = searchQuery.trim() === '' || 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      skill.author.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <main className="ratgeber-page claude-skills-page">
      <div className="page-header-nav">
        <button
          className="back-btn"
          onClick={() => {
            onNavigate('home')
            window.scrollTo(0, 0)
          }}
        >
          <ArrowLeft size={16} /> Zurück zur Startseite
        </button>
      </div>

      <section className="section ratgeber-section skills-hero-section">
        <div className="skills-hero-grid">
          <div className="skills-hero-copy">
            <p className="section-code"><span></span> [09] GreenLabz Open Library · 2026</p>
            <h1 className="skills-hero-title">
              Claude <span className="text-accent">Skills Library</span>
            </h1>
            <p className="skills-hero-lead">
              Die 150 meistgenutzten Agent Skills – kuratiert aus dem offenen Vercel Skills Ökosystem. Finde fertige Fähigkeiten für Claude Code, Cursor &amp; AI-Agenten.
            </p>
            <div className="skills-hero-badges">
              <span><ShieldCheck size={14} className="text-accent" /> 100% Open Source</span>
              <span><Terminal size={14} className="text-accent" /> Claude Code Ready</span>
              <span><Sparkles size={14} className="text-accent" /> 1-Klick Installation</span>
            </div>
          </div>

          {/* Interactive Graphic: How it works in 3 visual steps */}
          <div className="skills-hero-visual-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="terminal-title">claude-code / terminal workflow</span>
            </div>
            
            <div className="terminal-body">
              <div className="terminal-step">
                <span className="step-num">1</span>
                <div className="step-content">
                  <span className="step-label">Skill auswählen &amp; Befehl kopieren</span>
                  <div className="code-badge">
                    <code>npx skills add vercel-labs/skills</code>
                  </div>
                </div>
              </div>

              <div className="terminal-step active">
                <span className="step-num">2</span>
                <div className="step-content">
                  <span className="step-label">Im Terminal deines Projekts ausführen</span>
                  <div className="status-checklist">
                    <span><Check size={14} className="text-accent" /> Repository verifiziert</span>
                    <span><Check size={14} className="text-accent" /> SKILL.md automatisch geladen</span>
                  </div>
                </div>
              </div>

              <div className="terminal-step success">
                <span className="step-num">3</span>
                <div className="step-content">
                  <span className="step-label">Dein KI-Agent arbeitet sofort intelligenter</span>
                  <p className="step-note">✨ Claude nutzt die neuen Regeln &amp; Workflows automatisch bei passenden Aufgaben.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Search & Category Filter Control */}
        <div className="skills-filter-toolbar">
          <div className="skills-search-wrapper">
            <Search className="skills-search-icon" size={18} />
            <input
              type="text"
              placeholder="Skill suchen (z.B. frontend, tdd, vercel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="skills-search-input"
            />
            {searchQuery && (
              <button className="skills-search-clear" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="skills-category-tabs" role="tablist">
            {skillsCategories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`skills-cat-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="card-grid skills-grid">
          {filteredSkills.length === 0 ? (
            <div className="skills-empty-state">
              <Cpu size={36} className="text-accent" />
              <h3>Keine Agent Skills gefunden</h3>
              <p>Versuche es mit einem anderen Suchbegriff oder passe den Kategorien-Filter an.</p>
              <button className="article-read-btn" onClick={() => { setSearchQuery(''); setSelectedCategory('Alle'); }}>
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            filteredSkills.map((skill) => (
              <article 
                className="service-card compact-card premium-card skill-card" 
                key={skill.id}
                onClick={() => openSkillDetail(skill)}
              >
                <div className="ratgeber-card-top">
                  <span className="ratgeber-category-badge">{skill.category}</span>
                  <span className="skill-author-badge"><Tag size={12} /> {skill.author}</span>
                </div>

                <div className="skill-title-row">
                  <h3>{skill.name}</h3>
                  {skill.stars && <span className="skill-stars-badge">★ {skill.stars}</span>}
                </div>

                <p>{skill.description}</p>

                <div className="skill-tags-row">
                  {skill.tags.map((t, idx) => (
                    <span key={idx} className="skill-tag-pill">{t}</span>
                  ))}
                </div>

                <div className="skill-command-box" onClick={(e) => copyCommand(skill.command, skill.id, e)}>
                  <div className="skill-command-text">
                    <Terminal size={14} className="text-accent" />
                    <code>{skill.command}</code>
                  </div>
                  <button 
                    className="skill-copy-btn" 
                    title="Befehl kopieren"
                    onClick={(e) => copyCommand(skill.command, skill.id, e)}
                  >
                    {copiedId === skill.id ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Skill Modal Detail */}
      {activeSkill && (
        <div className="article-modal-overlay" onClick={closeSkillDetail}>
          <div className="article-modal-content skill-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeSkillDetail} aria-label="Schließen">
              <X size={22} />
            </button>

            <div className="article-modal-header">
              <div className="article-meta-row">
                <span className="article-tag"><Code2 size={13} /> {activeSkill.category}</span>
                <span className="article-read-time"><ShieldCheck size={13} /> Verifiziert von {activeSkill.author}</span>
              </div>
              <h2>{activeSkill.name}</h2>
            </div>

            <div className="article-modal-body">
              <div className="article-intro-box">
                <p>{activeSkill.description}</p>
              </div>

              {/* Install Box */}
              <div className="skill-modal-install-card">
                <label>Terminal Befehl zur Installation:</label>
                <div className="skill-command-box modal-command" onClick={() => copyCommand(activeSkill.command, `modal-${activeSkill.id}`)}>
                  <div className="skill-command-text">
                    <Terminal size={16} className="text-accent" />
                    <code>{activeSkill.command}</code>
                  </div>
                  <button className="skill-copy-btn">
                    {copiedId === `modal-${activeSkill.id}` ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {activeSkill.details && (
                <div className="article-sections-wrap">
                  <div className="article-section-block">
                    <h3>Anwendungsfall &amp; Nutzen</h3>
                    <p>{activeSkill.details.useCase}</p>

                    <div className="article-takeaways-box">
                      <strong><Sparkles size={16} /> Best Practices:</strong>
                      <ul>
                        {activeSkill.details.bestPractices.map((bp, i) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="article-takeaways-box rules-box">
                      <strong><ShieldCheck size={16} /> Strikte Agent-Regeln:</strong>
                      <ul>
                        {activeSkill.details.rules.map((rule, i) => (
                          <li key={i}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="skill-modal-actions">
                <a 
                  href={activeSkill.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="article-read-btn inline-btn"
                >
                  Original Quelle &amp; Doku ansehen <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
