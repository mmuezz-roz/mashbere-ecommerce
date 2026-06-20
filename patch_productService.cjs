const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('src/services/server/productService.ts');
let content = fs.readFileSync(targetFile, 'utf-8');

const helperFunc = `
const fixPookeeText = (str: string | undefined | null) => {
  if (!str) return str;
  return str.replace(/Pookies/g, 'Pookees')
            .replace(/pookies/g, 'pookees')
            .replace(/POOKIES/g, 'POOKEES')
            .replace(/Pookie/g, 'Pookee')
            .replace(/pookie/g, 'pookee')
            .replace(/POOKIE/g, 'POOKEE');
};
`;

if (!content.includes('fixPookeeText')) {
  // Insert helper after imports
  content = content.replace(/import \{ Product \} from '@\/types';/, "import { Product } from '@/types';\n" + helperFunc);

  // Apply to mapToProduct
  content = content.replace(/name: dbProduct\.name,/, "name: fixPookeeText(dbProduct.name),");
  content = content.replace(/description: dbProduct\.description,/, "description: fixPookeeText(dbProduct.description),");

  // Apply to inline mappers in getAllPopsicles, getPopsicleDetail, getAllSipups, getSipupDetail, getAllPookees, getAllEquipment
  content = content.replace(/name: p\.name,/g, "name: fixPookeeText(p.name),");
  content = content.replace(/name: data\.name,/g, "name: fixPookeeText(data.name),");
  
  content = content.replace(/subtitle: d\?\.subtitle \?\? '',/g, "subtitle: fixPookeeText(d?.subtitle) ?? '',");
  content = content.replace(/label: d\?\.label \?\? '',/g, "label: fixPookeeText(d?.label) ?? '',");
  
  content = content.replace(/desc: p\.description,/g, "desc: fixPookeeText(p.description),");
  content = content.replace(/desc: data\.description,/g, "desc: fixPookeeText(data.description),");
  
  content = content.replace(/longDesc: d\?\.long_desc \?\? p\.description,/g, "longDesc: fixPookeeText(d?.long_desc ?? p.description),");
  content = content.replace(/longDesc: d\?\.long_desc \?\? data\.description,/g, "longDesc: fixPookeeText(d?.long_desc ?? data.description),");

  fs.writeFileSync(targetFile, content, 'utf-8');
  console.log('productService.ts patched successfully.');
} else {
  console.log('Already patched.');
}
