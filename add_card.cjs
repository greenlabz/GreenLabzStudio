const fs = require('fs');

const appFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let content = fs.readFileSync(appFile, 'utf8');

// Add Smartphone to lucide-react imports
if (!content.includes('Smartphone')) {
    content = content.replace(/import \{([^{}]*?)\} from 'lucide-react'/, (match, p1) => {
        return `import {${p1}, Smartphone} from 'lucide-react'`;
    });
}

// Add smartphone to cardIcons
if (!content.includes('smartphone: Smartphone')) {
    content = content.replace(/const cardIcons = \{([\s\S]*?)\}/, (match, p1) => {
        return `const cardIcons = {${p1}  smartphone: Smartphone,\n}`;
    });
}

// Add to promises array
if (!content.includes('Mobile-First, ohne Kompromisse')) {
    content = content.replace(/const promises = \[\s*([\s\S]*?)\s*\]/, (match, p1) => {
        return `const promises = [\n${p1}\n  ['Mobile-First, ohne Kompromisse', 'Über die Hälfte deiner Besucher kommt vom Handy. Deshalb entwickle ich zuerst für den kleinsten Bildschirm, nicht als nachträgliche Anpassung einer Desktop-Seite.', 'smartphone'],\n]`;
    });
}

fs.writeFileSync(appFile, content, 'utf8');
console.log('Added Mobile-First card to section 8');
