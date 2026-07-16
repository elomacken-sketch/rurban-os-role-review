(() => {
  "use strict";

  function jsonResponse(payload, status = 200) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  window.fetch = async (input) => {
    const url = typeof input === "string" ? input : input?.url || "";

    if (url.includes("/api/client-preview/generate")) {
      return jsonResponse(window.RURBAN_REVIEW_PREVIEW);
    }

    if (url.includes("/api/data/intake-bootstrap")) {
      return jsonResponse({
        campaign: {
          campaign_id: "REVIEW-DEMO-202608",
          project_id: "PROJ-REVIEW-DEMO",
          month: "2026年8月",
        },
        projects: [
          { project_id: "PROJ-REVIEW-DEMO", project_name: "地方口袋美食食集" },
        ],
      });
    }

    if (url.includes("/api/role-delivery")) {
      return jsonResponse({
        roles: {
          owner: {
            sections: [
              { requirement_id: "OWN-01", items: [] },
              {
                requirement_id: "OWN-03",
                items: [
                  { label: "可用内容资产", value: "6" },
                  { label: "被采用内容", value: "0" },
                ],
              },
              {
                requirement_id: "OWN-05",
                items: [{ label: "参与商户数", value: "未采集" }],
              },
              {
                requirement_id: "OWN-06",
                items: [{ label: "招商线索", value: "未采集" }],
              },
              {
                requirement_id: "OWN-10",
                items: [{ label: "批准事项", value: "月度主题、预算建议、招商重点" }],
              },
            ],
          },
        },
      });
    }

    return jsonResponse({ message: "外部评审只读版已禁用该请求。" }, 403);
  };

  document.addEventListener("click", (event) => {
    const blocked = event.target.closest("#exportResult, [data-export-owner-report]");
    if (!blocked) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = "只读评审版不生成下载文件";
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  }, true);
})();
