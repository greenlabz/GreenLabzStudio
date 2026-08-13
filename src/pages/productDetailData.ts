export type ProductVisualType = 'phone' | 'browser' | 'leadradar'

export interface ProductDetailScene {
  label: string
  title: string
  text: string
  image?: string
  alt: string
  visual: ProductVisualType
  focus?: 'full' | 'left' | 'right'
  variant?: 'leads' | 'stats' | 'filters'
}

export interface ProductDetailContent {
  id: string
  heroTitle: Array<{ text: string; highlight?: boolean }>
  lead: string
  ctaTitle: string | Array<{ text: string; highlight?: boolean }>
  scenes: ProductDetailScene[]
}

export const productDetailContent: Record<string, ProductDetailContent> = {
  pricebolt: {
    id: 'pricebolt',
    heroTitle: [
      { text: 'Angebote, ', highlight: true },
      { text: 'bevor Rückfragen Zeit ' },
      { text: 'kosten', highlight: true },
      { text: '.' },
    ],
    lead: 'PriceBolt führt Interessenten durch einen klaren Angebotsprozess. Leistung, Umfang, Bilder und Kontaktdaten werden strukturiert erfasst – direkt auf dem Smartphone.',
    ctaTitle: 'Ein Angebotsprozess, der zu deinem Betrieb passt?',
    scenes: [
      { label: 'Einstieg', title: 'Der Nutzen steht sofort fest', text: 'Der Startbildschirm erklärt das Ergebnis in einem Satz und führt ohne Umwege in die Anfrage.', image: '/assets/apps/pricebolt-screen1.png', alt: 'PriceBolt Startbildschirm mit Angebot in 60 Sekunden', visual: 'phone' },
      { label: 'Schritt 1', title: 'Die passende Leistung auswählen', text: 'Interessenten wählen zuerst die benötigte Hauptleistung. Dadurch bleibt der weitere Ablauf kurz und relevant.', image: '/assets/apps/pricebolt-screen2.png', alt: 'PriceBolt Auswahl der gewünschten Handwerksleistung', visual: 'phone' },
      { label: 'Schritt 2', title: 'Projektumfang verständlich erfassen', text: 'Fläche und Räume werden mit wenigen Eingaben bestimmt. Der Betrieb erhält früh eine brauchbare Größenordnung.', image: '/assets/apps/pricebolt-screen3.png', alt: 'PriceBolt Eingabe von Fläche und Raumanzahl', visual: 'phone' },
      { label: 'Schritt 3', title: 'Bilder ersetzen lange Beschreibungen', text: 'Fotos zeigen Zustand, Raum und Besonderheiten. So lassen sich Aufwand und Rückfragen besser einschätzen.', image: '/assets/apps/pricebolt-screen4.png', alt: 'PriceBolt Upload von Projektfotos', visual: 'phone' },
      { label: 'Schritt 4', title: 'Kontaktdaten erst am richtigen Moment', text: 'Die Anfrage ist bereits konkret, bevor persönliche Angaben folgen. Das macht den Abschluss nachvollziehbar.', image: '/assets/apps/pricebolt-screen5.png', alt: 'PriceBolt Formular für Kontaktdaten', visual: 'phone' },
      { label: 'Abschluss', title: 'Klare Bestätigung statt Ungewissheit', text: 'Nach dem Absenden sieht der Interessent sofort, was passiert und wann der Betrieb antwortet.', image: '/assets/apps/pricebolt-screen6.png', alt: 'PriceBolt Bestätigung einer gesendeten Anfrage', visual: 'phone' },
    ],
  },
  vnpro: {
    id: 'vnpro',
    heroTitle: [
      { text: 'Vorher', highlight: true },
      { text: ' und ' },
      { text: 'Nachher', highlight: true },
      { text: ', sofort ' },
      { text: 'verständlich', highlight: true },
      { text: '.' },
    ],
    lead: 'vnPro bündelt Projektgalerie, Vorher-Nachher-Editor, Upload, Einbettung und Branding in einer mobilen Oberfläche für Praxen und Detail-Handwerk.',
    ctaTitle: 'Deine Ergebnisse verdienen eine klare Präsentation?',
    scenes: [
      { label: 'Projektgalerie', title: 'Alle Veränderungen an einem Ort', text: 'Abgeschlossene und laufende Projekte erscheinen mit Status, Datum und direktem Vorher-Nachher-Vergleich.', image: '/assets/apps/vnpro-screen1.png', alt: 'vnPro Projektgalerie mit Vorher-Nachher-Projekten', visual: 'phone' },
      { label: 'Editor', title: 'Vergleiche direkt vorbereiten', text: 'Slider, Split und Fade lassen sich pro Projekt einstellen. Die Vorschau zeigt sofort, wie das Ergebnis wirkt.', image: '/assets/apps/vnpro-screen2.png', alt: 'vnPro Editor für einen Vorher-Nachher-Vergleich', visual: 'phone' },
      { label: 'Upload', title: 'Neue Projekte in wenigen Schritten anlegen', text: 'Vorher- und Nachher-Aufnahmen werden getrennt hochgeladen und eindeutig einem Projekt zugeordnet.', image: '/assets/apps/vnpro-screen3.png', alt: 'vnPro Upload für Vorher- und Nachher-Bilder', visual: 'phone' },
      { label: 'Embed & Export', title: 'Vergleiche auf der eigenen Website zeigen', text: 'Ein fertiger Einbettungscode bringt den Vergleich in bestehende Websites – responsiv und ohne manuelle Nacharbeit.', image: '/assets/apps/vnpro-screen4.png', alt: 'vnPro Embed und Export Ansicht', visual: 'phone' },
      { label: 'Branding', title: 'Die Darstellung bleibt Teil der Marke', text: 'Studioname, Farben und Erscheinungsbild werden zentral gepflegt und auf veröffentlichte Projekte angewendet.', image: '/assets/apps/vnpro-screen5.png', alt: 'vnPro Einstellungen für Studio-Branding', visual: 'phone' },
      { label: 'Mobile Übersicht', title: 'Aktuelle Fälle bleiben griffbereit', text: 'Die mobile Projektliste zeigt Status, Datum und Motiv ohne verschachtelte Navigation.', image: '/assets/apps/vnpro-screen6.png', alt: 'vnPro mobile Übersicht aktueller Projekte', visual: 'phone' },
      { label: 'Mobiler Fall', title: 'Dokumentation direkt vor Ort starten', text: 'Neue Fälle können mit Kamera oder Galerie erfasst werden, wenn die Veränderung gerade sichtbar ist.', image: '/assets/apps/vnpro-screen7.png', alt: 'vnPro mobiler Upload für einen neuen Fall', visual: 'phone' },
    ],
  },
  leadradar: {
    id: 'leadradar',
    heroTitle: [
      { text: 'Relevante Leads, ', highlight: true },
      { text: 'bevor sie kalt werden.' },
    ],
    lead: 'LeadRadar bündelt regionale Firmensignale, Website-Mängel und Bewertungsdaten in einer mobilen Arbeitsansicht für die gezielte Akquise.',
    ctaTitle: 'Du brauchst ein eigenes Recherche- und Lead-System?',
    scenes: [
      { label: 'Live Feed', title: 'Neue Chancen erscheinen laufend', text: 'Region, Quelle und auffällige Signale stehen direkt am Lead. Das Team erkennt schnell, wo eine Kontaktaufnahme sinnvoll ist.', alt: 'LeadRadar Live Feed mit regionalen Neukunden-Leads', visual: 'leadradar', variant: 'leads' },
      { label: 'Auswertung', title: 'Signale werden vergleichbar', text: 'Gefundene Betriebe, neue Einträge und Qualitätswerte werden in einer kompakten mobilen Auswertung zusammengeführt.', alt: 'LeadRadar Auswertung der gefundenen Leads', visual: 'leadradar', variant: 'stats' },
      { label: 'Filter', title: 'Nur passende Betriebe bleiben übrig', text: 'Region, Branche und Signalstärke grenzen die Liste ein. So wird aus einer großen Datenmenge eine konkrete Arbeitsliste.', alt: 'LeadRadar Filter für Region und Lead-Qualität', visual: 'leadradar', variant: 'filters' },
    ],
  },
  'greenlabz-crm': {
    id: 'greenlabz-crm',
    heroTitle: [
      { text: 'Alle', highlight: true },
      { text: ' Kundenprojekte ' },
      { text: 'Ein', highlight: true },
      { text: ' klarer ' },
      { text: 'Stand', highlight: true },
    ],
    lead: 'GreenLabz CRM verbindet Anfragen, Projektphasen, Kunden, Wartung und Rechnungen in einem zentralen Arbeitsbereich.',
    ctaTitle: [
      { text: 'Deine ' },
      { text: 'Abläufe', highlight: true },
      { text: ' brauchen weniger ' },
      { text: 'Einzeltools', highlight: true },
      { text: '?' },
    ],
    scenes: [
      { label: 'Customer Pipeline', title: 'Jedes Projekt hat einen sichtbaren Stand', text: 'Entdeckung, Angebot und Prüfung sind als echte Arbeitsphasen organisiert. Offene Aufgaben bleiben dort, wo sie hingehören.', image: '/assets/apps/greenlabz-crm-stitch-image1.png', alt: 'GreenLabz CRM Customer Pipeline', visual: 'browser', focus: 'full' },
      { label: 'Kundenakte', title: 'Kunden, Projekte und Aktivitäten bleiben verbunden', text: 'Die Kundenakte bündelt Kontaktdaten, laufende Projekte, nächste Schritte und die jüngsten Aktivitäten an einem Ort.', image: '/assets/apps/greenlabz-crm-stitch-image2.png', alt: 'GreenLabz CRM Kundendetail und Projektstatus', visual: 'browser', focus: 'right' },
      { label: 'Dashboard', title: 'Der tägliche Überblick bleibt zentral', text: 'Aktive Leads, Projekte, Wartungen und überfällige Aufgaben stehen direkt im Dashboard – inklusive dringender Aufgaben und Live-Aktivität.', image: '/assets/apps/greenlabz-crm-stitch-image3.png', alt: 'GreenLabz CRM Dashboard mit Aufgaben und Live-Aktivität', visual: 'browser', focus: 'left' },
    ],
  },
  repute: {
    id: 'repute',
    heroTitle: [
      { text: 'Mehr echte Bewertungen. ', highlight: true },
      { text: 'Weniger Nachfassen.' },
    ],
    lead: 'Repute automatisiert Bewertungsanfragen, Follow-ups und die tägliche Übersicht für Praxen und Dienstleistungsbetriebe.',
    ctaTitle: 'Bewertungen sollen nicht mehr im Alltag untergehen?',
    scenes: [
      { label: 'Dashboard', title: 'Der Ruf des Betriebs auf einen Blick', text: 'Anfragen, erhaltene Bewertungen und Durchschnittswert stehen zusammen mit dem aktuellen Verlauf auf einer Seite.', image: '/assets/apps/repute-stitch-image1.png', alt: 'Repute Patienten- und Terminübersicht', visual: 'browser', focus: 'full' },
      { label: 'Automatisierung', title: 'Follow-ups laufen verlässlich weiter', text: 'Neue Anfragen und automatische Erinnerungen erscheinen im Aktivitätsbereich. Fehlgeschlagene Zustellungen bleiben sichtbar.', image: '/assets/apps/repute-stitch-image2.png', alt: 'Repute Einstellungen und Integrationen', visual: 'browser', focus: 'right' },
      { label: 'Entwicklung', title: 'Der Bewertungstrend wird messbar', text: 'Die Monatsansicht zeigt, ob Bewertungsanfragen tatsächlich zu mehr und besseren Rückmeldungen führen.', image: '/assets/apps/repute-stitch-image3.png', alt: 'Repute Bewertungsanfrage und Nachrichtenautomatisierung', visual: 'browser', focus: 'left' },
    ],
  },
}
