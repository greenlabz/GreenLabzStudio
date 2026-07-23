const fs = require('fs');

const appTsxFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let tsxContent = fs.readFileSync(appTsxFile, 'utf8');

const missingImports = `import { type CSSProperties, useEffect, useRef, useState } from 'react'
import Cal, { getCalApi } from "@calcom/embed-react"
import { ContactModal } from './ContactModal'\n`;

tsxContent = missingImports + tsxContent;
fs.writeFileSync(appTsxFile, tsxContent, 'utf8');
console.log('Fixed missing imports in App.tsx');

// Also fix RatgeberPage
const ratgeberPage = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/pages/RatgeberPage.tsx';
if (fs.existsSync(ratgeberPage)) {
    let rContent = fs.readFileSync(ratgeberPage, 'utf8');
    rContent = rContent.replace(/import \* as React from 'react';?\r?\n/g, '');
    fs.writeFileSync(ratgeberPage, rContent, 'utf8');
}
