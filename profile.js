/* profile.js ｜ 全站唯一文案与数据中心：window.PROFILE；不依赖任何脚本，改文案只改这里 */
window.PROFILE = {
  site: {
    title: '马豪杰 · AI 应用开发 / Python 全栈 · 求职作品集',
    desc: '2027 届普通本科毕业生的两个完整系统：栖寓云长租公寓双端平台，与跑在其业务域上的 NexusFlow 多智能体工单审批中枢。',
    code: '栖寓云 // NexusFlow',
    sign: '© 2026 马豪杰',
    mid: 'QIYU CLOUD × NEXUSFLOW · 手写原生 CSS / JS，无框架依赖',
    nojs: '本页面需要开启 JavaScript 才能播放动画与加载作品数据。'
  },
  person: {
    name: '马豪杰', initials: 'MHJ',
    tagline: '2027 届 · 普通本科 · 计算机科学与技术',
    role: 'AI 应用开发 / Python 全栈',
    email: '3156018475@qq.com', phone: '15239664796',
    github: 'https://github.com/mahaojie', wechat: 'Mma060326',
    resume: 'assets/mahaojie-resume.pdf'
  },
  intro: [
    '我不是科班竞赛选手，普通本科毕业，大三大四靠自学把工程能力补齐。',
    '一年时间，我做了两个完整作品：一个能跑通 C 端下单与 B 端管控的租房交易平台，一个带人工审批闭环的多智能体工单中枢。',
    '我在意的不是「调用了一次大模型」，而是它能不能挂上服务、扛住并发、出错能自愈、指标能量化。'
  ],
  ways: [
    { n: '01', t: '业务闭环优先', d: '先让 C 端请求真的能走到 B 端审批再回到用户手里，再谈模型有多聪明。' },
    { n: '02', t: '工程细节可讲', d: '幂等键、乐观锁、状态跃迁、死信重试、断点恢复——每个坑我都踩过并能复述。' },
    { n: '03', t: '结论要有数字', d: '优化前后各跑一次，压测与评测集口径写清楚，不接受「感觉变快了」。' }
  ],
  files: [
    { k: '出身', v: '普通二本 · 非竞赛选手' },
    { k: '方向', v: 'AI 应用开发 / Python 全栈' },
    { k: '习惯', v: '先跑通闭环，再抠性能与指标' },
    { k: '城市', v: '不限 · 可远程 · 随时到岗' }
  ],
  nav: [
    { id: 'about', label: '关于' }, { id: 'stack', label: '技术栈' }, { id: 'works', label: '作品' },
    { id: 'demo', label: 'Agent 演示' }, { id: 'log', label: '纪实' }, { id: 'contact', label: '联系' }
  ],
  hero: {
    badge: '● 2027 届 · 普通本科 · 计算机科学与技术',
    hi: '你好，我是', name: '马豪杰',
    lead: ['我把', '会聊天的 Demo', '写成', '能上线的系统', ' ——'],
    roles: ['Python 后端', 'AI Agent 应用开发', 'LangGraph 编排', '全栈独立交付'],
    desc: '一年时间，我独立做完两个能跑通真实业务的系统：一个是扛住并发与状态机的租房双端平台，一个是带人工审批闭环的多智能体工单中枢。',
    btn1: '查看两个作品', btn2: '下载简历', scroll: 'SCROLL'
  },
  stats: [
    { value: 12, unit: '个月', label: '脱产自学与工程实践' },
    { value: 2, unit: '套', label: '从零搭建的完整作品' },
    { value: 12, unit: '个', label: '封装成 MCP 的业务工具' },
    { value: 26000, unit: '+', label: '核心代码行数（不含依赖）' }
  ],
  trace: {
    title: 'nexusflow · trace',
    rows: [
      { k: 'intent', v: '退租扣款申诉', s: '' },
      { k: 'route', v: 'Retrieval → Action', s: '' },
      { k: 'rag', v: 'bm25+vec → rrf → rerank 0.87', s: '' },
      { k: 'risk', v: '¥1,800 > 阈值 → interrupt', s: 'warn' },
      { k: 'hitl', v: '管理员批准 → resume', s: 'ok' }
    ],
    foot: 'state persisted · postgres checkpointer'
  },
  marquee: ['Python 3.12', 'FastAPI', 'Asyncio', 'SSE', 'LangGraph', 'Pydantic v2', 'MCP · FastMCP', 'Function Calling', 'PostgreSQL', 'pgvector', 'Redis',
    'BM25 混合检索', 'RRF 融合', 'BGE-Reranker', 'CRAG', 'Human-in-the-Loop', 'Langfuse', 'Ragas', 'Docker Compose', 'Nginx', 'Vue 3', 'TypeScript'],
  stack: [
    { g: '服务与网关层', tag: '把 Demo 变成常驻服务', items: [
      { name: 'FastAPI + Asyncio', level: 88 }, { name: 'SSE 双流式推送', level: 82 }, { name: 'Pydantic v2 结构化输出', level: 86 }] },
    { g: 'Agent 编排与工具层', tag: '让模型按流程干活', items: [
      { name: 'LangGraph 状态图 / Checkpointer', level: 85 }, { name: 'Supervisor 多智能体路由', level: 80 }, { name: 'FastMCP 工具服务', level: 84 }] },
    { g: '数据与检索层', tag: '让答案有据可查', items: [
      { name: 'PostgreSQL + pgvector', level: 83 }, { name: '父子分块 / BM25 + 向量混合检索', level: 79 }, { name: 'Redis 语义缓存与限流', level: 76 }] },
    { g: '工程与质量层', tag: '出了问题能查、能说清代价', items: [
      { name: 'Langfuse 全链路 Trace', level: 81 }, { name: 'Ragas 检索与忠实度评测', level: 77 }, { name: 'Docker Compose / Nginx 部署', level: 74 }] }
  ],
  works: {
    title: '两个作品',
    sub: '一个全栈作品 + 一个 Agent 作品，跑在同一套业务域上：',
    subStrong: 'NexusFlow 处理的正是栖寓云产生的租约工单。',
    relation: '两个作品共用一套业务域：栖寓云产生真实的租约与工单数据，NexusFlow 把这些数据变成可被 Agent 安全查询、操作和审批的对象。前者是后者的业务底座。',
    cta: '案例拆解'
  },
  fullstack: {
    key: 'fullstack',
    badge: 'PROJECT A · 双端业务闭环', kind: '全栈作品', name: '栖寓云',
    sub: '长租公寓预订与运营管理系统',
    one: 'C 端找房签约、B 端房态与合同管控，一条租约从看房到退租全程可追溯。',
    why: '选题时我刻意避开纯增删改查：租房天然带「稀缺库存 + 长周期状态机 + 资金结算」三个硬问题，能把并发、一致性和审批流一次性考完。',
    role: '独立全栈（前端 + 后端 + 部署）',
    tags: ['Vue 3 + TypeScript', 'FastAPI', 'SQLAlchemy 2.0', 'MySQL 8', 'Redis', 'Celery', '对象存储', 'Docker Compose', 'Nginx'],
    loops: {
      c: { t: 'C 端 · 租客', items: ['地图/地铁找房', '房源对比与预约看房', '在线签约与支付', '水电账单与报修', '退租结算'] },
      b: { t: 'B 端 · 运营', items: ['房源与房态看板', '合同审批流', '价格与促销活动', '账单出账与对账', '报修工单派发'] }
    },
    challenges: [
      { t: '稀缺库存并发下单，做到零超卖', d: '看房档期与房源锁定用 Redis SETNX + Lua 原子释放，DB 侧再叠一版 version 乐观锁；请求带幂等键，重复提交直接命中已有订单，不做二次扣减。' },
      { t: '合同状态机 + 事件流水', d: '草稿、待审、生效、续租、解约、退租结算 6 态 12 转移用声明式配置约束，非法跃迁在网关层就拒；每次跃迁落一条事件，B 端能看到「谁在什么时候把状态推到哪一步」。' },
      { t: '多租户隔离与出账任务', d: '管家/门店/运营三种角色共用一套库，查询强制注入 tenant_id 与可见房源范围；每月出账走 Celery 分片任务，失败任务进死信重试表，避免账单漏出或重出。' },
      { t: '查询与体验优化', d: '列表页读写分离 + Redis 缓存版本号失效；附近房源用 GEO 半径筛选再回表补详情；图片走对象存储 + CDN，前端路由懒加载。' }
    ],
    metrics: [
      { label: '压测并发下单超卖', value: 0, unit: '笔', note: '200 并发抢 5 套房源，重复提交 40 次' },
      { label: '订单接口 P99', value: 420, unit: 'ms', note: 'Locust 200 用户 / 5 分钟，缓存命中与穿透混合' },
      { label: '列表首屏接口耗时下降', value: 70, unit: '%', note: '加缓存 + 覆盖索引前后对比' },
      { label: '非法状态跃迁拦截', value: 100, unit: '%', note: '状态机用例 24 条全绿' }
    ],
    caliber: '全部指标在本地 Docker Compose 环境测得：Locust 以 200 并发打订单接口 5 分钟，超卖与重复下单查订单表比对；pytest 覆盖合同状态机 24 条跃迁用例；耗时优化前后用 MySQL 慢查询日志与接口埋点对比。',
    diagramNote: '200 并发抢 5 套房源 → 分布式锁 + 乐观锁'
  },
  agent: {
    key: 'agent',
    badge: 'PROJECT B · 多智能体 + 人工介入', kind: 'Agent 作品', name: 'NexusFlow',
    sub: '企业级智能工单与业务协同中枢',
    one: '复杂意图识别 → 排障知识检索 → 业务工具操作 → 高危退款人工审批，一条链路全跑通。',
    why: '工单来源就是栖寓云的真实业务：租客报修、退租争议、扣款申诉。Agent 不是对着假数据聊天，而是操作一套有权限边界、有资金动作、有审计要求的系统。',
    role: '独立后端 + Agent 架构（LangGraph / MCP / RAG）',
    tags: ['LangGraph', 'Supervisor 多智能体', 'FastMCP', 'Function Calling', 'pgvector', 'BM25 + RRF', 'BGE-Reranker', 'CRAG', 'HITL interrupt', 'Redis 语义缓存', 'Langfuse', 'Ragas', 'PostgreSQL Checkpointer'],
    agents: [
      { r: 'Supervisor', d: '意图识别与路由，决定走检索、走工具，还是直接拒答' },
      { r: 'TriageAgent', d: '工单归类、紧急度打分、字段补全' },
      { r: 'RetrievalAgent', d: '混合检索 + 重排 + 引用溯源，答不出就明说' },
      { r: 'ActionAgent', d: '调用 MCP 工具：查租约、建工单、改派期、发起退款' },
      { r: 'RiskGate', d: '金额与权限双阈值判定，命中就 interrupt 挂起等人审' },
      { r: 'ReporterAgent', d: '汇总结构化回复与操作回执，落 Trace' }
    ],
    challenges: [
      { t: '循环图状态编排，不是链式 Prompt', d: 'LangGraph 用带条件边的循环图做路由，检索不满意可以回退重查；每个节点读写同一个 Pydantic 状态模型，Checkpoint 落 PostgreSQL，进程重启后能断点续跑。' },
      { t: '混合 RAG + 自纠错 + 防幻觉', d: '文档父子分块，BM25 与 pgvector 双路召回做 RRF 融合，BGE-Reranker 精排；CRAG 判断相关性不足就改写 query 重检一次，仍不合格直接走拒答分支，不允许模型凭空补。' },
      { t: 'MCP 标准化工具层', d: '查租约、建工单、改派期、发起退款等业务动作全部以 FastMCP 服务暴露，Agent 侧只认 schema；工具超时或参数不合法会触发一次参数修正重试，连续失败则降级为人工工单。' },
      { t: '高危操作人工介入闭环', d: '退款金额超阈值或涉及解约扣款时，图在 RiskGate 节点 interrupt 挂起，状态持久化；B 端管理员在审批台看到完整推理轨迹与依据后批准/驳回，服务端用 thread_id 恢复执行，全程留痕。' },
      { t: '双流式输出与语义缓存', d: 'SSE 同时推 Token 流与节点状态流，前端能看到「现在在哪一步、卡在哪」；高频问答走 Redis 语义缓存，命中直接返回并把 trace 标为 cached。' }
    ],
    metrics: [
      { label: '检索召回率', value: 91, unit: '%', note: 'Ragas 黄金测试集，基线 64% → 混合检索+重排后 91%' },
      { label: '首字延迟下降', value: 45, unit: '%', note: '语义缓存 + 双层 SSE，Langfuse 统计' },
      { label: 'Token 成本节约', value: 38, unit: '%', note: '父子分块压缩上下文 + 缓存命中' },
      { label: '高危操作漏放', value: 0, unit: '次', note: '200 条对抗样本，全部走人工审批' }
    ],
    caliber: '评测集是我自己标的 200 条问答对（含 30 条「应拒答」负样本），用 Ragas 跑 context_recall / faithfulness / answer_relevancy；baseline 是只用 pgvector 的纯向量检索。延迟与 Token 成本从 Langfuse 的项目级统计导出，缓存命中与非命中分开计。',
    diagramNote: 'interrupt → postgres checkpoint → resume'
  },
  demo: {
    title: '现场演示',
    sub: '一次「退租扣款申诉」工单的完整链路：意图路由 → 混合检索 → 工具调用 → 风险闸门挂起 → 人工审批 → 断点恢复。',
    win: 'POST /agent/run · SSE',
    btnPlay: '▶ 播放', btnReset: '↺ 重置', btnApprove: '✓ 批准退款', btnApproved: '✓ 已批准',
    question: '我上个月退租，押金扣了 1800，我觉得不合理，帮我查下依据并退给我。',
    traceTitle: 'LANGFUSE TRACE', runTitle: '本次运行',
    metrics: ['首字延迟', 'Token 消耗', '工具调用', '风险状态'],
    firstLatency: '412ms', riskIdle: 'idle', riskWait: 'awaiting human', riskDone: 'approved',
    nodes: ['意图路由', '混合检索', 'MCP 工具', '风险闸门', '人工审批', '断点恢复', '结构化回复'],
    done: '✓ 已完成', running: '● 运行中', wait: '⏸ 等待人工', ready: '○ 待运行'
  },
  rag: {
    title: '混合检索与自纠错',
    tag: 'Hybrid Retrieval · RRF · Rerank · CRAG',
    cols: ['BM25 关键词召回', 'pgvector 向量召回', 'RRF 融合 → BGE 精排'],
    noteCand: '候选片段 · 父文档已回补', noteRerank: '精排后进入上下文',
    pick: '入选'
  },
  log: {
    title: '开发纪实',
    sub: '两个系统分六个阶段长出来，每个阶段都有能验收的交付物，而不是一次性堆到最后。',
    roadmap: [
      { d: '阶段 01', t: '业务建模与数据层', c: '租约 / 房态 / 账单三套表结构与索引设计，合同 6 态 12 转移写成声明式配置，24 条跃迁用例先跑绿再往上盖楼。' },
      { d: '阶段 02', t: '双端主流程打通', c: 'C 端找房下单到 B 端审批派工的 5 条主链路端到端跑通，补上幂等键、分布式锁与失败补偿，先保证「能走通且不走样」。' },
      { d: '阶段 03', t: '并发与性能压测', c: 'Locust 打 200 并发抢 5 套房源，定位到超卖与重复提交两类问题；读写分离 + 缓存版本号失效，列表接口耗时降到原来的三成。' },
      { d: '阶段 04', t: '业务动作工具化', c: '把 12 个业务动作以 FastMCP 服务暴露，统一 schema 与错误码；工具超时或参数不合法先做一次自动修正重试，再降级为人工工单。' },
      { d: '阶段 05', t: 'Agent 编排与检索', c: 'LangGraph 循环图 + Supervisor 路由，Checkpoint 落 PostgreSQL；混合检索接 BGE 重排与 CRAG 回退，答不出就走拒答分支。' },
      { d: '阶段 06', t: '审批闭环与评测', c: 'RiskGate 用 interrupt 把高危退款挂起，B 端审批后按 thread_id 唤醒续跑；自建 200 条评测集跑 Ragas，Docker Compose 一键起全套。' }
    ],
    skinsTitle: '我做过的取舍',
    skins: [
      { n: '用 LangGraph 循环图，而不是链式 Prompt', d: '我要的是可回退、可挂起、可恢复的状态。代价是图与状态模型的设计成本比写提示词高得多，但出问题时能定位到节点。' },
      { n: '自建混合检索，而不是只用向量库', d: '纯向量在「押金」「4.2 条」这类精确词上召回不稳，加 BM25 与 RRF 融合后召回率明显抬升。代价是多一套索引与同步链路要维护。' },
      { n: '高危动作一律人工审批', d: '涉及资金和合同的动作，我宁愿牺牲自动化率也不让模型自判。代价是链路变长、首响变慢，但 200 条对抗样本里漏放为 0。' }
    ],
    nextTitle: '接下来想做的',
    nextSteps: [
      '评测集从 200 条扩到 500 条，并把「应拒答」负样本按比例分层，避免指标虚高。',
      '用一个小模型做意图预分类，Supervisor 只在模糊样本上调大模型，把 Token 成本再压一截。',
      '把审批台补成真正的多租户 B 端后台：权限矩阵、操作留痕、导出审计报表。',
      '给工单加多模态入口：租客上传损坏照片，走图像描述再进同一条检索与审批链路。'
    ]
  },
  contact: {
    title: '联系我',
    lead: '如果你需要一个能把 Agent 落到业务系统里的人',
    btnCopy: '复制邮箱', btnGit: 'GitHub', btnResume: '简历 PDF',
    meta: [{ k: '微信', v: 'Mma060326' }, { k: '电话', v: '15239664796' }, { k: '到岗', v: '随时 · 可远程' }],
    formTitle: '或者直接留句话',
    namePh: '怎么称呼你', msgPh: '想聊哪块技术细节？', submit: '发送',
    formNote: '本地演示表单：留言存在本机浏览器（LocalStorage），不外发、换设备看不到。',
    msgCount: '本机已存 ', msgCount2: ' 条', msgEmpty: '本机暂无留言', msgClear: '清空'
  },
  ui: {
    why: '为什么做这个', stack: '技术选型', stackTag: 'STACK',
    loop: '双端业务闭环', loopTag: 'CLOSED LOOP',
    agents: '六个角色的分工', agentsTag: 'MULTI-AGENT',
    solutions: '难点与我的解法', solutionsTag: 'SOLUTIONS',
    metrics: '量化指标', metricsTag: 'METRICS', caliber: '指标口径',
    drawerDemo: '看 Agent 演示', drawerClose: '关闭',
    wayTitle: '我的做事方式', fileTitle: '档案',
    roleLbl: '我的角色', tagLbl: '技术标签'
  },
  toast: {
    dark: '已切到深色', light: '已切到浅色', resume: '已开始下载简历',
    copied: '邮箱已复制 · ', blocked: '已选中邮箱，按 Ctrl+C 复制',
    formErr: '称呼和留言都填一下', formOk: '已记录：', formOk2: '，我会尽快回你',
    msgSaved: '已存到本机浏览器', msgCleared: '已清空本机留言'
  }
};
