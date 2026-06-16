const SUPABASE_URL = 'https://xlerblhqlhkinzquygcm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZXJibGhxbGhraW56cXV5Z2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjI2OTQsImV4cCI6MjA4NzU5ODY5NH0.09KN1u3EaAzCvvgD0tutDCIRTWD4nHM0H3ZunPbVMe0';

let sbClient = null;

function getSupabase() {
  if (sbClient) return sbClient;
  if (typeof supabase !== 'undefined') {
    sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
  }
  return sbClient;
}

async function isOnline() {
  if (!navigator.onLine) return false;
  const sb = getSupabase();
  if (!sb) return false;
  const { data: { session } } = await sb.auth.getSession();
  return !!session;
}

let syncQueue = [];
let syncTimer = null;

async function syncPush(table, data, conflictCols) {
  if (!data) return;
  try {
    const sb = getSupabase();
    if (!sb || !navigator.onLine) return;
    const { data: { session } } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return;
    const payload = Array.isArray(data) ? data.map(d => ({ ...d, user_id: user.id })) : [{ ...data, user_id: user.id }];
    await sb.from(table).upsert(payload, { onConflict: conflictCols, ignoreDuplicates: false });
  } catch (e) {
    console.log('syncPush error:', table, e.message);
  }
}

async function syncPushBatch(table, items, conflictCols) {
  if (!items || items.length === 0) return;
  try {
    const sb = getSupabase();
    if (!sb || !navigator.onLine) return;
    const { data: { session } } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return;
    const payload = items.map(d => ({ ...d, user_id: user.id }));
    // Batch in chunks of 50 to avoid payload size limits
    const chunkSize = 50;
    for (let i = 0; i < payload.length; i += chunkSize) {
      const chunk = payload.slice(i, i + chunkSize);
      await sb.from(table).upsert(chunk, { onConflict: conflictCols, ignoreDuplicates: false });
    }
  } catch (e) {
    console.log('syncPushBatch error:', table, e.message);
  }
}

function debouncedSync(table, data, conflictCols) {
  syncQueue.push({ table, data, conflictCols });
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(flushSyncQueue, 300);
}

async function flushSyncQueue() {
  const batch = syncQueue.splice(0);
  syncTimer = null;
  if (batch.length === 0) return;
  const groups = {};
  batch.forEach(item => {
    if (!groups[item.table]) groups[item.table] = { items: [], conflictCols: item.conflictCols };
    groups[item.table].items.push(item.data);
  });
  for (const [tableName, group] of Object.entries(groups)) {
    await syncPushBatch(tableName, group.items, group.conflictCols);
  }
}

// Flush pending syncs when leaving the page, pull fresh data on return
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Flush any pending sync queue immediately
      if (syncTimer) {
        clearTimeout(syncTimer);
        syncTimer = null;
      }
      flushSyncQueue();
    } else {
      // Tab became visible — pull latest from server
      const session = getSession();
      if (session && typeof pullAllData === 'function') {
        pullAllData();
      }
    }
  });
}

async function syncAllToServer(onProgress) {
  const session = getSession();
  if (!session) return { error: 'Not logged in' };

  let total = 0;
  let synced = 0;

  // Count total items first
  DAYS.forEach(day => {
    if (day.isRest) return;
    for (let w = 1; w <= 8; w++) {
      const checks = getLocalCb(w, day.id, day.exercises.length);
      total += checks.length;
      const wu = WARMUPS[day.id];
      if (wu) {
        const wuChecks = getLocalWarmup(w, day.id, wu.items.length);
        total += wuChecks.length;
      }
      const cmts = getLocalComments(w, day.id);
      total += cmts.length;
    }
    total += day.exercises.length; // progression entries
  });

  if (total === 0) { total = 1; }

  // Sync workout_checks in batch
  for (const day of DAYS) {
    if (day.isRest) continue;
    for (let w = 1; w <= 8; w++) {
      const checks = getLocalCb(w, day.id, day.exercises.length);
      const items = checks.map((checked, i) => ({ week: w, day_id: day.id, ex_idx: i, checked }));
      await syncPushBatch('workout_checks', items, 'user_id,week,day_id,ex_idx');
      synced += items.length;
      if (onProgress) onProgress(synced, total);
    }
  }

  // Sync warmup_checks in batch
  for (const day of DAYS) {
    if (day.isRest) continue;
    for (let w = 1; w <= 8; w++) {
      const wu = WARMUPS[day.id];
      if (!wu) continue;
      const wuChecks = getLocalWarmup(w, day.id, wu.items.length);
      const items = wuChecks.map((checked, i) => ({ week: w, day_id: day.id, item_idx: i, checked }));
      await syncPushBatch('warmup_checks', items, 'user_id,week,day_id,item_idx');
      synced += items.length;
      if (onProgress) onProgress(synced, total);
    }
  }

  // Sync progression in batch
  const progItems = [];
  DAYS.forEach(day => {
    if (day.isRest) return;
    day.exercises.forEach((_, i) => {
      const ps = getProgState(day.id, i);
      progItems.push({ day_id: day.id, ex_idx: i, streak: ps.streak, level: ps.level });
    });
  });
  await syncPushBatch('progression', progItems, 'user_id,day_id,ex_idx');
  synced += progItems.length;
  if (onProgress) onProgress(synced, total);

  // Sync comments in batch
  for (const day of DAYS) {
    if (day.isRest) continue;
    for (let w = 1; w <= 8; w++) {
      const cmts = getLocalComments(w, day.id);
      const items = cmts.filter(c => !c.userId || (session && c.userId === session.userId))
        .map(c => ({
          id: c.id, week: w, day_id: day.id, body: c.body,
          ex_name: c.ex_name || '', avatar: c.avatar || '💪',
          username: c.username || session.username || '',
          created_at: c.created_at || new Date().toISOString()
        }));
      await syncPushBatch('comments', items, 'user_id,id');
      synced += items.length;
      if (onProgress) onProgress(synced, total);
    }
  }

  // Sync skills in batch
  const skillKey = prefixedKey('gymbro_calisthenics_skills');
  const skillsRaw = localStorage.getItem(skillKey);
  if (skillsRaw) {
    const skillsData = JSON.parse(skillsRaw);
    const skillItems = [];
    Object.entries(skillsData).forEach(([skillKey, steps]) => {
      steps.forEach((checked, stepIdx) => {
        if (checked !== undefined) {
          skillItems.push({ skill_key: skillKey, step_idx: stepIdx, checked });
        }
      });
    });
    await syncPushBatch('skills', skillItems, 'user_id,skill_key,step_idx');
    synced += skillItems.length;
    if (onProgress) onProgress(synced, total);
  }

  // Sync notes in batch
  const noteItems = [];
  DAYS.forEach(day => {
    if (day.isRest) return;
    for (let w = 1; w <= 8; w++) {
      const notes = getLocalNotes(w, day.id);
      if (notes.noteA || notes.noteB || notes.summary) {
        noteItems.push({ week: w, day_id: day.id, note_a: notes.noteA, note_b: notes.noteB, summary: notes.summary });
      }
    }
  });
  await syncPushBatch('notes', noteItems, 'user_id,week,day_id');
  synced += noteItems.length;
  if (onProgress) onProgress(synced, total);

  return { synced, total };
}

// Auto-sync when coming back online
window.addEventListener('online', () => {
  const session = getSession();
  if (session && typeof DAYS !== 'undefined') {
    setTimeout(() => {
      syncAllToServer();
    }, 1000);
  }
});

async function syncCurrentWeek(week) {
  try {
    const sb = getSupabase();
    if (!sb || !navigator.onLine) return;
    const { data: { session } } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return;
    const { data: existing } = await sb.from('profiles')
      .select('current_week').eq('id', user.id).maybeSingle();
    if (existing) {
      if (existing.current_week !== week) {
        await sb.from('profiles').update({ current_week: week }).eq('id', user.id);
      }
    } else {
      await sb.from('profiles').insert({ id: user.id, current_week: week });
    }
  } catch (e) {
    console.log('syncCurrentWeek error:', e.message);
  }
}

async function fetchCurrentWeek() {
  try {
    const sb = getSupabase();
    if (!sb || !navigator.onLine) return null;
    const { data: { session } } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return null;
    const { data, error } = await sb.from('profiles')
      .select('current_week')
      .eq('id', user.id)
      .maybeSingle();
    if (error) throw error;
    return data?.current_week || null;
  } catch (e) {
    console.log('fetchCurrentWeek error:', e.message);
    return null;
  }
}

async function syncDelete(table, matchCol, matchVal) {
  try {
    const sb = getSupabase();
    if (!sb || !navigator.onLine) return;
    const { data: { session } } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return;
    const { data: existing } = await sb.from(table)
      .select('id').eq(matchCol, matchVal).eq('user_id', user.id).maybeSingle();
    if (existing) {
      await sb.from(table).delete().eq(matchCol, matchVal).eq('user_id', user.id);
    }
  } catch (e) {
    console.log('syncDelete error:', table, e.message);
  }
}

async function syncPull(table, cols, order, filterByUser = true) {
  try {
    const sb = getSupabase();
    if (!sb || !navigator.onLine) return null;
    const { data: { session } } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return null;
    let q = sb.from(table).select(cols);
    if (filterByUser) q = q.eq('user_id', user.id);
    if (order) q = q.order(order);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  } catch (e) {
    console.log('syncPull error:', table, e.message);
    return null;
  }
}

async function pullAllData() {
  const [checks, warmups, prog, cmts, skillData, noteData] = await Promise.all([
    syncPull('workout_checks', 'week,day_id,ex_idx,checked'),
    syncPull('warmup_checks', 'week,day_id,item_idx,checked'),
    syncPull('progression', 'day_id,ex_idx,streak,level'),
    syncPull('comments', 'id,user_id,week,day_id,body,ex_name,avatar,username,created_at', 'created_at', false),
    syncPull('skills', 'skill_key,step_idx,checked'),
    syncPull('notes', 'week,day_id,note_a,note_b,summary'),
  ]);

  if (checks) {
    const grouped = {};
    checks.forEach(c => {
      const key = `w${c.week}_${c.day_id}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key][c.ex_idx] = c.checked;
    });
    Object.entries(grouped).forEach(([key, arr]) => {
      const [_, w, dayId] = key.match(/w(\d+)_(.+)/);
      const day = DAYS.find(d => d.id === dayId);
      if (day) saveLocalCb(parseInt(w), dayId, arr.map(Boolean));
    });
  }

  if (warmups) {
    const wuGrouped = {};
    warmups.forEach(w => {
      const key = `w${w.week}_${w.day_id}`;
      if (!wuGrouped[key]) wuGrouped[key] = [];
      wuGrouped[key][w.item_idx] = w.checked;
    });
    Object.entries(wuGrouped).forEach(([key, arr]) => {
      const [_, w, dayId] = key.match(/w(\d+)_(.+)/);
      saveLocalWarmup(parseInt(w), dayId, arr.map(Boolean));
    });
  }

  if (prog) {
    prog.forEach(p => {
      saveProgState(p.day_id, p.ex_idx, { streak: p.streak, level: p.level });
    });
  }

  if (cmts) {
    const cmtGrouped = {};
    cmts.forEach(c => {
      const key = `w${c.week}_${c.day_id}`;
      if (!cmtGrouped[key]) cmtGrouped[key] = [];
      cmtGrouped[key].push({ ...c, userId: c.user_id });
    });
    Object.entries(cmtGrouped).forEach(([key, arr]) => {
      const [_, w, dayId] = key.match(/w(\d+)_(.+)/);
      saveLocalComments(parseInt(w), dayId, arr);
    });
  }

  if (skillData) {
    skillData.forEach(s => {
      const key = (typeof prefixedKey === 'function' ? prefixedKey('') : '') + 'gymbro_calisthenics_skills';
      const existing = JSON.parse(localStorage.getItem(key) || '{}');
      if (!existing[s.skill_key]) existing[s.skill_key] = [];
      existing[s.skill_key][s.step_idx] = s.checked;
      localStorage.setItem(key, JSON.stringify(existing));
    });
  }

  if (noteData) {
    noteData.forEach(n => {
      const key = typeof lsKey === 'function' ? lsKey(n.week, n.day_id, 'notes') : `cbros_notes_w${n.week}_${n.day_id}`;
      localStorage.setItem(key, JSON.stringify({ noteA: n.note_a || '', noteB: n.note_b || '', summary: n.summary || '' }));
    });
  }

  // Re-render the tracker page so pulled data shows up immediately
  if (typeof renderAll === 'function') setTimeout(renderAll, 0);
}
