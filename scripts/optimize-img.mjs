// Prune unused images and optimize the ones the site actually uses.
// Run: node scripts/optimize-img.mjs
import sharp from 'sharp';
import { readdir, readFile, writeFile, unlink, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public', 'assets', 'img');

// Files the site references (must be kept).
const KEEP = new Set([
  'README.md',
  'event-1.svg', // updateThumb fallback
  'logo.png',
  // clean-named, used across the site
  'about.jpg', 'connect.jpg', 'transform.jpg', 'solve.jpg', 'hero.jpg',
  'ev-food.jpg', 'ev-social.jpg', 'ev-meeting.jpg', 'ev-mixer.jpg',
  'taylor.jpg', 'evan.jpg', 'diane.jpg', 'dennis.jpg',
  // About page
  'Club Photos 1.jpg', 'Group Photo Yacht Club.jpg', 'Rotary End Polio 1.jpg',
  // Photos gallery
  'Coffee Social 24.jpg', 'Christmas Food Drive.jpg', 'Rooftop Barbecue.jpg',
  'Garfield Park Conservatory 22.jpg', 'Lincoln Park Zoo Lights 24.jpg',
  'Christkindle Market 23.jpg', 'Summer Picnic in Lincoln Park 21.jpg',
  'My block my hood my city 2019.jpg', 'Kaiser Tiger Curling Event 2020.jpg',
  'Rotaract Midnight in Paris Event.jpg', 'Dinner photo.jpg', 'Service Photo.jpg',
  'Donner Warehouse.jpg', 'Outdoor Cookout 2020.jpg', 'Montly Dinner Culichitown 2020.jpg',
]);

const MAX_W = 1600;
const before = {}, after = {};
let deleted = 0, optimized = 0, freed = 0;

const files = await readdir(DIR);
for (const f of files) {
  const p = join(DIR, f);
  const s = await stat(p);
  if (!s.isFile()) continue;

  if (!KEEP.has(f)) {
    freed += s.size;
    await unlink(p);
    deleted++;
    continue;
  }

  const ext = extname(f).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    const buf = await readFile(p);
    const img = sharp(buf).rotate().resize({ width: MAX_W, withoutEnlargement: true });
    const out = ext === '.png'
      ? await img.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await img.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    if (out.length < buf.length) {
      await writeFile(p, out);
      freed += buf.length - out.length;
    }
    optimized++;
  }
}

console.log(`Deleted ${deleted} unused files, optimized ${optimized} images.`);
console.log(`Freed ~${(freed / 1048576).toFixed(1)} MB.`);
