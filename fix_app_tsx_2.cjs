const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const ctaDotsIdx = lines.findIndex(l => l.includes('<span className="cta-dots" aria-hidden="true" />'));
const reduceIdx = lines.findIndex(l => l.includes('if (!reduce) {'));

const toInsert = [
  '      <ArrowRight size={19} />',
  '    </a>',
  '  )',
  '}',
  '',
  'function SectionLabel({ number, label }: { number: string; label: string }) {',
  '  return <p className="section-code"><span /> [{number}] {label}</p>',
  '}',
  '',
  'function App() {',
  '  const rootRef = useRef<HTMLDivElement>(null)',
  '  const [isContactModalOpen, setIsContactModalOpen] = useState(false)',
  '    ',
  '  useEffect(() => {',
  '    (async function () {',
  '      const cal = await getCalApi({"namespace":"discoverycall"});',
  '      cal("ui", {"hideEventTypeDetails":false,"hideBranding":true,"layout":"month_view","theme":"dark"});',
  '    })();',
  '  }, []);',
  '',
  '  useEffect(() => {',
  '    const root = rootRef.current',
  '    if (!root) return',
  '',
  '    const reduce = window.matchMedia(\'(prefers-reduced-motion: reduce)\').matches',
  '    let lenis: Lenis | undefined',
  '    let rafId = 0'
];

if (ctaDotsIdx !== -1 && reduceIdx !== -1 && reduceIdx > ctaDotsIdx) {
  lines.splice(ctaDotsIdx + 1, reduceIdx - ctaDotsIdx - 1, ...toInsert);
  fs.writeFileSync('src/App.tsx', lines.join('\n'));
  console.log('Fixed App.tsx successfully');
} else {
  console.log('Could not find the bounds.');
}
