import { ArrowLeft, Mail, Phone } from 'lucide-react'
import './LegalPage.css'

type LegalPageProps = {
  type: 'impressum' | 'datenschutz'
}

export default function LegalPage({ type }: LegalPageProps) {
  const isImpressum = type === 'impressum'

  return (
    <main className="legal-page">
      <div className="legal-page-aurora" aria-hidden="true" />
      <div className="legal-page-inner">
        <a className="legal-page-back" href="/">
          <ArrowLeft size={17} aria-hidden="true" /> Zur Startseite
        </a>

        <header className="legal-page-header">
          <span className="legal-page-kicker">GREENLABZ STUDIO · RECHTLICHES</span>
          <h1>{isImpressum ? 'Impressum' : 'Datenschutzerklärung'}</h1>
          <p>{isImpressum ? 'Anbieterkennzeichnung und Kontakt.' : 'Informationen zur Verarbeitung deiner Daten.'}</p>
        </header>

        <article className="legal-page-card">
          {isImpressum ? <ImpressumContent /> : <DatenschutzContent />}
        </article>

        <footer className="legal-page-footer">
          <a href="mailto:hallo@greenlabz.de"><Mail size={15} /> hallo@greenlabz.de</a>
          <a href="tel:+491604928746"><Phone size={15} /> +49 160 4928746</a>
          <span>© 2026 GreenLabz Studio</span>
        </footer>
      </div>
    </main>
  )
}

function ImpressumContent() {
  return (
    <>
      <section><h2>Angaben gemäß § 5 DDG</h2><p><strong>GreenLabz Studio</strong><br />Inhaber: James Green<br />Baden-Württemberg, Deutschland</p></section>
      <section><h2>Kontakt</h2><p>Telefon: +49 160 4928746<br />E-Mail: <a href="mailto:hallo@greenlabz.de">hallo@greenlabz.de</a></p></section>
      <section><h2>Verbraucherstreitbeilegung</h2><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></section>
    </>
  )
}

function DatenschutzContent() {
  return (
    <>
      <p className="legal-page-date">Stand: Juli 2026 · GreenLabz Studio</p>
      <section><h2>1. Verantwortlicher</h2><p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p><p><strong>GreenLabz Studio</strong><br />E-Mail: <a href="mailto:hallo@greenlabz.de">hallo@greenlabz.de</a><br />Telefon: +49 160 4928746</p></section>
      <section><h2>2. Datenerfassung bei Website-Audits und PDF-Downloads</h2><p>Bei Nutzung unseres Website-Audit-Tools oder beim Anfordern eines PDF-Reports verarbeiten wir Website-Domain beziehungsweise URL, E-Mail-Adresse, gegebenenfalls Name und erzeugte Analyse-Ergebnisse.</p><p><strong>Zweck:</strong> technische Durchführung der Analyse, Erstellung und Zustellung des Reports sowie Kontaktaufnahme zur Besprechung der Ergebnisse.</p><p>Für E-Mail-Marketing verwenden wir deine Adresse nur mit Einwilligung. Du kannst diese jederzeit per Abmeldelink oder Nachricht an <a href="mailto:hallo@greenlabz.de">hallo@greenlabz.de</a> widerrufen.</p></section>
      <section><h2>3. Rechtsgrundlagen</h2><p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO für vorvertragliche Maßnahmen und Art. 6 Abs. 1 lit. a DSGVO für Einwilligungen.</p></section>
      <section><h2>4. Empfänger und eingesetzte Dienste</h2><p>Wir nutzen Vercel Inc. für Hosting und Infrastruktur, einen SMTP-Mail-Provider für E-Mail-Zustellung sowie die Google Sheets API für die strukturierte Verwaltung von Anfragen.</p></section>
      <section><h2>5. Speicherdauer</h2><p>Wir speichern Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder bis du deine Einwilligung widerrufst beziehungsweise die Löschung verlangst.</p></section>
      <section><h2>6. Deine Rechte</h2><p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Beschwerde bei einer Datenschutz-Aufsichtsbehörde.</p></section>
    </>
  )
}
