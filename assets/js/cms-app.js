/* =============================================
   CMS APP — Bộ điều khiển UI cho admin-cms.html
   Dùng Groq AI (miễn phí, không cần thẻ)
   ============================================= */
(function () {
  'use strict';
  const { cfg, Groq, GH, Serialize } = window.MM_CMS;

  /* ─── Helpers ─── */
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  function logTo(elId, msg, type='info'){
    const el = $('#'+elId);
    if (!el) return;
    if (el.textContent.trim() === 'Chưa có hoạt động.') el.textContent = '';
    const t = new Date().toLocaleTimeString('vi-VN');
    const icon = type === 'err' ? '✗' : type === 'ok' ? '✓' : '•';
    el.textContent += `[${t}] ${icon} ${msg}\n`;
    el.scrollTop = el.scrollHeight;
  }
  function statusBadge(){
    const el = $('#cfg-status');
    if (cfg.isReady()){
      el.className = 'badge badge-ok';
      el.innerHTML = '<i class="fas fa-check-circle"></i> Đã sẵn sàng';
    } else {
      el.className = 'badge badge-err';
      el.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Chưa cấu hình API';
    }
  }
  function toast(msg, type='info'){
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:'+(type==='err'?'#dc2626':type==='ok'?'#16a34a':'#0f172a')+';color:#fff;padding:12px 18px;border-radius:10px;font-weight:600;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:9999;animation:slideIn .3s';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  /* ─── Tabs ─── */
  $$('.cms-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.cms-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const name = tab.dataset.tab;
      $$('section[data-pane]').forEach(s => s.classList.toggle('hidden', s.dataset.pane !== name));
    });
  });

  /* ═════════════════ SETTINGS ═════════════════ */
  function loadCfg(){
    $('#cfg-groq').value   = cfg.get('groq');
    $('#cfg-token').value  = cfg.get('ghToken');
    $('#cfg-owner').value  = cfg.get('ghOwner');
    $('#cfg-repo').value   = cfg.get('ghRepo');
    $('#cfg-branch').value = cfg.get('ghBranch') || 'main';
  }
  $('#cfg-save').addEventListener('click', () => {
    cfg.set('groq',     $('#cfg-groq').value.trim());
    cfg.set('ghToken',  $('#cfg-token').value.trim());
    cfg.set('ghOwner',  $('#cfg-owner').value.trim());
    cfg.set('ghRepo',   $('#cfg-repo').value.trim());
    cfg.set('ghBranch', $('#cfg-branch').value.trim() || 'main');
    statusBadge();
    $('#cfg-msg').innerHTML = '<span class="text-green-600 font-bold">✓ Đã lưu cấu hình</span>';
    toast('Đã lưu cấu hình', 'ok');
  });
  $('#cfg-test').addEventListener('click', async () => {
    const msg = $('#cfg-msg');
    const btn = $('#cfg-test');
    btn.disabled = true;
    msg.innerHTML = '<i class="fas fa-circle-notch fa-spin text-amber-600"></i> Đang kiểm tra...';
    const results = [];
    try {
      await Groq.testKey();
      results.push('<span class="text-green-600 font-bold">✓ Groq AI OK</span>');
    } catch (e) {
      results.push('<span class="text-red-600 font-bold">✗ Groq: ' + e.message + '</span>');
    }
    try {
      await GH.testConnection();
      results.push('<span class="text-green-600 font-bold">✓ GitHub OK</span>');
    } catch (e) {
      results.push('<span class="text-red-600 font-bold">✗ GitHub: ' + e.message + '</span>');
    }
    msg.innerHTML = results.join(' &nbsp;·&nbsp; ');
    btn.disabled = false;
  });
  $('#cfg-clear').addEventListener('click', () => {
    if (!confirm('Xóa toàn bộ API keys khỏi máy này?')) return;
    Object.keys(localStorage).filter(k => k.startsWith('mm_cms_')).forEach(k => localStorage.removeItem(k));
    loadCfg(); statusBadge();
    toast('Đã xóa', 'ok');
  });

  /* ═════════════════ GENERIC IMAGE UPLOADER ═════════════════ */
  function bindUploader(prefix, onFile){
    const drop = $('#'+prefix+'-drop');
    const file = $('#'+prefix+'-file');
    const img  = $('#'+prefix+'-preview-img');
    const btn  = $('#'+prefix+'-ocr-btn');
    let current = null;

    drop.addEventListener('click', () => file.click());
    drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('drag'));
    drop.addEventListener('drop', e => {
      e.preventDefault(); drop.classList.remove('drag');
      if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]);
    });
    file.addEventListener('change', () => {
      if (file.files[0]) handle(file.files[0]);
    });
    function handle(f){
      if (f.size > 10*1024*1024){ toast('Ảnh quá 10MB', 'err'); return; }
      current = f;
      const url = URL.createObjectURL(f);
      img.src = url; img.classList.remove('hidden');
      btn.disabled = false;
    }
    $('#'+prefix+'-clear').addEventListener('click', () => {
      current = null; file.value=''; img.classList.add('hidden'); btn.disabled = true;
    });
    btn.addEventListener('click', () => current && onFile(current));
  }

  /* ═════════════════ TAB: PRICE ═════════════════ */
  bindUploader('price', async (f) => {
    if (!cfg.get('groq')){ toast('Chưa có Groq API key', 'err'); return; }
    const btn = $('#price-ocr-btn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> AI đang đọc ảnh...';
    logTo('price-log', 'Gửi ảnh tới Groq AI...');
    try {
      const data = await Groq.parsePhonePrice(f);
      logTo('price-log', 'OCR xong. Tìm thấy ' + (data.items||[]).length + ' dòng.', 'ok');
      renderPriceTable(data.items || [], data.month, data.note);
      $('#price-result').classList.remove('hidden');
      toast('AI đọc xong ' + (data.items||[]).length + ' dòng', 'ok');
    } catch(e){
      logTo('price-log', e.message, 'err');
      toast(e.message, 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-robot"></i> Trích xuất bằng AI';
    }
  });

  function renderPriceTable(items, month, note){
    if (month) $('#price-month').value = month;
    if (note)  $('#price-note').value  = note;
    const tbody = $('#price-tbody');
    tbody.innerHTML = items.map((it, i) => priceRow(it, i)).join('');
    bindRowDelete('#price-tbody');
  }
  function priceRow(it, i){
    return `<tr data-i="${i}">
      <td><input data-k="model"  value="${(it.model||'').replace(/"/g,'&quot;')}"></td>
      <td><input data-k="config" value="${(it.config||'').replace(/"/g,'&quot;')}"></td>
      <td><input data-k="price"  type="number" value="${it.price||0}"></td>
      <td><input data-k="status" value="${it.status||'in'}"></td>
      <td><input data-k="trend"  type="number" value="${it.trend||0}"></td>
      <td><input data-k="brand"  value="${it.brand||''}"></td>
      <td><button class="row-del text-red-500"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }
  function bindRowDelete(scope){
    $$(scope+' .row-del').forEach(b => b.onclick = () => b.closest('tr').remove());
  }
  function collectPrice(){
    return $$('#price-tbody tr').map(tr => {
      const o = {};
      $$('input', tr).forEach(i => o[i.dataset.k] = i.type==='number' ? Number(i.value)||0 : i.value);
      return o;
    });
  }
  $('#price-add-row').addEventListener('click', () => {
    $('#price-tbody').insertAdjacentHTML('beforeend', priceRow({status:'in',trend:0}, Date.now()));
    bindRowDelete('#price-tbody');
  });
  $('#price-export').addEventListener('click', () => {
    const data = { month: $('#price-month').value, note: $('#price-note').value, items: collectPrice() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'phone-price-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
  });
  $('#price-publish').addEventListener('click', async () => {
    if (!cfg.isReady()){ toast('Chưa cấu hình GitHub', 'err'); return; }
    if (!confirm('Đẩy bảng giá mới lên GitHub? Sẽ ghi đè bảng giá hiện tại.')) return;
    const btn = $('#price-publish');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang đẩy...';
    logTo('price-log', 'Đang push lên GitHub...');
    try {
      const items = collectPrice();
      const r = await Serialize.updatePriceBoard(items, {
        month: $('#price-month').value, note: $('#price-note').value,
      });
      logTo('price-log', 'Commit: ' + r.commit.sha.slice(0,7) + ' — ' + r.commit.html_url, 'ok');
      toast('Đã đẩy ' + items.length + ' dòng lên web!', 'ok');
    } catch(e){
      logTo('price-log', e.message, 'err');
      toast(e.message, 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-rocket"></i> Đẩy lên web (GitHub)';
    }
  });

  /* ═════════════════ TAB: SIM ═════════════════ */
  bindUploader('sim', async (f) => {
    if (!cfg.get('groq')){ toast('Chưa có Groq API key', 'err'); return; }
    const btn = $('#sim-ocr-btn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> AI đang đọc...';
    logTo('sim-log', 'Gửi ảnh SIM tới Groq AI...');
    try {
      const data = await Groq.parseSimPrice(f);
      const plans = data.plans || [];
      logTo('sim-log', 'Tìm thấy ' + plans.length + ' gói.', 'ok');
      renderSimTable(plans);
      $('#sim-result').classList.remove('hidden');
      toast('AI đọc xong ' + plans.length + ' gói', 'ok');
    } catch(e){
      logTo('sim-log', e.message, 'err');
      toast(e.message, 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-robot"></i> Trích xuất bằng AI';
    }
  });

  function renderSimTable(plans){
    const tbody = $('#sim-tbody');
    tbody.innerHTML = plans.map((p, i) => `<tr data-i="${i}">
      <td><input data-k="carrier" value="${p.carrier||'ktm'}" style="width:80px"></td>
      <td><input data-k="name"    value="${(p.name||'').replace(/"/g,'&quot;')}"></td>
      <td><input data-k="vName"   value="${(p.vName||'').replace(/"/g,'&quot;')}"></td>
      <td><input data-k="monthly" type="number" value="${p.monthly||0}"></td>
      <td><input data-k="originalFee" type="number" value="${p.originalFee||p.monthly||0}"></td>
      <td><input data-k="data"    value="${p.data||''}"></td>
      <td style="text-align:center"><input data-k="highlight" type="checkbox" ${p.highlight?'checked':''}></td>
      <td><input data-k="tag"     value="${p.tag||''}"></td>
      <td><button class="row-del text-red-500"><i class="fas fa-trash"></i></button></td>
    </tr>`).join('');
    bindRowDelete('#sim-tbody');
  }
  function collectSim(){
    return $$('#sim-tbody tr').map(tr => {
      const o = {};
      $$('input', tr).forEach(i => {
        if (i.type === 'checkbox') o[i.dataset.k] = i.checked;
        else if (i.type === 'number') o[i.dataset.k] = Number(i.value)||0;
        else o[i.dataset.k] = i.value;
      });
      return o;
    });
  }
  $('#sim-publish').addEventListener('click', async () => {
    if (!cfg.isReady()){ toast('Chưa cấu hình GitHub', 'err'); return; }
    if (!confirm('Thêm các gói SIM này vào danh sách hiện tại?')) return;
    const btn = $('#sim-publish');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang đẩy...';
    logTo('sim-log', 'Đang push lên GitHub...');
    try {
      const plans = collectSim();
      const r = await Serialize.upsertSimPlans(plans);
      logTo('sim-log', 'Commit: ' + r.commit.sha.slice(0,7), 'ok');
      toast('Đã thêm ' + plans.length + ' gói SIM!', 'ok');
    } catch(e){
      logTo('sim-log', e.message, 'err');
      toast(e.message, 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-rocket"></i> Đẩy lên web';
    }
  });

  /* ═════════════════ TAB: BLOG ═════════════════ */
  let lastBlog = null;

  $('#blog-suggest').addEventListener('click', async () => {
    if (!cfg.get('groq')){ toast('Chưa có Groq API key', 'err'); return; }
    const btn = $('#blog-suggest');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    logTo('blog-log', 'Đang xin gợi ý chủ đề...');
    try {
      const topics = await Groq.suggestTopics(6);
      $('#topic-suggestions').innerHTML = topics.map(t =>
        `<span class="topic-chip" data-topic="${t.topic.replace(/"/g,'&quot;')}" data-kw="${(t.keywords||'').replace(/"/g,'&quot;')}">💡 ${t.topic}</span>`
      ).join('');
      $$('#topic-suggestions .topic-chip').forEach(c => {
        c.onclick = () => {
          $('#blog-topic').value = c.dataset.topic;
          $('#blog-keywords').value = c.dataset.kw;
        };
      });
      logTo('blog-log', 'Đã có ' + topics.length + ' gợi ý.', 'ok');
    } catch(e){
      logTo('blog-log', e.message, 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-lightbulb"></i> Gợi ý chủ đề';
    }
  });

  async function generateBlog(){
    const topic = $('#blog-topic').value.trim();
    if (!topic){ toast('Nhập chủ đề trước', 'err'); return; }
    if (!cfg.get('groq')){ toast('Chưa có Groq API key', 'err'); return; }
    const btn = $('#blog-gen');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> AI đang viết...';
    logTo('blog-log', 'Sinh bài: ' + topic);
    try {
      const post = await Groq.writeBlog({
        topic, keywords: $('#blog-keywords').value.trim(),
      });
      lastBlog = post;
      $('#blog-title').textContent = post.title;
      $('#blog-meta').textContent  = `${post.readTime||5} phút đọc · ${post.category||''} · ${(post.tags||[]).join(' #')}`;
      $('#blog-slug').value    = post.slug;
      $('#blog-cat').value     = post.category;
      $('#blog-cover').value   = post.cover;
      $('#blog-desc').value    = post.description;
      $('#blog-content').value = post.content;
      renderMarkdown(post.content);
      $('#blog-result').classList.remove('hidden');
      logTo('blog-log', 'Bài viết đã sẵn sàng (' + post.content.length + ' ký tự).', 'ok');
      toast('AI viết xong! Kiểm tra rồi đăng', 'ok');
    } catch(e){
      logTo('blog-log', e.message, 'err');
      toast(e.message, 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Viết bài bằng AI';
    }
  }
  $('#blog-gen').addEventListener('click', generateBlog);
  $('#blog-regen').addEventListener('click', generateBlog);
  $('#blog-content').addEventListener('input', () => renderMarkdown($('#blog-content').value));

  $('#blog-publish').addEventListener('click', async () => {
    if (!lastBlog){ toast('Chưa có bài', 'err'); return; }
    if (!cfg.isReady()){ toast('Chưa cấu hình GitHub', 'err'); return; }
    if (!confirm('Đăng bài "' + $('#blog-title').textContent + '" lên web?')) return;
    lastBlog.title       = $('#blog-title').textContent;
    lastBlog.slug        = $('#blog-slug').value.trim();
    lastBlog.category    = $('#blog-cat').value.trim();
    lastBlog.cover       = $('#blog-cover').value.trim();
    lastBlog.description = $('#blog-desc').value.trim();
    lastBlog.content     = $('#blog-content').value;
    const btn = $('#blog-publish');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang đăng...';
    logTo('blog-log', 'Đẩy bài lên GitHub...');
    try {
      const r = await Serialize.appendBlogPost(lastBlog);
      logTo('blog-log', 'Đăng thành công: ' + r.commit.sha.slice(0,7), 'ok');
      logTo('blog-log', 'Mở blog.html ở tab mới để xem...', 'ok');
      toast('Đã đăng bài! Đang mở blog...', 'ok');
      /* Tự mở blog.html ngay lập tức (cùng origin nên đọc được localStorage) */
      setTimeout(() => window.open('blog.html', '_blank'), 800);
    } catch(e){
      logTo('blog-log', e.message, 'err');
      toast(e.message, 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-rocket"></i> Đăng lên web';
    }
  });

  /* ─── Mini Markdown renderer ─── */
  function renderMarkdown(md){
    if (!md){ $('#blog-preview').innerHTML = ''; return; }
    let h = md
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^### (.+)$/gm,'<h3>$1</h3>')
      .replace(/^## (.+)$/gm,'<h2>$1</h2>')
      .replace(/^# (.+)$/gm,'<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank">$1</a>');
    h = h.replace(/((?:^\|.*\|\n)+)/gm, (block) => {
      const rows = block.trim().split('\n');
      const cells = r => r.split('|').slice(1,-1).map(c => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(r => '<tr>'+cells(r).map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('');
      return '<table><thead><tr>'+head.map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>'+body+'</tbody></table>';
    });
    h = h.replace(/((?:^- .*\n?)+)/gm, b => '<ul>'+b.trim().split('\n').map(l => '<li>'+l.replace(/^- /,'')+'</li>').join('')+'</ul>');
    h = h.replace(/((?:^\d+\. .*\n?)+)/gm, b => '<ol>'+b.trim().split('\n').map(l => '<li>'+l.replace(/^\d+\. /,'')+'</li>').join('')+'</ol>');
    h = h.split(/\n{2,}/).map(p =>
      /^<(h\d|ul|ol|table|li|tr|td|th|p|blockquote)/.test(p.trim()) ? p : (p.trim() ? '<p>'+p.replace(/\n/g,'<br>')+'</p>' : '')
    ).join('\n');
    $('#blog-preview').innerHTML = h;
  }

  /* ─── Init ─── */
  loadCfg();
  statusBadge();
  if (!cfg.isReady()){
    $$('.cms-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.cms-tab[data-tab="settings"]').classList.add('active');
    $$('section[data-pane]').forEach(s => s.classList.toggle('hidden', s.dataset.pane !== 'settings'));
  }
})();
