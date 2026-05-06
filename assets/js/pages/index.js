/* index.js — MultiMart Homepage */
document.addEventListener('DOMContentLoaded', () => {
  const { categories, priceBoard, products } = window.MM_DATA;
  const { formatKRW, renderList } = window.MM_UTILS;

  const quickChips = [
    { label: 'iPhone giá tốt', href: 'category.html?cat=phone', hint: 'Giảm sâu' },
    { label: 'Samsung mới', href: 'category.html?cat=phone', hint: 'Nhiều mẫu' },
    { label: 'Đồ ăn Việt', href: 'category.html?cat=food', hint: 'Mua nhanh' },
    { label: 'SIM Data', href: 'category.html?cat=sim', hint: '4G/5G' },
    { label: 'Quà tặng', href: 'category.html?cat=gift', hint: 'Nhiều combo' },
  ];

  const chipsEl = document.getElementById('quick-chips');
  if (chipsEl) {
    chipsEl.innerHTML = renderList(quickChips, c =>
      `<a href="${c.href}" class="quick-chip">${c.label}<strong>${c.hint}</strong></a>`
    );
  }

  /* ─── 0. Hero banner slider ─── */
  const heroSlides = [
    {
      img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=920&h=360&fit=crop',
      badge: 'KHUYẾN MÃI', badgeColor: '#ef4444',
      title: 'Tuần này giảm đến 25%',
      sub: 'Hàng chuẩn, giao nhanh toàn Hàn',
      href: 'category.html',
    },
    {
      img: 'https://images.unsplash.com/photo-1695639526461-eb5a5f1f7b8a?w=920&h=360&fit=crop',
      badge: 'iPhone', badgeColor: '#16a34a',
      title: 'iPhone 15 Pro Max',
      sub: 'Hàng xách tay Hàn Quốc – Fullbox – BH 12T',
      href: 'category.html?cat=phone',
    },
    {
      img: 'https://images.unsplash.com/photo-1772182133840-9bc4d5f09f76?w=920&h=360&fit=crop',
      badge: 'Samsung', badgeColor: '#1e40af',
      title: 'Galaxy S25 Ultra',
      sub: 'Bản Hàn – 2 SIM – Giao trong ngày tại Seoul',
      href: 'category.html?cat=phone',
    },
  ];

  const slidesEl = document.getElementById('hero-slides');
  const dotsEl   = document.getElementById('hero-dots');
  const heroLink = document.getElementById('hero-link');

  if (slidesEl && dotsEl) {
    let heroIdx = 0;
    let heroTimer = null;

    const renderHeroSlide = () => {
      slidesEl.innerHTML = heroSlides.map((s, i) => `
        <div class="hero-slide">
          <img src="${s.img}" alt="${s.title}" loading="${i === 0 ? 'eager' : 'lazy'}">
          <div class="hero-slide-caption">
            <span class="inline-block text-white text-[10px] font-black px-2 py-0.5 rounded-sm w-fit mb-1.5" style="background:${s.badgeColor}">${s.badge}</span>
            <p class="text-white font-bold text-sm leading-tight m-0">${s.title}<br><span class="text-[11px] text-white/80">${s.sub}</span></p>
          </div>
        </div>
      `).join('');

      dotsEl.innerHTML = heroSlides.map((_, i) =>
        `<button class="hero-dot ${i === heroIdx ? 'active' : ''}" onclick="__heroGo(${i})"></button>`
      ).join('');
    };

    const goTo = (i) => {
      heroIdx = ((i % heroSlides.length) + heroSlides.length) % heroSlides.length;
      slidesEl.style.transform = `translateX(-${heroIdx * 100}%)`;
      document.querySelectorAll('.hero-dot').forEach((d, j) => d.classList.toggle('active', j === heroIdx));
      if (heroLink) heroLink.href = heroSlides[heroIdx].href;
    };

    window.__heroGo = (i) => { goTo(i); resetTimer(); };

    const resetTimer = () => {
      clearInterval(heroTimer);
      heroTimer = setInterval(() => goTo(heroIdx + 1), 4000);
    };

    renderHeroSlide();
    goTo(0);
    resetTimer();

    // Touch swipe on hero
    let heroTouchX = null;
    const heroEl = document.getElementById('hero-slider');
    if (heroEl) {
      heroEl.addEventListener('touchstart', e => { heroTouchX = e.touches[0].clientX; }, { passive: true });
      heroEl.addEventListener('touchend', e => {
        if (heroTouchX === null) return;
        const dx = e.changedTouches[0].clientX - heroTouchX;
        if (Math.abs(dx) > 40) { dx < 0 ? goTo(heroIdx + 1) : goTo(heroIdx - 1); resetTimer(); }
        heroTouchX = null;
      }, { passive: true });
    }
  }

  /* ─── 1. Category strip ─── */
  document.getElementById('cat-strip').innerHTML = renderList(
    [{ id:'all', icon:'🛒', name:'Tất cả' }, ...categories],
    c => `<a href="category.html${c.id!=='all'?'?cat='+c.id:''}" class="cat-item">
      <div class="cat-item__circle">${c.icon}</div>
      <span>${c.name}</span>
    </a>`
  );

  /* ─── 2. Price board quick ─── */
  document.getElementById('pb-month').textContent = priceBoard.month || '';
  const pbRows = priceBoard.items.slice(0, 6);
  document.getElementById('pb-quick').innerHTML =
    renderList(pbRows, p => `
      <div class="pb-row">
        <div>
          <div class="pb-row__name">${p.brand === 'iPhone' ? '🍎' : '📱'} ${p.model}</div>
          <div class="pb-row__config">${p.config}</div>
        </div>
        <div class="text-right">
          <div class="pb-row__price krw">${formatKRW(p.price)}</div>
          <div class="pb-row__trend ${p.trend < 0 ? 'text-green-600' : p.trend > 0 ? 'text-red-500' : 'text-gray-400'}">
            ${p.trend < 0 ? '▼ -'+Math.abs(p.trend)+'%' : p.trend > 0 ? '▲ +'+p.trend+'%' : '⏤'}
          </div>
        </div>
      </div>
    `) +
    `<a href="price-board.html"
       class="flex items-center justify-center gap-1 py-2.5 text-amber-600 text-sm font-bold no-underline hover:bg-amber-50 border-t border-gray-100">
       Xem đầy đủ ${priceBoard.items.length}+ mã máy <i class="fas fa-chevron-right text-xs"></i>
     </a>`;

  /* ─── 3. Product card (BHX/Shopee style) ─── */
  const pcard = (p, wide = false) => {
    const src = (p.imgs && p.imgs.length) ? p.imgs[0] : p.img;
    const pct = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    const isFav = window.MM_STATE.isFav(p.id);
    return `<a href="product.html?id=${p.id}" class="pcard${wide ? ' w-36' : ''}">
      <div class="pcard__img">
        <img src="${src}" loading="lazy" alt="${p.name}" onerror="this.style.opacity='.3'">
        ${p.tag ? `<span class="pcard__badge">${p.tag}</span>` : ''}
        ${pct ? `<span class="pcard__badge sale" style="left:auto;right:0;border-radius:0 0 0 4px">-${pct}%</span>` : ''}
        <button class="pcard__fav ${isFav ? 'active' : ''}"
          onclick="event.preventDefault();event.stopPropagation();MM_STATE.toggleFav('${p.id}');this.classList.toggle('active')">
          <i class="${isFav ? 'fas' : 'far'} fa-heart" style="pointer-events:none"></i>
        </button>
        <button class="pcard__add"
          onclick="event.preventDefault();event.stopPropagation();MM_STATE.addToCart('${p.id}')">
          <i class="fas fa-plus" style="font-size:12px"></i>
        </button>
      </div>
      <div class="pcard__info">
        <p class="pcard__name">${p.name}</p>
        <div class="pcard__price">
          <span class="krw">${formatKRW(p.price)}</span>
          ${p.oldPrice ? `<span class="pcard__old krw">${formatKRW(p.oldPrice)}</span>` : ''}
        </div>
        <div class="pcard__meta">
          <span><i class="fas fa-star text-amber-400"></i> ${p.rating}</span>
          <span>Đã bán ${p.sold.toLocaleString('vi')}</span>
        </div>
      </div>
    </a>`;
  };

  /* ─── 4. Hot / sale: 6 model điện thoại có giá tốt nhất từ bảng giá ─── */
  const hotPhoneCard = (g) => {
    const cat = window.MM_CATALOG?.[g.slug];
    const prices = g.variants.flatMap(v => [v.priceA, v.priceNew].filter(Boolean));
    const minPrice = prices.length ? Math.min(...prices) : 0;
    return `
      <a href="phone-spec.html?model=${encodeURIComponent(g.slug)}" class="pcard" style="background:#fff">
        <div class="pcard__img" style="background:linear-gradient(135deg,#fef3c7,#fde68a)">
          <img src="${g.img}" loading="lazy" alt="${g.model}"
               style="object-fit:contain;padding:8px;background:#fff" onerror="this.style.opacity='.3'">
          <span class="pcard__badge" style="background:#ef4444">🔥 HOT</span>
          <span class="pcard__badge sale" style="left:auto;right:0;border-radius:0 0 0 4px;background:#16a34a">${g.brand}</span>
        </div>
        <div class="pcard__info">
          <p class="pcard__name" style="font-weight:700">${g.model}</p>
          <div class="pcard__price">
            <span class="krw" style="color:#dc2626">${formatKRW(minPrice)}</span>
          </div>
          <div class="pcard__meta">
            <span><i class="fas fa-fire text-orange-500"></i> Bán chạy</span>
            <span class="text-blue-600 font-bold">Xem →</span>
          </div>
        </div>
      </a>`;
  };
  const phoneGroupsForHot = {};
  (priceBoard.phones || []).forEach(p => {
    const slug = p.catalog || p.model.toLowerCase().replace(/\s+/g,'-');
    if (!phoneGroupsForHot[slug]) phoneGroupsForHot[slug] = { slug, model: p.model, brand: p.brand, img: p.img, variants: [] };
    phoneGroupsForHot[slug].variants.push(p);
  });
  /* Pick top selling-style: iPhone 17 Pro Max, S26 Ultra, Z Fold 7, Z Flip 7, iPhone 16 Pro Max, S25 Ultra */
  const hotPriority = ['iphone-17-pro-max','samsung-galaxy-s26-ultra','samsung-galaxy-z-fold-7','samsung-galaxy-z-flip-7','iphone-16-pro-max','samsung-galaxy-s25-ultra'];
  const hotPhones = hotPriority
    .map(s => phoneGroupsForHot[s])
    .filter(Boolean)
    .concat(Object.values(phoneGroupsForHot)) // fallback fill
    .filter((v,i,a) => a.findIndex(x => x.slug === v.slug) === i)
    .slice(0, 6);

  const hotHtml = hotPhones.map(g => `<div style="width:160px;flex-shrink:0">${hotPhoneCard(g)}</div>`).join('');
  document.getElementById('hot-row').innerHTML = hotHtml;
  document.getElementById('hot-grid').innerHTML = hotPhones.map(hotPhoneCard).join('');

  /* ─── 5. Recently viewed ─── */
  const recentIds = window.MM_STATE.getRecent();
  const recentSection = document.getElementById('recently-section');
  const recentRow = document.getElementById('recently-row');
  if (recentIds.length && recentSection && recentRow) {
    const recentProducts = recentIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 10);
    if (recentProducts.length) {
      recentRow.innerHTML = recentProducts.map(p =>
        `<div style="width:130px;flex-shrink:0">${pcard(p)}</div>`
      ).join('');
      recentSection.classList.add('show');
    }
  }

  /* ─── 6. All phones grid (1 card / model — đại diện theo dòng) ─── */
  const phonesGrid = document.getElementById('all-grid');
  if (phonesGrid && priceBoard.phones?.length) {
    /* Group 167 dòng → ~106 model duy nhất */
    const groups = {};
    priceBoard.phones.forEach(p => {
      const slug = p.catalog || p.model.toLowerCase().replace(/\s+/g, '-');
      if (!groups[slug]) groups[slug] = { slug, model: p.model, brand: p.brand, img: p.img, variants: [] };
      groups[slug].variants.push(p);
    });
    const phoneList = Object.values(groups);

    /* Tag màu theo brand */
    const brandColor = b => ({ iPhone:'#3b82f6', Samsung:'#1e40af', Xiaomi:'#f97316', Apple:'#64748b' }[b] || '#16a34a');

    phonesGrid.innerHTML = phoneList.map(g => {
      const cat = window.MM_CATALOG?.[g.slug];
      const prices = g.variants.flatMap(v => [v.priceA, v.priceNew].filter(Boolean));
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 0;
      const status = g.variants.some(v => v.status === 'in') ? 'in' : 'out';
      const searchTerm = cat?.searchTerm || g.model;
      return `
        <a href="phone-spec.html?model=${encodeURIComponent(g.slug)}" class="pcard" style="background:#fff">
          <div class="pcard__img" style="background:linear-gradient(135deg,#f8fafc,#e2e8f0)">
            <img src="${g.img}" loading="lazy" alt="${g.model}" data-phone-search="${searchTerm}"
                 style="object-fit:contain;padding:10px;background:#fff"
                 onerror="this.style.opacity='.3'">
            <span class="pcard__badge" style="background:${brandColor(g.brand)}">${g.brand}</span>
            ${status === 'in'
              ? `<span class="pcard__badge sale" style="left:auto;right:0;border-radius:0 0 0 4px;background:#16a34a">● Còn</span>`
              : `<span class="pcard__badge sale" style="left:auto;right:0;border-radius:0 0 0 4px;background:#94a3b8">◐ LH</span>`}
          </div>
          <div class="pcard__info">
            <p class="pcard__name" style="font-weight:700">${g.model}</p>
            <div class="pcard__price">
              <span class="krw">${formatKRW(minPrice)}</span>
              ${maxPrice > minPrice ? `<span class="text-[10px] text-slate-500"> – ${formatKRW(maxPrice)}</span>` : ''}
            </div>
            <div class="pcard__meta">
              <span><i class="fas fa-layer-group text-amber-500"></i> ${g.variants.length} cấu hình</span>
              <span class="text-blue-600 font-bold">Chi tiết →</span>
            </div>
          </div>
        </a>`;
    }).join('');

    /* Lazy-load ảnh thật từ Wikipedia (chỉ cho ảnh chưa có local) */
    if (window.MM_UTILS?.attachLazyPhoneImage) {
      phonesGrid.querySelectorAll('img[data-phone-search]').forEach(img => {
        const src = img.getAttribute('src') || '';
        // Đã có ảnh local thật → bỏ qua, không gọi Wikipedia (tránh ghi đè bằng URL fail)
        if (src.startsWith('assets/images/phones/')) return;
        window.MM_UTILS.attachLazyPhoneImage(img, img.dataset.phoneSearch);
      });
    }
  }

  /* ─── 6b. Sản phẩm khác (curated products) ─── */
  const curatedGrid = document.getElementById('curated-grid');
  if (curatedGrid) {
    const nonPhones = products.filter(p => p.cat !== 'phone').slice(0, 10);
    curatedGrid.innerHTML = renderList(nonPhones, p => `<div style="background:#fff">${pcard(p)}</div>`);
  }

  /* ─── SIM strip (highlight plans) ─── */
  const simStrip = document.getElementById('sim-strip');
  if (simStrip && window.MM_SIM) {
    const carriers = window.MM_SIM.carriers;
    const featured = window.MM_SIM.plans.filter(p => p.highlight).slice(0, 8);
    if (!featured.length) {
      simStrip.innerHTML = window.MM_SIM.plans.slice(0, 6).map(p => simStripCard(p, carriers)).join('');
    } else {
      simStrip.innerHTML = featured.map(p => simStripCard(p, carriers)).join('');
    }
  }

  /* ─── Blog mới nhất (hiện 3 bài gần nhất) ─── */
  const blogRow = document.getElementById('blog-home-row');
  if (blogRow) {
    let blogPosts;
    try {
      const cached = JSON.parse(localStorage.getItem('mm_blog_posts') || '[]');
      const seed = (window.MM_BLOG && window.MM_BLOG.posts) || [];
      const seen = new Set();
      blogPosts = [];
      [...cached, ...seed].forEach(p => {
        const key = p.id || p.slug;
        if (!key || seen.has(key)) return;
        seen.add(key);
        blogPosts.push(p);
      });
      blogPosts.sort((a,b) => (b.publishedAt||'').localeCompare(a.publishedAt||''));
    } catch(e){ blogPosts = (window.MM_BLOG && window.MM_BLOG.posts) || []; }

    if (blogPosts.length) {
      const recent = blogPosts.slice(0, 3);
      blogRow.innerHTML = recent.map(p => `
        <a href="blog-post.html?slug=${encodeURIComponent(p.slug||p.id)}" class="no-underline flex-shrink-0" style="width:260px">
          <div class="rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-shadow">
            ${p.cover && !p.cover.match(/^\p{Emoji}/u) ? `<img src="${p.cover}" alt="${p.title}" class="w-full object-cover" style="height:130px">` : `<div class="flex items-center justify-center text-4xl" style="height:130px;background:linear-gradient(135deg,#dcfce7,#fef3c7)">${p.cover||'📰'}</div>`}
            <div class="p-3">
              <div class="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-1">${p.category || 'Blog'}</div>
              <div class="font-bold text-sm text-slate-900 leading-tight" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.title}</div>
              <div class="text-xs text-slate-500 mt-1.5">${p.readTime || 5} phút đọc</div>
            </div>
          </div>
        </a>
      `).join('');
    } else {
      document.getElementById('blog-home-section').style.display = 'none';
    }
  }
});

/* ─── SIM strip card (compact for homepage) ─── */
function simStripCard(p, carriers) {
  const c = carriers.find(x => x.id === p.carrier);
  const fmt = window.MM_UTILS.formatKRW;
  return `
    <a href="post.html#${p.id}" class="sim-strip-card" style="--c:${c.color};scroll-snap-align:start">
      <div class="sim-strip-card__top">
        <span class="sim-strip-card__logo">${c.logo}</span>
        <span class="sim-strip-card__brand">${c.short}</span>
        ${p.tag ? `<span class="sim-strip-card__tag">${p.tag}</span>` : ''}
      </div>
      <div class="sim-strip-card__name">${p.vName}</div>
      <div class="sim-strip-card__data"><i class="fas fa-database"></i> ${p.data}</div>
      <div class="sim-strip-card__price">
        <span>${fmt(p.monthly)}₩</span>
        <small>/tháng</small>
      </div>
    </a>
  `;
}
