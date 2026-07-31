import { Car, Utensils, Hammer, Zap, Stethoscope, ArrowRight } from 'lucide-react'

const CarCompanyBadge = () => (
  <svg width="140" height="70" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 42L36 22H104L120 42H132C135 42 137 44 137 47V52H3V47C3 44 5 42 8 42H20Z" fill="rgba(255,255,255,0.06)" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="38" cy="52" r="8" fill="#0a0d0b" stroke="#4285F4" strokeWidth="3"/>
    <circle cx="102" cy="52" r="8" fill="#0a0d0b" stroke="#4285F4" strokeWidth="3"/>
    <text x="70" y="16" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="var(--mono)" textAnchor="middle" letterSpacing="3">CAR COMPANY</text>
  </svg>
)

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
    customLogo: CarCompanyBadge,
    accent: '#4285f4',
  },
]

export function IndustriesSection() {
  return (
    <section className="section industries-section" data-reveal>
      <div className="industries-head">
        <div>
          <p className="section-code"><span /> [07] BRANCHEN &amp; ZIELGRUPPEN</p>
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
                    {ind.customLogo ? (
                      <ind.customLogo />
                    ) : (
                      <img src={ind.image} alt={ind.title} className="industry-img" />
                    )}
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
