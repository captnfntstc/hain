const fs = require('fs');

const d = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');
const a = fs.readFileSync('public/assets/filters/Allergen Filters.svg', 'utf8');

// Find all matches of elements around green strokes #4E986B in Dietary
console.log('--- Dietary svg elements ---');
const dLines = d.split('\n');
dLines.forEach((line, idx) => {
  if (line.includes('#4E986B') || line.includes('<use') || line.includes('<mask')) {
    console.log(`Line ${idx}: ${line.slice(0, 100)}`);
  }
});

console.log('--- Allergen svg elements ---');
const aLines = a.split('\n');
aLines.forEach((line, idx) => {
  if (line.includes('stroke=') || line.includes('circle') || line.includes('#') && !line.includes('#filter')) {
    console.log(`Line ${idx}: ${line.slice(0, 100)}`);
  }
});
