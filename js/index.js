// ─── INDEX.JS — Training Tracker Logic ───────────────────────────────────────
// Depends on: data.js, storage.js, nav.js (loaded before this in HTML)

// ── DATE HELPERS (Nepal: week starts Sunday) ──
function getProgramStartDate() {
  const stored = localStorage.getItem('cbros_start_date');
  if (stored) return new Date(stored);
  const now = new Date();
  const sunday = new Date(now);
  sunday.setHours(0, 0, 0, 0);
  sunday.setDate(now.getDate() - now.getDay());
  localStorage.setItem('cbros_start_date', sunday.toISOString());
  return sunday;
}
function getTodayDayId() {
  const dayIds = ['sun','mon','tue','wed','thu','fri','sat'];
  return dayIds[new Date().getDay()];
}
function getCurrentWeekFromDate() {
  const start = getProgramStartDate();
  const now = new Date(); now.setHours(0, 0, 0, 0);
  return Math.max(1, Math.min(8, Math.floor((now - start) / 86400000 / 7) + 1));
}

let currentWeek = getCurrentWeekFromDate();
const todayDayId = getTodayDayId();
const openCards = new Set();
const openWarmups = new Set();

// Nepal week order: Sunday first
const NEPAL_ORDER = ['sun','mon','tue','wed','thu','fri','sat'];
function getOrderedDays() {
  return NEPAL_ORDER.map(id => DAYS.find(d => d.id === id)).filter(Boolean);
}

function checkAnyUnlocks() {
  let any = false;
  DAYS.forEach(day => {
    if (day.isRest) return;
    day.exercises.forEach((_, i) => { if (getProgState(day.id, i).level > 0) any = true; });
  });
  document.getElementById('unlockBanner').classList.toggle('show', any);
}

// ── RENDER ──
function renderWeekTabs() {
  const curReal = getCurrentWeekFromDate();
  document.getElementById('weekTabs').innerHTML = [1,2,3,4,5,6,7,8].map(w =>
    `<button class="wtab${w === currentWeek ? ' active' : ''}" onclick="setWeek(${w},this)">Wk ${w}${w === curReal ? '<span class="today-dot" style="margin-left:3px"></span>' : ''}</button>`
  ).join('');
}

function renderScheduleStrip() {
  document.getElementById('scheduleStrip').innerHTML = getOrderedDays().map(d => {
    const isToday = d.id === todayDayId;
    if (d.isRest) {
      return `<div class="ss-day rest-day${isToday ? ' today' : ''}">
        <div class="ss-weekday">${d.weekday.slice(0,3).toUpperCase()}${isToday ? '<span class="today-dot"></span>' : ''}</div>
        <div class="ss-type">${d.type}</div>
        <div class="ss-rest-label">Rest</div>
      </div>`;
    }
    const checks = getLocalCb(currentWeek, d.id, d.exercises.length);
    const done = checks.filter(Boolean).length;
    const n = d.exercises.length;
    const pct = Math.round(done / n * 100);
    return `<div class="ss-day${pct === 100 ? ' complete' : ''}${isToday ? ' today' : ''}" onclick="scrollToDay('${d.id}')">
      <div class="ss-weekday">${d.weekday.slice(0,3).toUpperCase()}${isToday ? '<span class="today-dot"></span>' : ''}</div>
      <div class="ss-type">${d.type}</div>
      <div class="ss-bar-bg"><div class="ss-bar" style="width:${pct}%"></div></div>
      <div class="ss-pct">${done}/${n}</div>
    </div>`;
  }).join('');
}

function renderDays() {
  document.getElementById('dayList').innerHTML = getOrderedDays()
    .map(d => d.isRest ? renderRestCard(d) : renderTrainingCard(d))
    .join('');
}

function renderRestCard(d) {
  const isOpen = openCards.has(d.id);
  const isToday = d.id === todayDayId;
  return `<div class="day-card rest-card${isOpen ? ' open' : ''}${isToday ? ' today-card' : ''}" id="daycard_${d.id}">
    <div class="day-hd" onclick="toggleDay('${d.id}')">
      <div class="day-ring">😴</div>
      <div class="day-info">
        <div class="day-weekday">${d.weekday} · ${d.type}${isToday ? ' · <span style="color:var(--gold);font-size:7px;letter-spacing:2px;">TODAY</span>' : ''}</div>
        <div class="day-name">${d.name}</div>
        <div class="day-focus">${d.focus}</div>
      </div>
      <div class="day-meta-right">
        <div class="day-count" style="color:var(--text-dim)">Rest</div>
        <div class="day-chev">▾</div>
      </div>
    </div>
    <div class="day-body">
      <div class="rest-body">
        <div class="day-tip">💡 ${d.tip}</div>
        <div class="rest-activities">
          ${d.restActivities.map(a => `<div class="ra-item">
            <div class="ra-icon">${a.icon}</div>
            <div class="ra-name">${a.name}</div>
            <div class="ra-note">${a.note}</div>
          </div>`).join('')}
        </div>
        <div class="rehab-note">🎗️ <strong style="color:var(--b-col)">B — Shoulder rehab is non-negotiable on rest days.</strong> Band pull-aparts take 5 minutes and directly rebuild the rotator cuff. Don't skip it.</div>
      </div>
    </div>
  </div>`;
}

function renderTrainingCard(d) {
  const checks  = getLocalCb(currentWeek, d.id, d.exercises.length);
  const notes   = getLocalNotes(currentWeek, d.id);
  const comments = getLocalComments(currentWeek, d.id);
  const done     = checks.filter(Boolean).length;
  const n        = d.exercises.length;
  const complete = done === n;
  const isOpen   = openCards.has(d.id);
  const isToday  = d.id === todayDayId;

  const exRows = d.exercises.map((ex, i) => renderExRow(d, i, checks[i])).join('');

  const cmtHtml = comments.length === 0
    ? '<div class="no-comments">No comments yet — be first</div>'
    : comments.map(c => {
        const isOld = !!c.athlete;
        const avatar = c.avatar || (c.athlete === 'A' ? '🏋️' : '💪');
        const name = c.username || (c.athlete === 'A' ? '71kg — A' : '100kg — B');
        const cls = isOld ? (c.athlete === 'A' ? 'a' : 'b') : '';
        return `<div class="comment-item">
          <div class="ci-header">
            <span class="ci-avatar-sm">${avatar}</span>
            <span class="ci-who ${cls}">${esc(name)}</span>
            ${c.ex_name ? `<span class="ci-ex">on: ${esc(c.ex_name)}</span>` : ''}
            <span class="ci-time">${formatTime(c.created_at)}</span>
            <button class="ci-del" onclick="deleteComment('${d.id}',${JSON.stringify(c.id)})">✕</button>
          </div>
          <div class="ci-text">${esc(c.body)}</div>
        </div>`;
      }).join('');

  const exOpts = d.exercises.map(e => `<option value="${esc(e.name)}">${esc(e.name)}</option>`).join('');

  return `<div class="day-card${complete ? ' complete' : ''}${isOpen ? ' open' : ''}${isToday && !complete ? ' today-card' : ''}" id="daycard_${d.id}">
    <div class="day-hd" onclick="toggleDay('${d.id}')">
      <div class="day-ring">${complete ? '✓' : '○'}</div>
      <div class="day-info">
        <div class="day-weekday">${d.weekday} · ${d.type}${isToday ? ' · <span style="color:var(--gold);font-size:7px;letter-spacing:2px;">TODAY</span>' : ''}</div>
        <div class="day-name">${d.name}</div>
        <div class="day-focus">${d.focus}</div>
      </div>
      <div class="day-meta-right">
        <div class="day-count">${done}/${n}</div>
        <div class="day-chev">▾</div>
      </div>
    </div>
    <div class="day-body">
      ${renderWarmupSection(d.id)}
      <div class="ex-wrap">
        <div class="ex-header">
          <span></span><span class="eh-img"></span><span>Exercise + Level</span>
          <span class="eh-a">71 kg — A</span>
          <span class="eh-b">100 kg — B</span>
        </div>
        ${exRows}
      </div>
      <div class="day-tip">💡 ${d.tip}</div>
      <div class="comments-sec">
        <div class="cs-title">Comments</div>
        <div class="comment-list" id="cmtlist_${d.id}">${cmtHtml}</div>
        <div class="add-comment">
          <div class="cm-user" id="cmuser_${d.id}">
            <span class="cm-user-avatar" id="cmavatar_${d.id}">👤</span>
            <span class="cm-user-name" id="cmuname_${d.id}">Sign in to comment</span>
          </div>
          <select class="cm-ex-sel" id="cmex_${d.id}">
            <option value="">All exercises</option>${exOpts}
          </select>
        </div>
        <div class="add-comment-row2">
          <textarea class="cm-input" id="cminput_${d.id}" placeholder="Form tips, how it felt, what to adjust..." rows="2"></textarea>
          <button class="btn-comment" onclick="addComment('${d.id}')">Post</button>
        </div>
      </div>
      <div class="notes-sec">
        <div class="ns-divider"></div>
        <div class="ns-title">Session Notes</div>
        <div class="notes-duo">
          <div class="nb a"><div class="nb-hd">71 kg — A</div>
            <textarea class="nb-ta" id="noteA_${d.id}" placeholder="How it felt, PRs, pain points..." onchange="autoSaveNotes('${d.id}')">${esc(notes.noteA)}</textarea></div>
          <div class="nb b"><div class="nb-hd">100 kg — B</div>
            <textarea class="nb-ta" id="noteB_${d.id}" placeholder="How it felt, shoulder check-in..." onchange="autoSaveNotes('${d.id}')">${esc(notes.noteB)}</textarea></div>
        </div>
        <div class="ss-box">
          <div class="ss-hd">Session Summary</div>
          <textarea class="ss-ta" id="sum_${d.id}" placeholder="Overall notes..." onchange="autoSaveNotes('${d.id}')">${esc(notes.summary)}</textarea>
        </div>
      </div>
      <div class="day-actions">
        <button class="btn-act btn-reset" onclick="resetDay('${d.id}',${n})">↺ Reset</button>
        <button class="btn-act btn-save"  onclick="manualSave('${d.id}')">✓ Save</button>
        <div class="saved-msg" id="savedmsg_${d.id}">✓ Saved</div>
      </div>
    </div>
  </div>`;
}

function toggleGuidance(dayId, exIdx) {
  const el = document.getElementById(`fg_${dayId}_${exIdx}`);
  if (el) {
    el.classList.toggle('open');
    const btn = el.previousElementSibling;
    if (btn) btn.textContent = el.classList.contains('open') ? '− Form Tips' : '+ Form Tips';
  }
}

function toggleWarmup(dayId) {
  if (openWarmups.has(dayId)) openWarmups.delete(dayId);
  else openWarmups.add(dayId);
  reRenderWarmup(dayId);
}

function toggleWarmupItem(dayId, idx) {
  const wu = WARMUPS[dayId];
  if (!wu) return;
  const checks = getLocalWarmup(currentWeek, dayId, wu.items.length);
  checks[idx] = !checks[idx];
  saveLocalWarmup(currentWeek, dayId, checks);
  reRenderWarmup(dayId);
}

function renderWarmupSection(dayId) {
  const wu = WARMUPS[dayId];
  if (!wu) return '';
  const checks = getLocalWarmup(currentWeek, dayId, wu.items.length);
  const done = checks.filter(Boolean).length;
  const total = wu.items.length;
  const allDone = done === total;
  const open = openWarmups.has(dayId);

  const itemsHtml = wu.items.map((item, i) => {
    const chk = checks[i] || false;
    return `<div class="wu-item${chk ? ' done' : ''}" onclick="toggleWarmupItem('${dayId}',${i})">
      <div class="wu-cb"><span class="wu-cb-chk">✓</span></div>
      <div class="wu-info">
        <div class="wu-name">${esc(item.name)}</div>
        <div class="wu-duration">${esc(item.duration)}</div>
      </div>
      <div class="wu-note">${esc(item.note)}</div>
    </div>`;
  }).join('');

  return `<div class="wu-card${allDone ? ' done' : ''}" id="warmup_${dayId}">
    <div class="wu-header" onclick="toggleWarmup('${dayId}')">
      <span class="wu-icon">${allDone ? '✓' : '⚡'}</span>
      <span class="wu-label">${allDone ? 'Warmed up' : 'Warm-up — ' + wu.duration}</span>
      <span class="wu-count">${done}/${total}</span>
      <span class="wu-chev${open ? ' open' : ''}">▾</span>
    </div>
    <div class="wu-body${open ? ' open' : ''}" id="warmup_body_${dayId}">
      <div class="wu-bar-bg"><div class="wu-bar-fill" style="width:${Math.round(done/total*100)}%"></div></div>
      ${itemsHtml}
    </div>
  </div>`;
}

function reRenderWarmup(dayId) {
  const container = document.getElementById(`warmup_${dayId}`);
  if (container) {
    const temp = document.createElement('div');
    temp.innerHTML = renderWarmupSection(dayId);
    const fresh = temp.firstElementChild;
    if (fresh) container.replaceWith(fresh);
  }
}

function renderExRow(day, i, chk) {
  const ex = day.exercises[i];
  const ps = getProgState(day.id, i);
  const lv = ex.levels[ps.level];
  const maxLv = ex.levels.length - 1;
  const streak = ps.streak || 0;
  const pA = ex.type === 's' ? 'pill-s' : 'pill-a';
  const pB = ex.type === 's' ? 'pill-s' : 'pill-b';
  const badge = `<span class="prog-badge ${ps.level === 0 ? 'lv1' : ps.level === 1 ? 'lv2' : 'lv3'}">${lv.label} · ${streak}/3 streak</span>`;
  const hint  = ps.level < maxLv
    ? `<div class="prog-next">→ Next: ${ex.levels[ps.level + 1].label} — tick 3 weeks to unlock</div>`
    : `<div class="prog-next" style="color:var(--gold)">✦ Max level reached</div>`;
  const img = ex.image || '🏋️';
  const fg  = ex.formGuide || '';
  return `<div class="ex-row${chk ? ' checked' : ''}" id="exrow_${day.id}_${i}">
    <div class="cb-wrap"><div class="cb" onclick="toggleCheck('${day.id}',${i})"><span class="cb-tick">✓</span></div></div>
    <div class="ex-img"><span class="ex-img-icon">${img}</span></div>
    <div class="ex-info">
      <div class="en">${ex.name}</div>
      <div class="en2">${ex.note}</div>
      ${badge}${hint}
      <div class="ex-pills-mobile">
        <span class="pill ${pA}">${lv.a}</span>
        <span class="pill ${pB}">${lv.b}</span>
      </div>
      ${fg ? `<div class="fg-wrap"><button class="fg-btn" onclick="toggleGuidance('${day.id}',${i})">Form Tips</button><div class="fg-body" id="fg_${day.id}_${i}">${esc(fg)}</div></div>` : ''}
    </div>
    <div class="ex-pill-cell"><span class="pill ${pA}">${lv.a}</span></div>
    <div class="ex-pill-cell"><span class="pill ${pB}">${lv.b}</span></div>
  </div>`;
}

// ── INTERACTIONS ──
function toggleDay(id) {
  const c = document.getElementById('daycard_' + id);
  c.classList.toggle('open');
  if (c.classList.contains('open')) openCards.add(id);
  else openCards.delete(id);
}

function scrollToDay(id) {
  const c = document.getElementById('daycard_' + id);
  if (c) {
    c.classList.add('open');
    openCards.add(id);
    c.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleCheck(dayId, exIdx) {
  const day = DAYS.find(d => d.id === dayId);
  const checks = getLocalCb(currentWeek, dayId, day.exercises.length);
  checks[exIdx] = !checks[exIdx];
  saveLocalCb(currentWeek, dayId, checks);

  const row = document.getElementById(`exrow_${dayId}_${exIdx}`);
  if (row) row.classList.toggle('checked', checks[exIdx]);

  const unlocked = recalcProgression(currentWeek, dayId, exIdx);
  const done = checks.filter(Boolean).length;
  const n = day.exercises.length;
  const card = document.getElementById('daycard_' + dayId);
  if (card) {
    card.classList.toggle('complete', done === n);
    const ring = card.querySelector('.day-ring'); if (ring) ring.textContent = done === n ? '✓' : '○';
    const cnt  = card.querySelector('.day-count'); if (cnt)  cnt.textContent  = `${done}/${n}`;
  }
  renderScheduleStrip();
  checkAnyUnlocks();

  if (unlocked) {
    const ps = getProgState(dayId, exIdx);
    const ex = day.exercises[exIdx];
    showToast(`✦ ${ex.name} — ${ex.levels[ps.level].label}`);
    const newRow = document.createElement('div');
    newRow.innerHTML = renderExRow(day, exIdx, checks[exIdx]);
    const old = document.getElementById(`exrow_${dayId}_${exIdx}`);
    if (old && newRow.firstChild) old.replaceWith(newRow.firstChild);
  }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:28px;right:28px;z-index:9997;background:#1a1a1a;border:1px solid rgba(184,150,12,0.4);color:#b8960c;padding:12px 20px;font-family:Montserrat,sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;animation:fadeUp .3s ease;box-shadow:0 8px 30px rgba(0,0,0,0.5);';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function getCommentUser() {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  return user || { id: 'anon', username: 'Anonymous', avatar: '👤' };
}

function addComment(dayId) {
  const user = getCommentUser();
  const exName  = document.getElementById('cmex_'  + dayId).value;
  const body    = document.getElementById('cminput_'+ dayId).value.trim();
  if (!body) return;
  document.getElementById('cminput_' + dayId).value = '';
  const newC = { id: Date.now(), userId: user.id, username: user.username, avatar: user.avatar, ex_name: exName, body, created_at: new Date().toISOString() };
  const existing = getLocalComments(currentWeek, dayId);
  existing.push(newC);
  saveLocalComments(currentWeek, dayId, existing);
  const list = document.getElementById('cmtlist_' + dayId);
  if (list) {
    const noMsg = list.querySelector('.no-comments');
    if (noMsg) noMsg.remove();
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `<div class="ci-header">
      <span class="ci-avatar-sm">${user.avatar}</span>
      <span class="ci-who">${esc(user.username)}</span>
      ${exName ? `<span class="ci-ex">on: ${esc(exName)}</span>` : ''}
      <span class="ci-time">just now</span>
      <button class="ci-del" onclick="deleteComment('${dayId}',${newC.id})">✕</button>
    </div><div class="ci-text">${esc(body)}</div>`;
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
  }
}

function deleteComment(dayId, cmtId) {
  const filtered = getLocalComments(currentWeek, dayId).filter(c => c.id !== cmtId);
  saveLocalComments(currentWeek, dayId, filtered);
  const list = document.getElementById('cmtlist_' + dayId);
  if (list) {
    list.innerHTML = filtered.length === 0
      ? '<div class="no-comments">No comments yet — be first</div>'
      : filtered.map(c => {
          const isOld = !!c.athlete;
          const avatar = c.avatar || (c.athlete === 'A' ? '🏋️' : '💪');
          const name = c.username || (c.athlete === 'A' ? '71kg — A' : '100kg — B');
          const cls = isOld ? (c.athlete === 'A' ? 'a' : 'b') : '';
          return `<div class="comment-item">
            <div class="ci-header">
              <span class="ci-avatar-sm">${avatar}</span>
              <span class="ci-who ${cls}">${esc(name)}</span>
              ${c.ex_name ? `<span class="ci-ex">on: ${esc(c.ex_name)}</span>` : ''}
              <span class="ci-time">${formatTime(c.created_at)}</span>
              <button class="ci-del" onclick="deleteComment('${dayId}',${JSON.stringify(c.id)})">✕</button>
            </div>
            <div class="ci-text">${esc(c.body)}</div>
          </div>`;
        }).join('');
  }
}

function autoSaveNotes(dayId) {
  const a = document.getElementById('noteA_' + dayId)?.value || '';
  const b = document.getElementById('noteB_' + dayId)?.value || '';
  const s = document.getElementById('sum_'   + dayId)?.value || '';
  saveLocalNotes(currentWeek, dayId, a, b, s);
}
function manualSave(dayId) {
  autoSaveNotes(dayId);
  const msg = document.getElementById('savedmsg_' + dayId);
  if (msg) { msg.classList.add('show'); setTimeout(() => msg.classList.remove('show'), 2000); }
}
function resetDay(dayId, n) {
  if (!confirm('Reset checkboxes for this day? Notes + comments stay.')) return;
  saveLocalCb(currentWeek, dayId, Array(n).fill(false));
  document.querySelectorAll(`[id^="exrow_${dayId}_"]`).forEach(r => r.classList.remove('checked'));
  const card = document.getElementById('daycard_' + dayId);
  if (card) {
    card.classList.remove('complete');
    const ring = card.querySelector('.day-ring'); if (ring) ring.textContent = '○';
    const cnt  = card.querySelector('.day-count'); if (cnt)  cnt.textContent  = `0/${n}`;
  }
  renderScheduleStrip();
}
function setWeek(w, btn) {
  currentWeek = w;
  document.querySelectorAll('.wtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderAll();
  if (window.injectExerciseAnimations) setTimeout(window.injectExerciseAnimations, 100);
}
function renderAll() {
  renderWeekTabs();
  renderScheduleStrip();
  renderDays();
  checkAnyUnlocks();
  refreshCommentUsers();
}

function refreshCommentUsers() {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  document.querySelectorAll('.cm-user').forEach(el => {
    const avatar = el.querySelector('.cm-user-avatar');
    const name = el.querySelector('.cm-user-name');
    if (user) {
      if (avatar) avatar.textContent = user.avatar;
      if (name) name.innerHTML = `Commenting as <strong>${esc(user.username)}</strong>`;
    } else {
      if (avatar) avatar.textContent = '👤';
      if (name) name.innerHTML = '<a href="/profile.html" style="color:var(--gold);text-decoration:none">Sign in to comment</a>';
    }
  });
}

// ── INIT ──
renderAll();

// Auto-open today's card and scroll to it
openCards.add(todayDayId);
const todayCard = document.getElementById('daycard_' + todayDayId);
if (todayCard) {
  todayCard.classList.add('open');
  setTimeout(() => todayCard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
}

// Date label in header
(function addDateLabel() {
  const label = document.createElement('div');
  label.style.cssText = 'font-size:8px;letter-spacing:2.5px;color:var(--gold);text-transform:uppercase;display:flex;align-items:center;gap:6px;padding-top:4px;';
  const today = new Date();
  label.innerHTML = '✦ <span>' + (typeof getNepaliDateShort === 'function' ? getNepaliDateShort(today) : today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()) + ' · WK ' + currentWeek + '</span>';
  const wn = document.querySelector('.wn-hd');
  if (wn) wn.appendChild(label);
})();
