const fs = require('fs');

const appTsxFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let tsxContent = fs.readFileSync(appTsxFile, 'utf8');

const correctImport = `import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Code,
  Gauge,
  Hourglass,
  Menu,
  PanelTop,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  UserX,
  Zap,
  SearchX,
  TrendingDown,
  Mail,
  MessageCircle,
  Search, Settings2, CheckCircle2, Shield, MousePointer2, Bot, Building2
} from 'lucide-react'`;

const importStart = tsxContent.indexOf('import {');
const importEnd = tsxContent.indexOf("} from 'lucide-react'");
const originalImport = tsxContent.substring(importStart, importEnd + 21);

tsxContent = tsxContent.replace(originalImport, correctImport);
fs.writeFileSync(appTsxFile, tsxContent, 'utf8');
console.log('Fixed imports');
