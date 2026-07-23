const fs = require('fs');
let content = fs.readFileSync('src/App.css', 'utf8');

const replacement = `.logo .brand-logo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 32px;
  height: 32px;
  object-fit: contain;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 18px rgba(0,204,106,.34));
}`;

content = content.replace(
  /\.logo \.brand-logo\s*\{[^}]+\}/,
  replacement
);

fs.writeFileSync('src/App.css', content);
console.log('Fixed nav logo size');
