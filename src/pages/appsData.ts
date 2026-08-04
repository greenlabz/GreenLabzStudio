export interface AppProject {
  id: string
  name: string
  kicker: string
  badge: 'SaaS' | 'Internal Tool' | 'Labor-Projekt'
  status: 'Live in Produktion' | 'In aktiver Entwicklung' | 'Interne Nutzung'
  statusType: 'live' | 'dev' | 'internal'
  tagline: string
  problem: string
  solution: string
  result: string
  techStack: string[]
  previewImage: string
  demoUrl?: string
}

export const appProjects: AppProject[] = [
  {
    id: 'scrapemaster-pro',
    name: 'ScrapeMaster Pro',
    kicker: 'AUTOMATISIERUNG & DATA',
    badge: 'SaaS',
    status: 'Live in Produktion',
    statusType: 'live',
    tagline: 'Nutzerfreundliche Lead-Generierung und Daten-Extraktion für Vertriebsprozesse im DACH-Raum.',
    problem: 'Manuelle Recherche von Kontaktdaten und Firmendaten raubt im Vertrieb viele Stunden pro Woche und führt oft zu veralteten Datensätzen.',
    solution: 'ScrapeMaster Pro automatisiert die Extraktion von öffentlich zugänglichen Kontakten, bereinigt Dubletten und liefert strukturierte Datensätze direkt als CSV oder API-Export.',
    result: 'Über 80 Prozent Zeitersparnis bei der wöchentlichen Lead-Recherche und sofort einsatzbereite Kontaktdaten für den Mittelstand.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Vercel Edge'],
    previewImage: '/assets/apps/scrapemaster-preview.png',
    demoUrl: 'https://greenlabz-studio.de',
  },
  {
    id: 'geo-auditor',
    name: 'SEO & GEO Engine',
    kicker: 'SUCHMASCHINEN-ANALYSE',
    badge: 'Internal Tool',
    status: 'Interne Nutzung',
    statusType: 'internal',
    tagline: 'Echtzeit-Analyse für Google und KI-Suchmaschinen zur automatisierten Identifikation technischer Ranking-Hürden.',
    problem: 'Klassische SEO-Tools berücksichtigen die neue Logik von KI-Suchmaschinen wie ChatGPT, Gemini und Perplexity bisher kaum.',
    solution: 'Die KI-gestützte GEO Engine analysiert Websites auf semantische Klarheit, Strukturdaten und Antwort-Qualität für moderne KI-Crawler.',
    result: 'Schnellere Diagnose technischer Bremsen und gezielte Empfehlungen für dominierende Sichtbarkeit in der Region Heilbronn und bundesweit.',
    techStack: ['TypeScript', 'Next.js', 'Python', 'OpenAI API', 'PostgreSQL'],
    previewImage: '/assets/apps/geo-auditor-preview.png',
  },
  {
    id: 'bar-shift-planner',
    name: 'Bar Shift Planner (The Shaker)',
    kicker: 'GASTRONOMIE & REVENUE MANAGEMENT',
    badge: 'SaaS',
    status: 'Live in Produktion',
    statusType: 'live',
    tagline: 'Intelligente Schichtplanung, Rollenverteilung und Umsatz-Prognosen für Bars, Restaurants und Event-Locations.',
    problem: 'Klassische Dienstpläne in Excel oder WhatsApp führen in der Gastronomie zu Schichtausfällen, ungleichen Arbeitszeiten und fehlender Kontrolle der Personalkosten.',
    solution: 'The Shaker ist ein visueller Bar- und Gastro-Schichtplaner mit automatisierter Rollenzuweisung (Barkeeper, Barback, Service), Live-Benachrichtigungen bei Ausfällen und Echtzeit-Auswertung der Personalkostenquote.',
    result: 'Über 75 Prozent Zeitersparnis bei der wöchentlichen Dienstplanung, transparente Personalkostenkontrolle und reibungsloser Bar-Betrieb in Heilbronn und DACH-weit.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'GSAP'],
    previewImage: '/assets/apps/bar-shift-planner-preview.png',
  },
]
