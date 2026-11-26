const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const master = JSON.parse(fs.readFileSync(path.join(root, 'data/quests.json'), 'utf8'));
const file = path.join(root, 'index.html');
const html = fs.readFileSync(file, 'utf8');
const marker = /^const SEED=\[.*\];$/m;
if (!marker.test(html)) throw new Error('SEED marker missing');
const ids = new Set();
for (const q of master.quests) {
  if (!q.id || ids.has(q.id)) throw new Error('Invalid or duplicate quest id: ' + q.id);
  ids.add(q.id);
  for (const field of ['costs','discard','requirements']) {
    if (!q[field] || Array.isArray(q[field]) || typeof q[field] !== 'object' || Object.values(q[field]).some(v => !Number.isFinite(v) || v < 0)) throw new Error(q.id + ': invalid ' + field);
  }
}
for (const q of master.quests) for (const p of q.prerequisites || []) if (!ids.has(p)) throw new Error(q.id + ': missing prerequisite ' + p);
const output = html.replace(marker, () => 'const SEED=' + JSON.stringify(master.quests).replace(/</g, '\\u003c') + ';');
if (process.argv.includes('--check')) {
  if (output !== html) throw new Error('Embedded master is stale; run node scripts/sync-master.cjs');
} else fs.writeFileSync(file, output);
