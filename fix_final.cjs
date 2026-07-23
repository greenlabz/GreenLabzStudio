const fs = require('fs');

// Fix label in App.tsx
const appTsxFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let tsxContent = fs.readFileSync(appTsxFile, 'utf8');
tsxContent = tsxContent.replace(/label="Problem \/ Innerer Monolog"/g, 'label="Problem"');
fs.writeFileSync(appTsxFile, tsxContent, 'utf8');
console.log('Fixed label in App.tsx');

// Fix footer layout in App.css
const appCssFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.css';
let cssContent = fs.readFileSync(appCssFile, 'utf8');

const missingCSS = `
  .footer-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .footer-trust {
    display: grid;
    grid-template-columns: .85fr 1.8fr;
    column-gap: clamp(2rem, 7vw, 6rem);
    align-items: start;
  }

  .footer-bottom {
    grid-column: 1 / -1;
  }
}`;

cssContent = cssContent.replace(
    /  \.tech-grid \{\s*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);\s*\}\s*\}/, 
    '  .tech-grid {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n' + missingCSS
);

// We should also ensure the headers are perfectly aligned horizontally by setting the footer-grid margin-top
// to align with the checkmark list under the logo as the user originally wanted, and requested again
// "so und jetzt bringen den footer in eine linie hotizontal in line"
// Let's add that to .footer-grid if it doesn't already have it:
// Wait, the user said "bringen den footer in eine linie hotizontal in line". That could mean aligning the headers with the checklist!
// But since we just restored the default layout (align-items: start), the headers currently align with the TOP of the logo!
// If they want them to align with the checklist, I should add margin-top: 280px.
// Let's modify the missingCSS to include it.
const finalMissingCSS = `
  .footer-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 280px;
  }

  .footer-trust {
    display: grid;
    grid-template-columns: .85fr 1.8fr;
    column-gap: clamp(2rem, 7vw, 6rem);
    align-items: start;
  }

  .footer-bottom {
    grid-column: 1 / -1;
  }
}`;

// Re-do the replacement just in case
let cssContent2 = fs.readFileSync(appCssFile, 'utf8');
cssContent2 = cssContent2.replace(
    /  \.tech-grid \{\s*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);\s*\}\s*\}/, 
    '  .tech-grid {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n' + finalMissingCSS
);
fs.writeFileSync(appCssFile, cssContent2, 'utf8');
console.log('Restored footer layout in App.css');
