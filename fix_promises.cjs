const fs = require('fs');
const appFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let content = fs.readFileSync(appFile, 'utf8');

const oldPromisesStart = content.indexOf('const promises = [');
const oldPromisesEnd = content.indexOf(']', oldPromisesStart) + 1; // finds the first ']' after 'const promises = [' wait no, the array spans multiple lines.

const correctPromises = `const promises = [
  ['100% individuell, keine Templates', 'Ich nutze keine billigen WordPress-Baukästen. Jedes Projekt wird von Grund auf mit modernsten Technologien und effizienten KI-Workflows maßgeschneidert entwickelt.', 'code'],
  ['Mobile-First, ohne Kompromisse', 'Über die Hälfte deiner Besucher kommt vom Handy. Deshalb entwickle ich zuerst für den kleinsten Bildschirm, nicht als nachträgliche Anpassung einer Desktop-Seite.', 'smartphone'],
  ['Kompromisslose Performance', 'Ladezeiten unter einer Sekunde. Das freut nicht nur deine Besucher, sondern wird auch von Google mit massiv besseren Rankings (SEO) belohnt.', 'zap'],
  ['Conversion als oberstes Ziel', 'Eine Website muss nicht nur gut aussehen, sie muss Anfragen generieren. Jedes Design-Element ist psychologisch darauf ausgerichtet, Besucher in Kunden zu verwandeln.', 'trend'],
]`;

// We can just regex replace everything from 'const promises = [' to the matching ']'
content = content.replace(/const promises = \[[\s\S]*?\]\s*\]?/m, correctPromises);

// Since my previous replace probably left an extra ']' or '],', let's fix it manually by doing:
// find 'const promises = [' and find 'const guides = [' and replace everything in between.
content = content.replace(/const promises = [\s\S]*?const guides = \[/, correctPromises + '\n\nconst guides = [');

fs.writeFileSync(appFile, content, 'utf8');
console.log('Fixed promises array');
