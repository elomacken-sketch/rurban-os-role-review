#!/usr/bin/env python3
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "rurban-os-model-review.pdf"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")
PAGE_SIZE = (1000, 700)

MODEL_REVIEW_URL = "https://github.com/elomacken-sketch/rurban-os-role-review/blob/main/MODEL_REVIEW.md"
INTERACTIVE_URL = "https://elomacken-sketch.github.io/rurban-os-role-review/app/"

SCREENS = [
    ("老板端", "经营脉搏默认状态", "默认打开，先看经营摘要、四项指标、风险和待决定事项。", "screenshots/views/owner-overview.png"),
    ("老板端交互", "指标详情", "点击“已投入测试”，查看实际、目标、差距、趋势、原因和建议。", "screenshots/views/owner-metric-detail.png"),
    ("老板端交互", "周报简报", "点击周报入口，打开本周进展、问题和下一步。", "screenshots/views/owner-weekly-report.png"),
    ("老板端交互", "问 AI", "追问经营验证未开始的原因，查看基于当前指标的回答。", "screenshots/views/owner-ai-answer.png"),
    ("运营端", "今日工作台", "按优先级查看任务、负责人、截止时间和缺失素材。", "screenshots/views/operations-today.png"),
    ("运营端", "内容日历与活动", "查看渠道排期、活动、素材和审核节点。", "screenshots/views/operations-calendar.png"),
    ("运营端", "内容生产", "切换平台并查看生成内容的成品预览。", "screenshots/views/operations-content.png"),
    ("招商端", "招商推进总览", "查看目标、真实线索数量、当前阻碍和下一步。", "screenshots/views/leasing-overview.png"),
    ("招商端", "品牌画像与候选库", "查看候选类型、匹配理由和待验证事项。", "screenshots/views/leasing-candidates.png"),
    ("招商端", "铺位与招商材料", "查看铺位适配理由和当前可用材料。", "screenshots/views/leasing-ammo.png"),
    ("招商端", "商户协同反馈", "查看参与商户、任务、截止时间和反馈状态。", "screenshots/views/leasing-merchants.png"),
    ("商户任务", "产品与价格", "第一步：提交本月真实产品、价格和推荐理由。", "screenshots/views/merchant-step-1.png"),
    ("商户任务", "图片与故事", "第二步：上传原图并填写真实品牌或产品故事。", "screenshots/views/merchant-step-2.png"),
    ("商户任务", "确认参与方式", "第三步：确认内容、活动和联合传播参与方式。", "screenshots/views/merchant-step-3.png"),
    ("每月输入", "选择本月目标", "第一步：选择本月唯一首要经营目标。", "screenshots/views/input-step-1.png"),
    ("每月输入", "选择重点客群", "第二步：选择本月核心客群。", "screenshots/views/input-step-2.png"),
    ("每月输入", "确认费用范围", "第三步：确认本轮费用范围。", "screenshots/views/input-step-3.png"),
    ("每月输入", "选择第一优先级", "第四步：确认资源第一优先级。", "screenshots/views/input-step-4.png"),
    ("每月输入", "补充本月变化", "第五步：只补充本月新增变化。", "screenshots/views/input-step-5.png"),
]


def wrap_text(text, font_name, font_size, max_width):
    lines = []
    current = ""
    for character in text:
        candidate = current + character
        if current and pdfmetrics.stringWidth(candidate, font_name, font_size) > max_width:
            lines.append(current)
            current = character
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def draw_cover(pdf):
    width, height = PAGE_SIZE
    pdf.setFillColor(HexColor("#050505"))
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#f1c84a"))
    pdf.rect(0, height - 10, width, 10, fill=1, stroke=0)

    pdf.setFont("RurbanCN", 13)
    pdf.setFillColor(HexColor("#46d3c1"))
    pdf.drawString(60, 610, "RURBAN OS · 外部模型固定评审包")
    pdf.setFont("RurbanCN", 34)
    pdf.setFillColor(white)
    pdf.drawString(60, 545, "视觉与交互状态评审")
    pdf.setFont("RurbanCN", 15)
    pdf.setFillColor(HexColor("#d0d0ca"))
    pdf.drawString(60, 505, "供 Claude、GPT、Gemini 在交互页不可访问时直接复核")

    notes = [
        "包含 19 个固定页面与关键点击后状态。",
        "页面使用 MOCK 数据，只评估信息架构、视觉、理解成本和交互逻辑。",
        "PDF 不依赖 JavaScript、浏览器扩展、临时隧道或本地地址。",
        "有浏览器能力时，仍应使用公开只读交互版实际点击。",
    ]
    y = 410
    pdf.setFont("RurbanCN", 13)
    for index, note in enumerate(notes, start=1):
        pdf.setFillColor(HexColor("#ff5b46"))
        pdf.drawString(60, y, f"{index:02d}")
        pdf.setFillColor(white)
        pdf.drawString(100, y, note)
        y -= 48

    pdf.setFillColor(HexColor("#f1c84a"))
    pdf.roundRect(60, 105, 420, 54, 5, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#050505"))
    pdf.setFont("RurbanCN", 12)
    pdf.drawString(82, 126, "模型完整评审文档")
    pdf.linkURL(MODEL_REVIEW_URL, (60, 105, 480, 159), relative=0)

    pdf.setStrokeColor(HexColor("#666963"))
    pdf.roundRect(500, 105, 420, 54, 5, fill=0, stroke=1)
    pdf.setFillColor(white)
    pdf.drawString(522, 126, "浏览器只读交互版")
    pdf.linkURL(INTERACTIVE_URL, (500, 105, 920, 159), relative=0)

    pdf.setFillColor(HexColor("#8d8f89"))
    pdf.setFont("RurbanCN", 9)
    pdf.drawString(60, 52, "版本：2026-07-17 · 只读 · 不连接数据库 · 不保存操作")
    pdf.showPage()


def draw_screen(pdf, index, role, title, description, image_path):
    width, height = PAGE_SIZE
    pdf.setFillColor(HexColor("#efefeb"))
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#050505"))
    pdf.rect(0, height - 76, width, 76, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#f1c84a"))
    pdf.rect(0, height - 5, width, 5, fill=1, stroke=0)

    pdf.setFont("RurbanCN", 10)
    pdf.setFillColor(HexColor("#46d3c1"))
    pdf.drawString(30, height - 28, role)
    pdf.setFont("RurbanCN", 19)
    pdf.setFillColor(white)
    pdf.drawString(30, height - 55, title)
    pdf.setFont("RurbanCN", 9)
    pdf.setFillColor(HexColor("#b8b8b2"))
    description_lines = wrap_text(description, "RurbanCN", 9, 410)
    for line_index, line in enumerate(description_lines[:2]):
        pdf.drawRightString(width - 30, height - 35 - (line_index * 14), line)

    image_file = ROOT / image_path
    if not image_file.is_file():
        raise FileNotFoundError(image_file)
    with Image.open(image_file) as image:
        image_width, image_height = image.size
    max_width, max_height = width - 60, height - 122
    scale = min(max_width / image_width, max_height / image_height)
    draw_width = image_width * scale
    draw_height = image_height * scale
    x = (width - draw_width) / 2
    y = 38 + (max_height - draw_height) / 2

    pdf.setFillColor(white)
    pdf.setStrokeColor(HexColor("#c9c9c2"))
    pdf.rect(x - 5, y - 5, draw_width + 10, draw_height + 10, fill=1, stroke=1)
    pdf.drawImage(ImageReader(str(image_file)), x, y, width=draw_width, height=draw_height, preserveAspectRatio=True)

    pdf.setFillColor(HexColor("#666963"))
    pdf.setFont("RurbanCN", 8)
    pdf.drawString(30, 16, "Rurban OS 外部模型视觉与交互评审包")
    pdf.drawRightString(width - 30, 16, f"{index:02d} / {len(SCREENS):02d}")
    pdf.showPage()


def main():
    if not FONT_PATH.is_file():
        raise SystemExit(f"Chinese font is missing: {FONT_PATH}")
    pdfmetrics.registerFont(TTFont("RurbanCN", str(FONT_PATH)))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=PAGE_SIZE, pageCompression=1)
    pdf.setTitle("Rurban OS 外部模型视觉与交互评审包")
    pdf.setAuthor("Rurban OS")
    pdf.setSubject("Read-only cross-model frontend review")
    draw_cover(pdf)
    for index, screen in enumerate(SCREENS, start=1):
        draw_screen(pdf, index, *screen)
    pdf.save()
    print(f"PASS: generated {OUTPUT.relative_to(ROOT)} with {len(SCREENS) + 1} pages")


if __name__ == "__main__":
    main()
