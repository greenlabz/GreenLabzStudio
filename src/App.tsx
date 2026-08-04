import { type CSSProperties, lazy, Suspense, useEffect, useRef, useState } from 'react'
import Cal, { getCalApi } from "@calcom/embed-react"
import { ContactModal } from './ContactModal'
import { PflegeModal } from './PflegeModal'
import { DatenschutzModal } from './DatenschutzModal'
import { ImpressumModal } from './ImpressumModal'
const RatgeberPage = lazy(() => import('./pages/RatgeberPage'))
const ClaudeSkillsPage = lazy(() => import('./pages/ClaudeSkillsPage'))
import CinematicHero from './components/CinematicHero'
import CinematicPhone from './components/CinematicPhone'
import CinematicFooter from './components/CinematicFooter'
import { FloatingContactWidget } from './components/FloatingContactWidget'
import { TechStackSection } from './components/TechStackSection'
import { GoogleReviewsSection } from './components/GoogleReviewsSection'
import { IndustriesSection } from './components/IndustriesSection'
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
  Handshake,
  ScanSearch,
  Ban,
  Search, Settings2, CheckCircle2, Shield, MousePointer2, Bot, Building2, Wrench
, Smartphone} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { HeroBendGallery } from './components/HeroBendGallery'
import { BeforeAfterSlider } from './components/BeforeAfterSlider'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const logoSrc = '/assets/greenlabz-studio-logo.svg'
const leadMagnetEndpoint = '/api/lead-magnet'
const leadMagnetFile = '/downloads/greenlabz-website-analyse.pdf'
const socialProofLogos = [
  { src: '/assets/showcases/neweo-logo.png', alt: 'NewEO' },
  { src: '/assets/showcases/buss-logo.png', alt: 'Tierarzt Buss' },
  { src: '/assets/showcases/happen-logo.png', alt: 'Happen' },
  { src: '/assets/showcases/ad-logo-cutout.png', alt: 'AD' },
  { src: '/assets/showcases/tfm-montage.png', alt: 'TFM Montage' },
  { src: '/assets/showcases/greenlabz-studio-logo.svg', alt: 'GreenLabz Studio' },
]

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

type BookingTopic = {
  title: string
  options: string[]
}

const bookingTopics: BookingTopic[] = [
  {
    title: 'Neue Website / Relaunch',
    options: [
      'Ich habe noch keine eigene Website',
      'Meine Website ist veraltet oder wirkt nicht mehr professionell',
      'Meine Website sieht gut aus, bringt aber zu wenig Anfragen',
    ],
  },
  {
    title: 'Branding',
    options: [
      'Ich brauche ein komplett neues Branding',
      'Mein Branding existiert, wirkt aber inkonsistent',
      'Ich brauche einzelne Assets wie Visitenkarten oder ein Social-Media-Kit',
    ],
  },
  {
    title: 'App- & Software-Entwicklung',
    options: [
      'Ich brauche ein Buchungssystem oder einen Terminkalender',
      'Ich brauche einen KI-Telefon- oder Chat-Assistenten',
      'Ich habe eine eigene Softwareidee, die umgesetzt werden soll',
    ],
  },
  {
    title: 'KI-Integration',
    options: [
      'Anfragen automatisch bearbeiten',
      'Interne Prozesse wie Leads, Content oder Reporting automatisieren',
      'In KI-Suchmaschinen wie ChatGPT oder Perplexity sichtbar werden',
    ],
  },
  {
    title: 'SEO- & Website-Begleitung',
    options: [
      'Laufende technische Betreuung und Wartung',
      'Local SEO und Google-Unternehmensprofil verbessern',
      'Content und GEO für KI-Suchmaschinen verbessern',
    ],
  },
]

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

const cases = [
  ['01', 'Neweo Energy Studio', 'Relaunch / Local SEO', 'Von Verkaufsdruck zu echter Beratung', '/cases/neweo.png', 'Energy', 'https://neweo.de/', 'center'],
  ['02', 'Tierarzt Dr. Buss', 'Website / Local SEO', 'Sichtbar in Möckmühl & Umgebung – Google-Anbindung', '/cases/buss.png', 'Vet', 'https://www.xn--tierarztpraxis-mckmhl-wec5l.de/', 'center'],
  ['03', 'Happen Streetfood', 'Landingpage / KI-Suchmaschinen optimiert', 'Klarer Streetfood-Vibe & Platz 1 Google-Ranking', '/cases/happen.png', 'Food', 'https://happen.food/', 'top center'],
  ['04', 'TFM Montage', 'Website / Sichtbarkeit', 'Endlich eine passende Homepage – Projektanfragen vereinfacht', '/cases/tfm.png', 'Montage', 'https://www.tf-m.de/', 'top center'],
  ['05', 'Zahnarzt A. Roth', 'Website / Local SEO', '+43 % mehr Terminanfragen – verständliche Führung durch die Seite', '/cases/roth.png', 'Zahnarzt', 'https://zahnaerzte-roth.de/', 'top center'],
]

const pricingPackages: PricingPackage[] = [
  ['Starter', 'Die professionelle Grundlage für deinen Webauftritt', 'ab 1.190 EUR', ['Mobiles Premium-Design', 'Basis Google SEO-Setup', 'DSGVO-konforme Umsetzung', 'Optimierte Ladezeiten']],
  ['Relaunch', 'Deine bestehende Website wird zum klaren Vertriebskanal', 'ab 1.990 EUR', ['Analyse der aktuellen Seite', 'Neue Struktur und Texte', 'Premium Redesign ohne Ranking-Verlust', 'Google Search Console Integration', 'KI-Suchmaschinen-Grundlage']],
  ['Premium', 'High-End Strategie & Automatisierung', 'ab 2.990 EUR', ['Alles aus Relaunch, plus', 'Individuelles High-End Webdesign', 'Lead-Funnel & Automationen', 'Google Search Console & laufende SEO', 'KI-Suchmaschinen-Optimierung']],
]





const promises = [
  ['100% individuell, keine Templates', 'Ich nutze keine billigen WordPress-Baukästen. Jedes Projekt wird von Grund auf mit modernsten Technologien und effizienten KI-Workflows maßgeschneidert entwickelt.', 'code'],
  ['Mobile-First, ohne Kompromisse', 'Über die Hälfte deiner Besucher kommt vom Handy. Deshalb entwickle ich zuerst für den kleinsten Bildschirm, nicht als nachträgliche Anpassung einer Desktop-Seite.', 'smartphone'],
  ['Kompromisslose Performance', 'Ladezeiten unter einer Sekunde. Das freut nicht nur deine Besucher, sondern wird auch von Google mit massiv besseren Rankings (SEO) belohnt.', 'zap'],
  ['Conversion als oberstes Ziel', 'Eine Website muss nicht nur gut aussehen, sie muss Anfragen generieren. Jedes Design-Element ist psychologisch darauf ausgerichtet, Besucher in Kunden zu verwandeln.', 'trend'],
]

const featuredCase = {
  label: 'Case Study / Referenz',
  title: 'Wie Zahnarzt Dr. Roth aus Besuchern +43% mehr Patienten-Anfragen gewinnt',
  intro: 'Die alte Website war unübersichtlich und auf Mobilgeräten schwer bedienbar. Wichtige Leistungen und die Online-Terminbuchung waren versteckt.',
  outcome: '+43% mehr Patienten-Termine',
  before: 'Veraltetes Layout, keine klare Führung, langsame Ladezeiten auf Smartphones',
  after: 'Leichte mobile Führung, SEO- & GEO-Optimierung (Google & KI-Suche) und direkte Termin-CTAs',
}

const methods: [string, string, string, string[]][] = [
  ['01', 'Strategie', 'Wir klären zuerst, wer kaufen soll, welches Angebot zählt und welche Handlung die Website auslösen muss.', ['Zielgruppe und Angebot', 'Conversion-Ziel', 'Seitenstruktur ohne Umwege']],
  ['02', 'Design', 'Dein Auftritt bekommt eine klare visuelle Hierarchie, die Vertrauen schafft und Besucher sicher zur nächsten Entscheidung führt.', ['Mobile-first Interface', 'Markengerechte Gestaltung', 'Klarer CTA-Fokus']],
  ['03', 'Content', 'Deine Texte zeigen klar, was du anbietest, für wen es gedacht ist und was der nächste Schritt ist. So verstehen deine Kunden dein Angebot sofort - und Google kann dich besser einordnen.', ['Nutzen statt Floskeln', 'SEO- und GEO-Struktur', 'Vertrauensaufbau']],
  ['04', 'Entwicklung', 'Ich setze das System schnell, stabil und wartbar um. Nach dem Launch bleibt die technische Basis bereit für Wachstum.', ['Performance und Sicherheit', 'Tracking und Übergabe', 'Begleitung nach dem Launch']],
]



const objections = [
  ['Was kostet eine neue Website?', 'Eine solide Website startet ab 1.190 EUR. Ein Relaunch startet ab 1.990 EUR, Premium-Projekte ab 2.990 EUR. Du bekommst vor dem Start eine klare Einschätzung ohne Preisnebel.'],
  ['Arbeitest du nur lokal oder auch in ganz Deutschland?', 'Ich arbeite im kompletten DACH-Raum. Local SEO setze ich dort ein, wo regionale Nachfrage wichtig ist - zum Beispiel bei Praxen und Handwerksbetrieben. Für andere Unternehmen erweitere ich die Sichtbarkeit bundesweit oder international.'],
  ['Wie läuft unsere Zusammenarbeit ab?', 'Wir klären Ziel, Angebot und Zielgruppe, danach entstehen Struktur, Texte, Design, technische Umsetzung und Launch in klaren Schritten.'],
  ['Wie lange dauert es, bis meine Seite fertig ist?', 'Kleine Seiten können schnell stehen. Umfangreichere Relaunches brauchen mehr Abstimmung. Wichtig ist: du bekommst einen realistischen Zeitplan vor Projektstart.'],
  ['Ich verstehe nichts von Technik. Ist das schlimm?', 'Nein. Du musst keine Tools, Plugins oder Fachbegriffe verstehen. Ich erkläre nur, was für deine Entscheidung wichtig ist.'],
  ['Was bedeutet SEO und warum ist das wichtig?', 'SEO sorgt dafür, dass Kunden dich bei Google und KI-Suchmaschinen finden. Bei GreenLabz Studio wird die Struktur von Anfang an so gebaut, dass Sichtbarkeit später nicht nachträglich angeflickt werden muss.'],
  ['Baust du auch Seiten für kleine Betriebe und Selbstständige?', 'Ja. Genau dafür ist GreenLabz Studio gedacht: Praxen, Handwerk, lokale Dienstleister und inhabergeführte Betriebe, die online seriös wirken und Anfragen gewinnen wollen. Gleichzeitig stellen aber auch komplexere Aufgaben und langfristige Betreuungen keine Hürde dar.'],
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

function BookingFlow({ onOpenDatenschutz }: { onOpenDatenschutz: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [topicIndex, setTopicIndex] = useState<number | null>(null)
  const [option, setOption] = useState('')
  const topic = topicIndex === null ? null : bookingTopics[topicIndex]
  const bookingSummary = topic && option ? `Anliegen: ${topic.title} | ${option}` : ''

  const chooseTopic = (index: number) => {
    setTopicIndex(index)
    setOption('')
    setStep(2)
  }

  const goBack = () => {
    if (step === 3) {
      setStep(2)
      return
    }
    setTopicIndex(null)
    setOption('')
    setStep(1)
  }

  return (
    <div className="booking-flow">
      <div className="booking-progress" aria-label={`Schritt ${step} von 3`}>
        {['Anliegen', 'Details', 'Termin & Angaben'].map((label, index) => (
          <div className={step >= index + 1 ? 'is-active' : ''} key={label}>
            <span>0{index + 1}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>

      <div className="booking-stage" aria-live="polite">
        {step === 1 && (
          <div className="booking-panel">
            <div className="booking-panel-head">
              <span>[01] DEIN ANLIEGEN</span>
              <h3>Wobei kann ich dir helfen?</h3>
              <p>Wähle den Bereich, der am besten zu deinem Vorhaben passt.</p>
            </div>
            <div className="booking-choice-list">
              {bookingTopics.map((entry, index) => (
                <button type="button" onClick={() => chooseTopic(index)} key={entry.title}>
                  <span>0{index + 1}</span>
                  <strong>{entry.title}</strong>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && topic && (
          <div className="booking-panel">
            <button className="booking-back" type="button" onClick={goBack}>
              <span aria-hidden="true">←</span> Zurück
            </button>
            <div className="booking-panel-head">
              <span>[02] {topic.title}</span>
              <h3>Was beschreibt deine Situation?</h3>
              <p>Damit können wir im Gespräch direkt beim richtigen Punkt starten.</p>
            </div>
            <div className="booking-option-list" role="radiogroup" aria-label={topic.title}>
              {topic.options.map((entry) => (
                <button
                  className={option === entry ? 'is-selected' : ''}
                  type="button"
                  role="radio"
                  aria-checked={option === entry}
                  onClick={() => setOption(entry)}
                  key={entry}
                >
                  <span className="booking-radio" aria-hidden="true" />
                  <strong>{entry}</strong>
                  {option === entry && <Check size={18} aria-hidden="true" />}
                </button>
              ))}
            </div>
            <button
              className="btn primary booking-next"
              type="button"
              disabled={!option}
              onClick={() => setStep(3)}
            >
              <span className="cta-label">Datum &amp; Uhrzeit wählen</span>
              <span className="cta-dots" aria-hidden="true" />
              <ArrowRight size={19} />
            </button>
          </div>
        )}

        {step === 3 && topic && option && (
          <div className="booking-panel booking-calendar-panel">
            <div className="booking-calendar-head">
              <button className="booking-back" type="button" onClick={goBack}>
                <span aria-hidden="true">←</span> Auswahl ändern
              </button>
              <div className="booking-summary">
                <span>{topic.title}</span>
                <strong>{option}</strong>
              </div>
              <p>Wähle zuerst Datum und Uhrzeit. Danach folgen Name, E-Mail-Adresse, Website und Telefonnummer (optional).</p>
            </div>
            <div className="calendar-embed-container">
              <Cal
                key={bookingSummary}
                namespace="discoverycall"
                calLink="green-labz-uufryt/discoverycall"
                style={{ width: '100%', height: '100%', overflow: 'auto', borderRadius: '16px' }}
                config={{
                  layout: 'month_view',
                  useSlotsViewOnSmallScreen: 'true',
                }}
              />
            </div>
            <p className="booking-privacy">
              Für die Terminbuchung werden deine Angaben an Cal.com übermittelt. Details stehen in der{' '}
              <button type="button" onClick={onOpenDatenschutz}>Datenschutzerklärung</button>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isPflegeModalOpen, setIsPflegeModalOpen] = useState(false)
  const [selectedPflegePackage, setSelectedPflegePackage] = useState('Pflege Business')
  const [isDatenschutzModalOpen, setIsDatenschutzModalOpen] = useState(false)
  const [isImpressumModalOpen, setIsImpressumModalOpen] = useState(false)

  const openPflegeAnfrage = (packageName: string) => {
    setSelectedPflegePackage(packageName)
    setIsPflegeModalOpen(true)
  }

  const [route, setRoute] = useState(() => {
    const h = window.location.hash.replace('#', '')
    if (h.startsWith('ratgeber')) return 'ratgeber'
    if (h.startsWith('skills') || h.startsWith('claude-skills')) return 'skills'
    return 'home'
  })
  const [articleSlug, setArticleSlug] = useState<string | null>(() => {
    const h = window.location.hash.replace('#', '')
    if (h.startsWith('ratgeber/')) return h.split('/')[1] || null
    return null
  })
  const [skillSlug, setSkillSlug] = useState<string | null>(() => {
    const h = window.location.hash.replace('#', '')
    if (h.startsWith('skills/')) return h.split('/')[1] || null
    return null
  })
  const [activeMethod, setActiveMethod] = useState(0)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadConsent, setLeadConsent] = useState(false)
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const navigate = (nextRoute: string) => {
    if (nextRoute.startsWith('ratgeber/')) {
      setRoute('ratgeber')
      setArticleSlug(nextRoute.split('/')[1])
      setSkillSlug(null)
    } else if (nextRoute.startsWith('skills/') || nextRoute.startsWith('claude-skills/')) {
      setRoute('skills')
      setSkillSlug(nextRoute.split('/')[1])
      setArticleSlug(null)
    } else if (nextRoute === 'skills' || nextRoute === 'claude-skills') {
      setRoute('skills')
      setSkillSlug(null)
      setArticleSlug(null)
    } else {
      setRoute(nextRoute)
      setArticleSlug(null)
      setSkillSlug(null)
    }
    window.history.pushState(null, '', nextRoute === 'home' ? '#top' : `#${nextRoute}`)
    window.scrollTo(0, 0)
  }

  const scrollToCalendar = () => {
    setRoute('home')
    window.history.pushState(null, '', '#calendar')
    window.requestAnimationFrame(() => {
      document.getElementById('calendar')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!leadConsent) return
    setLeadStatus('sending')

    const formEl = event.currentTarget
    const name  = (formEl.elements.namedItem('name')  as HTMLInputElement)?.value?.trim() || ''
    const email = (formEl.elements.namedItem('email') as HTMLInputElement)?.value?.trim() || ''

    try {
      const response = await fetch(leadMagnetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          aktion: '5-Minuten-Checkliste für deine Website angefordert / Download ausgelöst',
        }),
      })
      if (!response.ok) throw new Error('Anfrage konnte nicht gesendet werden.')
      setLeadStatus('success')
      const download = document.createElement('a')
      download.href = leadMagnetFile
      download.download = 'greenlabz-5-minuten-checkliste.pdf'
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
    let refreshRafId = 0
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

      const siteNav = root.querySelector<HTMLElement>('.site-nav')
      const floatingContact = root.querySelector<HTMLElement>('.floating-contact-sidebar')

      // Set initial visible state for Hero entrance
      if (siteNav) {
        gsap.set(siteNav, { autoAlpha: 1, y: 0, z: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto' })
      }
      if (floatingContact) {
        gsap.set(floatingContact, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto' })
      }

      // 1. Hide nav when scrolling down past Hero
      ScrollTrigger.create({
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom 60%',
        onLeave: () => {
          if (siteNav) gsap.to(siteNav, { autoAlpha: 0, y: -18, z: -220, scale: .72, filter: 'blur(12px)', pointerEvents: 'none', duration: .65, ease: 'power3.inOut', overwrite: 'auto' })
          if (floatingContact) gsap.to(floatingContact, { autoAlpha: 0, y: 16, scale: .85, filter: 'blur(12px)', pointerEvents: 'none', duration: .65, ease: 'power3.inOut', overwrite: 'auto' })
        },
        onEnterBack: () => {
          if (siteNav) gsap.to(siteNav, { autoAlpha: 1, y: 0, z: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: .85, ease: 'expo.out', overwrite: 'auto' })
          if (floatingContact) gsap.to(floatingContact, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: .85, ease: 'expo.out', overwrite: 'auto' })
        },
      })

      // 2. Re-appear sticky nav starting at problem-section
      if (siteNav) {
        ScrollTrigger.create({
          trigger: '.problem-section',
          start: 'top 72%',
          onEnter: () => {
            gsap.to(siteNav, { autoAlpha: 1, y: 0, z: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 1.15, ease: 'expo.out', overwrite: 'auto' })
            if (floatingContact) gsap.to(floatingContact, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 1.15, ease: 'expo.out', overwrite: 'auto' })
          },
          onLeaveBack: () => {
            gsap.to(siteNav, { autoAlpha: 0, y: -18, z: -220, scale: .72, filter: 'blur(12px)', pointerEvents: 'none', duration: .8, ease: 'power3.inOut', overwrite: 'auto' })
            if (floatingContact) gsap.to(floatingContact, { autoAlpha: 0, y: 16, scale: .85, filter: 'blur(12px)', pointerEvents: 'none', duration: .8, ease: 'power3.inOut', overwrite: 'auto' })
          },
        })
      }

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.site-nav, .floating-contact-sidebar', { y: -24, opacity: 0, duration: 0.75 })
        .from('.hero-label, .hero-title .line, .hero-copy p, .hero-actions, .metrics', {
          y: 46,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
        }, '-=0.25')

      if (window.matchMedia('(min-width: 1080px)').matches) {
        gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: '+=900',
            scrub: 1.1,
          },
        })
          .to('.hero-text-wrapper', { xPercent: -8, y: -28, opacity: .24, filter: 'blur(11px)', ease: 'power2.inOut' }, 0)
          .to('.hero-cinematic-visual', { xPercent: 7, scale: 1.1, rotateZ: 2, ease: 'power2.inOut' }, 0)
      }

      const mobileSection = root.querySelector<HTMLElement>('.mobile-importance-section')
      const mobileStage = root.querySelector<HTMLElement>('.mobile-importance-stage')
      const mobileModel = root.querySelector<HTMLElement>('.mobile-model-visual')
      const mobilePhone = mobileModel?.querySelector<HTMLElement>('.gl-exact-phone-static')
      if (mobileSection && mobileStage && mobileModel && mobilePhone) {
        const mobileViewport = window.matchMedia('(max-width: 1079px)').matches
        const pinDistance = mobileViewport ? 1800 : 1600
        const phoneStates = gsap.utils.toArray<HTMLElement>('.gl-exact-phone-state', mobileModel)
        const beatCopies = gsap.utils.toArray<HTMLElement>('.mobile-beat-copy-state', mobileSection)
        const stopwatchRing = mobileModel.querySelector<SVGCircleElement>('.gl-exact-phone-state-one .gl-exact-progress-ring')
        const trafficRing = mobileModel.querySelector<SVGCircleElement>('.gl-exact-phone-state-two .gl-exact-progress-ring')
        const trafficValue = { value: 0 }
        const trafficElement = mobileModel.querySelector<HTMLElement>('.gl-exact-traffic-value')
        const splitBad = mobileModel.querySelector<HTMLElement>('.gl-exact-split-bad')
        const splitGood = mobileModel.querySelector<HTMLElement>('.gl-exact-split-good')
        const lossLabel = mobileModel.querySelector<HTMLElement>('.gl-exact-loss-label')
        const competitiveYours = mobileModel.querySelector<HTMLElement>('.gl-exact-competitive-yours')
        const competitiveOther = mobileModel.querySelector<HTMLElement>('.gl-exact-competitive-other')
        const competitiveLead = mobileModel.querySelector<HTMLElement>('.gl-exact-competitive-lead')
        const hideNav = () => {
          if (siteNav) gsap.to(siteNav, { autoAlpha: 0, y: -14, z: -160, scale: .76, filter: 'blur(10px)', pointerEvents: 'none', duration: .85, ease: 'power3.inOut', overwrite: 'auto' })
          if (floatingContact) gsap.to(floatingContact, { autoAlpha: 0, y: 14, scale: .85, filter: 'blur(10px)', pointerEvents: 'none', duration: .85, ease: 'power3.inOut', overwrite: 'auto' })
        }
        const showNav = () => {
          if (siteNav) gsap.to(siteNav, { autoAlpha: 1, y: 0, z: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: .9, ease: 'expo.out', overwrite: 'auto' })
          if (floatingContact) gsap.to(floatingContact, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: .9, ease: 'expo.out', overwrite: 'auto' })
        }

        gsap.set(mobilePhone, {
          autoAlpha: 0,
          y: mobileViewport ? 30 : 32,
          z: mobileViewport ? -220 : -320,
          scale: mobileViewport ? .68 : .78,
          rotationY: mobileViewport ? -76 : -86,
          transformOrigin: '50% 50%',
          transformPerspective: mobileViewport ? 1000 : 1400,
        })
        if (phoneStates.length) gsap.set(phoneStates, { autoAlpha: 0, y: 16, display: 'flex' })
        if (beatCopies.length) gsap.set(beatCopies, { autoAlpha: 0, y: 18 })
        if (stopwatchRing) gsap.set(stopwatchRing, { strokeDashoffset: 427 })
        if (trafficRing) gsap.set(trafficRing, { strokeDashoffset: 427 })
        
        const validSplit = [splitBad, splitGood, lossLabel].filter(Boolean) as HTMLElement[]
        if (validSplit.length) gsap.set(validSplit, { autoAlpha: 0 })
        if (splitBad) gsap.set(splitBad, { x: -18, rotation: -3 })
        if (splitGood) gsap.set(splitGood, { x: 18, rotation: 3 })
        
        const validComp = [competitiveYours, competitiveOther, competitiveLead].filter(Boolean) as HTMLElement[]
        if (validComp.length) gsap.set(validComp, { autoAlpha: 0 })
        if (competitiveYours) gsap.set(competitiveYours, { x: -14 })
        if (competitiveOther) gsap.set(competitiveOther, { x: 14 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileStage,
            start: 'top top',
            end: `+=${pinDistance}`,
            pin: mobileStage,
            pinSpacing: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: mobileViewport ? hideNav : undefined,
            onEnterBack: mobileViewport ? hideNav : undefined,
            onLeave: mobileViewport ? showNav : undefined,
            onLeaveBack: mobileViewport ? showNav : undefined,
          },
        })

        tl.to(mobilePhone, {
          autoAlpha: 1,
          y: 0,
          z: 0,
          scale: 1,
          rotationY: 0,
          duration: .62,
          ease: 'none',
        })
        .to(mobilePhone, { y: mobileViewport ? -6 : -10, duration: .38, ease: 'none' })

        if (phoneStates[0] && beatCopies[0]) {
          tl.to([phoneStates[0], beatCopies[0]], { autoAlpha: 1, y: 0, duration: .12, ease: 'none' }, 0)
        }
        if (stopwatchRing) {
          tl.to(stopwatchRing, { strokeDashoffset: 0, duration: .42, ease: 'none' }, .18)
        }
        if (phoneStates[0] && beatCopies[0]) {
          tl.to([phoneStates[0], beatCopies[0]], { autoAlpha: 0, y: -14, duration: .12, ease: 'none' }, 1.08)
        }
        if (phoneStates[1] && beatCopies[1]) {
          tl.to([phoneStates[1], beatCopies[1]], { autoAlpha: 1, y: 0, duration: .12, ease: 'none' }, '<')
        }
        if (trafficElement) {
          tl.to(trafficValue, {
            value: 81,
            duration: .42,
            ease: 'none',
            onUpdate: () => {
              if (trafficElement) trafficElement.textContent = `${Math.round(trafficValue.value)}%`
            },
          }, 1.2)
        }
        if (trafficRing) {
          tl.to(trafficRing, { strokeDashoffset: 77, duration: .42, ease: 'none' }, 1.18)
        }
        if (phoneStates[1] && beatCopies[1]) {
          tl.to([phoneStates[1], beatCopies[1]], { autoAlpha: 0, y: -14, duration: .12, ease: 'none' }, 1.82)
        }
        if (phoneStates[2] && beatCopies[2]) {
          tl.to([phoneStates[2], beatCopies[2]], { autoAlpha: 1, y: 0, duration: .12, ease: 'none' }, '<')
        }
        if (splitBad) {
          tl.to(splitBad, { autoAlpha: 1, x: 0, rotation: 0, duration: .22, ease: 'none' }, 1.92)
        }
        if (splitGood) {
          tl.to(splitGood, { autoAlpha: 1, x: 0, rotation: 0, duration: .22, ease: 'none' }, 2.02)
        }
        if (lossLabel) {
          tl.to(lossLabel, { autoAlpha: 1, duration: .14, ease: 'none' }, 2.22)
        }
        if (phoneStates[2] && beatCopies[2]) {
          tl.to([phoneStates[2], beatCopies[2]], { autoAlpha: 0, y: -14, duration: .12, ease: 'none' }, 2.58)
        }
        if (phoneStates[3] && beatCopies[3]) {
          tl.to([phoneStates[3], beatCopies[3]], { autoAlpha: 1, y: 0, duration: .12, ease: 'none' }, '<')
        }
        if (competitiveOther) {
          tl.to(competitiveOther, { autoAlpha: 1, x: 0, duration: .2, ease: 'none' }, 2.72)
        }
        if (competitiveYours) {
          tl.to(competitiveYours, { autoAlpha: 1, x: 0, duration: .2, ease: 'none' }, 2.82)
        }
        if (competitiveLead) {
          tl.to(competitiveLead, { autoAlpha: 1, y: 0, duration: .16, ease: 'none' }, 2.96)
        }
        tl.to({}, { duration: 1.2 }, 3.12)
        if (phoneStates[3] && beatCopies[3]) {
          tl.to([phoneStates[3], beatCopies[3]], { autoAlpha: 0, y: -24, duration: .35, ease: 'none' }, 4.32)
        }
        tl.to(mobilePhone, { autoAlpha: 0, y: -48, scale: .9, duration: .35, ease: 'none' }, '<')
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,filter',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.problem-card').forEach((card, index) => {
        gsap.from(card, {
          y: 96,
          autoAlpha: 0,
          duration: .82,
          delay: index * .06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
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
          ScrollTrigger.create({
            trigger: card,
            start: 'top 68%',
            end: 'bottom 34%',
            toggleClass: { targets: card, className: 'is-scroll-active' },
          })
        })

        const agitationSection = root.querySelector<HTMLElement>('.agitation-section')
        const agitationCards = gsap.utils.toArray<HTMLElement>('.agitation-section .service-card')
        if (agitationSection && agitationCards.length) {
          gsap.set(agitationCards, {
            xPercent: 112,
            autoAlpha: 0,
            scale: .96,
            rotationY: -8,
            transformPerspective: 900,
          })

          const agitationTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: agitationSection,
              start: 'top top',
              end: () => `+=${Math.round(window.innerHeight * agitationCards.length * .72)}`,
              pin: true,
              pinSpacing: true,
              scrub: .7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          agitationCards.forEach((card, index) => {
            const position = index
            agitationTimeline.to(card, {
              xPercent: 0,
              autoAlpha: 1,
              scale: 1,
              rotationY: 0,
              duration: .32,
              ease: 'none',
            }, position)

            if (index < agitationCards.length - 1) {
              agitationTimeline.to(card, {
                xPercent: -38,
                autoAlpha: 0,
                scale: .96,
                duration: .28,
                ease: 'none',
              }, position + .72)
            }
          })
        }

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

    const refreshScrollScenes = () => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }
    refreshRafId = window.requestAnimationFrame(refreshScrollScenes)
    document.fonts.ready.then(() => {
      if (root.isConnected) refreshScrollScenes()
    })
    window.addEventListener('load', refreshScrollScenes, { once: true })

    return () => {
      ctx.revert()
      if (rafId) cancelAnimationFrame(rafId)
      if (refreshRafId) cancelAnimationFrame(refreshRafId)
      window.removeEventListener('load', refreshScrollScenes)
      lenis?.destroy()
    }
  }, [route])

  return (
    <div className="page" ref={rootRef}>
      <header className="site-nav">
        <a className="logo" href="#top" aria-label="GreenLabz Studio Start" onClick={(event) => { event.preventDefault(); navigate('home') }}>
          <LogoMark />
        </a>

        <a className="nav-cta" href="#calendar">
          <span className="cta-dots" aria-hidden="true" />
          <span className="cta-label nav-cta-label-full">Kostenloses Erstgespräch</span>
          <span className="cta-label nav-cta-label-short">Kostenloses Erstgespräch</span>
          <ArrowRight size={16} />
        </a>
        <button className="menu" type="button" aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
          <LogoMark className="menu-logo" />
          {isMenuOpen ? <span className="menu-close-mark" aria-hidden="true">×</span> : <Menu size={19} />}
        </button>
      </header>
      {isMenuOpen && (
        <nav className="menu-panel" aria-label="Hauptnavigation" data-lenis-prevent>
          <div className="menu-panel-head"><span>[00] NAVIGATION</span><span>GreenLabz Studio</span></div>
          <div className="menu-links">
            <a href="#top" onClick={() => setIsMenuOpen(false)}><span>01</span>Startseite<ArrowUpRight size={17} /></a>
            <a href="#cases" onClick={() => setIsMenuOpen(false)}><span>02</span>Projekte &amp; Ergebnisse<ArrowUpRight size={17} /></a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}><span>03</span>Leistungen<ArrowUpRight size={17} /></a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}><span>04</span>Investition<ArrowUpRight size={17} /></a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}><span>05</span>Fragen &amp; Antworten<ArrowUpRight size={17} /></a>
            <a href="#calendar" onClick={() => setIsMenuOpen(false)}><span>06</span>Kostenloses Erstgespräch<ArrowUpRight size={17} /></a>
            <a href="#ratgeber" onClick={(event) => { event.preventDefault(); setIsMenuOpen(false); navigate('ratgeber') }}><span>07</span>Ratgeber<ArrowUpRight size={17} /></a>
            <a href="#skills" onClick={(event) => { event.preventDefault(); setIsMenuOpen(false); navigate('skills') }}><span>08</span>Claude Skills<ArrowUpRight size={17} /></a>
            <a href="#contact" onClick={(event) => { event.preventDefault(); setIsMenuOpen(false); setIsContactModalOpen(true) }}><span>09</span>Kontakt<ArrowUpRight size={17} /></a>
          </div>
        </nav>
      )}
      {route === 'ratgeber' ? (
        <Suspense fallback={<div style={{minHeight:'100vh'}} />}>
          <RatgeberPage onNavigate={navigate} initialArticleSlug={articleSlug} />
        </Suspense>
      ) : route === 'skills' ? (
        <Suspense fallback={<div style={{minHeight:'100vh'}} />}>
          <ClaudeSkillsPage onNavigate={navigate} initialSkillId={skillSlug} />
        </Suspense>
      ) : (
<main>
        <CinematicHero onOpenDatenschutz={() => setIsDatenschutzModalOpen(true)} />
        <section className="hero-section legacy-hero-section" aria-hidden="true">
          <div className="hero-copy hero-text-wrapper">
            <div className="hero-text-block hero-primary-block">
            <SectionLabel number="01" label="Webdesign für inhabergeführte Betriebe" />
            <h1 className="hero-title" aria-label="Umsatzstarke Websites und Individualsoftware, die deine Marke digital dominieren lassen.">
              <span className="line">Umsatzstarke</span>
              <span className="line"><span className="hero-highlight">Websites</span> &amp;</span>
              <span className="line">Software</span>
              <span className="line"><span className="hero-highlight">die verkaufen.</span></span>
            </h1>
            <p>
              Wir entwickeln ultraschnelle Websites und digitale Systeme, die Besucher in qualifizierte
              Anfragen verwandeln. Direkt umgesetzt - als Website oder Web-App, nicht als einfache Standard-Website. Ab 1.190 EUR Festpreis.
            </p>
            <p className="hero-audience">Für Zahnarztpraxen, Handwerksbetriebe, Physiotherapeuten, Heilpraktiker und Unternehmen, bei denen Vertrauen den Unterschied macht.</p>
            </div>
            <div className="hero-text-block hero-support-block">
            <div className="hero-actions">
              <PrimaryCta onClick={scrollToCalendar}>Kostenloses Erstgespräch</PrimaryCta>
              <a className="btn secondary" href="#cases"><span className="cta-dot" /><span className="cta-label">Projekte ansehen</span></a>
            </div>
            <div className="metrics" aria-label="GreenLabz Studio Nutzen">
              <div><Handshake className="metric-icon metric-icon-one" size={17} /><strong>1:1</strong><span>Direkt mit mir</span></div>
              <div><ScanSearch className="metric-icon metric-icon-search" size={17} /><strong>SEO</strong><span>Google & KI-Suche</span></div>
              <div><Ban className="metric-icon metric-icon-zero" size={17} /><strong>0</strong><span>Agentur-Blabla</span></div>
            </div>
          </div>
          </div>

          <div className="hero-visual hero-cinematic-visual">
            <div aria-hidden="true" />
          </div>

        </section>

        <section className="social-proof-bar" data-reveal aria-label="Vertrauen, das man sieht">
          <p>Vertrauen, das man sieht</p>
          <div className="social-proof-marquee" role="region" aria-label="Ausgewählte Kundenlogos">
            <div className="social-proof-track">
              {[0, 1].map((set) => (
                <div className="social-proof-set" key={set} aria-hidden={set === 1}>
                  {socialProofLogos.map((logo) => <img key={`${set}-${logo.alt}`} src={logo.src} alt={set === 0 ? logo.alt : ''} />)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section problem-section">
          <div className="section-head" data-reveal>
            <SectionLabel number="01" label="Problem" />
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

        <section className="section agitation-section">
          <div className="section-head" data-reveal>
            <SectionLabel number="02" label="Agitation / Konkrete Konsequenzen" />
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
            <SectionLabel number="03" label="Leistungen / Was ich mache" />
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
              <SectionLabel number="04" label="Warum das wichtig ist" />
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
            SEO und GEO-Optimierung sind mit ein Bestandteil jeder Website, die ich baue.
          </p>
        </section>

        <div className="mobile-importance-stage">
        <section className="section mobile-importance-section">
          <div className="section-head">
            <SectionLabel number="05" label="Mobile First" />
            <h2>Warum <span className="text-accent">Mobil</span> so <span className="text-accent">Wichtig</span> ist</h2>
          </div>
          <div className="mobile-beat-copy" aria-live="polite">
            <article className="mobile-beat-copy-state">
              <span className="mobile-beat-kicker">[01] ERSTER EINDRUCK</span>
              <h3>In 0,05 Sekunden entscheidet sich, ob ein Besucher bleibt oder wieder geht.</h3>
            </article>
            <article className="mobile-beat-copy-state">
              <span className="mobile-beat-kicker">[02] MOBILE TRAFFIC</span>
              <h3>8 von 10 Menschen suchen deine Branche zuerst auf dem Handy, nicht am PC.</h3>
            </article>
            <article className="mobile-beat-copy-state">
              <span className="mobile-beat-kicker">[03] MOBILE VERLUSTE</span>
              <h3>Jeder zweite Besucher verlässt eine Seite sofort wieder, wenn sie am Handy nicht richtig funktioniert.</h3>
            </article>
            <article className="mobile-beat-copy-state">
              <span className="mobile-beat-kicker">[04] WETTBEWERBSVORTEIL</span>
              <h3>Wer am Handy überzeugt, gewinnt den Kunden, bevor die Konkurrenz überhaupt geöffnet hat.</h3>
            </article>
          </div>
          <div className="mobile-model-visual" aria-label="Smartphone-Modell aus dem Hero">
            <CinematicPhone showBadges={false} staticView />
          </div>
        </section>
        </div>

        <TechStackSection />

        <IndustriesSection />

        <section className="section work-section" id="cases" data-reveal>
          <div className="section-head">
            <SectionLabel number="08" label="Projekte / Case Studies" />
            <h2>Kein <span className="text-accent">Blabla</span>. Nur fertige Websites.</h2>
          </div>
          <article className="featured-case">
            <div className="featured-case-header">
              <div className="featured-case-intro-block">
                <span className="case-kicker">{featuredCase.label}</span>
                <h3>{featuredCase.title}</h3>
                <p>{featuredCase.intro}</p>
              </div>
            </div>

            <div className="featured-case-visuals" aria-label="Interaktiver Vorher und Nachher Vergleich">
              <BeforeAfterSlider />
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

        <GoogleReviewsSection />

        <section className="section promises-section" data-reveal>
          <div className="section-head">
            <SectionLabel number="10" label="MEIN VERSPRECHEN" />
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
          <div className="method-tabs" role="tablist" aria-label="GreenLabz Studio Methode">
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

        <HeroBendGallery />

        <section className="section pricing-section" id="pricing" data-reveal>
          <div className="section-head pricing-head">
            <SectionLabel number="11" label="Investition" />
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
                  <span className="cta-label">Kostenloses Erstgespräch</span>
                </a>
              </article>
            ))}
          </div>
          <div className="maintenance-section">
            <div className="maintenance-head">
              <h3>Dein Erfolg ist kein einmal Projekt</h3>
              <p>Google findet dich ständig. Ich halte deine Website sicher, schnell und ganz oben.</p>
            </div>
            <div className="maintenance-grid">
              <article className="pricing-card maintenance-card">
                <div className="card-top-icon">
                  <ShieldCheck size={20} className="text-accent" />
                  <h4>Pflege Basis</h4>
                </div>
                <div className="card-price-row">
                  <strong>59 €</strong><span>/ Monat</span>
                </div>
                <p className="card-subtext">Die Website bleibt sicher, aktuell und erreichbar.</p>
                <ul>
                  <li><Check size={14} /> Updates, Backups &amp; Sicherheits-Monitoring</li>
                  <li><Check size={14} /> Uptime-Überwachung</li>
                  <li><Check size={14} /> Kleine Anpassungen (30 Min. / Monat)</li>
                  <li><Check size={14} /> E-Mail-Support</li>
                </ul>
                <button type="button" className="pricing-cta" onClick={() => openPflegeAnfrage('Pflege Basis')}>
                  <span className="cta-label">Paket anfragen</span>
                </button>
              </article>

              <article className="pricing-card maintenance-card featured">
                <span className="pricing-badge">Empfohlen</span>
                <div className="card-top-icon">
                  <Wrench size={20} className="text-accent" />
                  <h4>Pflege Business</h4>
                </div>
                <div className="card-price-row">
                  <strong>129 €</strong><span>/ Monat</span>
                </div>
                <p className="card-subtext">Laufende Änderungen und Technik in guten Händen.</p>
                <ul>
                  <li><Check size={14} /> Alles aus Pflege Basis</li>
                  <li><Check size={14} /> Änderungen &amp; Content-Updates (2 Std. / Monat)</li>
                  <li><Check size={14} /> Performance- &amp; Core-Web-Vitals-Checks</li>
                  <li><Check size={14} /> Prio-Support mit fester Reaktionszeit</li>
                </ul>
                <button type="button" className="pricing-cta" onClick={() => openPflegeAnfrage('Pflege Business')}>
                  <span className="cta-dots" aria-hidden="true" />
                  <span className="cta-label">Paket anfragen</span>
                </button>
              </article>

              <article className="pricing-card maintenance-card">
                <div className="card-top-icon">
                  <Sparkles size={20} className="text-accent" />
                  <h4>Pflege Premium</h4>
                </div>
                <div className="card-price-row">
                  <strong>249 €</strong><span>/ Monat</span>
                </div>
                <p className="card-subtext">Pflege plus laufende Sichtbarkeit und Beratung.</p>
                <ul>
                  <li><Check size={14} /> Alles aus Pflege Business</li>
                  <li><Check size={14} /> Laufende SEO-Pflege &amp; Monats-Report</li>
                  <li><Check size={14} /> SEO-Dashboard inklusive</li>
                  <li><Check size={14} /> Strategie-Call pro Quartal</li>
                </ul>
                <button type="button" className="pricing-cta" onClick={() => openPflegeAnfrage('Pflege Premium')}>
                  <span className="cta-label">Paket anfragen</span>
                </button>
              </article>
            </div>
          </div>

          {/* Enterprise & Custom Web-App Section (2 Cards Grid) */}
          <div className="custom-apps-section">
            <div className="maintenance-head">
              <h3>Shop, E-Commerce &amp; Web-Apps</h3>
              <p>Komplexe digitale Systeme, maßgeschneidert für deinen Verkaufserfolg.</p>
            </div>
            <div className="custom-apps-grid">
              <article className="pricing-card custom-app-card">
                <div className="card-top-icon">
                  <ReceiptText size={22} className="text-accent" />
                  <div>
                    <h4>Shop &amp; E-Commerce</h4>
                    <p className="card-subtext">Verkaufen mit einem eigenen Onlineshop.</p>
                  </div>
                </div>
                <div className="custom-app-price-box">
                  <div className="price-main">
                    <span className="price-kicker">[PREIS]</span>
                    <strong>Auf Anfrage</strong>
                  </div>
                  <span className="price-sub">je nach Umfang</span>
                </div>
                <ul>
                  <li><Check size={14} /> Shop-System mit Produktverwaltung</li>
                  <li><Check size={14} /> Stripe-Zahlungen &amp; Versand-Integration</li>
                  <li><Check size={14} /> Individuelles Shop-Theme &amp; Branding</li>
                  <li><Check size={14} /> Bestell- &amp; Kundenverwaltung</li>
                  <li><Check size={14} /> SEO- &amp; Conversion-Optimierung</li>
                  <li><Check size={14} /> Google Ads Kampagnen-Setup</li>
                </ul>
                <button type="button" className="pricing-cta" onClick={() => openPflegeAnfrage('Shop & E-Commerce')}>
                  <span className="cta-label">Shop &amp; E-Commerce anfragen</span>
                  <ArrowRight size={16} />
                </button>
              </article>

              <article className="pricing-card custom-app-card featured">
                <div className="card-top-icon">
                  <Code size={22} className="text-accent" />
                  <div>
                    <h4>Individuell &amp; Web-App</h4>
                    <p className="card-subtext">Maßgeschneiderte Systeme und Web-Apps.</p>
                  </div>
                </div>
                <div className="custom-app-price-box">
                  <div className="price-main">
                    <span className="price-kicker">[PREIS]</span>
                    <strong>Auf Anfrage</strong>
                  </div>
                  <span className="price-sub">individuelles Angebot</span>
                </div>
                <ul>
                  <li><Check size={14} /> Individuelle Web-App-Entwicklung</li>
                  <li><Check size={14} /> Stripe-Zahlungen, Abos &amp; Rechnungen</li>
                  <li><Check size={14} /> Schnittstellen &amp; API-Anbindungen</li>
                  <li><Check size={14} /> Logins, Rollen &amp; Dashboards</li>
                  <li><Check size={14} /> SEO-Dashboard &amp; SEO-Pflege</li>
                  <li><Check size={14} /> Laufende Betreuung &amp; Weiterentwicklung</li>
                </ul>
                <button type="button" className="pricing-cta" onClick={() => openPflegeAnfrage('Individuell & Web-App')}>
                  <span className="cta-dots" aria-hidden="true" />
                  <span className="cta-label">Individuell &amp; Web-App anfragen</span>
                  <ArrowRight size={16} />
                </button>
              </article>
            </div>
          </div>
        </section>

        <section className="section lead-magnet-section" id="freebie" data-reveal>
          <div className="lead-magnet-copy">
            <SectionLabel number="12" label="5-Minuten-Checkliste für deine Website" />
            <h2><span className="section-title-serif">Warum</span> deine Website <span className="section-title-serif">Kunden verliert.</span></h2>
            <p>
              Die 5-Minuten-Checkliste als PDF. Finde heraus, ob deine Website Vertrauen aufbaut, bei Google gefunden wird und echte Anfragen auslöst.
              100% kostenlos zum Downloaden.
            </p>
            <ul className="lead-magnet-points">
              <li><Check size={16} /> Die wichtigsten Seitenbereiche prüfen</li>
              <li><Check size={16} /> Mobile Stolperstellen erkennen</li>
              <li><Check size={16} /> Nächsten sinnvollen Schritt ableiten</li>
            </ul>
          </div>
          <div className="lead-magnet-form-wrap">
            {leadStatus === 'success' ? (
              <div className="lead-magnet-success" role="status">
                <Check size={22} />
                <strong>Deine 5-Minuten-Checkliste für deine Website ist bereit.</strong>
                <p>Der Download wurde gestartet. Prüfe bei Bedarf auch deinen Download-Ordner.</p>
              </div>
            ) : (
              <form className="lead-magnet-form" onSubmit={handleLeadSubmit}>
                <label htmlFor="lead-email">E-Mail-Adresse für deine 5-Minuten-Checkliste</label>
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
                <input type="hidden" name="_subject" value="5-Minuten-Checkliste für deine Website angefordert / Download ausgelöst" />
                <input type="hidden" name="_template" value="table" />
                <label className="lead-magnet-consent">
                  <input
                    type="checkbox"
                    checked={leadConsent}
                    onChange={(event) => setLeadConsent(event.target.checked)}
                    required
                  />
                  <span>
                    Ja, schickt mir die 5-Minuten-Checkliste für deine Website. Ich bin damit einverstanden, dass GreenLabz Studio mir regelmäßig per E-Mail Angebote und Tipps zu Webdesign &amp; SEO zusendet. Meine Einwilligung kann ich jederzeit widerrufen. Details in der{' '}
                    <button
                      type="button"
                      onClick={() => setIsDatenschutzModalOpen(true)}
                      style={{ background: 'none', border: 'none', padding: 0, color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}
                    >
                      Datenschutzerklärung
                    </button>.
                  </span>
                </label>
                <button className="btn primary lead-magnet-submit" type="submit" disabled={leadStatus === 'sending'}>
                  <span>{leadStatus === 'sending' ? 'Wird vorbereitet...' : '5-Minuten-Checkliste kostenlos herunterladen'}</span>
                  <Download size={17} />
                </button>
                {leadStatus === 'error' && <p className="lead-magnet-error" role="alert">Das hat gerade nicht funktioniert. Bitte versuche es erneut.</p>}
                <small>Kein Spam. Deine E-Mail-Adresse wird für die Zusendung der 5-Minuten-Checkliste und Tipps verwendet.</small>
              </form>
            )}
          </div>
        </section>

        <section className="section objections-section" id="faq" data-reveal>
          <div className="section-head">
            <SectionLabel number="13" label="Einwände / Stille Ängste" />
            <h2><span className="section-title-serif">Fragen</span> & <span className="section-title-serif">Antworten</span></h2>
            <p className="faq-intro">Häufige Fragen, klare Antworten. Damit du einschätzen kannst, ob GreenLabz Studio zu deinem Betrieb passt.</p>
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
            <SectionLabel number="14" label="About Me" />
            <h2><span className="section-title-serif">Warum</span> GreenLabz Studio <span className="section-title-serif">?</span></h2>
            <p>
              Hi, ich bin James Green. Ich entwickle maßgeschneiderte digitale Plattformen, die nicht nur auf den ersten Blick faszinieren, sondern deine Besucher gezielt in echte Kunden verwandeln. Dafür setze ich auf modernste KI-gestützte Entwicklungsprozesse. Sie machen mich schneller und präziser als klassische Agenturen und deine digitale Präsenz effizient, skalierbar und zukunftssicher. Mein Antrieb ist simpel: Meine Kunden sollen online so wirken wie sie wirklich sind. Professionell, vertrauenswürdig und einen Schritt voraus. Mein Fokus liegt auf einem Ding: deinem Umsatzwachstum durch smarte technologische Umsetzung. Ich freue mich darauf, mit dir zu arbeiten. Bis bald!
            </p>
          </div>
        </section>

        <section className="contact-section calendar-section" id="calendar" data-reveal>
          <SectionLabel number="15" label="Kostenloses Erstgespräch" />
          <h2><span className="section-title-serif">In drei Schritten</span> zum passenden Gespräch.</h2>
          <p>
            25 Minuten. Kein Verkaufstheater. Erst dein Anliegen, dann dein Termin.
          </p>
          <BookingFlow onOpenDatenschutz={() => setIsDatenschutzModalOpen(true)} />
        </section>



        <section className="section contact-section" id="contact" data-reveal>
          <SectionLabel number="16" label="Kontakt" />
          <h2><span className="section-title-serif">Lass</span> uns <span className="section-title-serif">reden</span></h2>
          <p>
            Erzähl mir von deinem nächsten Projekt oder stelle deine Frage. Klicke auf den Button unten, um mir direkt deine Nachricht zu senden.
            Ich antworte dir innerhalb von 24 Stunden mit den nächsten konkreten Schritten.
          </p>
          <PrimaryCta onClick={() => setIsContactModalOpen(true)}>Nachricht senden</PrimaryCta>
          <div className="contact-meta">
            <div>
              <span>E-Mail:</span>
              <strong>hello@greenlabz-studio.de</strong>
            </div>
            <div>
              <span>Telefon:</span>
              <strong>+49 160 4928749</strong>
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
        onOpenDatenschutz={() => setIsDatenschutzModalOpen(true)}
      />
      <PflegeModal
        isOpen={isPflegeModalOpen}
        onClose={() => setIsPflegeModalOpen(false)}
        packageName={selectedPflegePackage}
        onOpenDatenschutz={() => setIsDatenschutzModalOpen(true)}
      />
      <DatenschutzModal
        isOpen={isDatenschutzModalOpen}
        onClose={() => setIsDatenschutzModalOpen(false)}
      />
      <ImpressumModal
        isOpen={isImpressumModalOpen}
        onClose={() => setIsImpressumModalOpen(false)}
      />
      <CinematicFooter
        onPrimaryClick={scrollToCalendar}
        onContactClick={() => setIsContactModalOpen(true)}
        onNavigate={navigate}
        onOpenImpressum={() => setIsImpressumModalOpen(true)}
        onOpenDatenschutz={() => setIsDatenschutzModalOpen(true)}
      />
      <FloatingContactWidget />
    </div>
  )
}
