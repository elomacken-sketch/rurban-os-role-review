#!/usr/bin/env python3
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "review-manifest.json"
MODEL_REVIEW = ROOT / "MODEL_REVIEW.md"
VISUAL_PDF = ROOT / "output" / "pdf" / "rurban-os-model-review.pdf"
APP_HTML = ROOT / "app" / "index.html"
APP_JS = ROOT / "app" / "client-preview.js"
PUBLIC_INDEX = ROOT / "index.html"
COPY_TABLE = ROOT / "PLAIN_LANGUAGE_COPY.md"
AI_HOME_REVIEW = ROOT / "AI_HOME_REVIEW.md"
AI_HOME_HTML = ROOT / "home" / "index.html"
AI_HOME_JS = ROOT / "home" / "ai-home.js"
AI_HOME_CSS = ROOT / "home" / "ai-home.css"
EXPECTED_SCREEN_COUNT = 19
EXPECTED_INTERACTION_IDS = {"owner-metric-detail", "owner-weekly-report", "owner-ai-answer"}
FORBIDDEN_USER_COPY = {
    "经营链路",
    "输出件",
    "工作流",
    "Campaign",
    "Gate",
    "资产图谱",
    "真实采用项",
    "候选品牌画像",
    "招商弹药",
    "经营证据",
    "商户赋能",
}
REQUIRED_PLAIN_LANGUAGE = {
    "这个月项目怎么样？",
    "哪些目标还没完成？",
    "现在最需要解决什么？",
    "需要你决定什么？",
    "今天要做什么？",
    "接下来应该联系谁？",
    "本月商户要做什么？",
}


def fail(message):
    raise SystemExit(f"FAIL: {message}")


def main():
    if not MANIFEST.is_file():
        fail("review-manifest.json is missing")
    if not MODEL_REVIEW.is_file():
        fail("MODEL_REVIEW.md is missing")
    if not VISUAL_PDF.is_file() or VISUAL_PDF.stat().st_size < 1_000_000:
        fail("visual interaction PDF is missing or unexpectedly small")
    for path in [APP_HTML, APP_JS, PUBLIC_INDEX, COPY_TABLE, AI_HOME_REVIEW, AI_HOME_HTML, AI_HOME_JS, AI_HOME_CSS]:
        if not path.is_file():
            fail(f"required review artifact is missing: {path.name}")

    home_html = AI_HOME_HTML.read_text(encoding="utf-8")
    home_js = AI_HOME_JS.read_text(encoding="utf-8")
    user_copy = APP_HTML.read_text(encoding="utf-8") + APP_JS.read_text(encoding="utf-8") + PUBLIC_INDEX.read_text(encoding="utf-8") + home_html + home_js
    for value in FORBIDDEN_USER_COPY:
        if value in user_copy:
            fail(f"ordinary-user app contains forbidden copy: {value}")
    for value in REQUIRED_PLAIN_LANGUAGE:
        if value not in user_copy:
            fail(f"ordinary-user app is missing required question: {value}")

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    experimental_home = manifest.get("experimental_home", {})
    if experimental_home.get("roles") != ["owner", "operations", "leasing"]:
        fail("AI home roles are not owner, operations, and leasing")
    if experimental_home.get("card_types") != ["result", "decision", "achievement", "task"]:
        fail("AI home card types changed")
    if experimental_home.get("merchant_entry") is not False:
        fail("merchant must not enter the internal AI home")
    if 'data-role="merchant"' in home_html or 'class="sidebar"' in home_html:
        fail("AI home contains a merchant entry or sidebar")
    if "fetch(" in home_js or "/api/" in home_js:
        fail("AI home must remain frontend-only")
    for screenshot in ["screenshots/ai-home/owner.png", "screenshots/ai-home/operations.png", "screenshots/ai-home/leasing.png"]:
        if not (ROOT / screenshot).is_file() or screenshot not in AI_HOME_REVIEW.read_text(encoding="utf-8"):
            fail(f"AI home screenshot is missing from static review: {screenshot}")

    screens = manifest.get("screens", [])
    if len(screens) != EXPECTED_SCREEN_COUNT:
        fail(f"expected {EXPECTED_SCREEN_COUNT} screens, found {len(screens)}")

    seen_ids = set()
    review_text = MODEL_REVIEW.read_text(encoding="utf-8")
    for screen in screens:
        screen_id = screen.get("id")
        screenshot = screen.get("screenshot")
        if not screen_id or screen_id in seen_ids:
            fail(f"missing or duplicate screen id: {screen_id}")
        seen_ids.add(screen_id)
        if not screenshot or not (ROOT / screenshot).is_file():
            fail(f"missing screenshot for {screen_id}: {screenshot}")
        if screenshot not in review_text:
            fail(f"MODEL_REVIEW.md does not link {screenshot}")

    if not EXPECTED_INTERACTION_IDS.issubset(seen_ids):
        fail("owner interaction evidence is incomplete")
    if str(VISUAL_PDF.relative_to(ROOT)) not in review_text:
        fail("MODEL_REVIEW.md does not link the visual interaction PDF")

    forbidden = ["127.0.0.1", "localhost", "trycloudflare.com"]
    for value in forbidden:
        if value in review_text:
            fail(f"model entry contains unstable address: {value}")

    secret_pattern = re.compile(r"(?:sk|api)[-_][A-Za-z0-9]{20,}", re.IGNORECASE)
    for path in [MODEL_REVIEW, MANIFEST, ROOT / "README.md"]:
        if secret_pattern.search(path.read_text(encoding="utf-8")):
            fail(f"possible credential found in {path.name}")

    print(f"PASS: {len(screens)} screens, plain-language app, visual interaction PDF, stable model entry")


if __name__ == "__main__":
    main()
