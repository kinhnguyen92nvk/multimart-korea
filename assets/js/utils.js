/* =============================================
   UTILS - Helpers chung cho mọi trang
   ============================================= */
window.MM_UTILS = {
  /** Format số sang chuỗi tiền KRW: 1500000 -> "1,500,000" */
  formatKRW(n) {
    if (n == null || isNaN(n)) return '0';
    return Number(n).toLocaleString('en-US');
  },

  /** Đổi KRW sang VND xấp xỉ */
  toVND(krw) {
    const r = (window.MM_DATA?.rate?.krwToVnd) ?? 18.2;
    return Math.round(krw * r).toLocaleString('vi-VN');
  },

  /** Lấy query string param */
  query(key) {
    const u = new URL(window.location.href);
    return u.searchParams.get(key);
  },

  /** Toast thông báo */
  toast(msg, type = 'success') {
    let root = document.getElementById('toast-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'toast-root';
      document.body.appendChild(root);
    }
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fas fa-${type === 'error' ? 'times-circle' : 'check-circle'}"></i> ${msg}`;
    root.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; }, 2200);
    setTimeout(() => el.remove(), 2600);
  },

  /** Tìm sản phẩm theo id */
  findProduct(id) {
    return (window.MM_DATA?.products || []).find(p => p.id === id);
  },

  /** Tìm danh mục theo id */
  findCategory(id) {
    return (window.MM_DATA?.categories || []).find(c => c.id === id);
  },

  /** Render mảng -> HTML chuỗi */
  renderList(arr, renderFn) {
    return (arr || []).map(renderFn).join('');
  },

  /** Tính tổng giỏ hàng */
  cartTotal(cart) {
    return (cart || []).reduce((s, it) => s + (it.price * it.qty), 0);
  },

  /**
   * Lấy URL ảnh thật của model điện thoại từ Wikipedia API.
   * Trả về Promise<string|null>. Cache vào localStorage để chỉ fetch 1 lần.
   * @param {string} searchTerm  VD: "iPhone 17 Pro Max" hoặc "Samsung Galaxy S25 Ultra"
   * @param {number} sizePx      kích thước ảnh mong muốn (default 400)
   */
  async fetchPhoneImage(searchTerm, sizePx = 400) {
    if (!searchTerm) return null;
    const cacheKey = 'mm_img_' + searchTerm.toLowerCase().replace(/\s+/g,'_');
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        // Cache 30 ngày
        const obj = JSON.parse(cached);
        if (Date.now() - obj.t < 30 * 86400000) return obj.url || null;
      }
    } catch(e){}

    try {
      const slug = encodeURIComponent(searchTerm.replace(/\s/g, '_'));
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error('Wiki ' + res.status);
      const data = await res.json();
      let img = data?.thumbnail?.source || data?.originalimage?.source || null;
      if (img && sizePx) {
        // Wikipedia thumbnails có dạng .../<file>/<size>px-<file>; thay size để có ảnh lớn hơn
        img = img.replace(/\/\d+px-/, `/${sizePx}px-`);
      }
      try { localStorage.setItem(cacheKey, JSON.stringify({ url: img, t: Date.now() })); } catch(e){}
      return img;
    } catch (e) {
      try { localStorage.setItem(cacheKey, JSON.stringify({ url: null, t: Date.now() })); } catch(e2){}
      return null;
    }
  },

  /**
   * Lazy load ảnh thật cho 1 thẻ <img> dựa vào searchTerm Catalog.
   * Nếu fetch thất bại thì giữ ảnh placeholder cũ.
   */
  attachLazyPhoneImage(imgEl, searchTerm) {
    if (!imgEl || !searchTerm) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const url = await window.MM_UTILS.fetchPhoneImage(searchTerm, 400);
        if (url) {
          imgEl.onerror = () => { imgEl.onerror = null; /* giữ placeholder cũ nếu lỗi */ };
          imgEl.src = url;
        }
      });
    }, { rootMargin: '300px' });
    obs.observe(imgEl);
  },
};
