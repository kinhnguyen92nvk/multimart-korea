/* =============================================
   sim.js — Trang bảng giá SIM Hàn Quốc
   Render, lọc, sắp xếp, modal chi tiết, đặt SIM
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  if (!window.MM_SIM) return;
  const { plans, carriers, generalTerms, hotline, kakaoId } = window.MM_SIM;
  const { formatKRW } = window.MM_UTILS;

  /* ───────── State ───────── */
  let activeCarrier = 'all';
  let activeType    = 'all';   // all | MNO | MVNO | Prepaid
  let sortMode      = 'recommend';

  /* ───────── Helpers ───────── */
  const carrierById = id => carriers.find(c => c.id === id);
  const dataNum = (s) => {
    if (!s) return 0;
    const m = s.match(/(\d+(?:\.\d+)?)/);
    if (!m) return 999;             // 무제한 / Không giới hạn → ưu tiên
    return s.includes('Mỗi ngày') || s.includes('일') ? parseFloat(m[1]) * 30 : parseFloat(m[1]);
  };

  /* ───────── Stats ───────── */
  const updateStats = () => {
    document.getElementById('stat-total').textContent   = plans.length;
    document.getElementById('stat-mno').textContent     = plans.filter(p => carrierById(p.carrier)?.type === 'MNO').length;
    document.getElementById('stat-mvno').textContent    = plans.filter(p => carrierById(p.carrier)?.type === 'MVNO').length;
    document.getElementById('stat-prepaid').textContent = plans.filter(p => carrierById(p.carrier)?.type === 'Prepaid').length;
  };

  /* ───────── Filter chips ───────── */
  const renderCarrierChips = () => {
    const all = `<button class="sim-chip ${activeCarrier==='all'?'active':''}" data-c="all">Tất cả nhà mạng</button>`;
    const list = carriers.map(c => `
      <button class="sim-chip ${activeCarrier===c.id?'active':''}" data-c="${c.id}" style="${activeCarrier===c.id?`--chip-color:${c.color}`:''}">
        <span>${c.logo}</span> ${c.short}
      </button>
    `).join('');
    document.getElementById('carrier-chips').innerHTML = all + list;
    document.querySelectorAll('#carrier-chips .sim-chip').forEach(b => {
      b.onclick = () => { activeCarrier = b.dataset.c; renderCarrierChips(); render(); };
    });
  };

  const renderTypeChips = () => {
    const types = [
      { id: 'all',     label: 'Tất cả' },
      { id: 'MNO',     label: '🏢 MNO chính' },
      { id: 'MVNO',    label: '💸 MVNO rẻ' },
      { id: 'Prepaid', label: '⏱️ Trả trước' },
    ];
    document.getElementById('type-chips').innerHTML = types.map(t =>
      `<button class="sim-chip ${activeType===t.id?'active':''}" data-t="${t.id}">${t.label}</button>`
    ).join('');
    document.querySelectorAll('#type-chips .sim-chip').forEach(b => {
      b.onclick = () => { activeType = b.dataset.t; renderTypeChips(); render(); };
    });
  };

  /* ───────── SIM CARD ───────── */
  const planCard = (p) => {
    const c = carrierById(p.carrier);
    const isFav = window.MM_STATE && MM_STATE.isFav(p.id);
    return `
      <div class="sim-pcard ${p.highlight ? 'sim-pcard--hi' : ''}" data-id="${p.id}">
        ${p.highlight ? '<div class="sim-pcard__ribbon">⭐ KHUYẾN NGHỊ</div>' : ''}
        <div class="sim-pcard__head" style="--c:${c.color}">
          <div class="sim-pcard__carrier">
            <span class="sim-pcard__logo">${c.logo}</span>
            <div>
              <div class="sim-pcard__brand">${c.short}</div>
              <div class="sim-pcard__type">${c.type === 'MNO' ? 'Nhà mạng chính' : c.type === 'MVNO' ? 'MVNO · ' + c.netUse : 'Trả trước'}</div>
            </div>
          </div>
          ${p.tag ? `<span class="sim-pcard__tag">${p.tag}</span>` : ''}
        </div>

        <div class="sim-pcard__name">${p.vName}</div>
        <div class="sim-pcard__korean">${p.name}</div>

        <div class="sim-pcard__price">
          <span class="sim-pcard__price-num">${formatKRW(p.monthly)}₩</span>
          <span class="sim-pcard__price-period">/ ${p.prepaidMonths ? p.prepaidMonths + ' tháng' : 'tháng'}</span>
          ${p.originalFee && p.originalFee > p.monthly ? `<span class="sim-pcard__price-old">${formatKRW(p.originalFee)}₩</span>` : ''}
        </div>

        <ul class="sim-pcard__specs">
          <li><i class="fas fa-database"></i><span><b>${p.data}</b><small>${p.dataNote}</small></span></li>
          <li><i class="fas fa-phone-volume"></i><span>${p.voice}</span></li>
          <li><i class="fas fa-comment-sms"></i><span>${p.sms}</span></li>
          <li><i class="fas fa-tachometer-alt"></i><span>QoS: <b>${p.qos}</b></span></li>
          <li><i class="fas fa-file-contract"></i><span class="text-[11px]">${p.contract}</span></li>
        </ul>

        ${p.features && p.features.length ? `
          <div class="sim-pcard__feats">
            ${p.features.slice(0, 2).map(f => `<div><i class="fas fa-check"></i> ${f}</div>`).join('')}
          </div>
        ` : ''}

        <div class="sim-pcard__actions">
          <button class="sim-pcard__detail" onclick="window.__simOpenDetail('${p.id}')">
            <i class="fas fa-info-circle"></i> Chi tiết
          </button>
          <a href="https://qr.kakao.com" class="sim-pcard__order">
            <i class="fas fa-bolt"></i> Đăng ký mở
          </a>
        </div>
      </div>
    `;
  };

  /* ───────── Modal chi tiết ───────── */
  window.__simOpenDetail = (id) => {
    const p = plans.find(x => x.id === id);
    if (!p) return;
    const c = carrierById(p.carrier);
    document.getElementById('sim-modal-content').innerHTML = `
      <div class="sim-modal__head" style="--c:${c.color}">
        <div class="flex items-center gap-3">
          <div class="sim-modal__logo">${c.logo}</div>
          <div>
            <div class="text-xs font-bold uppercase tracking-wider opacity-90">${c.name} · ${c.type}</div>
            <h2 class="text-xl md:text-2xl font-black mt-0.5">${p.vName}</h2>
            <p class="text-xs opacity-80 mt-0.5">${p.name}</p>
          </div>
        </div>
        ${p.tag ? `<span class="sim-modal__tag">${p.tag}</span>` : ''}
      </div>

      <div class="sim-modal__body">
        <div class="grid grid-cols-2 gap-2 mb-5">
          <div class="sim-stat">
            <div class="sim-stat__label">Cước phí / tháng</div>
            <div class="sim-stat__value text-red-500">${formatKRW(p.monthly)}₩</div>
            ${p.originalFee && p.originalFee > p.monthly ? `<div class="text-[10px] text-gray-400 line-through">${formatKRW(p.originalFee)}₩ giá gốc</div>` : ''}
          </div>
          <div class="sim-stat">
            <div class="sim-stat__label">Data tốc độ cao</div>
            <div class="sim-stat__value text-green-600">${p.data}</div>
            <div class="text-[10px] text-gray-500">${p.dataNote}</div>
          </div>
          <div class="sim-stat">
            <div class="sim-stat__label">Gọi thoại</div>
            <div class="sim-stat__value text-base">${p.voice}</div>
          </div>
          <div class="sim-stat">
            <div class="sim-stat__label">Tin nhắn</div>
            <div class="sim-stat__value text-base">${p.sms}</div>
          </div>
        </div>

        <div class="mb-5">
          <h4 class="sim-section-title">📋 Hợp đồng</h4>
          <div class="sim-info-row"><span>Loại hợp đồng</span><b>${p.contract}</b></div>
          <div class="sim-info-row"><span>Tốc độ nền (QoS)</span><b>${p.qos}</b></div>
          <div class="sim-info-row"><span>Mạng sử dụng</span><b>${c.netUse}</b></div>
        </div>

        ${p.features && p.features.length ? `
          <div class="mb-5">
            <h4 class="sim-section-title">✨ Ưu điểm</h4>
            <ul class="space-y-1.5">
              ${p.features.map(f => `<li class="flex gap-2 text-sm"><i class="fas fa-check-circle text-green-500 mt-0.5"></i>${f}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${p.terms && p.terms.length ? `
          <div class="mb-5">
            <h4 class="sim-section-title">⚠️ Điều khoản hợp đồng</h4>
            <ul class="space-y-1.5">
              ${p.terms.map(t => `<li class="flex gap-2 text-sm"><i class="fas fa-exclamation-triangle text-amber-500 mt-0.5"></i>${t}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-900">
          <b>📌 Lưu ý chung:</b> Phí phát hành SIM 7.700₩, đăng ký tự động trừ phí qua tài khoản ngân hàng Hàn chính chủ. Hủy/hoàn theo điều khoản nhà mạng.
        </div>

        <div class="grid grid-cols-2 gap-2 mt-4">
          <a href="tel:${hotline}" class="btn-call !text-sm !py-3"><i class="fas fa-phone"></i> Gọi tư vấn</a>
          <a href="https://qr.kakao.com" class="btn-kakao !text-sm !py-3"><i class="fas fa-comment-dots"></i> KakaoTalk</a>
        </div>
        <button class="w-full mt-2 py-3 bg-green-600 text-white font-black rounded-lg hover:bg-green-700 transition" onclick="window.__simAddInquiry('${p.id}')">
          <i class="fas fa-paper-plane"></i> ĐĂNG KÝ MỞ SIM NGAY
        </button>
      </div>
    `;
    document.getElementById('sim-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  window.__simCloseModal = () => {
    document.getElementById('sim-modal').style.display = 'none';
    document.body.style.overflow = '';
  };
  window.__simAddInquiry = (id) => {
    const p = plans.find(x => x.id === id);
    if (!p) return;
    // Lưu request vào localStorage để admin xem
    const inquiries = JSON.parse(localStorage.getItem('mm_sim_inquiries') || '[]');
    inquiries.push({ id: p.id, name: p.vName, time: new Date().toISOString() });
    localStorage.setItem('mm_sim_inquiries', JSON.stringify(inquiries));
    if (window.MM_UTILS) MM_UTILS.toast('✅ Đã ghi nhận! Vui lòng kết nối KakaoTalk để hoàn tất');
    setTimeout(() => window.open('https://qr.kakao.com', '_blank'), 700);
  };

  /* ───────── RENDER ───────── */
  const render = () => {
    let filtered = plans.slice();
    if (activeCarrier !== 'all') filtered = filtered.filter(p => p.carrier === activeCarrier);
    if (activeType !== 'all')    filtered = filtered.filter(p => carrierById(p.carrier)?.type === activeType);

    if (sortMode === 'price-low')  filtered.sort((a, b) => a.monthly - b.monthly);
    if (sortMode === 'price-high') filtered.sort((a, b) => b.monthly - a.monthly);
    if (sortMode === 'data-high')  filtered.sort((a, b) => dataNum(b.data) - dataNum(a.data));
    if (sortMode === 'recommend')  filtered.sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));

    const grid = document.getElementById('sim-grid');
    const empty = document.getElementById('sim-empty');
    if (!filtered.length) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      grid.innerHTML = filtered.map(planCard).join('');
    }
    document.getElementById('filter-info').textContent = `(${filtered.length} gói)`;
  };

  /* ───────── Sort handler ───────── */
  document.getElementById('sort-select').addEventListener('change', e => {
    sortMode = e.target.value;
    render();
  });

  /* ───────── General terms ───────── */
  document.getElementById('general-terms').innerHTML = generalTerms
    .map(t => `<div class="flex gap-2"><i class="fas fa-info-circle text-blue-500 mt-1 shrink-0"></i><span>${t}</span></div>`)
    .join('');

  /* ───────── ESC closes modal ───────── */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') window.__simCloseModal(); });

  /* ───────── Init ───────── */
  updateStats();
  renderCarrierChips();
  renderTypeChips();
  render();
});
