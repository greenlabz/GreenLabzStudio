const fs = require('fs');

const appTsxFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let tsxContent = fs.readFileSync(appTsxFile, 'utf8');

// Remove setCurrentRoute from footer links
tsxContent = tsxContent.replace(
    /<a href="#top" onClick=\{\(e\) => \{e\.preventDefault\(\); setCurrentRoute\('home'\); window\.scrollTo\(0,0\);\}\}>Startseite<\/a>/g,
    '<a href="#top">Startseite</a>'
);
tsxContent = tsxContent.replace(
    /<a href="#ratgeber" onClick=\{\(e\) => \{e\.preventDefault\(\); setCurrentRoute\('ratgeber'\); window\.scrollTo\(0,0\);\}\}>Ratgeber<\/a>/g,
    '<a href="#ratgeber">Ratgeber</a>'
);
tsxContent = tsxContent.replace(
    /<a href="#beforeafter" onClick=\{\(e\) => \{e\.preventDefault\(\); setCurrentRoute\('beforeafter'\); window\.scrollTo\(0,0\);\}\}>Vorher \/ Nachher<\/a>/g,
    '<a href="#beforeafter">Vorher / Nachher</a>'
);
tsxContent = tsxContent.replace(
    /<a href="#mobileview" onClick=\{\(e\) => \{e\.preventDefault\(\); setCurrentRoute\('mobileview'\); window\.scrollTo\(0,0\);\}\}>Mobile Ansicht<\/a>/g,
    '<a href="#mobileview">Mobile Ansicht</a>'
);

fs.writeFileSync(appTsxFile, tsxContent, 'utf8');
console.log('Fixed build errors in App.tsx');
