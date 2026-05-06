/* =============================================
   MultiMart CMS — Groq (FREE) + GitHub
   - AI: Groq (miễn phí hoàn toàn, không cần thẻ)
     · OCR ảnh bảng giá: llama-4-scout (vision)
     · Sinh bài blog SEO: llama-3.3-70b
   - Lưu data: GitHub API (push file lên repo)
   - API keys lưu trong localStorage (chỉ máy anh)
   ============================================= */
(function () {
  'use strict';

  const LS = {
    groq:     'mm_cms_groq',
    ghToken:  'mm_cms_gh_token',
    ghOwner:  'mm_cms_gh_owner',
    ghRepo:   'mm_cms_gh_repo',
    ghBranch: 'mm_cms_gh_branch',
  };

  const cfg = {
    get(k){ return localStorage.getItem(LS[k]) || ''; },
    set(k,v){ localStorage.setItem(LS[k], v); },
    all(){
      return {
        groq:     cfg.get('groq'),
        ghToken:  cfg.get('ghToken'),
        ghOwner:  cfg.get('ghOwner'),
        ghRepo:   cfg.get('ghRepo'),
        ghBranch: cfg.get('ghBranch') || 'main',
      };
    },
    isReady(){
      const c = cfg.all();
      return c.groq && c.ghToken && c.ghOwner && c.ghRepo;
    },
  };

  /* ─── Helpers ─── */
  async function fileToBase64(file){
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(',')[1]);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  function utf8ToBase64(str){
    return btoa(unescape(encodeURIComponent(str)));
  }
  function base64ToUtf8(str){
    return decodeURIComponent(escape(atob(str)));
  }

  /* =============================================
     1. GROQ CLIENT — hoàn toàn miễn phí, không cần thẻ
     Đăng ký tại: https://console.groq.com
     · Vision (OCR ảnh): meta-llama/llama-4-scout-17b-16e-instruct
     · Text  (blog):     llama-3.3-70b-versatile
     Free: 30 req/phút, 1000 req/ngày — quá đủ cho CTV
     ============================================= */
  const Groq = {
    ENDPOINT: 'https://api.groq.com/openai/v1/chat/completions',
    VISION_MODEL: 'meta-llama/llama-4-scout-17b-16e-instruct',
    TEXT_MODEL:   'llama-3.3-70b-versatile',

    async _call(messages, { json = false, temperature = 0.4, vision = false } = {}) {
      const key = cfg.get('groq');
      if (!key) throw new Error('Chưa cấu hình Groq API key — vào tab Cấu hình');
      const body = {
        model: vision ? this.VISION_MODEL : this.TEXT_MODEL,
        messages,
        temperature,
        max_tokens: 8192,
      };
      if (json) body.response_format = { type: 'json_object' };
      const res = await fetch(this.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error('Groq lỗi ' + res.status + ': ' + t.slice(0, 300));
      }
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content || '';
      if (!text) throw new Error('Groq không trả về nội dung. Thử lại.');
      return text;
    },

    /* OCR + parse bảng giá ĐIỆN THOẠI từ ảnh */
    async parsePhonePrice(imageFile) {
      const base64 = await fileToBase64(imageFile);
      const mime   = imageFile.type || 'image/jpeg';
      const prompt = `Bạn là chuyên gia OCR. Phân tích ảnh BẢNG GIÁ ĐIỆN THOẠI tiếng Việt/Hàn và trích xuất dữ liệu.
Mỗi dòng máy thành 1 object JSON:
{ "model": "iPhone 15 Pro Max", "config": "256GB · Hàng A", "price": 1490000, "status": "in", "trend": 0, "brand": "iPhone" }
Quy tắc:
- "price" số nguyên KRW (₩). "1,490,000" hoặc "1.49tr" → 1490000.
- "config" = dung lượng + tình trạng (Hàng A = máy cũ 99%, Hàng New = đập hộp).
- "status" = "in" | "out" | "low". Mặc định "in".
- "trend" = 0 (giữ) | âm (giảm) | dương (tăng). Mặc định 0.
- "brand": suy ra từ tên model.
- Bỏ qua tiêu đề, ghi chú, footer.
Trả về JSON: { "items": [...], "month": "MM/YYYY nếu thấy", "note": "ghi chú nếu có" }`;
      const txt = await this._call([{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:${mime};base64,${base64}` } },
        ],
      }], { json: true, temperature: 0.1, vision: true });
      return JSON.parse(txt);
    },

    /* OCR + parse bảng giá SIM */
    async parseSimPrice(imageFile) {
      const base64 = await fileToBase64(imageFile);
      const mime   = imageFile.type || 'image/jpeg';
      const prompt = `Bạn là chuyên gia OCR. Phân tích ảnh BẢNG GIÁ SIM HÀN QUỐC và trích xuất.
Mỗi gói SIM thành object:
{ "carrier": "ktm", "name": "KT M 5G 100GB", "vName": "Mô tả tiếng Việt", "monthly": 33000, "originalFee": 49000, "data": "100GB", "voice": "Không giới hạn", "sms": "Không giới hạn", "highlight": false, "tag": "Phổ biến" }
Quy tắc:
- carrier mã: sk | kt | lgu | ktm | sky | umobile | hello | chance | sk7 | prepaid
- monthly: KRW giá ưu đãi (số nguyên). originalFee: giá gốc.
- "무제한" → "Không giới hạn". highlight = true nếu là gói HOT.
Trả về JSON: { "plans": [...], "updated": "DD/MM/YYYY" }`;
      const txt = await this._call([{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:${mime};base64,${base64}` } },
        ],
      }], { json: true, temperature: 0.1, vision: true });
      return JSON.parse(txt);
    },

    /* Sinh bài blog SEO */
    async writeBlog({ topic, keywords = '', tone = 'thân thiện, chuyên gia' }) {
      const prompt = `Bạn là chuyên gia content marketing SEO cho website MultiMart KOREA — bán SIM và điện thoại cho người Việt tại Hàn Quốc.
Viết 1 bài blog tiếng Việt về chủ đề: "${topic}"
${keywords ? 'Từ khóa tự nhiên: ' + keywords : ''}
Yêu cầu:
- Dài 900-1400 từ, văn phong ${tone}
- Cấu trúc: H1 → 4-6 mục H2 → kết luận → CTA MultiMart KOREA (KakaoTalk multimartkr / 010-8888-5808)
- Nội dung gốc 100%, đối tượng người Việt ở Hàn (Ansan, Seoul, Daegu, Incheon...)
- Có ít nhất 1 bảng so sánh nếu phù hợp. Format: Markdown.
Trả về JSON:
{ "title":"(55-65 ký tự)", "slug":"tieu-de-khong-dau", "description":"(140-160 ký tự)", "keywords":"kw1, kw2", "category":"thu-thuat|huong-dan|tin-tuc|review", "cover":"emoji", "readTime":7, "tags":["t1","t2"], "content":"Markdown đầy đủ..." }`;
      const txt = await this._call(
        [{ role: 'user', content: prompt }],
        { json: true, temperature: 0.75 }
      );
      const obj = JSON.parse(txt);
      obj.id          = 'b_' + Date.now().toString(36);
      obj.publishedAt = new Date().toISOString().slice(0, 10);
      obj.author      = 'MultiMart KOREA';
      return obj;
    },

    /* Gợi ý chủ đề blog */
    async suggestTopics(n = 5) {
      const prompt = `Đề xuất ${n} chủ đề blog SEO cho website bán SIM + điện thoại cho người Việt ở Hàn Quốc.
Tiêu chí: search volume ổn, cạnh tranh thấp, đúng intent người mới sang Hàn.
Trả JSON: { "topics": [{"topic":"...","keywords":"..."}] }`;
      const txt = await this._call(
        [{ role: 'user', content: prompt }],
        { json: true, temperature: 0.9 }
      );
      return JSON.parse(txt).topics || [];
    },

    /* Kiểm tra key còn hoạt động không */
    async testKey() {
      const txt = await this._call(
        [{ role: 'user', content: 'Reply with valid json: {"ok":true}' }],
        { json: true, temperature: 0 }
      );
      return JSON.parse(txt);
    },
  };

  /* =============================================
     2. GITHUB CLIENT
     Cần Personal Access Token (classic, scope: repo)
     ============================================= */
  const GH = {
    api(path){
      const c = cfg.all();
      return `https://api.github.com/repos/${c.ghOwner}/${c.ghRepo}/${path}`;
    },
    headers(){
      return {
        'Authorization': 'Bearer ' + cfg.get('ghToken'),
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      };
    },

    async getFile(path){
      const c = cfg.all();
      const url = this.api(`contents/${path}?ref=${encodeURIComponent(c.ghBranch)}`);
      const res = await fetch(url, { headers: this.headers() });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('GitHub GET lỗi: ' + res.status);
      const data = await res.json();
      return { sha: data.sha, content: base64ToUtf8(data.content.replace(/\n/g, '')) };
    },

    async putFile(path, content, message){
      const c = cfg.all();
      const existing = await this.getFile(path);
      const url = this.api(`contents/${path}`);
      const body = {
        message: message || ('cms: cập nhật ' + path),
        content: utf8ToBase64(content),
        branch: c.ghBranch,
      };
      if (existing) body.sha = existing.sha;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { ...this.headers(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok){
        const t = await res.text();
        throw new Error('GitHub PUT lỗi: ' + res.status + ' — ' + t.slice(0,300));
      }
      return res.json();
    },

    async testConnection(){
      const c = cfg.all();
      const res = await fetch(`https://api.github.com/repos/${c.ghOwner}/${c.ghRepo}`, { headers: this.headers() });
      if (!res.ok) throw new Error('Không kết nối được repo. Kiểm tra token/owner/repo.');
      return res.json();
    },
  };

  /* =============================================
     3. SERIALIZERS — Tạo lại nội dung file JS
     ============================================= */
  const Serialize = {
    /* Cập nhật mảng items trong window.MM_DATA.priceBoard */
    async updatePriceBoard(newItems, opts = {}){
      const path = 'assets/data/products.js';
      const file = await GH.getFile(path);
      if (!file) throw new Error('Không tìm thấy ' + path + ' trong repo');
      let src = file.content;

      /* Tìm khối priceBoard.items: [...]  */
      const itemsRegex = /(priceBoard\s*:\s*\{[\s\S]*?items\s*:\s*)\[([\s\S]*?)\](\s*,\s*\/\*)/;
      const itemsRender = newItems.map((it, i) => {
        const id = it.id || ('p_' + Date.now() + '_' + i);
        return `      { id:'${id}', model:${JSON.stringify(it.model||'')}, config:${JSON.stringify(it.config||'')}, price:${Number(it.price)||0}, status:${JSON.stringify(it.status||'in')}, trend:${Number(it.trend)||0}, brand:${JSON.stringify(it.brand||'')} },`;
      }).join('\n');

      let newSrc;
      if (itemsRegex.test(src)){
        newSrc = src.replace(itemsRegex, (_m, p1, _p2, p3) => p1 + '[\n' + itemsRender + '\n    ]' + p3);
      } else {
        /* fallback: thay /priceBoard\s*:\s*\{[^}]*items\s*:\s*\[[^\]]*\]/ */
        const fallback = /(items\s*:\s*)\[[\s\S]*?\]/;
        newSrc = src.replace(fallback, (_m, p1) => p1 + '[\n' + itemsRender + '\n    ]');
      }

      /* Cập nhật month + note nếu có */
      if (opts.month){
        newSrc = newSrc.replace(/(month\s*:\s*)['"][^'"]*['"]/, (_m,p1) => p1 + JSON.stringify(opts.month));
      }
      if (opts.note){
        newSrc = newSrc.replace(/(note\s*:\s*)['"][^'"]*['"]/, (_m,p1) => p1 + JSON.stringify(opts.note));
      }

      return GH.putFile(path, newSrc, 'cms: cập nhật bảng giá điện thoại ' + (opts.month||''));
    },

    /* Cập nhật window.MM_SIM.plans — merge theo id, không xóa các gói cũ */
    async upsertSimPlans(newPlans){
      const path = 'assets/data/sim-plans.js';
      const file = await GH.getFile(path);
      if (!file) throw new Error('Không tìm thấy ' + path);
      let src = file.content;

      const planLines = newPlans.map((p, i) => {
        const id = p.id || ('sim_' + Date.now() + '_' + i);
        return `    { id: ${JSON.stringify(id)}, carrier: ${JSON.stringify(p.carrier||'ktm')}, name: ${JSON.stringify(p.name||'')}, vName: ${JSON.stringify(p.vName||p.name||'')}, monthly: ${Number(p.monthly)||0}, originalFee: ${Number(p.originalFee)||Number(p.monthly)||0}, data: ${JSON.stringify(p.data||'')}, voice: ${JSON.stringify(p.voice||'Không giới hạn')}, sms: ${JSON.stringify(p.sms||'Không giới hạn')}, features: [], terms: [], tag: ${JSON.stringify(p.tag||'')}, highlight: ${!!p.highlight}, _commission: 0 },`;
      }).join('\n');

      /* Chèn vào sau dấu mở plans: [ */
      const inject = /(plans\s*:\s*\[)/;
      if (!inject.test(src)) throw new Error('Không tìm thấy mảng plans trong sim-plans.js');
      const stamp = '    /* ─── Cập nhật ' + new Date().toLocaleDateString('vi-VN') + ' ─── */';
      const newSrc = src.replace(inject, (_m,p1) => p1 + '\n' + stamp + '\n' + planLines);

      /* Cập nhật updated date */
      const today = new Date().toLocaleDateString('vi-VN');
      const newSrc2 = newSrc.replace(/(updated\s*:\s*)['"][^'"]*['"]/, (_m,p1) => p1 + JSON.stringify(today));

      return GH.putFile(path, newSrc2, 'cms: thêm ' + newPlans.length + ' gói SIM');
    },

    /* Thêm bài blog vào window.MM_BLOG.posts */
    async appendBlogPost(post){
      const path = 'assets/data/blog.js';
      let file = await GH.getFile(path);
      let src;
      if (!file){
        src = `/* MultiMart Blog — tự sinh bởi CMS */\nwindow.MM_BLOG = {\n  posts: [\n  ]\n};\n`;
      } else {
        src = file.content;
      }
      const postJSON = JSON.stringify(post, null, 2)
        .split('\n').map(l => '    ' + l).join('\n');
      const inject = /(posts\s*:\s*\[)/;
      if (!inject.test(src)){
        throw new Error('Không tìm thấy mảng posts trong blog.js');
      }
      const newSrc = src.replace(inject, (_m,p1) => p1 + '\n' + postJSON + ',');
      const result = await GH.putFile(path, newSrc, 'cms: bài blog "' + (post.title||'').slice(0,50) + '"');
      /* Cache trực tiếp post object vào localStorage — không parse JS source */
      try {
        let cached = [];
        try { cached = JSON.parse(localStorage.getItem('mm_blog_posts') || '[]'); } catch(e){}
        if (!Array.isArray(cached)) cached = [];
        /* Thêm bài mới lên đầu, bỏ bài trùng id */
        cached = [post, ...cached.filter(p => p.id !== post.id)];
        localStorage.setItem('mm_blog_posts', JSON.stringify(cached));
      } catch(e){ /* ignore */ }
      return result;
    },
  };

  /* Public API */
  window.MM_CMS = {
    cfg, Groq, GH, Serialize,
    util: { fileToBase64, utf8ToBase64, base64ToUtf8 },
  };
})();
