// ─── GYM-AI.JS — AI Coach Chat Logic ─────────────────────────────────────────
// Depends on: data.js, storage.js, nav.js

// ── STATE ──
let selectedDay = null;
let currentWeek = 1;
let messages    = [];
let chips       = { exercises: true, comments: true, notes: true };
let isLoading   = false;

// ── RENDER LEFT PANEL ──
function renderDaySelector() {
  const colors = { mon:'#e8533a', tue:'#555', wed:'#80cbc4', thu:'#f4c97a', fri:'#555', sat:'#b39ddb', sun:'#ef9a9a' };
  document.getElementById('daySelectorGrid').innerHTML = DAYS.map(d => {
    if (d.isRest) {
      return `<div class="day-sel-item ${selectedDay === d.id ? 'selected' : ''}" onclick="selectDay('${d.id}')">
        <div class="dsi-dot" style="background:${colors[d.id] || '#555'}"></div>
        <div class="dsi-info">
          <div class="dsi-day">${d.weekday} — ${d.type}</div>
          <div class="dsi-type">${d.focus}</div>
        </div>
        <div class="dsi-check" style="color:var(--text-dim)">😴 Rest</div>
      </div>`;
    }
    const checks   = getLocalCb(currentWeek, d.id, d.exercises.length);
    const done     = checks.filter(Boolean).length;
    const total    = d.exercises.length;
    const unlocked = d.exercises.filter((_, i) => getProgState(d.id, i).level > 0).length;
    return `<div class="day-sel-item ${selectedDay === d.id ? 'selected' : ''}" onclick="selectDay('${d.id}')">
      <div class="dsi-dot" style="background:${colors[d.id] || 'var(--text-dim)'}"></div>
      <div class="dsi-info">
        <div class="dsi-day">${d.weekday} — ${d.type}</div>
        <div class="dsi-type">${d.focus}${unlocked > 0 ? ` · 🔓${unlocked}` : ''}</div>
      </div>
      <div class="dsi-check">${done === total ? '✓ done' : `${done}/${total}`}</div>
    </div>`;
  }).join('');
}

function renderExContext(dayId) {
  const day = DAYS.find(d => d.id === dayId);
  if (!day) return;
  const sec  = document.getElementById('exContextSec');
  const list = document.getElementById('exContextList');
  sec.style.display = '';
  if (day.isRest) {
    list.innerHTML = `<div class="ex-ctx" style="color:var(--text-dim);font-size:11px">😴 Rest day — rehab + recovery only.</div>`;
    return;
  }
  const checks = getLocalCb(currentWeek, dayId, day.exercises.length);
  list.innerHTML = day.exercises.map((ex, i) => {
    const done = checks[i];
    const ps   = getProgState(dayId, i);
    const lv   = ex.levels[ps.level];
    return `<div class="ex-ctx" style="${done ? 'opacity:.45' : ''}">
      <div class="ex-ctx-name">${done ? '✓ ' : ''}<strong>${ex.name}</strong>
        <span style="font-size:8px;font-family:Montserrat,sans-serif;color:var(--unlock);margin-left:6px;letter-spacing:1px">L${ps.level + 1} · ${ps.streak || 0}/3</span>
      </div>
      <div class="ex-ctx-pills">
        <span class="pill pill-a">${lv.a}</span>
        <span class="pill pill-b">${lv.b}</span>
      </div>
    </div>`;
  }).join('');
}

function renderCmtContext(dayId) {
  const sec    = document.getElementById('cmtContextSec');
  const list   = document.getElementById('cmtContextList');
  const noMsg  = document.getElementById('noCmtMsg');
  sec.style.display = '';
  const comments = getLocalComments(currentWeek, dayId);
  if (comments.length === 0) {
    list.innerHTML = '';
    noMsg.style.display = '';
  } else {
    noMsg.style.display = 'none';
    list.innerHTML = comments.map(c => `<div class="comment-ctx">
      ${c.ex_name ? `<div class="cc-ex">on: ${c.ex_name}</div>` : ''}
      <div class="cc-who ${c.athlete === 'A' ? 'a' : 'b'}">${c.athlete === 'A' ? '71 kg — A' : '100 kg — B'}</div>
      <div class="cc-text">${esc(c.body)}</div>
    </div>`).join('');
  }
}

function selectDay(id) {
  selectedDay = id;
  const day = DAYS.find(d => d.id === id);
  document.getElementById('activeDayBadge').textContent = `${day.weekday} · ${day.type}`;
  renderDaySelector();
  renderExContext(id);
  renderCmtContext(id);
  messages = [];
  renderWelcome(day);
}

function renderWelcome(day) {
  const comments = getLocalComments(currentWeek, day.id);
  const el = document.getElementById('chatMessages');
  el.innerHTML = '';
  let content;
  if (day.isRest) {
    content = `<strong>${day.weekday} — Rest Day loaded.</strong><br><br>No training today. I can help with:<br>· Shoulder rehab protocol for B<br>· Recovery tips (sleep, nutrition, contrast shower)<br>· Mobility work for A<br>· Preparing for the next training day<br><br>What do you need?`;
  } else {
    const checks   = getLocalCb(currentWeek, day.id, day.exercises.length);
    const done     = checks.filter(Boolean).length;
    const unlocked = day.exercises.filter((_, i) => getProgState(day.id, i).level > 0).length;
    const near     = day.exercises.filter((_, i) => { const ps = getProgState(day.id, i); return ps.streak >= 2 && ps.level < day.exercises[i].levels.length - 1; }).length;
    content = `<strong>${day.weekday} — ${day.type}</strong> loaded.<br><br>
· ${done}/${day.exercises.length} exercises completed<br>
· ${comments.length} comment${comments.length !== 1 ? 's' : ''}<br>
· ${unlocked} exercise${unlocked !== 1 ? 's' : ''} unlocked to higher level${near > 0 ? `<br>· ${near} exercise${near !== 1 ? 's' : ''} one week from next unlock` : ''}<br><br>
Ask me anything — form tips, rest times, "rewrite today's plan", or "what do I need to unlock the next level?"`;
  }
  appendMessage('ai', content);
}

// ── SYSTEM PROMPT ──
function buildSystemPrompt(day) {
  const notes    = getLocalNotes(currentWeek, day.id);
  const comments = getLocalComments(currentWeek, day.id);

  let sys = `You are an AI calisthenics coach for two brothers training together in Nepal.

ATHLETE PROFILES:
- Athlete A (71 kg): Beginner building foundation. Form first always. Currently: knee push-ups → progressing to full, negative pull-ups only.
- Athlete B (100 kg): Comeback with SHOULDER INJURY. NO overhead pressing, NO dips past 90°. Priority: scapular health + rotator cuff rehab.

SCHEDULE: Mon Push · Tue REST+REHAB · Wed Pull · Thu Core+Skill · Fri REST+REHAB · Sat Legs · Sun Full Body
Rest days = active recovery + shoulder rehab for B (band pull-aparts mandatory).

TODAY: ${day.weekday} — ${day.type} (Week ${currentWeek})
FOCUS: ${day.focus}
`;

  if (day.isRest) {
    sys += `\nThis is a REST + REHAB day. Advise on recovery, shoulder rehab for B, mobility for A, and preparation for the next training day.\n`;
  } else if (chips.exercises) {
    const checks = getLocalCb(currentWeek, day.id, day.exercises.length);
    sys += '\nEXERCISES WITH CURRENT PROGRESSION LEVELS:\n';
    day.exercises.forEach((ex, i) => {
      const done = checks[i] ? '✓ DONE' : '○';
      const ps   = getProgState(day.id, i);
      const lv   = ex.levels[ps.level];
      const maxLv = ex.levels.length - 1;
      sys += `  ${done} | ${ex.name}
    A: ${lv.a} | B: ${lv.b}
    Level ${ps.level + 1}/${ex.levels.length} · streak ${ps.streak || 0}/3 weeks
    Next level: ${ps.level < maxLv ? `A: ${ex.levels[ps.level + 1].a} / B: ${ex.levels[ps.level + 1].b}` : 'MAX — fully unlocked'}\n`;
    });
  }

  if (chips.comments && comments.length > 0) {
    sys += '\nCOMMENTS FROM THE ATHLETES:\n';
    comments.forEach(c => {
      sys += `  [${c.athlete === 'A' ? '71kg A' : '100kg B'}]${c.ex_name ? ' on "' + c.ex_name + '"' : ''}: "${c.body}"\n`;
    });
  }

  if (chips.notes) {
    const n = getLocalNotes(currentWeek, day.id);
    if (n.noteA)   sys += `\nA's note: "${n.noteA}"\n`;
    if (n.noteB)   sys += `B's note: "${n.noteB}"\n`;
    if (n.summary) sys += `Summary: "${n.summary}"\n`;
  }

  sys += `
YOUR ROLE:
- Read comments and notes carefully — they tell you how the session actually went
- Adjust reps/sets based on feedback ("too easy" → harder, "couldn't finish" → reduce)
- NEVER suggest overhead press or risky shoulder movement for B
- When asked about progression: explain exactly what they need (3 consecutive weeks ticked)
- When asked to "rewrite today's plan": output a clean structured updated plan
- Be direct, specific, and reference their actual comments and progress data`;

  return sys;
}

// ── SEND MESSAGE ──
async function sendMessage() {
  if (isLoading) return;
  if (!selectedDay) { alert('Select a training day first!'); return; }

  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;

  input.value = '';
  autoResize(input);
  appendMessage('user', esc(text));
  messages.push({ role: 'user', content: text });

  const day = DAYS.find(d => d.id === selectedDay);
  isLoading = true;
  document.getElementById('sendBtn').disabled = true;

  // Typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'msg ai';
  typingEl.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-body"><div class="msg-bubble"><div class="typing-indicator"><div class="ti-dot"></div><div class="ti-dot"></div><div class="ti-dot"></div></div></div></div>`;
  document.getElementById('chatMessages').appendChild(typingEl);
  scrollToBottom();

  try {
    // ── CALLS /api/chat (Vercel serverless proxy) — API key stays on server ──
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: buildSystemPrompt(day),
        messages: messages.slice(-10),
      }),
    });

    const data = await response.json();
    typingEl.remove();

    if (data.error) {
      appendMessage('ai', `⚠ Error: <code>${data.error.message || data.error}</code>`);
    } else {
      const reply = data.content?.[0]?.text || 'No response received.';
      messages.push({ role: 'assistant', content: reply });
      appendMessage('ai', formatAIReply(reply));
    }
  } catch (e) {
    typingEl.remove();
    appendMessage('ai', `⚠ Network error: <code>${e.message}</code><br><br>Make sure you're running on Vercel (or localhost with the API function running).`);
  }

  isLoading = false;
  document.getElementById('sendBtn').disabled = false;
}

function formatAIReply(t) {
  return t
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function appendMessage(role, html) {
  const msgs  = document.getElementById('chatMessages');
  const empty = msgs.querySelector('.empty-state');
  if (empty) empty.remove();
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar">${role === 'ai' ? '🤖' : '💪'}</div>
    <div class="msg-body">
      <div class="msg-bubble">${html}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  msgs.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  const el = document.getElementById('chatMessages');
  el.scrollTop = el.scrollHeight;
}

// ── UI HELPERS ──
function quickPrompt(btn) {
  if (!selectedDay) { alert('Select a training day first!'); return; }
  document.getElementById('chatInput').value = btn.textContent.replace(/^[^\s]+\s/, '').trim();
  sendMessage();
}

function toggleChip(el, key) {
  chips[key] = !chips[key];
  el.classList.toggle('on', chips[key]);
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(ta) {
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 130) + 'px';
}

function onWeekChange() {
  currentWeek = parseInt(document.getElementById('weekSel').value);
  renderDaySelector();
  if (selectedDay) { renderExContext(selectedDay); renderCmtContext(selectedDay); }
}

// ── INIT ──
renderDaySelector();
