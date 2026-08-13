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

export const appProjects: AppProject[] = ([
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
    id: 'pricebolt',
    type: 'app',
    name: 'PriceBolt',
    kicker: 'INSTANT OFFER ENGINE',
    badge: 'App',
    status: 'Live',
    statusType: 'live',
    tagline: 'Erhalten Sie Ihr Angebot in 60 Sekunden – professionelle Angebote für Ihr nächstes Projekt, sofort.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    previewImage: '/assets/apps/pricebolt-preview.png',
    hasMore: true,
  },
  {
    id: 'vnpro',
    type: 'app',
    name: 'vnPro',
    kicker: 'VORHER-NACHHER SLIDER',
    badge: 'App',
    status: 'Live',
    statusType: 'dev',
    tagline: 'Die premium Vorher-Nachher Galerie für Web und Social Media. Perfekt für Ärzte, Kliniken und Detail-Handwerk.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    previewImage: '/assets/apps/vnpro-preview.png',
    hasMore: true,
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
    hasMore: true,
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
    id: 'repute',
    type: 'system',
    name: 'Repute',
    kicker: 'REPUTATION SAAS',
    badge: 'SaaS',
    status: 'Live in Produktion',
    statusType: 'live',
    tagline: 'Automatisches Bewertungsmanagement für Praxen, Betriebe und Dienstleister, die nachhaltig neue Kunden gewinnen wollen.',
    problem: 'Schlechte oder fehlende Bewertungen auf Plattformen wie Google mindern das Vertrauen von Neukunden, während das manuelle Einholen im Alltag untergeht.',
    solution: 'Ein vollautomatisierter Review-Funnel, der nach der Dienstleistung DSGVO-konform Feedback einholt und die Sterne-Quote steigert.',
    result: 'Durchschnittlich +38% mehr Google-Bewertungen innerhalb der ersten 90 Tage und ein gefestigter Online-Ruf.',
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'FastAPI', 'Vercel'],
    previewImage: '/assets/apps/repute-preview.png',
  },
] as AppProject[]).filter((app) => app.id !== 'leadradar')
