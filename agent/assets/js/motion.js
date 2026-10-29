/* motion.js ｜ 揭示、逐字、数字滚动、打字机、粒子、光标、磁吸、3D 倾斜、视差；依赖 utils 的 PW，由 main.js 调用 init() */
(function () {
  var PW = window.PW, M = PW.motion = {}, rm = PW.rm, still = rm || PW.isStatic;
  var rafId = 0;

  /* 揭示 + 技能条 + 时间线：进视口加 .in，触发后不再观察 */
  M.reveal = function () {
    var els = PW.qsa('.reveal, .line, .stackcard').filter(function (e) { return !e.closest('.hero'); });
    if (!('IntersectionObserver' in window) || still) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    els.forEach(function (e) { io.observe(e); });
  };

  /* 数字滚动：rAF + setTimeout 终值兜底，避免后台标签页停在 0 */
  M.count = function (el, to, dur) {
    dur = dur || 1500;
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      el.textContent = PW.fmt(to);
    }
    if (still) { finish(); return; }
    var t0 = 0;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      el.textContent = PW.fmt(to * PW.ease(k));
      if (k < 1 && !done) PW.raf(step); else finish();
    }
    PW.raf(step);
    setTimeout(finish, dur + 400);
  };

  M.counters = function () {
    var els = PW.qsa('[data-count]').filter(function (e) { return !e.closest('.hero'); });
    if (!('IntersectionObserver' in window) || still) {
      els.forEach(function (el) { el.textContent = PW.fmt(parseFloat(el.getAttribute('data-count')) || 0); });
      return;
    }
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        M.count(en.target, parseFloat(en.target.getAttribute('data-count')) || 0);
      });
    }, { threshold: 0.2 });
    els.forEach(function (e) { io.observe(e); });
  };

  /* 姓名逐字：切 .split-char，第 i 个字延迟 i*0.055+0.12s */
  M.splitName = function (el) {
    if (!el) return;
    var txt = el.textContent.trim();
    el.textContent = '';
    txt.split('').forEach(function (ch, i) {
      var s = document.createElement('span');
      s.className = 'split-char';
      s.textContent = ch;
      s.style.setProperty('--d', (i * 0.055 + 0.12).toFixed(3));
      el.appendChild(s);
    });
  };

  /* 打字机：打 85ms / 停 1.7s / 删 40ms */
  M.typer = function (el, list) {
    if (!el || !list || !list.length) return;
    if (still) { el.textContent = list[0]; return; }
    var i = 0, n = 0, del = false;
    (function tick() {
      var w = list[i];
      if (!del) {
        n++;
        el.textContent = w.slice(0, n);
        if (n >= w.length) { del = true; return setTimeout(tick, 1700); }
        return setTimeout(tick, 85);
      }
      n--;
      el.textContent = w.slice(0, n);
      if (n <= 0) { del = false; i = (i + 1) % list.length; return setTimeout(tick, 260); }
      setTimeout(tick, 40);
    })();
  };

  /* Canvas 粒子连线 */
  M.particles = function () {
    var c = PW.qs('#bgCanvas');
    if (!c || still) return;
    var ctx = c.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    var ps = [], w = 0, h = 0, col = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#5eead4', f = 0;
    function build() {
      var n = Math.min(64, Math.round(w * h / 28000));
      ps = [];
      for (var i = 0; i < n; i++) {
        ps.push({ x: Math.random() * w, y: Math.random() * h, vx: PW.rand(-0.18, 0.18), vy: PW.rand(-0.18, 0.18) });
      }
    }
    function size() {
      w = c.clientWidth; h = c.clientHeight;
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }
    function draw() {
      if (f++ % 90 === 0) col = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#5eead4';
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.globalAlpha = 0.5; ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.15, 0, 6.2832); ctx.fill();
        for (var j = i + 1; j < ps.length; j++) {
          var q = ps[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 20000) {
            ctx.globalAlpha = 0.12 * (1 - d / 20000);
            ctx.strokeStyle = col; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      rafId = PW.raf(draw);
    }
    size();
    window.addEventListener('resize', size);
    draw();
  };

  /* 自定义光标 */
  M.cursor = function () {
    var c = PW.qs('#cursor');
    if (!c || still || !window.matchMedia('(hover:hover)').matches) return;
    document.documentElement.classList.add('has-cursor');
    var x = -100, y = -100, tx = x, ty = y, on = false;
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!on) { on = true; c.classList.add('is-on'); loop(); }
    }, { passive: true });
    function loop() {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      c.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    }
    PW.on(document, 'mouseover', 'a, button, .hit, .qbtn, .node', function () { c.classList.add('is-hot'); });
    PW.on(document, 'mouseout', 'a, button, .hit, .qbtn, .node', function () { c.classList.remove('is-hot'); });
  };

  /* 卡片 3D 倾斜 + 光斑跟手 */
  M.tilt = function () {
    if (still) return;
    PW.qsa('.work, .stackcard').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - 0.5;
        var dy = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--mx', ((dx + 0.5) * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((dy + 0.5) * 100).toFixed(1) + '%');
        if (card.classList.contains('work')) {
          card.style.transform = 'perspective(1000px) rotateY(' + (dx * 7).toFixed(2) + 'deg) rotateX(' + (-dy * 7).toFixed(2) +
            'deg) translate3d(' + (dx * 8).toFixed(2) + 'px,' + (dy * 8).toFixed(2) + 'px,0)';
        }
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  };

  /* 磁吸按钮 */
  M.magnet = function () {
    if (still) return;
    PW.qsa('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1) + 'px,' +
          (((e.clientY - r.top - r.height / 2) * 0.16) - 2).toFixed(1) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  };

  /* 描边大字 0.22 倍视差 */
  M.parallax = function () {
    var g = PW.qs('#heroGhost');
    if (!g || still) return;
    var last = -1;
    function run() {
      var y = window.pageYOffset;
      if (Math.abs(y - last) > 1) { last = y; g.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)'; }
      PW.raf(run);
    }
    run();
  };

  M.init = function () {
    M.reveal();
    M.counters();
    M.particles();
    M.cursor();
    M.tilt();
    M.magnet();
    M.parallax();
  };
})();
