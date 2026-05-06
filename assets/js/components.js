/* =============================================
   COMPONENTS - Tự render Header / Bottom Nav / Footer
   Mọi page chỉ cần đặt:
     <div data-mm="header"></div>
     <div data-mm="bottomnav" data-active="home"></div>
     <div data-mm="footer"></div>
   ============================================= */
(function () {
  // Áp dụng theme đã lưu ngay khi script chạy (trước DOMContentLoaded)
  const _savedTheme = localStorage.getItem('mm_theme');
  if (_savedTheme) document.documentElement.setAttribute('data-theme', _savedTheme);

  const cartCount = () => window.MM_STATE.cartCount();

  const Header = () => `
    <div class="app-header">
      <div class="max-w-7xl mx-auto px-3 py-2 flex items-center gap-2">
        <a href="index.html" class="flex items-center gap-1.5 shrink-0 no-underline mr-1">
          <div class="w-8 h-8 rounded-md flex items-center justify-center font-black text-base" style="background:rgba(0,0,0,.2);color:#fff">M</div>
          <div class="leading-none">
            <div class="text-white font-extrabold text-[15px] leading-none">MultiMart</div>
            <div class="text-amber-200 text-[9px] font-bold tracking-widest uppercase">KOREA</div>
          </div>
        </a>
        <div class="search-wrap flex-1">
          <div class="flex items-center bg-white rounded-md px-2.5 py-1.5 gap-2">
            <i class="fas fa-search text-gray-400 text-sm shrink-0"></i>
            <input id="mm-search" type="text" placeholder="Tìm sản phẩm, thương hiệu, danh mục..."
              class="w-full text-sm outline-none border-none bg-transparent font-[inherit] text-gray-700" autocomplete="off">
          </div>
        </div>
        <a href="cart.html" class="relative text-white no-underline p-1 shrink-0">
          <i class="fas fa-shopping-cart text-xl"></i>
          <span id="mm-cart-badge" class="badge-dot" style="${cartCount()===0?'display:none':''}; border-color:#d97706">${cartCount()}</span>
        </a>
        <button id="mm-theme-toggle" onclick="window.__mm_toggleTheme()" title="Chuyển giao diện tối/sáng">
          <i class="fas fa-moon"></i>
        </button>
        <a href="profile.html" class="hidden md:flex items-center gap-1.5 no-underline shrink-0 ml-1">
          <img src="${window.MM_DATA.user.avatar}" class="w-8 h-8 rounded-full border-2 border-amber-300">
          <span class="text-white text-sm font-semibold">${window.MM_DATA.user.name.split(' ').pop()}</span>
        </a>
      </div>
      <div class="bg-amber-800 text-amber-100 text-[10px] text-center py-0.5 px-3">
        Giao toàn Hàn 24h · 1 KRW = ${window.MM_DATA.rate.krwToVnd} VND · Hỗ trợ tiếng Việt 8h-22h
      </div>
      <div class="header-shortcuts hide-scrollbar">
        <a href="price-board.html">Bảng giá điện thoại</a>
        <a href="category.html">Khuyến mãi hôm nay</a>
        <a href="category.html?cat=sim">SIM 4G/5G</a>
        <a href="orders.html">Tra cứu đơn hàng</a>
      </div>
    </div>
  `;

  const BottomNav = (active) => {
    const items = [
      { key: 'home',  label: 'Trang chủ', icon: 'fa-home',       href: 'index.html' },
      { key: 'cat',   label: 'Danh mục',  icon: 'fa-th-large',   href: 'category.html' },
      { key: 'post',  label: 'SIM Hàn',   icon: 'fa-sim-card',   href: 'post.html', fab: true },
      { key: 'price', label: 'Bảng giá',  icon: 'fa-mobile-alt', href: 'price-board.html' },
      { key: 'blog',  label: 'Blog',       icon: 'fa-newspaper',  href: 'blog.html' },
    ];
    return `<nav class="bottom-nav">${items.map(it => it.fab
      ? `<a href="${it.href}" class="fab-wrap"><div class="fab"><i class="fas ${it.icon}"></i></div><span>${it.label}</span></a>`
      : `<a href="${it.href}" class="${active===it.key?'active':''}"><i class="fas ${it.icon}"></i><span>${it.label}</span></a>`
    ).join('')}</nav>`;
  };

  const Footer = () => `
    <footer class="hidden md:block bg-slate-900 text-white py-16 mt-20">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-12">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center font-bold">M</div>
            <span class="text-xl font-bold">MultiMart Korea</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">Đại lý SIM & Điện thoại ủy quyền – chuyên phục vụ người Việt tại Hàn Quốc. Hỗ trợ tiếng Việt 24/7, giao toàn quốc miễn phí.</p>
          <div class="flex gap-3 mt-4">
            <a href="https://facebook.com/multimartkorea" target="_blank" rel="noopener" class="ft-social" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://qr.kakao.com" target="_blank" rel="noopener" class="ft-social" aria-label="KakaoTalk" style="background:#FFE812;color:#3C1E1E"><i class="fas fa-comment"></i></a>
            <a href="https://zalo.me/0108888 5808" target="_blank" rel="noopener" class="ft-social" aria-label="Zalo" style="background:#0068FF"><b>Z</b></a>
            <a href="https://tiktok.com/@multimartkorea" target="_blank" rel="noopener" class="ft-social" aria-label="TikTok" style="background:#000"><i class="fab fa-tiktok"></i></a>
            <a href="https://m.me/multimartkorea" target="_blank" rel="noopener" class="ft-social" aria-label="Messenger" style="background:#0084FF"><i class="fab fa-facebook-messenger"></i></a>
          </div>
        </div>
        <div>
          <h4 class="font-bold mb-4">Sản phẩm chính</h4>
          <ul class="text-slate-400 text-sm space-y-2">
            <li><a href="post.html" class="text-slate-400 no-underline hover:text-white">📱 SIM Hàn Quốc (38 gói)</a></li>
            <li><a href="price-board.html" class="text-slate-400 no-underline hover:text-white">📊 Bảng giá điện thoại</a></li>
            <li><a href="category.html?cat=phones" class="text-slate-400 no-underline hover:text-white">📞 Samsung Galaxy</a></li>
            <li><a href="category.html?cat=phones" class="text-slate-400 no-underline hover:text-white">🍎 iPhone tại Hàn</a></li>
            <li><a href="category.html?cat=accessories" class="text-slate-400 no-underline hover:text-white">🎧 Phụ kiện</a></li>
            <li><a href="blog.html" class="text-slate-400 no-underline hover:text-white">📰 Blog & Thủ thuật</a></li>
            <li><a href="category.html" class="text-slate-400 no-underline hover:text-white">🛒 Toàn bộ danh mục</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Hỗ trợ khách</h4>
          <ul class="text-slate-400 text-sm space-y-2">
            <li>📦 Giao toàn Hàn 24h miễn phí</li>
            <li>💳 Đặt KakaoTalk / Zalo nhanh chóng</li>
            <li>🔄 Chuyển mạng giữ số (MNP) miễn phí</li>
            <li>🛡️ Đại lý chính hãng SKT/KT/LG U+</li>
            <li>🇻🇳 Tư vấn tiếng Việt 100%</li>
            <li>⏰ Mở cửa: 08:00 – 23:00 (mọi ngày)</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Liên hệ</h4>
          <p class="text-slate-400 text-sm mb-1">📍 Ansan · Seoul · Incheon · toàn Hàn</p>
          <p class="text-slate-400 text-sm mb-1">📞 <a href="tel:+821088885808" class="text-white font-bold hover:text-amber-300">010-8888-5808</a></p>
          <p class="text-slate-400 text-sm mb-1">💬 KakaoTalk: <b class="text-amber-300">multimartkr</b></p>
          <p class="text-slate-400 text-sm mb-3">✉️ <a href="mailto:kiwoo33@naver.com" class="text-slate-400 hover:text-white">kiwoo33@naver.com</a></p>
          <div class="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <p class="text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-2">📩 Nhận báo giá SIM mỗi tháng</p>
            <form onsubmit="event.preventDefault();this.querySelector('input').value='';alert('✅ Đã đăng ký nhận báo giá')">
              <div class="flex">
                <input type="email" required placeholder="Email của bạn" class="bg-slate-900 border-none px-3 py-2 text-xs rounded-l-lg w-full outline-none text-white">
                <button class="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-r-lg text-xs font-bold transition">Gửi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 mt-10 pt-5 border-t border-slate-800">
        <div class="flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-500">
          <div>© 2026 MultiMart Korea. Đại lý CTV SIM & điện thoại tại Hàn Quốc.</div>
          <div class="flex gap-4">
            <a href="#" class="hover:text-white">Điều khoản</a>
            <a href="#" class="hover:text-white">Chính sách bảo mật (PIPA)</a>
            <a href="sitemap.xml" class="hover:text-white">Sitemap</a>
            <a href="admin-login.html" class="hover:text-amber-300 opacity-60" title="Khu vực quản trị"><i class="fas fa-lock"></i> Admin</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  function mount() {
    document.querySelectorAll('[data-mm="header"]').forEach(el => el.innerHTML = Header());
    document.querySelectorAll('[data-mm="bottomnav"]').forEach(el => {
      el.outerHTML = BottomNav(el.dataset.active || 'home');
    });
    document.querySelectorAll('[data-mm="footer"]').forEach(el => el.innerHTML = Footer());

    /* ── Dark/light theme toggle ── */
    const _updateThemeIcon = () => {
      const btn = document.getElementById('mm-theme-toggle');
      if (!btn) return;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = isDark
        ? '<i class="fas fa-sun" style="color:#fbbf24;font-size:15px"></i>'
        : '<i class="fas fa-moon" style="font-size:15px"></i>';
      btn.title = isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
    };
    window.__mm_toggleTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('mm_theme', next);
      _updateThemeIcon();
    };
    _updateThemeIcon();

    /* ── Search autocomplete ── */
    const searchInput = document.getElementById('mm-search');
    if (searchInput) {
      const searchWrap = searchInput.closest('.search-wrap');

      // Debounce helper
      let _timer = null;
      const debounce = (fn, ms) => (...args) => { clearTimeout(_timer); _timer = setTimeout(() => fn(...args), ms); };

      // Build dropdown
      const dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      dropdown.id = 'mm-search-dropdown';
      dropdown.style.display = 'none';
      if (searchWrap) searchWrap.appendChild(dropdown);

      const hideDropdown = () => { dropdown.style.display = 'none'; };
      const showResults = (q) => {
        const query = q.trim().toLowerCase();
        if (query.length < 2) { hideDropdown(); return; }
        const results = (window.MM_DATA?.products || [])
          .filter(p => p.name.toLowerCase().includes(query))
          .slice(0, 6);
        if (!results.length) {
          dropdown.innerHTML = `<p class="search-no-result">Không tìm thấy kết quả cho "<b>${q}</b>"</p>`;
        } else {
          dropdown.innerHTML =
            results.map(p => {
              const src = (p.imgs && p.imgs.length) ? p.imgs[0] : p.img;
              return `<a href="product.html?id=${p.id}" class="search-item" onclick="document.getElementById('mm-search-dropdown').style.display='none'">
                <img src="${src}" alt="" loading="lazy" onerror="this.src='https://via.placeholder.com/44'">
                <div style="flex:1;min-width:0">
                  <div class="search-item__name">${p.name}</div>
                  <div class="search-item__price krw">${window.MM_UTILS.formatKRW(p.price)}</div>
                </div>
              </a>`;
            }).join('') +
            `<a href="category.html?q=${encodeURIComponent(q)}" class="search-all-link">
              Xem tất cả kết quả cho "<b>${q}</b>" <i class="fas fa-arrow-right text-xs"></i>
            </a>`;
        }
        dropdown.style.display = 'block';
      };

      searchInput.addEventListener('input', debounce(e => showResults(e.target.value), 230));
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { hideDropdown(); return; }
        if (e.key !== 'Enter') return;
        const q = searchInput.value.trim();
        hideDropdown();
        window.location.href = q ? `category.html?q=${encodeURIComponent(q)}` : 'category.html';
      });
      document.addEventListener('click', e => {
        if (searchWrap && !searchWrap.contains(e.target)) hideDropdown();
      });
    }

    /* ── KakaoTalk floating button ── */
    if (!document.getElementById('mm-kakao-btn')) {
      document.body.insertAdjacentHTML('beforeend', `
        <a id="mm-kakao-btn" href="tel:010-0000-0000" title="Liên hệ KakaoTalk / Gọi ngay">
          <i class="fas fa-comment-dots"></i>
        </a>
      `);
    }
  }

  // Re-render badge khi cart thay đổi
  document.addEventListener('mm:state-changed', () => {
    const badge = document.getElementById('mm-cart-badge');
    if (!badge) return;
    const c = window.MM_STATE.cartCount();
    badge.textContent = c;
    badge.style.display = c === 0 ? 'none' : '';
  });

  document.addEventListener('DOMContentLoaded', mount);
  window.MM_COMPONENTS = { mount };
})();
