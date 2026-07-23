const fs = require('fs');
const rFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/pages/RatgeberPage.tsx';
let rContent = fs.readFileSync(rFile, 'utf8');
rContent = "import { useState } from 'react';\n" + rContent;
fs.writeFileSync(rFile, rContent, 'utf8');
console.log('Fixed useState import');
