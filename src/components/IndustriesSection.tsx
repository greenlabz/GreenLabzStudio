import { Car, Utensils, Hammer, Building2, Stethoscope, ArrowRight } from 'lucide-react'

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
    title: 'Gesundheit & Praxis',
    subtitle: 'Tierärzte, Hausärzte & Fachpraxen',
    kicker: 'REFERENZ · TIERARZTPRAXIS',
    icon: Stethoscope,
    image: '/assets/showcases/buss-logo.png',
    accent: '#00cc6a',
  },
  {
    title: 'B2B & Dienstleistung',
    subtitle: 'Agenturen, Kanzleien & Beratung',
    kicker: 'REFERENZ · NEWEO DIGITAL',
    icon: Building2,
    image: '/assets/showcases/neweo-logo.png',
    accent: '#635bff',
  },
  {
    title: 'Automobil & KFZ',
    subtitle: 'Autohäuser, Werkstätten & Aufbereitung',
    kicker: 'REFERENZ · CAR COMPANY',
    icon: Car,
    image: '/assets/iphone-screen-reference.jpg',
    accent: '#4285f4',
  },
]

export function IndustriesSection() {
  return (
    <section className="section industries-section" data-reveal>
      <div className="industries-head">
        <div>
          <div className="section-label"><span>07</span>BRANCHEN & ZIELGRUPPEN</div>
          <h2>
            In deiner Branche <br />
            <span className="section-title-serif">zu Hause.</span>
          </h2>
        </div>
        <p className="industries-subtext">
          Vom etablierten Handwerksbetrieb bis zum B2B-Dienstleister: Wir übersetzen dein Angebot in ein digitales Erlebnis, das deine Kunden sofort versteht. Viele unserer erfolgreichsten Projekte stammen genau aus diesen Bereichen.
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
                    <img src={ind.image} alt={ind.title} className="industry-img" />
                  </div>
                </div>

                <div className="industry-card-body">
                  <h3>{ind.title}</h3>
                  <p>{ind.subtitle}</p>

                  <div className="industry-card-footer">
                    <span><small>■</small> {ind.kicker}</span>
                    <ArrowRight size={16} />
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
