/* navigation.js ｜ 导航构建、滚动实底、顶部进度、版块高亮、汉堡菜单、主题记忆、锚点平滑滚动；依赖 utils，需在内容渲染后初始化 */
(function () {
  var PW = window.PW, P = window.PROFILE, root = document.documentElement, nav = document.getElementById('nav');
  var N = PW.nav = {};

  function closeMenu() {
    var links = document.getElementById('navLinks'), burger = document.getElementById('burger');
    links.classList.remove('is-open');
    burger.classList.remove('is-on');
    burger.setAttribute('aria-expanded', 'false');
  }

  function scrollState() {
    var y = window.pageYOffset;
    nav.classList.toggle('is-stuck', y > 40);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    root.style.setProperty('--p', h > 0 ? Math.min(1, y / h).toFixed(4) : 0);
  }

  /* 版块高亮：检索区并入「Agent 演示」 */
  function active() {
    if (!('IntersectionObserver' in window)) return;
    var map = { rag: 'demo' };
    var targets = PW.qsa('main section[id]');
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = map[en.target.id] || en.target.id;
        PW.qsa('.nav__link').forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('data-goto') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (s) { io.observe(s); });
  }

  function theme() {
    var saved = PW.store.get('pw-theme-blue');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
    var btn = document.getElementById('themeBtn');
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      PW.store.set('pw-theme-blue', next);
      PW.toast(next === 'light' ? P.toast.light : P.toast.dark);
    });
  }

  N.init = function () {
    PW.html('navLinks', P.nav.map(function (n) {
      return '<a class="nav__link" href="#' + n.id + '" data-goto="' + n.id + '">' + n.label + '</a>';
    }).join(''));

    scrollState();
    window.addEventListener('scroll', scrollState, { passive: true });
    window.addEventListener('resize', scrollState);

    if (!PW.rm) root.style.scrollBehavior = 'smooth';

    PW.on(document, 'click', '[data-goto]', function (e) {
      var el = document.getElementById(this.getAttribute('data-goto'));
      if (!el) return;
      e.preventDefault();
      closeMenu();
      el.scrollIntoView({ behavior: PW.rm ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', '#' + el.id);
    });

    var burger = document.getElementById('burger');
    burger.addEventListener('click', function () {
      var links = document.getElementById('navLinks');
      var on = links.classList.toggle('is-open');
      burger.classList.toggle('is-on', on);
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 760) closeMenu(); });

    theme();
    active();
  };

  /* 深链：内容渲染完成后再补一次定位 */
  N.deepLink = function () {
    var id = (location.hash || '').replace('#', '');
    if (!id) return;
    var el = document.getElementById(id);
    if (el) setTimeout(function () { el.scrollIntoView({ block: 'start' }); }, 120);
  };
})();
