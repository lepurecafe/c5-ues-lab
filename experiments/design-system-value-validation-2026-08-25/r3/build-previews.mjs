import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const template = await readFile(path.join(root, 'preview-template.html'), 'utf8');
const variants = [
  { file: 'preview.html', mode: 'hold', page: 'hub', title: 'R3 비교 허브' },
  { file: 'preview-baseline.html', mode: 'baseline', page: 'baseline', title: 'R3-A 정규화 기준선' },
  { file: 'preview-hold.html', mode: 'hold', page: 'hold', title: 'R3-B HOLD / 01' },
];

for (const variant of variants) {
  const output = template
    .replaceAll('{{MODE}}', variant.mode)
    .replaceAll('{{PAGE}}', variant.page)
    .replaceAll('{{TITLE}}', variant.title)
    .replaceAll('{{HOLD_HIDDEN}}', variant.mode === 'baseline' ? 'hidden' : '');
  await writeFile(path.join(root, variant.file), output, 'utf8');
}

console.log(`Built ${variants.length} synchronized R3 previews.`);
