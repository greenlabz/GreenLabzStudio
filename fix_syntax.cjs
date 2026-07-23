const fs = require('fs');
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const pIdx = lines.findIndex(l => l.includes('faq-intro'));
const imgIdx = lines.findIndex(l => l.includes('james-portrait-2.png')) - 1;

lines.splice(
  pIdx,
  imgIdx - pIdx + 1,
  '            <p className="faq-intro">Häufige Fragen, klare Antworten. Damit du einschätzen kannst, ob GreenLabz zu deinem Betrieb passt.</p>',
  '          </div>',
  '          <div className="faq-list">',
  '            {objections.map(([question, answer], index) => (',
  '              <details key={question} open={index === 0}>',
  '                <summary><span>{question}</span><CircleHelp size={16} /></summary>',
  '                <p>{answer}</p>',
  '              </details>',
  '            ))}',
  '          </div>',
  '        </section>',
  '',
  '        <section className="section about-section" data-reveal>',
  '          <div className="about-image-wrapper">'
);

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Fixed App.tsx');
