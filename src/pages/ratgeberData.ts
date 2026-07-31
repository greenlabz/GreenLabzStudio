export interface RatgeberSection {
  heading: string
  paragraphs: string[]
  keyTakeaways?: string[]
}

export interface RatgeberArticle {
  id: string
  title: string
  category: string
  readTime: string
  teaser: string
  intro: string
  sections: RatgeberSection[]
  conclusion: string
}

export const ratgeberArticles: RatgeberArticle[] = [
  {
    id: "ki-suche-geo",
    title: "Die neue Ära der KI-Suche: Wie GEO die Spielregeln von Google verändert",
    category: "GEO & KI-Suche",
    readTime: "5 Min. Lesezeit",
    teaser: "Warum klassisches Keyword-Stuffing tot ist und wie Generative Engine Optimization (GEO) dafür sorgt, dass KI-Bots wie ChatGPT, Perplexity und Google Gemini deine Website empfehlen.",
    intro: "Die Art und Weise, wie Menschen Informationen im Internet suchen, verändert sich fundamental. Statt langer Linklisten liefert die neue Generation von KI-Suchmaschinen (Generative Search Experience) sofortige, zusammengefasste Antworten. Wer hier nicht zitiert wird, verliert bis zu 60 % seines organischen Traffics.",
    sections: [
      {
        heading: "Was ist Generative Engine Optimization (GEO)?",
        paragraphs: [
          "GEO erweitert das klassische SEO um die Anforderung, von Sprachmodellen (LLMs) als vertrauenswürdige Primärquelle verstanden und zitiert zu werden. KI-Systeme lesen Webseiten nicht wie Menschen – sie extrahieren Fakten, Datenpunkte und strukturierte Logik.",
          "Anstatt Schlagworte stumpf zu wiederholen, müssen deine Inhalte präzise Antworteinheiten bilden, die von KI-Algorithmen fehlerfrei verarbeitet werden können."
        ],
        keyTakeaways: [
          "Direkte Antworten im ersten Absatz jeder Unterseite platzieren.",
          "Klare Datensätze, Statistiken und strukturierte Fakten einbinden.",
          "Semantische Auszeichnung mit JSON-LD Schema.org nutzen."
        ]
      },
      {
        heading: "Die 3 Säulen erfolgreicher KI-Optimierung für lokale Betriebe",
        paragraphs: [
          "1. Informative Struktur: Nutze eine saubere H2/H3-Hierarchie mit klaren W-Fragen.",
          "2. Zitierfähige Kernaussagen: Formuliere eindeutige, prägnante Kernaussagen ohne Floskeln.",
          "3. Technische Maschinenlesbarkeit: Schnelle Ladezeiten und sauberes HTML sind Pflicht, damit Crawler nicht vorzeitig abbrechen."
        ]
      }
    ],
    conclusion: "Fazit: Wer jetzt auf Generative Engine Optimization setzt, sichert sich den entscheidenden Vorsprung für die nächsten Jahre. Deine Website wird von einer passiven Visitenkarte zu einer aktiven Antwortquelle für KI-Systeme."
  },
  {
    id: "semantisches-html",
    title: "Semantisches HTML: Die geheime Sprache für Google & KI-Crawler",
    category: "Code & Performance",
    readTime: "4 Min. Lesezeit",
    teaser: "Wie saubere HTML5-Strukturen ohne überflüssigen Div-Salat dafür sorgen, dass Suchmaschinen den Kern deines Angebots in Millisekunden erfassen.",
    intro: "Viele moderne Websites bestehen aus verschachtelten Div-Wüsten ohne semantische Bedeutung. Für Suchmaschinen ist das wie ein Buch ohne Kapitelüberschriften. Sauberes HTML5 ist das Fundament jeder Hochleistungs-Website.",
    sections: [
      {
        heading: "Warum HTML5-Semantik über deinen Rang entscheidet",
        paragraphs: [
          "Google verwendet automatisierte Headless-Browser, um Inhalte zu bewerten. Wenn dein Hauptinhaltsbereich in <article> oder <main> gehüllt ist, erkennt die Suchmaschine sofort, wo der echte Mehrwert liegt.",
          "Navigationsleisten (<nav>), Fußzeilen (<footer>) und Zusatzinformationen (<aside>) werden sauber vom Hauptinhalt getrennt. Das verhindert Verwirrung beim Ranking."
        ],
        keyTakeaways: [
          "Verwende nur eine einzige <h1> pro Seite für das Hauptthema.",
          "Strukturiere Abschnitte logisch mit <section> und <article>.",
          "Nutze <header>, <nav> und <footer> für Barrierefreiheit & SEO."
        ]
      }
    ],
    conclusion: "Fazit: Clean Code ist kein Selbstzweck, sondern der schnellste Weg zu Top-Rankings und perfekter Barrierefreiheit."
  },
  {
    id: "mobile-first",
    title: "Mobile First: Warum Desktop-Designs deine Kunden kosten",
    category: "Mobile Experience",
    readTime: "4 Min. Lesezeit",
    teaser: "Über 70 % der lokalen Anfragen kommen über Smartphones. Wie du deine mobile Website zur Conversion-Maschine machst.",
    intro: "Google bewertet und indiziert deine Website ausschließlich anhand der mobilen Version (Mobile-First Indexing). Eine Website, die am PC hübsch aussieht, aber am Handy schwer zu bedienen ist, ist für dein Geschäft ein Risiko.",
    sections: [
      {
        heading: "Die Daumen-Zone (Thumb Zone) & Touch-Ziele",
        paragraphs: [
          "Nutzer bedienen ihr Smartphone meist einhändig mit dem Daumen. Wichtige Interaktions-Buttons wie 'Anrufen', 'Termin buchen' oder 'WhatsApp' müssen in bequemer Reichweite liegen.",
          "Klickbare Elemente benötigen einen Mindestabstand von 48x48 Pixeln, damit Fehlklicks vermieden werden."
        ],
        keyTakeaways: [
          "Fixierte Floating CTA-Buttons für Anruf & WhatsApp anbieten.",
          "Schriftgrößen nicht unter 16px wählen für optimale Lesbarkeit.",
          "Keine überdimensionierten Grafiken, die den Bildschirm blockieren."
        ]
      }
    ],
    conclusion: "Fazit: Gestalte deine Website immer zuerst für das Smartphone – deine Besucher und Google werden es dir danken."
  },
  {
    id: "content-cluster",
    title: "Content Cluster: Wie du thematische Autorität bei Google aufbaust",
    category: "Content Strategie",
    readTime: "5 Min. Lesezeit",
    teaser: "Vergiss wahllose Blogbeiträge. Erfahre, wie du zusammenhängende Themenwelten aufbaust, die dich als Branchenprimus etablieren.",
    intro: "Suchmaschinen belohnen Websites, die ein Fachgebiet vollumfänglich abdecken. Durch die Erstellung von Hauptseiten (Pillar Pages) und vernetzten Unterseiten (Cluster Content) beweist du Google deine Fachkompetenz.",
    sections: [
      {
        heading: "Der Aufbau eines Content Clusters",
        paragraphs: [
          "Die Pillar Page deckt ein großes Thema breit ab (z. B. 'Zahnimplantate & Zahnersatz'). Von dort verlinken Unterseiten auf spezifische Detailfragen (z. B. 'Kosten von Implantaten', 'Ablauf der Behandlung', 'Pflege & Haltbarkeit').",
          "Diese interne Verlinkung zeigt Google die logische Hierarchie und baut nachhaltige Rankings für Hunderte Suchbegriffe gleichzeitig auf."
        ],
        keyTakeaways: [
          "Verlinke immer bidirektional: Cluster-Page <-> Pillar-Page.",
          "Verwende aussagekräftige Anker-Texte statt 'hier klicken'.",
          "Decke alle Phasen der Kundenreise (Kaufabsicht & Information) ab."
        ]
      }
    ],
    conclusion: "Fazit: Ein strukturierter Content-Cluster verwandelt deine Website in eine kontinuierliche Quelle qualifizierter Kundenanfragen."
  },
  {
    id: "eeat-vertrauen",
    title: "E-E-A-T & Trust: Warum Vertrauen der wichtigste Google-Faktor ist",
    category: "Google Trust",
    readTime: "4 Min. Lesezeit",
    teaser: "Experience, Expertise, Authoritativeness, Trustworthiness. Wie du Google zeigst, dass hinter deiner Website echte Experten stehen.",
    intro: "Mit dem Aufkommen generierter KI-Inhalte legt Google extremen Wert auf reale Erfahrung und belegbares Vertrauen. Anonyme Webseiten ohne Gesicht und Nachweise verlieren rapide an Sichtbarkeit.",
    sections: [
      {
        heading: "Die 4 Säulen von E-E-A-T in der Praxis",
        paragraphs: [
          "1. Experience (Erfahrung): Echte Einblicke, Vorher-Nachher-Ergebnisse und Praxisfotos zeigen, dass du dein Handwerk beherrschst.",
          "2. Expertise (Fachwissen): Fachlich fundierte Inhalte mit Klarnamen-Autorenprofilen und Qualifikationen.",
          "3. Authoritativeness (Autorität): Zitate in Fachportalen, lokale Presseberichte und Erwähnungen.",
          "4. Trustworthiness (Vertrauen): Transparente Preise, echtes Impressum, DSGVO-Konformität und zertifizierte Kundenbewertungen."
        ],
        keyTakeaways: [
          "Zeige dein Gesicht: Über-uns-Seite mit echten Fotos einbinden.",
          "Google Bewertungen direkt auf der Startseite integrieren.",
          "Zertifikate, Innungs-Mitgliedschaften & Auszeichnungen hervorheben."
        ]
      }
    ],
    conclusion: "Fazit: Vertrauen entscheidet nicht nur über dein Ranking bei Google, sondern verwandelt Erstbesucher in treue Kunden."
  },
  {
    id: "strukturierte-daten",
    title: "Strukturierte Daten (Schema.org): Rich Snippets & KI-Zitate freischalten",
    category: "Suchmaschinen-Architektur",
    readTime: "5 Min. Lesezeit",
    teaser: "Wie du mit JSON-LD Auszeichnungen dafür sorgst, dass deine Öffnungszeiten, Rezensionen und FAQs direkt in den Google-Ergebnissen erstrahlen.",
    intro: "Strukturierte Daten nach Schema.org sind ein standardisiertes Format, um Suchmaschinen explizite Hinweise über die Bedeutung einer Seite zu geben. Sie sind die Eintrittskarte für auffällige Rich Snippets.",
    sections: [
      {
        heading: "Welche Schema-Typen für Unternehmen essenziell sind",
        paragraphs: [
          "LocalBusiness / MedicalBusiness / HVACBusiness: Exakte Daten zu Standort, Öffnungszeiten, Kontaktdaten und Einzugsgebiet.",
          "FAQPage: Strukturierte Fragen & Antworten, die direkt in den Suchergebnissen aufgeklappt werden können.",
          "AggregateRating: Sternbewertungen direkt unter deinem Snippet in den Suchergebnissen."
        ],
        keyTakeaways: [
          "JSON-LD direkt im <head> der Website einbinden.",
          "NAP-Daten (Name, Adresse, Telefon) 100% konsistent halten.",
          "Schema-Strukturen regelmäßig mit dem Google Rich Results Test prüfen."
        ]
      }
    ],
    conclusion: "Fazit: Schema.org macht deine Website für Maschinen verständlich und erhöht deine Klickrate (CTR) in den Suchergebnissen drastisch."
  },
  {
    id: "core-web-vitals",
    title: "Core Web Vitals: Warum Ladezeit über deinen Umsatz entscheidet",
    category: "Ladezeit & Core Web Vitals",
    readTime: "4 Min. Lesezeit",
    teaser: "LCP, INP und CLS einfach erklärt: Wie millisekundenschnelle Ladezeiten deine Absprungrate minimieren und Google-Rankings maximieren.",
    intro: "Studien belegen: Jede zusätzliche Sekunde Ladezeit senkt die Conversion-Rate um bis zu 20 %. Google hat die Core Web Vitals deshalb zu einem offiziellen Ranking-Faktor gemacht.",
    sections: [
      {
        heading: "Die drei entscheidenden Metriken",
        paragraphs: [
          "1. LCP (Largest Contentful Paint): Wie schnell lädt das größte sichtbare Element? Ziel: unter 2,5 Sekunden.",
          "2. INP (Interaction to Next Paint): Wie schnell reagiert die Seite auf Klicks? Ziel: unter 200 Millisekunden.",
          "3. CLS (Cumulative Layout Shift): Verschieben sich Elemente beim Laden störend? Ziel: nahe 0."
        ],
        keyTakeaways: [
          "Bilder im modernen WebP- oder AVIF-Format komprimiert ausliefern.",
          "Unnötiges JavaScript und blähende Plugins eliminieren.",
          "Schnelles globales CDN (z. B. Vercel / Cloudflare) nutzen."
        ]
      }
    ],
    conclusion: "Fazit: Schnelle Websites machen Nutzer glücklich und belohnen dich mit Top-Platzierungen bei Google."
  },
  {
    id: "local-seo",
    title: "Local SEO 2026: Wie du deine Region auf Google Maps dominierst",
    category: "Local SEO & Google Maps",
    readTime: "5 Min. Lesezeit",
    teaser: "Schritt-für-Schritt-Anleitung, wie regionale Betriebe, Praxen & Handwerker im begehrten Google 3-Pack landen.",
    intro: "Wenn Kunden in deiner Stadt nach deinen Dienstleistungen suchen, zählt nur eines: Die Top 3 Ergebnisse auf Google Maps. Wer hier nicht auftaucht, existiert für die meisten Neukunden schlichtweg nicht.",
    sections: [
      {
        heading: "Die Erfolgsformel für lokales Dominieren",
        paragraphs: [
          "1. Google Unternehmensprofil optimieren: Vollständige Kategorien, Öffnungszeiten, hochauflösende Fotos und regelmäßige Beiträge.",
          "2. Lokale Bewertungssignale: Systematisch 5-Sterne-Bewertungen mit relevanten Begriffen sammeln und beantworten.",
          "3. Regionale Relevanz auf der Website: Städtelandingpages und lokale Schema-Daten integrieren."
        ],
        keyTakeaways: [
          "Aktive Bewertungsstrategie für zufriedene Kunden etablieren.",
          "Fotos von echten Arbeiten & dem Team regelmäßig hochladen.",
          "Eindeutige Lokalisierung in Title-Tags und Überschriften."
        ]
      }
    ],
    conclusion: "Fazit: Local SEO ist der kosteneffizienteste Hebel für planbare Kundenanfragen aus deiner direkten Umgebung."
  },
  {
    id: "user-intent",
    title: "User Intent: Wie du Besucher exakt am Punkt ihrer Entscheidung abholst",
    category: "Conversion & Intent",
    readTime: "4 Min. Lesezeit",
    teaser: "Warum Traffic nutzlos ist, wenn er nicht zur Suchabsicht passt – und wie du Anfragen zielgerichtet auslöst.",
    intro: "Nicht jeder Suchbegriff führt zum Kauf. Google unterscheidet streng zwischen informativen, navigationsbezogenen und transaktionalen Suchanfragen. Wer die Suchabsicht verfehlt, wird schnell wieder verlassen.",
    sections: [
      {
        heading: "Die 3 Haupttypen von Suchintentionen",
        paragraphs: [
          "1. Informational ('Wie funktioniert eine Wärmepumpe?'): Der Nutzer sucht Rat. Biete transparente Aufklärung und qualifizierte Ratgeber.",
          "2. Commercial ('Wärmepumpe meisterbetrieb kosten vergleichen'): Der Nutzer vergleicht Anbieter. Zeige klare Vorteile, Festpreise & Zertifikate.",
          "3. Transactional ('Wärmepumpe installieren lassen termin'): Der Nutzer will handeln. Platziere sofort sichtbare Buchungsmöglichkeiten."
        ],
        keyTakeaways: [
          "Jede Unterseite auf genau EINE Haupt-Suchabsicht ausrichten.",
          "Keine Verkaufskeule bei rein informativen Anfragen.",
          "Glasklare Calls-to-Action bei kaufbereiten Nutzern."
        ]
      }
    ],
    conclusion: "Fazit: Wenn deine Website exakt das liefert, was der Suchende erwartet, steigen deine Conversion-Raten automatisch."
  },
  {
    id: "voice-search",
    title: "Voice Search & KI-Sprachassistenten: So wirst du gesprochen gefunden",
    category: "Sprachsuche",
    readTime: "4 Min. Lesezeit",
    teaser: "Wie Siri, Alexa und Google Assistant die Formulierung von Suchanfragen verändern – und wie du dich darauf vorbereitest.",
    intro: "Immer mehr Nutzer stellen Fragen per Sprachbefehl. Sprachsuchanfragen sind länger, konversationeller und enthalten meist W-Fragen ('Wo finde ich den besten Tierarzt in meiner Nähe?').",
    sections: [
      {
        heading: "Optimierung für die Konversationssuche",
        paragraphs: [
          "Sprachassistenten lesen meist nur ein einziges, exaktes Ergebnis vor ('Featured Snippet' / Position Zero). Um diese Position zu besetzen, musst du prägnante Frage-Antwort-Paare auf deiner Seite verankern.",
          "FAQ-Bereiche mit natürlichen Formulierungen sind dafür perfekt geeignet."
        ],
        keyTakeaways: [
          "Fragen genau so aufschreiben, wie Menschen sie sprechen.",
          "Antworten in 1-2 klaren Sätzen auf den Punkt bringen.",
          "Strukturierte FAQ-Schema-Daten hinterlegen."
        ]
      }
    ],
    conclusion: "Fazit: Sprich die Sprache deiner Kunden – dann sprechen Sprachassistenten und KI-Bots deine Empfehlungen aus."
  },
  {
    id: "ux-ui-seo",
    title: "UX/UI als SEO-Turbo: Warum Design über deine Rankings entscheidet",
    category: "Design & UX",
    readTime: "4 Min. Lesezeit",
    teaser: "Warum schlechte Lesbarkeit, Verwirrung und langweiliges Layout deine Google-Positionen ruinieren.",
    intro: "Google analysiert das Nutzerverhalten genau: Springt ein Nutzer sofort zurück zur Suche (Pogo-Sticking) oder verweilt er begeistert auf der Seite? Eine herausragende UX/UI ist damit direkt mit deinen Rankings verknüpft.",
    sections: [
      {
        heading: "Die wichtigsten UX-Prinzipien für hohe Verweildauer",
        paragraphs: [
          "1. Visuelle Hierarchie: Klare Schriftgrößen, farbige Akzente und genügend Weißraum führen das Auge mühelos durch den Text.",
          "2. Schnelle Orientierung: Nutzer scannen Seiten in F-Form. Wichtige Begriffe gehören fett hervorgehoben.",
          "3. Vertrauensbildendes Design: Modernes Glassmorphism, flüssige Mikro-Animationen und echte Medien statt billiger Stockfotos."
        ],
        keyTakeaways: [
          "Lesefreundliche Kontraste & typografische Abstände einhalten.",
          "Aufdringliche Pop-ups und störende Layout-Verschiebungen vermeiden.",
          "Interaktive Elemente durch eindeutiges Hover-Feedback hervorheben."
        ]
      }
    ],
    conclusion: "Fazit: Ein Premium-Design begeistert deine Besucher, senkt die Absprungrate und hebt deine Rankings auf ein neues Level."
  },
  {
    id: "backlinks-vertrauen",
    title: "Digitale Empfehlungen: Wie du echte Autorität im Netz aufbaust",
    category: "Offpage & Links",
    readTime: "4 Min. Lesezeit",
    teaser: "Warum billige Linkpakete schaden und wie du durch Qualität echte Backlinks und digitale Sichtbarkeit gewinnst.",
    intro: "Backlinks (Verweise von anderen Websites auf deine Seite) sind nach wie vor einer der stärksten Signale für Google. Aber nicht die Anzahl entscheidet, sondern die Relevanz und Qualität der verlinkenden Quelle.",
    sections: [
      {
        heading: "Echte Linkbausteine für lokale & regionale Unternehmen",
        paragraphs: [
          "1. Lokale Partnerschaften & Sponsoring: Verlinkungen von Vereinen, Lieferanten und regionalen Partnerbetrieben.",
          "2. Branchenspezifische Portale: Eintragslisten von Kammern, Innungen und anerkannten Branchenverzeichnissen.",
          "3. Erwähnung in regionalen Medien: Pressemitteilungen zu Innovationen, Jubiläen oder lokalen Projekten."
        ],
        keyTakeaways: [
          "Niemals automatisierte Spampakete oder dubiose Linknetzwerke kaufen.",
          "Auf natürliche, thematisch passende Verlinkungen setzen.",
          "Nützlichen Content erstellen, der freiwillig als Quelle verlinkt wird."
        ]
      }
    ],
    conclusion: "Fazit: Nachhaltiger Linkaufbau basiert auf echten Beziehungen, Qualität und regionaler Präsenz."
  }
]
