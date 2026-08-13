import { ArrowLeft, ArrowRight, BarChart3, Bell, Filter, MapPin, Search, Settings, Sparkles, TrendingUp } from 'lucide-react'
import { Head } from 'vite-react-ssg'
import { appProjects } from './appsData'
import { productDetailContent, type ProductDetailScene } from './productDetailData'

interface ProductDetailPageProps {
  productId: string
  onNavigate: (route: string) => void
  onBookCall: () => void
}

function ProductPhone({ scene }: { scene: ProductDetailScene }) {
  return (
    <div className={`shaker-detail-phone product-phone-${scene.visual}`} aria-label={scene.alt}>
      <div className="gl-exact-phone-bezel app-phone-frame">
        <div className="gl-exact-hardware gl-exact-hardware-left-one" />
        <div className="gl-exact-hardware gl-exact-hardware-left-two" />
        <div className="gl-exact-hardware gl-exact-hardware-right" />
        <div className="gl-exact-screen">
          <div className="gl-exact-screen-glare" />
          
          <div className="gl-exact-screen-content gl-custom-mockup-screen">
            {scene.visual === 'leadradar' ? (
              <LeadRadarScreen variant={scene.variant || 'leads'} />
            ) : (
              <img className="shaker-detail-screen" src={scene.image} alt={scene.alt} loading="lazy" decoding="async" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductBrowser({ scene, productName }: { scene: ProductDetailScene; productName: string }) {
  const isStitchImage = scene.image?.includes('-stitch-image') ?? false

  return (
    <div className={`product-detail-browser is-${scene.focus || 'full'}${isStitchImage ? ' is-stitch-image' : ''}`}>
      <div className="product-detail-browser-bar" aria-hidden="true">
        <span /><span /><span />
        <strong>{productName.toLowerCase().replace(/\s+/g, '-')}.greenlabz.app</strong>
      </div>
      <div className="product-detail-browser-viewport">
        <img src={scene.image} alt={scene.alt} loading="lazy" decoding="async" />
      </div>
    </div>
  )
}

const leadCards = [
  ['Zahnarztpraxis Dr. Stein', 'München', 'Audit: Mangelhaft', 'Keine mobile Website und abgelaufenes SSL-Zertifikat.'],
  ['Kreativ Malerbetrieb GbR', 'Stuttgart', 'GBP: Fehlt', 'Kein gepflegtes Google Business Profile vorhanden.'],
  ['Restaurant Bella Vista', 'Heilbronn', '3,2 Sterne', 'Zwölf unbeantwortete Rezensionen in 30 Tagen.'],
]

function LeadRadarScreen({ variant }: { variant: 'leads' | 'stats' | 'filters' }) {
  return (
    <div className="leadradar-mockup-app leadradar-detail-app">
      <div className="leadradar-app-header">
        <div className="leadradar-header-left"><div className="leadradar-pulse-dot" /><span className="leadradar-logo-text">LeadRadar</span></div>
        <div className="leadradar-header-actions"><span className="leadradar-badge-live">LIVE SCAN</span><Bell size={14} className="leadradar-bell-icon" /></div>
      </div>
      <div className="leadradar-stats-banner">
        <div className="leadradar-stat-item"><small>REGION</small><strong>DACH</strong></div>
        <div className="leadradar-stat-item"><small>GEFUNDEN</small><strong>482</strong></div>
        <div className="leadradar-stat-item"><small>HEUTE</small><strong>+18</strong></div>
      </div>

      <div className="leadradar-detail-body">
        {variant === 'stats' ? (
          <div className="leadradar-detail-stats">
            <p>LEAD-ENTWICKLUNG</p>
            <strong>+27 %</strong>
            <div className="leadradar-detail-bars" aria-hidden="true">{[38, 55, 46, 72, 64, 88].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
            <div className="leadradar-detail-signal"><BarChart3 size={16} /><span><b>186</b> qualifizierte Signale</span></div>
            <div className="leadradar-detail-signal"><TrendingUp size={16} /><span><b>54</b> neue Betriebe diese Woche</span></div>
          </div>
        ) : variant === 'filters' ? (
          <div className="leadradar-detail-filter-panel">
            <div className="leadradar-detail-search"><Search size={13} /><span>Branche oder Ort</span></div>
            <p>AKTIVE FILTER</p>
            <div className="leadradar-detail-chips"><span>DACH</span><span>Zahnärzte</span><span>Score &lt; 60</span><span>Neue Signale</span></div>
            <div className="leadradar-detail-result"><Filter size={15} /><strong>42 passende Betriebe</strong></div>
            <div className="leadradar-card"><div className="leadradar-card-title-group"><h6>Zahnarztpraxis Dr. Stein</h6><div className="leadradar-meta-row"><MapPin size={10} /><small>München</small></div></div><p className="leadradar-card-desc">Hohe Priorität · drei relevante Signale</p></div>
          </div>
        ) : (
          <div className="leadradar-detail-leads">
            {leadCards.map(([name, city, score, description]) => (
              <div className="leadradar-card" key={name}>
                <div className="leadradar-card-header"><div className="leadradar-card-title-group"><h6>{name}</h6><div className="leadradar-meta-row"><MapPin size={10} /><small>{city}</small></div></div><span className="leadradar-score-badge red">{score}</span></div>
                <p className="leadradar-card-desc">{description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="leadradar-app-footer">
        <div className={variant === 'leads' ? 'active' : ''}><Sparkles size={16} /><span>Leads</span></div>
        <div className={variant === 'stats' ? 'active' : ''}><TrendingUp size={16} /><span>Stats</span></div>
        <div className={variant === 'filters' ? 'active' : ''}><Filter size={16} /><span>Filter</span></div>
        <div><Settings size={16} /><span>Optionen</span></div>
      </div>
    </div>
  )
}

export default function ProductDetailPage({ productId, onNavigate, onBookCall }: ProductDetailPageProps) {
  const product = appProjects.find((entry) => entry.id === productId)
  const detail = productDetailContent[productId]

  if (!product || !detail) {
    return (
      <main className="shaker-detail-page product-detail-page product-detail-missing">
        <button className="shaker-detail-back" type="button" onClick={() => onNavigate('apps')}><ArrowLeft size={17} /> Zurück zu Apps &amp; Tools</button>
        <h1>Produkt nicht gefunden.</h1>
      </main>
    )
  }

  const hasBrowserScenes = detail.scenes.some((scene) => scene.visual === 'browser')

  return (
    <>
      <Head>
        <title>{product.name} | GreenLabz Apps &amp; Systeme</title>
        <meta name="description" content={detail.lead} />
      </Head>
      <main className={`shaker-detail-page product-detail-page${hasBrowserScenes ? ' is-browser-product' : ''}`} id="top">
        <section className="shaker-detail-hero">
          <button className="shaker-detail-back" type="button" onClick={() => onNavigate('home#lab')}><ArrowLeft size={17} /> Zurück zur Hauptseite</button>
          <div className="shaker-detail-hero-copy">
            <p className="shaker-detail-kicker">{product.name} · {product.kicker}</p>
            <h1>{detail.heroTitle.map((part, index) => part.highlight ? <span className="shaker-detail-highlight" key={index}>{part.text}</span> : part.text)}</h1>
            <p className="shaker-detail-lead">{detail.lead}</p>
            <div className="product-detail-meta" aria-label={`${product.name} Produktinformationen`}>
              <span>{product.badge}</span><span>{product.status}</span>{product.techStack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </div>
        </section>

        <div className="shaker-detail-flow">
          {detail.scenes.map((scene, index) => (
            <section className={`shaker-detail-row${index % 2 ? ' is-reversed' : ''}${scene.visual === 'browser' ? ' has-browser' : ''}`} key={`${scene.label}-${index}`}>
              <div className="shaker-detail-visual">
                {scene.visual === 'browser' ? <ProductBrowser scene={scene} productName={product.name} /> : <ProductPhone scene={scene} />}
              </div>
              <div className="shaker-detail-copy"><p>{scene.label}</p><h2>{scene.title}</h2><p>{scene.text}</p></div>
            </section>
          ))}
        </div>

        <section className="shaker-detail-cta">
          <div className="shaker-detail-cta-copy"><p>Dein nächster Schritt</p><h2>{typeof detail.ctaTitle === 'string' ? detail.ctaTitle : detail.ctaTitle.map((part, index) => part.highlight ? <span className="shaker-detail-highlight" key={index}>{part.text}</span> : part.text)}</h2></div>
          <button className="btn primary shaker-detail-booking" type="button" onClick={onBookCall}>
            <span className="cta-label">Unverbindliches Erstgespräch</span><span className="cta-dots" aria-hidden="true" /><ArrowRight size={19} aria-hidden="true" />
          </button>
        </section>
      </main>
    </>
  )
}
