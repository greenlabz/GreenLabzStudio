const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// The replace tool deleted the entire block:
/*
          <div className="contact-meta">
            <div>
              <span>E-Mail:</span>
              <strong>hello@greenlabz-studio.de</strong>
            </div>
            <div>
              <span>Telefon:</span>
              <strong>+49 152 31675286</strong>
            </div>
            <div>
              <span>Antwort innerhalb</span>
              <strong>24h</strong>
            </div>
          </div>
*/

// It replaced it right after: <PrimaryCta onClick={() => setIsContactModalOpen(true)}>Nachricht schreiben</PrimaryCta>

const blockToInsert = `          <div className="contact-meta">
            <div>
              <span>E-Mail:</span>
              <strong>hello@greenlabz-studio.de</strong>
            </div>
            <div>
              <span>Telefon:</span>
              <strong>+49 1604928746</strong>
            </div>
            <div>
              <span>Antwort innerhalb</span>
              <strong>24h</strong>
            </div>
          </div>`;

content = content.replace(
  '<PrimaryCta onClick={() => setIsContactModalOpen(true)}>Nachricht schreiben</PrimaryCta>',
  '<PrimaryCta onClick={() => setIsContactModalOpen(true)}>Nachricht schreiben</PrimaryCta>\n' + blockToInsert
);

// Update WhatsApp link
content = content.replace('href="https://wa.me/" aria-label="WhatsApp"', 'href="https://wa.me/491604928746" aria-label="WhatsApp"');

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed contact section and WhatsApp link');
