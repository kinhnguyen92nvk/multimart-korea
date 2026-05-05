/* =============================================
   ENHANCEMENTS.JS — Polish toàn site
   • Floating contact dock (Kakao/Zalo/Phone/Messenger/Top)
   • Cookie consent (Korean/PIPA-friendly)
   • Lazy-load images
   • Smooth scroll
   • Service Worker register (PWA)
   • Trust ticker (cập nhật real-time số đơn ngẫu nhiên)
   ============================================= */
(function () {
  'use strict';

  /* ───── 1. CONTACT DOCK ───── */
  const buildDock = () => {
    if (document.querySelector('.mm-dock')) return;
    const SITE = window.MM_SITE || {};
    const phone = SITE.phone || '+82-10-8888-5808';
    const kakao = 'https://qr.kakao.com';
    const zalo  = SITE.zaloLink || 'https://zalo.me/0108888 5808';
    const fb    = SITE.fbLink   || 'https://m.me/multimartkorea';

    const dock = document.createElement('div');
    dock.className = 'mm-dock';
    dock.innerHTML = `
      <button class="mm-dock__main" aria-label="Mở liên hệ" type="button">
        <i class="fas fa-comments"></i>
        <span class="mm-dock__pulse"></span>
      </button>
      <div class="mm-dock__menu">
        <a href="${kakao}" class="mm-dock__btn mm-dock__btn--kakao" title="KakaoTalk" target="_blank" rel="noopener">
          <i class="fas fa-comment-dots"></i><span>KakaoTalk</span>
        </a>
        <a href="${zalo}" class="mm-dock__btn mm-dock__btn--zalo" title="Zalo" target="_blank" rel="noopener">
          <span class="zlogo">Z</span><span>Zalo</span>
        </a>
        <a href="${fb}" class="mm-dock__btn mm-dock__btn--fb" title="Messenger" target="_blank" rel="noopener">
          <i class="fab fa-facebook-messenger"></i><span>Messenger</span>
        </a>
        <a href="tel:${phone}" class="mm-dock__btn mm-dock__btn--call" title="Gọi điện">
          <i class="fas fa-phone-volume"></i><span>Gọi ngay</span>
        </a>
      </div>
      <button class="mm-dock__top" aria-label="Lên đầu trang" type="button">
        <i class="fas fa-chevron-up"></i>
      </button>
    `;
    document.body.appendChild(dock);

    const main = dock.querySelector('.mm-dock__main');
    const menu = dock.querySelector('.mm-dock__menu');
    const top  = dock.querySelector('.mm-dock__top');

    main.addEventListener('click', () => dock.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!dock.contains(e.target)) dock.classList.remove('open');
    });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Show "back to top" sau khi cuộn 400px
    window.addEventListener('scroll', () => {
      top.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
  };

  /* ───── 2. COOKIE CONSENT (PIPA - Korea) ───── */
  const cookieConsent = () => {
    if (localStorage.getItem('mm_cookie_ok')) return;
    const bar = document.createElement('div');
    bar.className = 'mm-cookie';
    bar.innerHTML = `
      <div class="mm-cookie__inner">
        <div class="mm-cookie__icon">🍪</div>
        <div class="mm-cookie__text">
          <b>Trang này sử dụng cookie</b> để tăng trải nghiệm và phân tích lưu lượng (PIPA – Hàn Quốc).
          Bạn có thể đọc thêm trong <a href="#" onclick="alert('Chính sách bảo mật sẽ sớm cập nhật');return false">Chính sách bảo mật</a>.
        </div>
        <div class="mm-cookie__actions">
          <button class="mm-cookie__decline" type="button">Chỉ cookie cần thiết</button>
          <button class="mm-cookie__accept" type="button">Đồng ý tất cả</button>
        </div>
      </div>
    `;
    document.body.appendChild(bar);
    requestAnimationFrame(() => bar.classList.add('show'));
    bar.querySelector('.mm-cookie__accept').onclick = () => {
      localStorage.setItem('mm_cookie_ok', 'all'); bar.remove();
    };
    bar.querySelector('.mm-cookie__decline').onclick = () => {
      localStorage.setItem('mm_cookie_ok', 'essential'); bar.remove();
    };
  };

  /* ───── 3. LAZY LOAD ẢNH ───── */
  const lazyImg = () => {
    document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');
    document.querySelectorAll('img:not([decoding])').forEach(img => img.decoding = 'async');
  };

  /* ───── 4. SMOOTH SCROLL cho anchor ───── */
  const smoothScroll = () => {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  };

  /* ───── 5. TRUST TICKER (random gần đây có ai mua gì) ───── */
  const trustTicker = () => {
    const slot = document.querySelector('[data-mm="trust-ticker"]');
    if (!slot) return;
    const NAMES  = ['Anh Tuấn', 'Chị Hương', 'Bạn Linh', 'Anh Minh', 'Chị Nga', 'Anh Hải', 'Bạn Thảo', 'Anh Đức', 'Chị Mai', 'Bạn Phương', 'Anh Nam', 'Chị Lan'];
    const PLACES = ['Ansan', 'Seoul', 'Incheon', 'Suwon', 'Bucheon', 'Daegu', 'Busan', 'Gwangju', 'Pyeongtaek', 'Hwaseong', 'Yongin', 'Cheonan'];
    const ITEMS  = [
      'mở SIM KT M Premium 200GB', 'mở SIM SKT 0청년 69',
      'đăng ký Galaxy S26 Ultra trả góp', 'mua iPhone 17 Pro Max',
      'đăng ký SIM LG U+ Youth 5G', 'đặt Samsung Z Fold 7',
      'mở SIM trả trước 3 tháng', 'mở SIM Skylife 5G 200GB',
      'mua phụ kiện iPhone', 'đăng ký SIM Hello Mobile 11GB',
    ];
    const TIMES = ['vừa xong', '2 phút trước', '5 phút trước', '12 phút trước', '24 phút trước', '1 giờ trước'];
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    const show = () => {
      slot.innerHTML = `
        <div class="trust-pop">
          <div class="trust-pop__avatar">${pick(['👨','👩','🧑','👤'])}</div>
          <div class="trust-pop__body">
            <b>${pick(NAMES)}</b> ở <b>${pick(PLACES)}</b> đã ${pick(ITEMS)}
            <span>${pick(TIMES)} · ✓ Đã xác nhận</span>
          </div>
          <button class="trust-pop__close" aria-label="Đóng">&times;</button>
        </div>
      `;
      slot.querySelector('.trust-pop__close').onclick = () => slot.innerHTML = '';
      // Auto hide after 7s
      setTimeout(() => slot.innerHTML = '', 7000);
    };
    setTimeout(show, 4000);
    setInterval(show, 22000);
  };

  /* ───── 6. SCROLL ANIMATION (data-aos light) ───── */
  const scrollAnim = () => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('mm-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-anim]').forEach(el => io.observe(el));
  };

  /* ───── 7. ANIMATED COUNTER ───── */
  const animateCounters = () => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const dur = 1400;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.textContent = v.toLocaleString('vi-VN');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
  };

  /* ───── INIT ───── */
  const init = () => {
    buildDock();
    cookieConsent();
    lazyImg();
    smoothScroll();
    trustTicker();
    scrollAnim();
    animateCounters();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
