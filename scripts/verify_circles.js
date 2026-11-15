const fs = require('fs');

const d = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');
const a = fs.readFileSync('public/assets/filters/Allergen Filters.svg', 'utf8');

console.log('--- Dietary circles ---');
(d.match(/<circle[^>]+>/g) || []).forEach(c => console.log(c));

console.log('--- Allergen circles ---');
(a.match(/<circle[^>]+>/g) || []).forEach(c => console.log(c));
