const fs = require('fs');
global.window = {};
eval(fs.readFileSync('assets/data/phones-catalog.js', 'utf8'));
const slugs = Object.keys(window.MM_CATALOG || {});
const today = new Date().toISOString().slice(0, 10);
const base = 'https://kinhnguyen92nvk.github.io/multimart-korea';
const staticUrls = ['/', '/price-board.html', '/blog.html', '/post.html', '/category.html'];
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
staticUrls.forEach(u => {
  xml += `  <url><loc>${base}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>\n`;
});
slugs.forEach(s => {
  xml += `  <url><loc>${base}/phone-spec.html?model=${s}</loc><lastmod>${today}</lastmod><priority>0.7</priority></url>\n`;
});
xml += '</urlset>\n';
fs.writeFileSync('sitemap.xml', xml);
console.log('Sitemap:', staticUrls.length + slugs.length, 'URLs');
