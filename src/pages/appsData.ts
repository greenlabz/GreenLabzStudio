export interface AppProject {
  id: string
  type: 'app' | 'system'
  name: string
  kicker: string
  badge: string
  status: 'Live' | 'Live in Produktion' | 'In Entwicklung' | 'In aktiver Entwicklung' | 'Interne Nutzung'
  statusType: 'live' | 'dev' | 'internal'
  tagline: string
  problem?: string
  solution?: string
  result?: string
  techStack: string[]
  previewImage: string
  demoUrl?: string
  hasMore?: boolean
}

export const appProjects: AppProject[] = [
  // Apps
  {
    id: 'bar-shift-planner',
    type: 'app',
    name: 'The Shaker',
    kicker: 'BAR-SCHICHTPLANER',
    badge: 'App',
    status: 'Live',
    statusType: 'live',
    tagline: 'Dienstplanung, Rollenverteilung und Umsatz-Auswertung für Gastronomie-Betriebe direkt auf dem Smartphone.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'GSAP'],
    previewImage: '/assets/apps/bar-shift-planner-preview.png',
    hasMore: true,
  },
  {
    id: 'geoscan-mobile',
    type: 'app',
    name: 'GeoScan Mobile',
    kicker: 'GEO & KI SEARCH SCANNER',
    badge: 'App',
    status: 'In Entwicklung',
    statusType: 'dev',
    tagline: 'Schnelle SEO & GEO-Audits vor Ort für Agenturen und Berater direkt per Kamera und Sprachsteuerung.',
    techStack: ['React Native', 'Expo', 'FastAPI', 'OpenAI API'],
    previewImage: '/assets/apps/geoscan-preview.png',
    hasMore: false,
  },
  {
    id: 'leadradar',
    type: 'app',
    name: 'LeadRadar',
    kicker: 'MOBILE LEAD ENGINE',
    badge: 'App',
    status: 'Interne Nutzung',
    statusType: 'internal',
    tagline: 'Echtzeit-Push-Benachrichtigungen und Detail-Recherche für Neukunden-Leads im DACH-Raum von unterwegs.',
    techStack: ['React Native', 'Expo', 'Firebase', 'Python Scraper'],
    previewImage: '/assets/apps/leadradar-preview.png',
    hasMore: false,
  },
  // Systeme
  {
    id: 'greenlabz-crm',
    type: 'system',
    name: 'GreenLabz CRM',
    kicker: 'Gastro & Agentur CRM',
    badge: 'CRM System',
    status: 'Live',
    statusType: 'live',
    tagline: 'Das zentrale Steuerungselement für Kundenbeziehungen, Projektfortschritt und vollautomatisierte Rechnungsstellung.',
    problem: 'Kundenanfragen, Projektstände und Rechnungen über mehrere Tools verstreut führen zu Datenverlust und manuellem Aufwand.',
    solution: 'Ein zentrales Dashboard für alle Anfragen, automatisiertes Onboarding, integrierte Zeiterfassung und One-Click-Rechnungsstellung.',
    result: '90% weniger Admin-Zeit und lückenlose Transparenz bei allen Projekten.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'],
    previewImage: '/assets/apps/crm-preview.png',
  },
  {
    id: 'scrapemaster-pro',
    type: 'system',
    name: 'ScrapeMaster Pro',
    kicker: 'Enterprise SaaS',
    badge: 'SaaS',
    status: 'Live in Produktion',
    statusType: 'live',
    tagline: 'Automatisierte Lead-Generierung und Daten-Pipeline für B2B-Vertriebsprozesse.',
    problem: 'Manuelle Recherche von B2B-Kontaktdaten im DACH-Raum ist zeitaufwendig, teuer und liefert oft veraltete Ergebnisse.',
    solution: 'Automatisierte Extraktions-Pipelines für LinkedIn, Google Maps und Branchenbücher mit Live-Verifikation der E-Mail-Adressen.',
    result: 'Über 80% Zeitersparnis bei der wöchentlichen Lead-Generierung und +15% Konversion.',
    techStack: ['React', 'FastAPI', 'Python', 'Tailwind CSS', 'Vercel'],
    previewImage: '/assets/apps/scrapemaster-preview.png',
  },
]
