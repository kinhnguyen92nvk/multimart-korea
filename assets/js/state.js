/* =============================================
   STATE - Cart & Favorites lưu localStorage
   Sau này có thể đổi thành API call.
   ============================================= */
(function () {
  const KEY_CART   = 'mm_cart_v1';
  const KEY_FAV    = 'mm_fav_v1';
  const KEY_AUTH   = 'mm_auth_v1';
  const KEY_RECENT = 'mm_recent_v1';

  function read(key, def) {
    try { return JSON.parse(localStorage.getItem(key)) ?? def; }
    catch { return def; }
  }
  function write(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    document.dispatchEvent(new CustomEvent('mm:state-changed', { detail: { key } }));
  }

  window.MM_STATE = {
    /* ===== CART ===== */
    getCart() { return read(KEY_CART, []); },
    addToCart(productId, qty = 1) {
      const product = window.MM_UTILS.findProduct(productId);
      if (!product) return;
      const cart = this.getCart();
      const exist = cart.find(it => it.id === productId);
      if (exist) exist.qty += qty;
      else cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty });
      write(KEY_CART, cart);
      window.MM_UTILS.toast(`Đã thêm "${product.name}" vào giỏ`);
    },
    updateQty(productId, qty) {
      const cart = this.getCart();
      const item = cart.find(it => it.id === productId);
      if (!item) return;
      item.qty = Math.max(1, qty);
      write(KEY_CART, cart);
    },
    removeFromCart(productId) {
      write(KEY_CART, this.getCart().filter(it => it.id !== productId));
      window.MM_UTILS.toast('Đã xóa sản phẩm khỏi giỏ');
    },
    clearCart() { write(KEY_CART, []); },
    cartCount() { return this.getCart().reduce((s, it) => s + it.qty, 0); },

    /* ===== FAVORITES ===== */
    getFavs() { return read(KEY_FAV, []); },
    toggleFav(productId) {
      const favs = this.getFavs();
      const idx = favs.indexOf(productId);
      if (idx >= 0) favs.splice(idx, 1);
      else favs.push(productId);
      write(KEY_FAV, favs);
    },
    isFav(productId) { return this.getFavs().includes(productId); },

    /* ===== AUTH ===== */
    getAuth() { return read(KEY_AUTH, null); },
    login(user) { write(KEY_AUTH, user); },
    logout() { write(KEY_AUTH, null); },

    /* ===== RECENTLY VIEWED ===== */
    addToRecent(productId) {
      const recent = this.getRecent().filter(id => id !== productId);
      recent.unshift(productId);
      localStorage.setItem(KEY_RECENT, JSON.stringify(recent.slice(0, 12)));
    },
    getRecent() {
      try { return JSON.parse(localStorage.getItem(KEY_RECENT)) ?? []; }
      catch { return []; }
    },
  };
})();
