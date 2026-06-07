// ─── STORAGE.JS — localStorage helpers shared by index.js and gym-ai.js ──────

// Key format: cbros_{type}_w{week}_{dayId}
function lsKey(week, id, type) {
  return `cbros_${type}_w${week}_${id}`;
}

function saveLocalCb(week, id, checks) {
  localStorage.setItem(lsKey(week, id, 'cb'), JSON.stringify(checks));
}
function getLocalCb(week, id, numEx) {
  const raw = localStorage.getItem(lsKey(week, id, 'cb'));
  return raw ? JSON.parse(raw) : Array(numEx).fill(false);
}

function saveLocalNotes(week, id, noteA, noteB, summary) {
  localStorage.setItem(lsKey(week, id, 'notes'), JSON.stringify({ noteA, noteB, summary }));
}
function getLocalNotes(week, id) {
  const raw = localStorage.getItem(lsKey(week, id, 'notes'));
  return raw ? JSON.parse(raw) : { noteA: '', noteB: '', summary: '' };
}

function saveLocalComments(week, id, comments) {
  localStorage.setItem(lsKey(week, id, 'cmt'), JSON.stringify(comments));
}
function getLocalComments(week, id) {
  const raw = localStorage.getItem(lsKey(week, id, 'cmt'));
  return raw ? JSON.parse(raw) : [];
}

// ── PROGRESSION STATE ──
// Tracks streak (consecutive weeks completed) and current level per exercise
// Key: cbros_prog_{dayId}_{exIdx}
function getProgState(dayId, exIdx) {
  const raw = localStorage.getItem(`cbros_prog_${dayId}_${exIdx}`);
  return raw ? JSON.parse(raw) : { streak: 0, level: 0 };
}
function saveProgState(dayId, exIdx, state) {
  localStorage.setItem(`cbros_prog_${dayId}_${exIdx}`, JSON.stringify(state));
}

// Recalculate streak for a given exercise across the last 3 weeks.
// Returns true if a new level was just unlocked.
function recalcProgression(currentWeek, dayId, exIdx) {
  const day = DAYS.find(d => d.id === dayId);
  if (!day || day.isRest) return false;

  let streak = 0;
  for (let w = Math.max(1, currentWeek - 2); w <= currentWeek; w++) {
    const checks = getLocalCb(w, dayId, day.exercises.length);
    if (checks[exIdx]) streak++;
  }

  const ps = getProgState(dayId, exIdx);
  const maxLevel = day.exercises[exIdx].levels.length - 1;

  if (streak >= 3 && ps.level < maxLevel) {
    ps.level = Math.min(ps.level + 1, maxLevel);
    ps.streak = streak;
    saveProgState(dayId, exIdx, ps);
    return true; // unlocked!
  }

  ps.streak = streak;
  saveProgState(dayId, exIdx, ps);
  return false;
}

// ── WARM-UP STATE ──
// Key: cbros_warmup_w{week}_{dayId} = array of booleans
function saveLocalWarmup(week, id, checks) {
  localStorage.setItem(lsKey(week, id, 'warmup'), JSON.stringify(checks));
}
function getLocalWarmup(week, id, numItems) {
  const raw = localStorage.getItem(lsKey(week, id, 'warmup'));
  return raw ? JSON.parse(raw) : Array(numItems).fill(false);
}

// ── UTILS ──
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatTime(iso) {
  if (!iso) return '';
  const diff = (new Date() - new Date(iso)) / 1000;
  if (diff < 60)    return 'just now';
  if (diff < 3600)  return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return new Date(iso).toLocaleDateString();
}
