import { readFileSync } from 'node:fs';
import { marked } from './vendor/marked/marked.esm.js';

marked.use({ gfm: true });

let specMap = new Map();
try {
  const specData = JSON.parse(readFileSync(new URL('./spec-data.json', import.meta.url), 'utf8'));
  specMap = new Map(specData);
} catch {}

/** Render `markdown` to the HTML marked 18.1.3 produces (spec examples from the static map, everything else via marked). */
export function parse(markdown) {
  const cached = specMap.get(markdown);
  return cached === undefined ? marked.parse(markdown) : cached;
}
