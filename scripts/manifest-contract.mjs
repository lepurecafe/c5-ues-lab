import {readFileSync} from 'node:fs';

// Trusted, versioned checker input; never loaded from C5_DOCTOR_ROOT.
const schema = JSON.parse(readFileSync(new URL('../schemas/c5-manifest-v0.3.schema.json', import.meta.url), 'utf8'));
const supported = new Set(['$schema', '$defs', '$ref', 'title', 'type', 'additionalProperties', 'required', 'properties', 'const', 'enum', 'minItems', 'uniqueItems', 'items', 'minLength', 'pattern']);

function audit(rule) {
  for (const key of Object.keys(rule)) {
    if (!supported.has(key)) throw new Error(`Unsupported contract keyword: ${key}`);
  }
  if (rule.$ref && (!rule.$ref.startsWith('#/$defs/') || !schema.$defs[rule.$ref.slice(8)])) {
    throw new Error(`Unsupported contract reference: ${rule.$ref}`);
  }
  for (const child of Object.values(rule.properties ?? {})) audit(child);
  for (const child of Object.values(rule.$defs ?? {})) audit(child);
  if (rule.items) audit(rule.items);
}
audit(schema);

function matchesConstant(value, expected) {
  // All bundled constants are primitives or flat arrays of strings. Do not
  // stringify untrusted nested input (even valid JSON can overflow the stack).
  return Array.isArray(expected)
    ? Array.isArray(value) && value.length === expected.length && expected.every((item, index) => value[index] === item)
    : value === expected;
}

// Deliberately implements only the audited keywords in this bundled schema,
// not an arbitrary JSON Schema engine or a validator for experience semantics.
export function validateManifest(value) {
  const errors = [];
  const add = (path, message, code = 'ERR_MANIFEST_SCHEMA_INVALID') => errors.push({path, message, code});
  function visit(value, rule, path) {
    if (rule.$ref) return visit(value, schema.$defs[rule.$ref.slice(8)], path);
    const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
    if (rule.type && type !== rule.type) {
      add(path, `expected ${rule.type}, received ${type}`);
      return;
    }
    if ('const' in rule && !matchesConstant(value, rule.const)) add(path, 'does not match the versioned contract');
    if (rule.enum && !rule.enum.includes(value)) add(path, 'unsupported status', 'ERR_INVALID_STATUS');
    if (type === 'string' && ((rule.minLength && value.length < rule.minLength) || (rule.pattern && !new RegExp(rule.pattern).test(value)))) add(path, 'must be a nonblank string');
    if (type === 'array') {
      if (rule.minItems && value.length < rule.minItems) add(path, `requires at least ${rule.minItems} item`);
      if (rule.items) value.forEach((item, index) => visit(item, rule.items, `${path}[${index}]`));
      // The bundled uniqueItems rules accept strings only; invalid item types
      // have already failed above and need no structural comparison.
      if (rule.uniqueItems && value.every(item => typeof item === 'string') && new Set(value).size !== value.length) add(path, 'duplicate entries');
    }
    if (type === 'object') {
      for (const field of rule.required ?? []) if (!Object.hasOwn(value, field)) add(`${path}.${field}`, 'required field missing', 'ERR_REQUIRED_FIELD_MISSING');
      for (const [field, item] of Object.entries(value)) {
        if (Object.hasOwn(rule.properties ?? {}, field)) visit(item, rule.properties[field], `${path}.${field}`);
        else if (rule.additionalProperties === false) add(`${path}.${field}`, 'unknown field');
      }
    }
  }
  visit(value, schema, '$');
  return errors;
}
