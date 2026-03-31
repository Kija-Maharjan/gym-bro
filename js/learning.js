// ─── LEARNING.JS — Roadmap Checklist Logic ───────────────────────────────────

function togglePhase(id) {
  document.getElementById(id).classList.toggle('open');
}

function toggle(el) {
  el.classList.toggle('done');
  saveProgress();
  updateProgress();
}

function updateProgress() {
  const all  = document.querySelectorAll('.task');
  const done = document.querySelectorAll('.task.done');
  const pct  = all.length ? Math.round((done.length / all.length) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent =
    done.length + ' / ' + all.length + ' tasks completed (' + pct + '%)';
}

function saveProgress() {
  const tasks = document.querySelectorAll('.task');
  const state = Array.from(tasks).map(t => t.classList.contains('done'));
  localStorage.setItem('gymbro_roadmap_progress', JSON.stringify(state));
}

function loadProgress() {
  const saved = localStorage.getItem('gymbro_roadmap_progress');
  if (!saved) return;
  const state = JSON.parse(saved);
  const tasks = document.querySelectorAll('.task');
  state.forEach((done, i) => { if (done && tasks[i]) tasks[i].classList.add('done'); });
  updateProgress();
}

// ── INIT ──
loadProgress();
updateProgress();
