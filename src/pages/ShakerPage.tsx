import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Head } from 'vite-react-ssg'

interface ShakerPageProps {
  onNavigate: (route: string) => void
  onBookCall: () => void
}

const shakerScreens = [
  {
    image: '/assets/apps/shaker-screen1.png',
    alt: 'The Shaker Teamübersicht mit Dienststatus und Wochenstunden',
    label: 'Teamübersicht',
    title: 'Das ganze Team auf einen Blick',
    text: 'Teamgröße, aktuelle Besetzung, offene Schichten und Wochenstunden stehen direkt oben. Darunter sieht die Barleitung, wer wann arbeitet und welche Rolle übernimmt.',
  },
  {
    image: '/assets/apps/shaker-screen2.png',
    alt: 'The Shaker Einstellungen für Konto, Benachrichtigungen und Darstellung',
    label: 'Einstellungen',
    title: 'Einstellungen ohne Umwege',
    text: 'Konto, Benachrichtigungen, Darstellung und rechtliche Angaben liegen an einem festen Ort. Wichtige Optionen bleiben schnell erreichbar, ohne den Schichtplan zu überladen.',
  },
  {
    image: '/assets/apps/shaker-screen3.png',
    alt: 'The Shaker Formular zum Bearbeiten einer Schicht',
    label: 'Schichtplanung',
    title: 'Schichten in wenigen Schritten planen',
    text: 'Schichttyp, Datum, Uhrzeit und Team werden in einem klaren Ablauf erfasst. Hinweise für Vorbereitung oder Übergabe lassen sich direkt an der Schicht speichern.',
  },
  {
    image: '/assets/apps/shaker-screen4.png',
    alt: 'The Shaker Wochenplan mit offenen und besetzten Schichten',
    label: 'Wochenplan',
    title: 'Der Wochenplan zeigt, was wirklich zählt',
    text: 'Besetzte Zeiten, Teammitglieder und offene Plätze sind sofort erkennbar. Die Barleitung erkennt Lücken früh und kann neue Schichten direkt aus der Wochenansicht anlegen.',
  },
  {
    image: '/assets/apps/shaker-screen5.png',
    alt: 'The Shaker Bar-Verwaltung mit Bereichen und Vorbereitungsliste',
    label: 'Bar-Verwaltung',
    title: 'Barbereiche und Vorbereitung zusammenführen',
    text: 'Main Bar, Terrasse und Lounge erhalten eigene Kapazitäten und Zuständigkeiten. Die Vorbereitungsliste verbindet Aufgaben mit dem Dienstplan, damit vor Öffnung nichts liegen bleibt.',
  },
  {
    image: '/assets/apps/shaker-screen6.png',
    alt: 'The Shaker Mitarbeiterprofil mit Schichten und Arbeitsstatistik',
    label: 'Mitarbeiterprofil',
    title: 'Jede Person kennt ihren nächsten Einsatz',
    text: 'Im Profil sehen Teammitglieder ihre Stunden, Schichten, Rolle und Pünktlichkeit. Persönliche Daten und kommende Einsätze bleiben verständlich gebündelt.',
  },
]

function ShakerPhone({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="shaker-detail-phone" aria-label={alt}>
      <div className="gl-exact-phone-bezel app-phone-frame">
        <div className="gl-exact-hardware gl-exact-hardware-left-one" />
        <div className="gl-exact-hardware gl-exact-hardware-left-two" />
        <div className="gl-exact-hardware gl-exact-hardware-right" />
        <div className="gl-exact-screen">
          <div className="gl-exact-screen-glare" />
          
          <div className="gl-exact-screen-content gl-custom-mockup-screen">
            <img className="shaker-detail-screen" src={image} alt={alt} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShakerPage({ onNavigate, onBookCall }: ShakerPageProps) {
  return (
    <>
      <Head>
        <title>The Shaker | Mobile Dienstplanung für Gastronomie</title>
        <meta name="description" content="The Shaker bündelt Wochenplan, Team, Barbereiche und persönliche Schichten in einer mobilen Anwendung." />
      </Head>
      <main className="shaker-detail-page" id="top">
      <section className="shaker-detail-hero">
        <button className="shaker-detail-back" type="button" onClick={() => onNavigate('home#lab')}>
          <ArrowLeft size={17} /> Zurück zur Hauptseite
        </button>
        <div className="shaker-detail-hero-copy">
          <p className="shaker-detail-kicker">The Shaker · Dienstplanung für Gastronomie</p>
          <h1><span className="shaker-detail-highlight">Dienstplanung, die</span> im Baralltag <span className="shaker-detail-highlight">funktioniert.</span></h1>
          <p className="shaker-detail-lead">
            The Shaker verbindet Wochenplan, Team, Barbereiche und persönliche Schichten in einer mobilen Anwendung. Weniger Abstimmung im Chat. Mehr Klarheit vor, während und nach dem Service.
          </p>
        </div>
      </section>

      <div className="shaker-detail-flow">
        {shakerScreens.map((screen, index) => (
          <section className={`shaker-detail-row${index % 2 ? ' is-reversed' : ''}`} key={screen.image}>
            <div className="shaker-detail-visual">
              <ShakerPhone image={screen.image} alt={screen.alt} />
            </div>
            <div className="shaker-detail-copy">
              <p>{screen.label}</p>
              <h2>{screen.title}</h2>
              <p>{screen.text}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="shaker-detail-cta">
        <div className="shaker-detail-cta-copy">
          <p>Dein nächster Schritt</p>
          <h2>Bereit für <span className="shaker-detail-highlight">weniger</span> Dienstplan-<span className="shaker-detail-highlight">Chaos</span>?</h2>
        </div>
        <button className="btn primary shaker-detail-booking" type="button" onClick={onBookCall}>
          <span className="cta-label">Unverbindliches Erstgespräch</span>
          <span className="cta-dots" aria-hidden="true" />
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </section>
      </main>
    </>
  )
}
