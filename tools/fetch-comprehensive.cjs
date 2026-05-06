/* fetch-comprehensive.cjs — Crawl ảnh đa nguồn cho 106 model
   Sources (theo thứ tự ưu tiên):
   1. GSMArena bigpic — apple/samsung/xiaomi/oneplus
   2. GSMArena gallery (1-6)
   3. Apple support PNG (cho Watch/iPad/Mac/AirPods)
   4. Wikipedia REST summary thumbnail

   Output: assets/images/phones/<slug>.jpg + tools/image-map.json
           assets/images/phones/<slug>-N.jpg + tools/gallery-map.json
*/
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'phones');
fs.mkdirSync(OUT_DIR, { recursive: true });

global.window = {};
eval(fs.readFileSync(path.join(__dirname, '..', 'assets/data/phones-catalog.js'), 'utf8'));
const CATALOG = window.MM_CATALOG;
const SLUGS = Object.keys(CATALOG);

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
};

function get(url, dest, referer) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: { ...HEADERS, Referer: referer || 'https://www.google.com/' },
      timeout: 12000,
    }, (res) => {
      // Follow redirects
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        return resolve(get(res.headers.location, dest, referer));
      }
      if (res.statusCode !== 200) { res.resume(); return resolve(false); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length < 4000) return resolve(false);
        fs.writeFileSync(dest, buf);
        resolve(true);
      });
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

function getJSON(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: HEADERS, timeout: 10000 }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return resolve(null); }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve(null); } });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* Sinh các URL ứng viên cho hero image của 1 slug */
function gsmCandidates(slug) {
  const urls = [];
  const base = 'https://fdn2.gsmarena.com/vv/bigpic';
  // Trực tiếp dùng slug
  urls.push(`${base}/${slug}.jpg`);
  // Apple iPhone
  if (slug.startsWith('iphone')) {
    urls.push(`${base}/apple-${slug}.jpg`);
    // SE 2020/2022 dùng dấu ngoặc
    if (slug.includes('-se-')) {
      urls.push(`${base}/apple-${slug.replace('-se-', '-se--')}-.jpg`);
    }
  }
  // iPad
  if (slug.startsWith('ipad')) {
    urls.push(`${base}/apple-${slug}.jpg`);
    urls.push(`${base}/apple-${slug}-2024.jpg`);
  }
  // Apple Watch
  if (slug.startsWith('apple-watch')) {
    urls.push(`${base}/${slug}.jpg`);
  }
  // Samsung Galaxy
  if (slug.startsWith('galaxy-')) {
    urls.push(`${base}/samsung-${slug}.jpg`);
    urls.push(`${base}/samsung-${slug}-5g.jpg`);
    // Note variants
    if (slug.startsWith('galaxy-note-')) {
      urls.push(`${base}/samsung-${slug.replace('note-','note')}.jpg`);
    }
    // Fold/Flip
    if (slug.includes('fold') || slug.includes('flip')) {
      urls.push(`${base}/samsung-${slug.replace('-fold-','-z-fold')}.jpg`);
      urls.push(`${base}/samsung-${slug.replace('-flip-','-z-flip')}.jpg`);
    }
  }
  if (slug.startsWith('samsung-watch-')) {
    urls.push(`${base}/${slug}.jpg`);
    urls.push(`${base}/${slug.replace('samsung-watch','samsung-galaxy-watch')}.jpg`);
  }
  // Redmi
  if (slug.startsWith('redmi-')) {
    urls.push(`${base}/xiaomi-${slug}.jpg`);
  }
  // MacBook
  if (slug.startsWith('macbook')) {
    urls.push(`${base}/apple-${slug}.jpg`);
  }
  return urls;
}

async function tryWikipedia(name) {
  /* Wikipedia REST API - summary endpoint trả thumbnail */
  const title = encodeURIComponent(name);
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
  const j = await getJSON(url);
  if (j && j.thumbnail && j.thumbnail.source) {
    // Lấy bản hi-res hơn nếu có
    return j.originalimage?.source || j.thumbnail.source;
  }
  return null;
}

(async () => {
  const heroMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-map.json'), 'utf8'));
  let added = 0;
  const todo = SLUGS.filter(s => !heroMap[s]);
  console.log(`To fetch: ${todo.length} slugs`);

  for (const slug of todo) {
    const cat = CATALOG[slug];
    const dest = path.join(OUT_DIR, `${slug}.jpg`);
    const rel = `assets/images/phones/${slug}.jpg`;

    // 1. GSMArena
    let ok = false;
    for (const u of gsmCandidates(slug)) {
      ok = await get(u, dest, 'https://www.gsmarena.com/');
      if (ok) { process.stdout.write('G'); break; }
      await sleep(80);
    }

    // 2. Wikipedia thumbnail
    if (!ok && cat?.searchTerm) {
      const url = await tryWikipedia(cat.searchTerm);
      if (url) {
        ok = await get(url, dest, 'https://en.wikipedia.org/');
        if (ok) process.stdout.write('W');
      }
    }
    if (!ok && cat?.name) {
      const url = await tryWikipedia(cat.name);
      if (url) {
        ok = await get(url, dest, 'https://en.wikipedia.org/');
        if (ok) process.stdout.write('w');
      }
    }

    if (ok) {
      heroMap[slug] = rel;
      added++;
    } else {
      process.stdout.write('.');
    }
    await sleep(200);
  }

  console.log(`\n✓ Added ${added} new hero images. Total: ${Object.keys(heroMap).length}/${SLUGS.length}`);
  fs.writeFileSync(path.join(__dirname, 'image-map.json'), JSON.stringify(heroMap, null, 2), 'utf8');
})();
