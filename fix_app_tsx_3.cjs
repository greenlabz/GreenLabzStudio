const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const toReplaceStart = lines.findIndex(l => l.includes('function PrimaryCta'));
const toReplaceEnd = lines.findIndex(l => l.includes('function App() {'));

const replacement = [
  'function PrimaryCta({ children, href, onClick }: { children: string; href?: string; onClick?: () => void }) {',
  '  if (onClick) {',
  '    return (',
  '      <button className="btn primary" onClick={onClick} style={{ cursor: \'pointer\' }}>',
  '        <span className="cta-label">{children}</span>',
  '        <span className="cta-dots" aria-hidden="true" />',
  '        <ArrowRight size={19} />',
  '      </button>',
  '    )',
  '  }',
  '  return (',
  '    <a className="btn primary" href={href || \'#calendar\'}>',
  '      <span className="cta-label">{children}</span>',
  '      <span className="cta-dots" aria-hidden="true" />',
  '      <ArrowRight size={19} />',
  '    </a>',
  '  )',
  '}',
  '',
  'function SectionLabel({ number, label }: { number: string; label: string }) {',
  '  return <p className="section-code"><span /> [{number}] {label}</p>',
  '}',
  ''
];

lines.splice(toReplaceStart, toReplaceEnd - toReplaceStart, ...replacement);
fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Fixed App.tsx successfully (again)');
