const fs = require('fs');
let content = fs.readFileSync('src/App.css', 'utf8');

content = content.replace(
  '  top: 6.4rem;\n  z-index: calc(20 + var(--card));',
  '  top: calc(6.4rem + (var(--card) * 2.2rem));\n  z-index: calc(20 + var(--card));'
);

content = content.replace(
  '  .discipline-card {\n    top: 5.35rem;\n    grid-template-columns: minmax(0, 1fr);',
  '  .discipline-card {\n    top: calc(5.35rem + (var(--card) * 1.5rem));\n    grid-template-columns: minmax(0, 1fr);'
);

fs.writeFileSync('src/App.css', content);
console.log('Fixed discipline card sticky top');
