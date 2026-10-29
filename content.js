/* content.js ｜ PROFILE → DOM：首屏 / 关于 / 技术栈 / 作品卡（两张内联 SVG）/ 纪实 / 联系 / 抽屉正文；依赖 profile.js 与 utils.js */
(function () {
  var PW = window.PW, P = window.PROFILE, F = PW.fill, E = PW.esc, H = PW.html;

  function chips(list) {
    return list.map(function (t) { return '<span class="chip">' + E(t) + '</span>'; }).join('');
  }

  /* ---------- 首屏 ---------- */
  function hero() {
    F('ldCode', P.site.code); F('ldName', P.person.name);
    F('navMark', P.person.initials); F('navName', P.person.name);
    F('heroBadge', P.hero.badge); F('heroHi', P.hero.hi);
    F('heroName', P.hero.name); F('avatarIni', P.person.initials);
    var l = P.hero.lead;
    H('heroLead', E(l[0]) + '<em>' + E(l[1]) + '</em>' + E(l[2]) + '<em>' + E(l[3]) + '</em>' + E(l[4]));
    F('heroDesc', P.hero.desc); F('heroBtn1', P.hero.btn1); F('heroBtn2', P.hero.btn2);
    document.getElementById('heroBtn2').href = P.person.resume;
    document.getElementById('navResume').href = P.person.resume;
    H('stats', P.stats.map(function (s) {
      return '<li class="stat"><span class="stat__v"><b class="num" data-count="' + s.value + '">0</b><i>' + E(s.unit) +
        '</i></span><span class="stat__l">' + E(s.label) + '</span></li>';
    }).join(''));
    H('traceBody', P.trace.rows.map(function (r, i) {
      return '<div class="trow' + (r.s ? ' trow--' + r.s : '') + '" style="--i:' + i + '"><span class="trow__k">' + E(r.k) +
        '</span><span class="trow__v">' + E(r.v) + '</span></div>';
    }).join(''));
    F('traceTitle', P.trace.title); F('traceFoot', P.trace.foot);
  }

  /* ---------- 关于我 ---------- */
  function about() {
    H('files', P.files.map(function (f) {
      return '<div><dt>' + E(f.k) + '</dt><dd>' + E(f.v) + '</dd></div>';
    }).join(''));
    H('intro', P.intro.map(function (p) { return '<p class="reveal">' + E(p) + '</p>'; }).join(''));
    F('wayTitle', P.ui.wayTitle);
    H('ways', P.ways.map(function (w) {
      return '<li class="reveal"><b>' + E(w.n) + '</b><div><h4>' + E(w.t) + '</h4><p>' + E(w.d) + '</p></div></li>';
    }).join(''));
  }

  /* ---------- 技术栈 ---------- */
  function stack() {
    var half = Math.ceil(P.marquee.length / 2);
    function items(a) { return a.map(function (t) { return '<span class="marquee__item">' + E(t) + '</span>'; }).join(''); }
    H('mq1', items(P.marquee.slice(0, half)).repeat(2));
    H('mq2', items(P.marquee.slice(half)).repeat(2));
    H('stackGrid', P.stack.map(function (g) {
      return '<article class="stackcard reveal"><div class="stackcard__h"><h3 class="stackcard__g">' + E(g.g) +
        '</h3><span class="stackcard__t">' + E(g.tag) + '</span></div>' +
        g.items.map(function (it) {
          return '<div class="skill"><span class="skill__n">' + E(it.name) + '</span><b class="skill__p">' + it.level +
            '</b><i class="skill__bar" style="--lv:' + it.level + '"><em></em></i></div>';
        }).join('') + '</article>';
    }).join(''));
  }

  /* ---------- 两张架构图 ---------- */
  function svgA() {
    return '<svg class="diagram" viewBox="0 0 520 300" role="img" aria-label="栖寓云双端架构示意">' +
      '<rect class="d-b" x="26" y="16" width="172" height="44" rx="10"/><text class="d-t" x="112" y="36" text-anchor="middle">C 端 · 租客</text><text class="d-s" x="112" y="50" text-anchor="middle">找房 / 签约 / 账单</text>' +
      '<rect class="d-b" x="322" y="16" width="172" height="44" rx="10"/><text class="d-t" x="408" y="36" text-anchor="middle">B 端 · 管家</text><text class="d-s" x="408" y="50" text-anchor="middle">房态 / 审批 / 派工</text>' +
      '<path class="d-line" d="M112 60 L112 84 L208 84 L208 112"/><path class="d-line" d="M408 60 L408 84 L312 84 L312 112"/>' +
      '<path class="d-flow" d="M120 96 L200 96 L200 112"/><path class="d-flow" d="M400 96 L320 96 L320 112"/>' +
      '<rect class="d-b d-b--hl" x="150" y="112" width="220" height="56" rx="12"/><text class="d-t" x="260" y="136" text-anchor="middle">FastAPI 网关</text><text class="d-s" x="260" y="152" text-anchor="middle">状态机 · 幂等</text>' +
      '<rect class="d-spark" x="150" y="112" width="220" height="56" rx="12"/>' +
      '<path class="d-line" d="M200 168 L96 168 L96 214"/><path class="d-line" d="M260 168 L260 214"/><path class="d-line" d="M320 168 L424 168 L424 214"/>' +
      '<rect class="d-b" x="26" y="214" width="140" height="42" rx="10"/><text class="d-t" x="96" y="240" text-anchor="middle">Redis</text>' +
      '<rect class="d-b" x="190" y="214" width="140" height="42" rx="10"/><text class="d-t" x="260" y="240" text-anchor="middle">MySQL</text>' +
      '<rect class="d-b" x="354" y="214" width="140" height="42" rx="10"/><text class="d-t" x="424" y="240" text-anchor="middle">Celery</text>' +
      '</svg>';
  }
  function svgB() {
    return '<svg class="diagram" viewBox="0 0 520 320" role="img" aria-label="NexusFlow 链路示意">' +
      '<text class="d-s" x="260" y="12" text-anchor="middle">interrupt → postgres checkpoint → resume</text>' +
      '<rect class="d-b" x="14" y="40" width="104" height="42" rx="10"/><text class="d-t" x="66" y="66" text-anchor="middle">SSE 入口</text>' +
      '<path class="d-line" d="M118 61 L164 61"/>' +
      '<rect class="d-b d-b--hl" x="164" y="34" width="164" height="54" rx="12"/><text class="d-t" x="246" y="56" text-anchor="middle">Supervisor</text><text class="d-s" x="246" y="71" text-anchor="middle">路由 / 记忆</text>' +
      '<rect class="d-spark" x="164" y="34" width="164" height="54" rx="12"/>' +
      '<path class="d-line" d="M204 88 L204 108 L150 108 L150 136"/><path class="d-line" d="M288 88 L288 108 L346 108 L346 136"/>' +
      '<rect class="d-b" x="56" y="136" width="188" height="48" rx="10"/><text class="d-t" x="150" y="156" text-anchor="middle">混合 RAG</text><text class="d-s" x="150" y="171" text-anchor="middle">BM25 + vec + rerank</text>' +
      '<rect class="d-b" x="270" y="136" width="188" height="48" rx="10"/><text class="d-t" x="364" y="156" text-anchor="middle">MCP 工具</text><text class="d-s" x="364" y="171" text-anchor="middle">查单 / 建工单</text>' +
      '<path class="d-line" d="M150 184 L150 208 L226 208 L226 234"/><path class="d-line" d="M364 184 L364 208 L294 208 L294 234"/>' +
      '<rect class="d-b d-b--warn" x="180" y="234" width="160" height="46" rx="10"/><text class="d-t" x="260" y="254" text-anchor="middle">HITL 审批</text><text class="d-s" x="260" y="269" text-anchor="middle">interrupt / resume</text>' +
      '<path class="d-dash" d="M226 136 L226 112 L250 98"/><text class="d-s" x="236" y="126">CRAG 不足 → 回退重检</text>' +
      '</svg>';
  }

  /* ---------- 作品卡 ---------- */
  function card(w, key, svg) {
    var kpis = w.metrics.map(function (m) {
      return '<div class="kpi"><span class="kpi__v"><b class="num" data-count="' + m.value + '">0</b><i>' + E(m.unit) +
        '</i></span><span class="kpi__l">' + E(m.label) + '</span><span class="kpi__note">' + E(m.note) + '</span></div>';
    }).join('');
    return '<article class="work reveal" data-key="' + key + '"><div class="work__info">' +
      '<div class="work__top"><span class="work__badge">' + E(w.badge) + '</span><span class="chip chip--brand">' + E(w.kind) + '</span></div>' +
      '<h3 class="work__name">' + E(w.name) + '</h3><p class="work__sub">' + E(w.sub) + '</p><p class="work__one">' + E(w.one) + '</p>' +
      '<div class="work__meta"><div><b>' + P.ui.roleLbl + '</b><span>' + E(w.role) + '</span></div></div>' +
      '<div class="work__tags">' + chips(w.tags) + '</div>' +
      '<div class="work__kpis">' + kpis + '</div>' +
      '<button class="btn btn--primary work__cta" type="button" data-open="' + key + '">' + E(P.works.cta) +
      ' <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg></button>' +
      '</div><div class="work__art"><span class="work__grid"></span>' + svg +
      '<p class="work__note">' + E(w.diagramNote) + '</p></div></article>';
  }

  function works() {
    F('worksTitle', P.works.title);
    H('worksSub', E(P.works.sub) + '<b>' + E(P.works.subStrong) + '</b>');
    H('worksList', card(P.fullstack, 'fullstack', svgA()) + card(P.agent, 'agent', svgB()));
    F('worksRel', P.works.relation);
  }

  /* ---------- 演示区 / 检索区标题 ---------- */
  function demoHeads() {
    F('demoTitle', P.demo.title); F('demoSub', P.demo.sub); F('demoWin', P.demo.win);
    F('demoQ', P.demo.question); F('tracePanelTitle', P.demo.traceTitle); F('runTitle', P.demo.runTitle);
    F('ragTitle', P.rag.title); F('ragTag', P.rag.tag);
  }

  /* ---------- 纪实 ---------- */
  function log() {
    F('logTitle', P.log.title); F('logSub', P.log.sub);
    H('timeline', P.log.roadmap.map(function (r) {
      return '<li class="phase"><p class="phase__d">' + E(r.d) + '</p><h4 class="phase__t">' + E(r.t) +
        '</h4><p class="phase__c">' + E(r.c) + '</p></li>';
    }).join(''));
    F('skinsTitle', P.log.skinsTitle);
    H('skins', P.log.skins.map(function (s) {
      return '<article class="card reveal"><h4>' + E(s.n) + '</h4><p>' + E(s.d) + '</p></article>';
    }).join(''));
    F('nextTitle', P.log.nextTitle);
    H('nextSteps', P.log.nextSteps.map(function (t) { return '<li class="reveal">' + E(t) + '</li>'; }).join(''));
  }

  /* ---------- 联系 ---------- */
  function contact() {
    F('contactTitle', P.contact.title); F('contactLead', P.contact.lead);
    var mail = document.getElementById('contactMail');
    PW.text(mail, P.person.email);
    mail.href = 'mailto:' + P.person.email;
    F('btnCopy', P.contact.btnCopy); F('btnGit', P.contact.btnGit); F('btnResume', P.contact.btnResume);
    document.getElementById('btnGit').href = P.person.github;
    document.getElementById('btnResume').href = P.person.resume;
    /* 简历下载兜底：先假定直链不可用，http(s) 下探测到 PDF 真的在，才交回浏览器原生下载；
       file:// 打开或探测失败（含静态面板不转发 PDF）时置 resumeBroken，由 ui.js 用内置 base64 生成 Blob 下载 */
    var isHttp = /^https?:$/.test(location.protocol);
    PW.resumeBroken = true;
    ['navResume', 'heroBtn2', 'btnResume'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (isHttp) el.setAttribute('download', '马豪杰-简历.pdf');
      else el.removeAttribute('download');
    });
    if (isHttp) {
      try {
        fetch(P.person.resume, { method: 'HEAD', cache: 'no-store' })
          .then(function (r) { PW.resumeBroken = !r.ok; })
          .catch(function () { });
      } catch (e) { }
    }
    H('contactMeta', P.contact.meta.map(function (m) {
      return '<div><dt>' + E(m.k) + '</dt><dd>' + E(m.v) + '</dd></div>';
    }).join(''));
    F('formTitle', P.contact.formTitle); F('formNote', P.contact.formNote); F('formSend', P.contact.submit);
    document.getElementById('fName').placeholder = P.contact.namePh;
    document.getElementById('fMsg').placeholder = P.contact.msgPh;
    F('footSign', P.site.sign); F('footMid', P.site.mid);
    document.title = P.site.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', P.site.desc);
  }

  /* ---------- 抽屉正文模板（顺序见 01 §13） ---------- */
  PW.drawerHTML = function (key) {
    var w = key === 'agent' ? P.agent : P.fullstack;
    var h = '<div class="dr__top"><p class="dr__badge">' + E(w.badge) + '</p><h3 class="dr__name">' + E(w.name) +
      '</h3><p class="dr__sub">' + E(w.sub) + '</p><p class="dr__one">' + E(w.one) + '</p><p class="dr__role"><b>' +
      P.ui.roleLbl + '</b>' + E(w.role) + '</p></div>';
    h += '<section class="dr__sec"><h4>' + P.ui.why + '</h4><p>' + E(w.why) + '</p></section>';
    h += '<section class="dr__sec"><h4>' + P.ui.stack + ' <em>' + P.ui.stackTag + '</em></h4><div class="dr__tags">' + chips(w.tags) + '</div></section>';
    if (key === 'agent') {
      h += '<section class="dr__sec"><h4>' + P.ui.agents + ' <em>' + P.ui.agentsTag + '</em></h4><div class="dr__two">' +
        w.agents.map(function (a) {
          return '<div><h5>' + E(a.r) + '</h5><ul><li>' + E(a.d) + '</li></ul></div>';
        }).join('') + '</div></section>';
    } else {
      h += '<section class="dr__sec"><h4>' + P.ui.loop + ' <em>' + P.ui.loopTag + '</em></h4><div class="dr__two">' +
        '<div><h5>' + E(w.loops.c.t) + '</h5><ul>' + w.loops.c.items.map(function (i) { return '<li>' + E(i) + '</li>'; }).join('') + '</ul></div>' +
        '<div><h5>' + E(w.loops.b.t) + '</h5><ul>' + w.loops.b.items.map(function (i) { return '<li>' + E(i) + '</li>'; }).join('') + '</ul></div>' +
        '</div></section>';
    }
    h += '<section class="dr__sec"><h4>' + P.ui.solutions + ' <em>' + P.ui.solutionsTag + '</em></h4><ol class="dr__list">' +
      w.challenges.map(function (c, i) {
        return '<li><b>' + ('0' + (i + 1)).slice(-2) + '</b><h5>' + E(c.t) + '</h5><p>' + E(c.d) + '</p></li>';
      }).join('') + '</ol></section>';
    h += '<section class="dr__sec"><h4>' + P.ui.metrics + ' <em>' + P.ui.metricsTag + '</em></h4><div class="dr__metrics">' +
      w.metrics.map(function (m) {
        return '<div class="dr__m"><b data-count="' + m.value + '">0</b><i>' + E(m.unit) + '</i><span>' + E(m.label) +
          '</span><em>' + E(m.note) + '</em></div>';
      }).join('') + '</div></section>';
    h += '<section class="dr__sec"><h4>' + P.ui.caliber + '</h4><p class="dr__caliber">' + E(w.caliber) + '</p></section>';
    h += '<div class="dr__foot"><button class="btn btn--primary" type="button" data-demo>' + P.ui.drawerDemo +
      '</button><button class="btn btn--ghost" type="button" data-close>' + P.ui.drawerClose + '</button></div>';
    return h;
  };

  PW.build = function () {
    hero(); about(); stack(); works(); demoHeads(); log(); contact();
  };
})();
