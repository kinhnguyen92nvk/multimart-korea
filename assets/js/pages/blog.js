/* Trang Blog list */
(function () {
  /* Merge: cache (mới từ CMS) + seed (file blog.js) — dedupe theo id hoặc slug */
  let cached = [];
  try { cached = JSON.parse(localStorage.getItem('mm_blog_posts') || '[]'); } catch(e){}
  if (!Array.isArray(cached)) cached = [];
  const seed = (window.MM_BLOG && window.MM_BLOG.posts) || [];
  const seen = new Set();
  const posts = [];
  [...cached, ...seed].forEach(p => {
    const key = p.id || p.slug;
    if (!key || seen.has(key)) return;
    seen.add(key);
    posts.push(p);
  });
  /* Sắp xếp mới nhất lên đầu */
  posts.sort((a,b) => (b.publishedAt||'').localeCompare(a.publishedAt||''));
  let activeCat = 'all';
  let q = '';

  /* Categories */
  const cats = [
    { id: 'all',        name: 'Tất cả',     icon: '🌟' },
    { id: 'huong-dan',  name: 'Hướng dẫn',  icon: '📖' },
    { id: 'thu-thuat',  name: 'Thủ thuật',  icon: '💡' },
    { id: 'review',     name: 'Review',     icon: '🔍' },
    { id: 'tin-tuc',    name: 'Tin tức',    icon: '📰' },
  ];
  const catEl = document.getElementById('blog-cats');
  catEl.innerHTML = cats.map(c => `
    <button data-cat="${c.id}" class="cat-chip whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold ${c.id===activeCat?'bg-green-600 text-white':'bg-white text-slate-600'} border border-slate-200">
      ${c.icon} ${c.name}
    </button>`).join('');
  catEl.querySelectorAll('.cat-chip').forEach(b => b.onclick = () => {
    activeCat = b.dataset.cat;
    catEl.querySelectorAll('.cat-chip').forEach(x => {
      const on = x.dataset.cat === activeCat;
      x.className = 'cat-chip whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold ' + (on?'bg-green-600 text-white':'bg-white text-slate-600') + ' border border-slate-200';
    });
    render();
  });

  /* Search */
  document.getElementById('blog-search').addEventListener('input', (e) => {
    q = e.target.value.toLowerCase();
    render();
  });

  function postCard(p, big = false){
    const url = `blog-post.html?slug=${encodeURIComponent(p.slug)}`;
    if (big){
      return `<a href="${url}" class="block rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden no-underline hover:shadow-md transition">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-2/5 flex items-center justify-center text-7xl py-8" style="background:linear-gradient(135deg,#dcfce7,#fef3c7)">${p.cover || '📱'}</div>
          <div class="p-5 flex-1">
            <span class="text-[10px] font-black text-green-700 bg-green-100 px-2 py-1 rounded uppercase">Mới nhất</span>
            <h3 class="text-xl font-black text-slate-900 mt-2 leading-tight">${p.title}</h3>
            <p class="text-sm text-slate-500 mt-2">${p.description||''}</p>
            <div class="flex items-center gap-3 mt-3 text-xs text-slate-400">
              <span><i class="fas fa-calendar"></i> ${p.publishedAt}</span>
              <span><i class="fas fa-clock"></i> ${p.readTime||5} phút</span>
              <span><i class="fas fa-tag"></i> ${p.category||''}</span>
            </div>
          </div>
        </div>
      </a>`;
    }
    return `<a href="${url}" class="block rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden no-underline hover:shadow-md hover:-translate-y-0.5 transition">
      <div class="text-5xl py-7 text-center" style="background:linear-gradient(135deg,#dcfce7,#fef3c7)">${p.cover||'📱'}</div>
      <div class="p-4">
        <h3 class="font-black text-slate-900 leading-snug text-sm">${p.title}</h3>
        <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">${p.description||''}</p>
        <div class="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
          <span>${p.publishedAt}</span>·<span>${p.readTime||5} phút</span>
        </div>
      </div>
    </a>`;
  }

  function render(){
    let list = posts.slice();
    if (activeCat !== 'all') list = list.filter(p => p.category === activeCat);
    if (q) list = list.filter(p =>
      (p.title||'').toLowerCase().includes(q) ||
      (p.description||'').toLowerCase().includes(q) ||
      (p.tags||[]).join(' ').toLowerCase().includes(q)
    );
    list.sort((a,b) => (b.publishedAt||'').localeCompare(a.publishedAt||''));

    const featured = document.getElementById('blog-featured');
    const grid = document.getElementById('blog-grid');
    const empty = document.getElementById('blog-empty');

    if (!list.length){
      featured.innerHTML = ''; grid.innerHTML = ''; empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');
    featured.innerHTML = postCard(list[0], true);
    grid.innerHTML = list.slice(1).map(p => postCard(p)).join('');
  }
  render();
})();
