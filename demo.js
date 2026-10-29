/* demo.js ｜ Agent 播放器状态机：剧本数组在文件顶部，七节点四态灯 + 终端逐行 + Trace 追加 + Token 累加，第 10 步真挂起等批准；依赖 utils / profile */
(function () {
  var PW = window.PW, P = window.PROFILE, D = PW.demo = {};

  /* 播放剧本（15 步，d = 距上一步毫秒；第 10 步 wait 真停） */
  var SCRIPT = [
    { n: 0, tag: 'supervisor', c: 'purple', d: 500, t: '识别意图 = 退租扣款申诉 / 置信度 0.94' },
    { n: 0, tag: 'state', c: 'purple', d: 900, t: '写入 LangGraph 状态：tenant=T-2231, lease=L-0416' },
    { n: 1, tag: 'retrieval', c: 'cyan', d: 850, t: 'query 改写 → BM25(12) + pgvector(12)' },
    { n: 1, tag: 'rerank', c: 'cyan', d: 900, t: 'RRF 融合 → BGE-Reranker，Top1《租约违约条款 4.2》0.87' },
    { n: 1, tag: 'crag', c: 'green', d: 800, t: '相关性判定 pass，附引用 doc#lease-4.2' },
    { n: 2, tag: 'mcp', c: 'white', d: 950, t: 'qiyu.get_lease(T-2231) → 押金 3600，扣款 1800 无结算单' },
    { n: 2, tag: 'retry', c: 'yellow', d: 850, t: '工具参数校验失败 1 次 → 自动修正重试成功' },
    { n: 2, tag: 'mcp', c: 'white', d: 900, t: 'qiyu.create_ticket(type=DEPOSIT_DISPUTE) → WO-98213' },
    { n: 3, tag: 'risk_gate', c: 'yellow', d: 1000, t: '退款 ¥1800 > 阈值 ¥500 且涉及资金 → 判定高危' },
    { n: 3, tag: 'interrupt', c: 'red', d: 1100, wait: true, t: '图在 RiskGate 挂起，checkpoint 落库 thread_id=sess-7f3a 〔HUMAN〕' },
    { n: 4, tag: 'admin', c: 'red', d: 0, t: 'B 端审批台展示推理轨迹 + 引用条款 + 工具回执' },
    { n: 5, tag: 'resume', c: 'green', d: 800, t: '批准 → Command(resume) 唤醒，从挂起节点继续' },
    { n: 5, tag: 'mcp', c: 'white', d: 900, t: 'qiyu.refund(WO-98213, approved_by=admin_li) → SUCCESS' },
    { n: 6, tag: 'report', c: 'green', d: 900, t: '生成结构化回复：扣款依据缺失，已退回 ¥1800，预计 T+1 到账' },
    { n: 6, tag: 'trace', c: 'green', d: 700, end: true, t: 'Langfuse 落 Trace：13 节点 / 2 工具 / 1 次挂起等待' }
  ];
  var HUMAN = { tag: 'human', t: '管理员 李经理 批准：¥1800 全额退回，理由 缺水电结算单', c: 'green' };
  var els = {}, ST = null;

  function id(x) { return document.getElementById(x); }
  function fresh() { return { i: 0, timer: 0, run: false, wait: false, done: false, tok: 0, tools: 0 }; }
  function slow() { return PW.rm || PW.isStatic ? 40 : 0; }

  function line(tag, txt, cls) {
    var d = document.createElement('div');
    d.className = 'tl tl--' + cls;
    d.innerHTML = '<span class="tl__tag">' + PW.esc(tag) + '</span><span class="tl__tx">' + PW.esc(txt) + '</span>';
    els.term.appendChild(d);
    els.term.scrollTop = els.term.scrollHeight;
  }
  function trace(label, ms) {
    var li = document.createElement('li');
    li.className = 'tr';
    li.innerHTML = '<span class="tr__l">' + PW.esc(label) + '</span><span class="tr__d">+' + ms + 'ms</span>';
    els.trace.appendChild(li);
    els.trace.scrollTop = els.trace.scrollHeight;
  }
  function kpi() {
    id('rk1').textContent = PW.fmt(ST.tok);
    id('rk2').textContent = String(ST.tools);
  }
  function risk(v) { id('rk3').textContent = v; }
  function status(kind) {
    var map = { run: ['is-run', P.demo.running], wait: ['is-wait', P.demo.wait], done: ['is-done', P.demo.done], ready: ['', P.demo.ready] };
    els.status.className = 'winbar__st ' + map[kind][0];
    els.status.textContent = map[kind][1];
  }
  function light(n) {
    els.nodeEls.forEach(function (el, i) {
      el.classList.remove('is-active', 'is-wait');
      if (i < n) el.classList.add('is-done');
      if (i === n) el.classList.add('is-active');
    });
  }

  function step() {
    if (ST.i >= SCRIPT.length) { finish(); return; }
    var s = SCRIPT[ST.i++];
    light(s.n);
    line(s.tag, s.t, s.c);
    ST.tok += Math.round(PW.rand(38, 96));
    if (s.tag === 'mcp') ST.tools++;
    trace(s.tag, Math.round(PW.rand(18, 140)));
    kpi();
    if (s.tag === 'risk_gate') risk(P.demo.riskWait);
    if (s.wait) { hold(); return; }
    if (s.end) { finish(); return; }
    ST.timer = setTimeout(step, slow() || s.d);
  }

  /* 挂起：真停下，等「批准退款」 */
  function hold() {
    ST.run = false;
    ST.wait = true;
    status('wait');
    risk(P.demo.riskWait);
    els.nodeEls[4].classList.add('is-wait');
    els.app.disabled = false;
  }

  function approve() {
    if (!ST.wait) return;
    ST.wait = false;
    ST.run = true;
    els.app.disabled = true;
    els.app.classList.add('is-approved');
    els.app.textContent = P.demo.btnApproved;
    risk(P.demo.riskDone);
    light(4);
    els.nodeEls[4].classList.remove('is-wait');
    line(HUMAN.tag, HUMAN.t, HUMAN.c);
    trace('hitl.resume', 26);
    ST.tok += Math.round(PW.rand(20, 50));
    kpi();
    status('run');
    ST.timer = setTimeout(step, slow() || 320);
  }

  function finish() {
    ST.run = false;
    ST.wait = false;
    ST.done = true;
    els.nodeEls.forEach(function (el) { el.classList.remove('is-active', 'is-wait'); el.classList.add('is-done'); });
    status('done');
    risk(P.demo.riskDone);
    els.app.disabled = true;
    els.app.classList.add('is-approved');
    els.app.textContent = P.demo.btnApproved;
  }

  function reset() {
    clearTimeout(ST.timer);
    ST = fresh();
    els.term.innerHTML = '';
    els.trace.innerHTML = '';
    els.nodeEls.forEach(function (el) { el.classList.remove('is-active', 'is-done', 'is-wait'); });
    els.app.disabled = true;
    els.app.classList.remove('is-approved');
    els.app.textContent = P.demo.btnApprove;
    status('ready');
    risk(P.demo.riskIdle);
    kpi();
  }

  D.play = function () {
    if (ST.run || ST.wait) return;
    if (ST.done) reset();
    ST.run = true;
    status('run');
    step();
  };
  D.reset = reset;
  D.approve = approve;
  D.state = function () { return { i: ST.i, run: ST.run, wait: ST.wait, done: ST.done, tools: ST.tools }; };

  D.init = function () {
    els.term = id('term'); els.trace = id('traceList'); els.status = id('demoStatus');
    els.play = id('btnPlay'); els.reset = id('btnReset'); els.app = id('btnApprove'); els.kpis = id('runKpis');
    id('flowNodes').innerHTML = P.demo.nodes.map(function (n, i) {
      return '<div class="node" data-i="' + i + '"><i class="node__led"></i><span class="node__n">0' + (i + 1) +
        '</span><span class="node__t">' + PW.esc(n) + '</span></div>';
    }).join('');
    els.nodeEls = PW.qsa('.node', id('flowNodes'));
    els.kpis.innerHTML = P.demo.metrics.map(function (m, i) {
      var v = i === 0 ? P.demo.firstLatency : (i === 3 ? P.demo.riskIdle : '0');
      return '<div class="rk"><b id="rk' + i + '">' + v + '</b><i>' + PW.esc(m) + '</i></div>';
    }).join('');
    els.play.textContent = P.demo.btnPlay;
    els.reset.textContent = P.demo.btnReset;
    els.app.textContent = P.demo.btnApprove;
    els.app.disabled = true;
    ST = fresh();
    els.play.addEventListener('click', D.play);
    els.reset.addEventListener('click', reset);
    els.app.addEventListener('click', approve);
    /* 首次滚进该区域自动播一次 */
    PW.observe('#player', function () { setTimeout(D.play, 600); }, { threshold: 0.35 });
  };
})();
