#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOL_VERSION = '1.3.0';
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(SCRIPT_DIR, '..');

const REQUIRED_FILES = [
  'preview-baseline.html',
  'preview-hold.html',
  'sample-commerce.html',
  'assets/asset-registry.json',
];

const REQUIRED_MEDIA_IDS = [
  'media-moodboard',
  'media-packaging',
  'media-shop',
  'media-merch',
  'media-ooh',
  'media-ads',
  'media-web',
];

const REQUIRED_PRODUCT_IDS = [
  ...Array.from({ length: 11 }, (_, index) => `CS-${String(index + 1).padStart(2, '0')}`),
  'OBJ-06',
];

const REQUIRED_HOLD_STATES = [
  'default',
  'hold',
  'affected',
  'unknown',
  'unaffected',
  'released',
  'invalid',
  'loading',
  'partial',
  'stale',
  'success',
  'unavailable',
  'alternative',
  'retry',
  'rollback',
];

const REQUIRED_HOLD_TEXT = [
  { id: 'hold-status', label: 'HOLD/판매 보류 상태', pattern: /\bhold\b|판매\s*보류|보류\s*(?:중|상태)/iu },
  { id: 'batch', label: '정확한 영향 batch CS03-SYN-2608-H01', pattern: /\bCS03-SYN-2608-H01\b/iu },
  { id: 'affected-product', label: '영향 제품 CS-03', pattern: /\bCS-03\b/iu },
  { id: 'unknown', label: 'batch 미확인 경로', pattern: /(?:batch|배치|로트)[^\n.]{0,24}(?:unknown|미확인|모름)|(?:unknown|미확인)[^\n.]{0,24}(?:batch|배치|로트)/iu },
  { id: 'claim-withdrawal', label: 'claim 철회', pattern: /claim\s*(?:withdrawn|withdrawal)|표현\s*철회|문구\s*철회|철회된\s*(?:claim|표현|문구)/iu },
  { id: 'commit-block', label: '선택/commit/fulfillment 차단', pattern: /(?:선택|판매|주문|배송|commit|fulfillment)[^\n.]{0,32}(?:불가|차단|중단|보류|block|unavailable)/iu },
  { id: 'alternative', label: '대안/대체 경로', pattern: /대안|대체|\balternative\b/iu },
  { id: 'support', label: '지원/문의 경로', pattern: /지원|문의|\bsupport\b|\bhelp\b/iu },
  { id: 'rollback', label: '해제/rollback 경로', pattern: /보류\s*해제|상태\s*해제|롤백|\brollback\b|\brelease\b/iu },
  { id: 'unaffected', label: '영향받지 않은 제품의 정상 경로', pattern: /영향\s*받지\s*않은|비영향|\bunaffected\b/iu },
  { id: 'synthetic-disclaimer', label: '합성 실험임을 밝히는 문구', pattern: /experiment-approved-synthetic|합성\s*(?:실험|시나리오)|실제[^\n.]{0,24}(?:리콜|사건|위험)[^\n.]{0,16}(?:아님|아니다)/iu },
];

const THRESHOLDS = Object.freeze({
  imageAltPercent: 100,
  imageLoadingPercent: 100,
  imageDimensionsPercent: 100,
  responsiveImagePercent: 80,
  buttonTypePercent: 100,
  buttonNamePercent: 100,
  mediaIdPercent: 100,
  productIdPercent: 100,
  holdStatePercent: 100,
  holdTextPercent: 100,
  assetRegistryCoveragePercent: 100,
  forbiddenR1References: 0,
});

const ALLOWED_AUTHORITIES = new Set([
  'externally-authorized',
  'experiment-approved-synthetic',
  'unresolved',
  'prohibited',
]);

const ALLOWED_ASSET_CLASSES = new Set([
  'master',
  'reference',
  'mockup',
  'sample',
  'production',
]);

function usage() {
  return `COMMON SURFACE R3 validator v${TOOL_VERSION}

Usage:
  node r3/tools/validate-r3.mjs [options]

Options:
  --root <path>       R3 root to inspect (default: parent of tools/)
  --json              Print one JSON result object and no human report
  --strict-warnings   Treat warnings as a failed validation
  --help              Show this help

Exit codes:
  0  all required checks passed
  1  validation failed (or warnings exist with --strict-warnings)
  2  invalid CLI usage or validator internal error`;
}

function parseArgs(argv) {
  const options = {
    root: DEFAULT_ROOT,
    json: false,
    strictWarnings: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--json') options.json = true;
    else if (arg === '--strict-warnings') options.strictWarnings = true;
    else if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--root') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error('--root requires a path');
      options.root = path.resolve(value);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function percent(passed, total) {
  if (total === 0) return 100;
  return Number(((passed / total) * 100).toFixed(2));
}

function lineAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/giu, ' ')
    .replace(/&amp;/giu, '&')
    .replace(/&lt;/giu, '<')
    .replace(/&gt;/giu, '>')
    .replace(/&quot;/giu, '"')
    .replace(/&#39;|&apos;/giu, "'")
    .replace(/&#(\d+);/gu, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([0-9a-f]+);/giu, (_, number) => String.fromCodePoint(Number.parseInt(number, 16)));
}

function visibleText(html) {
  return decodeEntities(
    html
      .replace(/<script\b[\s\S]*?<\/script\s*>/giu, ' ')
      .replace(/<style\b[\s\S]*?<\/style\s*>/giu, ' ')
      .replace(/<!--([\s\S]*?)-->/gu, ' ')
      .replace(/<[^>]+>/gu, ' '),
  )
    .replace(/\s+/gu, ' ')
    .trim();
}

function attributes(tag) {
  const result = new Map();
  const expression = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gu;
  let match;
  while ((match = expression.exec(tag)) !== null) {
    const key = match[1].toLowerCase();
    if (key.startsWith('<')) continue;
    result.set(key, match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
}

function stripQueryAndFragment(value) {
  const withoutFragment = value.split('#')[0];
  return withoutFragment.split('?')[0];
}

function cleanReference(value) {
  const trimmed = decodeEntities(String(value).trim()).replace(/^<|>$/gu, '');
  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

function isExternalReference(value) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/iu.test(value);
}

function hasR1PathToken(value) {
  const pathLike = stripQueryAndFragment(cleanReference(value));
  return /(?:^|[\/_.-])r1(?:[\/_.-]|$)/iu.test(pathLike);
}

function extractReferences(text, kind) {
  const references = [];
  const add = (value, index, source) => {
    if (value == null || value.trim() === '') return;
    references.push({ value: cleanReference(value), index, source });
  };

  if (kind === 'html') {
    const attributePattern = /\b(src|href|poster)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/giu;
    let match;
    while ((match = attributePattern.exec(text)) !== null) {
      add(match[2] ?? match[3] ?? match[4], match.index, match[1].toLowerCase());
    }

    const srcsetPattern = /\bsrcset\s*=\s*(?:"([^"]*)"|'([^']*)'|([^>\s]+))/giu;
    while ((match = srcsetPattern.exec(text)) !== null) {
      const raw = match[1] ?? match[2] ?? match[3] ?? '';
      for (const candidate of raw.split(',')) {
        const url = candidate.trim().split(/\s+/u)[0];
        add(url, match.index, 'srcset');
      }
    }
  }

  if (kind === 'markdown') {
    const markdownPattern = /!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\)/gu;
    let match;
    while ((match = markdownPattern.exec(text)) !== null) {
      add(match[1] ?? match[2], match.index, 'markdown-link');
    }
  }

  const cssPattern = /url\(\s*(?:"([^"]+)"|'([^']+)'|([^)'"\s]+))\s*\)/giu;
  let cssMatch;
  while ((cssMatch = cssPattern.exec(text)) !== null) {
    add(cssMatch[1] ?? cssMatch[2] ?? cssMatch[3], cssMatch.index, 'css-url');
  }

  return references;
}

async function walkFiles(directory) {
  if (!existsSync(directory)) return [];
  const output = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walkFiles(absolute));
    else if (entry.isFile()) output.push(absolute);
  }
  return output;
}

async function sha256(file) {
  const buffer = await readFile(file);
  return createHash('sha256').update(buffer).digest('hex');
}

function pngDimensions(buffer) {
  const signature = '89504e470d0a1a0a';
  if (buffer.length < 24 || buffer.subarray(0, 8).toString('hex') !== signature) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function gifDimensions(buffer) {
  if (buffer.length < 10 || !/^GIF8[79]a$/u.test(buffer.subarray(0, 6).toString('ascii'))) return null;
  return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
}

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (offset + 2 > buffer.length) break;
    const size = buffer.readUInt16BE(offset);
    if (size < 2 || offset + size > buffer.length) break;
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    offset += size;
  }
  return null;
}

async function intrinsicDimensions(file, format) {
  const normalized = format.toLowerCase().replace(/^\./u, '');
  if (normalized === 'svg') {
    const source = await readFile(file, 'utf8');
    const viewBox = source.match(/\bviewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/iu);
    if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
    const width = source.match(/\bwidth\s*=\s*["']([\d.]+)/iu);
    const height = source.match(/\bheight\s*=\s*["']([\d.]+)/iu);
    return width && height ? { width: Number(width[1]), height: Number(height[1]) } : null;
  }

  const buffer = await readFile(file);
  if (normalized === 'png') return pngDimensions(buffer);
  if (normalized === 'gif') return gifDimensions(buffer);
  if (normalized === 'jpg' || normalized === 'jpeg') return jpegDimensions(buffer);
  return null;
}

class Validation {
  constructor(root, options) {
    this.root = root;
    this.options = options;
    this.findings = [];
    this.metrics = {
      requiredFiles: {},
      html: {},
      localReferences: { checked: 0, missing: 0, outsideRoot: 0 },
      forbiddenR1References: 0,
      registry: {
        present: false,
        entries: 0,
        validEntries: 0,
        duplicateIds: 0,
        duplicatePaths: 0,
        usedAssets: 0,
        registeredUsedAssets: 0,
        coveragePercent: null,
      },
      semanticContracts: { passed: 0, total: 0, percent: null },
    };
    this.usedAssetPaths = new Set();
    this.registryPaths = new Set();
    this.targetDocuments = [];
  }

  relative(file) {
    if (!file) return null;
    const relative = path.relative(this.root, file);
    return toPosix(relative || '.');
  }

  add(severity, code, message, file = null, details = undefined) {
    this.findings.push({
      severity,
      code,
      message,
      ...(file ? { file: this.relative(file) } : {}),
      ...(details === undefined ? {} : { details }),
    });
  }

  error(code, message, file = null, details = undefined) {
    this.add('error', code, message, file, details);
  }

  warning(code, message, file = null, details = undefined) {
    this.add('warning', code, message, file, details);
  }

  info(code, message, file = null, details = undefined) {
    this.add('info', code, message, file, details);
  }

  async requiredInputs() {
    for (const relative of REQUIRED_FILES) {
      const absolute = path.join(this.root, relative);
      const present = existsSync(absolute);
      this.metrics.requiredFiles[relative] = present;
      if (!present) this.error('MISSING_REQUIRED_FILE', `Required file is missing: ${relative}`, absolute);
    }

    for (const directoryName of ['contracts', 'evidence']) {
      const directory = path.join(this.root, directoryName);
      if (!existsSync(directory)) {
        this.error('MISSING_REQUIRED_DIRECTORY', `Required directory is missing: ${directoryName}/`, directory);
        continue;
      }
      const markdownFiles = (await walkFiles(directory)).filter((file) => file.toLowerCase().endsWith('.md'));
      if (markdownFiles.length === 0) {
        this.error('MISSING_REQUIRED_DOCUMENT', `At least one Markdown file is required in ${directoryName}/`, directory);
      } else {
        this.targetDocuments.push(...markdownFiles.map((file) => ({ file, kind: 'markdown' })));
      }
    }

    for (const relative of ['preview-baseline.html', 'preview-hold.html', 'sample-commerce.html']) {
      const file = path.join(this.root, relative);
      if (existsSync(file)) this.targetDocuments.push({ file, kind: 'html' });
    }
  }

  validateThreshold(file, code, label, actual, threshold) {
    if (actual < threshold) {
      this.error(code, `${label} is ${actual}% but must be at least ${threshold}%`, file, { actual, threshold });
    }
  }

  async html(file, isHold, requireFullPreview = true) {
    const source = await readFile(file, 'utf8');
    const relative = this.relative(file);
    const imageMatches = [...source.matchAll(/<img\b[^>]*>/giu)];
    const pictureRanges = [...source.matchAll(/<picture\b[\s\S]*?<\/picture\s*>/giu)].map((match) => ({
      start: match.index,
      end: match.index + match[0].length,
      responsive: /<source\b[^>]*\bsrcset\s*=/iu.test(match[0]) || /<img\b[^>]*\bsrcset\s*=/iu.test(match[0]),
    }));

    let altPass = 0;
    let loadingPass = 0;
    let dimensionsPass = 0;
    let responsivePass = 0;
    const imageFailures = { alt: [], loading: [], dimensions: [], responsive: [] };

    for (const match of imageMatches) {
      const attrs = attributes(match[0]);
      const line = lineAt(source, match.index);
      if (attrs.has('alt')) altPass += 1;
      else imageFailures.alt.push(line);

      if (['lazy', 'eager'].includes((attrs.get('loading') ?? '').toLowerCase())) loadingPass += 1;
      else imageFailures.loading.push(line);

      const width = Number(attrs.get('width'));
      const height = Number(attrs.get('height'));
      if (Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0) dimensionsPass += 1;
      else imageFailures.dimensions.push(line);

      const insideResponsivePicture = pictureRanges.some((range) => match.index >= range.start && match.index < range.end && range.responsive);
      if (attrs.has('srcset') || insideResponsivePicture) responsivePass += 1;
      else imageFailures.responsive.push(line);
    }

    const totalImages = imageMatches.length;
    if (totalImages === 0) {
      this.error('IMG_REQUIRED', 'Each preview must contain at least one img element', file);
    }
    const imageMetrics = {
      total: totalImages,
      altPercent: percent(altPass, totalImages),
      loadingPercent: percent(loadingPass, totalImages),
      dimensionsPercent: percent(dimensionsPass, totalImages),
      responsivePercent: percent(responsivePass, totalImages),
    };

    this.validateThreshold(file, 'IMG_ALT_COVERAGE', 'Image alt coverage', imageMetrics.altPercent, THRESHOLDS.imageAltPercent);
    this.validateThreshold(file, 'IMG_LOADING_COVERAGE', 'Image loading attribute coverage', imageMetrics.loadingPercent, THRESHOLDS.imageLoadingPercent);
    this.validateThreshold(file, 'IMG_DIMENSION_COVERAGE', 'Image width/height coverage', imageMetrics.dimensionsPercent, THRESHOLDS.imageDimensionsPercent);
    this.validateThreshold(file, 'IMG_RESPONSIVE_COVERAGE', 'Responsive image (srcset or picture) coverage', imageMetrics.responsivePercent, THRESHOLDS.responsiveImagePercent);

    if (imageFailures.alt.length) this.info('IMG_ALT_LINES', 'Images without alt attributes', file, { lines: imageFailures.alt.slice(0, 20) });
    if (imageFailures.loading.length) this.info('IMG_LOADING_LINES', 'Images without valid loading attributes', file, { lines: imageFailures.loading.slice(0, 20) });
    if (imageFailures.dimensions.length) this.info('IMG_DIMENSION_LINES', 'Images without positive width and height attributes', file, { lines: imageFailures.dimensions.slice(0, 20) });
    if (imageFailures.responsive.length) this.info('IMG_RESPONSIVE_LINES', 'Images without srcset or a responsive picture source', file, { lines: imageFailures.responsive.slice(0, 20) });

    const buttonMatches = [...source.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button\s*>/giu)];
    const openingButtonCount = [...source.matchAll(/<button\b/giu)].length;
    if (openingButtonCount !== buttonMatches.length) {
      this.error('BUTTON_MARKUP_UNPAIRED', `Found ${openingButtonCount} button openings but ${buttonMatches.length} complete button elements`, file);
    }

    let buttonTypePass = 0;
    let buttonNamePass = 0;
    const buttonFailures = { type: [], name: [], labelledby: [] };
    const documentIds = new Set([...source.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/giu)].map((match) => match[1] ?? match[2]));

    for (const match of buttonMatches) {
      const opening = `<button${match[1]}>`;
      const attrs = attributes(opening);
      const line = lineAt(source, match.index);
      const type = (attrs.get('type') ?? '').toLowerCase();
      if (['button', 'submit', 'reset'].includes(type)) buttonTypePass += 1;
      else buttonFailures.type.push(line);

      const ariaLabel = (attrs.get('aria-label') ?? '').trim();
      const labelledby = (attrs.get('aria-labelledby') ?? '').trim();
      const innerText = visibleText(match[2]);
      const innerImageAlt = [...match[2].matchAll(/<img\b[^>]*\balt\s*=\s*(?:"([^"]*)"|'([^']*)')/giu)]
        .map((image) => (image[1] ?? image[2] ?? '').trim())
        .filter(Boolean)
        .join(' ');
      let labelledbyValid = false;
      if (labelledby) {
        const missingIds = labelledby.split(/\s+/u).filter((id) => !documentIds.has(id));
        labelledbyValid = missingIds.length === 0;
        if (missingIds.length) buttonFailures.labelledby.push({ line, missingIds });
      }
      if (ariaLabel || labelledbyValid || innerText || innerImageAlt) buttonNamePass += 1;
      else buttonFailures.name.push(line);
    }

    const totalButtons = buttonMatches.length;
    if (totalButtons === 0) {
      this.error('BUTTON_REQUIRED', 'Each preview must contain at least one complete button element', file);
    }
    const buttonMetrics = {
      total: totalButtons,
      explicitTypePercent: percent(buttonTypePass, totalButtons),
      accessibleNamePercent: percent(buttonNamePass, totalButtons),
    };
    this.validateThreshold(file, 'BUTTON_TYPE_COVERAGE', 'Explicit valid button type coverage', buttonMetrics.explicitTypePercent, THRESHOLDS.buttonTypePercent);
    this.validateThreshold(file, 'BUTTON_NAME_COVERAGE', 'Accessible button name coverage', buttonMetrics.accessibleNamePercent, THRESHOLDS.buttonNamePercent);
    if (buttonFailures.type.length) this.info('BUTTON_TYPE_LINES', 'Buttons without explicit valid type', file, { lines: buttonFailures.type.slice(0, 20) });
    if (buttonFailures.name.length) this.info('BUTTON_NAME_LINES', 'Buttons without an accessible name', file, { lines: buttonFailures.name.slice(0, 20) });
    for (const failure of buttonFailures.labelledby) {
      this.error('BUTTON_LABELLEDBY_TARGET_MISSING', `aria-labelledby points to missing IDs: ${failure.missingIds.join(', ')}`, file, failure);
    }

    const mediaMissing = REQUIRED_MEDIA_IDS.filter((id) => !documentIds.has(id));
    const mediaPercent = percent(REQUIRED_MEDIA_IDS.length - mediaMissing.length, REQUIRED_MEDIA_IDS.length);
    if (requireFullPreview) {
      this.validateThreshold(file, 'MEDIA_SECTION_COVERAGE', 'Seven-medium section ID coverage', mediaPercent, THRESHOLDS.mediaIdPercent);
      if (mediaMissing.length) this.info('MEDIA_SECTION_MISSING', 'Required medium section IDs are missing', file, { missing: mediaMissing });
    }

    const productMissing = REQUIRED_PRODUCT_IDS.filter((id) => !new RegExp(`\\b${id}\\b`, 'iu').test(source));
    const productPercent = percent(REQUIRED_PRODUCT_IDS.length - productMissing.length, REQUIRED_PRODUCT_IDS.length);
    if (requireFullPreview) {
      this.validateThreshold(file, 'PRODUCT_ID_COVERAGE', 'Frozen product/object ID coverage', productPercent, THRESHOLDS.productIdPercent);
      if (productMissing.length) this.info('PRODUCT_ID_MISSING', 'Frozen product/object IDs are missing', file, { missing: productMissing });
    }

    const anchors = [...source.matchAll(/<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/giu)];
    for (const anchor of anchors) {
      const href = cleanReference(anchor[1] ?? anchor[2] ?? '');
      if (href.startsWith('#') && href.length > 1 && !documentIds.has(href.slice(1))) {
        this.error('BROKEN_FRAGMENT_LINK', `Fragment target does not exist: ${href}`, file, { line: lineAt(source, anchor.index) });
      }
    }

    let holdMetrics = null;
    if (isHold) {
      const dataStates = new Set();
      for (const stateMatch of source.matchAll(/\bdata-state\s*=\s*(?:"([^"]*)"|'([^']*)')/giu)) {
        for (const token of (stateMatch[1] ?? stateMatch[2] ?? '').toLowerCase().split(/[\s,|]+/u)) {
          if (token) dataStates.add(token);
        }
      }
      const stateMissing = REQUIRED_HOLD_STATES.filter((state) => !dataStates.has(state));
      const statePercent = percent(REQUIRED_HOLD_STATES.length - stateMissing.length, REQUIRED_HOLD_STATES.length);
      this.validateThreshold(file, 'HOLD_STATE_COVERAGE', 'HOLD data-state coverage', statePercent, THRESHOLDS.holdStatePercent);
      if (stateMissing.length) this.info('HOLD_STATE_MISSING', 'Required HOLD data-state tokens are missing', file, { missing: stateMissing });

      if (!/:focus-visible\b/iu.test(source)) {
        this.error('FOCUS_VISIBLE_MISSING', 'preview-hold.html must define a :focus-visible treatment', file);
      }

      const text = visibleText(source);
      const textMissing = REQUIRED_HOLD_TEXT.filter((requirement) => !requirement.pattern.test(text));
      const textPercent = percent(REQUIRED_HOLD_TEXT.length - textMissing.length, REQUIRED_HOLD_TEXT.length);
      this.validateThreshold(file, 'HOLD_TEXT_COVERAGE', 'HOLD visible-text concept coverage', textPercent, THRESHOLDS.holdTextPercent);
      if (textMissing.length) {
        this.info('HOLD_TEXT_MISSING', 'Required HOLD visible-text concepts are missing', file, {
          missing: textMissing.map(({ id, label }) => ({ id, label })),
        });
      }
      holdMetrics = { statePercent, textPercent };
    }

    if (relative === 'preview-baseline.html') {
      const holdOnlySection = source.match(/<section\b[^>]*\bdata-hold-only\b[^>]*>/iu)?.[0] ?? '';
      if (!/\bhidden\b/iu.test(holdOnlySection)) {
        this.error('BASELINE_HOLD_SUMMARY_EXPOSED', 'Baseline must build the HOLD-only accessibility summary with the hidden attribute', file);
      }
    }

    if (requireFullPreview) {
      const swapImages = imageMatches.filter((match) => /\bdata-baseline-src\s*=/iu.test(match[0]));
      for (const match of swapImages) {
        const attrs = attributes(match[0]);
        const hasModeAlts = (attrs.get('data-baseline-alt') ?? '').trim() && (attrs.get('data-hold-alt') ?? '').trim();
        if (!hasModeAlts) {
          this.error('MODE_ALT_SOURCE_MISSING', 'Each mode-swapped image requires non-empty data-baseline-alt and data-hold-alt values', file, { line: lineAt(source, match.index) });
        }
      }
      if (swapImages.length === 0) {
        this.error('MODE_SWAP_IMAGE_REQUIRED', 'Full previews require at least one declarative baseline/HOLD image pair', file);
      }

      const propagationTargets = new Set([...source.matchAll(/\bdata-medium-propagation\s*=\s*(?:"([^"]+)"|'([^']+)')/giu)].map((match) => match[1] ?? match[2]));
      const missingPropagation = ['moodboard', 'packaging', 'shop', 'merch', 'ooh', 'ads', 'web'].filter((target) => !propagationTargets.has(target));
      if (missingPropagation.length) {
        this.error('SEVEN_MEDIUM_PROPAGATION_MISSING', 'All seven medium projections require a propagation target', file, { missing: missingPropagation });
      }
    }

    this.metrics.html[relative] = {
      profile: requireFullPreview ? 'full-preview' : 'commerce-sample',
      images: imageMetrics,
      buttons: buttonMetrics,
      ...(requireFullPreview ? { mediaIdPercent: mediaPercent, productIdPercent: productPercent } : {}),
      ...(holdMetrics ? { hold: holdMetrics } : {}),
    };
  }

  async references(file, kind) {
    const source = await readFile(file, 'utf8');
    const references = extractReferences(source, kind);
    const seen = new Set();

    for (const reference of references) {
      const value = reference.value;
      const key = `${reference.source}:${value}`;
      if (seen.has(key)) continue;
      seen.add(key);

      if (hasR1PathToken(value)) {
        this.metrics.forbiddenR1References += 1;
        this.error('FORBIDDEN_R1_REFERENCE', `Active R3 artifact references an R1 path: ${value}`, file, {
          line: lineAt(source, reference.index),
          source: reference.source,
        });
      }

      if (value.startsWith('#') || isExternalReference(value)) continue;
      const localPart = stripQueryAndFragment(value);
      if (!localPart) continue;
      const absolute = path.resolve(path.dirname(file), localPart);
      const relativeToRoot = path.relative(this.root, absolute);
      this.metrics.localReferences.checked += 1;

      if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
        this.metrics.localReferences.outsideRoot += 1;
        this.error('LOCAL_REFERENCE_OUTSIDE_R3', `Local reference escapes the R3 root: ${value}`, file, {
          line: lineAt(source, reference.index),
        });
        continue;
      }

      if (!existsSync(absolute)) {
        this.metrics.localReferences.missing += 1;
        this.error('MISSING_LOCAL_REFERENCE', `Linked local file does not exist: ${value}`, file, {
          line: lineAt(source, reference.index),
        });
        continue;
      }

      const normalized = toPosix(relativeToRoot);
      if (normalized.startsWith('assets/') && normalized !== 'assets/asset-registry.json') {
        this.usedAssetPaths.add(normalized);
      }
    }
  }

  async semanticContracts() {
    const files = {
      catalog: path.join(this.root, 'catalog.js'),
      preview: path.join(this.root, 'preview.js'),
      commerce: path.join(this.root, 'commerce.js'),
    };
    const sources = {};
    for (const [key, file] of Object.entries(files)) {
      if (!existsSync(file)) {
        this.error('SEMANTIC_SOURCE_MISSING', `Semantic runtime source is missing: ${path.basename(file)}`, file);
        sources[key] = '';
      } else {
        sources[key] = await readFile(file, 'utf8');
      }
    }

    const checks = [
      ['catalog-canonical-fields', files.catalog, sources.catalog, /catalog_state[\s\S]*claim_authority_state[\s\S]*market[\s\S]*availability[\s\S]*last_updated_at/u],
      ['catalog-affected-and-unaffected-fixtures', files.catalog, sources.catalog, /CS03-SYN-2608-H01[\s\S]*CS03-SYN-2608-U01/u],
      ['catalog-complete-release-authority', files.catalog, sources.catalog, /affectedProductId[\s\S]*releaseScope[\s\S]*releaseEffectiveAt[\s\S]*releaseApprover[\s\S]*releaseClaimDecision[\s\S]*releaseCustomerCopy[\s\S]*releaseAuthorityDisclaimer[\s\S]*releaseMediumMap[\s\S]*localCommitRestoreAllowed[\s\S]*fulfillmentRestoreAllowed[\s\S]*claimRestoreAllowed/u],
      ['preview-exact-batch-policy', files.preview, sources.preview, /commitPolicy[\s\S]*batchStatus\s*===\s*'affected'[\s\S]*batchless-local-product-selection/u],
      ['preview-post-release-h01-policy', files.preview, sources.preview, /code\s*===\s*system\.batch\)\s*return\s*state\.binding\.holdActive\s*\?\s*'affected'\s*:\s*'released'/u],
      ['preview-unknown-no-false-clearance', files.preview, sources.preview, /\['loading',\s*'unknown',\s*'invalid',\s*'partial',\s*'stale'\][\s\S]*blocked:\s*true/u],
      ['preview-mode-alt-roundtrip', files.preview, sources.preview, /dataset\[`\$\{visualMode\}Alt`\]/u],
      ['preview-complete-release-validation', files.preview, sources.preview, /releaseRecordIsValid[\s\S]*release\.scope\s*===\s*system\.releaseScope[\s\S]*release\.effectiveAt\s*===\s*system\.releaseEffectiveAt[\s\S]*release\.approver\s*===\s*system\.releaseApprover[\s\S]*customerFacingCopy[\s\S]*authorityDisclaimer[\s\S]*mediumImpactMap/u],
      ['preview-binding-first-release', files.preview, sources.preview, /if\s*\(!publishBinding\('verified-release-binding-first',\s*candidateBinding\)\)[\s\S]*return;[\s\S]*state\.binding\s*=\s*candidateBinding[\s\S]*logEvent\('binding-first'[\s\S]*applyProjectionState\(\)/u],
      ['preview-binding-write-readback', files.preview, sources.preview, /const\s+stored\s*=\s*safeJsonStorage\(localStorage[\s\S]*const\s+echoed\s*=[\s\S]*bindingIsValid\(echoed\)[\s\S]*echoed\.revision\s*!==\s*binding\.revision/u],
      ['preview-hold-binding-before-render', files.preview, sources.preview, /nextMode\s*===\s*'hold'[\s\S]*!publishBinding\(source,\s*candidateBinding\)[\s\S]*return\s+false;[\s\S]*state\.mode\s*=\s*nextMode[\s\S]*applyProjectionState\(\)/u],
      ['preview-seven-medium-propagation', files.preview, sources.preview, /mediumTargets[\s\S]*updatePropagationLedger[\s\S]*release-restored/u],
      ['preview-distinct-released-state', files.preview, sources.preview, /code\s*===\s*system\.batch\)\s*return\s*'released'[\s\S]*code\s*===\s*system\.unaffectedBatch\)\s*return\s*'unaffected'[\s\S]*reserveMessages\.released/u],
      ['preview-malformed-release-negative-audit', files.preview, sources.preview, /auditMalformedReleaseRecords[\s\S]*mediumImpactMap[\s\S]*qa-negative-complete/u],
      ['preview-exhaustive-release-negative-leaves', files.preview, sources.preview, /claimDecision:[\s\S]*permissionsLocalCommit:[\s\S]*permissionsFulfillment:[\s\S]*permissionsClaimRestore:/u],
      ['preview-session-retention', files.preview, sources.preview, /uiStorageKey[\s\S]*sessionStorage[\s\S]*persistUiState[\s\S]*restoreUiState[\s\S]*pageshow/u],
      ['preview-persistent-audit-ledger', files.preview, sources.preview, /eventLog:\s*\[\][\s\S]*eventLog:\s*state\.eventLog[\s\S]*state\.eventLog\.push[\s\S]*renderEventLog/u],
      ['preview-alternative-retention', files.preview, sources.preview, /function\s+openAlternative\(\)[\s\S]*state\.reserveState\s*=\s*'alternative'[\s\S]*persistUiState\(\)/u],
      ['preview-binding-restore-preserves-user-context', files.preview, sources.preview, /priorReserveState[\s\S]*\['alternative',\s*'user-draft',\s*'success',\s*'retry'\][\s\S]*state\.reserveState\s*=\s*priorReserveState/u],
      ['preview-release-live-copy-preserves-user-context', files.preview, sources.preview, /!state\.binding\.holdActive[\s\S]*\['alternative',\s*'success',\s*'retry'\]\.includes\(state\.reserveState\)[\s\S]*reserveMessages\[state\.reserveState\]/u],
      ['preview-async-settlement-revalidation', files.preview, sources.preview, /lookupRequestId[\s\S]*commitRequestId[\s\S]*settledPolicy[\s\S]*state\.lastBatchCode\s*!==\s*expectedBatchCode[\s\S]*settledResult\s*=\s*validateBatchCode\(code\)/u],
      ['commerce-exact-batch-policy', files.commerce, sources.commerce, /commitPolicy[\s\S]*batchStatus\s*===\s*'affected'[\s\S]*system\.unaffectedBatch/u],
      ['commerce-shared-binding-consumer', files.commerce, sources.commerce, /bindingStorageKey[\s\S]*consumeSharedBinding[\s\S]*addEventListener\('storage'[\s\S]*pageshow/u],
      ['commerce-binding-reclassifies-h01', files.commerce, sources.commerce, /state\.lastBatchCode\s*===\s*system\.batch[\s\S]*state\.batchStatus\s*=\s*shared\.holdActive\s*\?\s*'affected'\s*:\s*'released'/u],
      ['commerce-unverified-input-fails-closed', files.commerce, sources.commerce, /enteredCode[\s\S]*enteredCode\s*!==\s*state\.lastBatchCode[\s\S]*blocked:\s*true[\s\S]*unverified-input/u],
      ['commerce-async-settlement-revalidation', files.commerce, sources.commerce, /lookupRequestId[\s\S]*commitRequestId[\s\S]*settledPolicy[\s\S]*state\.lastBatchCode\s*!==\s*expectedBatchCode[\s\S]*requestId\s*!==\s*state\.lookupRequestId/u],
      ['commerce-batch-aware-commit-identity', files.commerce, sources.commerce, /confirmedRecord[\s\S]*batchId:[\s\S]*batchAuthorityState:[\s\S]*bindingRevision:[\s\S]*previousRecord\.batchId\s*===\s*candidateRecord\.batchId/u],
      ['commerce-distinct-released-state', files.commerce, sources.commerce, /batchStatus\s*=\s*'released'[\s\S]*U01[\s\S]*fulfillment/u],
      ['commerce-session-retention', files.commerce, sources.commerce, /uiStorageKey[\s\S]*sessionStorage[\s\S]*persistUiState[\s\S]*restoreUiState[\s\S]*pageshow/u],
    ];

    this.metrics.semanticContracts.total = checks.length;
    for (const [id, file, source, pattern] of checks) {
      if (pattern.test(source)) this.metrics.semanticContracts.passed += 1;
      else this.error('SEMANTIC_CONTRACT_MISSING', `Semantic runtime contract is missing: ${id}`, file);
    }
    this.metrics.semanticContracts.percent = percent(this.metrics.semanticContracts.passed, this.metrics.semanticContracts.total);

    if (/holdReleased/u.test(sources.preview) || /holdReleased/u.test(sources.commerce)) {
      this.error('LEGACY_PRODUCT_WIDE_HOLD_FLAG', 'Legacy holdReleased boolean must not replace exact Product Binding scope', files.preview);
    }

    const rollbackFunction = sources.preview.match(/function\s+runRollback\(\)[\s\S]*?\n\s*function\s+logEvent/u)?.[0] ?? '';
    if (/batchStatus\s*=\s*'unaffected'/u.test(rollbackFunction)) {
      this.error('RELEASED_BATCH_MISCLASSIFIED', 'Released exact H01 must use batchStatus released; unaffected is reserved for U01', files.preview);
    }
  }

  async registry() {
    const file = path.join(this.root, 'assets', 'asset-registry.json');
    if (!existsSync(file)) return;
    this.metrics.registry.present = true;

    let parsed;
    try {
      parsed = JSON.parse(await readFile(file, 'utf8'));
    } catch (error) {
      this.error('ASSET_REGISTRY_INVALID_JSON', `Asset registry is not valid JSON: ${error.message}`, file);
      return;
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      this.error('ASSET_REGISTRY_INVALID_ROOT', 'Asset registry root must be an object', file);
      return;
    }
    if (typeof parsed.revision !== 'string' || parsed.revision.trim() === '') {
      this.error('ASSET_REGISTRY_REVISION_MISSING', 'Asset registry requires a non-empty top-level revision', file);
    }
    if (!Array.isArray(parsed.assets)) {
      this.error('ASSET_REGISTRY_ASSETS_MISSING', 'Asset registry requires an assets array', file);
      return;
    }

    const scanR1References = (value, trail = '$') => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => scanR1References(item, `${trail}[${index}]`));
        return;
      }
      if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, item]) => scanR1References(item, `${trail}.${key}`));
        return;
      }
      if (typeof value !== 'string') return;
      const field = trail.split('.').at(-1)?.replace(/\[\d+\]$/u, '') ?? '';
      if (/^(?:path|reference|filename|file|url|src|href)$/iu.test(field) && hasR1PathToken(value)) {
        this.metrics.forbiddenR1References += 1;
        this.error('FORBIDDEN_R1_REFERENCE', `Asset registry references an R1 path: ${value}`, file, { field: trail });
      }
    };
    scanR1References(parsed);

    this.metrics.registry.entries = parsed.assets.length;
    const ids = new Map();
    const paths = new Map();
    const requiredFields = [
      'id', 'revision', 'path', 'sha256', 'width', 'height', 'format',
      'source', 'assetClass', 'authority', 'rights', 'usage', 'history',
    ];

    for (let index = 0; index < parsed.assets.length; index += 1) {
      const findingStart = this.findings.length;
      const asset = parsed.assets[index];
      const label = `assets[${index}]`;
      if (!asset || typeof asset !== 'object' || Array.isArray(asset)) {
        this.error('ASSET_REGISTRY_ENTRY_INVALID', `${label} must be an object`, file);
        continue;
      }

      const missing = requiredFields.filter((field) => !(field in asset));
      if (missing.length) {
        this.error('ASSET_REGISTRY_FIELDS_MISSING', `${label} is missing required fields: ${missing.join(', ')}`, file, { id: asset.id ?? null });
      }

      const id = typeof asset.id === 'string' ? asset.id.trim() : '';
      if (!id) this.error('ASSET_ID_INVALID', `${label}.id must be a non-empty string`, file);
      else {
        const normalizedId = id.toLowerCase();
        if (ids.has(normalizedId)) {
          this.metrics.registry.duplicateIds += 1;
          this.error('ASSET_ID_DUPLICATE', `Duplicate asset ID: ${id}`, file, { firstIndex: ids.get(normalizedId), duplicateIndex: index });
        } else ids.set(normalizedId, index);
      }

      const assetPath = typeof asset.path === 'string' ? toPosix(asset.path.trim().replace(/^\.\//u, '')) : '';
      const absoluteAssetPath = assetPath ? path.resolve(this.root, assetPath) : '';
      const relativeToAssets = absoluteAssetPath ? path.relative(path.join(this.root, 'assets'), absoluteAssetPath) : '';
      const pathEscapesAssets = relativeToAssets.startsWith('..') || path.isAbsolute(relativeToAssets);
      if (!assetPath || path.isAbsolute(assetPath) || !assetPath.startsWith('assets/') || pathEscapesAssets) {
        this.error('ASSET_PATH_INVALID', `${label}.path must be a relative path inside assets/`, file, { path: asset.path ?? null });
      } else {
        if (paths.has(assetPath)) {
          this.metrics.registry.duplicatePaths += 1;
          this.error('ASSET_PATH_DUPLICATE', `Multiple registry entries use the same path: ${assetPath}`, file, {
            firstIndex: paths.get(assetPath), duplicateIndex: index,
          });
        } else paths.set(assetPath, index);
        this.registryPaths.add(assetPath);
      }

      const hash = typeof asset.sha256 === 'string' ? asset.sha256.toLowerCase().replace(/^sha256:/iu, '') : '';
      if (!/^[a-f0-9]{64}$/u.test(hash)) {
        this.error('ASSET_HASH_INVALID', `${label}.sha256 must be 64 hexadecimal characters, optionally prefixed with sha256:`, file, { id });
      }

      if (!Number.isInteger(asset.width) || asset.width <= 0 || !Number.isInteger(asset.height) || asset.height <= 0) {
        this.error('ASSET_DIMENSIONS_INVALID', `${label} requires positive integer width and height`, file, { id });
      }
      if (typeof asset.format !== 'string' || asset.format.trim() === '') {
        this.error('ASSET_FORMAT_INVALID', `${label}.format must be a non-empty string`, file, { id });
      }
      if (typeof asset.revision !== 'string' || asset.revision.trim() === '') {
        this.error('ASSET_REVISION_INVALID', `${label}.revision must be a non-empty string`, file, { id });
      }
      if (!ALLOWED_ASSET_CLASSES.has(asset.assetClass)) {
        this.error('ASSET_CLASS_INVALID', `${label}.assetClass must be one of: ${[...ALLOWED_ASSET_CLASSES].join(', ')}`, file, { id });
      }
      if (!ALLOWED_AUTHORITIES.has(asset.authority)) {
        this.error('ASSET_AUTHORITY_INVALID', `${label}.authority must be one of: ${[...ALLOWED_AUTHORITIES].join(', ')}`, file, { id });
      }

      if (!asset.source || typeof asset.source !== 'object' || Array.isArray(asset.source)) {
        this.error('ASSET_SOURCE_INVALID', `${label}.source must be an object`, file, { id });
      } else {
        for (const field of ['type', 'date', 'reference']) {
          if (!(field in asset.source)) this.error('ASSET_SOURCE_FIELD_MISSING', `${label}.source.${field} is required`, file, { id });
        }
        if (typeof asset.source.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(asset.source.date)) {
          this.error('ASSET_SOURCE_DATE_INVALID', `${label}.source.date must use YYYY-MM-DD`, file, { id });
        }
      }

      if (!asset.rights || typeof asset.rights !== 'object' || Array.isArray(asset.rights)) {
        this.error('ASSET_RIGHTS_INVALID', `${label}.rights must be an object`, file, { id });
      } else {
        for (const field of ['status', 'media', 'markets', 'validFrom', 'validUntil']) {
          if (!(field in asset.rights)) this.error('ASSET_RIGHTS_FIELD_MISSING', `${label}.rights.${field} is required`, file, { id });
        }
        if (!Array.isArray(asset.rights.media) || !Array.isArray(asset.rights.markets)) {
          this.error('ASSET_RIGHTS_SCOPE_INVALID', `${label}.rights.media and rights.markets must be arrays`, file, { id });
        }
      }

      if (!Array.isArray(asset.usage) || asset.usage.length === 0) {
        this.error('ASSET_USAGE_INVALID', `${label}.usage must be a non-empty array`, file, { id });
      } else {
        asset.usage.forEach((use, usageIndex) => {
          if (!use || typeof use !== 'object' || Array.isArray(use)) {
            this.error('ASSET_USAGE_ENTRY_INVALID', `${label}.usage[${usageIndex}] must be an object`, file, { id });
            return;
          }
          const usageMissing = ['surface', 'component', 'crop', 'alt'].filter((field) => !(field in use));
          if (usageMissing.length) {
            this.error('ASSET_USAGE_FIELDS_MISSING', `${label}.usage[${usageIndex}] is missing: ${usageMissing.join(', ')}`, file, { id });
          }
        });
      }
      if (!Array.isArray(asset.history)) {
        this.error('ASSET_HISTORY_INVALID', `${label}.history must be an array`, file, { id });
      }

      if (assetPath && !pathEscapesAssets && assetPath.startsWith('assets/')) {
        const absolute = absoluteAssetPath;
        if (!existsSync(absolute)) {
          this.error('ASSET_FILE_MISSING', `Registered asset file does not exist: ${assetPath}`, file, { id });
        } else {
          if (/^[a-f0-9]{64}$/u.test(hash)) {
            const actualHash = await sha256(absolute);
            if (actualHash !== hash) {
              this.error('ASSET_HASH_MISMATCH', `Registered hash does not match file: ${assetPath}`, file, { id, expected: hash, actual: actualHash });
            }
          }

          const extension = path.extname(assetPath).slice(1).toLowerCase();
          const declaredFormat = typeof asset.format === 'string' ? asset.format.toLowerCase().replace(/^image\//u, '').replace('jpeg', 'jpg') : '';
          const normalizedExtension = extension === 'jpeg' ? 'jpg' : extension;
          if (declaredFormat && declaredFormat !== normalizedExtension) {
            this.error('ASSET_FORMAT_MISMATCH', `Declared format does not match file extension: ${assetPath}`, file, { id, declaredFormat, extension });
          }

          if (Number.isInteger(asset.width) && Number.isInteger(asset.height) && declaredFormat) {
            const actualDimensions = await intrinsicDimensions(absolute, declaredFormat);
            if (actualDimensions && (actualDimensions.width !== asset.width || actualDimensions.height !== asset.height)) {
              this.error('ASSET_DIMENSIONS_MISMATCH', `Registered dimensions do not match file: ${assetPath}`, file, {
                id,
                expected: { width: asset.width, height: asset.height },
                actual: actualDimensions,
              });
            } else if (!actualDimensions) {
              this.warning('ASSET_DIMENSIONS_UNVERIFIED', `Validator cannot read intrinsic dimensions for format ${declaredFormat}: ${assetPath}`, file, { id });
            }
          }
        }
      }

      const entryErrors = this.findings.slice(findingStart).filter((finding) => finding.severity === 'error');
      if (id && entryErrors.length === 0) this.metrics.registry.validEntries += 1;
    }

    const assetsDirectory = path.join(this.root, 'assets');
    for (const assetFile of await walkFiles(assetsDirectory)) {
      const relative = toPosix(path.relative(this.root, assetFile));
      if (relative === 'assets/asset-registry.json' || path.basename(relative).startsWith('.')) continue;
      if (!this.registryPaths.has(relative)) {
        this.error('UNREGISTERED_ASSET_FILE', `Asset file is not registered: ${relative}`, file);
      }
    }
  }

  registryCoverage() {
    if (!this.metrics.registry.present) return;
    const used = [...this.usedAssetPaths];
    const registered = used.filter((assetPath) => this.registryPaths.has(assetPath));
    const coverage = percent(registered.length, used.length);
    this.metrics.registry.usedAssets = used.length;
    this.metrics.registry.registeredUsedAssets = registered.length;
    this.metrics.registry.coveragePercent = coverage;
    if (coverage < THRESHOLDS.assetRegistryCoveragePercent) {
      const missing = used.filter((assetPath) => !this.registryPaths.has(assetPath));
      this.error('ASSET_REGISTRY_COVERAGE', `Used-asset registry coverage is ${coverage}% but must be 100%`, path.join(this.root, 'assets', 'asset-registry.json'), { missing });
    }
  }

  async run() {
    await this.requiredInputs();

    for (const document of this.targetDocuments) {
      if (document.kind === 'html') {
        const basename = path.basename(document.file);
        await this.html(document.file, basename === 'preview-hold.html', basename !== 'sample-commerce.html');
      }
      await this.references(document.file, document.kind);
    }

    await this.semanticContracts();
    await this.registry();
    this.registryCoverage();

    if (this.metrics.forbiddenR1References > THRESHOLDS.forbiddenR1References) {
      this.error('FORBIDDEN_R1_REFERENCE_TOTAL', `Found ${this.metrics.forbiddenR1References} forbidden R1 path references; threshold is 0`);
    }

    const errors = this.findings.filter((finding) => finding.severity === 'error').length;
    const warnings = this.findings.filter((finding) => finding.severity === 'warning').length;
    const infos = this.findings.filter((finding) => finding.severity === 'info').length;
    const failed = errors > 0 || (this.options.strictWarnings && warnings > 0);

    return {
      tool: 'common-surface-r3-validator',
      version: TOOL_VERSION,
      generatedAt: new Date().toISOString(),
      root: this.root,
      status: failed ? 'fail' : 'pass',
      exitCode: failed ? 1 : 0,
      strictWarnings: this.options.strictWarnings,
      thresholds: THRESHOLDS,
      summary: {
        errors,
        warnings,
        infos,
        findings: this.findings.length,
      },
      metrics: this.metrics,
      findings: this.findings,
    };
  }
}

function printHuman(result) {
  console.log(`COMMON SURFACE R3 validation — ${result.status.toUpperCase()}`);
  console.log(`Root: ${result.root}`);
  console.log(`Errors: ${result.summary.errors} · Warnings: ${result.summary.warnings} · Info: ${result.summary.infos}`);
  console.log('');

  console.log('Required inputs:');
  for (const [file, present] of Object.entries(result.metrics.requiredFiles)) {
    console.log(`  ${present ? 'PASS' : 'MISSING'}  ${file}`);
  }

  const htmlEntries = Object.entries(result.metrics.html);
  if (htmlEntries.length) {
    console.log('');
    console.log('HTML metrics:');
    for (const [file, metrics] of htmlEntries) {
      console.log(`  ${file}`);
      console.log(`    images=${metrics.images.total} alt=${metrics.images.altPercent}% loading=${metrics.images.loadingPercent}% dimensions=${metrics.images.dimensionsPercent}% responsive=${metrics.images.responsivePercent}%`);
      console.log(`    buttons=${metrics.buttons.total} type=${metrics.buttons.explicitTypePercent}% name=${metrics.buttons.accessibleNamePercent}% media=${metrics.mediaIdPercent}% products=${metrics.productIdPercent}%`);
      if (metrics.hold) console.log(`    HOLD states=${metrics.hold.statePercent}% text=${metrics.hold.textPercent}%`);
    }
  }

  console.log('');
  console.log(`Local refs: ${result.metrics.localReferences.checked} checked · ${result.metrics.localReferences.missing} missing · ${result.metrics.localReferences.outsideRoot} outside R3`);
  console.log(`R1 path refs: ${result.metrics.forbiddenR1References}`);
  if (result.metrics.registry.present) {
    console.log(`Registry: ${result.metrics.registry.entries} entries · ${result.metrics.registry.coveragePercent}% used-asset coverage`);
  } else {
    console.log('Registry: MISSING · used-asset coverage not measured');
  }

  if (result.findings.length) {
    console.log('');
    console.log('Findings:');
    for (const finding of result.findings) {
      const location = finding.file ? ` [${finding.file}]` : '';
      console.log(`  ${finding.severity.toUpperCase()} ${finding.code}${location}: ${finding.message}`);
    }
  }
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error('');
    console.error(usage());
    process.exitCode = 2;
    return;
  }

  if (options.help) {
    console.log(usage());
    return;
  }

  try {
    const validation = new Validation(options.root, options);
    const result = await validation.run();
    if (options.json) console.log(JSON.stringify(result, null, 2));
    else printHuman(result);
    process.exitCode = result.exitCode;
  } catch (error) {
    const result = {
      tool: 'common-surface-r3-validator',
      version: TOOL_VERSION,
      status: 'error',
      exitCode: 2,
      error: error instanceof Error ? error.message : String(error),
    };
    if (options?.json) console.log(JSON.stringify(result, null, 2));
    else console.error(`Validator internal error: ${result.error}`);
    process.exitCode = 2;
  }
}

await main();
