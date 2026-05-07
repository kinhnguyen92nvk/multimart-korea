/* Admin panel - all tabs rendered by JS */
document.addEventListener('DOMContentLoaded', () => {
  const { products, orders, priceBoard, categories, user } = window.MM_DATA;
  const { formatKRW, renderList } = window.MM_UTILS;

  const TITLES = {
    dashboard: 'Tổng quan',
    products:  'Quản lý sản phẩm',
    orders:    'Quản lý đơn hàng',
    phones:    'Bảng giá điện thoại tháng',
    bulk:      'Sửa giá hàng loạt',
    quickstart:'Hướng dẫn sử dụng',
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
        <button class="btn btn-primary" data-action="add-product"><i class="fas fa-plus"></i> Thêm sản phẩm</button>
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
                  <td class="text-right pr-4">
                    <button class="text-indigo-500 hover:text-indigo-700 mx-1" data-action="edit-product" data-pid="${p.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                    <button class="text-red-500 hover:text-red-700 mx-1" data-action="del-product" data-pid="${p.id}" title="Xoá"><i class="fas fa-trash"></i></button>
                  </td>
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

      <div class="card !p-6 mt-4">
        <h3 class="font-black mb-4">🔐 Bảo mật quản trị</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="lbl">Đổi mã quản trị</label>
            <div class="flex gap-2">
              <input id="new-pass" type="password" class="field" placeholder="Mã mới (6+ ký tự)">
              <button id="btn-change-pass" class="btn btn-primary"><i class="fas fa-key"></i> Đổi</button>
            </div>
            <p class="text-xs text-slate-400 mt-1">Mặc định: <code>MULTIMART2026</code> — đổi ngay!</p>
          </div>
          <div>
            <label class="lbl">Email Google được phép (cách nhau dấu phẩy)</label>
            <div class="flex gap-2">
              <input id="allow-emails" class="field" placeholder="me@gmail.com, partner@gmail.com">
              <button id="btn-save-emails" class="btn btn-primary"><i class="fas fa-save"></i></button>
            </div>
          </div>
          <div>
            <label class="lbl">Google OAuth Client ID</label>
            <div class="flex gap-2">
              <input id="google-cid" class="field" placeholder="xxxx.apps.googleusercontent.com">
              <button id="btn-save-cid" class="btn btn-primary"><i class="fas fa-save"></i></button>
            </div>
          </div>
        </div>
        <div id="sec-msg" class="text-sm mt-3"></div>
      </div>

      <div class="text-right mt-4"><button class="btn btn-primary"><i class="fas fa-save"></i> Lưu cấu hình chung</button></div>
    `,

    bulk: () => `
      <div class="card !p-6 mb-4">
        <h3 class="font-black text-lg mb-2">📊 Sửa giá hàng loạt</h3>
        <p class="text-sm text-slate-500 mb-4">Áp dụng % tăng/giảm cho mọi máy theo bộ lọc, xem trước trước khi lưu.</p>
        <div class="grid md:grid-cols-4 gap-3 mb-4">
          <div>
            <label class="lbl">Lọc thương hiệu</label>
            <select id="bulk-brand" class="field">
              <option value="">Tất cả</option>
              <option>iPhone</option><option>Samsung</option><option>Xiaomi</option>
            </select>
          </div>
          <div>
            <label class="lbl">Lọc theo từ khoá tên</label>
            <input id="bulk-q" class="field" placeholder="vd: 15 Pro Max">
          </div>
          <div>
            <label class="lbl">% thay đổi</label>
            <input id="bulk-pct" type="number" class="field" placeholder="-5 = giảm 5%, +10 = tăng 10%" value="-5">
          </div>
          <div>
            <label class="lbl">Áp dụng cột</label>
            <select id="bulk-col" class="field">
              <option value="both">Cả A và New</option>
              <option value="A">Chỉ A (đẹp keng)</option>
              <option value="N">Chỉ New (mới)</option>
            </select>
          </div>
        </div>
        <div class="flex gap-2">
          <button id="bulk-preview" class="btn btn-ghost"><i class="fas fa-eye"></i> Xem trước</button>
          <button id="bulk-apply" class="btn btn-primary"><i class="fas fa-check"></i> Áp dụng + tải file mới</button>
          <button id="bulk-reset" class="btn btn-ghost"><i class="fas fa-undo"></i> Reset</button>
        </div>
        <div id="bulk-summary" class="text-sm mt-3"></div>
      </div>

      <div class="card !p-0 overflow-hidden">
        <div class="overflow-x-auto" style="max-height:520px">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 sticky top-0">
              <tr class="text-xs uppercase text-slate-500"><th class="p-3 text-left">Model</th><th class="text-left">Cấu hình</th><th class="text-right">Giá A</th><th class="text-right">Giá New</th><th class="text-right">A mới</th><th class="text-right">New mới</th></tr>
            </thead>
            <tbody id="bulk-tbody"></tbody>
          </table>
        </div>
      </div>

      <div class="card !p-6 mt-4">
        <h4 class="font-black mb-2">📤 Đẩy giá mới lên web</h4>
        <p class="text-sm text-slate-500 mb-3">Sau khi áp dụng, file <code>products.js</code> mới sẽ được tải về. Mở <a href="admin-cms.html" class="text-green-600 font-bold no-underline">CMS AI</a> → tab Bảng giá → nút "Đẩy lên web (GitHub)" để publish.</p>
        <div class="flex gap-2">
          <a href="admin-cms.html" class="btn btn-primary no-underline"><i class="fas fa-rocket"></i> Mở CMS để publish</a>
          <a href="tools/price-entry.html" class="btn btn-ghost no-underline"><i class="fas fa-keyboard"></i> Nhập tay đầy đủ</a>
        </div>
      </div>
    `,

    quickstart: () => `
      <div class="card !p-6 mb-4">
        <h3 class="font-black text-xl mb-2">🚀 Bắt đầu nhanh</h3>
        <p class="text-sm text-slate-500">3 bước để bắt đầu vận hành website.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="card !p-5">
          <div class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-black text-xl mb-3">1</div>
          <div class="font-black mb-1">Đổi mã quản trị</div>
          <p class="text-sm text-slate-500 mb-3">Mã mặc định <code>MULTIMART2026</code> — đổi ngay sang mã của bạn ở tab Cấu hình.</p>
          <a href="#" onclick="window.__mm_setTab('settings');return false" class="btn btn-ghost text-xs no-underline"><i class="fas fa-arrow-right"></i> Tới Cấu hình</a>
        </div>
        <div class="card !p-5">
          <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xl mb-3">2</div>
          <div class="font-black mb-1">Cấp GitHub Token</div>
          <p class="text-sm text-slate-500 mb-3">Tạo Personal Access Token (Fine-grained, quyền Contents: Read & Write) để 1 click publish.</p>
          <a href="admin-cms.html" class="btn btn-ghost text-xs no-underline"><i class="fas fa-key"></i> Mở CMS</a>
        </div>
        <div class="card !p-5">
          <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl mb-3">3</div>
          <div class="font-black mb-1">Cấp Groq API Key</div>
          <p class="text-sm text-slate-500 mb-3">Miễn phí tại <a href="https://console.groq.com" target="_blank" class="text-green-600 font-bold">console.groq.com</a> — dùng để AI quét bảng giá ảnh & viết blog.</p>
          <a href="admin-cms.html" class="btn btn-ghost text-xs no-underline"><i class="fas fa-robot"></i> Mở CMS</a>
        </div>
      </div>

      <div class="card !p-6 mb-4">
        <h3 class="font-black text-lg mb-3">📚 Khu vực quản trị có gì?</h3>
        <div class="grid md:grid-cols-2 gap-3 text-sm">
          <div class="p-4 rounded-xl bg-slate-50">
            <div class="font-black text-slate-900 mb-1">📊 Tổng quan / Đơn hàng / Khách hàng</div>
            <p class="text-slate-600">Theo dõi doanh thu, đơn hàng, khách hàng (demo data).</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50">
            <div class="font-black text-slate-900 mb-1">📱 Bảng giá điện thoại</div>
            <p class="text-slate-600">Sửa từng dòng giá, đổi tháng áp dụng, thay ảnh bảng giá.</p>
          </div>
          <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div class="font-black text-amber-900 mb-1">📊 Sửa giá hàng loạt <span class="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded">MỚI</span></div>
            <p class="text-amber-800">Áp dụng % tăng/giảm cho mọi máy theo bộ lọc — chỉ vài giây cập nhật cả 167 dòng.</p>
          </div>
          <div class="p-4 rounded-xl bg-green-50 border border-green-200">
            <div class="font-black text-green-900 mb-1">🤖 CMS AI</div>
            <p class="text-green-800">AI quét ảnh bảng giá → JSON → 1 click publish lên GitHub Pages. Còn có viết blog SEO tự động.</p>
          </div>
        </div>
      </div>

      <div class="card !p-6 mb-4">
        <h3 class="font-black text-lg mb-3">🛠️ Công cụ nhanh (1 click)</h3>
        <div class="grid md:grid-cols-2 gap-3">
          <a href="tools/price-entry.html" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 no-underline flex items-start gap-3">
            <i class="fas fa-keyboard text-2xl text-indigo-500 mt-1"></i>
            <div><div class="font-black text-slate-900">Nhập tay bảng giá điện thoại</div><div class="text-xs text-slate-500">100% chính xác, xuất Excel + JSON</div></div>
          </a>
          <a href="tools/price-scan.html" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 no-underline flex items-start gap-3">
            <i class="fas fa-camera text-2xl text-green-500 mt-1"></i>
            <div><div class="font-black text-slate-900">AI quét ảnh bảng giá</div><div class="text-xs text-slate-500">Chụp/upload ảnh → auto trích xuất</div></div>
          </a>
          <a href="tools/sim-entry.html" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 no-underline flex items-start gap-3">
            <i class="fas fa-sim-card text-2xl text-amber-500 mt-1"></i>
            <div><div class="font-black text-slate-900">Nhập tay gói SIM</div><div class="text-xs text-slate-500">Cập nhật cước SIM Hàn theo tháng</div></div>
          </a>
          <a href="tools/sim-scan.html" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 no-underline flex items-start gap-3">
            <i class="fas fa-magic text-2xl text-purple-500 mt-1"></i>
            <div><div class="font-black text-slate-900">AI quét bảng cước SIM</div><div class="text-xs text-slate-500">1 click → bảng cước mới</div></div>
          </a>
        </div>
      </div>

      <div class="card !p-6">
        <h3 class="font-black text-lg mb-3">🌐 Mua tên miền & deploy</h3>
        <ol class="list-decimal pl-5 text-sm space-y-2 text-slate-700">
          <li>Mua domain tại <a href="https://www.namecheap.com" target="_blank" class="text-green-600 font-bold">Namecheap</a> / <a href="https://domains.google" target="_blank" class="text-green-600 font-bold">Google Domains</a> / <a href="https://www.cloudflare.com/products/registrar/" target="_blank" class="text-green-600 font-bold">Cloudflare</a> (Cloudflare rẻ nhất, ~10$/năm).</li>
          <li>Trên GitHub repo → Settings → Pages → Custom domain → nhập <code>yourdomain.com</code>.</li>
          <li>Trên trang quản trị domain → thêm DNS record:
            <ul class="list-disc pl-5 mt-1 text-xs">
              <li>4 bản ghi A trỏ về 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153</li>
              <li>Hoặc 1 bản ghi CNAME <code>www</code> → <code>username.github.io</code></li>
            </ul>
          </li>
          <li>Đợi 5-30 phút cho DNS propagate → tick "Enforce HTTPS" trên GitHub Pages.</li>
          <li>Xong! Truy cập <code>https://yourdomain.com/admin.html</code> để quản trị.</li>
        </ol>
      </div>
    `,

    /* keep settings entry below for backward — but we already redefined it above */
    _settings_old: () => '',
  };

  const setTab = (tab) => {
    document.querySelectorAll('.side-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tab));
    document.getElementById('page-title').textContent = TITLES[tab];
    document.getElementById('content').innerHTML = VIEWS[tab]();
    if (tab === 'bulk') wireBulk();
    if (tab === 'settings') wireSettings();
    if (tab === 'products') wireProducts();
  };
  window.__mm_setTab = setTab;
  document.querySelectorAll('.side-link').forEach(l => l.addEventListener('click', e => { e.preventDefault(); setTab(l.dataset.tab); }));

  /* ============ Avatar/logout ============ */
  if (window.MM_AUTH) {
    const s = window.MM_AUTH.getSession();
    if (s) {
      const nameEl = document.getElementById('admin-name');
      const emailEl = document.getElementById('admin-email');
      const avEl = document.getElementById('admin-avatar');
      if (nameEl) nameEl.textContent = s.name || 'Admin';
      if (emailEl) emailEl.textContent = s.email || (s.method==='passcode'?'Đăng nhập bằng mã':'Quản trị viên');
      if (avEl && s.picture) avEl.src = s.picture;
    }
    const lo = document.getElementById('admin-logout');
    if (lo) lo.addEventListener('click', () => { if (confirm('Đăng xuất?')) window.MM_AUTH.signOut(); });
  }

  /* ============ Bulk price update ============ */
  let _bulkPreview = null;
  function wireBulk(){
    const tbody = document.getElementById('bulk-tbody');
    const summary = document.getElementById('bulk-summary');
    const phones = (window.MM_DATA.priceBoard && window.MM_DATA.priceBoard.phones) || [];

    function applyFilter(){
      const brand = document.getElementById('bulk-brand').value;
      const q = document.getElementById('bulk-q').value.trim().toLowerCase();
      return phones.filter(p =>
        (!brand || (p.brand||'').toLowerCase()===brand.toLowerCase()) &&
        (!q || (p.model||'').toLowerCase().includes(q))
      );
    }

    function preview(){
      const list = applyFilter();
      const pct = parseFloat(document.getElementById('bulk-pct').value || '0');
      const col = document.getElementById('bulk-col').value;
      _bulkPreview = list.map(p => {
        const newA = (col!=='N' && p.priceA)   ? Math.round(p.priceA * (1 + pct/100)) : p.priceA;
        const newN = (col!=='A' && p.priceNew) ? Math.round(p.priceNew * (1 + pct/100)) : p.priceNew;
        return { ref:p, newA, newN };
      });
      tbody.innerHTML = _bulkPreview.slice(0,500).map(r => `
        <tr class="border-b border-slate-50">
          <td class="p-2 font-bold">${r.ref.model||''}</td>
          <td class="text-xs text-slate-500">${r.ref.config||''}</td>
          <td class="text-right">${r.ref.priceA?formatKRW(r.ref.priceA):'-'}</td>
          <td class="text-right">${r.ref.priceNew?formatKRW(r.ref.priceNew):'-'}</td>
          <td class="text-right text-green-600 font-bold">${r.newA?formatKRW(r.newA):'-'}</td>
          <td class="text-right text-green-600 font-bold">${r.newN?formatKRW(r.newN):'-'}</td>
        </tr>
      `).join('');
      summary.innerHTML = `<i class="fas fa-info-circle text-blue-500"></i> Sẽ cập nhật <b>${list.length}</b> dòng với ${pct>0?'+':''}${pct}%. ${list.length>500?'(Hiển thị 500 dòng đầu)':''}`;
    }

    function apply(){
      if (!_bulkPreview) preview();
      _bulkPreview.forEach(r => {
        if (r.newA !== r.ref.priceA) r.ref.priceA = r.newA;
        if (r.newN !== r.ref.priceNew) r.ref.priceNew = r.newN;
      });
      summary.innerHTML = `<i class="fas fa-check-circle text-green-500"></i> Đã áp dụng vào <b>${_bulkPreview.length}</b> dòng. Mở CMS → Bảng giá → "Đẩy lên web (GitHub)" để publish.`;
      preview();
      /* Tải file products.js mới về để admin có thể commit thủ công nếu cần */
      try {
        const blob = new Blob([
          `/* Updated by Bulk Price Tool ${new Date().toISOString()} */\n`,
          `window.MM_PRICE_PATCH = ${JSON.stringify(window.MM_DATA.priceBoard.phones, null, 2)};`,
        ], { type:'text/javascript' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `price-patch-${Date.now()}.js`;
        a.click();
      } catch(e){}
    }

    function reset(){
      document.getElementById('bulk-pct').value = '-5';
      document.getElementById('bulk-q').value = '';
      document.getElementById('bulk-brand').value = '';
      preview();
    }

    document.getElementById('bulk-preview').addEventListener('click', preview);
    document.getElementById('bulk-apply').addEventListener('click', apply);
    document.getElementById('bulk-reset').addEventListener('click', reset);
    preview();
  }

  /* ============ Settings handlers ============ */
  function wireSettings(){
    if (!window.MM_AUTH) return;
    const cfg = window.MM_AUTH.getConfig();
    const ae = document.getElementById('allow-emails');
    const cid = document.getElementById('google-cid');
    if (ae) ae.value = (cfg.allowedEmails||[]).join(', ');
    if (cid) cid.value = cfg.googleClientId || '';

    const msg = (text, ok=false) => {
      const m = document.getElementById('sec-msg');
      if (m){ m.textContent = text; m.className = 'text-sm mt-3 font-bold ' + (ok?'text-green-600':'text-red-600'); }
    };

    const cp = document.getElementById('btn-change-pass');
    if (cp) cp.addEventListener('click', () => {
      const np = document.getElementById('new-pass').value.trim();
      if (np.length < 6) return msg('Mã mới phải ít nhất 6 ký tự');
      const c = window.MM_AUTH.getConfig();
      c.passcode = np;
      window.MM_AUTH.saveConfig(c);
      document.getElementById('new-pass').value='';
      msg('Đã đổi mã quản trị thành công.', true);
    });
    const se = document.getElementById('btn-save-emails');
    if (se) se.addEventListener('click', () => {
      const c = window.MM_AUTH.getConfig();
      c.allowedEmails = ae.value.split(',').map(s=>s.trim()).filter(Boolean);
      window.MM_AUTH.saveConfig(c);
      msg('Đã lưu danh sách email cho phép.', true);
    });
    const sc = document.getElementById('btn-save-cid');
    if (sc) sc.addEventListener('click', () => {
      const c = window.MM_AUTH.getConfig();
      c.googleClientId = cid.value.trim();
      window.MM_AUTH.saveConfig(c);
      msg('Đã lưu Google Client ID.', true);
    });
  }

  setTab('dashboard');

  /* ============ Escape HTML helper ============ */
  function escHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  /* ============ Products tab wiring ============ */
  function wireProducts(){
    const content = document.getElementById('content');
    content.addEventListener('click', e => {
      const addBtn  = e.target.closest('[data-action="add-product"]');
      const editBtn = e.target.closest('[data-action="edit-product"]');
      const delBtn  = e.target.closest('[data-action="del-product"]');
      if (addBtn) {
        const blank = { id:'p'+Date.now(), name:'', cat:'phone', price:0, oldPrice:null, sold:0, rating:5.0, tag:'', img:'', imgs:[], desc:'', specs:[] };
        products.push(blank);
        openProductModal(blank, true);
      }
      if (editBtn) {
        const prod = products.find(p => p.id === editBtn.dataset.pid);
        if (prod) openProductModal(prod, false);
      }
      if (delBtn) {
        if (confirm('Xoá sản phẩm này?')) {
          const idx = products.findIndex(p => p.id === delBtn.dataset.pid);
          if (idx !== -1) products.splice(idx, 1);
          setTab('products');
        }
      }
    });
  }

  /* ============ Product edit modal ============ */
  function openProductModal(prod, isNew){
    let modal = document.getElementById('mm-product-modal');
    if (!modal) { modal = document.createElement('div'); modal.id = 'mm-product-modal'; document.body.appendChild(modal); }

    const catOptions = categories.map(c =>
      `<option value="${c.id}" ${c.id===prod.cat?'selected':''}>${c.name}</option>`
    ).join('');

    const imgSrc = (typeof prod.img==='string' && prod.img && !prod.img.startsWith('data:image/svg')) ? prod.img : '';
    const imgPreviewSrc = prod.img || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    const specsHtml = (prod.specs||[]).map(row => `
      <div class="flex gap-2 mb-1 spec-row">
        <input class="field !py-1 text-xs w-36" value="${escHtml(row[0])}" placeholder="Tên">
        <input class="field !py-1 text-xs flex-1" value="${escHtml(row[1])}" placeholder="Giá trị">
        <button type="button" class="text-red-400 hover:text-red-600 w-7 text-center" data-del-spec>✕</button>
      </div>`).join('');

    modal.innerHTML = `
      <div class="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4" id="mm-prod-overlay">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <h2 class="font-black text-xl">${isNew?'➕ Thêm sản phẩm mới':'✏️ Sửa sản phẩm'}</h2>
            <button id="mm-modal-close" class="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-2xl leading-none">×</button>
          </div>
          <div class="overflow-y-auto p-6 space-y-4 flex-1">

            <!-- Ảnh -->
            <div>
              <label class="lbl">Ảnh sản phẩm</label>
              <div class="flex gap-3 items-start">
                <img id="mm-img-preview" src="${imgPreviewSrc}" class="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0" onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><rect fill=\'%23e2e8f0\' width=\'100\' height=\'100\'/><text y=\'.9em\' font-size=\'70\' x=\'15\'>📷</text></svg>'">
                <div class="flex-1 min-w-0">
                  <input id="mm-img-url" class="field text-sm mb-2" placeholder="Dán URL ảnh mới (https://...)" value="${escHtml(imgSrc)}">
                  <label class="btn btn-ghost text-xs cursor-pointer inline-flex items-center gap-1">
                    <i class="fas fa-upload"></i> Upload từ máy tính
                    <input type="file" id="mm-img-file" accept="image/*" class="hidden">
                  </label>
                  <p class="text-xs text-slate-400 mt-1">URL hoặc upload ảnh. Upload sẽ lưu dạng base64 trong trình duyệt — dùng CMS để publish ảnh thật lên web.</p>
                </div>
              </div>
            </div>

            <!-- Basic fields -->
            <div class="grid grid-cols-2 gap-3">
              <div class="col-span-2">
                <label class="lbl">Tên sản phẩm</label>
                <input id="mm-f-name" class="field" value="${escHtml(prod.name)}">
              </div>
              <div>
                <label class="lbl">Danh mục</label>
                <select id="mm-f-cat" class="field">${catOptions}</select>
              </div>
              <div>
                <label class="lbl">Tag (Hàng A / Hàng New...)</label>
                <input id="mm-f-tag" class="field" value="${escHtml(prod.tag||'')}">
              </div>
              <div>
                <label class="lbl">Giá bán (KRW ₩)</label>
                <input id="mm-f-price" type="number" class="field" value="${prod.price||''}">
              </div>
              <div>
                <label class="lbl">Giá cũ (để trống nếu không)</label>
                <input id="mm-f-oldprice" type="number" class="field" value="${prod.oldPrice||''}">
              </div>
              <div>
                <label class="lbl">Đã bán</label>
                <input id="mm-f-sold" type="number" class="field" value="${prod.sold||0}">
              </div>
              <div>
                <label class="lbl">Đánh giá (0–5)</label>
                <input id="mm-f-rating" type="number" step="0.1" min="0" max="5" class="field" value="${prod.rating||5}">
              </div>
            </div>

            <!-- Mô tả -->
            <div>
              <label class="lbl">Mô tả sản phẩm</label>
              <textarea id="mm-f-desc" class="field text-sm" rows="3">${escHtml(prod.desc||'')}</textarea>
            </div>

            <!-- Thông số -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="lbl !mb-0">Thông số kỹ thuật</label>
                <button type="button" id="mm-add-spec" class="text-xs text-indigo-600 font-bold hover:text-indigo-800"><i class="fas fa-plus"></i> Thêm dòng</button>
              </div>
              <div id="mm-specs-list">${specsHtml}</div>
              <p class="text-xs text-slate-400 mt-1">Dòng trống sẽ bị bỏ qua khi lưu.</p>
            </div>

          </div>
          <div class="flex gap-3 px-6 py-4 border-t border-slate-100 shrink-0">
            <button id="mm-prod-save" class="btn btn-primary flex-1"><i class="fas fa-save"></i> Lưu thay đổi</button>
            <button id="mm-modal-cancel" class="btn btn-ghost flex-1">Huỷ</button>
          </div>
        </div>
      </div>`;

    const close = () => { modal.innerHTML = ''; };
    document.getElementById('mm-modal-close').addEventListener('click', close);
    document.getElementById('mm-modal-cancel').addEventListener('click', close);
    document.getElementById('mm-prod-overlay').addEventListener('click', e => { if(e.target===e.currentTarget) close(); });

    // Image URL live preview
    document.getElementById('mm-img-url').addEventListener('input', e => {
      const url = e.target.value.trim();
      if (url) document.getElementById('mm-img-preview').src = url;
    });

    // File upload → base64
    document.getElementById('mm-img-file').addEventListener('change', e => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        document.getElementById('mm-img-preview').src = ev.target.result;
        document.getElementById('mm-img-url').value = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    // Delete spec row
    document.getElementById('mm-specs-list').addEventListener('click', e => {
      if (e.target.closest('[data-del-spec]')) e.target.closest('.spec-row').remove();
    });

    // Add spec row
    document.getElementById('mm-add-spec').addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = 'flex gap-2 mb-1 spec-row';
      row.innerHTML = '<input class="field !py-1 text-xs w-36" placeholder="Tên"><input class="field !py-1 text-xs flex-1" placeholder="Giá trị"><button type="button" class="text-red-400 hover:text-red-600 w-7 text-center" data-del-spec>✕</button>';
      document.getElementById('mm-specs-list').appendChild(row);
    });

    // Save
    document.getElementById('mm-prod-save').addEventListener('click', () => {
      const specRows = document.querySelectorAll('#mm-specs-list .spec-row');
      const newSpecs = Array.from(specRows).map(row => {
        const ins = row.querySelectorAll('input');
        return [ins[0].value.trim(), ins[1].value.trim()];
      }).filter(s => s[0] || s[1]);

      const imgVal = document.getElementById('mm-img-url').value.trim() || document.getElementById('mm-img-preview').src;

      prod.name     = document.getElementById('mm-f-name').value.trim();
      prod.cat      = document.getElementById('mm-f-cat').value;
      prod.tag      = document.getElementById('mm-f-tag').value.trim();
      prod.price    = parseInt(document.getElementById('mm-f-price').value)    || 0;
      prod.oldPrice = parseInt(document.getElementById('mm-f-oldprice').value) || null;
      prod.sold     = parseInt(document.getElementById('mm-f-sold').value)     || 0;
      prod.rating   = parseFloat(document.getElementById('mm-f-rating').value) || 5;
      prod.desc     = document.getElementById('mm-f-desc').value.trim();
      prod.specs    = newSpecs;
      if (imgVal && !imgVal.includes('data:image/gif')) { prod.img = imgVal; prod.imgs = [imgVal]; }

      close();
      setTab('products');

      const toast = document.createElement('div');
      toast.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl font-bold z-50 text-sm animate-bounce';
      toast.innerHTML = '✅ Đã lưu thay đổi.<br><span class="font-normal text-xs">Dùng CMS → Publish để cập nhật lên web.</span>';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    });
  }
});
