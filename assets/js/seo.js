/* =============================================
   SEO.JS — Tự động chèn meta tags + JSON-LD
   Mỗi trang chỉ cần load script này, các thẻ
   <title>, <meta description>, OG, Twitter, canonical,
   JSON-LD Organization/LocalBusiness/Breadcrumb
   sẽ được tạo tự động dựa trên data-mm-page.
   ============================================= */
(function () {
  'use strict';

  function getPublicBaseUrl() {
    if (location.protocol === 'file:') return 'https://kinhnguyen92nvk.github.io/multimart-korea';
    if (location.hostname.endsWith('github.io')) {
      const parts = location.pathname.split('/').filter(Boolean);
      const repo = parts[0] || '';
      return location.origin + (repo ? '/' + repo : '');
    }
    return location.origin;
  }

  const PUBLIC_BASE_URL = getPublicBaseUrl();

  // ───── THÔNG TIN DOANH NGHIỆP (NAP - Name/Address/Phone) ─────
  const SITE = {
    name: 'MultiMart KOREA',
    legalName: 'MultiMart Korea – Cộng tác viên SIM & Hàng Việt tại Hàn',
    domain: PUBLIC_BASE_URL,
    logo: PUBLIC_BASE_URL + '/assets/img/favicon.svg',
    phone: '+82-10-8888-5808',
    phoneDisplay: '010-8888-5808',
    email: 'kiwoo33@naver.com',
    kakaoId: 'multimartkr',
    zaloLink: 'https://zalo.me/0108888 5808',
    fbLink: 'https://m.me/multimartkorea',
    address: {
      streetAddress: 'Ansan, Gyeonggi-do',
      addressLocality: 'Ansan',
      addressRegion: 'Gyeonggi-do',
      postalCode: '15588',
      addressCountry: 'KR',
    },
    geo: { lat: 37.3219, lng: 126.8309 }, // Ansan
    rating: { value: 4.9, count: 1287 },
    sameAs: [
      'https://www.facebook.com/multimartkorea',
      'https://zalo.me/0108888 5808',
      'https://www.tiktok.com/@multimartkorea',
    ],
    keywords: 'sim hàn quốc, sim cho người việt tại hàn, mở sim hàn, đăng ký sim hàn quốc, mua điện thoại trả góp hàn, hàng việt tại hàn, multimart korea, ansan, KT M Mobile, SK Telecom việt, LG U+ việt',
  };
  window.MM_SITE = SITE;

  // ───── METADATA cho từng trang ─────
  const PAGES = {
    'home': {
      title: 'MultiMart KOREA — SIM Hàn Quốc & Điện Thoại cho người Việt tại Hàn',
      desc: 'Bán SIM Hàn Quốc giá tốt cho người Việt tại Hàn — 38 gói cước từ 9 nhà mạng (SKT, KT, LG U+, KT M, Skylife). Điện thoại trả góp, hỗ trợ tiếng Việt 100%, giao toàn Hàn.',
      path: '/',
      type: 'website',
    },
    'sim': {
      title: 'Bảng giá SIM Hàn Quốc 04/2026 – 38 gói cước rẻ cho người Việt | MultiMart KOREA',
      desc: 'Cập nhật bảng giá SIM Hàn Quốc tháng 04/2026: SKT, KT, LG U+, KT Mmobile, Skylife. Mở SIM tận nhà, hỗ trợ tiếng Việt, đăng ký 5 phút có sóng. Hotline 010-8888-5808.',
      path: '/post.html',
      type: 'product',
    },
    'category': {
      title: 'Danh mục sản phẩm – Điện thoại, SIM, Phụ kiện | MultiMart KOREA',
      desc: 'Khám phá toàn bộ sản phẩm tại MultiMart KOREA: điện thoại Samsung/iPhone trả góp, SIM Hàn Quốc, phụ kiện, đồ gia dụng. Giao hàng toàn quốc Hàn Quốc.',
      path: '/category.html',
      type: 'website',
    },
    'product': {
      title: 'Chi tiết sản phẩm | MultiMart KOREA',
      desc: 'Thông tin chi tiết sản phẩm, giá cả, thông số kỹ thuật, bảo hành. Mua hàng dễ dàng tại MultiMart KOREA — giao toàn Hàn 24h.',
      path: '/product.html',
      type: 'product',
    },
    'price': {
      title: 'Bảng giá điện thoại Samsung & iPhone trả góp 04/2026 | MultiMart KOREA',
      desc: 'Bảng giá điện thoại trả góp tại Hàn Quốc cho người Việt — Samsung Galaxy S25/S26, iPhone 16/17 Pro Max, Z Fold/Flip. Trả góp 0% qua nhà mạng. Cập nhật mỗi tháng.',
      path: '/price-board.html',
      type: 'product',
    },
    'cart': {
      title: 'Giỏ hàng | MultiMart KOREA',
      desc: 'Xem lại sản phẩm trong giỏ và thanh toán nhanh chóng tại MultiMart KOREA.',
      path: '/cart.html', noindex: true,
    },
    'checkout': {
      title: 'Thanh toán | MultiMart KOREA',
      desc: 'Hoàn tất đơn hàng nhanh chóng và an toàn tại MultiMart KOREA.',
      path: '/checkout.html', noindex: true,
    },
    'orders': {
      title: 'Đơn hàng của tôi | MultiMart KOREA',
      desc: 'Theo dõi trạng thái đơn hàng và lịch sử giao dịch tại MultiMart KOREA.',
      path: '/orders.html', noindex: true,
    },
    'profile': {
      title: 'Tài khoản của tôi | MultiMart KOREA',
      desc: 'Quản lý thông tin cá nhân, địa chỉ giao hàng, sổ địa chỉ tại MultiMart KOREA.',
      path: '/profile.html', noindex: true,
    },
    'login': {
      title: 'Đăng nhập | MultiMart KOREA',
      desc: 'Đăng nhập tài khoản MultiMart KOREA để mua hàng nhanh, theo dõi đơn và nhận ưu đãi riêng.',
      path: '/login.html', noindex: true,
    },
    'admin': {
      title: 'Admin Dashboard | MultiMart KOREA',
      desc: 'Khu vực quản trị nội bộ.',
      path: '/admin.html', noindex: true,
    },
    'cms': {
      title: 'CMS — Cập nhật bảng giá & blog tự động | MultiMart KOREA',
      desc: 'Hệ thống tự động cập nhật bảng giá điện thoại, gói SIM và sinh bài blog SEO bằng AI.',
      path: '/admin-cms.html', noindex: true,
    },
    'blog': {
      title: 'Blog — Thủ thuật điện thoại, SIM & cuộc sống tại Hàn | MultiMart KOREA',
      desc: 'Blog chia sẻ thủ thuật điện thoại, hướng dẫn SIM Hàn Quốc, kinh nghiệm sinh sống và làm việc tại Hàn Quốc cho người Việt. Cập nhật bài mới hàng tuần.',
      path: '/blog.html',
      type: 'website',
    },
    'blogPost': {
      title: 'Bài viết blog | MultiMart KOREA',
      desc: 'Bài viết chi tiết về điện thoại, SIM Hàn Quốc và kinh nghiệm cho người Việt tại Hàn.',
      path: '/blog-post.html',
      type: 'article',
    },
  };
  window.MM_PAGES = PAGES;

  // ───── Helpers ─────
  const setMeta = (selector, attr, val) => {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const [k, v] = selector.replace('meta[', '').replace(']', '').split('=');
      el.setAttribute(k, v.replace(/"/g, ''));
      document.head.appendChild(el);
    }
    el.setAttribute(attr, val);
  };
  const setLink = (rel, href, extra = {}) => {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
    el.setAttribute('href', href);
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
  };
  const addJsonLd = (data) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data, null, 0);
    document.head.appendChild(s);
  };

  // ───── Init: chạy ngay (đặt seo.js trong <head>) ─────
  const pageKey = document.documentElement.getAttribute('data-mm-page')
                || (document.body && document.body.getAttribute('data-mm-page'))
                || guessPageKey();

  function guessPageKey() {
    const file = location.pathname.split('/').pop().toLowerCase();
    if (!file || file === 'index.html') return 'home';
    if (file === 'post.html') return 'sim';
    return file.replace('.html', '').replace('-board', '');
  }

  const meta = PAGES[pageKey] || PAGES.home;
  const url = SITE.domain + meta.path;

  // Title (chỉ override nếu chưa được set thủ công sang giá trị riêng)
  if (!document.title || document.title.includes('MultiMart')) document.title = meta.title;

  // Basic
  setMeta('meta[name="description"]', 'content', meta.desc);
  setMeta('meta[name="keywords"]', 'content', SITE.keywords);
  setMeta('meta[name="author"]', 'content', SITE.name);
  setMeta('meta[name="robots"]', 'content', meta.noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
  setMeta('meta[name="theme-color"]', 'content', '#16a34a');
  setMeta('meta[name="format-detection"]', 'content', 'telephone=yes');
  setMeta('meta[http-equiv="content-language"]', 'content', 'vi-VN');

  // Canonical + hreflang
  setLink('canonical', url);
  // Korean alternate (cho người Hàn search)
  document.head.appendChild(Object.assign(document.createElement('link'), {
    rel: 'alternate', hreflang: 'vi', href: url,
  }));

  // Open Graph (Facebook/Zalo share)
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.desc);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[property="og:type"]', 'content', meta.type || 'website');
  setMeta('meta[property="og:image"]', 'content', SITE.logo);
  setMeta('meta[property="og:image:width"]', 'content', '512');
  setMeta('meta[property="og:image:height"]', 'content', '512');
  setMeta('meta[property="og:site_name"]', 'content', SITE.name);
  setMeta('meta[property="og:locale"]', 'content', 'vi_VN');
  setMeta('meta[property="og:locale:alternate"]', 'content', 'ko_KR');

  // Twitter Card
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.desc);
  setMeta('meta[name="twitter:image"]', 'content', SITE.logo);

  // PWA / icons
  setLink('manifest', SITE.domain + '/site.webmanifest');
  setLink('icon', SITE.domain + '/assets/img/favicon.svg', { type: 'image/svg+xml' });
  setLink('apple-touch-icon', SITE.domain + '/assets/img/favicon.svg');

  // ─── JSON-LD #1: Organization (mọi trang) ───
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE.domain + '#org',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.domain,
    logo: SITE.logo,
    image: SITE.logo,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: SITE.sameAs,
    address: { '@type': 'PostalAddress', ...SITE.address },
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: ['vi', 'ko'],
    }],
  });

  // ─── JSON-LD #2: LocalBusiness (homepage + SIM) ───
  if (pageKey === 'home' || pageKey === 'sim') {
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Store',
      '@id': SITE.domain + '#localbusiness',
      name: SITE.name,
      image: SITE.logo,
      url: SITE.domain,
      telephone: SITE.phone,
      priceRange: '₩₩',
      address: { '@type': 'PostalAddress', ...SITE.address },
      geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '08:00', closes: '23:00',
      }],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: SITE.rating.value, reviewCount: SITE.rating.count,
      },
    });
  }

  // ─── JSON-LD #3: WebSite + SearchAction (homepage) ───
  if (pageKey === 'home') {
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: SITE.domain,
      name: SITE.name,
      potentialAction: {
        '@type': 'SearchAction',
        target: SITE.domain + '/category.html?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });
  }

  // ─── JSON-LD #4: Breadcrumb (mọi trang trừ home) ───
  if (pageKey !== 'home') {
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: meta.title.split('|')[0].split('–')[0].trim(), item: url },
      ],
    });
  }

  // ─── JSON-LD #5: FAQ (homepage + SIM) ───
  if (pageKey === 'home' || pageKey === 'sim') {
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question', name: 'Người Việt mở SIM Hàn Quốc cần giấy tờ gì?',
          acceptedAnswer: { '@type': 'Answer', text: 'Cần Hộ chiếu còn hạn ≥ 6 tháng + Thẻ ngoại kiều (외국인등록증) + Selfie cầm thẻ. MultiMart KOREA hỗ trợ tư vấn qua KakaoTalk multimartkr, mở SIM giao tận nhà toàn Hàn 24h.' },
        },
        {
          '@type': 'Question', name: 'Mất bao lâu để có SIM Hàn Quốc?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sau khi gửi giấy tờ qua KakaoTalk, SIM được kích hoạt trong 1-3 giờ làm việc. Giao SIM tận nơi 24h trên toàn Hàn — hoàn toàn miễn phí.' },
        },
        {
          '@type': 'Question', name: 'Có hỗ trợ trả góp điện thoại không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Có. Chúng tôi liên kết với SKT/KT/LG U+ để hỗ trợ trả góp 0% qua hợp đồng nhà mạng từ 12-36 tháng cho Galaxy S25/S26, iPhone 16/17 Pro Max, Z Fold/Flip.' },
        },
        {
          '@type': 'Question', name: 'Phí giao SIM/điện thoại có không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Hoàn toàn miễn phí trên toàn Hàn Quốc. Giao trong 24h — Seoul/Incheon/Ansan: 2-6h, các tỉnh khác trong ngày.' },
        },
        {
          '@type': 'Question', name: 'Có thể chuyển mạng giữ số (MNP) không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Có. Phí chuyển mạng giữ số chỉ 800₩, được tính vào hóa đơn tháng sau. MultiMart hỗ trợ làm thủ tục MNP miễn phí 100%.' },
        },
      ],
    });
  }

  // ─── JSON-LD #6: ItemList các gói SIM (cho trang SIM) ───
  if (pageKey === 'sim' && window.MM_SIM && window.MM_SIM.plans) {
    setTimeout(() => {
      addJsonLd({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: window.MM_SIM.plans.slice(0, 20).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.vName,
            description: `${p.data} data, ${p.voice}, hợp đồng ${p.contract}`,
            offers: {
              '@type': 'Offer',
              price: p.monthly,
              priceCurrency: 'KRW',
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: SITE.name },
            },
          },
        })),
      });
    }, 0);
  }
})();
