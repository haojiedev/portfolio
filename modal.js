/* modal.js ｜ 案例抽屉开合：右滑出、三种关法、锁滚动、指标滚动、抽屉内锚点先关再滚；依赖 content 的 PW.drawerHTML 与 utils 事件委托 */
(function () {
  var PW = window.PW, M = PW.modal = {}, box, panel, bodyEl, open = false, lastFocus = null;

  function openDrawer(key) {
    if (!box) return;
    lastFocus = document.activeElement;
    bodyEl.innerHTML = PW.drawerHTML(key);
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-lock');
    panel.scrollTop = 0;
    open = true;
    /* 抽屉里新建的数字节点：count 内部已处理 reduced-motion / 静态模式，直接给终值 */
    PW.qsa('[data-count]', bodyEl).forEach(function (el) {
      el.textContent = '0';
      PW.motion.count(el, parseFloat(el.getAttribute('data-count')) || 0, 900);
    });
    var x = PW.qs('.drawer__x', panel);
    if (x) setTimeout(function () { x.focus({ preventScroll: true }); }, 60);
  }

  function close() {
    if (!open) return;
    open = false;
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  M.init = function () {
    box = PW.qs('#drawer');
    panel = PW.qs('.drawer__panel', box);
    bodyEl = PW.qs('#drawerBody', box);

    PW.on(document, 'click', '[data-open]', function () { openDrawer(this.getAttribute('data-open')); });
    PW.on(document, 'click', '[data-close]', function () { close(); });

    /* 抽屉内「看 Agent 演示」：先关再滚 */
    PW.on(box, 'click', '[data-demo]', function () {
      close();
      var el = document.getElementById('demo');
      setTimeout(function () { if (el) el.scrollIntoView({ behavior: PW.rm ? 'auto' : 'smooth', block: 'start' }); }, 220);
    });
    /* 抽屉内任何锚点同样先关 */
    PW.on(box, 'click', '[data-goto]', function () { close(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') close();
    });
  };
})();
