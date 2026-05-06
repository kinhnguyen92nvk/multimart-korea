/* =================================================================
   PHONES CATALOG — Cấu hình & ảnh chi tiết cho từng model
   Dùng cho trang phone-spec.html?model=<slug>
   - searchTerm: dùng để fetch ảnh thật từ Wikipedia API
   - specs: thông số kỹ thuật chính
   ================================================================= */
window.MM_CATALOG = {
  /* ========== iPHONE ========== */
  'iphone-17-pro-max': {
    name: 'iPhone 17 Pro Max', brand: 'iPhone', year: 2025,
    searchTerm: 'iPhone 17 Pro Max',
    chip: 'Apple A19 Pro (3nm, 6-core CPU, 6-core GPU)',
    ram: '12 GB', displayInch: 6.9, displayRes: '2868 × 1320 OLED LTPO ProMotion 120Hz',
    mainCam: '48MP Fusion + 48MP Ultra-wide + 48MP Tele 8x',
    battery: '4823 mAh, sạc 40W có dây / 25W MagSafe',
    weight: '233 g', os: 'iOS 26',
    colors: ['Đen Vũ Trụ', 'Trắng Sa Mạc', 'Xanh Mây', 'Cam Hoàng Hôn'],
    desc: 'Flagship cao cấp nhất 2025 của Apple với khung Titanium 5 lớp, camera Tele zoom 8x quang học, vapor chamber tản nhiệt. Tối ưu cho game thủ và content creator chuyên nghiệp.'
  },
  'iphone-17-pro': {
    name: 'iPhone 17 Pro', brand: 'iPhone', year: 2025, searchTerm: 'iPhone 17 Pro',
    chip: 'Apple A19 Pro', ram: '12 GB',
    displayInch: 6.3, displayRes: '2622 × 1206 OLED ProMotion 120Hz',
    mainCam: '48MP + 48MP UW + 48MP Tele 8x',
    battery: '3988 mAh, 35W có dây', weight: '199 g', os: 'iOS 26',
    colors: ['Đen', 'Trắng', 'Xanh', 'Cam'],
    desc: 'Phiên bản Pro nhỏ gọn 6.3", giữ lại toàn bộ tính năng chuyên nghiệp của Pro Max nhưng dễ cầm hơn.'
  },
  'iphone-17-air': {
    name: 'iPhone 17 Air', brand: 'iPhone', year: 2025, searchTerm: 'iPhone 17 Air',
    chip: 'Apple A19', ram: '8 GB',
    displayInch: 6.6, displayRes: '2740 × 1260 OLED ProMotion',
    mainCam: '48MP Fusion (đơn camera, không có UW/Tele)',
    battery: '2800 mAh, 20W', weight: '145 g (mỏng nhất 5.5mm)', os: 'iOS 26',
    colors: ['Trắng Bạc', 'Đen Titan', 'Vàng Champagne', 'Xanh Dương Pastel'],
    desc: 'Mẫu iPhone mỏng & nhẹ nhất từng có (5.5mm), thay thế dòng Plus. Hi sinh camera tele để lấy thiết kế.'
  },
  'iphone-17': {
    name: 'iPhone 17', brand: 'iPhone', year: 2025, searchTerm: 'iPhone 17',
    chip: 'Apple A19', ram: '8 GB',
    displayInch: 6.3, displayRes: '2556 × 1179 OLED ProMotion 120Hz',
    mainCam: '48MP Main + 12MP UW',
    battery: '3692 mAh, 25W', weight: '170 g', os: 'iOS 26',
    colors: ['Đen', 'Trắng', 'Xanh Lá', 'Tím Mộng Mơ', 'Hồng'],
    desc: 'Bản tiêu chuẩn 2025, lần đầu có ProMotion 120Hz và Always-On Display.'
  },
  'iphone-16-pro-max': {
    name: 'iPhone 16 Pro Max', brand: 'iPhone', year: 2024, searchTerm: 'iPhone 16 Pro Max',
    chip: 'Apple A18 Pro (3nm, 6-core CPU, 6-core GPU)', ram: '8 GB',
    displayInch: 6.9, displayRes: '2868 × 1320 OLED LTPO 120Hz',
    mainCam: '48MP Fusion + 48MP UW + 12MP Tele 5x',
    battery: '4685 mAh, 27W', weight: '227 g', os: 'iOS 18',
    colors: ['Titan Đen', 'Titan Trắng', 'Titan Sa Mạc', 'Titan Tự Nhiên'],
    desc: 'Flagship 2024 với nút Camera Control mới, Apple Intelligence, khung Titanium nhám.'
  },
  'iphone-16-pro': {
    name: 'iPhone 16 Pro', brand: 'iPhone', year: 2024, searchTerm: 'iPhone 16 Pro',
    chip: 'Apple A18 Pro', ram: '8 GB',
    displayInch: 6.3, displayRes: '2622 × 1206 OLED LTPO 120Hz',
    mainCam: '48MP + 48MP UW + 12MP Tele 5x', battery: '3582 mAh, 27W',
    weight: '199 g', os: 'iOS 18',
    colors: ['Titan Đen', 'Titan Trắng', 'Titan Sa Mạc', 'Titan Tự Nhiên'],
    desc: 'Pro nhỏ gọn 2024, lần đầu có camera tele 5x giống bản Max.'
  },
  'iphone-16-plus': {
    name: 'iPhone 16 Plus', brand: 'iPhone', year: 2024, searchTerm: 'iPhone 16 Plus',
    chip: 'Apple A18', ram: '8 GB',
    displayInch: 6.7, displayRes: '2796 × 1290 OLED 60Hz',
    mainCam: '48MP + 12MP UW', battery: '4674 mAh, 25W', weight: '199 g', os: 'iOS 18',
    colors: ['Đen', 'Trắng', 'Hồng', 'Xanh Mòng Két', 'Xanh Ultramarine'],
    desc: 'Bản pin trâu màn hình lớn 6.7", hỗ trợ Apple Intelligence.'
  },
  'iphone-16': {
    name: 'iPhone 16', brand: 'iPhone', year: 2024, searchTerm: 'iPhone 16',
    chip: 'Apple A18', ram: '8 GB',
    displayInch: 6.1, displayRes: '2556 × 1179 OLED 60Hz',
    mainCam: '48MP + 12MP UW', battery: '3561 mAh, 20W', weight: '170 g', os: 'iOS 18',
    colors: ['Đen', 'Trắng', 'Hồng', 'Xanh Mòng Két', 'Xanh Ultramarine'],
    desc: 'Bản tiêu chuẩn 2024, có nút Action và Camera Control.'
  },
  'iphone-15-pro-max': {
    name: 'iPhone 15 Pro Max', brand: 'iPhone', year: 2023, searchTerm: 'iPhone 15 Pro Max',
    chip: 'Apple A17 Pro (3nm)', ram: '8 GB',
    displayInch: 6.7, displayRes: '2796 × 1290 OLED LTPO 120Hz',
    mainCam: '48MP + 12MP UW + 12MP Tele 5x periscope',
    battery: '4422 mAh, 27W', weight: '221 g', os: 'iOS 17',
    colors: ['Titan Đen', 'Titan Trắng', 'Titan Xanh', 'Titan Tự Nhiên'],
    desc: 'Flagship đầu tiên dùng cổng USB-C, khung Titanium siêu nhẹ.'
  },
  'iphone-15-pro': {
    name: 'iPhone 15 Pro', brand: 'iPhone', year: 2023, searchTerm: 'iPhone 15 Pro',
    chip: 'Apple A17 Pro', ram: '8 GB',
    displayInch: 6.1, displayRes: '2556 × 1179 OLED LTPO 120Hz',
    mainCam: '48MP + 12MP UW + 12MP Tele 3x', battery: '3274 mAh, 23W',
    weight: '187 g', os: 'iOS 17',
    colors: ['Titan Đen', 'Titan Trắng', 'Titan Xanh', 'Titan Tự Nhiên'],
    desc: 'Pro 2023 6.1", USB-C, A17 Pro 3nm, hỗ trợ ray-tracing.'
  },
  'iphone-15-plus': {
    name: 'iPhone 15 Plus', brand: 'iPhone', year: 2023, searchTerm: 'iPhone 15 Plus',
    chip: 'Apple A16 Bionic', ram: '6 GB',
    displayInch: 6.7, displayRes: '2796 × 1290 OLED 60Hz, Dynamic Island',
    mainCam: '48MP + 12MP UW', battery: '4383 mAh, 20W', weight: '201 g', os: 'iOS 17',
    colors: ['Đen', 'Trắng', 'Hồng', 'Vàng', 'Xanh'],
    desc: 'Plus pin trâu, lần đầu có Dynamic Island ở dòng tiêu chuẩn.'
  },
  'iphone-15': {
    name: 'iPhone 15', brand: 'iPhone', year: 2023, searchTerm: 'iPhone 15',
    chip: 'Apple A16 Bionic', ram: '6 GB',
    displayInch: 6.1, displayRes: '2556 × 1179 OLED 60Hz',
    mainCam: '48MP + 12MP UW', battery: '3349 mAh, 20W', weight: '171 g', os: 'iOS 17',
    colors: ['Đen', 'Trắng', 'Hồng', 'Vàng', 'Xanh'],
    desc: 'Tiêu chuẩn 2023, USB-C, Dynamic Island, kế nhiệm A16.'
  },
  'iphone-14-pro-max': {
    name: 'iPhone 14 Pro Max', brand: 'iPhone', year: 2022, searchTerm: 'iPhone 14 Pro Max',
    chip: 'Apple A16 Bionic (4nm)', ram: '6 GB',
    displayInch: 6.7, displayRes: '2796 × 1290 OLED LTPO 120Hz, Always-on',
    mainCam: '48MP + 12MP UW + 12MP Tele 3x', battery: '4323 mAh, 27W',
    weight: '240 g', os: 'iOS 16',
    colors: ['Tím Sâu', 'Đen Không Gian', 'Bạc', 'Vàng'],
    desc: 'Lần đầu có Dynamic Island, camera 48MP, Always-on Display.'
  },
  'iphone-14-pro': {
    name: 'iPhone 14 Pro', brand: 'iPhone', year: 2022, searchTerm: 'iPhone 14 Pro',
    chip: 'Apple A16 Bionic', ram: '6 GB',
    displayInch: 6.1, displayRes: '2556 × 1179 OLED LTPO 120Hz',
    mainCam: '48MP + 12MP UW + 12MP Tele 3x', battery: '3200 mAh, 23W',
    weight: '206 g', os: 'iOS 16',
    colors: ['Tím Sâu', 'Đen Không Gian', 'Bạc', 'Vàng'],
    desc: 'Pro nhỏ gọn 6.1" với Dynamic Island và camera 48MP.'
  },
  'iphone-14-plus': {
    name: 'iPhone 14 Plus', brand: 'iPhone', year: 2022, searchTerm: 'iPhone 14 Plus',
    chip: 'Apple A15 Bionic', ram: '6 GB',
    displayInch: 6.7, displayRes: '2778 × 1284 OLED 60Hz',
    mainCam: '12MP + 12MP UW', battery: '4325 mAh, 20W', weight: '203 g', os: 'iOS 16',
    colors: ['Đen', 'Trắng', 'Đỏ', 'Tím', 'Xanh', 'Vàng'],
    desc: 'Phablet pin trâu nhất dòng iPhone non-Pro.'
  },
  'iphone-14': {
    name: 'iPhone 14', brand: 'iPhone', year: 2022, searchTerm: 'iPhone 14',
    chip: 'Apple A15 Bionic', ram: '6 GB',
    displayInch: 6.1, displayRes: '2532 × 1170 OLED 60Hz',
    mainCam: '12MP + 12MP UW', battery: '3279 mAh, 20W', weight: '172 g', os: 'iOS 16',
    colors: ['Đen', 'Trắng', 'Đỏ', 'Tím', 'Xanh', 'Vàng'],
    desc: 'Tiêu chuẩn 2022, Crash Detection, Emergency SOS qua vệ tinh.'
  },
  'iphone-13-pro-max': {
    name: 'iPhone 13 Pro Max', brand: 'iPhone', year: 2021, searchTerm: 'iPhone 13 Pro Max',
    chip: 'Apple A15 Bionic', ram: '6 GB',
    displayInch: 6.7, displayRes: '2778 × 1284 OLED ProMotion 120Hz',
    mainCam: '12MP + 12MP UW + 12MP Tele 3x', battery: '4352 mAh, 27W',
    weight: '238 g', os: 'iOS 15',
    colors: ['Bạc', 'Vàng', 'Xanh Sierra', 'Xám Graphite', 'Xanh Alpine'],
    desc: 'Pro Max 2021, lần đầu có ProMotion 120Hz trên iPhone.'
  },
  'iphone-13-pro': {
    name: 'iPhone 13 Pro', brand: 'iPhone', year: 2021, searchTerm: 'iPhone 13 Pro',
    chip: 'Apple A15 Bionic', ram: '6 GB',
    displayInch: 6.1, displayRes: '2532 × 1170 OLED 120Hz',
    mainCam: '12MP×3', battery: '3095 mAh, 20W', weight: '203 g', os: 'iOS 15',
    colors: ['Bạc', 'Vàng', 'Xanh Sierra', 'Xám Graphite', 'Xanh Alpine'],
    desc: 'Pro 6.1" 2021, ProMotion + camera macro.'
  },
  'iphone-13': {
    name: 'iPhone 13', brand: 'iPhone', year: 2021, searchTerm: 'iPhone 13',
    chip: 'Apple A15 Bionic', ram: '4 GB',
    displayInch: 6.1, displayRes: '2532 × 1170 OLED 60Hz',
    mainCam: '12MP + 12MP UW', battery: '3240 mAh, 20W', weight: '174 g', os: 'iOS 15',
    colors: ['Hồng', 'Xanh Lá', 'Trắng', 'Đen', 'Xanh', 'Đỏ'],
    desc: 'Tiêu chuẩn 2021, pin trâu hơn 13 Pro nhờ chip tối ưu.'
  },
  'iphone-13-mini': {
    name: 'iPhone 13 Mini', brand: 'iPhone', year: 2021, searchTerm: 'iPhone 13 mini',
    chip: 'Apple A15 Bionic', ram: '4 GB',
    displayInch: 5.4, displayRes: '2340 × 1080 OLED', mainCam: '12MP + 12MP UW',
    battery: '2406 mAh, 20W', weight: '141 g', os: 'iOS 15',
    colors: ['Hồng', 'Xanh', 'Đen', 'Trắng', 'Đỏ'],
    desc: 'iPhone Mini cuối cùng, nhỏ gọn 5.4".'
  },
  'iphone-12-pro-max': {
    name: 'iPhone 12 Pro Max', brand: 'iPhone', year: 2020, searchTerm: 'iPhone 12 Pro Max',
    chip: 'Apple A14 Bionic', ram: '6 GB',
    displayInch: 6.7, displayRes: '2778 × 1284 OLED 60Hz',
    mainCam: '12MP + 12MP UW + 12MP Tele 2.5x + LiDAR', battery: '3687 mAh, 20W',
    weight: '226 g', os: 'iOS 14',
    colors: ['Bạc', 'Vàng', 'Xanh Pacific', 'Xám Graphite'],
    desc: 'Pro Max 2020 với cảm biến LiDAR cho AR.'
  },
  'iphone-12-pro': {
    name: 'iPhone 12 Pro', brand: 'iPhone', year: 2020, searchTerm: 'iPhone 12 Pro',
    chip: 'Apple A14 Bionic', ram: '6 GB',
    displayInch: 6.1, displayRes: '2532 × 1170 OLED', mainCam: '12MP×3 + LiDAR',
    battery: '2815 mAh, 20W', weight: '189 g', os: 'iOS 14',
    colors: ['Bạc', 'Vàng', 'Xanh Pacific', 'Graphite'],
    desc: 'Pro 6.1" 5G, MagSafe, khung thép không gỉ.'
  },
  'iphone-12': {
    name: 'iPhone 12', brand: 'iPhone', year: 2020, searchTerm: 'iPhone 12',
    chip: 'Apple A14 Bionic', ram: '4 GB',
    displayInch: 6.1, displayRes: '2532 × 1170 OLED', mainCam: '12MP + 12MP UW',
    battery: '2815 mAh, 20W', weight: '164 g', os: 'iOS 14',
    colors: ['Đen', 'Trắng', 'Đỏ', 'Xanh Lá', 'Xanh Dương', 'Tím'],
    desc: 'iPhone 5G đầu tiên, thiết kế cạnh phẳng.'
  },
  'iphone-12-mini': {
    name: 'iPhone 12 Mini', brand: 'iPhone', year: 2020, searchTerm: 'iPhone 12 mini',
    chip: 'Apple A14 Bionic', ram: '4 GB',
    displayInch: 5.4, displayRes: '2340 × 1080 OLED', mainCam: '12MP + 12MP UW',
    battery: '2227 mAh, 20W', weight: '133 g', os: 'iOS 14',
    colors: ['Đen', 'Trắng', 'Đỏ', 'Xanh', 'Tím'],
    desc: 'iPhone Mini đầu tiên, 5.4" gọn nhẹ.'
  },
  'iphone-11-pro-max': {
    name: 'iPhone 11 Pro Max', brand: 'iPhone', year: 2019, searchTerm: 'iPhone 11 Pro Max',
    chip: 'Apple A13 Bionic', ram: '4 GB',
    displayInch: 6.5, displayRes: '2688 × 1242 OLED', mainCam: '12MP×3',
    battery: '3969 mAh, 18W', weight: '226 g', os: 'iOS 13',
    colors: ['Bạc', 'Vàng', 'Xám', 'Xanh Đêm'],
    desc: 'Pro Max 2019, lần đầu có 3 camera + Night Mode.'
  },
  'iphone-11-pro': {
    name: 'iPhone 11 Pro', brand: 'iPhone', year: 2019, searchTerm: 'iPhone 11 Pro',
    chip: 'Apple A13 Bionic', ram: '4 GB',
    displayInch: 5.8, displayRes: '2436 × 1125 OLED', mainCam: '12MP×3',
    battery: '3046 mAh, 18W', weight: '188 g', os: 'iOS 13',
    colors: ['Bạc', 'Vàng', 'Xám', 'Xanh Đêm'],
    desc: 'Pro 5.8" cuối cùng có nốt tai thỏ lớn.'
  },
  'iphone-11': {
    name: 'iPhone 11', brand: 'iPhone', year: 2019, searchTerm: 'iPhone 11',
    chip: 'Apple A13 Bionic', ram: '4 GB',
    displayInch: 6.1, displayRes: '1792 × 828 LCD', mainCam: '12MP + 12MP UW',
    battery: '3110 mAh, 18W', weight: '194 g', os: 'iOS 13',
    colors: ['Đen', 'Trắng', 'Vàng', 'Xanh Lá', 'Tím', 'Đỏ'],
    desc: 'iPhone bán chạy nhất 2019-2020, LCD Liquid Retina.'
  },
  'iphone-x': {
    name: 'iPhone X', brand: 'iPhone', year: 2017, searchTerm: 'iPhone X',
    chip: 'Apple A11 Bionic', ram: '3 GB',
    displayInch: 5.8, displayRes: '2436 × 1125 OLED', mainCam: '12MP×2',
    battery: '2716 mAh', weight: '174 g', os: 'iOS 11',
    colors: ['Bạc', 'Xám Không Gian'],
    desc: 'iPhone đầu tiên có Face ID + thiết kế tràn viền.'
  },
  'iphone-8-plus': {
    name: 'iPhone 8 Plus', brand: 'iPhone', year: 2017, searchTerm: 'iPhone 8 Plus',
    chip: 'Apple A11 Bionic', ram: '3 GB',
    displayInch: 5.5, displayRes: '1920 × 1080 LCD', mainCam: '12MP×2',
    battery: '2691 mAh', weight: '202 g', os: 'iOS 11',
    colors: ['Bạc', 'Vàng', 'Xám Không Gian'],
    desc: 'iPhone Plus cuối cùng có Touch ID + nút Home.'
  },
  'iphone-8': {
    name: 'iPhone 8', brand: 'iPhone', year: 2017, searchTerm: 'iPhone 8',
    chip: 'Apple A11 Bionic', ram: '2 GB',
    displayInch: 4.7, displayRes: '1334 × 750 LCD', mainCam: '12MP',
    battery: '1821 mAh', weight: '148 g', os: 'iOS 11',
    colors: ['Bạc', 'Vàng', 'Xám Không Gian'],
    desc: 'Mặt lưng kính, hỗ trợ sạc không dây.'
  },
  'iphone-6': {
    name: 'iPhone 6', brand: 'iPhone', year: 2014, searchTerm: 'iPhone 6',
    chip: 'Apple A8', ram: '1 GB',
    displayInch: 4.7, displayRes: '1334 × 750 LCD', mainCam: '8MP',
    battery: '1810 mAh', weight: '129 g', os: 'iOS 8',
    colors: ['Bạc', 'Vàng', 'Xám Không Gian'],
    desc: 'iPhone cổ điển, máy phụ rẻ.'
  },

  /* ========== SAMSUNG GALAXY S ========== */
  'galaxy-s25-ultra': {
    name: 'Galaxy S25 Ultra', brand: 'Samsung', year: 2025, searchTerm: 'Samsung Galaxy S25 Ultra',
    chip: 'Snapdragon 8 Elite for Galaxy', ram: '12 GB',
    displayInch: 6.9, displayRes: '3120 × 1440 Dynamic AMOLED 2X 120Hz',
    mainCam: '200MP + 50MP UW + 50MP Tele 5x + 10MP Tele 3x',
    battery: '5000 mAh, 45W', weight: '218 g', os: 'Android 15 + One UI 7',
    colors: ['Titan Đen', 'Titan Trắng Bạc', 'Titan Xanh Mòng Két', 'Titan Hồng Vàng'],
    desc: 'Flagship Samsung 2025 với Galaxy AI, bút S Pen tích hợp, camera 200MP.'
  },
  'galaxy-s25-plus': {
    name: 'Galaxy S25 Plus', brand: 'Samsung', year: 2025, searchTerm: 'Samsung Galaxy S25+',
    chip: 'Snapdragon 8 Elite', ram: '12 GB',
    displayInch: 6.7, displayRes: '3120 × 1440 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '4900 mAh, 45W',
    weight: '190 g', os: 'Android 15',
    colors: ['Đen', 'Trắng Bạc', 'Xanh Navy', 'Xanh Bạc Hà'],
    desc: 'Phablet Samsung pin trâu, hiệu năng top với SD8 Elite.'
  },
  'galaxy-s25': {
    name: 'Galaxy S25', brand: 'Samsung', year: 2025, searchTerm: 'Samsung Galaxy S25',
    chip: 'Snapdragon 8 Elite', ram: '12 GB',
    displayInch: 6.2, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele', battery: '4000 mAh, 25W',
    weight: '162 g', os: 'Android 15',
    colors: ['Đen', 'Trắng Bạc', 'Xanh', 'Xanh Bạc Hà'],
    desc: 'Bản tiêu chuẩn S25, gọn nhẹ 6.2".'
  },
  'galaxy-s25-edge': {
    name: 'Galaxy S25 Edge', brand: 'Samsung', year: 2025, searchTerm: 'Samsung Galaxy S25 Edge',
    chip: 'Snapdragon 8 Elite', ram: '12 GB',
    displayInch: 6.7, displayRes: '3120 × 1440 AMOLED 120Hz',
    mainCam: '200MP + 12MP UW', battery: '3900 mAh, 25W',
    weight: '163 g (mỏng 5.8mm)', os: 'Android 15',
    colors: ['Titan Đen', 'Titan Bạc', 'Titan Xanh'],
    desc: 'Bản siêu mỏng 5.8mm, thiết kế ấn tượng.'
  },
  'galaxy-s24-ultra': {
    name: 'Galaxy S24 Ultra', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy S24 Ultra',
    chip: 'Snapdragon 8 Gen 3 for Galaxy', ram: '12 GB',
    displayInch: 6.8, displayRes: '3120 × 1440 AMOLED 120Hz',
    mainCam: '200MP + 50MP Tele 5x + 10MP Tele 3x + 12MP UW',
    battery: '5000 mAh, 45W', weight: '232 g', os: 'Android 14 + One UI 6.1',
    colors: ['Titan Xám', 'Titan Đen', 'Titan Tím', 'Titan Vàng'],
    desc: 'Lần đầu khung Titanium, Galaxy AI dịch trực tiếp cuộc gọi.'
  },
  'galaxy-s24-plus': {
    name: 'Galaxy S24 Plus', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy S24+',
    chip: 'Exynos 2400 / Snapdragon 8 Gen 3', ram: '12 GB',
    displayInch: 6.7, displayRes: '3120 × 1440 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '4900 mAh, 45W',
    weight: '197 g', os: 'Android 14',
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    desc: 'Plus 2024 với màn 2K + Galaxy AI.'
  },
  'galaxy-s24': {
    name: 'Galaxy S24', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy S24',
    chip: 'Exynos 2400', ram: '8 GB',
    displayInch: 6.2, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '4000 mAh, 25W',
    weight: '167 g', os: 'Android 14',
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    desc: 'Tiêu chuẩn S24 gọn nhẹ, hỗ trợ Galaxy AI đầy đủ.'
  },
  'galaxy-s23-ultra': {
    name: 'Galaxy S23 Ultra', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy S23 Ultra',
    chip: 'Snapdragon 8 Gen 2 for Galaxy', ram: '8/12 GB',
    displayInch: 6.8, displayRes: '3088 × 1440 AMOLED 120Hz',
    mainCam: '200MP + 12MP UW + 10MP Tele 3x + 10MP Tele 10x',
    battery: '5000 mAh, 45W', weight: '234 g', os: 'Android 13',
    colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
    desc: 'Camera 200MP đầu tiên của Samsung, S Pen.'
  },
  'galaxy-s23-plus': {
    name: 'Galaxy S23 Plus', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy S23+',
    chip: 'Snapdragon 8 Gen 2', ram: '8 GB',
    displayInch: 6.6, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele', battery: '4700 mAh, 45W',
    weight: '195 g', os: 'Android 13',
    colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
    desc: 'Plus 2023 hiệu năng cao với SD8 Gen 2.'
  },
  'galaxy-s23': {
    name: 'Galaxy S23', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy S23',
    chip: 'Snapdragon 8 Gen 2', ram: '8 GB',
    displayInch: 6.1, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele', battery: '3900 mAh, 25W',
    weight: '168 g', os: 'Android 13',
    colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
    desc: 'Tiêu chuẩn nhỏ gọn 6.1".'
  },
  'galaxy-s22-ultra': {
    name: 'Galaxy S22 Ultra', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy S22 Ultra',
    chip: 'Snapdragon 8 Gen 1 / Exynos 2200', ram: '8/12 GB',
    displayInch: 6.8, displayRes: '3088 × 1440 AMOLED 120Hz',
    mainCam: '108MP + 12MP UW + 10MP Tele 3x + 10MP Tele 10x',
    battery: '5000 mAh, 45W', weight: '229 g', os: 'Android 12',
    colors: ['Phantom Black', 'Phantom White', 'Burgundy', 'Green'],
    desc: 'Kế nhiệm Note, có ngăn S Pen tích hợp.'
  },
  'galaxy-s22-plus': {
    name: 'Galaxy S22 Plus', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy S22+',
    chip: 'Snapdragon 8 Gen 1', ram: '8 GB',
    displayInch: 6.6, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '4500 mAh, 45W',
    weight: '195 g', os: 'Android 12',
    colors: ['Phantom Black', 'Phantom White', 'Pink Gold', 'Green'],
    desc: 'Plus 2022.'
  },
  'galaxy-s22': {
    name: 'Galaxy S22', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy S22',
    chip: 'Snapdragon 8 Gen 1', ram: '8 GB',
    displayInch: 6.1, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '3700 mAh, 25W',
    weight: '167 g', os: 'Android 12',
    colors: ['Phantom Black', 'Phantom White', 'Pink Gold', 'Green'],
    desc: 'S22 nhỏ gọn 6.1".'
  },
  'galaxy-s21-ultra': {
    name: 'Galaxy S21 Ultra', brand: 'Samsung', year: 2021, searchTerm: 'Samsung Galaxy S21 Ultra',
    chip: 'Snapdragon 888 / Exynos 2100', ram: '12/16 GB',
    displayInch: 6.8, displayRes: '3200 × 1440 AMOLED 120Hz',
    mainCam: '108MP + 12MP UW + 10MP Tele 3x + 10MP Tele 10x',
    battery: '5000 mAh, 25W', weight: '227 g', os: 'Android 11',
    colors: ['Phantom Black', 'Phantom Silver', 'Phantom Titanium'],
    desc: 'Lần đầu hỗ trợ S Pen (rời).'
  },
  'galaxy-s21-plus': {
    name: 'Galaxy S21 Plus', brand: 'Samsung', year: 2021, searchTerm: 'Samsung Galaxy S21+',
    chip: 'Snapdragon 888', ram: '8 GB',
    displayInch: 6.7, displayRes: '2400 × 1080 AMOLED 120Hz',
    mainCam: '12MP + 12MP UW + 64MP Tele', battery: '4800 mAh, 25W',
    weight: '200 g', os: 'Android 11',
    colors: ['Phantom Black', 'Phantom Silver', 'Phantom Violet', 'Phantom Red'],
    desc: 'Plus 2021.'
  },
  'galaxy-s21': {
    name: 'Galaxy S21', brand: 'Samsung', year: 2021, searchTerm: 'Samsung Galaxy S21',
    chip: 'Snapdragon 888', ram: '8 GB',
    displayInch: 6.2, displayRes: '2400 × 1080 AMOLED 120Hz',
    mainCam: '12MP + 12MP UW + 64MP Tele', battery: '4000 mAh, 25W',
    weight: '169 g', os: 'Android 11',
    colors: ['Phantom Gray', 'Phantom White', 'Phantom Pink', 'Phantom Violet'],
    desc: 'S21 6.2", giá hợp lý.'
  },
  'galaxy-s20-ultra': {
    name: 'Galaxy S20 Ultra', brand: 'Samsung', year: 2020, searchTerm: 'Samsung Galaxy S20 Ultra',
    chip: 'Snapdragon 865 / Exynos 990', ram: '12/16 GB',
    displayInch: 6.9, displayRes: '3200 × 1440 AMOLED 120Hz',
    mainCam: '108MP + 48MP Tele 100x + 12MP UW',
    battery: '5000 mAh, 45W', weight: '220 g', os: 'Android 10',
    colors: ['Cosmic Gray', 'Cosmic Black'],
    desc: 'Đầu tiên có 100x Space Zoom.'
  },
  'galaxy-s20-plus': {
    name: 'Galaxy S20 Plus', brand: 'Samsung', year: 2020, searchTerm: 'Samsung Galaxy S20+',
    chip: 'Snapdragon 865', ram: '8/12 GB',
    displayInch: 6.7, displayRes: '3200 × 1440 AMOLED 120Hz',
    mainCam: '12MP + 12MP UW + 64MP Tele', battery: '4500 mAh, 25W',
    weight: '186 g', os: 'Android 10',
    colors: ['Cosmic Gray', 'Cosmic Black', 'Cloud Blue'],
    desc: 'Plus 2020.'
  },
  'galaxy-s20': {
    name: 'Galaxy S20', brand: 'Samsung', year: 2020, searchTerm: 'Samsung Galaxy S20',
    chip: 'Snapdragon 865', ram: '8/12 GB',
    displayInch: 6.2, displayRes: '3200 × 1440 AMOLED 120Hz',
    mainCam: '12MP + 12MP UW + 64MP Tele', battery: '4000 mAh, 25W',
    weight: '163 g', os: 'Android 10',
    colors: ['Cosmic Gray', 'Cloud Blue', 'Cloud Pink'],
    desc: 'S20 nhỏ gọn 6.2".'
  },
  'galaxy-s20-fe': {
    name: 'Galaxy S20 FE', brand: 'Samsung', year: 2020, searchTerm: 'Samsung Galaxy S20 FE',
    chip: 'Snapdragon 865 / Exynos 990', ram: '6/8 GB',
    displayInch: 6.5, displayRes: '2400 × 1080 AMOLED 120Hz',
    mainCam: '12MP + 12MP UW + 8MP Tele 3x', battery: '4500 mAh, 25W',
    weight: '190 g', os: 'Android 10',
    colors: ['Cloud Red', 'Cloud Orange', 'Cloud Lavender', 'Cloud Mint', 'Cloud Navy', 'Cloud White'],
    desc: 'Fan Edition giá tốt, đa sắc màu.'
  },
  'galaxy-s10-plus': {
    name: 'Galaxy S10+', brand: 'Samsung', year: 2019, searchTerm: 'Samsung Galaxy S10+',
    chip: 'Snapdragon 855 / Exynos 9820', ram: '8/12 GB',
    displayInch: 6.4, displayRes: '3040 × 1440 AMOLED', mainCam: '12MP + 16MP UW + 12MP Tele',
    battery: '4100 mAh, 15W', weight: '175 g', os: 'Android 9',
    colors: ['Prism White', 'Prism Black', 'Prism Green', 'Ceramic Black', 'Ceramic White'],
    desc: 'S10+ với camera selfie kép, vân tay siêu âm.'
  },
  'galaxy-s10': {
    name: 'Galaxy S10', brand: 'Samsung', year: 2019, searchTerm: 'Samsung Galaxy S10',
    chip: 'Snapdragon 855', ram: '8 GB',
    displayInch: 6.1, displayRes: '3040 × 1440 AMOLED', mainCam: '12MP + 16MP UW + 12MP Tele',
    battery: '3400 mAh, 15W', weight: '157 g', os: 'Android 9',
    colors: ['Prism White', 'Prism Black', 'Prism Green', 'Prism Blue'],
    desc: 'S10 6.1" với punch-hole camera.'
  },
  'galaxy-s10-5g': {
    name: 'Galaxy S10 5G', brand: 'Samsung', year: 2019, searchTerm: 'Samsung Galaxy S10 5G',
    chip: 'Snapdragon 855', ram: '8 GB',
    displayInch: 6.7, displayRes: '3040 × 1440 AMOLED',
    mainCam: '12MP + 16MP UW + 12MP Tele + ToF', battery: '4500 mAh, 25W',
    weight: '198 g', os: 'Android 9',
    colors: ['Majestic Black', 'Crown Silver', 'Royal Gold'],
    desc: 'S10 5G đầu tiên trên thế giới (Hàn Quốc).'
  },

  /* ========== GALAXY NOTE ========== */
  'galaxy-note-20-ultra': {
    name: 'Galaxy Note 20 Ultra', brand: 'Samsung', year: 2020, searchTerm: 'Samsung Galaxy Note 20 Ultra',
    chip: 'Snapdragon 865+ / Exynos 990', ram: '12 GB',
    displayInch: 6.9, displayRes: '3088 × 1440 AMOLED 120Hz',
    mainCam: '108MP + 12MP UW + 12MP Tele 5x', battery: '4500 mAh, 25W',
    weight: '208 g', os: 'Android 10',
    colors: ['Mystic Bronze', 'Mystic Black', 'Mystic White'],
    desc: 'Note Ultra cuối cùng, S Pen độ trễ 9ms.'
  },
  'galaxy-note-20': {
    name: 'Galaxy Note 20', brand: 'Samsung', year: 2020, searchTerm: 'Samsung Galaxy Note 20',
    chip: 'Snapdragon 865+', ram: '8 GB',
    displayInch: 6.7, displayRes: '2400 × 1080 AMOLED 60Hz',
    mainCam: '12MP + 12MP UW + 64MP Tele', battery: '4300 mAh, 25W',
    weight: '192 g', os: 'Android 10',
    colors: ['Mystic Bronze', 'Mystic Gray', 'Mystic Green'],
    desc: 'Note 20 phiên bản tiêu chuẩn.'
  },
  'galaxy-note-10-plus': {
    name: 'Galaxy Note 10+', brand: 'Samsung', year: 2019, searchTerm: 'Samsung Galaxy Note 10+',
    chip: 'Snapdragon 855 / Exynos 9825', ram: '12 GB',
    displayInch: 6.8, displayRes: '3040 × 1440 AMOLED',
    mainCam: '12MP + 16MP UW + 12MP Tele + ToF', battery: '4300 mAh, 45W',
    weight: '196 g', os: 'Android 9',
    colors: ['Aura Black', 'Aura White', 'Aura Glow', 'Aura Blue'],
    desc: 'Note 10+ với DepthVision Camera.'
  },
  'galaxy-note-10': {
    name: 'Galaxy Note 10', brand: 'Samsung', year: 2019, searchTerm: 'Samsung Galaxy Note 10',
    chip: 'Snapdragon 855', ram: '8 GB',
    displayInch: 6.3, displayRes: '2280 × 1080 AMOLED', mainCam: '12MP + 16MP UW + 12MP Tele',
    battery: '3500 mAh, 25W', weight: '168 g', os: 'Android 9',
    colors: ['Aura Black', 'Aura White', 'Aura Glow', 'Aura Pink'],
    desc: 'Note nhỏ nhất từng có.'
  },
  'galaxy-note-9': {
    name: 'Galaxy Note 9', brand: 'Samsung', year: 2018, searchTerm: 'Samsung Galaxy Note 9',
    chip: 'Snapdragon 845 / Exynos 9810', ram: '6/8 GB',
    displayInch: 6.4, displayRes: '2960 × 1440 AMOLED', mainCam: '12MP + 12MP Tele',
    battery: '4000 mAh, 15W', weight: '201 g', os: 'Android 8.1',
    colors: ['Midnight Black', 'Lavender Purple', 'Ocean Blue', 'Metallic Copper'],
    desc: 'Note 9 với S Pen Bluetooth (điều khiển từ xa).'
  },

  /* ========== GALAXY Z FOLD / FLIP ========== */
  'galaxy-fold-7': {
    name: 'Galaxy Z Fold 7', brand: 'Samsung', year: 2025, searchTerm: 'Samsung Galaxy Z Fold 7',
    chip: 'Snapdragon 8 Elite for Galaxy', ram: '16 GB',
    displayInch: 8.0, displayRes: '2160 × 1856 AMOLED 120Hz (chính), 6.5" ngoài',
    mainCam: '200MP + 12MP UW + 10MP Tele 3x', battery: '4400 mAh, 25W',
    weight: '215 g (mỏng kỷ lục 4.2mm)', os: 'Android 15',
    colors: ['Đen Vũ Trụ', 'Bạc Mặt Trăng', 'Xanh Đại Dương'],
    desc: 'Fold mỏng nhất từ trước đến nay, Galaxy AI Tab S, camera 200MP.'
  },
  'galaxy-fold-6': {
    name: 'Galaxy Z Fold 6', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy Z Fold 6',
    chip: 'Snapdragon 8 Gen 3 for Galaxy', ram: '12 GB',
    displayInch: 7.6, displayRes: '2160 × 1856 AMOLED 120Hz, 6.3" ngoài',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '4400 mAh, 25W',
    weight: '239 g', os: 'Android 14',
    colors: ['Pink', 'Silver Shadow', 'Navy', 'Crafted Black', 'White'],
    desc: 'Fold 6 thiết kế vuông vắn, hỗ trợ S Pen, Galaxy AI.'
  },
  'galaxy-fold-5': {
    name: 'Galaxy Z Fold 5', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy Z Fold 5',
    chip: 'Snapdragon 8 Gen 2 for Galaxy', ram: '12 GB',
    displayInch: 7.6, displayRes: '2176 × 1812 AMOLED 120Hz, 6.2" ngoài',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '4400 mAh, 25W',
    weight: '253 g', os: 'Android 13',
    colors: ['Icy Blue', 'Phantom Black', 'Cream'],
    desc: 'Fold 5 với bản lề Flex Hinge mới, gập sát hơn.'
  },
  'galaxy-fold-4': {
    name: 'Galaxy Z Fold 4', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy Z Fold 4',
    chip: 'Snapdragon 8+ Gen 1', ram: '12 GB',
    displayInch: 7.6, displayRes: '2176 × 1812 AMOLED 120Hz',
    mainCam: '50MP + 12MP UW + 10MP Tele 3x', battery: '4400 mAh, 25W',
    weight: '263 g', os: 'Android 12L',
    colors: ['Graygreen', 'Phantom Black', 'Beige', 'Burgundy'],
    desc: 'Fold 4 camera 50MP, S Pen tương thích.'
  },
  'galaxy-fold-3': {
    name: 'Galaxy Z Fold 3', brand: 'Samsung', year: 2021, searchTerm: 'Samsung Galaxy Z Fold 3',
    chip: 'Snapdragon 888', ram: '12 GB',
    displayInch: 7.6, displayRes: '2208 × 1768 AMOLED 120Hz',
    mainCam: '12MP×3', battery: '4400 mAh, 25W',
    weight: '271 g', os: 'Android 11',
    colors: ['Phantom Black', 'Phantom Green', 'Phantom Silver'],
    desc: 'Fold 3 đầu tiên hỗ trợ S Pen + IPX8 chống nước.'
  },
  'galaxy-z-flip-6': {
    name: 'Galaxy Z Flip 6', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy Z Flip 6',
    chip: 'Snapdragon 8 Gen 3 for Galaxy', ram: '12 GB',
    displayInch: 6.7, displayRes: '2640 × 1080 AMOLED 120Hz, 3.4" ngoài',
    mainCam: '50MP + 12MP UW', battery: '4000 mAh, 25W',
    weight: '187 g', os: 'Android 14',
    colors: ['Silver Shadow', 'Yellow', 'Blue', 'Mint', 'White', 'Black'],
    desc: 'Flip 6 với camera 50MP đầu tiên trên dòng Flip + Galaxy AI.'
  },
  'galaxy-z-flip-5': {
    name: 'Galaxy Z Flip 5', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy Z Flip 5',
    chip: 'Snapdragon 8 Gen 2 for Galaxy', ram: '8 GB',
    displayInch: 6.7, displayRes: '2640 × 1080 AMOLED 120Hz, 3.4" ngoài Flex Window',
    mainCam: '12MP + 12MP UW', battery: '3700 mAh, 25W',
    weight: '187 g', os: 'Android 13',
    colors: ['Mint', 'Graphite', 'Cream', 'Lavender'],
    desc: 'Flip 5 với màn ngoài lớn 3.4" như đồng hồ.'
  },
  'galaxy-z-flip-4': {
    name: 'Galaxy Z Flip 4', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy Z Flip 4',
    chip: 'Snapdragon 8+ Gen 1', ram: '8 GB',
    displayInch: 6.7, displayRes: '2640 × 1080 AMOLED 120Hz',
    mainCam: '12MP + 12MP UW', battery: '3700 mAh, 25W',
    weight: '187 g', os: 'Android 12',
    colors: ['Bora Purple', 'Graphite', 'Pink Gold', 'Blue'],
    desc: 'Flip 4 cải tiến bản lề + pin tốt hơn.'
  },
  'galaxy-z-flip-3': {
    name: 'Galaxy Z Flip 3', brand: 'Samsung', year: 2021, searchTerm: 'Samsung Galaxy Z Flip 3',
    chip: 'Snapdragon 888', ram: '8 GB',
    displayInch: 6.7, displayRes: '2640 × 1080 AMOLED 120Hz',
    mainCam: '12MP + 12MP UW', battery: '3300 mAh, 15W',
    weight: '183 g', os: 'Android 11',
    colors: ['Cream', 'Green', 'Lavender', 'Phantom Black'],
    desc: 'Flip 3 chống nước IPX8, giá hợp lý.'
  },

  /* ========== GALAXY A SERIES ========== */
  'galaxy-a53': {
    name: 'Galaxy A53', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy A53',
    chip: 'Exynos 1280', ram: '6/8 GB',
    displayInch: 6.5, displayRes: '2400 × 1080 AMOLED 120Hz',
    mainCam: '64MP + 12MP UW + 5MP Macro + 5MP Depth',
    battery: '5000 mAh, 25W', weight: '189 g', os: 'Android 12',
    colors: ['Awesome Black', 'White', 'Blue', 'Peach'],
    desc: 'Tầm trung bán chạy nhất 2022.'
  },
  'galaxy-a36': {
    name: 'Galaxy A36', brand: 'Samsung', year: 2025, searchTerm: 'Samsung Galaxy A36',
    chip: 'Snapdragon 6 Gen 3', ram: '8 GB',
    displayInch: 6.7, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 8MP UW + 5MP Macro', battery: '5000 mAh, 45W',
    weight: '195 g', os: 'Android 15',
    colors: ['Awesome Black', 'White', 'Lavender', 'Lime'],
    desc: 'A36 2025 hỗ trợ Galaxy AI.'
  },
  'galaxy-a33': {
    name: 'Galaxy A33', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy A33',
    chip: 'Exynos 1280', ram: '6/8 GB',
    displayInch: 6.4, displayRes: '2400 × 1080 AMOLED 90Hz',
    mainCam: '48MP + 8MP UW + 5MP Macro + 2MP Depth',
    battery: '5000 mAh, 25W', weight: '186 g', os: 'Android 12',
    colors: ['Awesome Black', 'White', 'Blue', 'Peach'],
    desc: 'A33 5G tầm trung.'
  },
  'galaxy-a32': {
    name: 'Galaxy A32', brand: 'Samsung', year: 2021, searchTerm: 'Samsung Galaxy A32',
    chip: 'MediaTek Helio G80', ram: '4/6/8 GB',
    displayInch: 6.4, displayRes: '2400 × 1080 AMOLED 90Hz',
    mainCam: '64MP + 8MP UW + 5MP Macro + 5MP Depth',
    battery: '5000 mAh, 15W', weight: '184 g', os: 'Android 11',
    colors: ['Awesome Black', 'White', 'Blue', 'Violet'],
    desc: 'A32 phổ thông pin trâu.'
  },
  'galaxy-a25': {
    name: 'Galaxy A25', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy A25',
    chip: 'Exynos 1280', ram: '6/8 GB',
    displayInch: 6.5, displayRes: '2340 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 8MP UW + 2MP Macro', battery: '5000 mAh, 25W',
    weight: '197 g', os: 'Android 14',
    colors: ['Blue Black', 'Yellow', 'Light Blue', 'Personality Blue'],
    desc: 'A25 5G hỗ trợ Knox Vault.'
  },
  'galaxy-a24': {
    name: 'Galaxy A24', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy A24',
    chip: 'MediaTek Helio G99', ram: '4/6/8 GB',
    displayInch: 6.5, displayRes: '2340 × 1080 AMOLED 90Hz',
    mainCam: '50MP + 5MP UW + 2MP Macro', battery: '5000 mAh, 25W',
    weight: '195 g', os: 'Android 13',
    colors: ['Black', 'Silver', 'Gold', 'Light Green'],
    desc: 'A24 4G phổ thông.'
  },
  'galaxy-a23': {
    name: 'Galaxy A23', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy A23',
    chip: 'Snapdragon 680', ram: '4/6/8 GB',
    displayInch: 6.6, displayRes: '2408 × 1080 PLS LCD 90Hz',
    mainCam: '50MP + 5MP UW + 2MP Macro + 2MP Depth',
    battery: '5000 mAh, 25W', weight: '195 g', os: 'Android 12',
    colors: ['Black', 'White', 'Blue', 'Peach'],
    desc: 'A23 giá rẻ pin trâu.'
  },
  'galaxy-a16': {
    name: 'Galaxy A16', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy A16',
    chip: 'MediaTek Helio G99 / Exynos 1330', ram: '4/6/8 GB',
    displayInch: 6.7, displayRes: '2340 × 1080 AMOLED 90Hz',
    mainCam: '50MP + 5MP UW + 2MP Macro', battery: '5000 mAh, 25W',
    weight: '200 g', os: 'Android 14',
    colors: ['Blue Black', 'Light Green', 'Gold', 'Gray'],
    desc: 'A16 cập nhật 6 năm Android.'
  },
  'galaxy-a15': {
    name: 'Galaxy A15', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy A15',
    chip: 'MediaTek Helio G99', ram: '4/6/8 GB',
    displayInch: 6.5, displayRes: '2340 × 1080 AMOLED 90Hz',
    mainCam: '50MP + 5MP UW + 2MP Macro', battery: '5000 mAh, 25W',
    weight: '200 g', os: 'Android 14',
    colors: ['Blue Black', 'Light Blue', 'Yellow', 'Pink'],
    desc: 'A15 phổ thông màn AMOLED.'
  },
  'galaxy-a13': {
    name: 'Galaxy A13', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy A13',
    chip: 'Exynos 850', ram: '3/4/6 GB',
    displayInch: 6.6, displayRes: '2408 × 1080 PLS LCD',
    mainCam: '50MP + 5MP UW + 2MP Macro + 2MP Depth',
    battery: '5000 mAh, 15W', weight: '195 g', os: 'Android 12',
    colors: ['Black', 'White', 'Blue', 'Peach'],
    desc: 'A13 giá rẻ.'
  },
  'galaxy-a12': {
    name: 'Galaxy A12', brand: 'Samsung', year: 2020, searchTerm: 'Samsung Galaxy A12',
    chip: 'MediaTek Helio P35 / Exynos 850', ram: '3/4/6 GB',
    displayInch: 6.5, displayRes: '1600 × 720 PLS LCD',
    mainCam: '48MP + 5MP UW + 2MP Macro + 2MP Depth',
    battery: '5000 mAh, 15W', weight: '205 g', os: 'Android 10',
    colors: ['Black', 'White', 'Blue', 'Red'],
    desc: 'A12 phổ thông cấp thấp.'
  },

  /* ========== GALAXY HÀN QUỐC RIÊNG (Buddy/Jum/Wide/Quantum) ========== */
  'galaxy-buddy-4': {
    name: 'Galaxy Buddy 4', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy Buddy',
    chip: 'Exynos 1330', ram: '4 GB', displayInch: 6.6, displayRes: '2408 × 1080 PLS LCD',
    mainCam: '50MP', battery: '5000 mAh, 15W', weight: '205 g', os: 'Android 14',
    colors: ['Black', 'White'],
    desc: '★ Phiên bản Hàn Quốc độc quyền dòng Galaxy A bình dân, bán kèm gói SIM nhà mạng KT.'
  },
  'galaxy-buddy-3': {
    name: 'Galaxy Buddy 3', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy Buddy',
    chip: 'Exynos 850', ram: '4 GB', displayInch: 6.6, displayRes: '1600 × 720 LCD',
    mainCam: '50MP', battery: '5000 mAh, 15W', weight: '205 g', os: 'Android 13',
    colors: ['Black'],
    desc: '★ Galaxy Buddy 3 Hàn Quốc, tương đương A23 5G dùng nội địa.'
  },
  'galaxy-buddy-2': {
    name: 'Galaxy Buddy 2', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy Buddy',
    chip: 'MediaTek Helio P35', ram: '3 GB', displayInch: 6.5, displayRes: '720 × 1600 LCD',
    mainCam: '13MP', battery: '5000 mAh, 15W', weight: '195 g', os: 'Android 12',
    colors: ['Black', 'White'],
    desc: '★ Galaxy Buddy 2 Hàn Quốc, máy phổ thông cho người cao tuổi.'
  },
  'galaxy-jum-3': {
    name: 'Galaxy Jum 3', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy Jump 3',
    chip: 'Exynos 1330', ram: '6 GB', displayInch: 6.6, displayRes: '2408 × 1080 PLS LCD 120Hz',
    mainCam: '50MP + 5MP UW + 2MP Macro', battery: '5000 mAh, 25W',
    weight: '205 g', os: 'Android 14', colors: ['Black', 'Silver', 'Light Blue'],
    desc: '★ Galaxy Jump 3 - bản Hàn của A24/A25, độc quyền KT.'
  },
  'galaxy-jum-2': {
    name: 'Galaxy Jum 2', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy Jump 2',
    chip: 'Exynos 1280', ram: '6 GB', displayInch: 6.6, displayRes: '2408 × 1080 LCD 90Hz',
    mainCam: '50MP + 5MP UW + 2MP Macro', battery: '5000 mAh, 25W',
    weight: '205 g', os: 'Android 13', colors: ['Black', 'Silver'],
    desc: '★ Galaxy Jump 2 - bản Hàn 5G tầm trung.'
  },
  'galaxy-quantum-3': {
    name: 'Galaxy Quantum 3', brand: 'Samsung', year: 2022, searchTerm: 'Samsung Galaxy Quantum 3',
    chip: 'Exynos 1280', ram: '6 GB', displayInch: 6.4, displayRes: '2400 × 1080 AMOLED 90Hz',
    mainCam: '48MP + 8MP UW + 5MP Macro + 2MP Depth', battery: '5000 mAh, 25W',
    weight: '186 g', os: 'Android 12', colors: ['Black', 'White'],
    desc: '★ Bản Hàn (= A33 5G) độc quyền SK Telecom có chip lượng tử bảo mật.'
  },
  'galaxy-wide-quantum6': {
    name: 'Galaxy Wide Quantum 6', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy Wide',
    chip: 'Exynos 1330', ram: '6 GB', displayInch: 6.6, displayRes: '2408 × 1080 LCD 120Hz',
    mainCam: '50MP + 5MP UW + 2MP Macro', battery: '5000 mAh, 25W',
    weight: '205 g', os: 'Android 14', colors: ['Black', 'White', 'Blue'],
    desc: '★ Wide Quantum 6 - bản Hàn 5G của KT.'
  },
  'galaxy-wide-6': {
    name: 'Galaxy Wide 6', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy Wide',
    chip: 'Exynos 1330', ram: '4 GB', displayInch: 6.6, displayRes: '2408 × 1080 LCD 90Hz',
    mainCam: '50MP', battery: '5000 mAh, 25W',
    weight: '205 g', os: 'Android 13', colors: ['Black', 'White'],
    desc: '★ Galaxy Wide 6 - bản Hàn KT giá tốt.'
  },

  /* ========== APPLE WATCH / AIRPODS / IPAD / MAC ========== */
  'apple-watch-ultra-2': {
    name: 'Apple Watch Ultra 2', brand: 'Apple', year: 2023, searchTerm: 'Apple Watch Ultra 2',
    chip: 'Apple S9 SiP', ram: '64 GB',
    displayInch: 1.92, displayRes: '502 × 410 LTPO OLED 3000 nits',
    battery: '36 giờ thường / 72 giờ Low Power', weight: '61.4 g',
    os: 'watchOS 10', mainCam: 'N/A',
    colors: ['Titanium Natural'],
    desc: 'Đồng hồ Ultra titan dành cho thể thao mạo hiểm, lặn 40m.'
  },
  'apple-watch-series-10': {
    name: 'Apple Watch Series 10', brand: 'Apple', year: 2024, searchTerm: 'Apple Watch Series 10',
    chip: 'Apple S10 SiP', ram: '64 GB',
    displayInch: 1.96, displayRes: '496 × 416 LTPO3 OLED', battery: '18 giờ',
    weight: '36 g (42mm) / 41 g (46mm)', os: 'watchOS 11', mainCam: 'N/A',
    colors: ['Jet Black', 'Rose Gold', 'Silver'],
    desc: 'Series 10 mỏng nhất, màn hình lớn 46mm.'
  },
  'apple-watch-se-3': {
    name: 'Apple Watch SE 3', brand: 'Apple', year: 2025, searchTerm: 'Apple Watch SE',
    chip: 'Apple S10 SiP', ram: '32 GB', displayInch: 1.78, displayRes: 'Retina LTPO OLED',
    battery: '18 giờ', weight: '32-36 g', os: 'watchOS 11', mainCam: 'N/A',
    colors: ['Midnight', 'Starlight', 'Silver'],
    desc: 'SE 3 giá rẻ, đầy đủ tính năng cơ bản.'
  },
  'apple-watch-se-2': {
    name: 'Apple Watch SE 2', brand: 'Apple', year: 2022, searchTerm: 'Apple Watch SE',
    chip: 'Apple S8 SiP', ram: '32 GB', displayInch: 1.78, displayRes: 'Retina LTPO OLED',
    battery: '18 giờ', weight: '27-33 g', os: 'watchOS 9', mainCam: 'N/A',
    colors: ['Midnight', 'Starlight', 'Silver'],
    desc: 'SE 2 giá rẻ tốt nhất.'
  },
  'apple-watch-series-7': {
    name: 'Apple Watch Series 7', brand: 'Apple', year: 2021, searchTerm: 'Apple Watch Series 7',
    chip: 'Apple S7 SiP', ram: '32 GB', displayInch: 1.9, displayRes: '396 × 484 LTPO OLED',
    battery: '18 giờ', weight: '32-39 g', os: 'watchOS 8', mainCam: 'N/A',
    colors: ['Midnight', 'Starlight', 'Green', 'Blue', 'Red'],
    desc: 'Series 7 viền mỏng + sạc nhanh.'
  },
  'samsung-watch-ultra': {
    name: 'Samsung Galaxy Watch Ultra', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy Watch Ultra',
    chip: 'Exynos W1000', ram: '2 GB', displayInch: 1.5, displayRes: '480 × 480 AMOLED',
    battery: '590 mAh, 100h tiết kiệm', weight: '60.5 g', os: 'Wear OS 5 + One UI Watch 6', mainCam: 'N/A',
    colors: ['Titanium Gray', 'Titanium White', 'Titanium Silver'],
    desc: 'Watch Ultra Titan của Samsung, cạnh tranh Apple Ultra.'
  },
  'samsung-watch-7': {
    name: 'Samsung Galaxy Watch 7', brand: 'Samsung', year: 2024, searchTerm: 'Samsung Galaxy Watch 7',
    chip: 'Exynos W1000', ram: '2 GB', displayInch: 1.3, displayRes: '432 × 432 AMOLED',
    battery: '300/425 mAh', weight: '28-34 g', os: 'Wear OS 5', mainCam: 'N/A',
    colors: ['Green', 'Cream', 'Silver'],
    desc: 'Watch 7 tròn cổ điển, AI sức khỏe.'
  },
  'samsung-watch-6': {
    name: 'Samsung Galaxy Watch 6', brand: 'Samsung', year: 2023, searchTerm: 'Samsung Galaxy Watch 6',
    chip: 'Exynos W930', ram: '2 GB', displayInch: 1.3, displayRes: '432 × 432 AMOLED',
    battery: '300/425 mAh', weight: '28-33 g', os: 'Wear OS 4', mainCam: 'N/A',
    colors: ['Graphite', 'Gold', 'Silver'],
    desc: 'Watch 6 vòng xoay vật lý quay lại.'
  },
  'airpods-pro-2': {
    name: 'AirPods Pro 2', brand: 'Apple', year: 2022, searchTerm: 'AirPods Pro 2',
    chip: 'Apple H2', ram: 'N/A', displayInch: 0, displayRes: 'N/A',
    battery: 'Tai 6h, hộp sạc 30h tổng', weight: '5.3 g/tai, hộp 50.8 g',
    os: 'N/A', mainCam: 'N/A', colors: ['Trắng'],
    desc: 'Tai nghe ANC chống ồn chủ động, Spatial Audio.'
  },
  'airpods-max': {
    name: 'AirPods Max', brand: 'Apple', year: 2020, searchTerm: 'AirPods Max',
    chip: 'Apple H1', ram: 'N/A', displayInch: 0, displayRes: 'N/A',
    battery: '20 giờ', weight: '384.8 g', os: 'N/A', mainCam: 'N/A',
    colors: ['Space Gray', 'Silver', 'Sky Blue', 'Pink', 'Green'],
    desc: 'Headphone over-ear cao cấp của Apple.'
  },
  'ipad': {
    name: 'iPad (Gen 10)', brand: 'Apple', year: 2022, searchTerm: 'iPad (10th generation)',
    chip: 'Apple A14 Bionic', ram: '4 GB',
    displayInch: 10.9, displayRes: '2360 × 1640 Liquid Retina LCD 60Hz',
    mainCam: '12MP main + 12MP front Landscape', battery: '28.6 Wh, 10h',
    weight: '477 g', os: 'iPadOS 16',
    colors: ['Bạc', 'Hồng', 'Vàng', 'Xanh'],
    desc: 'iPad cơ bản 10.9" với USB-C.'
  },
  'ipad-pro-m4': {
    name: 'iPad Pro M4', brand: 'Apple', year: 2024, searchTerm: 'iPad Pro (M4)',
    chip: 'Apple M4 (3nm)', ram: '8/16 GB',
    displayInch: 11, displayRes: 'Tandem OLED 120Hz ProMotion (cũng có 13")',
    mainCam: '12MP main + LiDAR + 12MP front Landscape',
    battery: '31.29 Wh / 38.99 Wh, 10h', weight: '444 g (11"), 579 g (13")',
    os: 'iPadOS 17', colors: ['Space Black', 'Silver'],
    desc: 'iPad Pro mỏng nhất, màn Tandem OLED siêu sáng.'
  },
  'ipad-pro-m2': {
    name: 'iPad Pro M2', brand: 'Apple', year: 2022, searchTerm: 'iPad Pro (M2)',
    chip: 'Apple M2', ram: '8/16 GB', displayInch: 11, displayRes: 'Liquid Retina XDR 120Hz',
    mainCam: '12MP + 10MP UW + LiDAR', battery: '40-51 Wh, 10h',
    weight: '466 g (11"), 682 g (12.9")', os: 'iPadOS 16',
    colors: ['Space Gray', 'Silver'], desc: 'iPad Pro M2 với Apple Pencil Hover.'
  },
  'ipad-pro-m1': {
    name: 'iPad Pro M1', brand: 'Apple', year: 2021, searchTerm: 'iPad Pro (M1)',
    chip: 'Apple M1', ram: '8/16 GB', displayInch: 11, displayRes: 'Liquid Retina 120Hz / mini-LED 12.9"',
    mainCam: '12MP + 10MP UW + LiDAR', battery: '7538 mAh, 10h',
    weight: '466 g (11"), 682 g (12.9")', os: 'iPadOS 14',
    colors: ['Space Gray', 'Silver'], desc: 'iPad Pro chip M1 đầu tiên.'
  },
  'macbook-air-m4': {
    name: 'MacBook Air M4', brand: 'Apple', year: 2025, searchTerm: 'MacBook Air (M4)',
    chip: 'Apple M4 (10-core CPU, 8/10-core GPU)', ram: '16/24/32 GB',
    displayInch: 13.6, displayRes: '2560 × 1664 Liquid Retina',
    mainCam: '12MP Center Stage', battery: 'lên đến 18 giờ', weight: '1.24 kg',
    os: 'macOS Sequoia', colors: ['Sky Blue', 'Silver', 'Starlight', 'Midnight'],
    desc: 'MacBook Air M4 2025, mỏng nhẹ, AI tích hợp.'
  },
  'macbook-air-m2': {
    name: 'MacBook Air M2', brand: 'Apple', year: 2022, searchTerm: 'MacBook Air (M2)',
    chip: 'Apple M2 (8-core CPU, 8/10-core GPU)', ram: '8/16/24 GB',
    displayInch: 13.6, displayRes: '2560 × 1664 Liquid Retina',
    mainCam: '1080p FaceTime HD', battery: 'lên đến 18 giờ', weight: '1.24 kg',
    os: 'macOS Ventura', colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    desc: 'MacBook Air M2 thiết kế mới, không quạt, im lặng.'
  },

  /* ========== XIAOMI / REDMI ========== */
  'redmi-note-13-pro-5g': {
    name: 'Redmi Note 13 Pro 5G', brand: 'Xiaomi', year: 2024, searchTerm: 'Redmi Note 13 Pro 5G',
    chip: 'Snapdragon 7s Gen 2', ram: '8/12 GB',
    displayInch: 6.67, displayRes: '2712 × 1220 AMOLED 120Hz',
    mainCam: '200MP + 8MP UW + 2MP Macro', battery: '5100 mAh, 67W',
    weight: '187 g', os: 'Android 13 + MIUI 14',
    colors: ['Midnight Black', 'Aurora Purple', 'Ocean Teal', 'Coral Purple'],
    desc: 'Redmi Note 13 Pro 5G cấu hình khủng giá hợp lý.'
  },
  'redmi-note-13': {
    name: 'Redmi Note 13', brand: 'Xiaomi', year: 2024, searchTerm: 'Redmi Note 13',
    chip: 'Snapdragon 685', ram: '6/8 GB',
    displayInch: 6.67, displayRes: '2400 × 1080 AMOLED 120Hz',
    mainCam: '108MP + 8MP UW + 2MP Macro', battery: '5000 mAh, 33W',
    weight: '188 g', os: 'Android 13 + MIUI 14',
    colors: ['Midnight Black', 'Mint Green', 'Ice Blue', 'Ocean Sunset'],
    desc: 'Redmi Note 13 4G phổ thông.'
  },
  'redmi-note-12': {
    name: 'Redmi Note 12', brand: 'Xiaomi', year: 2023, searchTerm: 'Redmi Note 12',
    chip: 'Snapdragon 685', ram: '4/6/8 GB',
    displayInch: 6.67, displayRes: '2400 × 1080 AMOLED 120Hz',
    mainCam: '50MP + 8MP UW + 2MP Macro', battery: '5000 mAh, 33W',
    weight: '188 g', os: 'Android 13',
    colors: ['Onyx Gray', 'Ice Blue', 'Mint Green', 'Sunrise Gold'],
    desc: 'Redmi Note 12 phổ thông.'
  },
};

/* Helper: tìm slug từ tên model (fuzzy match) */
window.MM_CATALOG_FIND = function (modelName) {
  if (!modelName) return null;
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const key = norm(modelName);
  if (window.MM_CATALOG[key]) return key;

  // Aliases mapping
  const aliases = {
    'galaxy-redmi-note-12': 'redmi-note-12',
    'galaxy-redmi-note-13': 'redmi-note-13',
    'galaxy-redmi-note-13-pro-5g': 'redmi-note-13-pro-5g',
    'apple-watch-ultra-2': 'apple-watch-ultra-2',
    'samsung-galaxy-watch-6': 'samsung-watch-6',
    'samsung-galaxy-watch-7': 'samsung-watch-7',
    'samsung-galaxy-watch-ultra': 'samsung-watch-ultra',
    'airpods-max-1-2': 'airpods-max',
  };
  if (aliases[key]) return aliases[key];

  // Strip "Galaxy " / "Samsung " / spaces
  const stripped = key.replace(/^samsung-/, '').replace(/^galaxy-/, 'galaxy-');
  if (window.MM_CATALOG[stripped]) return stripped;

  return null;
};
