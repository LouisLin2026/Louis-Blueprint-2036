// ============================================================
// Louis Blueprint 2036 — data/index.js
// 統一入口：合併所有資料模組，掛載至全域 BLUEPRINT
// HTML 只需引用此一檔案
// ============================================================

// 各模組由個別 <script> 先載入（見 index.html）
// 本檔合併為單一全域物件

const BLUEPRINT = {
  profile:     profile,
  career:      career,
  capability:  capability,
  principles:  principles,
  future:      future,
  achievement: achievement,
};
