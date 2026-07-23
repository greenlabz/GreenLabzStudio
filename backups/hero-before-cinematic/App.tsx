import { type CSSProperties, useEffect, useRef, useState } from 'react'
import Cal, { getCalApi } from "@calcom/embed-react"
import { ContactModal } from './ContactModal'
import RatgeberPage from './pages/RatgeberPage'
import IPhoneModel from './components/IPhoneModel'
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Check,
  CircleHelp,
  Code,
  Gauge,
  Hourglass,
  Menu,
  PanelTop,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  UserX,
  Zap,
  SearchX,
  TrendingDown,
  Mail,
  MessageCircle,
  Handshake,
  ScanSearch,
  Ban,
  Search, Settings2, CheckCircle2, Shield, MousePointer2, Bot, Building2
, Smartphone} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const logoSrc = '/assets/greenlabz-studio-logo.svg'
const leadMagnetEndpoint = 'https://formsubmit.co/ajax/hello@greenlabz-studio.de'
const leadMagnetFile = '/downloads/greenlabz-website-checkliste.pdf'

const cardIcons = {
  browser: PanelTop,
  hourglass: Hourglass,
  question: CircleHelp,
  receipt: ReceiptText,
  userX: UserX,
  searchX: SearchX,
  gauge: Gauge,
  trophy: Trophy,
  repeat: TrendingUp,
  down: TrendingDown,
  spark: Sparkles,
  zap: Zap,
  trend: TrendingUp,
  shield: ShieldCheck,
  code: Code,
  smartphone: Smartphone,
}

type Discipline = [string, string, string, string[], keyof typeof cardIcons, string]
type PricingPackage = [string, string, string, string[]]
type PricingAddOn = [string, string, string, string, string]

const agitation = [
  ['01', 'Jede dritte Anfrage geht verloren', 'Bevor sie überhaupt bei dir ankommt. Langsame Ladezeit, unklare Navigation – der Kunde ist weg, bevor er anruft.', 'gauge'],
  ['02', 'Deine Konkurrenz zahlt nichts dafür', 'Sie taucht einfach vor dir bei Google auf. Kostenlos, weil du es ihr überlässt.', 'trophy'],
  ['03', 'Ein Kunde heute ist zehn Jahre Umsatz', 'Bei Stammkunden verlierst du nicht einen Auftrag, du verlierst alles, was danach gekommen wäre.', 'repeat'],
  ['04', 'Dein schlechtester Monat wird zum Normalzustand', 'Was heute nur nach einem schwachen Monat aussieht, kann zum Dauerzustand werden, wenn du nichts änderst.', 'down'],
]

const problemCards = [
  ['01', '„Meine Website ist doch okay so...“', 'Du weißt es selbst besser. Sie sieht aus wie 2015, und jeder, der sie sieht, weiß es auch.', 'browser'],
  ['02', '„Ich hab einfach keine Zeit dafür.“', 'Seit wie vielen Jahren sagst du dir das schon? Die Website wartet nicht auf dich.', 'hourglass'],
  ['03', '„Was, wenn ich’s falsch mache?“', 'Lieber gar nichts tun, als etwas falsch zu machen. Nur nichts tun ist längst die falsche Entscheidung.', 'question'],
  ['04', '„Bringt das überhaupt was?“', 'Du hast schon einmal Geld verbrannt, ohne Ergebnis. Die Angst sitzt tiefer als du zugibst.', 'receipt'],
  ['05', '„Ein paar Anfragen weniger, kein Drama.“', 'Doch jede Anfrage, die bei der Konkurrenz landet, ist ein Kunde, den du nie wieder siehst.', 'userX'],
  ['06', '„Die Kunden kommen schon noch.“', 'Woher? Sie googeln, finden dich nicht, und geben ihr Geld genau dort aus, wo sie stattdessen landen.', 'searchX'],
]

const solutionSteps: [string, string, string[]][] = [
  ['01/04', 'Klarheit', ['Angebot sortieren', 'Zielkunden verstehen', 'Anfragen-Ziel festlegen']],
  ['02/04', 'Auftritt', ['Mobile-first Design', 'Texte ohne Agentur-Blabla', 'Bilder sinnvoll führen']],
  ['03/04', 'Sichtbarkeit', ['SEO-Grundlage', 'Google-Struktur', 'KI-Suche / GEO vorbereiten']],
  ['04/04', 'Begleitung', ['Launch', 'Tracking', 'Monatliche Pflege', 'Nächste Schritte']],
]

void solutionSteps

const DisciplineAnimation = ({ motion }: { motion: string }) => {
  if (motion === 'layout') {
    return (
      <div className="custom-anim-layout">
        <div className="anim-layout-window">
          <div className="anim-layout-header">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="anim-layout-body">
            <div className="anim-layout-sidebar"></div>
            <div className="anim-layout-content">
              <div className="anim-layout-line"></div>
              <div className="anim-layout-line short"></div>
              <div className="anim-layout-box"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (motion === 'search') {
    return (
      <div className="custom-anim-search">
        <div className="anim-search-bar">
          <Search size={32} color="rgba(255,255,255,0.4)" />
          <div className="anim-search-line"></div>
        </div>
        <div className="anim-search-results">
          <div className="anim-search-item top-result">
             <div className="sr-avatar"></div>
             <div className="sr-lines">
               <div className="sr-line title"></div>
               <div className="sr-line sub"></div>
             </div>
          </div>
          <div className="anim-search-item"></div>
          <div className="anim-search-item"></div>
        </div>
      </div>
    );
  }
  if (motion === 'ai') {
    return (
      <div className="custom-anim-ai">
        <div className="anim-ai-bot">
          <Bot size={48} color="var(--accent)" strokeWidth={1.5} />
        </div>
        <div className="anim-ai-beam"></div>
        <div className="anim-ai-target">
          <Building2 size={48} color="white" strokeWidth={1.5} className="target-icon" />
          <div className="anim-ai-lock"></div>
        </div>
      </div>
    );
  }
  if (motion === 'automation') {
    return (
      <div className="custom-anim-automation">
        <div className="anim-auto-path"></div>
        <div className="anim-auto-node node-1"><Settings2 size={24} /></div>
        <div className="anim-auto-node node-2"><Zap size={24} /></div>
        <div className="anim-auto-node node-3"><CheckCircle2 size={24} /></div>
      </div>
    );
  }
  if (motion === 'conversion') {
    return (
      <div className="custom-anim-conversion">
        <div className="anim-conv-chart">
          <div className="anim-conv-bar b1"></div>
          <div className="anim-conv-bar b2"></div>
          <div className="anim-conv-bar b3"></div>
          <div className="anim-conv-bar b4 highlight"></div>
        </div>
        <div className="anim-conv-arrow">
          <TrendingUp size={36} />
        </div>
        <div className="anim-conv-pointer">
          <MousePointer2 size={28} />
        </div>
      </div>
    );
  }
  if (motion === 'system') {
    return (
      <div className="custom-anim-system">
        <div className="anim-sys-shield">
          <Shield size={72} strokeWidth={1.5} />
        </div>
        <div className="anim-sys-scanline"></div>
        <div className="anim-sys-check">
          <Check size={36} strokeWidth={3} />
        </div>
      </div>
    );
  }
  return null;
};

const disciplines: Discipline[] = [
  ['01', 'Premium Webdesign', 'Konversionsstarke Websites, Landingpages & Online-Shops.', ['Verkaufspsychologisches Design', 'Blitzschnelle Ladezeiten', 'Mobile-first, gemacht fürs Handy'], 'browser', 'layout'],
  ['02', 'Google-Sichtbarkeit', 'Gefunden werden, wenn Kunden nach dir suchen - in deiner Region und im DACH-Raum.', ['Google Unternehmensprofil', 'Regionale Landingpages', 'Search Console Einrichtung'], 'searchX', 'search'],
  ['03', 'KI-Sichtbarkeit', 'Gefunden und empfohlen werden von ChatGPT, Perplexity & Co.', ['Fit für KI-Suchen', 'Strukturierte Inhalte', 'Häufige Fragen optimal beantwortet'], 'spark', 'ai'],
  ['04', 'KI & Automatisierung', 'Smarte Prozesse, die dir Zeit und Nerven sparen.', ['Automatisierte Kundenanfragen', 'Smarte Terminbuchung', 'E-Mail & CRM-Anbindung'], 'zap', 'automation'],
  ['05', 'Verkaufs-Optimierung', 'Mehr Anfragen aus deinen bestehenden Website-Besuchern.', ['Besucher-Analyse', 'Klare CTA-Systeme', 'Nutzerführung leicht gemacht'], 'trend', 'conversion'],
  ['06', 'Wartungsfreie Systeme', 'Saubere Technik, um die du dich nicht kümmern musst.', ['Absolute Hacker-Sicherheit', 'Keine nervigen Plugin-Updates', 'Einfaches Ändern von Texten'], 'shield', 'system'],
]

const searchShift = [
  ['Früher', 'Nur Google-Ranking zählte', 'Jetzt', 'Auch KI-Assistenten empfehlen dich – oder eben nicht'],
  ['Früher', 'Keywords einbauen reichte', 'Jetzt', 'Klare Inhalte, die eine KI korrekt zusammenfassen kann'],
  ['Früher', 'Einmal optimieren, fertig', 'Jetzt', 'Laufende Anpassung, weil sich Suche ständig verändert'],
]

const results = [
  { stat: '+37%', text: 'mehr Anfragen durchschnittlich' },
  { stat: '2x', text: 'mehr Sichtbarkeit bei Google' },
  { stat: 'Platz 1', text: 'bei Google Maps für relevante Suchbegriffe' },
  { stat: '50+', text: 'erfolgreiche Projekte in verschiedensten Branchen' }
]

const cases = [
  ['01', 'Neweo Energy Studio', 'Relaunch / Local SEO', 'Showcase-Platzhalter', '/cases/neweo.png', 'Energy', 'https://neweo.de/', 'center'],
  ['02', 'Tierarzt Dr. Buss', 'Website / Local SEO', 'Showcase-Platzhalter', '/cases/buss.png', 'Vet', 'https://www.xn--tierarztpraxis-mckmhl-wec5l.de/', 'center'],
  ['03', 'Happen Streetfood', 'Landingpage / Google Ads', 'Showcase-Platzhalter', '/cases/happen.png', 'Food', 'https://happen.food/', 'top center'],
  ['04', 'TFM Montage', 'Website / Sichtbarkeit', 'Showcase-Platzhalter', '/cases/tfm.png', 'Montage', 'https://www.tf-m.de/', 'top center'],
  ['05', 'Zahnarzt A. Roth', 'Website / Local SEO', '+43% mehr Terminanfragen', '/cases/roth.png', 'Zahnarzt', 'https://zahnaerzte-roth.de/', 'top center'],
]

const pricingPackages: PricingPackage[] = [
  ['Starter', 'Die professionelle Grundlage für deinen Webauftritt', '599 EUR', ['Mobiles Premium-Design', 'Basis Google SEO-Setup', 'DSGVO-konforme Umsetzung', 'Optimierte Ladezeiten']],
  ['Relaunch', 'Deine bestehende Website wird zum klaren Vertriebskanal', 'ab 1.490 EUR', ['Analyse der aktuellen Seite', 'Neue Struktur und Texte', 'Premium Redesign ohne Ranking-Verlust', 'Google Search Console Integration', 'KI-Suchmaschinen-Grundlage']],
  ['Premium', 'High-End Strategie & Automatisierung', 'ab 2.990 EUR', ['Alles aus Relaunch, plus', 'Individuelles High-End Webdesign', 'Lead-Funnel & Automationen', 'Google Search Console & laufende SEO', 'KI-Suchmaschinen-Optimierung']],
]

const pricingAddOns: PricingAddOn[] = [
  ['Dein Erfolg ist kein einmal Projekt', 'Google findet dich ständig. Ich halte dich oben.', 'SEO- & Website-Begleitung', 'ab 99 EUR mtl.', 'Ich übernehme nach dem Launch Wartung, Sicherheitsupdates und optimiere deine Rankings kontinuierlich weiter.'],
  ['Software & App Entwicklung', 'Deine Vision als digitale Lösung', 'Maßgeschneiderte Plattformen', 'auf Anfrage', 'Ich baue nicht nur Websites, sondern komplette Web-Apps, mobile Apps und individuelle Softwarelösungen.'],
]

const techReferences = [
  ['Next.js 16', 'Production Framework powering every GreenLabz Studio site.', 'https://nextjs.org'],
  ['React 19', 'UI library that keeps interfaces fast and modular.', 'https://react.dev'],
  ['Vercel', 'Default deployment platform with global CDN and fast previews.', 'https://vercel.com'],
  ['TypeScript', 'Type-safe codebase for reliable, maintainable projects.', 'https://www.typescriptlang.org'],
  ['Core Web Vitals', 'Google performance standards for speed and user experience.', 'https://web.dev/vitals'],
  ['Schema.org', 'Structured data foundation for Google and AI search systems.', 'https://schema.org'],
  ['/llms-full.txt', 'Machine-readable reference layer for AI assistant visibility.', 'https://llmstxt.org'],
]

const promises = [
  ['100% individuell, keine Templates', 'Ich nutze keine billigen WordPress-Baukästen. Jedes Projekt wird von Grund auf mit modernsten Technologien und effizienten KI-Workflows maßgeschneidert entwickelt.', 'code'],
  ['Mobile-First, ohne Kompromisse', 'Über die Hälfte deiner Besucher kommt vom Handy. Deshalb entwickle ich zuerst für den kleinsten Bildschirm, nicht als nachträgliche Anpassung einer Desktop-Seite.', 'smartphone'],
  ['Kompromisslose Performance', 'Ladezeiten unter einer Sekunde. Das freut nicht nur deine Besucher, sondern wird auch von Google mit massiv besseren Rankings (SEO) belohnt.', 'zap'],
  ['Conversion als oberstes Ziel', 'Eine Website muss nicht nur gut aussehen, sie muss Anfragen generieren. Jedes Design-Element ist psychologisch darauf ausgerichtet, Besucher in Kunden zu verwandeln.', 'trend'],
]

const featuredCase = {
  label: 'Case Study / Platzhalter',
  title: 'Wie eine Praxis aus Besuchern mehr Terminanfragen macht',
  intro: 'Die alte Website war fachlich korrekt, aber sie beantwortete die wichtigste Frage nicht schnell genug: Warum sollte ich genau hier einen Termin buchen?',
  outcome: '+43% mehr Terminanfragen',
  before: 'Unklare Startseite, kein klarer nächster Schritt',
  after: 'Vertrauensaufbau, Leistungen und Termin-CTA in einer mobilen Führung',
}

const methods: [string, string, string, string[]][] = [
  ['01', 'Strategie', 'Wir klären zuerst, wer kaufen soll, welches Angebot zählt und welche Handlung die Website auslösen muss.', ['Zielgruppe und Angebot', 'Conversion-Ziel', 'Seitenstruktur ohne Umwege']],
  ['02', 'Design', 'Dein Auftritt bekommt eine klare visuelle Hierarchie, die Vertrauen schafft und Besucher sicher zur nächsten Entscheidung führt.', ['Mobile-first Interface', 'Markengerechte Gestaltung', 'Klarer CTA-Fokus']],
  ['03', 'Content', 'Deine Texte zeigen klar, was du anbietest, für wen es gedacht ist und was der nächste Schritt ist. So verstehen deine Kunden dein Angebot sofort - und Google kann dich besser einordnen.', ['Nutzen statt Floskeln', 'SEO- und GEO-Struktur', 'Vertrauensaufbau']],
  ['04', 'Entwicklung', 'Ich setze das System schnell, stabil und wartbar um. Nach dem Launch bleibt die technische Basis bereit für Wachstum.', ['Performance und Sicherheit', 'Tracking und Übergabe', 'Begleitung nach dem Launch']],
]

const guides = [
  ['Website-Relaunch ohne Risiko', 'Woran du erkennst, ob deine aktuelle Seite Anfragen verhindert und wie ein Relaunch sauber geplant wird.'],
  ['SEO für lokale Betriebe', 'Welche Grundlagen wirklich zählen, bevor man Geld in Ads, Tools oder große Content-Pläne steckt.'],
]

const objections = [
  ['Was kostet eine neue Website?', 'Eine solide Website startet bei 599 EUR. Ein Relaunch startet ab 1.490 EUR, Premium-Projekte ab 2.990 EUR. Du bekommst vor dem Start eine klare Einschätzung ohne Preisnebel.'],
  ['Arbeitest du nur lokal oder auch in ganz Deutschland?', 'Ich arbeite im kompletten DACH-Raum. Local SEO setze ich dort ein, wo regionale Nachfrage wichtig ist - zum Beispiel bei Praxen und Handwerksbetrieben. Für andere Unternehmen erweitere ich die Sichtbarkeit bundesweit oder international.'],
  ['Wie läuft unsere Zusammenarbeit ab?', 'Wir klären Ziel, Angebot und Zielgruppe, danach entstehen Struktur, Texte, Design, technische Umsetzung und Launch in klaren Schritten.'],
  ['Wie lange dauert es, bis meine Seite fertig ist?', 'Kleine Seiten können schnell stehen. Umfangreichere Relaunches brauchen mehr Abstimmung. Wichtig ist: du bekommst einen realistischen Zeitplan vor Projektstart.'],
  ['Ich verstehe nichts von Technik. Ist das schlimm?', 'Nein. Du musst keine Tools, Plugins oder Fachbegriffe verstehen. Ich erkläre nur, was für deine Entscheidung wichtig ist.'],
  ['Was bedeutet SEO und warum ist das wichtig?', 'SEO sorgt dafür, dass Kunden dich bei Google und KI-Suchmaschinen finden. Bei GreenLabz Studio wird die Struktur von Anfang an so gebaut, dass Sichtbarkeit später nicht nachträglich angeflickt werden muss.'],
  ['Baust du auch Seiten für kleine Betriebe und Selbstständige?', 'Ja. Genau dafür ist GreenLabz gedacht: Praxen, Handwerk, lokale Dienstleister und inhabergeführte Betriebe, die online seriös wirken und Anfragen gewinnen wollen. Gleichzeitig stellen aber auch komplexere Aufgaben und langfristige Betreuungen keine Hürde dar.'],
  ['Muss ich Texte und Bilder selbst mitbringen?', 'Nicht komplett. Vorhandenes Material hilft, aber Struktur, Text-Richtung und Bildlogik kann ich mit dir entwickeln.'],
  ['Was passiert, wenn die Seite fertig ist? Hilfst du mir danach noch?', 'Ja. Nach Livegang überwache ich das Projekt noch 1 Woche lang intensiv, um sicherzustellen, dass alles reibungslos läuft. Auf Wunsch begleite ich dich danach auch monatlich bei Website, SEO, Google und laufender Optimierung.'],
]

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <img
      className={`brand-logo ${className}`}
      src={logoSrc}
      alt="GreenLabz Studio"
      loading="eager"
      decoding="async"
    />
  )
}

function PrimaryCta({ children, href, onClick }: { children: string; href?: string; onClick?: () => void }) {
  if (onClick) {
    return (
      <button className="btn primary" onClick={onClick} style={{ cursor: 'pointer' }}>
        <span className="cta-label">{children}</span>
        <span className="cta-dots" aria-hidden="true" />
        <ArrowRight size={19} />
      </button>
    )
  }
  return (
    <a className="btn primary" href={href || '#calendar'}>
      <span className="cta-label">{children}</span>
      <span className="cta-dots" aria-hidden="true" />
      <ArrowRight size={19} />
    </a>
  )
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <p className="section-code"><span /> [{number}] {label}</p>
}

function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [route, setRoute] = useState(() => window.location.hash === '#ratgeber' ? 'ratgeber' : 'home')
  const [activeMethod, setActiveMethod] = useState(0)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadConsent, setLeadConsent] = useState(false)
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const navigate = (nextRoute: string) => {
    setRoute(nextRoute)
    window.history.pushState(null, '', nextRoute === 'home' ? '#top' : `#${nextRoute}`)
    window.scrollTo(0, 0)
  }

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!leadConsent) return
    setLeadStatus('sending')

    try {
      const response = await fetch(leadMagnetEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      })
      if (!response.ok) throw new Error('Anfrage konnte nicht gesendet werden.')
      setLeadStatus('success')
      const download = document.createElement('a')
      download.href = leadMagnetFile
      download.download = 'greenlabz-website-checkliste.pdf'
      document.body.appendChild(download)
      download.click()
      download.remove()
    } catch {
      setLeadStatus('error')
    }
  }
    
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"discoverycall"});
      // @ts-ignore
      cal("ui", {"hideEventTypeDetails":false,"hideBranding":true,"layout":"month_view","theme":"dark"});
    })();
  }, []);

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis: Lenis | undefined
    let rafId = 0
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 })
      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
      lenis.on('scroll', ScrollTrigger.update)
    }

    const ctx = gsap.context(() => {
      if (reduce) return

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.site-nav', { y: -24, opacity: 0, duration: 0.75 })
        .from('.hero-label, .hero-title .line, .hero-copy p, .hero-actions, .metrics', {
          y: 46,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
        }, '-=0.25')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.from('.discipline-card', {
        y: 120,
        opacity: 0,
        scale: 0.96,
        filter: 'blur(18px)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.discipline-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      if (window.matchMedia('(max-width: 760px)').matches) {
        gsap.utils.toArray<HTMLElement>('.problem-card').forEach((card) => {
          gsap.from(card, {
            y: 92,
            opacity: 0,
            scale: 0.96,
            filter: 'blur(14px)',
            duration: 0.78,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          })

          ScrollTrigger.create({
            trigger: card,
            start: 'top 68%',
            end: 'bottom 34%',
            toggleClass: { targets: card, className: 'is-scroll-active' },
          })
        })

        gsap.utils.toArray<HTMLElement>('.work-row').forEach((card) => {
          gsap.from(card, {
            y: 56,
            opacity: 0,
            scale: 0.985,
            filter: 'blur(8px)',
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          })
        })
      }

    }, root)

    return () => {
      ctx.revert()
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="page" ref={rootRef}>
      <header className="site-nav">
        <a className="logo" href="#top" aria-label="GreenLabz Studio Start" onClick={(event) => { event.preventDefault(); navigate('home') }}>
          <LogoMark />
        </a>

        <a className="nav-cta" href="#calendar" onClick={(event) => { event.preventDefault(); setIsContactModalOpen(true) }}>
          <span className="cta-dots" aria-hidden="true" />
          <span className="cta-label nav-cta-label-full">Kostenfreie Analyse sichern</span>
          <span className="cta-label nav-cta-label-short">Analyse sichern</span>
          <ArrowRight size={16} />
        </a>
        <button className="menu" type="button" aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
          <LogoMark className="menu-logo" />
          {isMenuOpen ? <span className="menu-close-mark" aria-hidden="true">×</span> : <Menu size={19} />}
        </button>
      </header>
      {isMenuOpen && (
        <nav className="menu-panel" aria-label="Hauptnavigation">
          <div className="menu-panel-head"><span>[00] NAVIGATION</span><span>GreenLabz Studio</span></div>
          <div className="menu-links">
            <a href="#top" onClick={() => setIsMenuOpen(false)}><span>01</span>Startseite<ArrowUpRight size={17} /></a>
            <a href="#cases" onClick={() => setIsMenuOpen(false)}><span>02</span>Projekte &amp; Ergebnisse<ArrowUpRight size={17} /></a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}><span>03</span>Leistungen<ArrowUpRight size={17} /></a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}><span>04</span>Investition<ArrowUpRight size={17} /></a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}><span>05</span>Fragen &amp; Antworten<ArrowUpRight size={17} /></a>
            <a href="#calendar" onClick={() => setIsMenuOpen(false)}><span>06</span>Analyse sichern<ArrowUpRight size={17} /></a>
            <a href="#ratgeber" onClick={(event) => { event.preventDefault(); setIsMenuOpen(false); navigate('ratgeber') }}><span>07</span>Ratgeber<ArrowUpRight size={17} /></a>
          </div>
        </nav>
      )}
      {route === 'ratgeber' ? (
        <RatgeberPage onNavigate={navigate} />
      ) : (
<main>
        <section className="hero-section" id="top">
          <div className="hero-copy">
            <SectionLabel number="01" label="Webdesign für inhabergeführte Betriebe" />
            <h1 className="hero-title" aria-label="Umsatzstarke Websites und Individualsoftware, die deine Marke digital dominieren lassen.">
              <span className="line">Umsatzstarke</span>
              <span className="line"><span className="hero-highlight">Websites</span> &amp;</span>
              <span className="line">Software</span>
              <span className="line"><span className="hero-highlight">die verkaufen.</span></span>
            </h1>
            <p>
              Wir entwickeln ultraschnelle Websites und digitale Systeme, die Besucher in qualifizierte
              Anfragen verwandeln. Direkt umgesetzt - als Website oder Web-App, nicht als einfache Standard-Website. Ab 599 EUR Festpreis.
            </p>
            <p className="hero-audience">Für Zahnarztpraxen, Handwerksbetriebe, Physiotherapeuten, Heilpraktiker und Unternehmen, bei denen Vertrauen den Unterschied macht.</p>
            <div className="hero-actions">
              <PrimaryCta onClick={() => setIsContactModalOpen(true)}>Kostenfreie Analyse sichern</PrimaryCta>
              <a className="btn secondary" href="#cases"><span className="cta-dot" /><span className="cta-label">Projekte ansehen</span></a>
            </div>
            <div className="metrics" aria-label="GreenLabz Nutzen">
              <div><Handshake className="metric-icon metric-icon-one" size={17} /><strong>1:1</strong><span>Direkt mit mir</span></div>
              <div><ScanSearch className="metric-icon metric-icon-search" size={17} /><strong>SEO</strong><span>Google & KI-Suche</span></div>
              <div><Ban className="metric-icon metric-icon-zero" size={17} /><strong>0</strong><span>Agentur-Blabla</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <IPhoneModel isReady />
          </div>

        </section>

        <section className="social-proof-bar" data-reveal aria-label="Vertrauen, das man sieht">
          <p>Vertrauen, das man sieht</p>
          <div className="social-proof-track">
            <span>Die Lackier-Werkstatt</span>
            <span>UnfallFix24</span>
            <span>Mousa Export</span>
            <span>GreenLabz Studio</span>
          </div>
        </section>

        <section className="section problem-section" data-reveal>
          <div className="section-head">
            <SectionLabel number="02" label="Problem" />
            <h2><span className="text-accent">Kennst</span> du <span className="text-accent">das?</span></h2>
          </div>
          <div className="problem-grid">
            {problemCards.map(([num, title, text, icon]) => {
              const Icon = cardIcons[icon as keyof typeof cardIcons]
              return (
              <article className="problem-card premium-card" key={title}>
                <div className="card-icon" aria-hidden="true"><Icon size={27} /></div>
                <span className="card-ghost-number" aria-hidden="true">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
              )
            })}
          </div>
        </section>

        <section className="section agitation-section" data-reveal>
          <div className="section-head">
            <SectionLabel number="03" label="Agitation / Konkrete Konsequenzen" />
            <h2>Wenn die <span className="text-accent">eigene Website</span> zur <span className="text-accent">Umsatzbremse</span> wird.</h2>
          </div>
          <div className="card-grid">
            {agitation.map(([num, title, text, icon]) => {
              const Icon = cardIcons[icon as keyof typeof cardIcons]
              return (
              <article className="service-card compact-card premium-card" key={title}>
                <div className="card-icon" aria-hidden="true"><Icon size={27} /></div>
                <span className="card-ghost-number" aria-hidden="true">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
              )
            })}
          </div>
        </section>

        <section className="section solution-section" id="services" data-reveal>
          <div className="section-head">
            <SectionLabel number="04" label="Leistungen / Was ich mache" />
            <h2><span className="section-title-serif">Sechs</span> Disziplinen alles <span className="section-title-serif">aus einer Hand</span></h2>
          </div>
          <div className="discipline-grid">
            {disciplines.map(([num, title, text, tags, icon, motion], index) => {
              const Icon = cardIcons[icon as keyof typeof cardIcons]
              return (
                <article className="discipline-card" key={title} style={{ '--card': index } as CSSProperties}>
                  <div className="discipline-top">
                    <div className="discipline-icon" aria-hidden="true"><Icon size={18} /></div>
                    <div className={`mini-motion ${motion}`} aria-hidden="true">
                      <DisciplineAnimation motion={motion as string} />
                    </div>
                  </div>
                  <span className="discipline-number">{num}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ul>{(tags as string[]).map((tag) => <li key={tag}><Check size={12} />{tag}</li>)}</ul>
                  <ArrowUpRight size={15} className="discipline-arrow" aria-hidden="true" />
                </article>
              )
            })}
          </div>
        </section>

        <section className="section search-shift-section" data-reveal>
          <div className="search-shift-shell">
            <div className="search-shift-copy">
              <SectionLabel number="05" label="Warum das wichtig ist" />
              <h2>Die <span className="text-accent">Suche</span> hat sich <span className="text-accent">verändert</span></h2>
              <p>
                Früher hat man bei Google getippt und geklickt. Heute fragen immer mehr Menschen direkt
                ChatGPT, Gemini oder Perplexity nach einer Empfehlung – „Welcher Zahnarzt in Heilbronn hat gute Bewertungen?“
              </p>
              <p>
                Wenn deine Website nicht auch für diese KI-Suchen aufbereitet ist, existierst du für einen
                wachsenden Teil deiner Kunden schlicht nicht.
              </p>
              <p className="search-region-note">
                Local SEO bedeutet dabei nicht, dich auf eine einzige Stadt zu begrenzen. Ich baue die
                Struktur so, dass du dort sichtbar wirst, wo du wirklich arbeitest - regional, bundesweit
                oder im gesamten DACH-Raum.
              </p>
            </div>

            <div className="search-shift-panel" aria-label="Vorher und jetzt Vergleich">
              <div className="search-orbit" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="search-query">
                <Sparkles size={17} />
                <span>So sucht man dich</span>
              </div>
              <div className="shift-list">
                {searchShift.map(([beforeLabel, before, nowLabel, now], index) => (
                  <article className="shift-row" key={before} style={{ '--row': index } as CSSProperties}>
                    <div>
                      <span>{beforeLabel}</span>
                      <strong>{before}</strong>
                    </div>
                    <ArrowRight size={18} />
                    <div>
                      <span>{nowLabel}</span>
                      <strong>{now}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <p className="search-shift-close">
            Genau deshalb ist SEO und GEO-Optimierung bei mir kein Extra, sondern von Anfang an Teil jeder Website, die ich baue.
          </p>
        </section>

        <section className="section mobile-importance-section" data-reveal>
          <div className="section-head">
            <SectionLabel number="05.1" label="Mobile First" />
            <h2>Warum <span className="text-accent">Mobil</span> so <span className="text-accent">Wichtig</span> ist</h2>
          </div>
          <div className="mobile-model-visual" aria-label="Dreidimensionales Smartphone-Modell">
            <IPhoneModel isReady mobileScrollTrigger={false} />
          </div>
        </section>

        <section className="section work-section" id="cases" data-reveal>
          <div className="section-head">
            <SectionLabel number="06" label="Projekte / Case Studies" />
            <h2>Kein <span className="text-accent">Blabla</span>. Nur fertige Websites.</h2>
          </div>
          <article className="featured-case">
            <div className="featured-case-copy">
              <span className="case-kicker">{featuredCase.label}</span>
              <h3>{featuredCase.title}</h3>
              <p>{featuredCase.intro}</p>
              <strong>{featuredCase.outcome}</strong>
              <div className="case-steps">
                <div><span>Vorher</span><p>{featuredCase.before}</p></div>
                <ArrowRight size={18} aria-hidden="true" />
                <div><span>Umgesetzt</span><p>{featuredCase.after}</p></div>
              </div>
            </div>
            <div className="featured-case-visuals" aria-label="Vorher und Nachher Platzhalterbilder">
              <div className="case-shot before"><span>VORHER</span><div className="case-shot-browser"><i /><i /><i /></div><h4>Praxis Website</h4><p>Informationen ohne klare Führung</p></div>
              <div className="case-shot after"><span>NACHHER</span><div className="case-shot-browser"><i /><i /><i /></div><h4>Mehr Vertrauen. Mehr Termine.</h4><p>Klare Leistung, klare Handlung.</p></div>
            </div>
          </article>
          <div className="work-list">
            {cases.map(([num, title, type, result, preview, _category, url, position]) => (
              <a className="work-row" href={url} target="_blank" rel="noopener noreferrer" key={title}>
                <span>{num}</span>
                <strong>{title}</strong>
                <small>{type}</small>
                <em>{result}</em>
                <div className="work-preview" aria-hidden="true">
                  <div className="preview-browser">
                    <div className="preview-bar">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="preview-page" style={{ backgroundImage: `url(${preview})`, backgroundPosition: position }}>
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={20} />
              </a>
            ))}
          </div>
        </section>

        <section className="section results-section" data-reveal>
          <div className="section-head">
            <SectionLabel number="07" label="Ergebnisse" />
            <h2><span className="text-accent">Weniger</span> reden, <span className="text-accent">mehr</span> liefern</h2>
          </div>
          <div className="results-grid">
            {results.map(({stat, text}) => (
              <div className="result-card" key={stat}>
                <strong>{stat}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section promises-section" data-reveal>
          <div className="section-head">
            <SectionLabel number="08" label="MEIN VERSPRECHEN" />
            <h2>Wie <span className="text-accent">ich</span> Qualität <span className="text-accent">garantiere</span></h2>
          </div>
          <div className="card-grid">
            {promises.map(([title, text, icon]) => {
              const Icon = cardIcons[icon as keyof typeof cardIcons]
              return (
              <article className="service-card compact-card premium-card" key={title}>
                <div className="card-icon" aria-hidden="true"><Icon size={27} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
              )
            })}
          </div>
          <div className="method-tabs" role="tablist" aria-label="GreenLabz Methode">
            {methods.map(([number, title], index) => (
              <button className={activeMethod === index ? 'is-active' : ''} type="button" role="tab" aria-selected={activeMethod === index} onClick={() => setActiveMethod(index)} key={title}>
                <span>{number}</span>{title}
              </button>
            ))}
          </div>
          <div className="method-panel" role="tabpanel">
            <div><span className="method-kicker">{methods[activeMethod][0]} / {methods[activeMethod][1]}</span><p>{methods[activeMethod][2]}</p></div>
            <ul>{methods[activeMethod][3].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
          </div>
        </section>

        <section className="section pricing-section" id="pricing" data-reveal>
          <div className="section-head pricing-head">
            <SectionLabel number="09" label="Investition" />
            <h2><span className="section-title-serif">Investiere</span> in dein <span className="section-title-serif">Wachstum.</span></h2>
          </div>
          <div className="pricing-grid">
            {pricingPackages.map(([name, intro, price, items], index) => (
              <article className={`pricing-card ${index === 1 ? 'featured' : ''}`} key={name}>
                {index === 1 && <span className="pricing-badge">Empfohlen</span>}
                <h3>{name}</h3>
                <p>{intro}</p>
                <ul>{(items as string[]).map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
                <strong>{price}</strong>
                <a className="pricing-cta" href="#calendar">
                  {index === 1 && <span className="cta-dots" aria-hidden="true" />}
                  <span className="cta-label">Paket wählen</span>
                </a>
              </article>
            ))}
          </div>
          <div className="pricing-addons">
            {pricingAddOns.map(([title, kicker, name, price, text]) => (
              <article className="pricing-addon" key={title}>
                <div>
                  <h3>{title}</h3>
                  <span>{kicker}</span>
                  <strong>{name}</strong>
                  <p>{text}</p>
                </div>
                <em>{price}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="section guide-section" data-reveal>
          <div className="section-head">
            <SectionLabel number="10" label="Ratgeber / Tipps" />
            <h2>Erst <span className="section-title-serif">wissen</span><br /> was zählt. Dann <span className="section-title-serif">entscheiden</span></h2>
          </div>
          <div className="guide-grid">
            {guides.map(([title, text]) => (
              <article className="guide-card" key={title}>
                <Sparkles size={18} />
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#ratgeber" onClick={(event) => { event.preventDefault(); navigate('ratgeber') }}>Ratgeber öffnen <ArrowUpRight size={16} /></a>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '3rem', display: 'flex' }}>
            <PrimaryCta onClick={() => navigate('ratgeber')}>Alle Ratgeber anzeigen</PrimaryCta>
          </div>
        </section>

        <section className="section lead-magnet-section" id="freebie" data-reveal>
          <div className="lead-magnet-copy">
            <SectionLabel number="10.1" label="Freebie / Lead Magnet" />
            <h2>Der Website-<span className="section-title-serif">Check</span> für inhabergeführte Betriebe: Was Kunden abschreckt, ohne dass du es merkst.</h2>
            <p>
              Fünf Minuten, die dir zeigen, ob deine Website Vertrauen aufbaut, gefunden wird und Anfragen auslöst.
              Kostenlos als PDF - ohne Verkaufsdruck.
            </p>
            <ul className="lead-magnet-points">
              <li><Check size={16} /> Die wichtigsten Seitenbereiche pruefen</li>
              <li><Check size={16} /> Mobile Stolperstellen erkennen</li>
              <li><Check size={16} /> Nächsten sinnvollen Schritt ableiten</li>
            </ul>
          </div>
          <div className="lead-magnet-form-wrap">
            {leadStatus === 'success' ? (
              <div className="lead-magnet-success" role="status">
                <Check size={22} />
                <strong>Deine Checkliste ist unterwegs.</strong>
                <p>Der Download wurde gestartet. Pruefe bei Bedarf auch den Download-Ordner.</p>
              </div>
            ) : (
              <form className="lead-magnet-form" onSubmit={handleLeadSubmit}>
                <label htmlFor="lead-email">Wohin darf ich die Checkliste schicken?</label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  value={leadEmail}
                  onChange={(event) => setLeadEmail(event.target.value)}
                  placeholder="deine@email.de"
                  autoComplete="email"
                  required
                />
                <input type="hidden" name="_subject" value="Neue GreenLabz Lead-Magnet-Anfrage" />
                <input type="hidden" name="_template" value="table" />
                <label className="lead-magnet-consent">
                  <input
                    type="checkbox"
                    checked={leadConsent}
                    onChange={(event) => setLeadConsent(event.target.checked)}
                    required
                  />
                  <span>Ich stimme zu, dass GreenLabz meine E-Mail-Adresse zur Zusendung des Freebies verarbeitet. Details stehen in der <a href="#calendar">Datenschutzerklärung</a>.</span>
                </label>
                <button className="btn primary lead-magnet-submit" type="submit" disabled={leadStatus === 'sending'}>
                  <span>{leadStatus === 'sending' ? 'Wird gesendet...' : 'Checkliste kostenlos laden'}</span>
                  <Download size={17} />
                </button>
                {leadStatus === 'error' && <p className="lead-magnet-error" role="alert">Das hat gerade nicht funktioniert. Bitte versuche es erneut.</p>}
                <small>Kein Newsletter-Zwang. Abmeldung jederzeit per E-Mail möglich.</small>
              </form>
            )}
          </div>
        </section>

        <section className="section objections-section" id="faq" data-reveal>
          <div className="section-head">
            <SectionLabel number="11" label="Einwände / Stille Ängste" />
            <h2><span className="section-title-serif">Fragen</span> & <span className="section-title-serif">Antworten</span></h2>
            <p className="faq-intro">Häufige Fragen, klare Antworten. Damit du einschätzen kannst, ob GreenLabz zu deinem Betrieb passt.</p>
          </div>
          <div className="faq-list">
            {objections.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><CircleHelp size={16} /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section about-section" data-reveal>
          <div className="about-image-wrapper">
            <img src="/assets/james-portrait-2.png" alt="James Green" className="about-image" />
          </div>
          <div>
            <SectionLabel number="12" label="About Me" />
            <h2><span className="section-title-serif">Warum</span> GreenLabz <span className="section-title-serif">?</span></h2>
            <p>
              Hi, ich bin James Green. Ich entwickle maßgeschneiderte digitale Plattformen, die nicht nur auf den ersten Blick faszinieren, sondern deine Besucher gezielt in echte Kunden verwandeln. Dafür setze ich auf modernste KI-gestützte Entwicklungsprozesse. Sie machen mich schneller und präziser als klassische Agenturen und deine digitale Präsenz effizient, skalierbar und zukunftssicher. Mein Antrieb ist simpel: Meine Kunden sollen online so wirken wie sie wirklich sind. Professionell, vertrauenswürdig und einen Schritt voraus. Mein Fokus liegt auf einem Ding: deinem Umsatzwachstum durch smarte technologische Umsetzung. Ich freue mich darauf, mit dir zu arbeiten. Bis bald!
            </p>
          </div>
        </section>

        <section className="contact-section calendar-section" id="calendar" data-reveal>
          
          <h2><span className="section-title-serif">Such</span> dir einen <span className="section-title-serif">Termin</span> aus.</h2>
          <p>
            20 Minuten. Kein Verkaufstheater. Wir prüfen, wo du gerade stehst,
            was dich Anfragen kostet und ob ein Relaunch oder monatliche Begleitung Sinn ergibt.
          </p>
          <div className="calendar-embed-container" style={{ width: 'min(1060px, 100%)', margin: '2rem auto 0' }}>
            <Cal 
              namespace="discoverycall"
              calLink="green-labz-uufryt/discoverycall"
              style={{ width: "100%", height: "100%", overflow: "scroll", borderRadius: '12px' }}
              config={{ layout: "month_view", // @ts-ignore
              useSlotsViewOnSmallScreen: true }}
            />
          </div>
        </section>

        <section className="section tech-section" data-reveal>
          <div className="tech-refs">
            <SectionLabel number="14" label="Technik" />
            <h2>Technologie & <span className="section-title-serif">Transparenz</span></h2>
            <p>
              Ich nenne Stack, Performance-Ziele und Standards offen. Hier kannst du die wichtigsten
              Quellen selbst nachvollziehen.
            </p>
          </div>
          <div className="tech-grid">
            {techReferences.map(([title, text, href]) => (
              <a className="tech-card" href={href} target="_blank" rel="noreferrer" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section" data-reveal>
          <SectionLabel number="15" label="Kontakt" />
          <h2><span className="section-title-serif">Lass</span> uns <span className="section-title-serif">reden</span></h2>
          <p>
            Erzähl mir von deinem nächsten Projekt. Klicke auf den Button unten, um das kurze Briefing zu starten.
            So kann ich mich optimal vorbereiten. Du erhältst innerhalb von 24 Stunden Feedback mit den nächsten
            konkreten Schritten.
          </p>
          <PrimaryCta onClick={() => setIsContactModalOpen(true)}>Nachricht schreiben</PrimaryCta>
          <div className="contact-meta">
            <div>
              <span>E-Mail:</span>
              <strong>hello@greenlabz-studio.de</strong>
            </div>
            <div>
              <span>Telefon:</span>
              <strong>+49 1604928746</strong>
            </div>
            <div>
              <span>Antwort innerhalb</span>
              <strong>24h</strong>
            </div>
          </div>
        </section>
      </main>
      )}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
<footer className="footer-trust" data-reveal>
        <div className="footer-brand">
          <SectionLabel number="16" label="Footer / Links" />
          <LogoMark className="footer-logo" />
          <ul>
            <li><ShieldCheck size={15} /> DSGVO-konforme Umsetzung</li>
            <li><ShieldCheck size={15} /> Impressum & Datenschutz vorgesehen</li>
            <li><ShieldCheck size={15} /> Direkter Kontakt ohne Zwischenebene</li>
          </ul>
          <div className="footer-socials" aria-label="Social Links">
            <a href="mailto:hello@greenlabz-studio.de" aria-label="E-Mail"><Mail size={18} /></a>
            <a href="https://wa.me/491604928746" aria-label="WhatsApp"><MessageCircle size={18} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="#top" aria-label="Nach oben"><ArrowUpRight size={18} /></a>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <h3>Navigation</h3>
            <a href="#top" onClick={(event) => { event.preventDefault(); navigate('home') }}>Startseite</a>
            <a href="#ratgeber" onClick={(event) => { event.preventDefault(); navigate('ratgeber') }}>Ratgeber</a>
            <a href="#beforeafter">Vorher / Nachher</a>
            <a href="#mobileview">Mobile Ansicht</a>
          </div>
          <div>
            <h3>Fokus</h3>
            <a href="#cases">Webdesign</a>
            <a href="#top">SEO & KI-Suchmaschinen Optimierung</a>
            <a href="#top">KI-Integration</a>
            <a href="#calendar">Conversion Optimierung</a>
          </div>
          <div>
            <h3>Kontakt</h3>
            <address>
              hello@greenlabz-studio.de<br />
              Baden-Württemberg, DE
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 GreenLabz Studio. Engineering, Design and Strategy.</span>
          <nav aria-label="Rechtliches">
            <a href="#calendar">Impressum</a>
            <a href="#calendar">Datenschutz</a>
            <a href="#calendar">AGB</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App;
