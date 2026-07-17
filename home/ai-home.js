const $ = (selector) => document.querySelector(selector);

const cardTypeLabels = {
  result: "结果",
  decision: "决策",
  achievement: "成果",
  task: "任务",
};

const homeData = {
  owner: {
    intro: "先看结果和需要决定的事，详细依据点开后再看。",
    hint: "例如：我想让第一轮测试本周开始",
    priority: {
      title: "先决定测试内容、费用上限和首批商户",
      summary: "这三件事没有确定，第一轮内容测试就无法开始，也看不到顾客、商户和品牌的实际反应。",
      facts: [["当前", "0 项内容开始测试"], ["影响", "暂时无法判断有没有效果"], ["建议完成时间", "本周内"]],
      action: "查看并决定这 3 件事",
      progress: 42,
      steps: [["资料和内容已准备", "完成", "done"], ["确定第一轮测试", "现在", "current"], ["记录实际反馈", "下一步", ""]],
      detail: {
        type: "决策", title: "本周只需要决定 3 件事", summary: "三项都确定后，运营才能开始第一轮小范围测试。",
        rows: [["先测试什么", "从已有 6 项内容中选择 3 项"], ["最多花多少钱", "建议先控制在 5,000 元以内"], ["谁先参加", "先选 2–3 家配合度高的商户"]],
      },
    },
    cards: [
      { id: "owner-content", type: "result", time: "今天 10:20", title: "已有 6 项内容可以使用，离本月目标还差 2 项", summary: "内容准备接近目标，但目前还没有任何一项开始测试。", statLabel: "已准备", stat: "6 / 8", action: "查看结果", rows: [["已经完成", "6 项内容已经整理完成"], ["还差什么", "离本月目标还差 2 项"], ["下一步", "先选 3 项做一周小范围测试"]] },
      { id: "owner-decisions", type: "decision", time: "今天 09:40", title: "有 3 件事需要你在本周决定", summary: "测试内容、费用上限和首批商户没有确定，运营暂时不能开始。", statLabel: "等你决定", stat: "3 件", action: "开始决定", rows: [["决定 1", "先测试哪些内容"], ["决定 2", "本轮最多花多少钱"], ["决定 3", "哪些商户先参加"]] },
      { id: "owner-test", type: "result", time: "昨天 17:30", title: "第一轮测试仍未开始，本月效果暂时无法判断", summary: "没有发布、到店、消费或品牌回复记录，当前不能判断内容有没有带来实际变化。", statLabel: "开始测试", stat: "0 项", action: "查看原因", rows: [["主要原因", "三项关键决定还没有完成"], ["造成影响", "无法获得顾客、商户和品牌的实际反应"], ["建议", "本周先启动 3 项内容测试"]] },
      { id: "owner-people", type: "decision", time: "昨天 15:10", title: "首批商户和品牌名单还没有填写", summary: "没有具体名称，就无法安排商户提交资料，也无法开始针对品牌的联系。", statLabel: "已确认名单", stat: "0 个", action: "查看缺什么", rows: [["商户名单", "先确认 2–3 家参与商户"], ["品牌名单", "先填写 3 个具体品牌"], ["填完以后", "分别安排商户任务和品牌联系"]] },
    ],
  },
  operations: {
    intro: "先看已经完成的内容和今天要做的事。",
    hint: "例如：我想今天确定第一批发布内容",
    priority: {
      title: "从 6 项已有内容中选出 3 项，排进第一轮测试",
      summary: "内容已经准备好。今天先确定发布顺序、负责人和需要商户补交的图片，才能按计划开始。",
      facts: [["可以直接使用", "6 项内容"], ["今天要完成", "选择 3 项并安排日期"], ["还缺", "商户图片和参加确认"]],
      action: "安排第一轮内容",
      progress: 58,
      steps: [["内容整理", "完成", "done"], ["安排发布和负责人", "现在", "current"], ["收集发布反馈", "下一步", ""]],
      detail: {
        type: "任务", title: "今天安排第一轮内容", summary: "先把可用内容排进日期，再向商户收集缺少的图片和确认。",
        rows: [["先选择", "地方食物人物故事、小红书内容、现场路线"], ["再安排", "发布日期和负责人"], ["最后补齐", "参加商户、产品图片和现场信息"]],
      },
    },
    cards: [
      { id: "ops-ready", type: "achievement", time: "今天 10:05", title: "6 项内容已经完成整理，可以进入发布安排", summary: "现有文字和图片已经按项目、商户与现场三类整理完成。", statLabel: "可用内容", stat: "6 项", action: "查看内容", rows: [["项目内容", "项目介绍和本月变化"], ["商户内容", "人物、产品和经营故事"], ["现场内容", "活动、路线和体验信息"]] },
      { id: "ops-schedule", type: "task", time: "今天 09:35", title: "今天需要确定 3 项内容的发布日期和负责人", summary: "确定后，第一轮内容测试才会进入实际执行。", statLabel: "今天要安排", stat: "3 项", action: "查看安排", rows: [["内容 1", "地方食物人物故事"], ["内容 2", "小红书图文"], ["内容 3", "现场体验路线"]] },
      { id: "ops-material", type: "task", time: "昨天 18:10", title: "还缺首批商户的产品图片和参加确认", summary: "这些资料没有补齐，商户内容和现场活动只能保留为草稿。", statLabel: "等待商户", stat: "2–3 家", action: "查看缺少资料", rows: [["需要图片", "产品、人物和门店现场"], ["需要确认", "愿意参加的内容和活动"], ["建议", "先向 2–3 家商户发送填写链接"]] },
      { id: "ops-calendar", type: "achievement", time: "昨天 14:20", title: "本月内容日期已经完成第一版安排", summary: "公众号、小红书、短视频和现场活动已放入初步时间表，等待负责人确认。", statLabel: "已安排", stat: "4 类", action: "查看时间表", rows: [["公众号", "项目和地方食物长文"], ["小红书", "人物故事和现场体验"], ["短视频与活动", "确认素材后安排具体日期"]] },
    ],
  },
  leasing: {
    intro: "先看可以联系的方向、已经准备的材料和明确的下一步。",
    hint: "例如：我想先联系 3 个地方食物品牌",
    priority: {
      title: "先填写 3 个具体品牌名称，再开始第一轮联系",
      summary: "适合的品牌类型和通用介绍已经准备好，但没有具体名称，就不能判断是否匹配，也不能记录联系结果。",
      facts: [["适合类型", "3 类品牌"], ["可以发送", "3 组介绍材料"], ["还缺", "具体品牌名称"]],
      action: "整理第一批品牌名单",
      progress: 36,
      steps: [["品牌方向和材料", "完成", "done"], ["填写具体品牌", "现在", "current"], ["联系并记录回复", "下一步", ""]],
      detail: {
        type: "任务", title: "整理第一批品牌名单", summary: "每类先填写 1 个具体品牌，再逐一确认是否适合项目。",
        rows: [["地方食物品牌", "有明确产地、人物和产品故事"], ["主理人餐饮", "适合联合主题、限定产品和活动"], ["地方文化产品", "适合游客购买和现场零售"]],
      },
    },
    cards: [
      { id: "leasing-leads", type: "result", time: "今天 10:15", title: "目前还没有具体品牌进入联系名单", summary: "系统已经整理出适合的品牌方向，但真实品牌名称仍为 0。", statLabel: "具体品牌", stat: "0 个", action: "查看适合方向", rows: [["方向 1", "地方食物代表品牌"], ["方向 2", "主理人餐饮品牌"], ["方向 3", "地方文化产品品牌"]] },
      { id: "leasing-materials", type: "achievement", time: "今天 09:25", title: "项目、空间和内容介绍已经可以发送", summary: "现有材料可以先用于初步沟通，具体合作条件仍需按品牌补充。", statLabel: "可用材料", stat: "3 组", action: "查看材料", rows: [["项目介绍", "定位、本月重点和客群"], ["空间介绍", "场地、位置和体验方式"], ["内容介绍", "已有内容和可以合作的方向"]] },
      { id: "leasing-next", type: "task", time: "昨天 17:40", title: "下一步：每类先填写 1 个品牌并确认联系人", summary: "先从 3 个具体品牌开始，比继续扩充通用名单更容易获得真实回复。", statLabel: "第一批", stat: "3 个", action: "查看填写要求", rows: [["品牌名称", "必须填写具体名称"], ["联系对象", "确认负责合作或拓展的人"], ["记录内容", "是否回复、关注什么、下一次联系时间"]] },
      { id: "leasing-blocker", type: "decision", time: "昨天 15:30", title: "需要确认：第一轮先联系哪一类品牌", summary: "建议先联系地方食物代表品牌，因为现有内容和项目定位与这类品牌最匹配。", statLabel: "建议优先", stat: "地方食物", action: "查看建议", rows: [["建议先联系", "地方食物代表品牌"], ["为什么", "已有真实产品和人物内容可以直接说明合作价值"], ["第二顺位", "主理人餐饮品牌"]] },
    ],
  },
};

const state = { role: "owner" };

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderFacts(facts) {
  return facts.map(([label, value]) => `<span><small>${label}</small><strong>${value}</strong></span>`).join("");
}

function renderSteps(steps) {
  return steps.map(([label, stateLabel, className]) => `<li class="${className}"><i></i><span>${label}</span><b>${stateLabel}</b></li>`).join("");
}

function renderCard(card) {
  return `<article class="stream-card ${card.type}" data-card-id="${card.id}">
    <div class="card-main">
      <div class="card-kicker"><span class="card-type">${cardTypeLabels[card.type]}</span><time class="card-time">${card.time}</time></div>
      <h3>${card.title}</h3>
      <p>${card.summary}</p>
    </div>
    <aside class="card-side">
      <span class="card-stat"><small>${card.statLabel}</small><strong>${card.stat}</strong></span>
      <button class="card-action" type="button">${card.action}</button>
    </aside>
  </article>`;
}

function renderHome() {
  const data = homeData[state.role];
  const priority = data.priority;
  $("#priorityTitle").textContent = priority.title;
  $("#prioritySummary").textContent = priority.summary;
  $("#priorityFacts").innerHTML = renderFacts(priority.facts);
  $("#priorityAction").textContent = priority.action;
  $("#priorityProgress").textContent = priority.progress;
  $("#priorityProgressBar").style.width = `${priority.progress}%`;
  $("#prioritySteps").innerHTML = renderSteps(priority.steps);
  $("#streamIntro").textContent = data.intro;
  $("#composerHint").textContent = data.hint;
  $("#activityStream").innerHTML = data.cards.map(renderCard).join("");
  $("#aiPrompt").value = "";
  document.querySelectorAll("[data-role]").forEach((button) => button.classList.toggle("active", button.dataset.role === state.role));
}

function openDialog(detail) {
  $("#dialogType").textContent = detail.type;
  $("#dialogTitle").textContent = detail.title;
  $("#dialogSummary").textContent = detail.summary;
  $("#dialogBody").innerHTML = detail.rows.map(([label, value]) => `<div class="dialog-row"><small>${label}</small><strong>${value}</strong></div>`).join("");
  $("#detailDialog").showModal();
}

function openCard(cardId) {
  const card = homeData[state.role].cards.find((item) => item.id === cardId);
  if (!card) return;
  openDialog({ type: cardTypeLabels[card.type], title: card.title, summary: card.summary, rows: card.rows });
}

function buildPromptCard(prompt) {
  const normalized = prompt.trim();
  const isQuestion = /为什么|结果|情况|多少|怎么样/.test(normalized);
  const type = isQuestion ? "result" : (state.role === "owner" || /决定|确认|预算/.test(normalized) ? "decision" : "task");
  const roleNext = {
    owner: "我已把它放到老板需要决定的事项前面。下一步先明确范围、负责人和完成时间。",
    operations: "我已把它整理成今天的优先任务。下一步先确认所需资料、负责人和完成时间。",
    leasing: "我已把它放到第一批联系计划前面。下一步先明确品牌名称、联系人和联系时间。",
  }[state.role];
  return {
    id: `prompt-${Date.now()}`,
    type,
    time: "刚刚",
    title: normalized,
    summary: roleNext,
    statLabel: "当前状态",
    stat: isQuestion ? "已整理" : "先处理",
    action: "查看下一步",
    rows: [["你想推动", normalized], ["系统建议", roleNext], ["说明", "这是演示整理结果，不会写入项目资料"]],
  };
}

document.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => {
  state.role = button.dataset.role;
  renderHome();
  showToast(`已切换到${button.textContent}首页`);
}));

$("#priorityAction").addEventListener("click", () => openDialog(homeData[state.role].priority.detail));
$("#activityStream").addEventListener("click", (event) => {
  const button = event.target.closest(".card-action");
  if (!button) return;
  openCard(button.closest(".stream-card").dataset.cardId);
});
$("#dialogConfirm").addEventListener("click", () => $("#detailDialog").close());

$("#aiComposer").addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = $("#aiPrompt").value.trim();
  if (!prompt) {
    showToast("请先写下你今天想推动的事");
    $("#aiPrompt").focus();
    return;
  }
  const card = buildPromptCard(prompt);
  homeData[state.role].cards.unshift(card);
  $("#activityStream").insertAdjacentHTML("afterbegin", renderCard(card));
  $("#aiPrompt").value = "";
  $("#activityStream").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("已经整理成一条新的项目动态");
});

renderHome();
