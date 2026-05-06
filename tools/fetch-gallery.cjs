/* fetch-gallery.cjs — Crawl 4-6 ảnh thật/màu cho mỗi máy từ GSMArena gallery
   URL pattern: https://fdn2.gsmarena.com/vv/pics/<vendor>/<vendor>-<slug>-<N>.jpg
   Chạy: node tools/fetch-gallery.cjs
   Output: assets/images/phones/<slug>-<N>.jpg + tools/gallery-map.json
*/
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'phones');
fs.mkdirSync(OUT_DIR, { recursive: true });

/* Đọc map slug→vendor-filename từ image-map cũ */
const baseMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-map.json'), 'utf8'));

function get(url, dest) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        'Referer': 'https://www.gsmarena.com/',
        'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
      },
      timeout: 12000,
    }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return resolve(false); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length < 4000) return resolve(false); // 404 placeholder thường <4KB
        fs.writeFileSync(dest, buf);
        resolve(true);
      });
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const galleryMap = {};
  let okTotal = 0, slugDone = 0;
  const slugs = Object.keys(baseMap);

  for (const slug of slugs) {
    slugDone++;
    /* baseMap[slug] = "assets/images/phones/<slug>.jpg" — derive vendor name from local filename + slug */
    /* Vendor is first token of the GSMArena filename. Re-derive from slug pattern: */
    let vendor;
    if (slug.startsWith('iphone') || slug.startsWith('ipad') || slug.startsWith('apple') || slug.startsWith('macbook') || slug.startsWith('airpods')) vendor = 'apple';
    else if (slug.startsWith('samsung')) vendor = 'samsung';
    else if (slug.startsWith('xiaomi')) vendor = 'xiaomi';
    else if (slug.startsWith('redmi')) vendor = 'xiaomi';
    else continue;

    /* GSMArena gallery filename = `<vendor>-<slug-without-prefix>` */
    let gsmSlug;
    if (vendor === 'apple') gsmSlug = `apple-${slug}`;
    else if (vendor === 'samsung') gsmSlug = slug; // already starts with samsung-
    else if (vendor === 'xiaomi') gsmSlug = slug.startsWith('xiaomi') ? slug : `xiaomi-${slug}`;

    const gallery = [];
    for (let i = 1; i <= 6; i++) {
      const dest = path.join(OUT_DIR, `${slug}-${i}.jpg`);
      const rel = `assets/images/phones/${slug}-${i}.jpg`;
      if (fs.existsSync(dest) && fs.statSync(dest).size > 4000) {
        gallery.push(rel);
        continue;
      }
      const url = `https://fdn2.gsmarena.com/vv/pics/${vendor}/${gsmSlug}-${i}.jpg`;
      const ok = await get(url, dest);
      if (ok) {
        gallery.push(rel);
        okTotal++;
        process.stdout.write('.');
      } else {
        process.stdout.write('x');
        // Failed at i means probably no more images
        if (i === 1) break;
      }
      await sleep(150);
    }
    if (gallery.length) galleryMap[slug] = gallery;
    if (slugDone % 5 === 0) console.log(` [${slugDone}/${slugs.length}] ${slug} → ${gallery.length}`);
  }

  fs.writeFileSync(path.join(__dirname, 'gallery-map.json'), JSON.stringify(galleryMap, null, 2), 'utf8');
  console.log(`\n✓ Done. Downloaded ${okTotal} new images. ${Object.keys(galleryMap).length} slugs có gallery.`);
})();
