// ============================================================
// Louis Blueprint 2036 — app.js  v1.1
// Reads from BLUEPRINT (data/index.js) and renders all DOM nodes
// ============================================================

(function () {
  const D = BLUEPRINT;

  function el(id) { return document.getElementById(id); }
  function tagRow(arr) {
    if (!arr || !arr.length) return '';
    return `<div class="tag-row">${arr.map(t => `<span class="tag">${t}</span>`).join('')}</div>`;
  }

  // ── HEADER ──────────────────────────────────────────────────
  el('profile-name').textContent = D.profile.name;
  el('profile-meta').innerHTML =
    `生日：${D.profile.birthday}<br>居住地：${D.profile.location}`;
  el('blueprint-title').textContent  = D.profile.meta.title;
  el('blueprint-tagline').textContent = D.profile.meta.tagline;
  el('header-badge').textContent     = D.profile.meta.printDate;

  // ── TIMELINE (Past) ─────────────────────────────────────────
  const tlContainer = el('past-timeline');
  D.career.timeline.forEach(item => {
    const dotClass = `tl-dot tl-dot-${item.type}`;

    const prog = item.progression
      ? `<div class="tl-prog">${item.progression.map(p =>
          `<div class="tl-prog-item">${p.title}</div>`
        ).join('')}${item.endYear ? `<div class="tl-prog-end">至 ${item.endYear}</div>` : ''}</div>`
      : '';

    const desc = item.desc
      ? `<div class="tl-desc">${item.desc}</div>`
      : '';

    tlContainer.innerHTML += `
      <div class="tl-item">
        <div class="tl-year-col">
          <div class="${dotClass}"></div>
          <div class="tl-year">${item.year}</div>
        </div>
        <div class="tl-content">
          <div class="tl-title">${item.title}</div>
          ${desc}
          ${prog}
          ${tagRow(item.tags)}
        </div>
      </div>`;
  });

  // ── PRESENT ─────────────────────────────────────────────────
  // Extract current job from career timeline
  const currentJob = D.career.timeline.find(t => t.endYear === 'Present');
  if (currentJob) {
    el('present-content').innerHTML = `
      <div class="present-card">
        <div class="present-period">${currentJob.year} – Present</div>
        <div class="present-company">${currentJob.title}</div>
        <div class="present-title">${currentJob.progression ? currentJob.progression[0].title : ''}</div>
        <div class="present-desc">${currentJob.desc}</div>
      </div>
      ${tagRow(currentJob.tags)}`;
  }

  // KPI Cards
  const kpiGrid = el('kpi-grid');
  D.achievement.kpis.forEach(k => {
    kpiGrid.innerHTML += `
      <div class="kpi-card">
        <div class="kpi-value">${k.value}<span class="kpi-unit">${k.unit}</span></div>
        <div class="kpi-label">${k.label}</div>
      </div>`;
  });

  // ── FUTURE ──────────────────────────────────────────────────
  const fv = D.future.vision;
  el('future-content').innerHTML = `
    <div class="future-year-row">
      <div class="future-year">${fv.year}</div>
      <div class="future-label-sm">目標年份</div>
    </div>
    <div class="future-vision">${fv.title}</div>
    <div class="future-desc">${fv.desc}</div>
    ${tagRow(fv.tags)}`;

  // ── RADAR CHART ─────────────────────────────────────────────
  (function buildRadar() {
    const svg    = el('radar-svg');
    const axes   = D.capability.axes;
    const N      = axes.length;
    const cx     = 130, cy = 130, R = 100;
    const levels = 5;

    function polarX(angle, r) { return cx + r * Math.cos(angle - Math.PI / 2); }
    function polarY(angle, r) { return cy + r * Math.sin(angle - Math.PI / 2); }

    let html = '';

    // grid rings
    for (let l = 1; l <= levels; l++) {
      const r = R * l / levels;
      const pts = axes.map((_, i) => {
        const a = (2 * Math.PI * i) / N;
        return `${polarX(a, r)},${polarY(a, r)}`;
      }).join(' ');
      html += `<polygon points="${pts}" fill="none" stroke="#CACACA" stroke-width="0.8"/>`;
    }

    // spokes
    axes.forEach((_, i) => {
      const a = (2 * Math.PI * i) / N;
      html += `<line x1="${cx}" y1="${cy}" x2="${polarX(a, R)}" y2="${polarY(a, R)}" stroke="#CACACA" stroke-width="0.8"/>`;
    });

    // data polygon
    const dataPts = axes.map((ax, i) => {
      const a = (2 * Math.PI * i) / N;
      const r = R * ax.score / 100;
      return `${polarX(a, r)},${polarY(a, r)}`;
    }).join(' ');
    html += `<polygon points="${dataPts}" fill="#0D234033" stroke="#0D2340" stroke-width="1.5"/>`;

    // dot per axis
    axes.forEach((ax, i) => {
      const a = (2 * Math.PI * i) / N;
      const r = R * ax.score / 100;
      html += `<circle cx="${polarX(a, r)}" cy="${polarY(a, r)}" r="3" fill="#0D2340"/>`;
    });

    // labels
    axes.forEach((ax, i) => {
      const a = (2 * Math.PI * i) / N;
      const labelR = R + 18;
      const lx = polarX(a, labelR);
      const ly = polarY(a, labelR);
      const anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle';
      html += `<text x="${lx}" y="${ly + 4}" text-anchor="${anchor}" font-family="'Noto Sans TC',sans-serif" font-size="10" fill="#3D3D3D" font-weight="500">${ax.label}</text>`;
    });

    svg.innerHTML = html;
  })();

  // ── DECISION PRINCIPLES ─────────────────────────────────────
  const dp = D.principles.decisionPrinciples;
  el('decision-title').textContent    = dp.title;
  el('decision-subtitle').textContent = dp.subtitle;
  el('decision-list').innerHTML = dp.items.map(p => `
    <li class="principle-item">
      <span class="principle-label">${p.label}</span>
      <span class="principle-detail">${p.detail}</span>
    </li>`).join('');

  // ── LOUIS METHOD ────────────────────────────────────────────
  const lm = D.principles.louisMethod;
  el('method-title').textContent    = lm.title;
  el('method-subtitle').textContent = lm.subtitle;
  el('method-list').innerHTML = lm.steps.map(s => `
    <li class="method-item">
      <span class="method-num">${s.num}</span>
      <div class="method-body">
        <span class="method-label">${s.label}</span>
        <span class="method-detail">${s.detail}</span>
      </div>
    </li>`).join('');

  // ── 10-YEAR ROADMAP ─────────────────────────────────────────
  el('roadmap-list').innerHTML = D.future.roadmap.map(r => `
    <li class="roadmap-item">
      <span class="roadmap-period">${r.period}</span>
      <span class="roadmap-mile">${r.milestone}</span>
    </li>`).join('');

  // ── QUOTE ───────────────────────────────────────────────────
  el('quote-text').textContent   = D.profile.quote.text;
  el('quote-author').textContent = '— ' + D.profile.quote.author;

})();
