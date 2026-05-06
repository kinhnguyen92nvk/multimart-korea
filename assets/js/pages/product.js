/* ============================================
   product.js — Trang chi tiết sản phẩm
   Gallery 5 ảnh · Tabs mô tả / thông số / đánh giá
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const { products } = window.MM_DATA;
  const { formatKRW, toVND, query, findProduct, renderList, findCategory } = window.MM_UTILS;
  const id = query('id') || 's01';
  const p  = findProduct(id) || products[0];
  const related = products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  let qty      = 1;
  let activeImg = 0;
  let activeTab = 'desc'; // desc | specs | reviews
  const root = document.getElementById('root');

  /* Track recently viewed */
  if (window.MM_STATE && MM_STATE.addToRecent) MM_STATE.addToRecent(p.id);

  /* ───────── helpers ───────── */
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  const imgList = (p.imgs && p.imgs.length) ? p.imgs : [p.img, p.img, p.img, p.img];

  /* ───────── render ───────── */
  const render = () => {
    const isFav = MM_STATE.isFav(p.id);
    const catName = (findCategory(p.cat) || {}).name || '';
    const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

    root.innerHTML = `
      <!-- Breadcrumb -->
      <nav class="text-xs text-slate-500 mb-5 flex items-center gap-1 flex-wrap">
        <a href="index.html" class="hover:text-amber-600 no-underline">Trang chủ</a>
        <span>/</span>
        <a href="category.html?cat=${p.cat}" class="hover:text-amber-600 no-underline">${catName}</a>
        <span>/</span>
        <span class="text-slate-700 font-semibold line-clamp-1">${p.name}</span>
      </nav>

      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">

        <!-- ═══ GALLERY ═══ -->
        <div>
          <!-- Main image -->
          <div id="main-wrap" class="relative aspect-square bg-white rounded-2xl overflow-hidden border border-slate-200 cursor-zoom-in">
            <img id="main-img" src="${imgList[activeImg]}" alt="${p.name}"
              class="w-full h-full object-cover transition-opacity duration-200"
              loading="eager">
            ${discount ? `<div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full">-${discount}%</div>` : ''}
            ${p.tag ? `<div class="absolute top-3 right-3 bg-amber-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full">${p.tag}</div>` : ''}
            <!-- Prev/Next arrows -->
            <button onclick="window.__mm_prevImg()" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-700 shadow hover:bg-slate-50 transition"><i class="fas fa-chevron-left text-xs"></i></button>
            <button onclick="window.__mm_nextImg()" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-700 shadow hover:bg-slate-50 transition"><i class="fas fa-chevron-right text-xs"></i></button>
          </div>

          <!-- Thumbnails -->
          <div class="grid grid-cols-5 gap-2 mt-3">
            ${imgList.map((src, i) => `
              <div onclick="window.__mm_setImg(${i})"
                class="aspect-square bg-white rounded-xl overflow-hidden border-2 cursor-pointer transition-colors
                  ${i === activeImg ? 'border-amber-500' : 'border-slate-200 hover:border-amber-300'}">
                <img src="${src}" class="w-full h-full object-cover" loading="lazy" alt="Ảnh ${i+1}">
              </div>
            `).join('')}
          </div>

          <!-- Dot indicator -->
          <div class="flex justify-center gap-1.5 mt-3">
            ${imgList.map((_, i) => `
              <button onclick="window.__mm_setImg(${i})"
                class="rounded-full transition-all duration-200 ${i === activeImg ? 'w-6 h-2 bg-amber-500' : 'w-2 h-2 bg-slate-300'}">
              </button>
            `).join('')}
          </div>
        </div>

        <!-- ═══ INFO ═══ -->
        <div class="space-y-5">
          <!-- Tags + meta -->
          <div class="flex items-center gap-2 flex-wrap">
            ${p.tag ? `<span class="chip-gold">${p.tag}</span>` : ''}
            <span class="text-xs text-slate-500 flex items-center gap-1">
              <i class="fas fa-star text-amber-400"></i> <b>${p.rating}</b>
              <span class="text-slate-300">·</span>
              Đã bán <b>${p.sold.toLocaleString('vi')}</b>
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-2xl md:text-3xl font-black text-slate-900 leading-tight">${p.name}</h1>

          <!-- Price block -->
          <div class="flex items-baseline gap-3 flex-wrap">
            <span class="text-3xl font-black text-red-600 krw">${formatKRW(p.price)}</span>
            ${p.oldPrice ? `<span class="text-base text-slate-400 line-through krw">${formatKRW(p.oldPrice)}</span>
            <span class="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">-${Math.round((1-p.price/p.oldPrice)*100)}%</span>` : ''}
          </div>
          <p class="text-xs text-slate-400">≈ <b class="text-slate-600">${toVND(p.price)}</b> ₫</p>

          <!-- Short desc -->
          <p class="text-slate-600 leading-relaxed text-sm">${p.desc}</p>

          <!-- Divider -->
          <hr class="border-amber-100">

          <!-- Version selector (phone only) -->
          ${p.cat === 'phone' ? `
          <div>
            <label class="lbl">💾 Dung lượng</label>
            <div class="flex gap-2 flex-wrap mt-1">
              ${['128GB','256GB','512GB'].map((v,i) => `
                <button class="px-4 py-2 rounded-xl border-2 text-sm font-bold transition
                  ${i===1 ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-gold' : 'border-slate-200 text-slate-600 hover:border-amber-300'}">${v}</button>
              `).join('')}
            </div>
          </div>
          <div>
            <label class="lbl">🎨 Màu sắc</label>
            <div class="flex gap-2 mt-1 flex-wrap">
              ${[['#1e293b','Đen'],['#cbd5e1','Bạc'],['#fef3c7','Titan Sa Mạc'],['#93c5fd','Xanh']].map(([c,name],i) => `
                <button title="${name}" class="relative w-10 h-10 rounded-full border-3 transition-all duration-200
                  ${i===0 ? 'ring-gold scale-110' : 'border-slate-300 hover:scale-105'}"
                  style="background:${c}; border: 3px solid ${i===0?'#fbbf24':'#cbd5e1'}">
                  ${i===0 ? '<i class="fas fa-check absolute inset-0 m-auto text-white text-xs leading-10"></i>' : ''}
                </button>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- Quantity -->
          <div class="flex items-center gap-4">
            <span class="text-sm font-semibold text-slate-600">Số lượng</span>
            <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button onclick="window.__mm_dec()" class="w-10 h-10 text-xl font-bold text-slate-700 hover:bg-slate-50 transition">−</button>
              <span id="qty" class="w-10 text-center font-bold">${qty}</span>
              <button onclick="window.__mm_inc()" class="w-10 h-10 text-xl font-bold text-slate-700 hover:bg-slate-50 transition">+</button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 pt-1">
            <button onclick="window.__mm_addCart()"
              class="flex-1 h-12 rounded-xl border-2 border-amber-500 text-amber-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-50 transition">
              <i class="fas fa-cart-plus"></i> Thêm giỏ
            </button>
            <button onclick="window.__mm_buy()"
              class="flex-[1.4] h-12 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 transition" style="background:#d97706">
              <i class="fas fa-bolt"></i> Mua ngay
            </button>
            <button onclick="window.__mm_fav()" id="fav-btn"
              class="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-red-50 transition">
              <i class="${isFav ? 'fas text-red-500' : 'far text-slate-400'} fa-heart text-lg"></i>
            </button>
          </div>

          <!-- Trust icons -->
          <div class="flex gap-4 pt-3 border-t border-slate-100 text-center">
            <div class="flex-1">
              <div class="text-lg mb-0.5">🛡️</div>
              <p class="text-[11px] text-slate-500">BH 12 tháng</p>
            </div>
            <div class="flex-1">
              <div class="text-lg mb-0.5">🚚</div>
              <p class="text-[11px] text-slate-500">Giao trong ngày</p>
            </div>
            <div class="flex-1">
              <div class="text-lg mb-0.5">🔄</div>
              <p class="text-[11px] text-slate-500">Đổi trả 7 ngày</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ DETAIL TABS ═══ -->
      <section class="mt-12">
        <!-- Tab buttons -->
        <div class="flex border-b border-slate-200 mb-5 overflow-x-auto hide-scrollbar">
          ${[['desc','Mô tả'],['specs','Thông số'],['reviews','Đánh giá ('+((p.reviews||[]).length)+')']]
            .map(([k,label]) => `
            <button onclick="window.__mm_tab('${k}')"
              class="tab-btn px-5 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors
              ${activeTab===k ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}"
              data-tab="${k}">${label}</button>
          `).join('')}
        </div>

        <!-- Tab content -->
        <div id="tab-content">${renderTabContent()}</div>
      </section>

      <!-- RELATED -->
      <section class="mt-10 mb-10">
        <h3 class="text-base font-black text-slate-800 mb-3">Sản phẩm liên quan</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          ${renderList(related, x => {
            const xSrc = (x.imgs && x.imgs.length) ? x.imgs[0] : x.img;
            return `
            <a href="product.html?id=${x.id}" class="block bg-white rounded-2xl overflow-hidden no-underline border border-slate-100 hover:shadow-md transition-shadow group">
              <div class="relative" style="padding-top:100%">
                <img src="${xSrc}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
              </div>
              <div class="p-2.5">
                <p class="text-xs font-semibold text-slate-700 mb-1" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${x.name}</p>
                <span class="text-sm font-black text-red-600 krw">${formatKRW(x.price)}</span>
              </div>
            </a>`;
          })}
        </div>
      </section>
    `;

    /* Mobile sticky bar */
    const old = document.getElementById('mb-bar'); if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', `
      <div id="mb-bar" class="md:hidden fixed bottom-[64px] left-0 right-0 bg-white border-t border-slate-200 p-2.5 flex gap-2 z-50">
        <button onclick="window.__mm_addCart()" class="flex-1 h-12 rounded-xl border-2 border-amber-500 text-amber-700 font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-amber-50">
          <i class="fas fa-cart-plus text-sm"></i> Giỏ
        </button>
        <button onclick="window.__mm_buy()" class="flex-[2.5] h-12 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2" style="background:#d97706">
          <i class="fas fa-bolt"></i> Mua ngay · <span class="krw">${formatKRW(p.price)}</span>
        </button>
      </div>
    `);
  };

  /* ───────── Tab content renderer ───────── */
  function renderTabContent() {
    if (activeTab === 'desc') {
      return `
        <div class="card !p-6 prose-sm text-slate-600 space-y-4 max-w-none">
          <p class="text-base leading-relaxed">${p.desc}</p>
          <p>Sản phẩm được phân phối tại <b>MultiMart KOREA</b> – shop uy tín số 1 cho người Việt tại Hàn Quốc. Hỗ trợ tiếng Việt 100%, tư vấn trực tiếp <b>24/7</b>.</p>
          <ul class="list-none space-y-2 pl-0">
            ${[
              '✅ Đặt hàng nhanh – xác nhận trong 5 phút',
              '✅ Cài đặt miễn phí: ngân hàng VN, Zalo, TikTok nếu bạn cần',
              '✅ Đóng gói chắc chắn, ship CPE trong ngày',
              '✅ Đầy đủ phụ kiện tặng kèm',
              '✅ Có ship thẳng Việt Nam – Thần tốc như tên lửa 🚀',
            ].map(t => `<li class="flex items-start gap-2 text-sm">${t}</li>`).join('')}
          </ul>

          <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mt-4 space-y-2">
            <p class="text-sm leading-relaxed mb-0">📍 <b>Nhận lắp WiFi 6 tháng cho anh em BHP – HP</b> – để tối nào cũng "xem phim chill, thả thính tẹt ga", không lo "lag như rùa bò" nha! 🐢✨</p>
            <p class="text-sm leading-relaxed mb-0">💟 <b>Sim thần thánh đa-zi-năng:</b> BHP – HP – Du Lịch – Thăm Thân – Thương Mại – Thời Vụ – E9 – D4 – D2 – F1 – E8 – E7… – sóng căng đét như 6 múi idol Hàn – rẻ như trái ổi cuối mùa! 🍐</p>
            <p class="text-sm italic text-amber-700 mb-0">"Chỉ có sóng WiFi và sim mạnh mới cứu được trái tim FA ^^"</p>
            <p class="text-sm leading-relaxed mb-0">💟 <b>Hạ gói cước cao xuống rẻ</b> còn 11k – 13k – 17k – 20k – 25k – 33k… còn chần chừ gì nữa anh em ơi!</p>
            <p class="text-sm font-bold text-red-600 mb-0">📍 Chốt lẹ – Đỡ mất công suy nghĩ!</p>
            <p class="text-sm font-bold text-pink-600 mb-0">💌 Inbox nhanh nhanh đi nào, kẻo trễ chuyến tàu deal thần tốc nè 😍</p>
          </div>
        </div>
      `;
    }

    if (activeTab === 'specs') {
      const specs = p.specs || [];
      if (!specs.length) return `<div class="card !p-6 text-slate-500 text-center">Chưa có thông số kỹ thuật</div>`;
      return `
        <div class="card !p-0 overflow-hidden">
          <table class="w-full text-sm">
            <tbody>
              ${specs.map(([k,v],i) => `
                <tr class="${i % 2 === 0 ? 'bg-amber-50/40' : 'bg-white'}">
                  <td class="py-3 px-5 font-bold text-slate-600 w-2/5 align-top">${k}</td>
                  <td class="py-3 px-5 text-slate-700">${v}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (activeTab === 'reviews') {
      const reviews = p.reviews || [];
      const avgStar = reviews.length ? (reviews.reduce((s,r)=>s+r.star,0)/reviews.length).toFixed(1) : p.rating;
      const dist = [5,4,3,2,1].map(n => ({n, count: reviews.filter(r=>r.star===n).length}));
      return `
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Summary card -->
          <div class="card !p-6 text-center flex flex-col items-center justify-center">
            <div class="text-6xl font-black gradient-text">${avgStar}</div>
            <div class="text-amber-400 text-xl my-2">${stars(Math.round(avgStar))}</div>
            <p class="text-sm text-slate-500">${reviews.length} đánh giá từ khách đã mua</p>
            <div class="w-full mt-4 space-y-1.5">
              ${dist.map(({n,count}) => `
                <div class="flex items-center gap-2 text-xs">
                  <span class="w-6 text-right text-amber-600 font-bold">${n}★</span>
                  <div class="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div class="h-2 rounded-full gradient-brand transition-all duration-700"
                      style="width:${reviews.length ? Math.round(count/reviews.length*100) : 0}%"></div>
                  </div>
                  <span class="w-4 text-slate-400">${count}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Review list -->
          <div class="md:col-span-2 space-y-4">
            ${reviews.length ? reviews.map(r => `
              <div class="card !p-5">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 gradient-brand rounded-full flex items-center justify-center font-black text-slate-900 text-sm">${r.name.split(' ').pop()[0]}</div>
                    <div>
                      <div class="font-black text-sm">${r.name}</div>
                      <div class="text-[11px] text-slate-400"><i class="fas fa-map-marker-alt text-amber-400 mr-1"></i>${r.loc} · ${r.date}</div>
                    </div>
                  </div>
                  <div class="text-amber-400 text-sm font-bold shrink-0">${stars(r.star)}</div>
                </div>
                <p class="text-sm text-slate-600 leading-relaxed">${r.text}</p>
                <div class="mt-3 flex items-center gap-3 text-xs text-slate-400">
                  <button class="hover:text-amber-600 transition"><i class="fas fa-thumbs-up mr-1"></i>Hữu ích</button>
                  <span>·</span>
                  <span class="text-green-600 font-bold"><i class="fas fa-check-circle mr-1"></i>Đã xác minh mua hàng</span>
                </div>
              </div>
            `).join('') : `
              <div class="card !p-8 text-center text-slate-500">
                <i class="far fa-comment-dots text-4xl mb-3 block text-slate-300"></i>
                <p class="font-bold">Chưa có đánh giá</p>
                <p class="text-sm mt-1">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
              </div>
            `}
          </div>
        </div>
      `;
    }
    return '';
  }

  /* ───────── Window event handlers ───────── */
  window.__mm_setImg = i => {
    activeImg = ((i % imgList.length) + imgList.length) % imgList.length;
    render();
  };
  window.__mm_prevImg = () => window.__mm_setImg(activeImg - 1);
  window.__mm_nextImg = () => window.__mm_setImg(activeImg + 1);
  window.__mm_tab = tab => { activeTab = tab; document.getElementById('tab-content').innerHTML = renderTabContent();
    document.querySelectorAll('.tab-btn').forEach(b => {
      const on = b.dataset.tab === tab;
      b.classList.toggle('border-amber-500', on);
      b.classList.toggle('text-amber-700', on);
      b.classList.toggle('border-transparent', !on);
      b.classList.toggle('text-slate-500', !on);
    });
  };
  window.__mm_inc = () => { qty++; document.getElementById('qty').textContent = qty; };
  window.__mm_dec = () => { if (qty > 1) qty--; document.getElementById('qty').textContent = qty; };
  window.__mm_addCart = () => MM_STATE.addToCart(p.id, qty);
  window.__mm_buy    = () => { MM_STATE.addToCart(p.id, qty); setTimeout(() => location.href = 'checkout.html', 400); };
  window.__mm_fav    = () => { MM_STATE.toggleFav(p.id); render(); };

  /* Swipe support for gallery on mobile */
  let touchX = null;
  document.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { dx < 0 ? window.__mm_nextImg() : window.__mm_prevImg(); }
    touchX = null;
  }, { passive: true });

  render();
});
