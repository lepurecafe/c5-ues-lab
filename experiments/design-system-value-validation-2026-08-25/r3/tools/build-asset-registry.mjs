#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolsDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(toolsDir, '..');
const assetsRoot = path.join(root, 'assets');

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(absolute));
    else if (entry.isFile() && entry.name !== 'asset-registry.json') output.push(absolute);
  }
  return output;
}

function jpegDimensions(buffer) {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const size = buffer.readUInt16BE(offset);
    if (size < 2 || offset + size > buffer.length) break;
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    offset += size;
  }
  throw new Error('Unsupported JPEG dimensions');
}

function dimensions(buffer, format) {
  if (format === 'png') return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  if (format === 'jpg') return jpegDimensions(buffer);
  if (format === 'svg') {
    const text = buffer.toString('utf8');
    const match = text.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
    if (!match) throw new Error('SVG viewBox missing');
    return { width: Number(match[1]), height: Number(match[2]) };
  }
  throw new Error(`Unsupported format: ${format}`);
}

function metadata(relative) {
  const filename = path.basename(relative);
  const generated = /(?:hold-kit|shop-hold|support-scene)/.test(relative);
  if (relative.startsWith('assets/identity/')) {
    return {
      assetClass: 'master',
      source: { type: 'code-native-svg', date: '2026-08-26', reference: 'migration.common-surface.identity-r2-to-r3@0.1.0-experiment' },
      usage: [{ surface: 'identity / preview / commerce', component: 'BrandSignature', crop: 'contain / no distortion', alt: 'COMMON SURFACE path-based identity master' }],
      history: [{ date: '2026-08-26', action: 'created', note: 'R2 concept geometry normalized without live SVG text.' }],
    };
  }
  if (relative.startsWith('assets/products/')) {
    const productId = (filename.match(/^(cs-\d{2}|obj-\d{2})/)?.[1] || 'product').toUpperCase();
    return {
      assetClass: 'mockup',
      source: { type: 'derived-web-export', date: '2026-08-26', reference: `source.common-surface.product.${productId.toLowerCase()}@legacy-observed` },
      usage: [{ surface: 'catalog / reserve / commerce', component: 'ProductCard', crop: '4:5 cover or contain by medium', alt: `${productId} synthetic product mockup` }],
      history: [{ date: '2026-08-26', action: 're-encoded', note: 'Legacy art-direction image copied into version-pure R3 web export.' }],
    };
  }
  if (relative.startsWith('assets/people/')) {
    return {
      assetClass: 'reference',
      source: { type: 'derived-web-export', date: '2026-08-26', reference: 'source.common-surface.people@legacy-observed' },
      usage: [{ surface: 'brand experience / moodboard / commerce', component: 'EditorialImage', crop: 'cover with face and action preserved', alt: 'Unretouched synthetic editorial scene' }],
      history: [{ date: '2026-08-26', action: 're-encoded', note: 'R3 responsive derivative; model and image rights remain unresolved.' }],
    };
  }
  if (generated) {
    const isMaster = filename.endsWith('-master.png');
    return {
      assetClass: 'mockup',
      source: { type: isMaster ? 'imagegen-master' : 'derived-web-export', date: '2026-08-26', reference: `source.common-surface.r3.${filename.replace(/\.[^.]+$/, '')}` },
      usage: [{ surface: 'HOLD / 01 medium projection / commerce support', component: 'MediumProof', crop: '3:2 cover with overlay-safe region', alt: 'Synthetic HOLD change art-direction mockup' }],
      history: [{ date: '2026-08-26', action: isMaster ? 'generated-and-reviewed' : 're-encoded', note: isMaster ? 'ImageGen output accepted after text removal edit.' : 'Responsive derivative of accepted R3 ImageGen master.' }],
    };
  }
  return {
    assetClass: 'reference',
    source: { type: 'derived-web-export', date: '2026-08-26', reference: `source.common-surface.media.${filename.replace(/\.[^.]+$/, '')}@legacy-observed` },
    usage: [{ surface: '7-medium projection / commerce', component: 'MediumProof', crop: 'medium-specific cover', alt: 'Synthetic COMMON SURFACE medium reference' }],
    history: [{ date: '2026-08-26', action: 're-encoded', note: 'Version-pure R3 responsive derivative; source rights unresolved.' }],
  };
}

const files = (await walk(assetsRoot)).sort();
const assets = [];
for (const absolute of files) {
  const relative = path.relative(root, absolute).split(path.sep).join('/');
  const buffer = await readFile(absolute);
  const extension = path.extname(absolute).slice(1).toLowerCase();
  const format = extension === 'jpeg' ? 'jpg' : extension;
  const intrinsic = dimensions(buffer, format);
  const meta = metadata(relative);
  assets.push({
    id: `asset.common-surface.r3.${relative.replace(/^assets\//, '').replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '.').toLowerCase()}`,
    revision: '0.1.0-experiment',
    path: relative,
    sha256: createHash('sha256').update(buffer).digest('hex'),
    width: intrinsic.width,
    height: intrinsic.height,
    format,
    source: meta.source,
    assetClass: meta.assetClass,
    authority: 'experiment-approved-synthetic',
    rights: {
      status: 'unresolved',
      media: ['internal-experiment-preview'],
      markets: ['none-experiment-only'],
      validFrom: '2026-08-26',
      validUntil: null,
    },
    usage: meta.usage,
    history: meta.history,
  });
}

const registry = {
  id: 'asset-registry.common-surface.r3',
  revision: '0.1.0-experiment',
  generatedAt: '2026-08-26T16:45:00+09:00',
  authorityCeiling: 'experiment-approved-synthetic / rights unresolved / no commercial release',
  assets,
};

await writeFile(path.join(assetsRoot, 'asset-registry.json'), `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
console.log(`Registered ${assets.length} R3 assets.`);
