/* Build phones[] for products.js from scan-result.xlsx
   Output: writes assets/data/phones-generated.txt (just the array contents to paste in)
*/
const X = require('xlsx');
const fs = require('fs');

const wb = X.readFile('scan-result.xlsx');
const arr = X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' });
const rows = arr.slice(1).filter(r => r[1]); // skip header & empty model
const IMAGE_MAP = JSON.parse(fs.readFileSync('tools/image-map.json','utf8'));

// Build slug from model name
const slug = (s) => String(s).toLowerCase()
  .replace(/galaxy redmi note/, 'redmi-note')
  .replace(/samsung galaxy /, 'galaxy-')
  .replace(/galaxy /, 'galaxy-')
  .replace(/iphone /, 'iphone-')
  .replace(/apple watch /, 'apple-watch-')
  .replace(/macbook air /, 'macbook-air-')
  .replace(/ipad pro /, 'ipad-pro-')
  .replace(/airpods /, 'airpods-')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

// Pick image key based on slug
const pickImg = (m, brand) => {
  const s = m.toLowerCase();
  if (/iphone\s*1[5-9]\s*pro|iphone\s*2\d\s*pro/.test(s)) return '_PI.ip15pro[0]';
  if (/iphone\s*1[5-9]\b|iphone\s*1[5-9]\s*plus|iphone\s*1[5-9]\s*air|iphone\s*2\d/.test(s)) return '_PI.ip15[0]';
  if (/iphone\s*14\s*pro/.test(s))    return '_PI.ip14pro[0]';
  if (/iphone\s*14/.test(s))          return '_PI.ip14[0]';
  if (/iphone\s*13\s*pro/.test(s))    return '_PI.ip13pro[0]';
  if (/iphone\s*13/.test(s))          return '_PI.ip13[0]';
  if (/iphone\s*12/.test(s))          return '_PI.ip12[0]';
  if (/iphone\s*(11|xs|x|se|8|7|6)/.test(s)) return '_PI.ipold[0]';
  if (/z\s*flip|galaxy\s*flip/.test(s)) return '_PI.ssFlip[0]';
  if (/fold/.test(s))                 return '_PI.ssFold[0]';
  if (/galaxy|samsung|note|^s\d/.test(s) || brand === 'Samsung') return '_PI.ssS[0]';
  if (/watch/.test(s))                return '_PI.watch[0]';
  if (/airpods/.test(s))              return '_PI.airpods[0]';
  if (/macbook|mac/.test(s))          return '_PI.mac[0]';
  if (/ipad/.test(s))                 return '_PI.mac[0]';
  if (/redmi|xiaomi/.test(s))         return '_PI.ssS[0]';
  return '_PI.ipold[0]';
};

const j = (v) => JSON.stringify(v == null ? '' : v);

let out = [];
let lastBrand = '';
rows.forEach((r, i) => {
  const [brand, model, memory, priceA_raw, statusA, priceNew_raw, statusNew, note] = r;
  const priceA   = (typeof priceA_raw   === 'number' && priceA_raw   > 0) ? priceA_raw   : null;
  const priceNew = (typeof priceNew_raw === 'number' && priceNew_raw > 0) ? priceNew_raw : null;
  const status = (priceA != null || priceNew != null) ? 'in' : 'out';
  const id = (slug(model) + '-' + slug(memory)).slice(0, 50) + '-' + i;
  const cat = slug(model);

  // Brand tags & section header on change
  if (brand !== lastBrand) {
    out.push(`\n      /* ─── ${brand.toUpperCase()} ─── */`);
    lastBrand = brand;
  }

  out.push(
    `      { id:${j(id)}, brand:${j(brand)}, model:${j(model)}, config:${j(memory)}, ` +
    `priceA:${priceA == null ? 'null' : priceA}, priceNew:${priceNew == null ? 'null' : priceNew}, ` +
    `status:${j(status)}, colors:${note ? j(note) : 'null'}, catalog:${j(cat)}, img:MM_GET_IMAGE(${j(cat)},${j(model)},${j(brand)}) },`
  );
});

const result = out.join('\n');
fs.writeFileSync('phones-generated.txt', result);
console.log('Generated', rows.length, 'phones rows ->', 'phones-generated.txt');
console.log('First 10 lines:\n' + result.split('\n').slice(0,10).join('\n'));
