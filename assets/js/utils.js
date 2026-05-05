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
};
