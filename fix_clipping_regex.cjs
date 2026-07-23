const fs = require('fs');
let content = fs.readFileSync('src/App.css', 'utf8');

const fixCSS = `  padding-right: 0.15em;
  margin-right: -0.15em;
  padding-bottom: 0.15em;
  margin-bottom: -0.15em;`;

content = content.replace(
  /(-webkit-text-fill-color:\s*transparent;\s*\r?\n\s*filter:\s*drop-shadow[^;]+;)/g,
  '$1\n' + fixCSS
);

fs.writeFileSync('src/App.css', content);
console.log('Fixed clipping on italic serif text');
