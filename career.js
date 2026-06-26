// ── career.js ────────────────────────────────────────────────
// 職涯時間軸
// 新增一段人生經歷：在此檔案的 timeline 陣列新增一個物件即可
// ────────────────────────────────────────────────────────────

const career = {
  // 完整時間軸（從出生到願景）
  timeline: [
    {
      year:  "1984",
      title: "出生",
      desc:  "",
      type:  "birth",        // birth | work | promotion | vision
      tags:  [],
    },
    {
      year:  "2001",
      title: "從烘焙業開始",
      desc:  "踏入食品產業，建立製造現場的基礎認知",
      type:  "work",
      tags:  ["烘焙業", "製造現場"],
    },
    {
      year:  "2009",
      title: "宜蘭食品工業股份有限公司（旺旺）",
      desc:  "",
      type:  "work",
      tags:  ["旺旺集團", "品保", "品管"],
      // 內部晉升路徑
      progression: [
        { title: "產線副組長",  year: "2009" },
        { title: "品管課副課長", year: "~2012" },
        { title: "品保部副理",  year: "~2014" },
      ],
      endYear: "2016",
    },
    {
      year:  "2016",
      title: "貝特福優股份有限公司",
      desc:  "同時統籌研發與工務兩個部門，推動系統化管理與產品創新",
      type:  "work",
      tags:  ["研發管理", "工務管理", "系統建立"],
      progression: [
        { title: "研發部暨工務部資深經理", year: "2016" },
      ],
      endYear: "Present",
    },
    {
      year:  "2036",
      title: "卓越的食品製造企業家",
      desc:  "以系統思維建立可複製的食品製造體系，放大價值，幫助更多人",
      type:  "vision",
      tags:  ["企業家", "食品製造", "系統思維"],
    },
  ],
};
