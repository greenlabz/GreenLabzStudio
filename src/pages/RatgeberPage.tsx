import { useState } from 'react';

import { ArrowLeft, BookOpen, X } from 'lucide-react'
import { ratgeberArticles } from './ratgeberData'

interface RatgeberPageProps {
  onNavigate: (route: string) => void
}

export default function RatgeberPage({ onNavigate }: RatgeberPageProps) {
  const [activeArticle, setActiveArticle] = useState<typeof ratgeberArticles[0] | null>(null)

  return (
    <main className="ratgeber-page">
      <div className="page-header-nav">
        <button className="back-btn" onClick={() => {
          onNavigate('home')
          window.scrollTo(0, 0)
        }}>
          <ArrowLeft size={16} /> Zurück zur Startseite
        </button>
      </div>

      <section className="section ratgeber-section">
        <div className="section-head">
          <p className="section-code"><span></span> [10] Ratgeber</p>
          <h2><span className="text-accent">Wissen</span> für digitale <span className="text-accent">Sichtbarkeit</span></h2>
          <p className="section-subtitle">12 kompakte Artikel rund um SEO, GEO und smarte Websites.</p>
        </div>
        
        <div className="card-grid">
          {ratgeberArticles.map((article, idx) => (
            <article className="service-card compact-card premium-card" key={idx}>
              <div className="card-icon" aria-hidden="true"><BookOpen size={27} /></div>
              <span className="card-ghost-number" aria-hidden="true">{(idx + 1).toString().padStart(2, '0')}</span>
              <h3>{article.title}</h3>
              <p>{article.teaser}</p>
              <button 
                className="article-read-btn" 
                onClick={() => setActiveArticle(article)}
              >
                Artikel lesen
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Article Modal */}
      {activeArticle && (
        <div className="article-modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="article-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveArticle(null)}>
              <X size={24} />
            </button>
            <div className="article-modal-header">
              <div className="card-icon" aria-hidden="true"><BookOpen size={27} /></div>
              <h2>{activeArticle.title}</h2>
            </div>
            <div className="article-modal-body">
              <p className="article-teaser">{activeArticle.teaser}</p>
              <div className="article-text">
                <p>{activeArticle.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
