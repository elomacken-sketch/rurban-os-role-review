const $ = (selector) => document.querySelector(selector);

const state = {
  version: 1,
  planConfirmed: false,
  scheduleGenerated: false,
  busy: false,
};

const detailText = {
  sources: "使用：项目定位、本月目标、目标顾客、6 项现有内容、商户配合要求和适合联系的品牌方向，共 11 项信息。",
  gaps: "仍缺：本轮费用上限、首批参加商户、具体品牌名称。这些内容不会由系统自行补写。",
  draft: "当前只生成方案草稿。发布日期、负责人、商户任务和品牌联系尚未开始。",
};

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2300);
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function addTurn(role, text, note = "刚刚") {
  const section = document.createElement("section");
  section.className = `turn ${role === "user" ? "user-turn" : "assistant-turn"}`;
  const avatar = document.createElement("b");
  avatar.textContent = role === "user" ? "你" : "AI";
  const body = document.createElement("div");
  const small = document.createElement("small");
  small.textContent = note;
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  body.append(small, paragraph);
  section.append(avatar, body);
  $("#dynamicConversation").append(section);
  section.scrollIntoView({ behavior: "smooth", block: "end" });
}

function addActivity(lines) {
  const section = document.createElement("section");
  section.className = "activity update-activity";
  section.innerHTML = `<header><span>正在更新方案</span><small>只修改相关部分</small></header><ol>${lines.map((line, index) => `<li class="${index === 0 ? "current" : ""}"><i></i><span><strong>${line}</strong><small>${index === 0 ? "正在处理" : "等待前一步完成"}</small></span><em>${index === 0 ? "现在" : "等待"}</em></li>`).join("")}</ol>`;
  $("#dynamicConversation").append(section);
  section.scrollIntoView({ behavior: "smooth", block: "center" });
  return section;
}

function completeActivity(section) {
  section.querySelectorAll("li").forEach((item) => {
    item.className = "done";
    item.querySelector("small").textContent = "完成";
    item.querySelector("em").textContent = "完成";
  });
}

function updateVersion() {
  state.version += 1;
  const label = `v0.${state.version}`;
  $("#versionButton").textContent = label;
  $("#documentVersion").textContent = label;
}

function applyPlanChange(prompt) {
  const number = prompt.match(/([0-9][0-9,]*)\s*元/);
  if (/费用|预算|花费/.test(prompt)) {
    const amount = number ? number[1].replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "5,000";
    $("#budgetText").textContent = `本轮费用控制在 ${amount} 元以内；没有反馈前不扩大投入。`;
    $("#budgetDecision").textContent = `费用上限：${amount} 元以内`;
    return `已经把本轮费用上限改为 ${amount} 元以内。方案仍是草稿，需要你确认后才能进入排期。`;
  }
  if (/年轻|顾客|客群/.test(prompt)) {
    $("#audienceText").textContent = "优先聚焦本地年轻消费者：他们更容易通过小红书和人物故事形成到访动机。游客和潜在商户作为第二观察人群。";
    return "已经补充选择本地年轻消费者的原因。方案仍未确认，排期保持锁定。";
  }
  if (/3 项|三项|周期|7 天|七天/.test(prompt)) {
    return "已经保留 3 项内容和 7 天测试周期，并明确这只是方案范围，不代表已经排期。";
  }
  return `已经根据“${prompt}”更新方案说明。排期和后续任务仍然保持锁定。`;
}

async function submitPlanChange(prompt) {
  const text = prompt.trim();
  if (!text) {
    showToast("请先写下需要修改的内容");
    $("#prompt").focus();
    return;
  }
  if (state.busy) {
    showToast("当前内容还在处理，请稍等");
    return;
  }
  if (state.planConfirmed) {
    addTurn("assistant", "方案已经确认。修改核心方向前需要先重新打开方案，本页不会直接覆盖已确认版本。", "没有修改");
    showToast("已确认方案不会被直接覆盖");
    return;
  }

  state.busy = true;
  addTurn("user", text);
  const activity = addActivity(["理解修改要求", "更新方案相关段落", "检查是否影响后续阶段"]);
  await wait(420);
  const items = activity.querySelectorAll("li");
  items[0].className = "done";
  items[0].querySelector("small").textContent = "完成";
  items[0].querySelector("em").textContent = "完成";
  items[1].className = "current";
  items[1].querySelector("small").textContent = "正在处理";
  items[1].querySelector("em").textContent = "现在";
  await wait(480);
  const response = applyPlanChange(text);
  updateVersion();
  completeActivity(activity);
  addTurn("assistant", response, "方案已更新");
  $("#prompt").value = "";
  state.busy = false;
}

function confirmPlan() {
  if (state.planConfirmed || state.busy) return;
  state.planConfirmed = true;
  document.body.dataset.stage = "plan-confirmed";
  $("#headerStage").textContent = "方案已确认";
  $("#artifactState").textContent = "已确认";
  $("#planDocument .document-status b").textContent = "方案已确认";
  $("#planDocument .document-status span").textContent = "尚未生成内容排期";
  $("#approvalStatus").textContent = "方案已经确认";
  $("#approvalHint").textContent = "排期尚未开始，需要明确点击下一步";
  $("#confirmPlan").textContent = "方案已确认";
  $("#confirmPlan").disabled = true;
  $("#continueEditing").textContent = "查看已确认方案";
  document.querySelector('[data-stage-step="plan"]').className = "complete";
  document.querySelector('[data-stage-step="confirm"]').className = "complete";
  document.querySelector('[data-stage-step="schedule"]').className = "ready";
  $("#mainActivity li.current strong").textContent = "方案已经确认";
  $("#mainActivity li.current small").textContent = "排期尚未开始，等待你明确启动";
  $("#mainActivity li.current em").textContent = "完成";
  $("#mainActivity li.current").className = "done";
  $("#nextStage").hidden = false;
  addTurn("assistant", "方案已经确认。我还没有生成排期。请明确点击“开始生成内容排期”，我再进入下一阶段。", "等待下一步");
  $("#nextStage").scrollIntoView({ behavior: "smooth", block: "center" });
  showToast("方案已确认，排期仍未开始");
}

function scheduleMarkup() {
  return `<header><span>基于已确认方案生成</span><h2>第一轮内容测试排期</h2><p>2026年8月17日—23日 · 排期草稿</p></header><div class="schedule-body"><p class="schedule-note">这份排期只在方案确认后生成。负责人和参加商户仍需人工确认。</p><table class="schedule-table"><thead><tr><th>日期</th><th>内容</th><th>准备事项</th><th>当前情况</th></tr></thead><tbody><tr><td>8月17日 周一</td><td><strong>地方食物人物故事</strong><small>公众号 / 小红书</small></td><td>确认人物、文字和图片</td><td>负责人待确认</td></tr><tr><td>8月19日 周三</td><td><strong>城市味觉图文</strong><small>小红书</small></td><td>确认标题和最终图片</td><td>图片待确认</td></tr><tr><td>8月22日 周六</td><td><strong>周末现场体验路线</strong><small>现场内容</small></td><td>确认参加商户和路线</td><td>商户待确认</td></tr><tr><td>8月23日 周日</td><td><strong>整理第一轮反馈</strong><small>内部记录</small></td><td>顾客、商户和品牌反馈</td><td>尚未开始</td></tr></tbody></table></div>`;
}

async function generateSchedule() {
  if (!state.planConfirmed || state.scheduleGenerated || state.busy) return;
  state.busy = true;
  document.querySelector('[data-stage-step="schedule"]').className = "active";
  $("#headerStage").textContent = "正在生成排期";
  $("#approvalStatus").textContent = "正在生成内容排期";
  $("#approvalHint").textContent = "只使用已经确认的方案方向";
  $("#startSchedule").disabled = true;
  $("#startSchedule").textContent = "正在生成排期";
  showToast("已经开始生成内容排期");
  $("#generating").hidden = false;
  addTurn("user", "开始生成内容排期。", "刚刚");
  const activity = addActivity(["读取已确认方案", "按 7 天测试周期安排内容", "保留负责人和商户待确认项"]);
  await wait(500);
  const labels = ["正在读取已确认方案", "正在安排一周内容", "正在检查待确认信息"];
  for (let index = 0; index < 3; index += 1) {
    $("#generatingLabel").textContent = labels[index];
    const items = activity.querySelectorAll("li");
    items.forEach((item, itemIndex) => {
      item.className = itemIndex < index ? "done" : (itemIndex === index ? "current" : "");
      item.querySelector("em").textContent = itemIndex < index ? "完成" : (itemIndex === index ? "现在" : "等待");
    });
    await wait(520);
  }
  completeActivity(activity);
  state.scheduleGenerated = true;
  $("#scheduleDocument").innerHTML = scheduleMarkup();
  $("#scheduleDocument").hidden = false;
  $("#planDocument").hidden = true;
  $("#artifactKind").textContent = "内容排期";
  $("#artifactName").textContent = "第一轮内容测试排期";
  $("#artifactState").textContent = "排期草稿";
  $("#headerStage").textContent = "排期草稿已生成";
  $("#generating").hidden = true;
  $("#approvalStatus").textContent = "排期草稿已经生成";
  $("#approvalHint").textContent = "负责人和参加商户仍需确认";
  $("#continueEditing").textContent = "返回查看方案";
  $("#confirmPlan").textContent = "确认排期前先检查";
  $("#startSchedule").textContent = "排期已经生成";
  document.querySelector('[data-stage-step="schedule"]').className = "active";
  addTurn("assistant", "排期草稿已经生成。发布日期来自已确认的 7 天测试范围；负责人和参加商户仍保留为待确认。", "排期已生成");
  state.busy = false;
  showToast("内容排期已在确认方案后生成");
}

function planMarkdown() {
  return `# 地方口袋美食食集｜2026年8月第一轮内容测试方案\n\n状态：${state.planConfirmed ? "已确认" : "未确认草稿"}\n版本：v0.${state.version}\n\n## 本轮目标\n用7天完成第一轮小范围内容测试，并记录真实反应。\n\n## 建议测试内容\n1. 地方食物人物故事\n2. 小红书图文\n3. 现场体验路线\n\n## 投入原则\n${$("#budgetText").textContent}\n\n## 仍需确认\n- 首批参加商户\n- 具体品牌名称\n- 排期负责人\n`;
}

function downloadMarkdown() {
  const content = state.scheduleGenerated ? "# 第一轮内容测试排期\n\n基于已确认方案生成。\n\n- 8月17日：地方食物人物故事\n- 8月19日：城市味觉图文\n- 8月22日：周末现场体验路线\n- 8月23日：整理反馈\n" : planMarkdown();
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = state.scheduleGenerated ? "地方口袋_第一轮内容测试排期.md" : "地方口袋_2026年8月内容测试方案.md";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("当前结果已经下载");
}

document.querySelectorAll("[data-detail]").forEach((button) => button.addEventListener("click", () => {
  $("#activityDetail").textContent = detailText[button.dataset.detail];
  $("#activityDetail").hidden = false;
}));
document.querySelectorAll("[data-suggestion]").forEach((button) => button.addEventListener("click", () => submitPlanChange(button.dataset.suggestion)));
$("#composer").addEventListener("submit", (event) => { event.preventDefault(); submitPlanChange($("#prompt").value); });
$("#confirmPlan").addEventListener("click", confirmPlan);
$("#continueEditing").addEventListener("click", () => {
  if (state.scheduleGenerated) {
    $("#scheduleDocument").hidden = true;
    $("#planDocument").hidden = false;
    $("#artifactKind").textContent = "月度方案";
    $("#artifactName").textContent = "2026年8月第一轮内容测试方案";
    $("#artifactState").textContent = "已确认";
    return;
  }
  $("#prompt").focus();
});
$("#startSchedule").addEventListener("click", generateSchedule);
$("#downloadResult").addEventListener("click", downloadMarkdown);
$("#copyResult").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(planMarkdown()); showToast("方案已经复制"); }
  catch { showToast("浏览器没有开放复制权限，请使用下载"); }
});
$("#versionButton").addEventListener("click", () => showToast(`当前是 v0.${state.version}，每次对话修改都会生成新版本`));
