# Rurban OS 外部模型固定评审入口

这是供 Claude、GPT、Gemini 和项目评审人员查看的公开只读包。页面不连接数据库，不保存输入，也不包含访问凭证。

## 每次只发这一个链接

**[打开模型专用完整评审文档](MODEL_REVIEW.md)**

模型不能运行 JavaScript 或不能点击网页时，仍可在该文档中看到 16 个固定页面状态、全部主要按钮及点击结果。不要只把 `/app/` 交给外部模型，也不要再发送本地地址或临时隧道。

## 评审入口

- [模型专用完整评审文档](MODEL_REVIEW.md)
- [模型可读静态总览](https://elomacken-sketch.github.io/rurban-os-role-review/)
- [浏览器只读交互界面](https://elomacken-sketch.github.io/rurban-os-role-review/app/)
- [结构化页面与交互清单](review-manifest.json)

## 四角色首页截图

- [老板视图](https://elomacken-sketch.github.io/rurban-os-role-review/screenshots/owner.png)
- [运营视图](https://elomacken-sketch.github.io/rurban-os-role-review/screenshots/operations.png)
- [招商视图](https://elomacken-sketch.github.io/rurban-os-role-review/screenshots/leasing.png)
- [商户视图](https://elomacken-sketch.github.io/rurban-os-role-review/screenshots/merchant.png)

## 本轮评审重点

1. 老板单页能否在十秒内看懂当前结果、核心差距、风险和需要决定的事项？
2. 四个角色的左侧入口是否真正不同，并符合各自最关心的工作？
3. 是否体现“强内容驱动强运营，强运营反哺招商、租赁与空间资产价值”？
4. 不同结果是否使用最适合的形式，例如经营指标、策划文档、内容日历、任务表和招商线索表？
5. 老板、运营、招商、商户之间的数据和结果是否形成相互影响的闭环？

只评估信息架构、结果呈现和用户理解成本，不把模拟内容当作真实经营结论。
