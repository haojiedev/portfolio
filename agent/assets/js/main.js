/* main.js ｜ 启动入口：静态模式判定 → 渲染 DOM → 初始化各模块 → 加载转场 → 首屏入场 → 深链补偿；依赖以上全部脚本 */
(function () {
  var PW = window.PW, P = window.PROFILE;

  if (PW.isStatic) document.documentElement.classList.add('is-static');

  PW.build();
  PW.nav.init();
  PW.demo.init();
  PW.rag.init();
  PW.modal.init();
  PW.ui.init();

  PW.motion.splitName(document.getElementById('heroName'));
  PW.motion.init();
  if (!PW.rm) PW.motion.typer(document.getElementById('heroRole'), P.hero.roles);
  else document.getElementById('heroRole').textContent = P.hero.roles[0];

  /* 首屏在幕布退场后才入场：逐块 .in + 四个数字滚动 */
  function heroIn() {
    PW.qsa('.hero .reveal').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('in'); }, 80 + i * 90);
    });
    PW.qsa('.hero [data-count]').forEach(function (el) {
      PW.motion.count(el, parseFloat(el.getAttribute('data-count')) || 0);
    });
  }

  function boot() {
    var box = document.getElementById('loader');
    var bar = document.getElementById('ldBar');
    var pct = document.getElementById('ldPct');
    if (PW.isStatic || PW.rm) {
      box.classList.add('is-out');
      document.body.classList.add('is-ready');
      heroIn();
      PW.nav.deepLink();
      return;
    }
    var p = 0;
    var timer = setInterval(function () {
      p = Math.min(100, p + PW.rand(5, 13));
      bar.style.width = p + '%';
      pct.textContent = Math.round(p);
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(done, 240);
      }
    }, 105);
    function done() {
      box.classList.add('is-open');
      setTimeout(function () {
        box.classList.add('is-out');
        document.body.classList.add('is-ready');
        heroIn();
        PW.nav.deepLink();
      }, 900);
    }
  }

  boot();
})();
