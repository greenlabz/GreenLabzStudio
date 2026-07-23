import { ArrowLeft, Smartphone } from 'lucide-react'

interface MobileViewPageProps {
  onNavigate: (route: string) => void
}

export default function MobileViewPage({ onNavigate }: MobileViewPageProps) {
  return (
    <main className="mobile-view-page">
      <div className="page-header-nav">
        <button className="back-btn" onClick={() => {
          onNavigate('home')
          window.scrollTo(0, 0)
        }}>
          <ArrowLeft size={16} /> Zurück zur Startseite
        </button>
      </div>

      <section className="section mobile-view-section">
        <div className="section-head">
          <p className="section-code"><span></span> [18] Mobile First</p>
          <h2>Warum die <span className="text-accent">Mobile Ansicht</span> so wichtig ist</h2>
          <p className="section-subtitle">Die Welt scrollt auf dem Smartphone. Deine Website muss darauf vorbereitet sein.</p>
        </div>
        
        <div className="card-grid">
          <article className="service-card compact-card premium-card">
            <div className="card-icon" aria-hidden="true"><Smartphone size={27} /></div>
            <h3>Über 80% des Traffics</h3>
            <p>Die meisten deiner potenziellen Kunden werden deine Website zum ersten Mal auf einem kleinen Bildschirm sehen. Wenn hier die Nutzererfahrung (UX) nicht stimmt, sind sie innerhalb von Sekunden wieder weg.</p>
          </article>
          
          <article className="service-card compact-card premium-card">
            <div className="card-icon" aria-hidden="true"><Smartphone size={27} /></div>
            <h3>Google Mobile-First Indexing</h3>
            <p>Google bewertet für das Ranking primär die mobile Version deiner Website. Ist diese nicht auf Performance und Lesbarkeit optimiert, wirst du bei relevanten Suchanfragen nicht gefunden.</p>
          </article>

          <article className="service-card compact-card premium-card">
            <div className="card-icon" aria-hidden="true"><Smartphone size={27} /></div>
            <h3>Usability ist Vertrauen</h3>
            <p>Schwer klickbare Buttons, zu kleine Schriften oder Layout-Verschiebungen zerstören das Vertrauen in deine Professionalität. Eine flüssige, native Mobile-Experience baut sofort Sympathie auf.</p>
          </article>
        </div>
      </section>
    </main>
  )
}
