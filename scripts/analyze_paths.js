const fs = require('fs');

const d = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');
const a = fs.readFileSync('public/assets/filters/Allergen Filters.svg', 'utf8');

// Let's inspect all <path tags in Dietary with their d attribute
const dPaths = d.match(/<path[^>]+>/g) || [];
console.log('Total dPaths:', dPaths.length);

// Let's inspect all <path tags in Allergen with their d attribute
const aPaths = a.match(/<path[^>]+>/g) || [];
console.log('Total aPaths:', aPaths.length);
