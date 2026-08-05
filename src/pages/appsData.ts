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
    id: 'medreview-pro',
    type: 'system',
    name: 'MedReview Pro',
    kicker: 'CLINICAL SAAS',
    badge: 'SaaS',
    status: 'Live in Produktion',
    statusType: 'live',
    tagline: 'Automatisiertes Reputations- und Bewertungsmanagement für Arztpraxen und Kliniken zur nachhaltigen Patientenakquise.',
    problem: 'Negative oder fehlende Bewertungen auf Google und Jameda schaden dem Vertrauen, während das manuelle Einholen von Feedback im Praxisalltag untergeht.',
    solution: 'Ein vollautomatisierter Review-Funnel, der nach dem Behandlungstermin DSGVO-konform Feedback per SMS/E-Mail einholt und die Sterne-Quote steigert.',
    result: 'Durchschnittlich +38% mehr Google-Bewertungen innerhalb der ersten 90 Tage und ein gefestigter Online-Ruf.',
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'FastAPI', 'Vercel'],
    previewImage: '/assets/apps/medreview-preview.png',
  },
]
