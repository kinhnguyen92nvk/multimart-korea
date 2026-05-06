/* fetch-fill.cjs — Lấp 28 model còn thiếu bằng Wikipedia search + GSMArena patterns mở rộng */
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'phones');
const heroMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-map.json'), 'utf8'));

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  'Accept': '*/*',
};

function get(url, dest, ref) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { ...HEADERS, Referer: ref || 'https://www.google.com/' }, timeout: 12000 }, (res) => {
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
        res.resume(); return resolve(get(res.headers.location, dest, ref));
      }
      if (res.statusCode !== 200) { res.resume(); return resolve(false); }
      const chunks = []; res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length < 4000) return resolve(false);
        fs.writeFileSync(dest, buf); resolve(true);
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
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve(null); } });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

/* Tìm Wikipedia title chính xác qua Search API rồi mới lấy thumbnail */
async function wikiSearch(q) {
  const url = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(q)}&limit=3`;
  const j = await getJSON(url);
  if (!j || !j.pages) return null;
  for (const p of j.pages) {
    if (p.thumbnail && p.thumbnail.url) {
      // Wikimedia thumbnail URL — upgrade to full image
      let u = p.thumbnail.url.replace(/^\/\//, 'https://');
      u = u.replace(/\/thumb\//, '/').replace(/\/[^/]+$/, ''); // strip thumb size
      // Actually safer: just use as-is but request bigger
      u = p.thumbnail.url.replace(/^\/\//, 'https://');
      // Bump width
      u = u.replace(/\/(\d+)px-/, '/640px-');
      return u;
    }
  }
  return null;
}

/* Manual mapping: model -> Wikipedia search query */
const MANUAL = {
  'galaxy-s25': 'Samsung Galaxy S25',
  'galaxy-s24': 'Samsung Galaxy S24',
  'galaxy-note-20-ultra': 'Samsung Galaxy Note 20 Ultra',
  'galaxy-fold-3': 'Samsung Galaxy Z Fold 3',
  'galaxy-z-flip-5': 'Samsung Galaxy Z Flip 5',
  'galaxy-a12': 'Samsung Galaxy A12',
  'apple-watch-ultra-2': 'Apple Watch Ultra 2',
  'apple-watch-series-10': 'Apple Watch Series 10',
  'apple-watch-se-3': 'Apple Watch SE',
  'apple-watch-se-2': 'Apple Watch SE 2nd generation',
  'apple-watch-series-7': 'Apple Watch Series 7',
  'airpods-pro-2': 'AirPods Pro 2nd generation',
  'airpods-max': 'AirPods Max',
  'ipad': 'IPad (10th generation)',
  'ipad-pro-m4': 'IPad Pro (M4)',
  'ipad-pro-m2': 'IPad Pro (6th generation)',
  'ipad-pro-m1': 'IPad Pro (5th generation)',
  'macbook-air-m4': 'MacBook Air (M4)',
  'macbook-air-m2': 'MacBook Air (M2)',
  'redmi-note-12': 'Redmi Note 12',
  // Korean SKT/KT custom names — fallback: dùng base model gần nhất
  'galaxy-buddy-4': 'Samsung Galaxy A25',
  'galaxy-buddy-3': 'Samsung Galaxy A24',
  'galaxy-buddy-2': 'Samsung Galaxy A23',
  'galaxy-jum-3': 'Samsung Galaxy A55',
  'galaxy-jum-2': 'Samsung Galaxy A35',
  'galaxy-quantum-3': 'Samsung Galaxy Quantum 3',
  'galaxy-wide-quantum6': 'Samsung Galaxy Wide 6',
  'galaxy-wide-6': 'Samsung Galaxy Wide 6',
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let ok = 0;
  for (const [slug, q] of Object.entries(MANUAL)) {
    if (heroMap[slug]) continue;
    const dest = path.join(OUT_DIR, `${slug}.jpg`);
    const url = await wikiSearch(q);
    if (url) {
      const got = await get(url, dest, 'https://en.wikipedia.org/');
      if (got) {
        heroMap[slug] = `assets/images/phones/${slug}.jpg`;
        ok++;
        process.stdout.write('✓');
      } else process.stdout.write('x');
    } else process.stdout.write('.');
    await sleep(250);
  }
  console.log(`\nFilled ${ok}/${Object.keys(MANUAL).length}. Total hero: ${Object.keys(heroMap).length}`);
  fs.writeFileSync(path.join(__dirname, 'image-map.json'), JSON.stringify(heroMap, null, 2), 'utf8');
})();
