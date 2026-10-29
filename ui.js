/* ui.js ｜ 复制邮箱三层兜底、留言表单本地校验与 Toast 提示；依赖 utils / profile，由 main 调用 init */
(function () {
  var PW = window.PW, P = window.PROFILE, U = PW.ui = {};

  function selectEmail() {
    var el = document.getElementById('contactMail');
    try {
      var r = document.createRange();
      r.selectNodeContents(el);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    } catch (e) {}
    PW.toast(P.toast.blocked);
  }

  function legacyCopy() {
    var mail = P.person.email;
    var ta = document.createElement('textarea');
    ta.value = mail;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    var ok = false;
    try {
      ta.select();
      ta.setSelectionRange(0, mail.length);
      ok = document.execCommand('copy');
    } catch (e) { ok = false; }
    document.body.removeChild(ta);
    if (ok) PW.toast(P.toast.copied + mail);
    else selectEmail();
  }

  function copy() {
    var mail = P.person.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail).then(function () {
        PW.toast(P.toast.copied + mail);
      }, legacyCopy);
    } else legacyCopy();
  }

  /* 留言本机持久化（方案 A：LocalStorage，仅当前浏览器保留） */
  var MSG_KEY = 'pw-msg-v1', MSG_MAX = 20;

  function msgLoad() {
    try {
      var raw = localStorage.getItem(MSG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function msgSave(list) {
    try { localStorage.setItem(MSG_KEY, JSON.stringify(list.slice(0, MSG_MAX))); } catch (e) {}
  }

  function msgTime(iso) {
    var d = new Date(iso), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return (d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function msgRender() {
    var box = document.getElementById('msgList'), cnt = document.getElementById('msgCount');
    if (!box) return;
    var list = msgLoad();
    box.textContent = '';
    list.forEach(function (m) {
      var li = document.createElement('li'), hd = document.createElement('div'), b = document.createElement('b'),
        t = document.createElement('time'), p = document.createElement('p');
      li.className = 'msgitem';
      hd.className = 'msgitem__hd';
      b.textContent = m.n;
      t.textContent = msgTime(m.t);
      p.textContent = m.m;
      hd.appendChild(b); hd.appendChild(t);
      li.appendChild(hd); li.appendChild(p);
      box.appendChild(li);
    });
    if (cnt) cnt.textContent = list.length ? P.contact.msgCount + list.length + P.contact.msgCount2 : P.contact.msgEmpty;
  }

  function msgPush(name, text) {
    var list = msgLoad();
    list.unshift({ n: name.slice(0, 24), m: text.slice(0, 500), t: new Date().toISOString() });
    msgSave(list);
    msgRender();
  }

  function msgClear() {
    if (!msgLoad().length) return PW.toast(P.contact.msgEmpty);
    msgSave([]);
    msgRender();
    PW.toast(P.toast.msgCleared);
  }

  function form() {
    var f = document.getElementById('msgForm');
    var n = document.getElementById('fName');
    var m = document.getElementById('fMsg');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      [n, m].forEach(function (el) {
        var empty = !el.value.trim();
        el.closest('.field').classList.toggle('has-err', empty);
        if (empty) bad.push(el);
      });
      if (bad.length) {
        PW.toast(P.toast.formErr, true);
        bad[0].focus();
        return;
      }
      PW.toast(P.toast.formOk + n.value.trim() + P.toast.formOk2);
      msgPush(n.value.trim(), m.value.trim());
      f.reset();
    });
    [n, m].forEach(function (el) {
      el.addEventListener('input', function () {
        if (el.value.trim()) el.closest('.field').classList.remove('has-err');
      });
    });
  }

  /* 简历下载兜底：直链不可用时按需注入 resume-data.js，用 Blob 触发真正的本地下载 */
  function resumeBlob() {
    function go() {
      try {
        var s = atob(window.PDF_BASE64), n = s.length, u = new Uint8Array(n), i;
        for (i = 0; i < n; i++) u[i] = s.charCodeAt(i);
        var url = URL.createObjectURL(new Blob([u], { type: 'application/pdf' }));
        var a = document.createElement('a');
        a.href = url;
        a.download = '马豪杰-简历.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
        PW.toast(P.toast.resume);
      } catch (e) { location.href = P.person.resume; }
    }
    if (window.PDF_BASE64) return go();
    if (document.getElementById('resumeData')) return;
    var s = document.createElement('script');
    s.id = 'resumeData';
    s.src = 'assets/js/resume-data.js';
    s.onload = go;
    s.onerror = function () { location.href = P.person.resume; };
    document.head.appendChild(s);
  }

  function resume() {
    ['navResume', 'heroBtn2', 'btnResume'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', function (e) {
        if (!PW.resumeBroken) return;
        e.preventDefault();
        resumeBlob();
      });
    });
  }

  U.init = function () {
    document.getElementById('btnCopy').addEventListener('click', copy);
    resume();
    form();
    msgRender();
    var clr = document.getElementById('msgClear');
    if (clr) {
      clr.textContent = P.contact.msgClear;
      clr.addEventListener('click', msgClear);
    }
  };
})();
