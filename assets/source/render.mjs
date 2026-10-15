// Run with a local installation of sharp: node assets/source/render.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

for (const suffix of ['', '-dark']) {
  const input = fileURLToPath(new URL(`search-booster-overview${suffix}.svg`, import.meta.url));
  const output = fileURLToPath(new URL(`../search-booster-overview${suffix}.png`, import.meta.url));
  await sharp(input, { density: 144 }).resize(3200, 1800).png().toFile(output);
}
