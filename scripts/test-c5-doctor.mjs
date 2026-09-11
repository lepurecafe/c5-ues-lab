#!/usr/bin/env node

import {mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const projectRoot = join(import.meta.dirname, '..');
const doctor = join(projectRoot, 'scripts/c5-doctor.mjs');
const tempRoot = mkdtempSync('/tmp/c5-doctor-test-');

const baseManifest = {
  ...JSON.parse(readFileSync(join(projectRoot, 'c5-manifest.json'), 'utf8')),
  manifestVersion: '0.3.0',
  generatedFrom: ['design-packs/README.md', 'ux-presets/README.md'],
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

function run(manifest = baseManifest, raw = undefined) {
  write('c5-manifest.json', raw ?? JSON.stringify(manifest));
  const result = spawnSync(process.execPath, [doctor, '--json'], {
    env: {...process.env, C5_DOCTOR_ROOT: tempRoot},
    encoding: 'utf8',
  });
  if (!result.stdout) throw new Error(result.stderr || 'Doctor produced no output');
  const output = JSON.parse(result.stdout);
  assert.equal(result.signal, null, 'Doctor must not crash');
  if (output.status === 'fail') {
    assert.equal(result.status, 1, 'FAIL must return exit 1');
    assert(!output.results.some(item => item.code === 'OK_MANIFEST_VALID'), 'FAIL must not coexist with blanket Manifest PASS');
  }
  return {exitCode: result.status, output};
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

  let cases = 5;
  function rejects(label, manifest, code = 'ERR_MANIFEST_SCHEMA_INVALID', raw) {
    resetFiles();
    const result = run(manifest, raw);
    assert.equal(result.output.status, 'fail', label);
    assert(hasCode(result, code), `${label}: expected ${code}`);
    if (['ERR_MANIFEST_SCHEMA_INVALID', 'ERR_REQUIRED_FIELD_MISSING', 'ERR_MANIFEST_INVALID', 'ERR_INVALID_STATUS'].includes(code)) {
      assert.equal(result.output.results.filter(item => item.level === 'SKIP').length, 2, `${label}: content checks NOT_RUN`);
      assert.equal(result.output.counts.PASS ?? 0, 0, `${label}: no PASS without a valid input`);
    }
    cases++;
  }
  for (const value of [{}, null, [], false, true, 0, 42, '', 'manifest']) rejects(`top-level ${JSON.stringify(value)}`, value, value && !Array.isArray(value) && typeof value === 'object' ? 'ERR_REQUIRED_FIELD_MISSING' : 'ERR_MANIFEST_SCHEMA_INVALID');
  rejects('broken JSON', baseManifest, 'ERR_MANIFEST_INVALID', '{');
  const nested = '['.repeat(12000) + '0' + ']'.repeat(12000);
  for (const field of ['manifestVersion', 'generatedFrom']) {
    const raw = JSON.stringify(baseManifest).replace(`"${field}":${JSON.stringify(baseManifest[field])}`, `"${field}":${nested}`);
    rejects(`deep nested ${field} remains structured FAIL`, baseManifest, 'ERR_MANIFEST_SCHEMA_INVALID', raw);
  }
  for (const field of Object.keys(baseManifest)) {
    const input = structuredClone(baseManifest);
    delete input[field];
    rejects(`missing ${field}`, input, 'ERR_REQUIRED_FIELD_MISSING');
  }
  for (const [field, value] of [['manifestVersion', '9.0.0'], ['generated', false], ['designPacks', {}], ['uxPresets', null], ['sourceOfTruth', []], ['checks', []], ['project', '   '], ['designPacks', []], ['uxPresets', []], ['designPacks', [null]], ['uxPresets', ['bad']]]) {
    rejects(`invalid ${field} ${JSON.stringify(value)}`, {...baseManifest, [field]: value});
  }
  for (const list of ['designPacks', 'uxPresets']) {
    for (const field of Object.keys(baseManifest[list][0])) {
      const input = structuredClone(baseManifest);
      delete input[list][0][field];
      rejects(`${list} missing ${field}`, input, 'ERR_REQUIRED_FIELD_MISSING');
    }
    for (const value of [null, 7, '', '   ']) {
      const input = structuredClone(baseManifest);
      input[list][0].canonical = value;
      rejects(`${list} invalid canonical`, input);
    }
  }
  for (const field of Object.keys(baseManifest.checks)) {
    const missing = structuredClone(baseManifest);
    delete missing.checks[field];
    rejects(`missing checks.${field}`, missing, 'ERR_REQUIRED_FIELD_MISSING');
    for (const value of [[], null, 'not an array']) {
      const input = structuredClone(baseManifest);
      input.checks[field] = value;
      rejects(`invalid checks.${field}`, input);
    }
  }
  for (const value of ['unknown', null, 123]) {
    const input = structuredClone(baseManifest);
    input.designPacks[0].status = value;
    rejects('invalid status', input, 'ERR_INVALID_STATUS');
  }
  const weakened = structuredClone(baseManifest);
  weakened.checks.requiredPackFields = ['id'];
  rejects('Manifest cannot weaken checker policy', weakened);
  rejects('unknown property', {...baseManifest, check: {}});
  const prototypeKey = JSON.parse(JSON.stringify(baseManifest).replace('"manifestVersion":', '"__proto__":{},"manifestVersion":'));
  rejects('prototype property is not a schema property', prototypeKey);
  for (const [field, entry] of [['openEvidenceFiles', 'missing.md'], ['openEvidenceFiles', 'design-packs/test/preview.html'], ['openEvidenceFiles', 'docs'], ['markdownLinkRoots', 'missing'], ['markdownLinkRoots', 'empty-scope'], ['markdownLinkRoots', 'design-packs/test/preview.html'], ['markdownLinkRoots', '../outside'], ['markdownLinkRoots', '/tmp']]) {
    mkdirSync(join(tempRoot, 'empty-scope'), {recursive: true});
    const input = structuredClone(baseManifest);
    input.checks[field] = [entry];
    rejects(`unusable scope ${field}: ${entry}`, input, 'ERR_CHECK_SCOPE_INVALID');
  }
  const directoryCanonical = structuredClone(baseManifest);
  directoryCanonical.designPacks[0].canonical = 'docs';
  rejects('canonical must be a file', directoryCanonical, 'ERR_FILE_NOT_FOUND');
  const missingSource = structuredClone(baseManifest);
  missingSource.sourceOfTruth.uxSystem = 'missing.md';
  rejects('missing SSoT', missingSource, 'ERR_SOURCE_OF_TRUTH_MISSING');
  resetFiles();
  write('design-packs/test/test.md', '# no metadata');
  assert(hasCode(run(), 'ERR_CANONICAL_META_MISSING'));
  cases++;
  resetFiles();
  symlinkSync('/tmp', join(tempRoot, 'outside-link'));
  const external = structuredClone(baseManifest);
  external.checks.markdownLinkRoots = ['outside-link'];
  rejects('scope symlink escapes workspace', external, 'ERR_CHECK_SCOPE_INVALID');
  resetFiles();
  symlinkSync(join(tempRoot, 'docs'), join(tempRoot, 'docs/loop'));
  assert.equal(run().output.status, 'pass', 'directory symlink cycles must terminate');
  cases++;
  console.log(`UES Doctor tests: PASS (${cases} cases: normal, malformed input, fixed contract, paths/scopes, metadata, evidence, links)`);
} finally {
  rmSync(tempRoot, {recursive: true, force: true});
}
