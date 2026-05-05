/* Trang chi tiết bài blog */
(function () {
  /* Merge: cache (CMS) + seed */
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
  const slug = new URLSearchParams(location.search).get('slug');
  const post = posts.find(p => p.slug === slug) || posts[0];
  if (!post){
    document.getElementById('post-header').innerHTML = '<p class="text-slate-500">Không tìm thấy bài viết.</p>';
    return;
  }

  /* Cập nhật document title + meta cho SEO */
  document.title = post.title + ' — MultiMart KOREA';
  const setMeta = (name, content) => {
    let m = document.querySelector('meta[name="'+name+'"]') || document.querySelector('meta[property="'+name+'"]');
    if (!m){ m = document.createElement('meta'); m.setAttribute(name.startsWith('og:')?'property':'name', name); document.head.appendChild(m); }
    m.setAttribute('content', content);
  };
  setMeta('description', post.description || '');
  setMeta('keywords', post.keywords || '');
  setMeta('og:title', post.title);
  setMeta('og:description', post.description || '');
  setMeta('og:type', 'article');

  /* JSON-LD Article schema */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: post.author || 'MultiMart KOREA' },
    publisher: {
      '@type': 'Organization', name: 'MultiMart KOREA',
      logo: { '@type': 'ImageObject', url: location.origin + '/assets/img/favicon.svg' }
    },
    mainEntityOfPage: location.href,
    keywords: post.keywords,
  });
  document.head.appendChild(ld);

  /* Header */
  document.getElementById('post-header').innerHTML = `
    <div class="text-7xl mb-3">${post.cover||'📱'}</div>
    <span class="text-[11px] font-black text-green-700 bg-green-100 px-2 py-1 rounded uppercase">${post.category||'bài viết'}</span>
    <h1 class="text-3xl md:text-4xl font-black text-slate-900 mt-3 leading-tight">${post.title}</h1>
    <p class="text-base text-slate-500 mt-3">${post.description||''}</p>
    <div class="flex items-center gap-4 mt-4 text-xs text-slate-400 border-y py-3 flex-wrap">
      <span><i class="fas fa-user"></i> ${post.author||'MultiMart KOREA'}</span>
      <span><i class="fas fa-calendar"></i> ${post.publishedAt}</span>
      <span><i class="fas fa-clock"></i> ${post.readTime||5} phút đọc</span>
      <span id="view-count"><i class="fas fa-eye"></i> 0 lượt xem</span>
    </div>
    <div class="flex gap-2 mt-3 flex-wrap">
      <button data-share="copy" class="share-btn"><i class="fas fa-link"></i> Sao chép link</button>
      <a data-share="fb" target="_blank" class="share-btn" style="background:#1877f2;color:#fff;border-color:#1877f2"><i class="fab fa-facebook-f"></i> Facebook</a>
      <a data-share="kakao" target="_blank" class="share-btn" style="background:#FFE812;color:#3C1E1E;border-color:#FFE812"><i class="fas fa-comment"></i> KakaoTalk</a>
      <a data-share="tg" target="_blank" class="share-btn" style="background:#0088cc;color:#fff;border-color:#0088cc"><i class="fab fa-telegram"></i> Telegram</a>
    </div>
  `;

  /* Reading progress bar */
  const bar = document.createElement('div');
  bar.id = 'reading-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#16a34a,#84cc16);width:0%;z-index:9999;transition:width .1s';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = Math.min(100, pct) + '%';
  }, { passive: true });

  /* View counter (lưu localStorage theo slug) */
  const viewKey = 'mm_views_' + post.slug;
  const views = (parseInt(localStorage.getItem(viewKey) || '0', 10) || 0) + 1;
  localStorage.setItem(viewKey, String(views));
  const vc = document.getElementById('view-count');
  if (vc) vc.innerHTML = `<i class="fas fa-eye"></i> ${views.toLocaleString('vi-VN')} lượt xem`;

  /* Share buttons */
  const url = location.href;
  const title = encodeURIComponent(post.title);
  document.querySelectorAll('[data-share]').forEach(el => {
    const t = el.dataset.share;
    if (t === 'copy') {
      el.onclick = async () => {
        try { await navigator.clipboard.writeText(url); el.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!'; setTimeout(() => el.innerHTML = '<i class="fas fa-link"></i> Sao chép link', 1800); }
        catch(e){ alert(url); }
      };
    } else if (t === 'fb') {
      el.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    } else if (t === 'kakao') {
      el.href = 'https://story.kakao.com/share?url=' + encodeURIComponent(url);
    } else if (t === 'tg') {
      el.href = 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + title;
    }
  });

  /* Markdown render */
  document.getElementById('post-body').innerHTML = mdToHtml(post.content || '');

  /* Bài liên quan */
  const related = posts.filter(p => p.slug !== post.slug).slice(0, 4);
  document.getElementById('related-grid').innerHTML = related.map(p => `
    <a href="blog-post.html?slug=${encodeURIComponent(p.slug)}" class="flex gap-3 p-3 rounded-xl bg-white border border-slate-100 no-underline hover:shadow-sm">
      <div class="text-3xl flex items-center justify-center w-14 h-14 rounded-lg" style="background:#f0fdf4">${p.cover||'📱'}</div>
      <div class="flex-1">
        <div class="font-bold text-sm text-slate-900 leading-snug">${p.title}</div>
        <div class="text-xs text-slate-400 mt-1">${p.publishedAt} · ${p.readTime||5} phút</div>
      </div>
    </a>`).join('');

  function mdToHtml(md){
    let h = md
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^### (.+)$/gm,'<h3>$1</h3>')
      .replace(/^## (.+)$/gm,'<h2>$1</h2>')
      .replace(/^# (.+)$/gm,'<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/\[([^\]]+?)\]\(([^)]+?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
    h = h.replace(/((?:^\|.*\|\n?)+)/gm, (block) => {
      const rows = block.trim().split('\n').filter(Boolean);
      if (rows.length < 2) return block;
      const cells = r => r.split('|').slice(1,-1).map(c => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(r => '<tr>'+cells(r).map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('');
      return '<div class="overflow-x-auto"><table><thead><tr>'+head.map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>'+body+'</tbody></table></div>';
    });
    h = h.replace(/((?:^- .*\n?)+)/gm, b => '<ul>'+b.trim().split('\n').map(l => '<li>'+l.replace(/^- /,'')+'</li>').join('')+'</ul>');
    h = h.replace(/((?:^\d+\. .*\n?)+)/gm, b => '<ol>'+b.trim().split('\n').map(l => '<li>'+l.replace(/^\d+\. /,'')+'</li>').join('')+'</ol>');
    h = h.replace(/^---+$/gm, '<hr>');
    h = h.split(/\n{2,}/).map(p =>
      /^<(h\d|ul|ol|table|li|tr|td|th|p|blockquote|div|hr)/.test(p.trim()) ? p : (p.trim() ? '<p>'+p.replace(/\n/g,'<br>')+'</p>' : '')
    ).join('\n');
    return h;
  }
})();
