# Louis Blueprint 2036

個人藍圖網站 — 無需 Build，直接部署至 GitHub Pages。

---

## Folder Structure

```
Louis_Blueprint_2036/
├── index.html        # 主頁面（入口）
├── style.css         # 樣式
├── app.js            # 渲染邏輯
├── README.md         # 說明文件
└── data/
    ├── profile.js    # 個人基本資料
    ├── career.js     # 職涯時間軸
    ├── capability.js # 能力地圖（Radar Chart）
    ├── principles.js # 決策原則 & 工作方法
    ├── future.js     # 2036 願景 & 十年路線圖
    ├── achievement.js# 代表成就 KPI
    └── index.js      # 合併所有模組至 BLUEPRINT
```

---

## GitHub Pages 部署方式

1. 將整個 `Louis_Blueprint_2036/` 資料夾推送至 GitHub repository（例如：`louis-blueprint`）
2. 進入 Repository → **Settings** → **Pages**
3. Source 選擇 `main` branch，根目錄 `/` (root)
4. 點擊 **Save**
5. 約 1–2 分鐘後，即可訪問：`https://<你的帳號>.github.io/louis-blueprint/`

> 不需要 npm、webpack、vite、node 任何 build 工具。

---

## 本機開啟

直接雙擊 `index.html`，即可在瀏覽器中開啟。

若部分字型無法載入（離線環境），可忽略，不影響主要功能。

---

## 如何新增人生內容

### 新增職涯經歷（career.js）

打開 `data/career.js`，在 `timeline` 陣列中新增一個物件：

```js
{
  year:  "2025",
  title: "新職位或事件名稱",
  desc:  "簡短說明",
  type:  "work",   // birth | work | vision
  tags:  ["標籤A", "標籤B"],
}
```

若有晉升路徑，加入 `progression` 欄位：

```js
progression: [
  { title: "副理", year: "2025" },
  { title: "經理", year: "2027" },
],
endYear: "Present",  // 或 "2030"
```

---

### 修改 future.js（願景 & 路線圖）

打開 `data/future.js`：

- 修改 `vision.year`、`vision.title`、`vision.desc` 更新 2036 願景
- 在 `roadmap` 陣列中新增或修改里程碑：

```js
{ period: "2025–2026", milestone: "你的里程碑描述" }
```

---

### 修改 principles.js（決策原則 & 工作方法）

打開 `data/principles.js`：

- `decisionPrinciples.items`：新增 `{ label, detail }` 新增決策原則
- `louisMethod.steps`：新增 `{ num, label, detail }` 新增工作方法步驟

---

## Debug

開啟瀏覽器 Console（F12），正常情況下會看到：

```
Blueprint Loaded
{profile: ..., career: ..., ...}   ← BLUEPRINT 物件
{name: "林祿偉（Louis）", ...}       ← profile
{timeline: [...]}                   ← career
{vision: {...}, roadmap: [...]}     ← future
✅ Blueprint Render 完成
```

若有資料缺失，Console 會提示：

```
❌ Blueprint Render 中止：以下資料缺失：career.timeline
```
