// ============================================================
// Louis Blueprint 2036 — app.js  v1.1
// Reads from BLUEPRINT (data/index.js) and renders all DOM nodes
// ============================================================

(function () {

  // ── DEBUG MODE ──────────────────────────────────────────────
  console.log("Blueprint Loaded");
  console.log(typeof BLUEPRINT !== 'undefined' ? BLUEPRINT : "ERROR: BLUEPRINT is undefined");
  console.log(typeof profile   !== 'undefined' ? profile   : "ERROR: profile is undefined");
  console.log(typeof career    !== 'undefined' ? career    : "ERROR: career is undefined");
  console.log(typeof future    !== 'undefined' ? future    : "ERROR: future is undefined");

  // ── GUARD: 驗證所有必要資料 ───────────────────────────────
  var missing = [];
  if (typeof BLUEPRINT   === 'undefined' || BLUEPRINT   === null) missing.push("BLUEPRINT");
  if (typeof profile     === 'undefined' || profile     === null) missing.push("profile");
  if (typeof career      === 'undefined' || career      === null) missing.push("career");
  if (typeof capability  === 'undefined' || capability  === null) missing.push("capability");
  if (typeof principles  === 'undefined' || principles  === null) missing.push("principles");
  if (typeof future      === 'undefined' || future      === null) missing.push("future");
  if (typeof achievement === 'undefined' || achievement === null) missing.push("achievement");

  if (!career  || !career.timeline  || career.timeline.length  === 0) missing.push("career.timeline");
  if (!future  || !future.roadmap   || future.roadmap.length   === 0) missing.push("future.roadmap");
  if (!achievement || !achievement.kpis || achievement.kpis.length === 0) missing.push("achievement.kpis");
  if (!capability  || !capability.axes  || capability.axes.length  === 0) missing.push("capability.axes");

  if (missing.length > 0) {
    console.error("❌ Blueprint Render 中止：以下資料缺失：", missing.join(", "));
    return;
  }

  // ── HELPERS ─────────────────────────────────────────────────
  var D = BLUEPRINT;

  function el(id) { return document.getElementById(id); }

  function tagRow(arr) {
    if (!arr || !arr.length) return '';
    return '<div class="tag-row">' +
      arr.map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('') +
      '</div>';
  }

  // ── HEADER ──────────────────────────────────────────────────
  el('profile-name').textContent = D.profile.name;
  el('profile-meta').innerHTML   = '生日：' + D.profile.birthday + '<br>居住地：' + D.profile.location;
  el('blueprint-title').textContent   = D.profile.meta.title;
  el('blueprint-tagline').textContent = D.profile.meta.tagline;
  el('header-badge').textContent      = D.profile.meta.printDate;

  // ── TIMELINE (Past) ─────────────────────────────────────────
  var tlContainer = el('past-timeline');
  D.career.timeline.forEach(function(item) {
    var dotClass = 'tl-dot tl-dot-' + item.type;

    var prog = '';
    if (item.progression) {
      prog = '<div class="tl-prog">' +
        item.progression.map(function(p) {
          return '<div class="tl-prog-item">' + p.title + '</div>';
        }).join('') +
        (item.endYear ? '<div class="tl-prog-end">至 ' + item.endYear + '</div>' : '') +
        '</div>';
    }

    var desc = item.desc ? '<div class="tl-desc">' + item.desc + '</div>' : '';

    tlContainer.innerHTML +=
      '<div class="tl-item">' +
        '<div class="tl-year-col">' +
          '<div class="' + dotClass + '"></div>' +
          '<div class="tl-year">' + item.year + '</div>' +
        '</div>' +
        '<div class="tl-content">' +
          '<div class="tl-title">' + item.title + '</div>' +
          desc +
          prog +
          tagRow(item.tags) +
        '</div>' +
      '</div>';
  });

  // ── PRESENT ─────────────────────────────────────────────────
  var currentJob = null;
  for (var i = 0; i < D.career.timeline.length; i++) {
    if (D.career.timeline[i].endYear === 'Present') {
      currentJob = D.career.timeline[i];
      break;
    }
  }
  if (currentJob) {
    el('present-content').innerHTML =
      '<div class="present-card">' +
        '<div class="present-period">' + currentJob.year + ' – Present</div>' +
        '<div class="present-company">' + currentJob.title + '</div>' +
        '<div class="present-title">' +
          (currentJob.progression ? currentJob.progression[0].title : '') +
        '</div>' +
        '<div class="present-desc">' + currentJob.desc + '</div>' +
      '</div>' +
      tagRow(currentJob.tags);
  }

  // ── KPI CARDS ───────────────────────────────────────────────
  var kpiGrid = el('kpi-grid');
  D.achievement.kpis.forEach(function(k) {
    kpiGrid.innerHTML +=
      '<div class="kpi-card">' +
        '<div class="kpi-value">' + k.value +
          '<span class="kpi-unit">' + k.unit + '</span>' +
        '</div>' +
        '<div class="kpi-label">' + k.label + '</div>' +
      '</div>';
  });

  // ── FUTURE ──────────────────────────────────────────────────
  var fv = D.future.vision;
  el('future-content').innerHTML =
    '<div class="future-year-row">' +
      '<div class="future-year">' + fv.year + '</div>' +
      '<div class="future-label-sm">目標年份</div>' +
    '</div>' +
    '<div class="future-vision">' + fv.title + '</div>' +
    '<div class="future-desc">' + fv.desc + '</div>' +
    tagRow(fv.tags);

  // ── RADAR CHART ─────────────────────────────────────────────
  (function buildRadar() {
    var svg    = el('radar-svg');
    var axes   = D.capability.axes;
    var N      = axes.length;
    var cx     = 130, cy = 130, R = 100;
    var levels = 5;

    function polarX(angle, r) { return cx + r * Math.cos(angle - Math.PI / 2); }
    function polarY(angle, r) { return cy + r * Math.sin(angle - Math.PI / 2); }

    var html = '';

    // grid rings
    for (var l = 1; l <= levels; l++) {
      var ringR = R * l / levels;
      var pts = axes.map(function(_, idx) {
        var a = (2 * Math.PI * idx) / N;
        return polarX(a, ringR) + ',' + polarY(a, ringR);
      }).join(' ');
      html += '<polygon points="' + pts + '" fill="none" stroke="#CACACA" stroke-width="0.8"/>';
    }

    // spokes
    axes.forEach(function(_, idx) {
      var a = (2 * Math.PI * idx) / N;
      html += '<line x1="' + cx + '" y1="' + cy +
        '" x2="' + polarX(a, R) + '" y2="' + polarY(a, R) +
        '" stroke="#CACACA" stroke-width="0.8"/>';
    });

    // data polygon
    var dataPts = axes.map(function(ax, idx) {
      var a = (2 * Math.PI * idx) / N;
      var r = R * ax.score / 100;
      return polarX(a, r) + ',' + polarY(a, r);
    }).join(' ');
    html += '<polygon points="' + dataPts + '" fill="#0D234033" stroke="#0D2340" stroke-width="1.5"/>';

    // dots
    axes.forEach(function(ax, idx) {
      var a = (2 * Math.PI * idx) / N;
      var r = R * ax.score / 100;
      html += '<circle cx="' + polarX(a, r) + '" cy="' + polarY(a, r) + '" r="3" fill="#0D2340"/>';
    });

    // labels
    axes.forEach(function(ax, idx) {
      var a = (2 * Math.PI * idx) / N;
      var labelR = R + 18;
      var lx = polarX(a, labelR);
      var ly = polarY(a, labelR);
      var anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle';
      html += '<text x="' + lx + '" y="' + (ly + 4) +
        '" text-anchor="' + anchor +
        '" font-family="\'Noto Sans TC\',sans-serif" font-size="10" fill="#3D3D3D" font-weight="500">' +
        ax.label + '</text>';
    });

    svg.innerHTML = html;
  })();

  // ── DECISION PRINCIPLES ─────────────────────────────────────
  var dp = D.principles.decisionPrinciples;
  el('decision-title').textContent    = dp.title;
  el('decision-subtitle').textContent = dp.subtitle;
  el('decision-list').innerHTML = dp.items.map(function(p) {
    return '<li class="principle-item">' +
      '<span class="principle-label">' + p.label + '</span>' +
      '<span class="principle-detail">' + p.detail + '</span>' +
      '</li>';
  }).join('');

  // ── LOUIS METHOD ────────────────────────────────────────────
  var lm = D.principles.louisMethod;
  el('method-title').textContent    = lm.title;
  el('method-subtitle').textContent = lm.subtitle;
  el('method-list').innerHTML = lm.steps.map(function(s) {
    return '<li class="method-item">' +
      '<span class="method-num">' + s.num + '</span>' +
      '<div class="method-body">' +
        '<span class="method-label">' + s.label + '</span>' +
        '<span class="method-detail">' + s.detail + '</span>' +
      '</div>' +
      '</li>';
  }).join('');

  // ── 10-YEAR ROADMAP ─────────────────────────────────────────
  el('roadmap-list').innerHTML = D.future.roadmap.map(function(r) {
    return '<li class="roadmap-item">' +
      '<span class="roadmap-period">' + r.period + '</span>' +
      '<span class="roadmap-mile">' + r.milestone + '</span>' +
      '</li>';
  }).join('');

  // ── QUOTE ───────────────────────────────────────────────────
  el('quote-text').textContent   = D.profile.quote.text;
  el('quote-author').textContent = '— ' + D.profile.quote.author;

  console.log("✅ Blueprint Render 完成");

})();
