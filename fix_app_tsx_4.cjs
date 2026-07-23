const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const toReplace = lines.findIndex(l => l.includes('cal("ui", {"hideEventTypeDetails":false,"hideBranding":true,"layout":"month_view","theme":"dark"});'));

if (toReplace !== -1) {
  lines.splice(toReplace, 1, '      // @ts-ignore', '      cal("ui", {"hideEventTypeDetails":false,"hideBranding":true,"layout":"month_view","theme":"dark"});');
  fs.writeFileSync('src/App.tsx', lines.join('\n'));
  console.log('Fixed TS error');
}
