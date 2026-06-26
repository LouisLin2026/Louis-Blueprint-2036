// ── capability.js ────────────────────────────────────────────
// 能力地圖（Radar Chart 資料）
// 新增能力：在 axes 陣列新增 { label, score } 即可
// score 範圍：0–100
// ────────────────────────────────────────────────────────────

const capability = {
  title:    "Capability Map",
  subtitle: "能力地圖",

  axes: [
    { label: "策略",    score: 85 },
    { label: "建廠",    score: 80 },
    { label: "研發",    score: 90 },
    { label: "品質",    score: 95 },
    { label: "AI",      score: 70 },
    { label: "系統思維", score: 92 },
    { label: "領導",    score: 82 },
  ],
};
