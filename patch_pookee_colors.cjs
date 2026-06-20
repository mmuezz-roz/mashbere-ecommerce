const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('src/services/server/productService.ts');
let content = fs.readFileSync(targetFile, 'utf-8');

const helperFunc = `
const getPastelColor = (flavorName: string) => {
  if (!flavorName) return '#F5F5F5';
  const name = flavorName.toLowerCase();
  if (name.includes('mango')) return '#FFF8E1';
  if (name.includes('tender coconut')) return '#E7F3F3';
  if (name.includes('strawberry')) return '#F3E7F0';
  if (name.includes('pistachio')) return '#EAF3DA';
  if (name.includes('chocolate')) return '#F5E6DA';
  if (name.includes('papaya')) return '#FDF0E6';
  if (name.includes('avocado')) return '#F3F6E8';
  if (name.includes('custard apple')) return '#F6F8E8';
  if (name.includes('almond')) return '#F8EFE6';
  if (name.includes('pineapple')) return '#FFFDE7';
  if (name.includes('watermelon')) return '#FCE4EC';
  if (name.includes('guava')) return '#FCE4EC';
  if (name.includes('chikku')) return '#F3F0DA';
  return '#F5F5F5';
};
`;

if (!content.includes('getPastelColor')) {
  // Insert helper after fixPookeeText
  content = content.replace(/(const fixPookeeText =[\s\S]*?\n};\n)/, "$1\n" + helperFunc);

  // Apply to getAllPookees ONLY
  // Find getAllPookees block
  const pookeeRegex = /(async getAllPookees\(\): Promise<any\[\]> \{[\s\S]*?)(accentColor:.*?)(,[\s\S]*?\}\);)/;
  content = content.replace(pookeeRegex, (match, p1, p2, p3) => {
    return p1 + "accentColor: getPastelColor(p.name)" + p3;
  });

  fs.writeFileSync(targetFile, content, 'utf-8');
  console.log('productService.ts patched for pookee colors successfully.');
} else {
  console.log('Already patched pookee colors.');
}
