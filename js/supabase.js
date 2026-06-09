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

async function syncPush(table, data, conflictCols) {
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

async function syncDelete(table, matchCol, matchVal) {
  try {
    const sb = getSupabase();
    if (!sb || !navigator.onLine) return;
    const { data: { session } } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return;
    await sb.from(table).delete().eq(matchCol, matchVal).eq('user_id', user.id);
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
    syncPull('comments', 'id,week,day_id,body,ex_name,avatar,username,created_at', 'created_at', false),
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
      cmtGrouped[key].push(c);
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
