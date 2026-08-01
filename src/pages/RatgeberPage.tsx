import { useState, useEffect } from 'react'
import { ArrowLeft, X, Clock, Tag, CheckCircle2 } from 'lucide-react'
import { ratgeberArticles, type RatgeberArticle } from './ratgeberData'

interface RatgeberPageProps {
  onNavigate: (route: string) => void
  initialArticleSlug?: string | null
}

export default function RatgeberPage({ onNavigate, initialArticleSlug }: RatgeberPageProps) {
  const [activeArticle, setActiveArticle] = useState<RatgeberArticle | null>(null)

  useEffect(() => {
    if (initialArticleSlug) {
      const found = ratgeberArticles.find(a => a.id === initialArticleSlug)
      if (found) setActiveArticle(found)
    }
  }, [initialArticleSlug])

  const openArticle = (article: RatgeberArticle) => {
    setActiveArticle(article)
    window.history.replaceState(null, '', `#ratgeber/${article.id}`)
  }

  const closeArticle = () => {
    setActiveArticle(null)
    window.history.replaceState(null, '', '#ratgeber')
  }

  return (
    <main className="ratgeber-page">
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

      <section className="section ratgeber-section">
        <div className="section-head">
          <p className="section-code"><span></span> [12] Ratgeber &amp; Know-how</p>
          <h2>
            Wissen für <span className="text-accent">digitale Sichtbarkeit</span> &amp; <span className="text-accent">KI-Erfolg</span>
          </h2>
          <p className="section-subtitle">
            Fundierte Leitfäden rund um SEO, GEO, schnelle Websites und Conversion-Optimierung.
          </p>
        </div>

        <div className="card-grid">
          {ratgeberArticles.map((article, idx) => (
            <article className="service-card compact-card premium-card ratgeber-card" key={article.id}>
              <div className="ratgeber-card-top">
                <span className="ratgeber-category-badge">{article.category}</span>
                <span className="ratgeber-time-badge"><Clock size={12} /> {article.readTime}</span>
              </div>

              <span className="card-ghost-number" aria-hidden="true">{(idx + 1).toString().padStart(2, '0')}</span>
              <h3>{article.title}</h3>
              <p>{article.teaser}</p>

              <button
                className="article-read-btn"
                onClick={() => openArticle(article)}
              >
                Ratgeber lesen
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Article Modal */}
      {activeArticle && (
        <div className="article-modal-overlay" onClick={closeArticle}>
          <div className="article-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeArticle} aria-label="Schließen">
              <X size={22} />
            </button>

            <div className="article-modal-header">
              <div className="article-meta-row">
                <span className="article-tag"><Tag size={13} /> {activeArticle.category}</span>
                <span className="article-read-time"><Clock size={13} /> {activeArticle.readTime}</span>
              </div>
              <h2>{activeArticle.title}</h2>
            </div>

            <div className="article-modal-body">
              <div className="article-intro-box">
                <p>{activeArticle.intro}</p>
              </div>

              <div className="article-sections-wrap">
                {activeArticle.sections.map((sec, i) => (
                  <div className="article-section-block" key={i}>
                    <h3>{sec.heading}</h3>
                    {sec.paragraphs.map((pText, pIdx) => (
                      <p key={pIdx}>{pText}</p>
                    ))}

                    {sec.keyTakeaways && (
                      <div className="article-takeaways-box">
                        <strong><CheckCircle2 size={16} /> Kernaussagen auf einen Blick:</strong>
                        <ul>
                          {sec.keyTakeaways.map((item, tIdx) => (
                            <li key={tIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="article-conclusion-box">
                <p><strong>{activeArticle.conclusion}</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
