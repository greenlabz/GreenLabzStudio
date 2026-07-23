const fs = require('fs');

const appTsxFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let tsxContent = fs.readFileSync(appTsxFile, 'utf8');

tsxContent = tsxContent.replace(
    '<div className="about-mark">\n            <LogoMark />\n          </div>',
    '<div className="about-image-wrapper">\n            <img src="/assets/james-green.png" alt="James Green" className="about-image" />\n          </div>'
);
fs.writeFileSync(appTsxFile, tsxContent, 'utf8');

const appCssFile = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.css';
let cssContent = fs.readFileSync(appCssFile, 'utf8');

const oldCss = `.about-mark {
  display: grid;
  min-height: 330px;
  place-items: center;
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at 50% 45%, rgba(0,204,106,.22), transparent 44%),
    rgba(255,255,255,.035);
  box-shadow: inset 0 0 70px rgba(0,204,106,.05), 0 24px 90px rgba(0,0,0,.24);
}
.about-mark .brand-logo {
  width: min(46vw, 210px);
  height: min(46vw, 210px);
  opacity: .94;
}`;

const newCss = `.about-image-wrapper {
  display: grid;
  min-height: 330px;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 90px rgba(0,0,0,.24);
}
.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}`;

if (cssContent.includes('.about-mark {')) {
    cssContent = cssContent.replace(oldCss, newCss);
    fs.writeFileSync(appCssFile, cssContent, 'utf8');
}

console.log('Replaced About Me logo with image');
