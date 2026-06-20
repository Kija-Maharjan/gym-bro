// ─── STORAGE.JS — localStorage helpers shared across pages ──────

function getStoragePrefix() {
  try {
    const s = typeof getSession === 'function' ? getSession() : null;
    return s && s.userId ? `u_${s.userId}_` : 'g_';
  } catch { return 'g_'; }
}

function prefixedKey(base) {
  return getStoragePrefix() + base;
}

// Key format: {planId}_cbros_{type}_w{week}_{dayId}
// 'calisthenics' plan keeps old key format for backward compat
function planPrefix() {
  return (typeof getActivePlanId === 'function' ? getActivePlanId() : 'calisthenics');
}
function lsKey(week, id, type) {
  const p = planPrefix();
  if (p === 'calisthenics') return prefixedKey(`cbros_${type}_w${week}_${id}`);
  return prefixedKey(`${p}_cbros_${type}_w${week}_${id}`);
}

function saveLocalCb(week, id, checks) {
  localStorage.setItem(lsKey(week, id, 'cb'), JSON.stringify(checks));
  if (navigator.onLine && typeof debouncedSync === 'function') {
    checks.forEach((checked, exIdx) => {
      debouncedSync('workout_checks', { week, day_id: id, ex_idx: exIdx, checked }, 'user_id,week,day_id,ex_idx');
    });
  }
}
function getLocalCb(week, id, numEx) {
  const raw = localStorage.getItem(lsKey(week, id, 'cb'));
  return raw ? JSON.parse(raw) : Array(numEx).fill(false);
}

function saveLocalNotes(week, id, noteA, noteB, summary) {
  localStorage.setItem(lsKey(week, id, 'notes'), JSON.stringify({ noteA, noteB, summary }));
  if (navigator.onLine && typeof debouncedSync === 'function') {
    debouncedSync('notes', { week, day_id: id, note_a: noteA, note_b: noteB, summary }, 'user_id,week,day_id');
  }
}
function getLocalNotes(week, id) {
  const raw = localStorage.getItem(lsKey(week, id, 'notes'));
  return raw ? JSON.parse(raw) : { noteA: '', noteB: '', summary: '' };
}

function saveLocalComments(week, id, comments) {
  localStorage.setItem(lsKey(week, id, 'cmt'), JSON.stringify(comments));
  if (navigator.onLine && typeof debouncedSync === 'function') {
    const session = typeof getSession === 'function' ? getSession() : null;
    comments.forEach(c => {
      // Only push own comments — don't re-upload other users' comments
      const ownerId = c.userId || c.user_id;
      if (ownerId && session && ownerId !== session.userId) return;
      debouncedSync('comments', {
        id: c.id, week, day_id: id, body: c.body,
        ex_name: c.ex_name || '', avatar: c.avatar || '💪', username: c.username || session?.username || '',
        created_at: c.created_at || new Date().toISOString()
      }, 'user_id,id');
    });
  }
}
function getLocalComments(week, id) {
  const raw = localStorage.getItem(lsKey(week, id, 'cmt'));
  return raw ? JSON.parse(raw) : [];
}

// ── PROGRESSION STATE ──
// Tracks streak (consecutive weeks completed) and current level per exercise
// Key: {planId}_cbros_prog_{dayId}_{exIdx}
function progKey(dayId, exIdx) {
  const p = planPrefix();
  if (p === 'calisthenics') return prefixedKey(`cbros_prog_${dayId}_${exIdx}`);
  return prefixedKey(`${p}_cbros_prog_${dayId}_${exIdx}`);
}
function getProgState(dayId, exIdx) {
  const raw = localStorage.getItem(progKey(dayId, exIdx));
  return raw ? JSON.parse(raw) : { streak: 0, level: 0 };
}
function saveProgState(dayId, exIdx, state) {
  localStorage.setItem(progKey(dayId, exIdx), JSON.stringify(state));
  if (navigator.onLine && typeof debouncedSync === 'function') {
    debouncedSync('progression', { day_id: dayId, ex_idx: exIdx, streak: state.streak, level: state.level }, 'user_id,day_id,ex_idx');
  }
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
  if (navigator.onLine && typeof debouncedSync === 'function') {
    checks.forEach((checked, itemIdx) => {
      debouncedSync('warmup_checks', { week, day_id: id, item_idx: itemIdx, checked }, 'user_id,week,day_id,item_idx');
    });
  }
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
  const d = new Date(iso);
  try { return typeof getNepaliDateString === 'function' ? getNepaliDateString(d) : d.toLocaleDateString(); }
  catch { return d.toLocaleDateString(); }
}
