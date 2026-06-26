# Louis Blueprint 2036
**WO-BP-001 V1.1** — Architecture Refactor + UI Polish

---

## 檔案結構

```
louis-blueprint/
├── index.html          # 頁面結構（不需修改）
├── style.css           # 樣式（不需修改）
├── app.js              # 渲染邏輯（不需修改）
├── data/
│   ├── profile.js      # 姓名、生日、居住地、Meta、Quote
│   ├── career.js       # 職涯時間軸（Timeline）
│   ├── capability.js   # 能力地圖（Radar Chart 資料）
│   ├── principles.js   # Decision Principles + Louis Method
│   ├── future.js       # 2036 Vision + 10-Year Roadmap
│   ├── achievement.js  # KPI 數據
│   └── index.js        # 統一入口（合併至 BLUEPRINT）
└── README.md
```

---

## 修改規則

| 要修改的內容       | 只改這個檔案             |
|--------------------|--------------------------|
| 個人資料、Quote    | `data/profile.js`        |
| 職涯時間軸         | `data/career.js`         |
| 能力雷達圖         | `data/capability.js`     |
| 決策原則、方法論   | `data/principles.js`     |
| 2036 願景、路線圖  | `data/future.js`         |
| KPI 數據           | `data/achievement.js`    |

`index.html` 永遠不需修改。

---

## 本地開啟

雙擊 `index.html` 即可在瀏覽器中開啟。

---

## GitHub Pages

1. 整個資料夾推送至 GitHub Repository
2. Settings → Pages → Branch: `main` / `/(root)`
3. 儲存後取得公開網址

---

## 列印 A3 / 匯出 PDF

`Ctrl+P` → 紙張 **A3**，方向 **橫式**，勾選「背景圖形」

---

## 顏色規範

| 角色       | HEX       |
|------------|-----------|
| Navy       | `#0D2340` |
| Green      | `#1A6B45` |
| Gold       | `#B8952A` |
| Dark Gray  | `#1A1A1A` |
| Background | `#FFFFFF` |

© Louis Lin — Blueprint v1.1
