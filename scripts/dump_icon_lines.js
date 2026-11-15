const fs = require('fs');

const d = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');
const dLines = d.split('\n');

const a = fs.readFileSync('public/assets/filters/Allergen Filters.svg', 'utf8');
const aLines = a.split('\n');

console.log('=== Dietary lines 60-100 ===');
dLines.slice(60, 100).forEach((l, i) => console.log(`${60+i}: ${l}`));

console.log('=== Allergen lines 1-55 ===');
aLines.slice(1, 55).forEach((l, i) => console.log(`${1+i}: ${l}`));
