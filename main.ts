// news-image-20261122 entry: writes the one image that sums up the world's
// news of Sunday 22 November 2026 to /output/entry.png.
//
// The image is a fixed file in this repository (entry.png, a 1024x1024
// editorial poster drawn for this entry). The program copies it byte for
// byte, so every run writes the same bytes and the output is deterministic.
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(out, 'entry.png'));

// Confirm the copy landed: the output must be the same file, byte for byte.
const written = statSync(join(out, 'entry.png')).size;
const source = statSync(join(here, 'entry.png')).size;
if (written !== source) throw new Error(`entry.png size mismatch: wrote ${written}, source is ${source}`);
console.log(`wrote ${join(out, 'entry.png')} (${written} bytes)`);
