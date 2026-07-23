const fs = require('fs');
let content = fs.readFileSync('src/App.css', 'utf8');

const fixCSS = `  padding-right: 0.15em;
  margin-right: -0.15em;
  padding-bottom: 0.15em;
  margin-bottom: -0.15em;
}`;

content = content.replace(
  '  filter: drop-shadow(0 0 18px rgba(0, 204, 106, .22));\n}',
  '  filter: drop-shadow(0 0 18px rgba(0, 204, 106, .22));\n' + fixCSS
);

content = content.replace(
  '  filter: drop-shadow(0 0 18px rgba(0, 204, 106, .2));\n}',
  '  filter: drop-shadow(0 0 18px rgba(0, 204, 106, .2));\n' + fixCSS
);

fs.writeFileSync('src/App.css', content);
console.log('Fixed clipping on italic serif text');
