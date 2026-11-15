const fs = require('fs');
const path = require('path');

const dietarySvg = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');
const allergenSvg = fs.readFileSync('public/assets/filters/Allergen Filters.svg', 'utf8');

const outDir = 'public/assets/filters/icons';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Extract defs from dietary and allergen
const dDefs = dietarySvg.match(/<defs>[\s\S]*?<\/defs>/)?.[0] || '';
const aDefs = allergenSvg.match(/<defs>[\s\S]*?<\/defs>/)?.[0] || '';

const icons = [
  // Dietary
  { name: 'all', svg: dietarySvg, cx: 25, cy: 19.5, r: 14, defs: dDefs },
  { name: 'pescatarian', svg: dietarySvg, cx: 24, cy: 63.5, r: 14, defs: dDefs },
  { name: 'vegetarian', svg: dietarySvg, cx: 174, cy: 63.5, r: 14, defs: dDefs },
  { name: 'halal', svg: dietarySvg, cx: 24, cy: 107.5, r: 14, defs: dDefs },
  { name: 'low-calorie', svg: dietarySvg, cx: 121, cy: 107.5, r: 14, defs: dDefs },
  { name: 'vegan', svg: dietarySvg, cx: 24, cy: 151.5, r: 14, defs: dDefs },
  { name: 'high-protein', svg: dietarySvg, cx: 127, cy: 151.5, r: 14, defs: dDefs },
  // Allergen
  { name: 'shellfish-free', svg: allergenSvg, cx: 24, cy: 19.5, r: 14, defs: aDefs },
  { name: 'dairy-free', svg: allergenSvg, cx: 172, cy: 19.5, r: 14, defs: aDefs },
  { name: 'gluten-free', svg: allergenSvg, cx: 24, cy: 58.5, r: 14, defs: aDefs },
  { name: 'nut-free', svg: allergenSvg, cx: 161, cy: 58.5, r: 14, defs: aDefs },
  { name: 'egg-free', svg: allergenSvg, cx: 24, cy: 99.5, r: 14, defs: aDefs },
  { name: 'fish-free', svg: allergenSvg, cx: 143, cy: 99.5, r: 14, defs: aDefs },
];

icons.forEach(({ name, svg, cx, cy, r, defs }) => {
  const vbX = (cx - r).toFixed(1);
  const vbY = (cy - r).toFixed(1);
  const vbSize = (r * 2).toFixed(1);
  // remove the outer svg tag and closing tag, keep inner content
  const inner = svg
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();

  const iconSvg = `<svg width="28" height="28" viewBox="${vbX} ${vbY} ${vbSize} ${vbSize}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
${inner}
</svg>`;

  fs.writeFileSync(path.join(outDir, `${name}.svg`), iconSvg, 'utf8');
  console.log(`Saved ${name}.svg (viewBox: ${vbX} ${vbY} ${vbSize} ${vbSize})`);
});
