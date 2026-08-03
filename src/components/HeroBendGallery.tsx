import { useState } from 'react'

const showcases = [
  {
    id: 'eisenkraft',
    title: 'Eisenkraft Fitnessstudio',
    subtitle: 'High-Performance Gym & Personal Training mit Probetraining-Buchung',
    category: 'Fitness & Gesundheit',
    image: '/assets/showcases/showcase-eisenkraft.png',
    tag: 'FITNESS & GYM',
    objectPosition: 'top center',
  },
  {
    id: 'denker',
    title: 'Denker KFZ Werkstatt',
    subtitle: 'Freie Meisterwerkstatt mit digitaler Termin- & Rückmeldediagnose',
    category: 'Handwerk & KFZ-Meisterbetrieb',
    image: '/assets/showcases/showcase-denker.png',
    tag: 'KFZ & MEISTERBETRIEB',
    objectPosition: 'top center',
  },
  {
    id: 'aura',
    title: 'Aura Studio & Agency',
    subtitle: 'Interaktives B2B Brand-Experience & Creative Studio',
    category: 'Design & Agentur',
    image: '/assets/showcases/showcase-aura.png',
    tag: 'BRANDING & DESIGN',
    objectPosition: 'top center',
  },
  {
    id: 'nadine-kemmert',
    title: 'Nadine Kemmert Photography',
    subtitle: 'Million-Dollar Hochzeits- & Event-Präsenz mit Buchungssystem',
    category: 'Premium Fotografie & Events',
    image: '/assets/showcases/showcase-nadine.png',
    tag: 'HIGH-CONVERSION',
    objectPosition: 'top center',
  },
  {
    id: 'format-baukonzept',
    title: 'Format Baukonzept',
    subtitle: 'Architektur, Gewerbebau & schlüsselfertiges Bauen',
    category: 'Bauwesen & Architektur',
    image: '/assets/showcases/showcase-format.png',
    tag: 'HANDWERK & BAU',
    objectPosition: 'top center',
  },
  {
    id: 'maison-fleur',
    title: 'Maison Fleur',
    subtitle: 'Exklusives Lifestyle & Event-Floristik Concept Store',
    category: 'E-Commerce & Retail',
    image: '/assets/showcases/showcase-maison.png',
    tag: 'LUXURY BRAND',
    objectPosition: 'top center',
  },
  {
    id: 'thomas-alber',
    title: 'Thomas Alber Heizungsbau',
    subtitle: 'Sanitär, Wärmepumpen & Meisterbetrieb für Haustechnik',
    category: 'Handwerk & Haustechnik',
    image: '/assets/showcases/showcase-alber.png',
    tag: 'MEISTERBETRIEB',
    objectPosition: 'top center',
  },
  {
    id: 'mainframe',
    title: 'Mainframe Engine',
    subtitle: 'Moderne Software-Plattform & SaaS Dashboard Interface',
    category: 'Web-App & SaaS',
    image: '/assets/showcases/showcase-mainframe.png',
    tag: 'ENTERPRISE TECH',
    objectPosition: 'top center',
  },
]

export function HeroBendGallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(10deg) rotateY(0deg) scale(1)`
  }

  return (
    <section className="section hero-bend-gallery-section" data-reveal>
      <div className="section-head text-center" style={{ margin: '0 auto clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', maxWidth: '680px' }}>
        <p className="section-code" style={{ justifyContent: 'center' }}><span /> [10] DESIGN SHOWROOM</p>
        <h2>
          Einblick in <span className="section-title-serif">unsere Arbeit.</span>
        </h2>
        <p style={{ color: 'var(--muted)', marginTop: '0.8rem', fontSize: '1.05rem' }}>
          Jedes Projekt entsteht ohne Baukästen – maßgeschneidert auf das Angebot und die Zielgruppe deines Betriebs.
        </p>
      </div>

      <div className="bend-gallery-container">
        {showcases.map((item, index) => (
          <div
            key={item.id}
            className={`bend-gallery-card ${activeIndex === index ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bend-card-frame">
              {/* Browser Header Bar */}
              <div className="bend-browser-bar">
                <div className="bend-browser-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="bend-browser-url">greenlabz.studio/{item.id}</div>
              </div>

              {/* Showcase Image */}
              <div className="bend-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="bend-showcase-img"
                  style={{ objectPosition: item.objectPosition || 'top center' }}
                />
                <div className="bend-image-overlay" />
              </div>

              {/* Bottom Info Bar */}
              <div className="bend-card-caption">
                <div>
                  <span className="bend-tag">{item.tag}</span>
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
