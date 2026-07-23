const fs = require('fs');
const file = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/import RatgeberPage.*?\n/, '');
content = content.replace(/import BeforeAfterPage.*?\n/, '');
content = content.replace(/import MobileViewPage.*?\n/, '');

content = content.replace(/const \[currentRoute, setCurrentRoute\] = useState[^\n]*\n/, '');
content = content.replace(/const \[isMenuOpen, setIsMenuOpen\] = useState[^\n]*\n/, '');

const mainMatch = content.match(/(<main>[\s\S]*?<\/main>)/);
if (!mainMatch) throw new Error('Could not find main tag');
let mainContent = mainMatch[1];
mainContent = mainContent.replace(/onOpenContact\(\)/g, 'setIsContactModalOpen(true)');

const footerMatch = content.match(/(<footer[\s\S]*?<\/footer>)/);
let footerContent = footerMatch ? footerMatch[1] : '';

const appEnd = content.indexOf('function HomePage');
if (appEnd !== -1) {
    const appContent = content.substring(0, appEnd);
    const headerEnd = appContent.indexOf('</header>');
    
    const contactModal = `      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />`;
      
    const newAppContent = appContent.substring(0, headerEnd + 10) + '\n' + mainContent + '\n' + contactModal + '\n' + footerContent + '\n    </div>\n  )\n}\n\nexport default App;\n';
    
    let finalContent = newAppContent.replace(/<header className="site-nav">[\s\S]*?<\/header>/, 
`<header className="site-nav">
        <a className="logo" href="#top" aria-label="GreenLabz Studio Start">
          <LogoMark />
        </a>

        <a className="nav-cta" href="#calendar">
          <span className="cta-dots" aria-hidden="true" />
          <span className="cta-label">Projekt starten</span> <ArrowRight size={16} />
        </a>
        <button className="menu" type="button" aria-label="Menü öffnen">
          <LogoMark className="menu-logo" />
          <Menu size={19} />
        </button>
      </header>`
    );
    
    fs.writeFileSync(file, finalContent, 'utf8');
    console.log('App.tsx restored.');
}
