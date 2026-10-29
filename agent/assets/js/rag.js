/* rag.js ｜ 混合检索演示：用例数组在文件顶部，三列分数条逐条错峰、精排 Top1 绿描边、结论逐字打出、拒答用例转红；依赖 utils / profile */
(function () {
  var PW = window.PW, P = window.PROFILE, R = PW.rag = {}, els = {}, cur = -1;

  /* 三个可点查询（分数字段 = 原值 × 100 的百分比宽度） */
  var CASES = [
    {
      q: '押金退还依据', danger: false,
      bm25: [['退租结算细则', 0.62], ['租约违约条款 4.2', 0.78], ['水电分摊说明', 0.31]],
      vec: [['《租赁合同》第七章', 0.71], ['租约违约条款 4.2', 0.66], ['历史工单 WO-88120', 0.52]],
      rank: [['租约违约条款 4.2', 0.87, 1], ['退租结算细则', 0.74, 0], ['《租赁合同》第七章', 0.68, 0]],
      concl: 'CRAG 判定相关性 pass：Top1 0.87 ≥ 0.6，允许进入生成，并强制引用 doc#lease-4.2。'
    },
    {
      q: '中介费能不能开发票', danger: false,
      bm25: [['发票与开票主体说明', 0.55], ['平台服务费规则', 0.44], ['押金冻结流程', 0.12]],
      vec: [['平台服务费规则', 0.69], ['发票与开票主体说明', 0.63], ['经纪服务协议', 0.58]],
      rank: [['发票与开票主体说明', 0.82, 1], ['平台服务费规则', 0.79, 0], ['经纪服务协议', 0.51, 0]],
      concl: 'RRF 融合后两路互补：关键词命中「发票」，向量命中「开票主体」，重排取并集第一。'
    },
    {
      q: '这个房源能砍到两千吗', danger: true,
      bm25: [['促销活动日历', 0.21], ['定价策略手册', 0.18], ['租约违约条款 4.2', 0.09]],
      vec: [['促销活动日历', 0.34], ['定价策略手册', 0.29], ['同地段成交参考', 0.22]],
      rank: [['促销活动日历', 0.31, 0], ['定价策略手册', 0.27, 0]],
      concl: 'CRAG 判定相关性不足 → 改写 query 重检一次仍不过阈值 → 走拒答分支，转人工议价工单，不允许模型编造价格。'
    }
  ];

  function type(el, txt) {
    el.textContent = '';
    if (PW.rm || PW.isStatic) { el.textContent = txt; return; }
    var i = 0;
    (function tick() {
      el.textContent = txt.slice(0, ++i);
      if (i < txt.length) setTimeout(tick, 16);
    })();
  }

  function colHTML(col) {
    return '<div class="rcol"><h3 class="rcol__h">' + PW.esc(col.h) + '</h3><span class="rcol__n">' + PW.esc(col.note) + '</span>' +
      col.data.map(function (it) {
        var pick = col.pick && it[2];
        return '<div class="hit' + (pick ? ' is-pick' : '') + '" data-w="' + it[1] + '"><span class="hit__bar"></span>' +
          '<div class="hit__row"><span class="hit__t">' + PW.esc(it[0]) + '</span><span class="hit__s">' + it[1].toFixed(2) +
          '</span></div>' + (pick ? '<b class="hit__pick">' + P.rag.pick + '</b>' : '') + '</div>';
      }).join('') + '</div>';
  }

  function pick(i) {
    cur = i;
    var c = CASES[i];
    PW.qsa('.qbtn', els.q).forEach(function (b, k) {
      b.classList.toggle('is-on', k === i);
      b.classList.toggle('is-danger', k === i && c.danger);
    });
    var cols = [
      { h: P.rag.cols[0], note: P.rag.noteCand, data: c.bm25, pick: false },
      { h: P.rag.cols[1], note: P.rag.noteCand, data: c.vec, pick: false },
      { h: P.rag.cols[2], note: P.rag.noteRerank, data: c.rank, pick: true }
    ];
    els.cols.innerHTML = cols.map(colHTML).join('');
    PW.qsa('.rcol', els.cols).forEach(function (col) {
      PW.qsa('.hit', col).forEach(function (h, k) {
        var w = (parseFloat(h.getAttribute('data-w')) * 100).toFixed(0) + '%';
        var bar = h.querySelector('.hit__bar');
        if (PW.rm || PW.isStatic) { bar.style.width = w; return; }
        setTimeout(function () { bar.style.width = w; }, 70 + k * 90);
      });
    });
    els.concl.classList.toggle('is-danger', !!c.danger);
    type(els.concl, c.concl);
  }

  R.init = function () {
    els.q = document.getElementById('ragQ');
    els.cols = document.getElementById('ragCols');
    els.concl = document.getElementById('ragConcl');
    els.q.innerHTML = CASES.map(function (c, i) {
      return '<button class="qbtn' + (i === 0 ? ' is-on' : '') + '" type="button" data-q="' + i + '">' + PW.esc(c.q) + '</button>';
    }).join('');
    PW.on(els.q, 'click', '.qbtn', function () { pick(parseInt(this.getAttribute('data-q'), 10)); });
    pick(0);
    PW.observe('#rag', function () { pick(cur); }, { threshold: 0.15 });
  };
})();
