const fs = require('fs');
const sharp = require('sharp');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <!-- Dark premium rounded squircle background matching GreenLabz Studio theme -->
  <rect width="512" height="512" rx="128" fill="#040c07"/>
  <rect x="12" y="12" width="488" height="488" rx="116" stroke="#00cc6a" stroke-opacity="0.4" stroke-width="12"/>

  <!-- Subtle Glow -->
  <circle cx="256" cy="256" r="190" fill="url(#glow)" fill-opacity="0.3"/>

  <!-- Official GreenLabz Emblem scaled & centered -->
  <g transform="translate(256, 256) scale(2.4) translate(-244, -182)">
    <path d="M 257.25 256.36 C256.34,255.98 256.00,252.30 256.00,242.92 L 256.00 230.00 L 249.25 229.98 C223.77,229.92 201.93,215.24 192.73,192.00 C186.02,175.05 186.96,158.85 195.65,141.71 C198.46,136.15 198.42,136.21 203.70,130.10 C218.03,113.50 242.36,106.21 263.93,112.05 C268.09,113.17 273.75,115.31 276.50,116.80 C280.79,119.12 281.50,119.94 281.50,122.50 C281.50,126.51 278.66,126.87 272.33,123.67 C256.09,115.45 235.67,116.06 221.37,125.22 C211.55,131.50 206.48,137.12 201.27,147.50 C191.50,166.93 195.41,190.63 210.92,206.03 C221.66,216.69 234.22,222.00 248.68,222.00 L 255.94 222.00 L 256.22 208.25 L 256.50 194.50 L 271.75 194.22 C280.14,194.07 287.00,193.62 287.00,193.21 C287.00,192.81 280.02,185.51 271.50,177.00 C262.98,168.49 256.00,160.75 256.00,159.80 C256.00,157.43 259.50,155.66 261.78,156.88 C265.00,158.61 301.00,195.95 301.00,197.56 C301.00,198.43 300.44,199.78 299.75,200.57 C299.06,201.35 296.52,204.58 294.11,207.74 C287.81,216.00 280.78,221.21 270.00,225.63 L 264.50 227.88 L 263.50 242.19 C262.58,255.40 262.35,256.51 260.50,256.69 C259.40,256.79 257.94,256.64 257.25,256.36 ZM 275.50 214.50 C279.60,212.05 290.00,202.83 290.00,201.66 C290.00,201.30 284.15,201.00 277.00,201.00 L 264.00 201.00 L 264.00 210.51 L 264.00 220.03 L 267.75 218.46 C269.81,217.60 273.30,215.82 275.50,214.50 Z" fill="#00cc6a"/>
  </g>

  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00cc6a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#00cc6a" stop-opacity="0"/>
    </radialGradient>
  </defs>
</svg>`;

async function main() {
  // 1. Write SVG
  fs.writeFileSync('public/favicon.svg', svgContent, 'utf-8');
  console.log('Created public/favicon.svg');

  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate PNG 48x48
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile('public/favicon-48.png');
  console.log('Created public/favicon-48.png');

  // 3. Generate Apple Touch Icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('Created public/apple-touch-icon.png');

  // 4. Generate favicon.ico (32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('public/favicon.ico');
  console.log('Created public/favicon.ico');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
