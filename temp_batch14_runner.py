from pathlib import Path
import yaml

source = Path('.github/workflows/temp-rurban-japan-batch14-build.yml')
data = yaml.safe_load(source.read_text(encoding='utf-8'))
script = data['jobs']['build']['steps'][2]['run']

# Two Ministry of Land reports moved from the legacy content path to the current common path.
source_replacements = {
    'https://www.mlit.go.jp/sogoseisaku/kanminrenkei/content/001309730.pdf':
        'https://www.mlit.go.jp/common/001236432.pdf',
    'https://www.mlit.go.jp/sogoseisaku/kanminrenkei/content/001309731.pdf':
        'https://www.mlit.go.jp/common/001236433.pdf',
    "resolve_pdf(HOTA_ROOF, ('業務仕様書',))":
        "resolve_pdf(HOTA_ROOF, ('特記仕様書',))",
    "resolve_pdf(HOTA_ROOF, ('提案書評価基準',))":
        "resolve_pdf(HOTA_ROOF, ('評価要領',))",
    "resolve_pdf(HOTA_ROOF, ('施工位置図',))":
        "resolve_pdf(HOTA_ROOF, ('位置図',))",
}
for old, new in source_replacements.items():
    if old not in script:
        raise SystemExit(f'Batch14 source patch target not found: {old}')
    script = script.replace(old, new, 1)

start_marker = "for number, period, year in [(9,2,2021),(12,3,2022),(15,4,2023),(18,5,2024),(21,6,2025)]:"
end_marker = "\n\n# 02 COM CITY"
start = script.find(start_marker)
if start < 0:
    raise SystemExit('Morioka generated-financial block start not found')
end = script.find(end_marker, start)
if end < 0:
    raise SystemExit('Morioka generated-financial block end not found')

replacement_lines = [
    "add(mori, '09_第2期_资产负债表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2022/06/2021taishaku_taishou.pdf')",
    "add(mori, '10_第2期_损益计算书.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2022/06/2021soneki_keisan.pdf')",
    "add(mori, '11_第2期_个别注记表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2022/06/2021kobetsu_cyuki.pdf')",
    "add(mori, '12_第3期_资产负债表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2023/06/2022taishaku_taishou.pdf')",
    "add(mori, '13_第3期_损益计算书.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2023/06/2022soneki_keisan.pdf')",
    "add(mori, '14_第3期_个别注记表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2023/06/2022kobetsu_cyuki.pdf')",
    "add(mori, '15_第4期_资产负债表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2024/06/2023taishaku_taishou.pdf')",
    "add(mori, '16_第4期_损益计算书.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2024/06/2023soneki_keisan.pdf')",
    "add(mori, '17_第4期_个别注记表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2024/06/2023kobetsu_cyuki.pdf')",
    "add(mori, '18_第5期_资产负债表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2025/06/2024taishaku_taishou.pdf')",
    "add(mori, '19_第5期_损益计算书.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2025/06/2024soneki_keisan.pdf')",
    "add(mori, '20_第5期_个别注记表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2025/06/2024kobetsu_cyuki.pdf')",
    "add(mori, '21_第6期_资产负债表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2026/06/2025taishaku_taishou.pdf')",
    "add(mori, '22_第6期_损益计算书.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2026/06/2025soneki_keisan.pdf')",
    "add(mori, '23_第6期_个别注记表.pdf', 'https://morioka-buscenter.jp/official/wp-content/uploads/2026/06/2025kobetsu_cyuki.pdf')",
]
replacement = '\n'.join(replacement_lines)
script = script[:start] + replacement + script[end:]

exec(compile(script, '<batch14-v4>', 'exec'), {'__name__': '__main__'})
