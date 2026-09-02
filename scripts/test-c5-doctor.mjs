#!/usr/bin/env node

import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const projectRoot = join(import.meta.dirname, '..');
const doctor = join(projectRoot, 'scripts/c5-doctor.mjs');
const tempRoot = mkdtempSync('/tmp/c5-doctor-test-');

const baseManifest = {
  manifestVersion: 'test',
  sourceOfTruth: {
    uxSystem: 'docs/system.md',
    designPackRegistry: 'design-packs/README.md',
    uxPresetRegistry: 'ux-presets/README.md',
    workflow: 'design-packs/workflow.md',
  },
  designPacks: [{
    id: 'pack:test', name: 'Test Pack', version: '1.0.0', status: 'experimental',
    canonical: 'design-packs/test/test.md', preview: 'design-packs/test/preview.html',
  }],
  uxPresets: [{
    id: 'decision.test', name: 'Test', version: '1.0.0', status: 'experimental',
    goal: 'test safely', commitment: 'confirm one result', canonical: 'ux-presets/decision.test.md',
  }],
  checks: {
    requiredPackFields: ['id', 'name', 'version', 'status', 'canonical', 'preview'],
    requiredPresetFields: ['id', 'name', 'version', 'status', 'goal', 'commitment', 'canonical'],
    validStatuses: ['experimental', 'candidate', 'validated', 'archived'],
    openEvidenceFiles: ['design-packs/test/test.md'],
    markdownLinkRoots: ['README.md', 'docs', 'design-packs', 'ux-presets'],
  },
};

function write(path, content) {
  const fullPath = join(tempRoot, path);
  mkdirSync(join(fullPath, '..'), {recursive: true});
  writeFileSync(fullPath, content);
}

function resetFiles() {
  write('README.md', '[System](docs/system.md)');
  write('docs/system.md', '# System');
  write('design-packs/README.md', '# Packs');
  write('design-packs/workflow.md', '# Workflow');
  write('design-packs/test/test.md', '> **ID:** `pack:test`\n> **Version:** `1.0.0`\n');
  write('design-packs/test/preview.html', '<!doctype html>');
  write('ux-presets/README.md', '# Presets');
  write('ux-presets/decision.test.md', '> **Version:** `1.0.0`\n');
}

function run(manifest = baseManifest) {
  write('c5-manifest.json', JSON.stringify(manifest));
  const result = spawnSync(process.execPath, [doctor, '--json'], {
    env: {...process.env, C5_DOCTOR_ROOT: tempRoot},
    encoding: 'utf8',
  });
  if (!result.stdout) throw new Error(result.stderr || 'Doctor produced no output');
  return {exitCode: result.status, output: JSON.parse(result.stdout)};
}

function hasCode(result, code) {
  return result.output.results.some((item) => item.code === code);
}

try {
  resetFiles();
  const valid = run();
  if (valid.exitCode !== 0 || valid.output.status !== 'pass') throw new Error('valid fixture should pass');

  const duplicate = structuredClone(baseManifest);
  duplicate.uxPresets[0].id = duplicate.designPacks[0].id;
  const duplicateResult = run(duplicate);
  if (!hasCode(duplicateResult, 'ERR_DUPLICATE_ID')) throw new Error('duplicate ID was not detected');

  const mismatch = structuredClone(baseManifest);
  mismatch.designPacks[0].version = '9.9.9';
  const mismatchResult = run(mismatch);
  if (!hasCode(mismatchResult, 'ERR_VERSION_MISMATCH')) throw new Error('version mismatch was not detected');

  resetFiles();
  write('design-packs/test/test.md', '> **ID:** `pack:test`\n> **Version:** `1.0.0`\n- [ ] Runtime evidence pending\n');
  const openResult = run();
  if (!hasCode(openResult, 'ERR_EVIDENCE_OPEN') || !hasCode(openResult, 'ERR_RUNTIME_UNVERIFIED')) throw new Error('open evidence was not detected');

  resetFiles();
  write('README.md', '[Missing](docs/missing.md)');
  const linkResult = run();
  if (!hasCode(linkResult, 'ERR_MARKDOWN_LINK_BROKEN')) throw new Error('broken Markdown link was not detected');

  console.log('UES Doctor tests: PASS (valid, duplicate ID, version mismatch, OPEN evidence, broken link)');
} finally {
  rmSync(tempRoot, {recursive: true, force: true});
}
