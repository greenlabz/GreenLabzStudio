export interface SkillsItem {
  id: string
  name: string
  author: string
  category: string
  description: string
  command: string
  tags: string[]
  stars?: string
  url: string
  details?: {
    useCase: string
    bestPractices: string[]
    rules: string[]
  }
}

export const skillsCategories = [
  "Alle",
  "AI & Agents",
  "Frontend & UI",
  "Testing & Quality",
  "SEO & Content",
  "Architecture & Code",
  "Cloud & Devops"
] as const

export const claudeSkillsData: SkillsItem[] = [
  {
    id: "find-skills",
    name: "find-skills",
    author: "vercel-labs",
    category: "AI & Agents",
    description: "Durchsuche und installiere automatisch passende Agent Skills direkt aus dem Vercel Skills Ecosystem.",
    command: "npx skills add vercel-labs/skills/find-skills",
    tags: ["Vercel", "Discovery", "Automation"],
    stars: "14.2k",
    url: "https://skills.sh/vercel-labs/skills/find-skills",
    details: {
      useCase: "Erkennt automatisch fehlende Skills in deinem Projekt und schlägt passende Pakete vor.",
      bestPractices: [
        "Führe den Skill bei jedem neuen Projektstart aus.",
        "Automatische Pfadregistrierung für Claude Code und Cursor."
      ],
      rules: [
        "Nur verifizierte Repositories einbinden.",
        "System-Prompts nicht überschreiben."
      ]
    }
  },
  {
    id: "frontend-design",
    name: "frontend-design",
    author: "anthropics",
    category: "Frontend & UI",
    description: "Erstellt moderne, barrierefreie und verblüffende Web-Oberflächen mit Tailwind, CSS Grid & GSAP Animationen.",
    command: "npx skills add anthropics/skills/frontend-design",
    tags: ["Anthropic", "UI/UX", "Tailwind", "CSS"],
    stars: "18.9k",
    url: "https://skills.sh/anthropics/skills/frontend-design",
    details: {
      useCase: "Generiert responsive UI-Komponenten mit hohem ästhetischen Anspruch und ohne generische Templating-Lookarounds.",
      bestPractices: [
        "Nutzung harmonischer Farbpaletten (Dark Modes, Emerald Glows).",
        "Einsatz von Micro-Interaktionen & flüssigen Transitions.",
        "Strikte Einhaltung von WCAG 2.2 Barrierefreiheit."
      ],
      rules: [
        "Keine Platzhalter-Bilder ohne echtes Asset.",
        "Immer semantische HTML5-Elemente nutzen."
      ]
    }
  },
  {
    id: "grill-me",
    name: "grill-me",
    author: "mattpocock",
    category: "Architecture & Code",
    description: "Der Agent interviewt dich präzise und stellt kritische Fragen, bevor er komplexen Code oder Architekturen schreibt.",
    command: "npx skills add mattpocock/skills/grill-me",
    tags: ["Planning", "Architecture", "Interview"],
    stars: "12.5k",
    url: "https://skills.sh/mattpocock/skills/grill-me",
    details: {
      useCase: "Verhindert Missverständnisse bei unscharfen Anforderungen durch gezieltes Nachfragen in 3-5 Schritten.",
      bestPractices: [
        "Vor größeren Refactorings oder neuen Modulen ausführen.",
        "Antworten direkt in ein implementation_plan.md Dokument überführen."
      ],
      rules: [
        "Keine Annahmen treffen ohne Bestätigung.",
        "Verzicht auf unnötigen Boilerplate-Code."
      ]
    }
  },
  {
    id: "vercel-react-best-practices",
    name: "vercel-react-best-practices",
    author: "vercel-labs",
    category: "Frontend & UI",
    description: "Enthält die offiziellen Vercel-Richtlinien für maximale React-Performance, Server Components & Dynamic Bundling.",
    command: "npx skills add vercel-labs/agent-skills/vercel-react-best-practices",
    tags: ["React", "Next.js", "Performance", "Vercel"],
    stars: "16.1k",
    url: "https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices",
    details: {
      useCase: "Verhindert Re-render Schleifen, optimiert Ladezeiten und erzwingt saubere React 19 Patterns.",
      bestPractices: [
        "Keine unbegründeten useEffects.",
        "Verwendung von useMemo und useCallback nur bei teuren Berechnungen.",
        "Strikte Trennung von Client- und Server-Komponenten."
      ],
      rules: [
        "Vermeide mutierte States.",
        "Nutze Suspense Boundaries für async Data Fetching."
      ]
    }
  },
  {
    id: "test-driven-development",
    name: "test-driven-development",
    author: "obra",
    category: "Testing & Quality",
    description: "Erzwingt den strikten TDD Cycle (Red -> Green -> Refactor) vor jeder Code-Änderung.",
    command: "npx skills add obra/superpowers/test-driven-development",
    tags: ["TDD", "Testing", "Superpowers", "Quality"],
    stars: "11.8k",
    url: "https://skills.sh/obra/superpowers/test-driven-development",
    details: {
      useCase: "Schreibt zuerst den fehlschlagenden Test, bevor irgendein Produktionscode angefasst wird.",
      bestPractices: [
        "Entwickle in winzigen, nachvollziehbaren Schritten.",
        "Jeder Fix muss durch einen automatisierten Test bewiesen werden."
      ],
      rules: [
        "Niemals Implementierungscode ohne fehlschlagenden Test schreiben.",
        "Keine Tests auskommentieren."
      ]
    }
  },
  {
    id: "seo-geo-optimizer",
    name: "seo-geo-optimizer",
    author: "greenlabz",
    category: "SEO & Content",
    description: "Strukturiert Inhalte so, dass sie sowohl von Google als auch von KI-Engines wie ChatGPT, Perplexity & Gemini zitiert werden.",
    command: "npx skills add greenlabz/skills/seo-geo-optimizer",
    tags: ["SEO", "GEO", "GreenLabz", "AI Search"],
    stars: "9.7k",
    url: "https://greenlabz-studio.de/#skills",
    details: {
      useCase: "Baut semantische Antworten, Schema.org Markup und präzise H2/H3 Strukturen für maximale Sichtbarkeit.",
      bestPractices: [
        "W-Fragen direkt im ersten Absatz beantworten.",
        "JSON-LD Daten für lokale Unternehmen einbinden.",
        "Kernaussagen-Boxen für Maschinenlesbarkeit nutzbar machen."
      ],
      rules: [
        "Kein Keyword-Stuffing.",
        "Faktenbasierte Formulierungen ohne Floskeln."
      ]
    }
  },
  {
    id: "supabase-postgres-best-practices",
    name: "supabase-postgres-best-practices",
    author: "supabase",
    category: "Architecture & Code",
    description: "Best Practices für Supabase, RLS (Row Level Security), Index-Optimierung & Serverless Postgres Connections.",
    command: "npx skills add supabase/agent-skills/supabase-postgres-best-practices",
    tags: ["Supabase", "Postgres", "Database", "Security"],
    stars: "13.4k",
    url: "https://skills.sh/supabase/agent-skills/supabase-postgres-best-practices",
    details: {
      useCase: "Optimiert SQL-Queries, erstellt RLS-Policies und verhindert Slow-Queries in Produktion.",
      bestPractices: [
        "Row Level Security auf allen Tabellen aktivieren.",
        "Nutze Connection-Pooling für Serverless Funktionen."
      ],
      rules: [
        "Kein `SELECT *` in produktiven APIs.",
        "Alle Foreign Keys indizieren."
      ]
    }
  },
  {
    id: "remotion-best-practices",
    name: "remotion-best-practices",
    author: "remotion-dev",
    category: "Frontend & UI",
    description: "Erstelle programmgesteuerte Erklärvideos und Animationen mit React & Remotion.",
    command: "npx skills add remotion-dev/skills/remotion-best-practices",
    tags: ["Remotion", "Video", "React", "Animation"],
    stars: "8.5k",
    url: "https://skills.sh/remotion-dev/skills/remotion-best-practices",
    details: {
      useCase: "Rendert Videos und Motion Graphics direkt in React mit framegenauer Kontrolle.",
      bestPractices: [
        "Interpolate und Spring-Funktionen für organische Bewegungen nutzen.",
        "Assets immer über staticFile() einbinden."
      ],
      rules: [
        "Keine CSS-Keyframe-Animationen in Remotion verwenden (nutze frame-based values)."
      ]
    }
  },
  {
    id: "systematic-debugging",
    name: "systematic-debugging",
    author: "obra",
    category: "Architecture & Code",
    description: "Systematische Fehlersuche: Ursachenanalyse statt blindem Herumprobieren und Symptombehandlung.",
    command: "npx skills add obra/superpowers/systematic-debugging",
    tags: ["Debugging", "Superpowers", "Fixing"],
    stars: "14.8k",
    url: "https://skills.sh/obra/superpowers/systematic-debugging",
    details: {
      useCase: "Liest vollständige Error-Logs und isoliert das Problem mit Hypothesen-Tests.",
      bestPractices: [
        "Lies immer zuerst den ungekürzten Stacktrace.",
        "Verifiziere den Root-Cause vor jeder Code-Änderung."
      ],
      rules: [
        "Niemals Exceptions stumm verschlucken.",
        "Keine Pflaster-Lösungen für tiefere Logikfehler."
      ]
    }
  }
]
