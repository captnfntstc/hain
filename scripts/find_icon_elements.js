const fs = require('fs');
const d = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');
const lines = d.split('\n');

console.log('--- Lines mentioning 151 or near 151 ---');
lines.forEach((l, idx) => {
  if (l.includes('151') || l.includes('150') || l.includes('152') || l.includes('148') || l.includes('154')) {
    console.log(`${idx}: ${l.slice(0, 100)}`);
  }
});
