#!/usr/bin/env python3
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "review-manifest.json"
MODEL_REVIEW = ROOT / "MODEL_REVIEW.md"
EXPECTED_SCREEN_COUNT = 16


def fail(message):
    raise SystemExit(f"FAIL: {message}")


def main():
    if not MANIFEST.is_file():
        fail("review-manifest.json is missing")
    if not MODEL_REVIEW.is_file():
        fail("MODEL_REVIEW.md is missing")

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
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

    forbidden = ["127.0.0.1", "localhost", "trycloudflare.com"]
    for value in forbidden:
        if value in review_text:
            fail(f"model entry contains unstable address: {value}")

    secret_pattern = re.compile(r"(?:sk|api)[-_][A-Za-z0-9]{20,}", re.IGNORECASE)
    for path in [MODEL_REVIEW, MANIFEST, ROOT / "README.md"]:
        if secret_pattern.search(path.read_text(encoding="utf-8")):
            fail(f"possible credential found in {path.name}")

    print(f"PASS: {len(screens)} screens, stable model entry, no local or temporary URLs")


if __name__ == "__main__":
    main()
