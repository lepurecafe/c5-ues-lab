#!/usr/bin/env node

import {existsSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {dirname, join, normalize, relative, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputPath = join(root, 'c5-manifest.json');
const checkMode = process.argv.includes('--check');

function fail(code, message) {
  console.error(`${code}: ${message}`);
  process.exit(1);
}

function read(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) fail('ERR_FILE_NOT_FOUND', `파일을 찾을 수 없습니다: ${relativePath}`);
  return readFileSync(path, 'utf8');
}

function section(text, heading) {
  const start = text.indexOf(heading);
  if (start < 0) fail('ERR_REGISTRY_INVALID', `Registry에서 섹션을 찾을 수 없습니다: ${heading}`);
  const rest = text.slice(start + heading.length);
  const end = rest.search(/^##\s/m);
  return end < 0 ? rest : rest.slice(0, end);
}

function tableRows(text) {
  return text.split('\n')
    .filter((line) => /^\s*\|/.test(line))
    .map((line) => line.trim().slice(1, -1).split('|').map((cell) => cell.trim()))
    .filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)));
}

function linkTarget(cell) {
  const match = cell.match(/\[[^\]]+\]\(([^)]+)\)/);
  if (!match) fail('ERR_REGISTRY_INVALID', `Registry 링크를 읽을 수 없습니다: ${cell}`);
  return match[1];
}

function rootRelative(registryPath, target) {
  return normalize(relative(root, join(dirname(join(root, registryPath)), target)));
}

function canonicalMeta(relativePath) {
  const text = read(relativePath);
  const id = text.match(/\*\*ID:\*\*\s*`([^`]+)`/i)?.[1];
  const version = text.match(/\*\*Version:\*\*\s*`?([^`\n]+)`?/i)?.[1]?.trim();
  if (!version) fail('ERR_CANONICAL_META_MISSING', `정본에 Version이 없습니다: ${relativePath}`);
  return {id, version};
}

function evidenceFiles(designPacks) {
  const files = new Set(designPacks.map((item) => item.canonical));
  for (const pack of designPacks) {
    const directory = dirname(join(root, pack.canonical));
    for (const name of readdirSync(directory)) {
      if (/\.(md)$/i.test(name) && /(qa|evidence|validation)/i.test(name)) {
        files.add(normalize(relative(root, join(directory, name))));
      }
    }
  }
  return [...files].sort();
}

function buildManifest() {
  const packRegistry = 'design-packs/README.md';
  const presetRegistry = 'ux-presets/README.md';

  const packRows = tableRows(section(read(packRegistry), '## 팩 목록')).slice(1);
  const designPacks = packRows.map(([name, canonicalCell, previewCell, status]) => {
    const canonical = rootRelative(packRegistry, linkTarget(canonicalCell));
    const preview = rootRelative(packRegistry, linkTarget(previewCell));
    const meta = canonicalMeta(canonical);
    if (!meta.id) fail('ERR_CANONICAL_META_MISSING', `정본에 ID가 없습니다: ${canonical}`);
    return {id: meta.id, name, version: meta.version, status, canonical, preview};
  });

  const presetRows = tableRows(section(read(presetRegistry), '## Registry')).slice(1);
  const uxPresets = presetRows.map(([idCell, goal, commitment, canonicalCell, status]) => {
    const id = idCell.replaceAll('`', '');
    const canonical = rootRelative(presetRegistry, linkTarget(canonicalCell));
    const meta = canonicalMeta(canonical);
    return {id, name: canonicalCell.match(/\[([^\]]+)\]/)?.[1] ?? id, version: meta.version, status, goal, commitment, canonical};
  });

  return {
    manifestVersion: '0.3.0',
    generated: true,
    generatedFrom: [packRegistry, presetRegistry],
    project: 'C5 UES Lab',
    system: 'Universal Experience System',
    systemAbbreviation: 'UES',
    title: 'Evidence-driven Experience System Laboratory',
    sourceOfTruth: {
      uxSystem: 'docs/04-universal-experience-system.md',
      designPackRegistry: packRegistry,
      uxPresetRegistry: presetRegistry,
      workflow: 'design-packs/00-md-first-experiment-workflow.md',
    },
    authorityVocabulary: ['system-recommendation', 'user-draft', 'user-commitment', 'confirmed-outcome', 'unavailable-or-invalid'],
    evidenceVocabulary: ['OBSERVED', 'BUILT', 'CHECKED', 'OPEN', 'REJECTED'],
    designPacks,
    uxPresets,
    checks: {
      requiredPackFields: ['id', 'name', 'version', 'status', 'canonical', 'preview'],
      requiredPresetFields: ['id', 'name', 'version', 'status', 'goal', 'commitment', 'canonical'],
      validStatuses: ['experimental', 'candidate', 'validated', 'archived'],
      openEvidenceFiles: evidenceFiles(designPacks),
      markdownLinkRoots: ['README.md', 'docs', 'design-packs', 'ux-presets'],
    },
  };
}

const generated = `${JSON.stringify(buildManifest(), null, 2)}\n`;
if (checkMode) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== generated) {
    fail('ERR_MANIFEST_STALE', 'c5-manifest.json이 Markdown 정본과 다릅니다. 생성기를 다시 실행하세요.');
  }
  console.log('C5 manifest check: PASS');
} else {
  writeFileSync(outputPath, generated);
  console.log('C5 manifest generated: c5-manifest.json');
}
