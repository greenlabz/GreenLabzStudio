const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const labelEndIdx = lines.findIndex(l => l.includes('function SectionLabel')) + 2;

// The current lines around labelEndIdx are:
// function SectionLabel({ number, label }: { number: string; label: string }) {
//   return <p className="section-code"><span /> [{number}] {label}</p>
// }
// 
//     if (!root) return

const toInsert = [
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
  '    const root = rootRef.current'
];

// Verify we are inserting at the right place
if (lines[labelEndIdx + 1] && lines[labelEndIdx + 1].includes('if (!root) return')) {
  lines.splice(labelEndIdx + 1, 0, ...toInsert);
  fs.writeFileSync('src/App.tsx', lines.join('\n'));
  console.log('Fixed App.tsx successfully');
} else {
  console.log('Could not find the exact insertion point. Current line:', lines[labelEndIdx + 1]);
}
