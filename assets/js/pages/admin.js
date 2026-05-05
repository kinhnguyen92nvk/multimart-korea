/* Admin panel - all tabs rendered by JS */
document.addEventListener('DOMContentLoaded', () => {
  const { products, orders, priceBoard, categories, user } = window.MM_DATA;
  const { formatKRW, renderList } = window.MM_UTILS;

  const TITLES = {
    dashboard: 'Tổng quan',
    products:  'Quản lý sản phẩm',
    orders:    'Quản lý đơn hàng',
    phones:    'Bảng giá điện thoại tháng',
    banners:   'Banner & Khuyến mãi',
    customers: 'Khách hàng',
    settings:  'Cấu hình hệ thống',
  };

  const stat = (label, value, icon, color, sub) => `
    <div class="card !p-5">
      <div class="flex items-start justify-between">
        <div>
          <div class="text-xs uppercase tracking-wider font-bold text-slate-400">${label}</div>
          <div class="text-3xl font-black mt-1">${value}</div>
          <div class="text-xs text-${color}-600 font-bold mt-1">${sub}</div>
        </div>
        <div class="w-12 h-12 bg-${color}-100 text-${color}-600 rounded-2xl flex items-center justify-center text-xl"><i class="fas fa-${icon}"></i></div>
      </div>
    </div>
  `;

  const VIEWS = {
    dashboard: () => `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        ${stat('Doanh thu tháng', formatKRW(15850000)+' ₩', 'won-sign', 'green', '↑ 12.5% so tháng trước')}
        ${stat('Đơn hàng mới',    '142', 'shopping-cart', 'indigo', '↑ 8 đơn hôm nay')}
        ${stat('Khách hàng',      '1,287', 'users', 'purple', '+24 trong tuần')}
        ${stat('Sản phẩm',        products.length, 'box', 'amber', '2 sắp hết hàng')}
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div class="card !p-6 md:col-span-2">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-black text-lg">📈 Doanh thu 7 ngày</h3>
            <select class="field !py-1 text-xs w-32"><option>7 ngày</option><option>30 ngày</option><option>3 tháng</option></select>
          </div>
          <div class="flex items-end justify-between gap-2 h-44 px-4">
            ${[60,80,55,90,75,100,85].map((h,i)=>`
              <div class="flex-1 flex flex-col items-center gap-2">
                <div class="w-full rounded-t-lg gradient-brand" style="height:${h}%"></div>
                <span class="text-[10px] text-slate-400 font-bold">${['T2','T3','T4','T5','T6','T7','CN'][i]}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card !p-6">
          <h3 class="font-black text-lg mb-4">🏆 Bán chạy</h3>
          <div class="space-y-3">
            ${products.slice(0,4).map((p,i)=>`
              <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black">${i+1}</div>
                <img src="${p.img}" class="w-10 h-10 rounded-lg object-cover">
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-bold truncate">${p.name}</div>
                  <div class="text-[10px] text-slate-500">${p.sold} đã bán</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card !p-6 mt-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-black text-lg">📦 Đơn hàng gần đây</h3>
          <a href="#" onclick="window.__mm_setTab('orders')" class="text-xs font-bold text-indigo-600 no-underline">Xem tất cả →</a>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="text-xs uppercase text-slate-400 border-b border-slate-100"><th class="text-left py-3">Mã đơn</th><th class="text-left">Ngày</th><th class="text-left">Số SP</th><th class="text-right">Tổng</th><th class="text-right">Trạng thái</th></tr></thead>
            <tbody>
              ${orders.map(o => `<tr class="border-b border-slate-50">
                <td class="py-3 font-bold">${o.id}</td>
                <td class="text-slate-500">${o.date}</td>
                <td>${o.items}</td>
                <td class="text-right font-black text-red-500 krw">${formatKRW(o.total)}</td>
                <td class="text-right"><span class="px-2 py-1 rounded-full text-[10px] font-bold bg-${o.status==='done'?'green':o.status==='shipping'?'indigo':'red'}-100 text-${o.status==='done'?'green':o.status==='shipping'?'indigo':'red'}-700">${o.status}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `,

    products: () => `
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div class="flex gap-2 flex-1 min-w-[280px] max-w-md">
          <input class="field" placeholder="🔍 Tìm sản phẩm...">
          <select class="field w-44"><option>Tất cả danh mục</option>${categories.map(c=>`<option>${c.name}</option>`).join('')}</select>
        </div>
        <button class="btn btn-primary"><i class="fas fa-plus"></i> Thêm sản phẩm</button>
      </div>
      <div class="card !p-0 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 border-b border-slate-100">
              <tr class="text-xs uppercase text-slate-500"><th class="text-left p-4">Sản phẩm</th><th class="text-left">Danh mục</th><th class="text-right">Giá</th><th class="text-center">Đã bán</th><th class="text-center">Đánh giá</th><th class="text-right pr-4">Hành động</th></tr>
            </thead>
            <tbody>
              ${products.map(p => `
                <tr class="border-b border-slate-50 hover:bg-slate-50">
                  <td class="p-4 flex items-center gap-3"><img src="${p.img}" class="w-12 h-12 rounded-xl object-cover"><div class="font-bold">${p.name}</div></td>
                  <td>${(window.MM_UTILS.findCategory(p.cat)||{}).name||''}</td>
                  <td class="text-right font-black krw">${formatKRW(p.price)}</td>
                  <td class="text-center">${p.sold}</td>
                  <td class="text-center">${p.rating}★</td>
                  <td class="text-right pr-4"><button class="text-indigo-500 hover:text-indigo-700 mx-1"><i class="fas fa-edit"></i></button><button class="text-red-500 hover:text-red-700 mx-1"><i class="fas fa-trash"></i></button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `,

    orders: () => `
      <div class="grid md:grid-cols-4 gap-4 mb-4">
        ${stat('Chờ xử lý', '12', 'clock', 'amber', 'Cần xử lý gấp')}
        ${stat('Đang giao', '8',  'truck', 'indigo', 'Trên đường tới khách')}
        ${stat('Hoàn tất',  '142','check-circle', 'green', 'Trong tháng')}
        ${stat('Đã hủy',    '4',  'times-circle', 'red',  'Tỉ lệ 2.7%')}
      </div>
      <div class="card !p-0 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 border-b border-slate-100"><tr class="text-xs uppercase text-slate-500"><th class="p-4 text-left">Mã đơn</th><th class="text-left">Khách hàng</th><th class="text-left">Ngày</th><th class="text-center">SP</th><th class="text-right">Tổng</th><th class="text-center">Trạng thái</th><th class="text-right pr-4"></th></tr></thead>
            <tbody>
              ${orders.map(o=>`<tr class="border-b border-slate-50 hover:bg-slate-50">
                <td class="p-4 font-bold">${o.id}</td><td>${user.name}</td><td class="text-slate-500">${o.date}</td>
                <td class="text-center">${o.items}</td>
                <td class="text-right font-black text-red-500 krw">${formatKRW(o.total)}</td>
                <td class="text-center"><select class="field !py-1 text-xs"><option>${o.status}</option><option>pending</option><option>shipping</option><option>done</option></select></td>
                <td class="text-right pr-4"><button class="text-indigo-500 mx-1"><i class="fas fa-eye"></i></button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `,

    phones: () => `
      <div class="grid md:grid-cols-3 gap-4 mb-4">
        <div class="card !p-6 md:col-span-1">
          <h3 class="font-black mb-2">📅 Tháng đang áp dụng</h3>
          <div class="text-3xl font-black gradient-text mb-4">${priceBoard.month}</div>
          <label class="lbl">Ảnh bảng giá gốc tháng này</label>
          <div class="border-2 border-dashed border-slate-200 rounded-2xl p-3 cursor-pointer hover:border-indigo-400 transition">
            <img src="${priceBoard.image}" class="w-full rounded-xl mb-2">
            <p class="text-center text-xs text-slate-500"><i class="fas fa-upload"></i> Click để thay ảnh mới (mỗi tháng 1 lần)</p>
          </div>
          <button class="btn btn-primary w-full mt-3"><i class="fas fa-save"></i> Lưu ảnh</button>
        </div>
        <div class="md:col-span-2 card !p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-black">📱 Danh sách model & giá</h3>
            <button class="btn btn-primary text-xs"><i class="fas fa-plus"></i> Thêm model</button>
          </div>
          <div class="space-y-2">
            ${priceBoard.items.map(p => `
              <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                <span class="text-xl">${p.brand==='iPhone'?'🍎':'📱'}</span>
                <input class="field !py-2 text-sm flex-1" value="${p.model}">
                <input class="field !py-2 text-sm w-40" value="${p.config}">
                <input class="field !py-2 text-sm w-32 text-right" value="${p.price}">
                <select class="field !py-2 text-xs w-24"><option ${p.status==='in'?'selected':''}>Còn</option><option ${p.status==='low'?'selected':''}>Sắp hết</option><option>Hết</option></select>
                <button class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
              </div>
            `).join('')}
          </div>
          <button class="btn btn-primary w-full mt-4"><i class="fas fa-save"></i> Cập nhật bảng giá tháng ${priceBoard.month}</button>
        </div>
      </div>
    `,

    banners: () => `
      <div class="grid md:grid-cols-3 gap-4">
        <div class="card !p-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1627931303498-657cb212e693?w=600" class="w-full h-44 object-cover">
          <div class="p-4">
            <div class="font-bold mb-1">Quà tặng yêu thương</div>
            <div class="text-xs text-slate-500 mb-3">Hiển thị · Hero chính trang chủ</div>
            <div class="flex gap-2"><button class="btn btn-ghost flex-1 !py-2 text-xs"><i class="fas fa-edit"></i> Sửa</button><button class="btn btn-ghost flex-1 !py-2 text-xs text-red-500"><i class="fas fa-trash"></i></button></div>
          </div>
        </div>
        <div class="card border-2 border-dashed !border-slate-200 flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:border-indigo-400 transition">
          <i class="fas fa-plus text-4xl text-slate-300 mb-3"></i>
          <p class="font-bold text-slate-500">Thêm banner mới</p>
        </div>
      </div>
    `,

    customers: () => `
      <div class="card !p-0 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-50"><tr class="text-xs uppercase text-slate-500"><th class="p-4 text-left">Khách hàng</th><th class="text-left">SĐT</th><th class="text-center">Đơn hàng</th><th class="text-right">Tổng chi</th><th class="text-center">Hạng</th></tr></thead>
          <tbody>
            ${[1,2,3,4,5].map(i=>`<tr class="border-b border-slate-50">
              <td class="p-4 flex items-center gap-3"><img src="https://i.pravatar.cc/40?img=${i}" class="w-10 h-10 rounded-full"><div><div class="font-bold">Khách hàng ${i}</div><div class="text-xs text-slate-500">customer${i}@gmail.com</div></div></td>
              <td>010-${1000+i*111}-${2000+i*222}</td>
              <td class="text-center font-bold">${i*3}</td>
              <td class="text-right font-black text-red-500 krw">${formatKRW(i*240000)}</td>
              <td class="text-center"><span class="px-2 py-1 rounded-full text-[10px] font-bold bg-${i>3?'amber':'slate'}-100 text-${i>3?'amber':'slate'}-700">${i>3?'Vàng':'Bạc'}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `,

    settings: () => `
      <div class="grid md:grid-cols-2 gap-4">
        <div class="card !p-6">
          <h3 class="font-black mb-4">🏪 Thông tin cửa hàng</h3>
          <div class="space-y-3">
            <div><label class="lbl">Tên cửa hàng</label><input class="field" value="MultiMart KOREA"></div>
            <div><label class="lbl">Hotline</label><input class="field" value="010-XXXX-XXXX"></div>
            <div><label class="lbl">Địa chỉ</label><input class="field" value="Seoul, Dongdaemun-gu"></div>
            <div><label class="lbl">KakaoTalk ID</label><input class="field" value="@multimart"></div>
          </div>
        </div>
        <div class="card !p-6">
          <h3 class="font-black mb-4">💱 Tỉ giá & Tiền tệ</h3>
          <div class="space-y-3">
            <div><label class="lbl">Tỉ giá KRW → VND</label><input type="number" class="field" value="${window.MM_DATA.rate.krwToVnd}"></div>
            <div><label class="lbl">Đơn vị tiền hiển thị</label><select class="field"><option>KRW (₩)</option><option>USD ($)</option><option>VND (₫)</option></select></div>
            <div><label class="lbl">Phí ship mặc định (KRW)</label><input type="number" class="field" value="3000"></div>
          </div>
        </div>
      </div>
      <div class="text-right mt-4"><button class="btn btn-primary"><i class="fas fa-save"></i> Lưu cấu hình</button></div>
    `,
  };

  const setTab = (tab) => {
    document.querySelectorAll('.side-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tab));
    document.getElementById('page-title').textContent = TITLES[tab];
    document.getElementById('content').innerHTML = VIEWS[tab]();
  };
  window.__mm_setTab = setTab;
  document.querySelectorAll('.side-link').forEach(l => l.addEventListener('click', e => { e.preventDefault(); setTab(l.dataset.tab); }));
  setTab('dashboard');
});
