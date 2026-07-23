const fs = require('fs');
const file = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('className="contact-section calendar-section"')) {
    const brokenPattern = /Bis bald![\s\S]*?<Cal /;
    const fixedContent = `Bis bald!
            </p>
          </div>
        </section>

        <section className="contact-section calendar-section" id="calendar" data-reveal>
          <SectionLabel number="13" label="Kalender" />
          <h2>Such dir einen Termin aus.</h2>
          <p>
            20 Minuten. Kein Verkaufstheater. Wir prüfen, wo du gerade stehst,
            was dich Anfragen kostet und ob ein Relaunch oder monatliche Begleitung Sinn ergibt.
          </p>
          <div className="calendar-embed-container" style={{ width: 'min(1060px, 100%)', margin: '2rem auto 0' }}>
            <Cal `;
            
    content = content.replace(brokenPattern, fixedContent);
} else {
    content = content.replace(/label="Kalender \/ Direkter CTA"/g, 'label="Kalender"');
}

content = content.replace(/label="Ratgeber \/ Vor dem Gespräch"/g, 'label="Ratgeber / Tipps"');
content = content.replace(/label="Quellen"/g, 'label="Technik"');
content = content.replace(/label="Pricing \/ Investition"/g, 'label="Investition"');

fs.writeFileSync(file, content, 'utf8');
console.log('Finished updating labels and fixing calendar section');
