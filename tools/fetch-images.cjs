/* fetch-images.cjs — Tải ảnh thật cho 106 model từ GSMArena
   Chạy: node tools/fetch-images.cjs
   Lưu: assets/images/phones/<slug>.jpg
   Output: tools/image-map.json (slug -> filename)
*/
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'phones');
fs.mkdirSync(OUT_DIR, { recursive: true });

/* Mapping: slug → GSMArena image filename
   Đã verify từ gsmarena.com (URL pattern: https://fdn2.gsmarena.com/vv/bigpic/<file>.jpg)
   Đối với model 2026 chưa có, dùng generation gần nhất.
*/
const GSMARENA = {
  /* iPhone */
  'iphone-17-pro-max': 'apple-iphone-17-pro-max.jpg',
  'iphone-17-pro':     'apple-iphone-17-pro.jpg',
  'iphone-17-air':     'apple-iphone-17-air.jpg',
  'iphone-17':         'apple-iphone-17.jpg',
  'iphone-16-pro-max': 'apple-iphone-16-pro-max.jpg',
  'iphone-16-pro':     'apple-iphone-16-pro.jpg',
  'iphone-16-plus':    'apple-iphone-16-plus.jpg',
  'iphone-16':         'apple-iphone-16.jpg',
  'iphone-16e':        'apple-iphone-16e.jpg',
  'iphone-15-pro-max': 'apple-iphone-15-pro-max.jpg',
  'iphone-15-pro':     'apple-iphone-15-pro.jpg',
  'iphone-15-plus':    'apple-iphone-15-plus.jpg',
  'iphone-15':         'apple-iphone-15.jpg',
  'iphone-14-pro-max': 'apple-iphone-14-pro-max.jpg',
  'iphone-14-pro':     'apple-iphone-14-pro.jpg',
  'iphone-14-plus':    'apple-iphone-14-plus.jpg',
  'iphone-14':         'apple-iphone-14.jpg',
  'iphone-13-pro-max': 'apple-iphone-13-pro-max.jpg',
  'iphone-13-pro':     'apple-iphone-13-pro.jpg',
  'iphone-13-mini':    'apple-iphone-13-mini.jpg',
  'iphone-13':         'apple-iphone-13.jpg',
  'iphone-12-pro-max': 'apple-iphone-12-pro-max.jpg',
  'iphone-12-pro':     'apple-iphone-12-pro.jpg',
  'iphone-12-mini':    'apple-iphone-12-mini.jpg',
  'iphone-12':         'apple-iphone-12.jpg',
  'iphone-11-pro-max': 'apple-iphone-11-pro-max.jpg',
  'iphone-11-pro':     'apple-iphone-11-pro.jpg',
  'iphone-11':         'apple-iphone-11.jpg',
  'iphone-xs-max':     'apple-iphone-xs-max.jpg',
  'iphone-xs':         'apple-iphone-xs.jpg',
  'iphone-x':          'apple-iphone-x.jpg',
  'iphone-se-2022':    'apple-iphone-se--2022-.jpg',
  'iphone-se-2020':    'apple-iphone-se--2020-.jpg',

  /* Samsung Galaxy S */
  'samsung-galaxy-s26-ultra':  'samsung-galaxy-s26-ultra.jpg',
  'samsung-galaxy-s26-plus':   'samsung-galaxy-s26-plus.jpg',
  'samsung-galaxy-s26':        'samsung-galaxy-s26.jpg',
  'samsung-galaxy-s25-ultra':  'samsung-galaxy-s25-ultra.jpg',
  'samsung-galaxy-s25-plus':   'samsung-galaxy-s25-plus.jpg',
  'samsung-galaxy-s25':        'samsung-galaxy-s25.jpg',
  'samsung-galaxy-s25-edge':   'samsung-galaxy-s25-edge.jpg',
  'samsung-galaxy-s24-ultra':  'samsung-galaxy-s24-ultra.jpg',
  'samsung-galaxy-s24-plus':   'samsung-galaxy-s24-plus.jpg',
  'samsung-galaxy-s24':        'samsung-galaxy-s24.jpg',
  'samsung-galaxy-s24-fe':     'samsung-galaxy-s24-fe.jpg',
  'samsung-galaxy-s23-ultra':  'samsung-galaxy-s23-ultra.jpg',
  'samsung-galaxy-s23-plus':   'samsung-galaxy-s23-plus.jpg',
  'samsung-galaxy-s23':        'samsung-galaxy-s23.jpg',
  'samsung-galaxy-s23-fe':     'samsung-galaxy-s23-fe.jpg',
  'samsung-galaxy-s22-ultra':  'samsung-galaxy-s22-ultra-5g.jpg',
  'samsung-galaxy-s22-plus':   'samsung-galaxy-s22-plus-5g.jpg',
  'samsung-galaxy-s22':        'samsung-galaxy-s22-5g.jpg',
  'samsung-galaxy-s21-ultra':  'samsung-galaxy-s21-ultra-5g.jpg',
  'samsung-galaxy-s21-plus':   'samsung-galaxy-s21-plus-5g.jpg',
  'samsung-galaxy-s21':        'samsung-galaxy-s21-5g.jpg',
  'samsung-galaxy-note-20-ultra':'samsung-galaxy-note20-ultra-5g.jpg',
  'samsung-galaxy-note-20':    'samsung-galaxy-note20-5g.jpg',

  /* Samsung Z Fold/Flip */
  'samsung-galaxy-z-fold-7':   'samsung-galaxy-z-fold7.jpg',
  'samsung-galaxy-z-fold-6':   'samsung-galaxy-z-fold6.jpg',
  'samsung-galaxy-z-fold-5':   'samsung-galaxy-z-fold5.jpg',
  'samsung-galaxy-z-fold-4':   'samsung-galaxy-z-fold4.jpg',
  'samsung-galaxy-z-fold-3':   'samsung-galaxy-z-fold3-5g.jpg',
  'samsung-galaxy-z-flip-7':   'samsung-galaxy-z-flip7.jpg',
  'samsung-galaxy-z-flip-6':   'samsung-galaxy-z-flip6.jpg',
  'samsung-galaxy-z-flip-5':   'samsung-galaxy-z-flip5.jpg',
  'samsung-galaxy-z-flip-4':   'samsung-galaxy-z-flip4.jpg',
  'samsung-galaxy-z-flip-3':   'samsung-galaxy-z-flip3-5g.jpg',

  /* Samsung A series */
  'samsung-galaxy-a55':        'samsung-galaxy-a55.jpg',
  'samsung-galaxy-a54':        'samsung-galaxy-a54.jpg',
  'samsung-galaxy-a35':        'samsung-galaxy-a35.jpg',
  'samsung-galaxy-a34':        'samsung-galaxy-a34.jpg',
  'samsung-galaxy-a25':        'samsung-galaxy-a25.jpg',
  'samsung-galaxy-a24':        'samsung-galaxy-a24-4g.jpg',

  /* Xiaomi */
  'xiaomi-14':            'xiaomi-14.jpg',
  'xiaomi-13':            'xiaomi-13.jpg',
  'redmi-note-13':        'xiaomi-redmi-note-13.jpg',
  'redmi-note-12':        'xiaomi-redmi-note-12.jpg',
  'redmi-note-13-pro':    'xiaomi-redmi-note-13-pro.jpg',

  /* Apple Watch */
  'apple-watch-series-10':'apple-watch-series-10.jpg',
  'apple-watch-series-9': 'apple-watch-series-9.jpg',
  'apple-watch-series-8': 'apple-watch-series-8.jpg',
  'apple-watch-ultra-2':  'apple-watch-ultra-2.jpg',
  'apple-watch-se-2':     'apple-watch-se--2022-.jpg',
  'samsung-watch-7':      'samsung-galaxy-watch7.jpg',
  'samsung-watch-6':      'samsung-galaxy-watch6.jpg',

  /* AirPods */
  'airpods-pro-2':        'apple-airpods-pro-2.jpg',
  'airpods-max':          'apple-airpods-max.jpg',

  /* Mac / iPad */
  'macbook-air-m4':       'apple-macbook-air-m3.jpg', // M4 not yet on GSMArena
  'macbook-air-m3':       'apple-macbook-air-m3.jpg',
  'macbook-air-m2':       'apple-macbook-air-m2.jpg',
  'ipad-pro-m4':          'apple-ipad-pro-13--2024-.jpg',
  'ipad-pro-m2':          'apple-ipad-pro-12-9--2022-.jpg',
  'ipad-pro-m1':          'apple-ipad-pro-12-9--2021-.jpg',
  'ipad':                 'apple-ipad-10-9--2022-.jpg',
};

const BASE = 'https://fdn2.gsmarena.com/vv/bigpic/';

function download(url, file) {
  return new Promise((resolve) => {
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Referer': 'https://www.gsmarena.com/',
        'Accept': 'image/avif,image/webp,image/*,*/*',
      }
    };
    https.get(url, opts, res => {
      if (res.statusCode !== 200) {
        res.resume();
        return resolve({ ok: false, status: res.statusCode });
      }
      const ws = fs.createWriteStream(file);
      res.pipe(ws);
      ws.on('finish', () => ws.close(() => resolve({ ok: true, size: fs.statSync(file).size })));
      ws.on('error', () => resolve({ ok: false, err: 'write' }));
    }).on('error', () => resolve({ ok: false, err: 'net' }));
  });
}

(async () => {
  const map = {};
  let success = 0, fail = 0;
  const entries = Object.entries(GSMARENA);
  for (let i = 0; i < entries.length; i++) {
    const [slug, file] = entries[i];
    const out = path.join(OUT_DIR, slug + '.jpg');
    if (fs.existsSync(out) && fs.statSync(out).size > 5000) {
      map[slug] = `assets/images/phones/${slug}.jpg`;
      success++;
      process.stdout.write(`[${i+1}/${entries.length}] ${slug} (cache)\n`);
      continue;
    }
    const r = await download(BASE + file, out);
    if (r.ok && r.size > 5000) {
      map[slug] = `assets/images/phones/${slug}.jpg`;
      success++;
      process.stdout.write(`[${i+1}/${entries.length}] ${slug} OK ${(r.size/1024)|0}KB\n`);
    } else {
      try { fs.unlinkSync(out); } catch(e){}
      fail++;
      process.stdout.write(`[${i+1}/${entries.length}] ${slug} FAIL ${r.status||r.err}\n`);
    }
    // Polite delay
    await new Promise(r => setTimeout(r, 200));
  }
  fs.writeFileSync(path.join(__dirname, 'image-map.json'), JSON.stringify(map, null, 2));
  console.log(`\nDone: ${success} OK, ${fail} fail. Map -> tools/image-map.json`);
})();
