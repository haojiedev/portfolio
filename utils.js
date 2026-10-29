/* utils.js ｜ window.PW 命名空间与基础工具（查询 / 建节点 / 事件委托 / 数字 / 缓动 / Toast / 观察器）；必须最先加载，其余脚本都挂在 PW 上 */
(function () {
  var PW = window.PW = window.PW || {};

  PW.qs = function (s, r) { return (r || document).querySelector(s); };
  PW.qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  PW.el = function (tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  PW.text = function (e, t) { if (e) e.textContent = t == null ? '' : String(t); return e; };
  PW.fill = function (id, t) { return PW.text(document.getElementById(id), t); };
  PW.html = function (id, h) { var e = document.getElementById(id); if (e) e.innerHTML = h; return e; };
  PW.esc = function (s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  PW.on = function (root, type, sel, fn) {
    (root || document).addEventListener(type, function (ev) {
      var t = ev.target;
      if (t && t.nodeType === 1 && t.closest) t = t.closest(sel);
      else t = null;
      if (t) fn.call(t, ev, t);
    });
  };
  PW.clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  PW.ease = function (t) { return 1 - Math.pow(1 - t, 3); };
  PW.rand = function (a, b) { return a + Math.random() * (b - a); };
  PW.fmt = function (n) {
    n = Math.round(n);
    return n >= 1000 ? n.toLocaleString('en-US') : String(n);
  };
  PW.mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  PW.rm = !!PW.mq.matches;
  PW.isStatic = /(?:^|[?&])shot=1(?:&|$)/.test(location.search);
  PW.store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  PW.raf = function (fn) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(fn);
    return setTimeout(function () { fn(Date.now()); }, 16);
  };

  PW.toast = (function () {
    var box = null, timer = 0;
    return function (msg, isErr) {
      box = box || document.getElementById('toast');
      if (!box) return;
      box.textContent = msg;
      box.classList.toggle('is-err', !!isErr);
      box.classList.add('is-on');
      clearTimeout(timer);
      timer = setTimeout(function () { box.classList.remove('is-on'); }, 2600);
    };
  })();

  /* 统一观察器：进视口执行一次后 unobserve；不支持 IO 时直接执行 */
  PW.observe = function (selector, fn, opts) {
    var els = PW.qsa(selector);
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { fn(e); }); return null; }
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (en.isIntersecting) { fn(en.target); io.unobserve(en.target); }
      });
    }, opts || { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    return io;
  };
})();
