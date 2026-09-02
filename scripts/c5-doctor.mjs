#!/usr/bin/env node

import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, relative, resolve} from 'node:path';

const root = resolve(process.env.C5_DOCTOR_ROOT ?? resolve(import.meta.dirname, '..'));
const manifestPath = resolve(root, 'c5-manifest.json');
const jsonMode = process.argv.includes('--json');
const results = [];

function report(level, code, message, detail = '', data = undefined) {
  results.push({level, code, message, ...(detail ? {detail} : {}), ...(data ? {data} : {})});
}

function checkFile(relativePath, code = 'ERR_FILE_NOT_FOUND') {
  if (!relativePath || !existsSync(resolve(root, relativePath))) {
    report('FAIL', code, `파일을 찾을 수 없습니다: ${relativePath ?? '(missing path)'}`);
    return false;
  }
  return true;
}

function checkRequiredFields(item, fields, label) {
  for (const field of fields) {
    if (item[field] === undefined || item[field] === '') {
      report('FAIL', 'ERR_REQUIRED_FIELD_MISSING', `${label}에 필수 항목이 없습니다: ${field}`);
    }
  }
}

function readCanonicalMeta(relativePath) {
  const text = readFileSync(resolve(root, relativePath), 'utf8');
  const id = text.match(/\*\*ID:\*\*\s*`([^`]+)`/i)?.[1];
  const version = text.match(/\*\*Version:\*\*\s*`?([^`\n]+)`?/i)?.[1]?.trim();
  return {id, version};
}

function markdownFiles(entries) {
  const files = new Set();
  const visit = (path) => {
    if (!existsSync(path)) return;
    const info = statSync(path);
    if (info.isDirectory()) {
      for (const name of readdirSync(path)) {
        if (name.startsWith('.') || name === 'node_modules' || name === 'graphify-out') continue;
        visit(resolve(path, name));
      }
    } else if (extname(path).toLowerCase() === '.md') {
      files.add(path);
    }
  };
  for (const entry of entries) visit(resolve(root, entry));
  return [...files].sort();
}

function contentLines(path) {
  const lines = readFileSync(path, 'utf8').split('\n');
  let inFence = false;
  return lines.map((text, index) => {
    if (/^\s*(```|~~~)/.test(text)) {
      inFence = !inFence;
      return null;
    }
    return inFence ? null : {text, line: index + 1};
  }).filter(Boolean);
}

function findOpenEvidence(files) {
  const findings = [];
  for (const path of files) {
    for (const {text, line} of contentLines(path)) {
      const unchecked = /^\s*-\s*\[\s\]/.test(text);
      const statusLine = /^\s*>?\s*\*\*(?:Evidence\s+)?Status:\*\*/i.test(text)
        && /\b(pending|unresolved|remain(?:s)?\s+open)\b/i.test(text);
      const tableStatus = /^\s*\|/.test(text)
        && /\|\s*(OPEN|pending|unresolved)\s*\|/i.test(text);
      if (unchecked || statusLine || tableStatus) {
        findings.push({file: relative(root, path), line, kind: unchecked ? 'unchecked' : statusLine ? 'status' : 'table-status', text: text.trim()});
      }
    }
  }
  return findings;
}

function findBrokenLinks(files) {
  const findings = [];
  for (const path of files) {
    for (const {text, line} of contentLines(path)) {
      for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
        let target = match[1].trim();
        if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
        if (!target || target.startsWith('#') || target.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
        target = target.split('#')[0].split('?')[0];
        try {
          target = decodeURIComponent(target);
        } catch {
          findings.push({file: relative(root, path), line, target, reason: 'invalid URL encoding'});
          continue;
        }
        if (!existsSync(resolve(dirname(path), target))) {
          findings.push({file: relative(root, path), line, target, reason: 'not found'});
        }
      }
    }
  }
  return findings;
}

let manifest;
if (!existsSync(manifestPath)) {
  report('FAIL', 'ERR_MANIFEST_NOT_FOUND', 'c5-manifest.json이 없습니다.');
} else {
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    report('FAIL', 'ERR_MANIFEST_INVALID', `Manifest JSON을 읽을 수 없습니다: ${error.message}`);
  }
}

if (manifest) {
  for (const source of Object.values(manifest.sourceOfTruth ?? {})) {
    checkFile(source, 'ERR_SOURCE_OF_TRUTH_MISSING');
  }

  const items = [
    ...(manifest.designPacks ?? []).map((item) => ({...item, kind: 'Design Pack'})),
    ...(manifest.uxPresets ?? []).map((item) => ({...item, kind: 'UX Preset'})),
  ];
  const seen = new Set();
  const validStatuses = manifest.checks?.validStatuses ?? [];

  for (const item of items) {
    const fields = item.kind === 'Design Pack'
      ? manifest.checks?.requiredPackFields ?? []
      : manifest.checks?.requiredPresetFields ?? [];
    checkRequiredFields(item, fields, `${item.kind} ${item.id ?? '(unknown)'}`);

    if (seen.has(item.id)) report('FAIL', 'ERR_DUPLICATE_ID', `ID가 중복되었습니다: ${item.id}`);
    seen.add(item.id);

    if (!validStatuses.includes(item.status)) {
      report('FAIL', 'ERR_INVALID_STATUS', `허용되지 않은 상태입니다: ${item.id} → ${item.status}`);
    }
    if (checkFile(item.canonical)) {
      const source = readCanonicalMeta(item.canonical);
      if (source.id && source.id !== item.id) {
        report('FAIL', 'ERR_SOURCE_ID_MISMATCH', `정본 ID와 Manifest ID가 다릅니다: ${item.id} ↔ ${source.id}`);
      }
      if (source.version && source.version !== item.version) {
        report('FAIL', 'ERR_VERSION_MISMATCH', `버전이 다릅니다: ${item.id} → Manifest ${item.version}, 정본 ${source.version}`);
      }
    }
    if (item.preview) checkFile(item.preview);
  }

  const openEvidence = findOpenEvidence(markdownFiles(manifest.checks?.openEvidenceFiles ?? manifest.checks?.openEvidenceRoots ?? []));
  if (openEvidence.length > 0) {
    const fileCount = new Set(openEvidence.map((item) => item.file)).size;
    report('WARN', 'ERR_EVIDENCE_OPEN', `미완료 증거 ${openEvidence.length}개를 ${fileCount}개 문서에서 찾았습니다.`, '', {findings: openEvidence});
    const runtimeEvidence = openEvidence.filter((item) => /runtime|screen.reader|assistive|accessibility|keyboard|contrast|responsive|reduced.motion/i.test(item.text));
    if (runtimeEvidence.length > 0) {
      report('WARN', 'ERR_RUNTIME_UNVERIFIED', `런타임·접근성 관련 미완료 증거 ${runtimeEvidence.length}개가 남아 있습니다.`, '', {findings: runtimeEvidence});
    }
  } else {
    report('PASS', 'OK_NO_OPEN_EVIDENCE', '관리 범위에서 미완료 증거 표식을 찾지 못했습니다.');
  }

  const linkFiles = markdownFiles(manifest.checks?.markdownLinkRoots ?? []);
  const brokenLinks = findBrokenLinks(linkFiles);
  if (brokenLinks.length > 0) {
    report('FAIL', 'ERR_MARKDOWN_LINK_BROKEN', `깨진 내부 Markdown 링크 ${brokenLinks.length}개를 찾았습니다.`, '', {findings: brokenLinks});
  } else {
    report('PASS', 'OK_MARKDOWN_LINKS', `내부 Markdown 링크를 확인했습니다: ${linkFiles.length}개 문서.`);
  }

  report('PASS', 'OK_MANIFEST_VALID', `Manifest ${manifest.manifestVersion} 구조와 등록 항목을 확인했습니다.`);
}

const counts = results.reduce((acc, result) => {
  acc[result.level] = (acc[result.level] ?? 0) + 1;
  return acc;
}, {});
const status = (counts.FAIL ?? 0) > 0 ? 'fail' : (counts.WARN ?? 0) > 0 ? 'warn' : 'pass';

if (jsonMode) {
  console.log(JSON.stringify({status, counts, results}, null, 2));
} else {
  console.log('UES Doctor — C5 UES Lab workspace health check');
  for (const result of results) {
    const suffix = result.detail ? ` (${result.detail})` : '';
    console.log(`${result.level.padEnd(4)} ${result.code.padEnd(32)} ${result.message}${suffix}`);
  }
  console.log(`Summary: ${counts.PASS ?? 0} passed, ${counts.WARN ?? 0} warnings, ${counts.FAIL ?? 0} failures`);
}
process.exitCode = (counts.FAIL ?? 0) > 0 ? 1 : 0;
