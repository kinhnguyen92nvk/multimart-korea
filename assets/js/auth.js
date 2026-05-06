/* MultiMart Auth — soft client-side auth cho static site
   2 chế độ:
   - Passcode (mặc định, dùng ngay): MM_AUTH.signInPasscode(code)
   - Google Sign-In (tuỳ chọn): cấu hình Client ID + email allowlist
   Phiên đăng nhập lưu localStorage 'mm_session', mặc định 7 ngày.
   ⚠️ Đây là gating client-side cho UI quản trị — không phải bảo mật server-side.
   Quyền GHI thực tế nằm ở GitHub Personal Access Token (đã có).
*/
(function(){
  const LS_SESSION = 'mm_session';
  const LS_CONFIG  = 'mm_auth_config';
  const SESSION_DAYS = 7;

  /* Passcode mặc định — đổi ngay sau lần đăng nhập đầu tiên */
  const DEFAULT_PASSCODE = 'MULTIMART2026';

  function getConfig(){
    try {
      const raw = localStorage.getItem(LS_CONFIG);
      if (raw) return JSON.parse(raw);
    } catch(e){}
    return {
      passcode: DEFAULT_PASSCODE,
      googleClientId: '',
      allowedEmails: [],   // VD ['admin@gmail.com']
      mode: 'passcode',    // 'passcode' | 'google'
    };
  }
  function saveConfig(cfg){ localStorage.setItem(LS_CONFIG, JSON.stringify(cfg)); }

  function getSession(){
    try {
      const raw = localStorage.getItem(LS_SESSION);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (s.exp && Date.now() > s.exp) { localStorage.removeItem(LS_SESSION); return null; }
      return s;
    } catch(e){ return null; }
  }

  function setSession(user){
    const s = {
      ...user,
      iat: Date.now(),
      exp: Date.now() + SESSION_DAYS*24*60*60*1000,
    };
    localStorage.setItem(LS_SESSION, JSON.stringify(s));
    return s;
  }

  function signOut(){
    localStorage.removeItem(LS_SESSION);
    /* Đường dẫn tương đối tới admin-login: nếu đang ở /tools/* thì lùi 1 cấp */
    const prefix = location.pathname.includes('/tools/') ? '../' : '';
    location.href = prefix + 'admin-login.html';
  }

  function isLoggedIn(){ return !!getSession(); }

  function signInPasscode(code){
    const cfg = getConfig();
    if (!code) return { ok:false, error:'Vui lòng nhập mã' };
    if (code === cfg.passcode) {
      return { ok:true, user: setSession({ name:'Admin', method:'passcode', email:'' }) };
    }
    return { ok:false, error:'Sai mã đăng nhập' };
  }

  /* Decode JWT ID token của Google (chỉ phần payload, KHÔNG verify chữ ký) */
  function decodeJWT(token){
    try {
      const part = token.split('.')[1];
      const json = atob(part.replace(/-/g,'+').replace(/_/g,'/'));
      return JSON.parse(decodeURIComponent(escape(json)));
    } catch(e){ return null; }
  }

  function signInGoogle(idToken){
    const cfg = getConfig();
    const payload = decodeJWT(idToken);
    if (!payload || !payload.email) return { ok:false, error:'Token không hợp lệ' };
    if (!payload.email_verified) return { ok:false, error:'Email Google chưa được xác thực' };
    /* Nếu đã cài allowlist, chỉ cho email trong list */
    if (cfg.allowedEmails && cfg.allowedEmails.length > 0){
      const ok = cfg.allowedEmails.map(e=>e.trim().toLowerCase()).includes(payload.email.toLowerCase());
      if (!ok) return { ok:false, error:'Email '+payload.email+' không có quyền truy cập' };
    }
    return { ok:true, user: setSession({
      name: payload.name || payload.email,
      email: payload.email,
      picture: payload.picture || '',
      method: 'google',
    })};
  }

  /* Gọi đầu mỗi trang admin để bảo vệ */
  function requireAdmin(){
    if (!isLoggedIn()){
      const ret = encodeURIComponent(location.pathname.replace(/^.*\//,'')+location.search);
      const prefix = location.pathname.includes('/tools/') ? '../' : '';
      location.href = prefix + 'admin-login.html?return='+ret;
      return false;
    }
    return true;
  }

  window.MM_AUTH = {
    getConfig, saveConfig,
    getSession, isLoggedIn, signOut,
    signInPasscode, signInGoogle,
    requireAdmin,
    decodeJWT,
  };
})();
