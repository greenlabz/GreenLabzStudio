const fs = require('fs');

const appTsxFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let tsxContent = fs.readFileSync(appTsxFile, 'utf8');

// 1. Remove [13] Kalender completely from the calendar section
tsxContent = tsxContent.replace(/<SectionLabel number="13" label="Kalender" \/>/g, '');

// 2. Change label for [16] Footer-Trust to Footer / Links
// Let's find exactly what the label is called
tsxContent = tsxContent.replace(/label="Footer-Trust \/ Leise Anker"/g, 'label="Footer / Links"');
tsxContent = tsxContent.replace(/label="Footer-Trust"/g, 'label="Footer / Links"');

// 4. Highlight Google in [05]
tsxContent = tsxContent.replace(
    '<h2>Google ist nicht mehr',
    '<h2><em>Google</em> ist nicht mehr'
);

fs.writeFileSync(appTsxFile, tsxContent, 'utf8');
console.log('Fixed App.tsx');

const appCssFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.css';
let cssContent = fs.readFileSync(appCssFile, 'utf8');

// 3. Fix discipline-card stack on desktop by changing min-height
cssContent = cssContent.replace(
    /  \.discipline-card \{\s*top: 5\.35rem;\s*grid-template-columns: minmax\(0, 1fr\);\s*gap: 1\.2rem;\s*min-height: auto;\s*\}/,
    '  .discipline-card {\n    top: 5.35rem;\n    grid-template-columns: minmax(0, 1fr);\n    gap: 1.2rem;\n    min-height: 380px;\n  }'
);

// 5. Fix label font size in [05]
cssContent = cssContent.replace(
    /\.search-shift-copy p,\s*\n*\.search-shift-close \{/,
    '.search-shift-copy p:not(.section-code),\n.search-shift-close {'
);

fs.writeFileSync(appCssFile, cssContent, 'utf8');
console.log('Fixed App.css');
