import { Code2, Cpu, Gauge, Globe, Layers, Server, ShieldCheck, Zap } from 'lucide-react'

const techRow1 = [
  { name: 'React 19', role: 'UI Architecture', icon: Code2, badge: 'Frontend' },
  { name: 'Vite & TS', role: 'Lightning Engine', icon: Zap, badge: 'Speed' },
  { name: 'Next.js', role: 'Enterprise Framework', icon: Layers, badge: 'Fullstack' },
  { name: 'Vercel Edge', role: 'Global Hosting', icon: Globe, badge: 'Deployment' },
  { name: 'Cloudflare', role: 'DNS & Security', icon: ShieldCheck, badge: 'Security' },
]

const techRow2 = [
  { name: 'Node.js', role: 'Backend API', icon: Server, badge: 'Backend' },
  { name: 'Python AI', role: 'Automation & Analysis', icon: Cpu, badge: 'AI & Data' },
  { name: 'Supabase', role: 'Postgres Database', icon: Layers, badge: 'Database' },
  { name: 'Pure CSS / GSAP', role: '60fps Animations', icon: Gauge, badge: 'Graphics' },
  { name: 'GraphQL / REST', role: 'API Integration', icon: Code2, badge: 'API' },
]

export function TechStackSection() {
  return (
    <section className="section tech-stack-section" data-reveal>
      <div className="section-head">
        <div className="section-label"><span>06</span>QUALITÄT & PERFORMANCE</div>
        <h2>
          Zukunftssichere <span className="text-accent">Technik</span> <span className="section-title-serif">für deinen Betrieb.</span>
        </h2>
      </div>

      <p className="tech-stack-lead">
        Vergiss langsame Baukästen und fehleranfällige Veraltungs-Plugins. Wir setzen auf dieselbe moderne Hochleistungstechnik, die auch Weltkonzerne nutzen – für maximale Geschwindigkeit, Ausfallsicherheit und dauerhaften Erfolg.
      </p>

      <div className="tech-marquee-container" aria-label="Technologie-Stack der GreenLabz Engine">
        {/* Row 1: Left Infinite Scroll */}
        <div className="tech-marquee-track track-left">
          {[...techRow1, ...techRow1, ...techRow1].map((tech, index) => {
            const Icon = tech.icon
            return (
              <div className="tech-card" key={`row1-${index}`}>
                <div className="tech-card-head">
                  <div className="tech-icon-circle" aria-hidden="true"><Icon size={20} /></div>
                  <span className="tech-badge">{tech.badge}</span>
                </div>
                <strong className="tech-name">{tech.name}</strong>
                <span className="tech-role">{tech.role}</span>
              </div>
            )
          })}
        </div>

        {/* Row 2: Right Infinite Scroll */}
        <div className="tech-marquee-track track-right">
          {[...techRow2, ...techRow2, ...techRow2].map((tech, index) => {
            const Icon = tech.icon
            return (
              <div className="tech-card" key={`row2-${index}`}>
                <div className="tech-card-head">
                  <div className="tech-icon-circle" aria-hidden="true"><Icon size={20} /></div>
                  <span className="tech-badge">{tech.badge}</span>
                </div>
                <strong className="tech-name">{tech.name}</strong>
                <span className="tech-role">{tech.role}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
