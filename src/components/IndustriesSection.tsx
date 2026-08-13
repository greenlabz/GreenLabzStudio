import { Car, Utensils, Hammer, Zap, Stethoscope } from 'lucide-react'

const industries = [
  {
    title: 'Handwerk & Bau',
    subtitle: 'Elektrotechnik, Sanierung & Meisterbetriebe',
    kicker: 'REFERENZ · TFM MONTAGE',
    icon: Hammer,
    image: '/assets/showcases/tfm-montage.png',
    accent: '#ffb300',
  },
  {
    title: 'Gastronomie & Food',
    subtitle: 'Restaurants, Lieferservices & Street Food',
    kicker: 'REFERENZ · HAPPEN DÖNER',
    icon: Utensils,
    image: '/assets/showcases/happen-logo.png',
    accent: '#ff5722',
  },
  {
    title: 'Tiermedizin & Praxis',
    subtitle: 'Tierärzte, Hausärzte & Fachpraxen',
    kicker: 'REFERENZ · TIERARZTPRAXIS',
    icon: Stethoscope,
    image: '/assets/showcases/buss-logo.webp',
    accent: '#00cc6a',
  },
  {
    title: 'Zahnmedizin & Allgemeinmedizin',
    subtitle: 'Praxen, Vorsorge & Behandlung',
    kicker: 'REFERENZ · ADOLF ROTH',
    icon: Stethoscope,
    image: '/assets/showcases/roth-logo.png',
    accent: '#00cc6a',
  },
  {
    title: 'Energie & Beratung',
    subtitle: 'Energieberater, Effizienz & Sanierungskonzepte',
    kicker: 'REFERENZ · NEWEO ENERGIEBERATUNG',
    icon: Zap,
    image: '/assets/showcases/neweo-logo.png',
    accent: '#635bff',
  },
  {
    title: 'Automobil & KFZ',
    subtitle: 'Autohäuser, Werkstätten & Aufbereitung',
    kicker: 'REFERENZ · CAR COMPANY',
    icon: Car,
    image: '/assets/showcases/denker-logo.png',
    accent: '#4285f4',
  },
]

export function IndustriesSection() {
  return (
    <section className="section industries-section" data-reveal>
      <div className="industries-head">
        <div>
          <p className="section-code"><span /> [09] BRANCHEN &amp; ZIELGRUPPEN</p>
          <h2>
            In deiner Branche <br />
            <span className="section-title-serif">zu Hause.</span>
          </h2>
        </div>
        <p className="industries-subtext">
          Vom etablierten Handwerksbetrieb bis zum B2B-Dienstleister: Wir übersetzen dein Angebot in ein digitales Erlebnis, das deine Kunden sofort verstehen. Viele unserer erfolgreichsten Projekte stammen genau aus diesen Bereichen.
        </p>
      </div>

      <div className="industries-marquee-container" aria-label="Branchen Karussell">
        <div className="industries-marquee-track">
          {[...industries, ...industries, ...industries].map((ind, index) => {
            const Icon = ind.icon
            return (
              <article className="industry-card" key={`ind-${index}`}>
                <div className="industry-card-preview">
                  <div className="industry-icon-badge">
                    <Icon size={20} />
                  </div>
                  <div className="industry-image-wrapper">
                    <img src={ind.image} alt={ind.title} className="industry-img" width={260} height={260} loading="lazy" decoding="async" />
                  </div>
                </div>

                <div className="industry-card-body">
                  <h3>{ind.title}</h3>
                  <p>{ind.subtitle}</p>

                  <div className="industry-card-footer">
                    <span><small>■</small> {ind.kicker}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
