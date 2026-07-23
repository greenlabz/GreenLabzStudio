import { ArrowLeft, Image as ImageIcon } from 'lucide-react'

interface BeforeAfterPageProps {
  onNavigate: (route: string) => void
}

export default function BeforeAfterPage({ onNavigate }: BeforeAfterPageProps) {
  return (
    <main className="before-after-page">
      <div className="page-header-nav">
        <button className="back-btn" onClick={() => {
          onNavigate('home')
          window.scrollTo(0, 0)
        }}>
          <ArrowLeft size={16} /> Zurück zur Startseite
        </button>
      </div>

      <section className="section before-after-section">
        <div className="section-head">
          <p className="section-code"><span></span> [17] Vorher / Nachher</p>
          <h2>Der direkte <span className="text-accent">Vergleich</span></h2>
          <p className="section-subtitle">Erlebe die Transformation von alten Webseiten zu modernen GreenLabz-Studio-Systemen.</p>
        </div>
        
        <div className="before-after-grid">
          {/* Platzhalter für zukünftige Before/After Bilder */}
          <article className="before-after-card premium-card">
            <div className="card-icon" aria-hidden="true"><ImageIcon size={27} /></div>
            <h3>Transformation in Arbeit</h3>
            <p>Hier werden demnächst eindrucksvolle Vorher-Nachher-Vergleiche unserer Kundenprojekte veröffentlicht.</p>
          </article>
        </div>
      </section>
    </main>
  )
}
