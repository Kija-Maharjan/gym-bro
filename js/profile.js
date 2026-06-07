let currentTab = 'login';

function switchAuthTab(tab) {
  currentTab = tab;
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('authBtn').textContent = tab === 'login' ? 'Sign In' : 'Register';
  document.getElementById('authError').textContent = '';
  const nameField = document.getElementById('authNameField');
  if (nameField) nameField.style.display = tab === 'register' ? 'block' : 'none';
}

async function handleAuth() {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  if (!email || !password) return;
  const btn = document.getElementById('authBtn');
  btn.disabled = true; btn.textContent = 'Please wait...';

  if (currentTab === 'login') {
    var result = await loginUser(email, password);
  } else {
    const username = document.getElementById('authUsername').value.trim();
    if (!username) {
      document.getElementById('authError').textContent = 'Pick a username';
      btn.disabled = false; btn.textContent = 'Register';
      return;
    }
    var result = await registerUser(email, password, username);
  }

  btn.disabled = false;
  btn.textContent = currentTab === 'login' ? 'Sign In' : 'Register';

  if (result.error) {
    document.getElementById('authError').textContent = result.error;
    return;
  }
  renderProfile();
}

function handleLogout() {
  logoutUser();
  document.getElementById('authSection').style.display = 'flex';
  document.getElementById('profileSection').style.display = 'none';
}

function getUserStats() {
  const session = getSession();
  if (!session) return null;
  let totalDone = 0;
  const streakData = [];
  let levelUps = 0;

  DAYS.forEach(day => {
    if (day.isRest) return;
    day.exercises.forEach((ex, i) => {
      for (let w = 1; w <= 8; w++) {
        const checks = getLocalCb(w, day.id, day.exercises.length);
        if (checks[i]) totalDone++;
      }
      const ps = getProgState(day.id, i);
      if (ps.streak > 0) {
        streakData.push({ day, ex, exIdx: i, streak: ps.streak, level: ps.level });
      }
      if (ps.level > 0) levelUps++;
    });
  });

  const allComments = [];
  DAYS.forEach(day => {
    if (day.isRest) return;
    for (let w = 1; w <= 8; w++) {
      const cmts = getLocalComments(w, day.id);
      cmts.forEach(c => {
        if (c.username === session.username || c.athlete === session.username) {
          allComments.push({ ...c, week: w, dayId: day.id, dayName: day.weekday });
        }
      });
    }
  });
  allComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return { totalDone, streakData, levelUps, totalComments: allComments.length, recentComments: allComments.slice(0, 20) };
}

function renderProfile() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById('authSection').style.display = 'none';
  document.getElementById('profileSection').style.display = 'block';

  document.getElementById('profAvatar').textContent = user.avatar;
  document.getElementById('profName').textContent = user.username;
  const joined = new Date(user.createdAt);
  document.getElementById('profJoined').textContent =
    'Member since ' + joined.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const stats = getUserStats();
  document.getElementById('statExercises').textContent = stats.totalDone;
  document.getElementById('statStreaks').textContent = stats.streakData.length;
  document.getElementById('statLevelUps').textContent = stats.levelUps;
  document.getElementById('statComments').textContent = stats.totalComments;

  const pl = document.getElementById('progressList');
  if (stats.streakData.length === 0) {
    pl.innerHTML = '<div class="pl-empty">Complete exercises to see your streaks here.</div>';
  } else {
    pl.innerHTML = stats.streakData.map(s => {
      const dayName = s.day.weekday;
      const exName = s.ex.name;
      const streak = s.streak;
      const level = s.level;
      const maxLv = s.ex.levels.length - 1;
      const icon = level === maxLv ? '🏆' : level > 0 ? '🔥' : '⚡';
      return `<div class="progress-item">
        <div class="pi-icon">${icon}</div>
        <div class="pi-info">
          <div class="pi-name">${esc(exName)}</div>
          <div class="pi-day">${dayName}</div>
        </div>
        <div class="pi-streak">${streak}/3 wk</div>
        <div class="pi-level">L${level + 1}</div>
      </div>`;
    }).join('');
  }

  const rc = document.getElementById('recentComments');
  if (stats.recentComments.length === 0) {
    rc.innerHTML = '<div class="pl-empty">No comments yet.</div>';
  } else {
    rc.innerHTML = stats.recentComments.slice(0, 10).map(c => {
      const avatar = c.avatar || '💬';
      const name = c.username || c.athlete || 'Unknown';
      return `<div class="comment-item">
        <div class="ci-head">
          <span class="ci-avatar">${avatar}</span>
          <span class="ci-user">${esc(name)}</span>
          <span class="ci-time">${esc(c.dayName)} · ${formatTime(c.created_at)}</span>
        </div>
        <div class="ci-body">${esc(c.body)}</div>
      </div>`;
    }).join('');
  }
}

(function init() {
  if (isLoggedIn()) renderProfile();
})();
