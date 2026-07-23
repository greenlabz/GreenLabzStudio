const fs = require('fs');
let content = fs.readFileSync('src/App.css', 'utf8');

// The standard hover effect
const standardHover = `{
  transform: translateY(-6px);
  border-color: color-mix(in oklch, var(--accent) 52%, var(--line));
  box-shadow:
    0 30px 110px rgba(0,0,0,.38),
    inset 0 0 46px rgba(0,204,106,.055);
}`;

// Fix pricing-card:hover
const pricingCardRegex = /\.pricing-card:hover\s*{[^}]*}/;
content = content.replace(pricingCardRegex, '.pricing-card:hover ' + standardHover);

// Fix premium-card:hover
const premiumCardRegex = /\.premium-card:hover\s*{[^}]*}/;
content = content.replace(premiumCardRegex, '.premium-card:hover ' + standardHover);

// Fix pricing-addon:hover
const pricingAddonRegex = /\.pricing-addon:hover\s*{[^}]*}/;
content = content.replace(pricingAddonRegex, '.pricing-addon:hover ' + standardHover);

fs.writeFileSync('src/App.css', content);
console.log('Fixed pricing hover effects');
