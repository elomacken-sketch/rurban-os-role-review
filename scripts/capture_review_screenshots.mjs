import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "screenshots");
const views = resolve(output, "views");
const url = process.env.REVIEW_URL || "http://127.0.0.1:8793/app/";
const executablePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await mkdir(views, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

async function screenshot(name, rootName = null) {
  await page.screenshot({ path: resolve(views, name), animations: "disabled" });
  if (rootName) await page.screenshot({ path: resolve(output, rootName), animations: "disabled" });
}

async function clearToast() {
  await page.locator("#toast").evaluate((node) => node.classList.remove("show"));
}

async function selectRole(role) {
  await page.locator(`[data-role="${role}"]`).click();
  await page.waitForTimeout(300);
  await clearToast();
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function selectNavigation(key) {
  await page.locator(`[data-nav-key="${key}"]`).click();
  await page.waitForTimeout(700);
  await clearToast();
}

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector("#ownerAiReason");
await page.waitForTimeout(500);
await clearToast();

await screenshot("owner-overview.png", "owner.png");

await page.locator('[data-owner-metric="testing"]').click();
await screenshot("owner-metric-detail.png");
await page.locator('#ownerMetricDialog footer button[value="cancel"]').click();

await page.locator('[data-owner-report="weekly"]').click();
await screenshot("owner-weekly-report.png");
await page.locator('#ownerReportDialog footer button[value="cancel"]').click();

await page.locator('[data-owner-prompt="为什么第一轮测试还没有开始？"]').click();
await page.waitForTimeout(500);
await page.locator("#ownerAiAnswer").scrollIntoViewIfNeeded();
await screenshot("owner-ai-answer.png");
console.log("captured owner");

await selectRole("operations");
await screenshot("operations-today.png", "operations.png");
await selectNavigation("operations-calendar");
await screenshot("operations-calendar.png");
await selectNavigation("operations-content");
await screenshot("operations-content.png");
console.log("captured operations");

await selectRole("leasing");
await screenshot("leasing-overview.png", "leasing.png");
await selectNavigation("leasing-candidates");
await screenshot("leasing-candidates.png");
await selectNavigation("leasing-ammo");
await screenshot("leasing-ammo.png");
await selectNavigation("leasing-merchants");
await screenshot("leasing-merchants.png");
console.log("captured leasing");

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await clearToast();
await page.evaluate(() => openWizard());
await screenshot("input-step-1.png");
for (let step = 2; step <= 5; step += 1) {
  await page.locator("#wizardNext").click();
  await page.waitForTimeout(100);
  await screenshot(`input-step-${step}.png`);
}
console.log("captured inputs");

await page.goto(url, { waitUntil: "networkidle" });
await selectRole("merchant");
await screenshot("merchant-step-1.png", "merchant.png");
await page.locator('[data-merchant-step="1"] [data-merchant-next]').click();
await clearToast();
await screenshot("merchant-step-2.png");
await page.locator('[data-merchant-step="2"] [data-merchant-next]').click();
await clearToast();
await screenshot("merchant-step-3.png");
console.log("captured merchant");

await browser.close();
console.log("PASS: captured 19 review states and 4 role overviews");
