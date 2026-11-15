const fs = require('fs');

const d = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');
const a = fs.readFileSync('public/assets/filters/Allergen Filters.svg', 'utf8');

const dietaryCenters = {
  all: { cx: 25, cy: 19.5 },
  pescatarian: { cx: 24, cy: 63.5 },
  vegetarian: { cx: 174, cy: 63.5 },
  halal: { cx: 24, cy: 107.5 },
  'low-calorie': { cx: 121, cy: 107.5 },
  vegan: { cx: 24, cy: 151.5 },
  'high-protein': { cx: 127, cy: 151.5 },
};

const allergenCenters = {
  shellfish: { cx: 24, cy: 19.5 },
  dairy: { cx: 172, cy: 19.5 },
  gluten: { cx: 24, cy: 58.5 },
  nut: { cx: 161, cy: 58.5 },
  egg: { cx: 24, cy: 99.5 },
  fish: { cx: 143, cy: 99.5 },
};

// Check if Dietary has <defs> or <use>
console.log('Dietary has defs:', d.includes('<defs>'));
console.log('Allergen has defs:', a.includes('<defs>'));

// Check what <use> is used in Dietary
console.log('Dietary uses:', d.match(/<use[^>]+>/g));
