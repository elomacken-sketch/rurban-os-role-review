const goalLabels = {
  overall_plan: "整体推进",
  content_growth: "吸引更多顾客",
  merchant_collaboration: "让商户参加",
  merchant_attraction: "联系新品牌",
};

const audienceLabels = {
  mixed: "消费者、游客与潜在商户",
  young_local: "本地年轻消费者",
  visitors: "游客与外来消费者",
  merchants: "潜在商户与合作方",
};

const budgetLabels = {
  "待确认": "暂不锁定",
  "5000元以内": "5,000 元以内",
  "5000至20000元": "5,000–20,000 元",
  "20000元以上": "20,000 元以上",
};

const stateLabels = {
  available: "可以使用",
  pending: "要确认",
  missing: "还没记录",
};

const priorityLabels = {
  "内容生产": "先做内容",
  "商户与现场": "先确定商户和现场",
  "招商推进": "先联系新品牌",
  "数据验证": "先记录顾客和商户反馈",
};

const roleLabels = {
  owner: "老板",
  operations: "运营",
  leasing: "招商",
  merchant: "商户",
};

const roleNavigation = {
  owner: {
    label: "老板页面",
    items: [
      { key: "owner-overview", question: "q1", title: "这个月项目怎么样？", subtitle: "结果、问题和要决定的事" },
    ],
  },
  operations: {
    label: "运营页面",
    items: [
      { key: "operations-today", question: "q2", title: "今天要做什么？", subtitle: "待办、要确认和还缺的资料" },
      { key: "operations-calendar", question: "q2", target: ".calendar-work", title: "本月怎么安排？", subtitle: "日期、活动和负责人" },
      { key: "operations-content", question: "q2", target: ".operations-content-studio", title: "要发布什么内容？", subtitle: "文案、图片和视频" },
    ],
  },
  leasing: {
    label: "招商页面",
    items: [
      { key: "leasing-overview", question: "q3", title: "接下来应该联系谁？", subtitle: "品牌名称、联系结果和卡住的事" },
      { key: "leasing-candidates", question: "q3", target: "#candidatePreparation", title: "适合联系哪些品牌？", subtitle: "适合类型和原因" },
      { key: "leasing-ammo", question: "q3", target: ".leasing-detail-grid", title: "可以发送什么材料？", subtitle: "场地、内容和项目介绍" },
      { key: "leasing-merchants", question: "q3", target: ".merchant-task-work", title: "商户参加得怎么样？", subtitle: "要做的事和提交情况" },
    ],
  },
};

const state = {
  question: "q1",
  role: "owner",
  step: 1,
  goal: "overall_plan",
  audience: "mixed",
  budget: "待确认",
  priority: "内容生产",
  result: null,
  ownerDelivery: null,
  adopted: false,
  activeBrief: "brief-summary",
  navKey: "owner-overview",
  merchantStep: 1,
  merchantCompleted: 0,
};

const platformContent = {
  xiaohongshu: {
    label: "本月准备发布 · 小红书",
    headline: "一座城市的味道，如何被重新装进口袋？",
    lead: "用一个具体味道、一个人物故事和一段现场体验，让读完内容的人产生到店理由。",
    preview: "小红书发布预览",
    image: "assets/place-dining.jpg",
  },
  wechat: {
    label: "本月准备发布 · 公众号",
    headline: "地方食物，不只是被保存，也可以重新进入城市生活",
    lead: "从项目介绍、地方食物和场地使用三个方面，说明这个月为什么值得来。",
    preview: "公众号长文预览",
    image: "assets/place-market.jpg",
  },
  video: {
    label: "本月准备发布 · 短视频",
    headline: "跟着一条味觉路线，在地方口袋里走一圈",
    lead: "用人物、产品和现场路线组成短视频脚本，确定参加商户和拍摄图片后再开始制作。",
    preview: "短视频封面预览",
    image: "assets/place-hero.jpg",
  },
};

const leadProfiles = {
  "local-food": {
    title: "地方食物代表品牌",
    reason: "有明确产地、人物和产品故事，可以持续对外介绍。",
    location: "主入口内容展示位 / 可以体验的餐饮位置",
    verify: "需要哪些合作条件、是否适合现场、品牌是否愿意参加、有没有合适铺位",
    action: "填写具体品牌名称，再准备针对这个品牌的介绍材料",
  },
  creator: {
    title: "主理人餐饮品牌",
    reason: "有鲜明的主理人故事，适合一起做月度主题、限定产品和现场活动。",
    location: "主题餐饮区 / 周末活动位置",
    verify: "产品是否稳定、愿意怎样参加活动、团队能否配合、需要什么条件",
    action: "先填写具体品牌名称，再联系确认是否愿意参加",
  },
  culture: {
    title: "地方文化产品品牌",
    reason: "能把地方文化做成游客看得懂、方便携带、愿意购买的产品。",
    location: "游客经过的位置 / 内容和零售组合区",
    verify: "产品价格、游客是否需要、怎样陈列、适合哪个铺位",
    action: "填写具体品牌和产品资料，再建议适合的铺位",
  },
};

const briefFallback = {
  "brief-summary": { index: "概要", title: "本月计划", body: "用地方食物内容吸引顾客到店和消费，同时让商户参加，并帮助招商人员联系合适品牌。", quote: "先用好内容吸引顾客，再用实际结果帮助商户和品牌合作。" },
  "brief-goal": { index: "01 / 05", title: "本月目标", body: "用内容吸引顾客到店和消费，并观察内容是否帮助商户参加和品牌联系。", quote: "先让顾客愿意来，再让商户和品牌愿意加入。" },
  "brief-audience": { index: "02 / 05", title: "本月最重要的人群", body: "本月同时考虑本地顾客、游客和可能加入的商户，先说清楚为什么值得来，再说明为什么值得加入。", quote: "先让人理解为什么值得来，再让商户理解为什么值得加入。" },
  "brief-content": { index: "03 / 05", title: "准备发布的内容", body: "围绕地方食物如何进入当代城市生活，持续介绍人物、产品、场地和现场体验，并分别准备适合不同平台的版本。", quote: "每项内容都要来自具体人物、产品或场地。" },
  "brief-operations": { index: "04 / 05", title: "商户要做什么", body: "把本月主题分成商户参加、限定产品、现场活动、陈列和转发任务，确定负责人和完成日期。", quote: "内容发布后，还要有人把它落实到产品和现场。" },
  "brief-measure": { index: "05 / 05", title: "怎么判断有没有效果", body: "记录内容是否发布、商户是否完成、顾客是否到店消费、品牌是否回复以及场地使用情况；没有数据就显示还没记录。", quote: "没有记录的数据不当作已经发生。" },
};

const ownerStageConclusions = {
  overall_plan: "项目资料和内容已经准备好，但还没有开始第一轮小范围测试。",
  content_growth: "内容已经准备好，下一步要先发布一小批，再看顾客是否愿意到店。",
  merchant_collaboration: "商户任务已经准备好，下一步要先确定第一批参与商户。",
  merchant_attraction: "品牌介绍材料已经准备好，下一步要先填写具体品牌名称并开始联系。",
};

const ownerMetricDetails = {
  content: {
    title: "已准备内容", status: "接近目标", actual: "6 项", target: "8 项", gap: "-2 项", trend: "较上期增加 2 项",
    insight: "内容数量已经接近本月目标，但还没有真正发布或放到现场测试。",
    reason: "现有内容已经整理完成，但第一批测试内容和安排还没有确定。",
    action: "从现有内容中选择 3 项，做一周小范围测试。",
  },
  testing: {
    title: "已投入测试", status: "低于目标", actual: "0 项", target: "3 项", gap: "-3 项", trend: "连续两周没有变化",
    insight: "这个月还没有内容开始测试，所以还没有到店或消费反馈。",
    reason: "最多花多少钱、测试哪些内容、哪些商户先参加，这三件事还没有同时确定。",
    action: "本周完成三项决定，并启动第一批 3 项内容测试。",
  },
  merchants: {
    title: "已经确定参加的商户", status: "还没开始", actual: "0 家", target: "5 家", gap: "-5 家", trend: "本月还没有填写",
    insight: "商户还没有开始参加，产品、图片和现场配合信息还没填写。",
    reason: "参加商户名单和每家商户要做的事还没有确定。",
    action: "先选 2–3 家配合度高的商户开始，完成后再扩大范围。",
  },
  leads: {
    title: "已经联系的品牌", status: "还没开始", actual: "0 个", target: "3 个", gap: "-3 个", trend: "本月还没有填写",
    insight: "通用介绍材料已经准备好，但还没有开始联系具体品牌。",
    reason: "具体品牌名称、铺位条件和到店消费情况还没有补齐。",
    action: "先填写 3 个具体品牌，再逐一确认是否适合并安排联系。",
  },
};

const ownerReportDetails = {
  weekly: {
    type: "本周情况", title: "8月第2周项目报告", conclusion: "准备工作已经完成，本周最重要的是开始第一轮小范围测试。",
    points: ["已经完成|已有 6 项内容可以使用。", "还没完成|测试、商户参加和品牌联系都还没开始。", "下一步|完成三项老板决定，再做一周小范围测试。"],
  },
  monthly: {
    type: "本月情况", title: "2026年8月项目报告", conclusion: "这个月还在准备阶段，准备好不等于已经产生了顾客和销售结果。",
    points: ["内容|6 项可以使用，0 项开始测试。", "商户和品牌|参加商户和已联系品牌都还没填写。", "下一步|先完成一次小范围测试，再决定要不要增加投入。"],
  },
};

function $(selector) {
  return document.querySelector(selector);
}

function create(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = String(value);
  return node;
}

function renderRoleNavigation(role) {
  const navigation = roleNavigation[role];
  const root = $("#roleNavigation");
  if (!navigation || !root) return;
  const label = create("span", "nav-label", navigation.label);
  const buttons = navigation.items.map((item, index) => {
    const button = create("button", "question-link");
    button.type = "button";
    button.dataset.navKey = item.key;
    button.dataset.question = item.question;
    if (item.target) button.dataset.target = item.target;
    const number = create("b", "", String(index + 1).padStart(2, "0"));
    const copy = create("span");
    copy.append(create("strong", "", item.title), create("small", "", item.subtitle));
    button.append(number, copy);
    button.classList.toggle("active", item.key === state.navKey);
    return button;
  });
  root.setAttribute("aria-label", `${navigation.label}导航`);
  root.replaceChildren(label, ...buttons);
}

function navigateRoleItem(item) {
  if (!item) return;
  state.navKey = item.key;
  showQuestion(item.question);
  if (item.target) {
    requestAnimationFrame(() => document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function formatMonth(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})$/);
  if (!match) return "月份待确认";
  return `${match[1]}年${Number(match[2])}月`;
}

function parseChineseMonth(value) {
  const match = String(value || "").match(/(\d{4})年(\d{1,2})月/);
  if (!match) return "";
  return `${match[1]}-${String(match[2]).padStart(2, "0")}`;
}

function shortened(value, limit = 86) {
  const text = String(value || "还没记录").trim();
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

function displayCount(value) {
  const match = String(value || "").match(/\d+/);
  return match ? match[0] : "0";
}

function aggregateState(items) {
  if ((items || []).some((item) => item.state === "missing")) return "missing";
  if ((items || []).some((item) => item.state === "pending")) return "pending";
  return "available";
}

function sectionById(id) {
  return state.result?.customer_view?.sections?.find((section) => section.section_id === id);
}

function itemByLabel(section, label) {
  return (section?.items || []).find((item) => item.label === label);
}

function buildPayload() {
  const notes = $("#additional_context").value.trim();
  const context = [
    notes,
    `本月预算范围：${budgetLabels[state.budget] || state.budget}`,
    `资源第一优先级：${state.priority}`,
  ].filter(Boolean).join("；");
  return {
    project_name: $("#project_name").value,
    month: $("#month").value,
    primary_goal: state.goal,
    target_audience: state.audience,
    additional_context: context,
  };
}

function showQuestion(question) {
  if (!$( `#${question}View`)) return;
  document.body.classList.remove("role-merchant");
  document.body.dataset.view = question;
  $("#merchantView")?.classList.remove("active");
  $("#merchantView")?.setAttribute("aria-hidden", "true");
  state.question = question;
  document.querySelectorAll(".question-view").forEach((view) => view.classList.toggle("active", view.id === `${question}View`));
  document.querySelectorAll("#roleNavigation [data-nav-key]").forEach((button) => button.classList.toggle("active", button.dataset.navKey === state.navKey));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (question === "q4") requestAnimationFrame(drawTrendPlaceholder);
}

function showMerchantView() {
  closeWizard();
  state.question = "merchant";
  document.body.classList.add("role-merchant");
  document.body.dataset.view = "merchant";
  document.querySelectorAll(".question-view").forEach((view) => view.classList.remove("active"));
  document.querySelectorAll("[data-question]").forEach((button) => button.classList.remove("active"));
  $("#merchantView").classList.add("active");
  $("#merchantView").setAttribute("aria-hidden", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openWizard() {
  state.step = 1;
  updateWizard();
  $("#planWizard").classList.add("open");
  $("#planWizard").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeWizard() {
  $("#planWizard").classList.remove("open");
  $("#planWizard").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateInputSummary() {
  $("#summaryGoal").textContent = goalLabels[state.goal];
  $("#summaryAudience").textContent = audienceLabels[state.audience];
  $("#summaryBudget").textContent = budgetLabels[state.budget] || state.budget;
  $("#summaryPriority").textContent = priorityLabels[state.priority] || state.priority;
}

function updateWizard() {
  document.querySelectorAll(".wizard-step").forEach((step) => step.classList.toggle("active", Number(step.dataset.step) === state.step));
  $("#wizardStepLabel").textContent = `步骤 ${state.step}`;
  $("#wizardProgressText").textContent = `${state.step} / 5`;
  $("#wizardProgressBar").style.width = `${state.step * 20}%`;
  $("#wizardBack").disabled = state.step === 1;
  const nextLabels = ["", "继续选择人群", "继续选择预算", "继续选择先做的事", "继续填写本月变化", "生成本月计划"];
  const backLabels = ["", "返回上一步", "返回选择目标", "返回选择人群", "返回选择预算", "返回选择先做的事"];
  $("#wizardNext").textContent = nextLabels[state.step];
  $("#wizardBack").textContent = backLabels[state.step];
  updateInputSummary();
}

function renderProjectContext() {
  const project = $("#project_name").value || "项目待确认";
  const month = formatMonth($("#month").value);
  $("#sideProject").textContent = project;
  $("#sideMonth").textContent = month;
  $("#topProject").textContent = project;
  $("#topMonth").textContent = month;
}

function renderAnalysis() {
  const sections = state.result?.customer_view?.sections || [];
  const rows = sections.map((section) => {
    const items = section.items || [];
    const evidence = items.find((item) => item.state === "missing") || items.find((item) => item.state === "pending") || items[0];
    const rowState = aggregateState(items);
    const actionVerb = evidence?.state === "missing" ? "补充" : evidence?.state === "pending" ? "确认" : "继续使用";
    const row = document.createElement("tr");
    const moduleCell = document.createElement("td");
    moduleCell.append(create("strong", "", section.title), create("small", "", `${items.length} 个判断项`));
    const stateCell = document.createElement("td");
    stateCell.append(create("b", `status ${rowState}`, stateLabels[rowState]));
    row.append(
      moduleCell,
      create("td", "", shortened(section.summary, 112)),
      create("td", "", evidence ? `${evidence.label}：${shortened(evidence.value, 78)}` : "暂无数据"),
      stateCell,
      create("td", "", evidence ? `${actionVerb}${evidence.label}` : "保持更新"),
    );
    return row;
  });
  if (rows.length) $("#analysisTableBody").replaceChildren(...rows);
}

function buildBriefSections() {
  const campaign = sectionById("campaign");
  const content = sectionById("strong_content");
  const operations = sectionById("strong_operations");
  return {
    "brief-summary": {
      ...briefFallback["brief-summary"],
      body: campaign?.summary || briefFallback["brief-summary"].body,
      quote: itemByLabel(campaign, "项目价值主线")?.value || briefFallback["brief-summary"].quote,
    },
    "brief-goal": {
      ...briefFallback["brief-goal"],
      body: campaign?.summary || briefFallback["brief-goal"].body,
      quote: itemByLabel(campaign, "项目价值主线")?.value || briefFallback["brief-goal"].quote,
    },
    "brief-audience": {
      ...briefFallback["brief-audience"],
      body: `本月最重要的人群是${itemByLabel(campaign, "重点客群")?.value || audienceLabels[state.audience]}。本月计划会围绕他们是否愿意到店、消费或合作来准备内容。`,
    },
    "brief-content": {
      ...briefFallback["brief-content"],
      body: itemByLabel(content, "本月内容主线")?.value || briefFallback["brief-content"].body,
      quote: content?.summary || briefFallback["brief-content"].quote,
    },
    "brief-operations": {
      ...briefFallback["brief-operations"],
      body: itemByLabel(operations, "商户可选任务")?.value || briefFallback["brief-operations"].body,
      quote: operations?.summary || briefFallback["brief-operations"].quote,
    },
    "brief-measure": briefFallback["brief-measure"],
  };
}

function renderBrief(key = state.activeBrief) {
  state.activeBrief = key;
  const content = buildBriefSections()[key] || briefFallback["brief-goal"];
  document.querySelectorAll("[data-brief]").forEach((button) => button.classList.toggle("active", button.dataset.brief === key));
  const article = $("#briefDocument");
  article.replaceChildren(
    create("span", "", content.index),
    create("h3", "", content.title),
    create("p", "", content.body),
    create("blockquote", "", content.quote),
  );
}

function renderContentOutputs() {
  const content = sectionById("strong_content");
  const direction = itemByLabel(content, "本月内容主线")?.value;
  if (direction) $("#contentDirection").textContent = shortened(direction, 62);
  const firstPlatform = $("#platformTabs button.active")?.dataset.platform || "xiaohongshu";
  renderPlatform(firstPlatform);
}

function renderPlatform(platform) {
  const view = platformContent[platform] || platformContent.xiaohongshu;
  document.querySelectorAll("[data-platform]").forEach((button) => button.classList.toggle("active", button.dataset.platform === platform));
  $("#contentKicker").textContent = view.label;
  $("#contentHeadline").textContent = view.headline;
  $("#contentLead").textContent = view.lead;
  $("#previewPlatform").textContent = view.preview;
  $("#platformImage").src = view.image;
}

function renderLeadProfile(key) {
  const profile = leadProfiles[key];
  if (!profile) return;
  document.querySelectorAll("[data-lead]").forEach((button) => button.classList.toggle("active", button.dataset.lead === key));
  const root = $("#leadDetail");
  root.querySelector("h2").textContent = profile.title;
  const values = root.querySelectorAll("dd");
  [profile.reason, profile.location, profile.verify, profile.action].forEach((value, index) => {
    if (values[index]) values[index].textContent = value;
  });
}

function setLeasingMode(realLeadCount = 0) {
  const hasRealLeads = Number(realLeadCount) > 0;
  $("#candidatePreparation").hidden = hasRealLeads;
  $("#realLeasingPipeline").hidden = !hasRealLeads;
}

function setMetricDisplay(periodCount = 0) {
  const hasTrend = Number(periodCount) >= 2;
  $("#trendPanel").hidden = !hasTrend;
  $(".measurement-readiness").hidden = hasTrend;
  $(".first-measurement-panel").hidden = hasTrend;
  if (hasTrend) requestAnimationFrame(drawTrendPlaceholder);
}

function renderMerchantStep() {
  document.querySelectorAll("[data-merchant-step]").forEach((panel) => {
    panel.classList.toggle("active", Number(panel.dataset.merchantStep) === state.merchantStep);
  });
  document.querySelectorAll("[data-merchant-step-indicator]").forEach((indicator) => {
    const step = Number(indicator.dataset.merchantStepIndicator);
    indicator.classList.toggle("active", state.merchantCompleted < 3 && step === state.merchantStep);
    indicator.classList.toggle("complete", step <= state.merchantCompleted);
    const status = indicator.querySelector("small");
    if (status) status.textContent = step <= state.merchantCompleted ? "已完成" : step === state.merchantStep ? "正在填写" : "还没开始";
  });
  $("#merchantProgressValue").textContent = `${state.merchantCompleted} / 3`;
  $("#merchantProgressText").textContent = state.merchantCompleted === 3 ? "已全部提交，等待项目方确认" : `正在完成第 ${state.merchantStep} 项`;
}

function renderEvidenceRate(sections) {
  const items = (sections || []).flatMap((section) => section.items || []);
  const available = items.filter((item) => item.state === "available").length;
  const rate = items.length ? Math.round((available / items.length) * 100) : 0;
  $("#evidenceRate").textContent = `${available} / ${items.length} 已有依据`;
  $("#evidenceBar").style.width = `${rate}%`;
  if ($("#ownerEvidenceRatio")) $("#ownerEvidenceRatio").textContent = `${available} / ${items.length}`;
  if ($("#ownerEvidenceBar")) $("#ownerEvidenceBar").style.width = `${rate}%`;
}

function setOwnerChart(id, value, height) {
  const label = $(`#${id}Value`);
  const bar = $(`#${id}Bar`);
  if (label) label.textContent = value;
  if (bar) bar.style.height = `${Math.max(0, Math.min(100, height))}%`;
}

function ownerDecisionSuggestion(item) {
  if (/费用|预算/.test(item)) return { title: "本轮最多花多少钱", help: "先定一个费用上限" };
  if (/主题|内容|测试|渠道/.test(item)) return { title: "先测试哪些内容", help: "选择首批内容和渠道" };
  if (/招商|商户/.test(item)) return { title: "哪些商户先参加", help: "确认第一批参与名单" };
  return { title: item, help: "决定后进入下一步" };
}

function ownerAnalysisResponse(prompt) {
  const question = String(prompt || "").trim();
  const contentCount = $("#contentAssetCount")?.textContent || "0";
  const adoptedCount = $("#ownerAdoptedCount")?.textContent || "0";
  const merchantCount = $("#ownerMerchantCount")?.textContent || "--";
  const leadCount = $("#ownerLeadCount")?.textContent || "--";

  if (/异常|风险|问题/.test(question)) {
    return "现在最大的问题是准备工作已经完成，但还没有开始小范围测试，所以暂时看不到顾客和商户的反应。";
  }
  if (/为什么|原因/.test(question)) {
    return "第一轮测试还没有开始，主要因为测试内容、费用上限和第一批参加的商户还没有同时确定。";
  }
  if (/趋势|指标|优先/.test(question)) {
    return "最需要先改善的是“已投入测试”。内容已经准备了 6 项，但测试仍为 0；先让内容进入现场，其他数字才可能变化。";
  }
  if (/下周|下一步|建议/.test(question)) {
    return "下周先完成三项决定，再选择 3 项内容和 2–3 家商户做一周小范围测试，同时记录第一条顾客或商户反馈。";
  }
  if (/决策|决定|拍板/.test(question)) {
    return "现在只需要确认三件事：最多花多少钱、先测试哪些内容、哪些商户先参加；其他事情先不要扩大。";
  }
  if (/月报|报告|总结/.test(question)) {
    return "这个月已经准备好内容和项目资料，但还没有完成一次实际测试。报告应该说明准备好了什么、还缺什么、下个月要决定什么。";
  }
  return `目前有 ${contentCount} 项内容可以使用，${adoptedCount} 项已经开始测试。下一步先完成一次小范围测试，再记录第一条顾客或商户反馈。`;
}

function generateOwnerAnalysis(prompt) {
  const input = $("#ownerAiPrompt");
  const submit = $("#ownerAiSubmit");
  const question = String(prompt || input?.value || "这个月最需要先解决什么？").trim();
  if (input) input.value = question;
  if (submit) submit.disabled = true;
  const answer = $("#ownerAiAnswer");
  if (answer) answer.innerHTML = "<span>AI 回答</span><p>正在查看当前项目数据…</p>";
  window.setTimeout(() => {
    if (answer) answer.innerHTML = `<span>AI 回答 · ${question}</span><p>${ownerAnalysisResponse(question)}</p>`;
    if (submit) submit.disabled = false;
  }, 260);
}

function renderResult(result) {
  state.result = result;
  state.adopted = false;
  const view = result.customer_view;
  const campaign = sectionById("campaign");
  const assetValue = sectionById("asset_value");
  $("#executiveConclusion").textContent = ownerStageConclusions[state.goal] || campaign?.summary || view.value_statement;
  $("#ownerAiReason").textContent = "根据当前项目资料、本月目标和已经填写的数据得出。";
  const assetConclusion = itemByLabel(assetValue, "资产价值结论")?.value;
  if (assetConclusion && assetConclusion !== "无法判断；需要真实、连续、可追溯的数据验证。") {
    $(".insight-band h2").textContent = assetConclusion;
  }
  $("#adoptResult").textContent = "使用这版计划";
  $("#adoptResult").disabled = false;
  renderProjectContext();
  renderAnalysis();
  renderBrief();
  renderContentOutputs();
  renderEvidenceRate(view.sections);
}

function renderOwnerDashboard(delivery) {
  const owner = delivery?.roles?.owner;
  if (!owner) return;
  state.ownerDelivery = owner;
  const sections = owner.sections || [];
  const byId = (id) => sections.find((section) => section.requirement_id === id);
  const statusSection = byId("OWN-01");
  const contentSection = byId("OWN-03");
  const merchantSection = byId("OWN-05");
  const leasingSection = byId("OWN-06");
  const decisionSection = byId("OWN-10");
  const contentCount = displayCount(itemByLabel(contentSection, "可用内容资产")?.value);
  const adoptedCount = displayCount(itemByLabel(contentSection, "被采用内容")?.value);
  $("#contentAssetCount").textContent = contentCount;
  $("#ownerAdoptedCount").textContent = adoptedCount;
  const merchantValue = itemByLabel(merchantSection, "参与商户数")?.value;
  const leadValue = itemByLabel(leasingSection, "招商线索")?.value;
  const merchantKnown = /\d/.test(String(merchantValue || ""));
  const leadKnown = /\d/.test(String(leadValue || ""));
  const merchantCount = merchantKnown ? displayCount(merchantValue) : "--";
  const leadCount = leadKnown ? displayCount(leadValue) : "--";
  $("#ownerMerchantCount").textContent = merchantCount;
  $("#ownerLeadCount").textContent = leadCount;
  if ($("#ownerMetricContentActual")) $("#ownerMetricContentActual").textContent = contentCount;
  if ($("#ownerMetricContentGap")) $("#ownerMetricContentGap").textContent = String(Number(contentCount) - 8);
  if ($("#ownerMetricTestingActual")) $("#ownerMetricTestingActual").textContent = adoptedCount;
  if ($("#ownerMetricTestingGap")) $("#ownerMetricTestingGap").textContent = String(Number(adoptedCount) - 3);
  if ($("#ownerMetricMerchantActual")) $("#ownerMetricMerchantActual").textContent = merchantKnown ? merchantCount : "0";
  if ($("#ownerMetricMerchantGap")) $("#ownerMetricMerchantGap").textContent = String((merchantKnown ? Number(merchantCount) : 0) - 5);
  if ($("#ownerMetricLeadActual")) $("#ownerMetricLeadActual").textContent = leadKnown ? leadCount : "0";
  if ($("#ownerMetricLeadGap")) $("#ownerMetricLeadGap").textContent = String((leadKnown ? Number(leadCount) : 0) - 3);
  setOwnerChart("ownerChartContent", contentCount, Number(contentCount) > 0 ? 100 : 0);
  setOwnerChart("ownerChartAdopted", adoptedCount, Number(contentCount) ? (Number(adoptedCount) / Number(contentCount)) * 100 : 0);
  setOwnerChart("ownerChartMerchant", merchantKnown ? merchantCount : "--", merchantKnown ? Number(merchantCount) * 20 : 0);
  setOwnerChart("ownerChartLead", leadKnown ? leadCount : "--", leadKnown ? Number(leadCount) * 20 : 0);
  $("#ownerAiReason").textContent = `已有 ${contentCount} 项内容可以使用，但开始测试的仍为 ${adoptedCount} 项；第一批测试内容和商户还没有同时确定。`;

  const approvalItems = String(itemByLabel(decisionSection, "批准事项")?.value || "")
    .split(/[、，,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
  if (approvalItems.length) {
    approvalItems.forEach((item, index) => {
      const display = ownerDecisionSuggestion(item);
      const title = $(`#ownerDecisionTitle${index + 1}`);
      if (title) title.textContent = display.title;
    });
  }
}

async function generatePreview({ quiet = false } = {}) {
  const next = $("#wizardNext");
  const original = next.textContent;
  next.disabled = true;
  next.textContent = "正在生成本月计划";
  try {
    const response = await fetch("/api/client-preview/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload()),
    });
    const result = await response.json();
    if (!response.ok || result.status !== "client_preview_generated_mock_locked") {
      throw new Error("暂时无法生成本月计划，请稍后再试");
    }
    renderResult(result);
    closeWizard();
    state.role = "owner";
    state.navKey = "owner-overview";
    document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item.dataset.role === "owner"));
    renderRoleNavigation("owner");
    showQuestion("q1");
    if (!quiet) showToast("本月计划已经生成，请查看结果");
  } catch (error) {
    showToast(error.message);
  } finally {
    next.disabled = false;
    next.textContent = original;
    updateWizard();
  }
}

function exportResult() {
  if (!state.result) {
    showToast("本月计划还没生成，请先填写本月变化");
    return;
  }
  const payload = buildPayload();
  const view = state.result.customer_view;
  const lines = [`# ${payload.project_name}｜${formatMonth(payload.month)}本月计划`, "", view.value_statement, ""];
  view.sections.forEach((section) => {
    lines.push(`## ${section.title}`, "", section.summary, "");
    section.items.forEach((item) => lines.push(`- **${item.label}**：${item.value}（${stateLabels[item.state] || item.state}）`));
    lines.push("");
  });
  lines.push("## 仍需补充", "", ...view.missing_or_pending.map((item) => `- ${item}`), "", view.source_note);
  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "地方口袋_本月计划.md";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("本月计划已经下载");
}

function drawTrendPlaceholder() {
  const canvas = $("#trendCanvas");
  if (!canvas || !canvas.clientWidth) return;
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const context = canvas.getContext("2d");
  context.scale(dpr, dpr);
  context.clearRect(0, 0, width, height);
  context.strokeStyle = "#e1e5e1";
  context.lineWidth = 1;
  context.setLineDash([]);
  for (let row = 0; row < 5; row += 1) {
    const y = 20 + row * ((height - 48) / 4);
    context.beginPath();
    context.moveTo(36, y);
    context.lineTo(width - 10, y);
    context.stroke();
  }
  context.fillStyle = "#8a938d";
  context.font = "9px -apple-system, BlinkMacSystemFont, sans-serif";
  ["第1周", "第2周", "第3周", "第4周"].forEach((label, index) => {
    const x = 58 + index * ((width - 100) / 3);
    context.fillText(label, x - 12, height - 8);
  });
  const colors = ["#3169a6", "#287255", "#c63f32"];
  colors.forEach((color, index) => {
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.setLineDash([5, 6]);
    context.beginPath();
    context.moveTo(50, 175 - index * 23);
    context.bezierCurveTo(width * .34, 145 - index * 8, width * .62, 160 + index * 4, width - 24, 105 + index * 10);
    context.stroke();
  });
}

async function loadProjectDefaults() {
  try {
    const response = await fetch("/api/data/intake-bootstrap", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const campaign = data.campaign || {};
    const project = (data.projects || []).find((item) => item.project_id === campaign.project_id);
    if (project?.project_name) $("#project_name").value = project.project_name;
    const month = parseChineseMonth(campaign.month);
    if (month) $("#month").value = month;
  } catch (_) {
    // Built-in defaults keep the customer preview usable.
  }
}

async function loadRoleDelivery() {
  try {
    const response = await fetch("/api/role-delivery", { cache: "no-store" });
    if (!response.ok) return;
    renderOwnerDashboard(await response.json());
  } catch (_) {
    // Explicit placeholders remain visible when role data is unavailable.
  }
}

$("#roleNavigation").addEventListener("click", (event) => {
  const button = event.target.closest("[data-nav-key]");
  if (!button) return;
  const item = roleNavigation[state.role]?.items.find((candidate) => candidate.key === button.dataset.navKey);
  navigateRoleItem(item);
});
$("#ownerAiForm").addEventListener("submit", (event) => {
  event.preventDefault();
  generateOwnerAnalysis();
});
document.querySelectorAll("[data-owner-prompt]").forEach((button) => button.addEventListener("click", () => {
  generateOwnerAnalysis(button.dataset.ownerPrompt);
}));
document.querySelectorAll("[data-owner-metric]").forEach((button) => button.addEventListener("click", () => {
  const metric = ownerMetricDetails[button.dataset.ownerMetric];
  const dialog = $("#ownerMetricDialog");
  if (!metric || !dialog) return;
  $("#ownerMetricDialogStatus").textContent = metric.status;
  $("#ownerMetricDialogTitle").textContent = metric.title;
  $("#ownerMetricDialogActual").textContent = metric.actual;
  $("#ownerMetricDialogTarget").textContent = metric.target;
  $("#ownerMetricDialogGap").textContent = metric.gap;
  $("#ownerMetricDialogTrend").textContent = metric.trend;
  $("#ownerMetricDialogInsight").textContent = metric.insight;
  $("#ownerMetricDialogReason").textContent = metric.reason;
  $("#ownerMetricDialogAction").textContent = metric.action;
  dialog.showModal();
}));
document.querySelectorAll("[data-owner-report]").forEach((button) => button.addEventListener("click", () => {
  const report = ownerReportDetails[button.dataset.ownerReport];
  const dialog = $("#ownerReportDialog");
  if (!report || !dialog) return;
  $("#ownerReportType").textContent = report.type;
  $("#ownerReportTitle").textContent = report.title;
  $("#ownerReportConclusion").textContent = report.conclusion;
  $("#ownerReportPoints").replaceChildren(...report.points.map((item, index) => {
    const [label, value] = item.split("|");
    const row = create("p");
    const copy = create("span");
    copy.append(create("b", "", label), document.createTextNode(value));
    row.append(create("i", "", String(index + 1).padStart(2, "0")), copy);
    return row;
  }));
  dialog.showModal();
}));
document.querySelectorAll("[data-open-wizard]").forEach((button) => button.addEventListener("click", openWizard));
$("#closeWizard").addEventListener("click", closeWizard);

document.querySelectorAll("[data-goal]").forEach((button) => button.addEventListener("click", () => {
  state.goal = button.dataset.goal;
  document.querySelectorAll("[data-goal]").forEach((item) => item.classList.toggle("active", item === button));
  updateInputSummary();
}));

document.querySelectorAll("[data-audience]").forEach((button) => button.addEventListener("click", () => {
  state.audience = button.dataset.audience;
  $("#target_audience").value = state.audience;
  document.querySelectorAll("[data-audience]").forEach((item) => item.classList.toggle("active", item === button));
  updateInputSummary();
}));

document.querySelectorAll("[data-budget]").forEach((button) => button.addEventListener("click", () => {
  state.budget = button.dataset.budget;
  document.querySelectorAll("[data-budget]").forEach((item) => item.classList.toggle("active", item === button));
  updateInputSummary();
}));

document.querySelectorAll("[data-priority]").forEach((button) => button.addEventListener("click", () => {
  state.priority = button.dataset.priority;
  document.querySelectorAll("[data-priority]").forEach((item) => item.classList.toggle("active", item === button));
  updateInputSummary();
}));

$("#wizardNext").addEventListener("click", async () => {
  if (state.step < 5) {
    state.step += 1;
    updateWizard();
    return;
  }
  await generatePreview();
});

$("#wizardBack").addEventListener("click", () => {
  if (state.step > 1) state.step -= 1;
  updateWizard();
});

$("#planForm").addEventListener("submit", (event) => event.preventDefault());
document.querySelectorAll("[data-brief]").forEach((button) => button.addEventListener("click", () => renderBrief(button.dataset.brief)));
document.querySelectorAll("[data-platform]").forEach((button) => button.addEventListener("click", () => renderPlatform(button.dataset.platform)));
document.querySelectorAll("[data-lead]").forEach((button) => button.addEventListener("click", () => renderLeadProfile(button.dataset.lead)));
document.querySelectorAll(".calendar-filters button").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".calendar-filters button").forEach((item) => item.classList.toggle("active", item === button));
  showToast(`已切换为：${button.textContent}`);
}));
document.querySelectorAll(".task-check").forEach((button) => button.addEventListener("click", () => {
  button.classList.toggle("done");
  showToast(button.classList.contains("done") ? "已标记为完成" : "已恢复为未完成");
}));
document.querySelectorAll("[data-task-open]").forEach((button) => button.addEventListener("click", () => showToast(`已打开：${button.dataset.taskOpen}`)));

document.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => {
  state.role = button.dataset.role;
  document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item === button));
  if (state.role === "merchant") showMerchantView();
  else {
    const firstItem = roleNavigation[state.role].items[0];
    state.navKey = firstItem.key;
    renderRoleNavigation(state.role);
    navigateRoleItem(firstItem);
  }
  showToast(`已切换到${roleLabels[state.role]}页面`);
}));

document.querySelectorAll(".merchant-step-panel").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()));
document.querySelectorAll("[data-merchant-next]").forEach((button) => button.addEventListener("click", () => {
  state.merchantCompleted = Math.max(state.merchantCompleted, state.merchantStep);
  state.merchantStep = Math.min(3, state.merchantStep + 1);
  renderMerchantStep();
  showToast("已经保存，请继续填写下一项");
}));
document.querySelectorAll("[data-merchant-prev]").forEach((button) => button.addEventListener("click", () => {
  state.merchantStep = Math.max(1, state.merchantStep - 1);
  renderMerchantStep();
}));
$("[data-merchant-submit]").addEventListener("click", (event) => {
  state.merchantCompleted = 3;
  renderMerchantStep();
  event.currentTarget.textContent = "已提交给项目负责人";
  event.currentTarget.disabled = true;
  showToast("三项内容已经提交，等待项目负责人确认");
});
document.querySelectorAll("[data-merchant-action]").forEach((button) => button.addEventListener("click", () => {
  showToast(`已打开：${button.dataset.merchantAction}`);
}));
$("[data-role-exit]").addEventListener("click", () => {
  state.role = "owner";
  document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item.dataset.role === "owner"));
  state.navKey = "owner-overview";
  renderRoleNavigation("owner");
  showQuestion("q1");
});
$("[data-feedback-start]").addEventListener("click", () => showToast("已经打开顾客和商户反馈记录"));

$("#exportResult").addEventListener("click", exportResult);
document.querySelectorAll("[data-export-owner-report]").forEach((button) => button.addEventListener("click", exportResult));
$("#adoptResult").addEventListener("click", (event) => {
  state.adopted = true;
  event.currentTarget.textContent = "已选用这版计划";
  event.currentTarget.disabled = true;
  showToast("已经选用这版本月计划");
});

const feedbackDialog = $("#feedbackDialog");
$("#openFeedback").addEventListener("click", () => feedbackDialog.showModal());
$("#saveFeedback").addEventListener("click", () => {
  showToast($("#feedbackText").value.trim() ? "这条修改意见已经保存" : "没有填写内容，本次未保存");
});

window.addEventListener("resize", () => {
  if (state.question === "q4") drawTrendPlaceholder();
});

async function init() {
  renderRoleNavigation("owner");
  updateWizard();
  setLeasingMode(0);
  setMetricDisplay(0);
  renderMerchantStep();
  await loadProjectDefaults();
  renderProjectContext();
  await Promise.all([generatePreview({ quiet: true }), loadRoleDelivery()]);
}

init();
