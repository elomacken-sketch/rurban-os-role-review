const $ = (selector) => document.querySelector(selector);

const demoSteps = [
  { key: "sources", label: "正在读取现有资料", delay: 550 },
  { key: "gaps", label: "正在找出还缺的信息", delay: 650 },
  { key: "create", label: "正在生成四种结果", delay: 850 },
  { key: "check", label: "正在检查数字和说法", delay: 650 },
  { key: "ready", label: "正在交付第一版结果", delay: 550 },
];

const state = {
  activeArtifact: "summary",
  version: 1,
  running: false,
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

function setArtifact(name) {
  state.activeArtifact = name;
  document.querySelectorAll("[data-artifact]").forEach((button) => button.classList.toggle("active", button.dataset.artifact === name));
  document.querySelectorAll("[data-artifact-view]").forEach((view) => view.classList.toggle("active", view.dataset.artifactView === name));
}

function setProcessState(key, status) {
  const item = document.querySelector(`[data-process-step="${key}"]`);
  if (!item) return;
  item.className = status;
  const label = item.querySelector("summary > b");
  label.textContent = status === "done" ? "完成" : (status === "active" ? "正在处理" : "等待");
}

function resetProcess() {
  demoSteps.forEach((step) => setProcessState(step.key, "pending"));
  $("#processStatus").textContent = "正在处理";
  $("#processStatus").classList.add("running");
  $("#artifactGenerating").hidden = false;
  $("#generatingTitle").textContent = demoSteps[0].label;
}

async function replayDemo() {
  if (state.running) return;
  state.running = true;
  resetProcess();
  $("#processPanel").scrollIntoView({ behavior: "smooth", block: "center" });

  for (const step of demoSteps) {
    demoSteps.forEach((candidate) => {
      const item = document.querySelector(`[data-process-step="${candidate.key}"]`);
      if (item.classList.contains("active")) setProcessState(candidate.key, "done");
    });
    setProcessState(step.key, "active");
    $("#generatingTitle").textContent = step.label;
    await wait(step.delay);
    setProcessState(step.key, "done");
  }

  $("#processStatus").textContent = "已完成";
  $("#processStatus").classList.remove("running");
  $("#artifactGenerating").hidden = true;
  state.running = false;
  showToast("第一版结果已经重新生成");
}

function addMessage(role, text, note = "刚刚") {
  const article = document.createElement("article");
  article.className = `message ${role === "user" ? "user-message" : "assistant-message"}`;
  const avatar = document.createElement("span");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? "你" : "AI";
  const content = document.createElement("div");
  const small = document.createElement("small");
  small.textContent = note;
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  content.append(small, paragraph);
  article.append(avatar, content);
  $("#conversationThread").append(article);
  article.scrollIntoView({ behavior: "smooth", block: "end" });
  return article;
}

function addUpdateProcess() {
  const panel = document.createElement("section");
  panel.className = "process-panel compact-process";
  panel.innerHTML = `<header><div><span>正在更新</span><h2>根据你的要求修改结果</h2></div><b class="running">处理中</b></header>
    <ol>
      <li class="done"><i></i><details><summary><span><strong>理解修改要求</strong><small>只调整你刚才提到的内容</small></span><b>完成</b></summary></details></li>
      <li class="active"><i></i><details><summary><span><strong>更新相关结果</strong><small>其他结果保持不变</small></span><b>正在处理</b></summary></details></li>
      <li class="pending"><i></i><details><summary><span><strong>检查修改影响</strong><small>确认数字和前后内容一致</small></span><b>等待</b></summary></details></li>
    </ol>`;
  $("#conversationThread").append(panel);
  panel.scrollIntoView({ behavior: "smooth", block: "center" });
  return panel;
}

function updateBudget(prompt) {
  const amount = prompt.match(/(?:预算|费用)?[^0-9]{0,8}([0-9][0-9,]*)\s*元?/);
  if (!/预算|费用|花费/.test(prompt)) return false;
  const display = amount ? `${amount[1].replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 元以内` : "5,000 元以内";
  $("#budgetValue").textContent = display;
  $("#decisionBudget").textContent = `费用上限：${display}`;
  return true;
}

function chooseArtifactForPrompt(prompt) {
  if (/商户|产品|图片|参加/.test(prompt)) return "merchants";
  if (/品牌|招商|联系/.test(prompt)) return "leasing";
  if (/排期|日期|小红书|视频|内容/.test(prompt)) return "calendar";
  return "summary";
}

function responseForPrompt(prompt, artifact, budgetChanged) {
  if (budgetChanged) return `已经把费用上限改为 ${$("#budgetValue").textContent}，并同步更新方案摘要。其他结果保持不变。`;
  if (artifact === "merchants") return "已经切换到商户任务，并保留需要补交的产品、图片和参加确认三类信息。";
  if (artifact === "leasing") return "已经切换到品牌联系。当前先从 3 个具体品牌开始，材料和下一步已经列好。";
  if (artifact === "calendar") return "已经切换到内容排期。第一周安排了 3 项内容，并把负责人和商户确认保留为待补充。";
  return `已经根据“${prompt}”更新方案摘要，并保留尚未确认的信息。`;
}

async function submitPrompt(prompt) {
  if (state.running) {
    showToast("当前结果还在生成，请稍等");
    return;
  }
  const text = prompt.trim();
  if (!text) {
    showToast("请先写下需要修改或生成的内容");
    $("#conversationPrompt").focus();
    return;
  }

  state.running = true;
  addMessage("user", text);
  const process = addUpdateProcess();
  $("#artifactGenerating").hidden = false;
  $("#generatingTitle").textContent = "正在理解修改要求";
  await wait(500);
  const processItems = process.querySelectorAll("li");
  processItems[1].className = "done";
  processItems[1].querySelector("summary > b").textContent = "完成";
  processItems[2].className = "active";
  processItems[2].querySelector("summary > b").textContent = "正在处理";
  $("#generatingTitle").textContent = "正在检查修改影响";

  const budgetChanged = updateBudget(text);
  const artifact = chooseArtifactForPrompt(text);
  setArtifact(budgetChanged ? "summary" : artifact);
  await wait(650);

  processItems[2].className = "done";
  processItems[2].querySelector("summary > b").textContent = "完成";
  process.querySelector("header > b").textContent = "已完成";
  process.querySelector("header > b").classList.remove("running");
  state.version += 1;
  $("#artifactVersion").textContent = `v0.${state.version}`;
  $("#artifactGenerating").hidden = true;
  addMessage("assistant", responseForPrompt(text, artifact, budgetChanged), "结果已更新");
  $("#conversationPrompt").value = "";
  state.running = false;
}

function downloadResult() {
  const content = `# 地方口袋美食食集｜2026年8月第一轮内容测试\n\n` +
    `版本：${$("#artifactVersion").textContent}｜内部草稿\n\n` +
    `## 本轮目标\n用一周验证内容能否带来顾客、商户和品牌的真实反应。\n\n` +
    `## 第一批内容\n- 地方食物人物故事\n- 小红书图文\n- 现场体验路线\n\n` +
    `## 测试安排\n- 周期：7天\n- 费用上限：${$("#budgetValue").textContent}\n- 商户：先确认2至3家\n\n` +
    `## 仍需确认\n- 具体发布日期和负责人\n- 首批参加商户\n- 3个具体品牌名称\n\n` +
    `说明：没有实际反馈的地方保持空白。\n`;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "地方口袋_2026年8月第一轮内容测试.md";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("结果已经导出为 Markdown 文件");
}

document.querySelectorAll("[data-artifact]").forEach((button) => button.addEventListener("click", () => setArtifact(button.dataset.artifact)));
document.querySelectorAll("[data-quick-prompt]").forEach((button) => button.addEventListener("click", () => submitPrompt(button.dataset.quickPrompt)));
document.querySelectorAll("[data-focus-chat]").forEach((button) => button.addEventListener("click", () => {
  $("#conversationPrompt").value = button.dataset.focusChat;
  $("#conversationPrompt").focus();
}));

$("#conversationComposer").addEventListener("submit", (event) => {
  event.preventDefault();
  submitPrompt($("#conversationPrompt").value);
});
$("#conversationPrompt").addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    submitPrompt($("#conversationPrompt").value);
  }
});
$("#replayDemo").addEventListener("click", replayDemo);
$("#editArtifact").addEventListener("click", () => {
  $("#conversationPrompt").value = "请修改这份结果：";
  $("#conversationPrompt").focus();
  showToast("请在左侧写下需要修改的内容");
});
$("#adoptArtifact").addEventListener("click", () => {
  $("#adoptArtifact").textContent = "本页已标记采用";
  showToast("只在当前演示页标记，不会写入项目");
});
$("#exportArtifact").addEventListener("click", downloadResult);

setArtifact("summary");
