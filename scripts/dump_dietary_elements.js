const fs = require('fs');
const d = fs.readFileSync('public/assets/filters/Dietary Filters.svg', 'utf8');

const dElements = d.match(/<(circle|line|path|rect)[^>]+>/g) || [];
dElements.forEach((el, i) => {
  if (el.includes('stroke="#4E986B"') || el.includes('fill="#4E986B"') || el.includes('stroke-width="1.24') || el.includes('stroke-width="1.66') || el.includes('stroke="black"')) {
    console.log(`${i}: ${el.slice(0, 100)}`);
  }
});
