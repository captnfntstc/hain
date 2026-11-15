const fs = require('fs');
const a = fs.readFileSync('public/assets/filters/Allergen Filters.svg', 'utf8');

const aElements = a.match(/<(circle|line|path)[^>]+>/g) || [];
aElements.forEach((el, i) => {
  console.log(`${i}: ${el.slice(0, 100)}`);
});
