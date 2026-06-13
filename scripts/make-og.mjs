// Generates public/og.png (1200×630) — the social-share card.
// Run with: node scripts/make-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og.png');

const wheelTeeth = Array.from({ length: 8 }, (_, i) => {
  const a = i * 45;
  return `<rect x="588" y="150" width="9" height="22" rx="4.5" fill="#F8B528" transform="rotate(${a} 592.5 220)"/>`;
}).join('');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070C1D"/>
      <stop offset=".55" stop-color="#0E2350"/>
      <stop offset="1" stop-color="#17458F"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0" stop-color="#E11873" stop-opacity=".35"/>
      <stop offset="1" stop-color="#E11873" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#ffffff" opacity=".06"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Rotary wheel -->
  <g>
    ${wheelTeeth}
    <circle cx="592.5" cy="220" r="56" fill="none" stroke="#F8B528" stroke-width="7"/>
    <circle cx="592.5" cy="220" r="22" fill="#E11873"/>
    <circle cx="592.5" cy="220" r="9" fill="#fff"/>
  </g>

  <text x="80" y="365" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="#F8B528" font-style="italic">Service Above Self</text>
  <text x="78" y="455" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="800" fill="#ffffff" letter-spacing="-2">Rotaract Club</text>
  <text x="78" y="545" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="800" fill="#ffffff" letter-spacing="-2">of Chicago</text>

  <rect x="0" y="610" width="1200" height="20" fill="#B3DDF2"/>
  <rect x="0" y="0" width="1200" height="10" fill="#E11873"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
