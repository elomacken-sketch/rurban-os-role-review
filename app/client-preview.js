const goalLabels = {
  overall_plan: "整体经营",
  content_growth: "内容增长",
  merchant_collaboration: "商户协同",
  merchant_attraction: "招商推进",
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
  available: "已有依据",
  pending: "待确认",
  missing: "未采集",
};

const roleLabels = {
  owner: "老板",
  operations: "运营",
  leasing: "招商",
  merchant: "商户",
};

const roleNavigation = {
  owner: {
    label: "老板工作台",
    items: [
      { key: "owner-overview", question: "q1", title: "项目经营总览", subtitle: "阶段、重点与风险" },
      { key: "owner-campaign", question: "q5", title: "月度战役与审批", subtitle: "目标、预算与优先级" },
      { key: "owner-progress", question: "q6", title: "执行与协同进展", subtitle: "运营、商户与招商" },
      { key: "owner-value", question: "q4", title: "经营价值与趋势", subtitle: "结果、数据与趋势" },
      { key: "owner-decisions", question: "q7", title: "下月决策与月报", subtitle: "建议、审批与导出" },
    ],
  },
  operations: {
    label: "运营工作台",
    items: [
      { key: "operations-today", question: "q2", title: "今日工作台", subtitle: "任务、审核与缺失素材" },
      { key: "operations-calendar", question: "q2", target: ".calendar-work", title: "内容日历与活动", subtitle: "排期、活动与负责人" },
      { key: "operations-content", question: "q2", target: ".operations-content-studio", title: "内容生产", subtitle: "文案、图片与视频" },
    ],
  },
  leasing: {
    label: "招商工作台",
    items: [
      { key: "leasing-overview", question: "q3", title: "招商推进总览", subtitle: "目标、线索与阻碍" },
      { key: "leasing-candidates", question: "q3", target: "#candidatePreparation", title: "品牌画像与候选库", subtitle: "候选品牌与匹配理由" },
      { key: "leasing-ammo", question: "q3", target: ".leasing-detail-grid", title: "铺位与招商材料", subtitle: "空间、内容与沟通弹药" },
      { key: "leasing-merchants", question: "q3", target: ".merchant-task-work", title: "商户协同反馈", subtitle: "参与、任务与回传" },
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
    label: "本月主推内容 · 小红书",
    headline: "一座城市的味道，如何被重新装进口袋？",
    lead: "用一个具体味道、一个真实人物和一段现场体验，把阅读兴趣承接到到访理由。",
    preview: "小红书发布预览",
    image: "assets/place-dining.jpg",
  },
  wechat: {
    label: "本月主题长文 · 公众号",
    headline: "地方食物，不只是被保存，也可以重新进入城市生活",
    lead: "从项目定位、在地食物和空间运营三个层次，解释本月经营战役为什么值得发生。",
    preview: "公众号长文预览",
    image: "assets/place-market.jpg",
  },
  video: {
    label: "本月现场内容 · 短视频",
    headline: "跟着一条味觉路线，在地方口袋里走一圈",
    lead: "用人物、产品和空间动线构成短视频脚本，真实商户和拍摄素材确认后再进入制作。",
    preview: "短视频封面预览",
    image: "assets/place-hero.jpg",
  },
};

const leadProfiles = {
  "local-food": {
    title: "地方食物代表品牌",
    reason: "具备真实产地、人物和产品内容，可形成持续市场表达。",
    location: "主入口内容展示位 / 可体验餐饮点位",
    verify: "经营条件、现场适配、品牌意愿与真实铺位",
    action: "补充真实品牌名单后生成一对一招商材料",
  },
  creator: {
    title: "主理人餐饮品牌",
    reason: "人物表达鲜明，适合与月度主题、限定产品和现场活动共同运营。",
    location: "主题餐饮区 / 周末活动协同点位",
    verify: "产品稳定性、活动参与方式、团队执行能力与经营条件",
    action: "先形成候选品牌清单，再验证真实合作意愿",
  },
  culture: {
    title: "地方文化产品品牌",
    reason: "可把地方文化转成游客可理解、可携带、可消费的城市礼物。",
    location: "游客动线节点 / 内容零售组合区",
    verify: "产品价格带、游客需求、陈列方式和铺位适配",
    action: "补充真实品牌与产品资料后形成铺位匹配建议",
  },
};

const briefFallback = {
  "brief-summary": { index: "摘要", title: "本月经营战役摘要", body: "围绕整体经营规划，以地方食物内容带动到访与消费，同时验证商户协同与招商表达的实际效果。", quote: "强内容驱动强运营，强运营反哺招商、租赁与空间资产价值。" },
  "brief-goal": { index: "01 / 05", title: "经营目标", body: "以强内容带动到访与消费，并验证内容运营对招商线索和商户协同的促进作用。", quote: "强内容驱动强运营，强运营反哺招商、租赁与空间资产价值。" },
  "brief-audience": { index: "02 / 05", title: "目标客群", body: "本月同时面向本地消费者、游客与潜在商户，以消费现场为核心，同时建立对经营合作方有价值的项目表达。", quote: "先让人理解为什么值得来，再让商户理解为什么值得加入。" },
  "brief-content": { index: "03 / 05", title: "内容方向", body: "围绕地方食物如何进入当代城市生活，持续生产人物、产品、空间与现场体验内容，并适配不同传播平台。", quote: "每一项内容都要能够落到真实人物、真实产品或真实空间。" },
  "brief-operations": { index: "04 / 05", title: "商户协同", body: "把内容主线转成参与商户、限定产品、现场活动、陈列和联合传播任务，负责人和截止时间在批准后确认。", quote: "内容不是发布即结束，而是现场经营动作的起点。" },
  "brief-measure": { index: "05 / 05", title: "验证方式", body: "持续记录发布采用、商户完成、到店消费、招商反馈和空间使用证据；数据缺失时明确显示未采集。", quote: "不把可能相关写成确定有效，不使用未经核实的数据替代真实结果。" },
};

const ownerStageConclusions = {
  overall_plan: "项目资料和内容已经准备好，但还没有开始第一轮真实测试。",
  content_growth: "内容已经准备好，下一步要先发布一小批，再看顾客是否愿意到店。",
  merchant_collaboration: "商户任务已经准备好，下一步要先确定第一批参与商户。",
  merchant_attraction: "招商材料已经准备好，下一步要先补充真实品牌名单并开始接触。",
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
  root.setAttribute("aria-label", `${navigation.label}栏目`);
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
  const text = String(value || "未采集").trim();
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
  $("#summaryPriority").textContent = state.priority;
}

function updateWizard() {
  document.querySelectorAll(".wizard-step").forEach((step) => step.classList.toggle("active", Number(step.dataset.step) === state.step));
  $("#wizardStepLabel").textContent = `步骤 ${state.step}`;
  $("#wizardProgressText").textContent = `${state.step} / 5`;
  $("#wizardProgressBar").style.width = `${state.step * 20}%`;
  $("#wizardBack").disabled = state.step === 1;
  $("#wizardNext").textContent = state.step === 5 ? "生成本月方案" : "下一步";
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
      body: `本月重点客群为${itemByLabel(campaign, "重点客群")?.value || audienceLabels[state.audience]}。本月方案将围绕其到访、消费和合作判断组织内容。`,
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
    if (status) status.textContent = step <= state.merchantCompleted ? "已完成" : step === state.merchantStep ? "正在进行" : "尚未开始";
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
    return "现在最大的风险是准备工作已经完成，但还没有开始小范围执行，所以暂时看不到顾客和商户的真实反应。";
  }
  if (/决策|决定|拍板/.test(question)) {
    return "现在只需要确认三件事：内容费用上限、真实内容测试范围和首批参与商户；其余事项暂不应扩大。";
  }
  if (/月报|报告|总结/.test(question)) {
    return "本月已完成内容与项目资料准备，但真实经营闭环尚未发生，因此月报应聚焦准备结果、数据缺口和下一阶段决策。";
  }
  return `目前有 ${contentCount} 项内容可用，${adoptedCount} 项已经投入测试。下一步先完成小范围执行，再记录第一条顾客或商户反馈。`;
}

function generateOwnerAnalysis(prompt) {
  const input = $("#ownerAiPrompt");
  const submit = $("#ownerAiSubmit");
  const question = String(prompt || input?.value || "分析本月最重要的经营问题").trim();
  if (input) input.value = question;
  if (submit) submit.disabled = true;
  $("#executiveConclusion").textContent = "正在结合当前项目数据生成经营分析…";
  window.setTimeout(() => {
    $("#executiveConclusion").textContent = ownerAnalysisResponse(question);
    $("#ownerAiReason").textContent = `已回答：${question}`;
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
  $("#ownerAiReason").textContent = "依据当前项目资料、本月目标和已登记经营数据。";
  const assetConclusion = itemByLabel(assetValue, "资产价值结论")?.value;
  if (assetConclusion && assetConclusion !== "无法判断；需要真实、连续、可追溯的数据验证。") {
    $(".insight-band h2").textContent = assetConclusion;
  }
  $("#adoptResult").textContent = "确认采用";
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
  setOwnerChart("ownerChartContent", contentCount, Number(contentCount) > 0 ? 100 : 0);
  setOwnerChart("ownerChartAdopted", adoptedCount, Number(contentCount) ? (Number(adoptedCount) / Number(contentCount)) * 100 : 0);
  setOwnerChart("ownerChartMerchant", merchantKnown ? merchantCount : "--", merchantKnown ? Number(merchantCount) * 20 : 0);
  setOwnerChart("ownerChartLead", leadKnown ? leadCount : "--", leadKnown ? Number(leadCount) * 20 : 0);
  $("#ownerAiReason").textContent = `目前有 ${contentCount} 项内容可用，${adoptedCount} 项已经投入测试；下一步先完成小范围执行，再记录顾客或商户反馈。`;

  const approvalItems = String(itemByLabel(decisionSection, "批准事项")?.value || "")
    .split(/[、，,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
  if (approvalItems.length) {
    const decisions = approvalItems.map((item, index) => {
      const display = ownerDecisionSuggestion(item);
      const button = document.createElement("button");
      button.type = "button";
      button.append(
        create("i", "", String(index + 1).padStart(2, "0")),
        create("span", "", display.title),
        create("small", "", display.help),
        create("b", "status pending", "要做"),
      );
      button.addEventListener("click", () => showToast("已打开该决策事项"));
      return button;
    });
    $("#ownerDecisionList").replaceChildren(...decisions);
  }
}

async function generatePreview({ quiet = false } = {}) {
  const next = $("#wizardNext");
  const original = next.textContent;
  next.disabled = true;
  next.textContent = "正在生成";
  try {
    const response = await fetch("/api/client-preview/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload()),
    });
    const result = await response.json();
    if (!response.ok || result.status !== "client_preview_ready") {
      throw new Error(result.errors?.[0]?.message || `生成失败（${response.status}）`);
    }
    renderResult(result);
    closeWizard();
    state.role = "owner";
    state.navKey = "owner-overview";
    document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item.dataset.role === "owner"));
    renderRoleNavigation("owner");
    showQuestion("q1");
    if (!quiet) showToast("本月方案已生成，请直接审核结果");
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
    showToast("方案尚未完成，请稍后再试");
    return;
  }
  const payload = buildPayload();
  const view = state.result.customer_view;
  const lines = [`# ${payload.project_name}｜${formatMonth(payload.month)}经营方案`, "", view.value_statement, ""];
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
  anchor.download = "地方口袋_本月经营方案.md";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("本月经营方案已导出");
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
  showToast(`已切换到${roleLabels[state.role]}视图`);
}));

document.querySelectorAll(".merchant-step-panel").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()));
document.querySelectorAll("[data-merchant-next]").forEach((button) => button.addEventListener("click", () => {
  state.merchantCompleted = Math.max(state.merchantCompleted, state.merchantStep);
  state.merchantStep = Math.min(3, state.merchantStep + 1);
  renderMerchantStep();
  showToast("已保存，请继续下一项");
}));
document.querySelectorAll("[data-merchant-prev]").forEach((button) => button.addEventListener("click", () => {
  state.merchantStep = Math.max(1, state.merchantStep - 1);
  renderMerchantStep();
}));
$("[data-merchant-submit]").addEventListener("click", (event) => {
  state.merchantCompleted = 3;
  renderMerchantStep();
  event.currentTarget.textContent = "已提交";
  event.currentTarget.disabled = true;
  showToast("三项任务已提交，等待项目方确认");
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
$("[data-feedback-start]").addEventListener("click", () => showToast("已打开首轮真实反馈记录准备"));

$("#exportResult").addEventListener("click", exportResult);
document.querySelectorAll("[data-export-owner-report]").forEach((button) => button.addEventListener("click", exportResult));
$("#adoptResult").addEventListener("click", (event) => {
  state.adopted = true;
  event.currentTarget.textContent = "已采用";
  event.currentTarget.disabled = true;
  showToast("本月 Brief 已在当前页面确认采用");
});

const feedbackDialog = $("#feedbackDialog");
$("#openFeedback").addEventListener("click", () => feedbackDialog.showModal());
$("#saveFeedback").addEventListener("click", () => {
  showToast($("#feedbackText").value.trim() ? "修改意见已保存在本次页面中" : "本次没有填写意见");
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
