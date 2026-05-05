document.addEventListener('DOMContentLoaded', () => {
  const { categories, products } = window.MM_DATA;
  const { formatKRW, query, renderList, findCategory } = window.MM_UTILS;

  let activeCat = query('cat') || categories[0].id;
  let sortMode = 'default';

  const renderSidebar = () => {
    document.getElementById('cat-list').innerHTML = renderList(categories, c => `
      <button onclick="window.__mm_setCat('${c.id}')" class="w-full p-3 rounded-2xl border ${activeCat===c.id?'bg-indigo-600 text-white border-transparent shadow-brand':'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'} font-bold text-center md:text-left flex flex-col md:flex-row items-center gap-3 transition">
        <span class="text-xl">${c.icon}</span>
        <span class="text-[10px] md:text-sm">${c.name}</span>
      </button>
    `);
  };

  const renderBanner = () => {
    const c = findCategory(activeCat);
    document.getElementById('cat-banner').innerHTML = `
      <div class="absolute inset-0" style="background: linear-gradient(120deg, ${c.color}dd, ${c.color}55);"></div>
      <div class="relative z-10 h-full flex flex-col justify-center p-8 text-white">
        <div class="text-5xl mb-2">${c.icon}</div>
        <h3 class="text-2xl md:text-3xl font-black">${c.name}</h3>
        <p class="text-xs text-white/80 mt-1">Đa dạng mẫu mã, giá cập nhật theo tháng</p>
      </div>
    `;
  };

  const renderChips = () => {
    const chips = ['Tất cả', 'Hàng mới', 'Khuyến mãi', 'Best seller', 'Cao cấp'];
    document.getElementById('cat-chips').innerHTML = chips.map((t,i) => `
      <button class="shrink-0 px-4 py-2 ${i===0?'bg-slate-900 text-white':'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'} text-xs font-bold rounded-full transition">${t}</button>
    `).join('');
  };

  const productCard = (p) => `
    <a href="product.html?id=${p.id}" class="card group cursor-pointer no-underline block p-2">
      <div class="aspect-square bg-slate-50 rounded-[18px] mb-3 overflow-hidden relative">
        <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
        ${p.tag ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">${p.tag}</span>`:''}
        <button onclick="event.preventDefault(); MM_STATE.addToCart('${p.id}')" class="absolute bottom-2 right-2 w-9 h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md">
          <i class="fas fa-cart-plus text-indigo-600 text-sm"></i>
        </button>
      </div>
      <div class="px-2 pb-2">
        <h4 class="text-sm font-bold text-slate-700 mb-1" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${p.name}</h4>
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-black text-red-500 krw">${formatKRW(p.price)}</span>
          ${p.oldPrice?`<span class="text-[10px] text-slate-400 line-through krw">${formatKRW(p.oldPrice)}</span>`:''}
        </div>
        <div class="mt-2 text-[10px] text-slate-400"><i class="fas fa-star text-yellow-400"></i> ${p.rating} · Đã bán ${p.sold}</div>
      </div>
    </a>
  `;

  const renderProducts = () => {
    let list = products.filter(p => p.cat === activeCat);
    if (sortMode === 'low')    list.sort((a,b)=>a.price-b.price);
    if (sortMode === 'high')   list.sort((a,b)=>b.price-a.price);
    if (sortMode === 'rating') list.sort((a,b)=>b.rating-a.rating);
    if (sortMode === 'sold')   list.sort((a,b)=>b.sold-a.sold);

    document.getElementById('empty').classList.toggle('hidden', list.length > 0);
    document.getElementById('prod-grid').innerHTML = renderList(list, productCard);
  };

  window.__mm_setCat = (id) => { activeCat = id; renderSidebar(); renderBanner(); renderProducts(); };
  document.getElementById('sort').addEventListener('change', e => { sortMode = e.target.value; renderProducts(); });

  renderSidebar(); renderBanner(); renderChips(); renderProducts();
});
