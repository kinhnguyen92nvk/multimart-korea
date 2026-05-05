/* theme.js — Áp dụng dark/light mode ngay khi tải trang (trước khi render)
   Đặt trong <head> để tránh flash trắng khi refresh */
(function () {
  const saved = localStorage.getItem('mm_theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
