let currentTab = 'login';

function resetAuthForm() {
  document.getElementById('authForm').style.display = 'flex';
  document.getElementById('authTabs').style.display = 'flex';
  document.getElementById('authVerify').style.display = 'none';
  document.getElementById('authVerify').className = 'auth-verify';
  document.getElementById('authError').textContent = '';
  switchAuthTab('login');
}

function togglePassword() {
  const pw = document.getElementById('authPassword');
  const btn = document.getElementById('pwToggle');
  if (!pw || !btn) return;
  const show = pw.type === 'password';
  pw.type = show ? 'text' : 'password';
  btn.innerHTML = show
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}

function switchAuthTab(tab) {
  currentTab = tab;
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('authBtn').textContent = tab === 'login' ? 'Sign In' : 'Register';
  document.getElementById('authError').textContent = '';
  document.getElementById('authVerify').style.display = 'none';
  document.getElementById('authVerify').className = 'auth-verify';
  document.getElementById('forgotLink').style.display = tab === 'login' ? 'inline' : 'none';
  const nameField = document.getElementById('authNameField');
  if (nameField) nameField.style.display = tab === 'register' ? 'block' : 'none';
}

async function handleAuth() {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  if (!email || !password) return;
  const btn = document.getElementById('authBtn');
  const errorEl = document.getElementById('authError');
  const verifyEl = document.getElementById('authVerify');
  errorEl.textContent = '';
  verifyEl.style.display = 'none';
  btn.disabled = true; btn.textContent = 'Please wait...';

  let result;
  if (currentTab === 'login') {
    result = await loginUser(email, password);
  } else {
    const username = document.getElementById('authUsername').value.trim();
    if (!username) {
      errorEl.textContent = 'Pick a display name';
      btn.disabled = false; btn.textContent = 'Register';
      return;
    }
    result = await registerUser(email, password, username);
  }

  btn.disabled = false;
  btn.textContent = currentTab === 'login' ? 'Sign In' : 'Register';

  if (result.needsVerification) {
    // Show verification-sent screen instead of form
    document.getElementById('authForm').style.display = 'none';
    document.getElementById('authTabs').style.display = 'none';
    verifyEl.style.display = 'block';
    verifyEl.className = 'auth-verify success';
    verifyEl.innerHTML = '<div class="av-icon">📧</div>'
      + '<div class="av-title">Check your email</div>'
      + '<div class="av-text">We sent a verification link to <strong>' + esc(email) + '</strong>.</div>'
      + '<div class="av-note">Click the link in the email to activate your account, then sign in.</div>'
      + '<div class="av-spam">Didn\'t get it? Check your spam folder.</div>'
      + '<button class="auth-btn" style="margin-top:18px" onclick="resetAuthForm()">Back to Sign In</button>';
    return;
  }
  if (result.error) {
    errorEl.textContent = result.error;
    return;
  }
  if (currentTab === 'register') {
    showToast('Welcome, <strong>' + document.getElementById('authUsername').value.trim() + '</strong>! Registration successful.', 'success');
  }
  renderProfile();
}

async function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  if (!email) {
    document.getElementById('authError').textContent = 'Enter your email first.';
    return;
  }
  const link = document.getElementById('forgotLink');
  link.textContent = 'Sending...';
  link.style.pointerEvents = 'none';
  const result = await forgotPassword(email);
  link.textContent = 'Forgot password?';
  link.style.pointerEvents = '';
  if (result.error) {
    document.getElementById('authError').textContent = result.error;
  } else {
    document.getElementById('authError').style.color = 'var(--done)';
    document.getElementById('authError').textContent = '✓ Check your email for reset link.';
    setTimeout(() => {
      document.getElementById('authError').style.color = '';
      document.getElementById('authError').textContent = '';
    }, 5000);
  }
}

function handleEditName() {
  document.getElementById('profName').style.display = 'none';
  document.getElementById('editNameBtn').style.display = 'none';
  document.getElementById('nameEditField').style.display = 'flex';
  document.getElementById('editUsername').value = document.getElementById('profName').textContent;
  document.getElementById('editUsername').focus();
}

function handleCancelEditName() {
  document.getElementById('profName').style.display = 'inline';
  document.getElementById('editNameBtn').style.display = 'inline';
  document.getElementById('nameEditField').style.display = 'none';
}

async function handleSaveName() {
  const newName = document.getElementById('editUsername').value.trim();
  if (!newName || newName.length < 2) {
    showToast('Username must be at least 2 characters.', 'error');
    return;
  }
  const btn = document.querySelector('.prof-save-btn');
  btn.disabled = true; btn.textContent = '...';

  const result = await updateUsername(newName);
  btn.disabled = false; btn.textContent = 'Save';

  if (result.error) {
    showToast(result.error, 'error');
    return;
  }
  document.getElementById('profName').textContent = result.user.username;
  document.getElementById('profAvatar').textContent = result.user.avatar;

  handleCancelEditName();
  renderProfile();
  showToast('Username updated to <strong>' + result.user.username + '</strong>', 'success');
}

async function handleAvatarChange() {
  const avatars = AVATARS;
  const current = document.getElementById('profAvatar').textContent;
  let next = avatars[(avatars.indexOf(current) + 1) % avatars.length];
  // If current not found, pick random
  if (!next || next === current) {
    let available = avatars.filter(a => a !== current);
    next = available[Math.floor(Math.random() * available.length)];
  }

  const result = await updateAvatar(next);
  if (result.error) {
    showToast(result.error, 'error');
    return;
  }
  document.getElementById('profAvatar').textContent = result.avatar;
  showToast('Avatar changed!', 'success');
}

function handleLogout() {
  logoutUser();
  document.getElementById('authSection').style.display = 'flex';
  document.getElementById('profileSection').style.display = 'none';
  document.getElementById('migrationNotice').style.display = 'none';
}

let pendingConfirmAction = null;

function showConfirm(title, text, confirmLabel, callback) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  const btn = document.getElementById('modalConfirmBtn');
  btn.textContent = confirmLabel || 'Confirm';
  pendingConfirmAction = callback;
  document.getElementById('confirmModal').style.display = 'flex';
}

function cancelModal() {
  document.getElementById('confirmModal').style.display = 'none';
  pendingConfirmAction = null;
}

function confirmModal() {
  document.getElementById('confirmModal').style.display = 'none';
  if (pendingConfirmAction) {
    const fn = pendingConfirmAction;
    pendingConfirmAction = null;
    fn();
  }
}

function handleDeleteAccount() {
  showConfirm(
    'Delete Account?',
    'This will permanently delete your profile, all workout data, comments, and progress. This cannot be undone.',
    'Delete Forever',
    async () => {
      const result = await deleteAccount();
      if (result.error) {
        showToast(result.error, 'error');
        return;
      }
      showToast('Account deleted successfully.', 'success');
      document.getElementById('authSection').style.display = 'flex';
      document.getElementById('profileSection').style.display = 'none';
      location.reload();
    }
  );
}

function handleMigrateGuestData() {
  const session = getSession();
  if (!session) return;
  tryMigrateGuestData(session.userId, session.username, session.avatar);
  document.getElementById('migrationNotice').style.display = 'none';
  showToast('✓ Guest data imported successfully!', 'success');
}

function dismissMigration() {
  document.getElementById('migrationNotice').style.display = 'none';
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
        if (c.username === session.username) {
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
  const joined = new Date(user.createdAt || user.loggedInAt);
  document.getElementById('profJoined').textContent =
    'Member since ' + joined.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Check for guest migration
  const hasGuestData = checkGuestDataExists();
  if (hasGuestData && !localStorage.getItem('gymbro_migrated_from_guest')) {
    document.getElementById('migrationNotice').style.display = 'flex';
  }

  const stats = getUserStats();
  if (stats) {
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
        const name = c.username || 'Unknown';
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
}

function checkGuestDataExists() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('g_')) return true;
  }
  return false;
}

// ── SYNC ──
async function handleSync() {
  const btn = document.querySelector('.sync-btn');
  const status = document.getElementById('syncStatus');
  const progressBar = document.getElementById('syncProgressBar');
  const progressFill = document.getElementById('syncProgressFill');
  if (!btn || !status) return;
  btn.disabled = true;
  progressBar.style.display = 'block';
  progressFill.style.width = '0%';
  btn.textContent = '⏳ Syncing...';
  status.textContent = '';

  const session = getSession();
  if (!session) { status.textContent = 'Not logged in'; btn.disabled = false; btn.textContent = '⬆ Sync Now'; progressBar.style.display = 'none'; return; }

  const result = await syncAllToServer((done, total) => {
    const pct = Math.min(100, Math.round((done / total) * 100));
    progressFill.style.width = pct + '%';
    status.textContent = done + ' / ' + total;
  });

  btn.disabled = false;
  btn.textContent = '⬆ Sync Now';
  progressBar.style.display = 'none';

  if (result.error) {
    status.textContent = '✗ ' + result.error;
    status.style.color = '#e57373';
    setTimeout(() => { status.style.color = ''; }, 4000);
  } else {
    status.textContent = '✓ Synced ' + result.synced + ' items';
    setTimeout(() => { if (status.textContent.startsWith('✓')) status.textContent = ''; }, 4000);
  }
}

// ── TOAST SYSTEM ──
function showToast(message, type) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const t = document.createElement('div');
  t.className = 'toast-notification';
  const bg = type === 'error' ? 'rgba(80,30,30,0.95)' : 'var(--done-bg, rgba(30,80,30,0.95))';
  const border = type === 'error' ? 'rgba(229,115,115,0.4)' : 'rgba(129,199,132,0.4)';
  const color = type === 'error' ? '#e57373' : 'var(--done, #81c784)';
  t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:9997;background:' + bg + ';border:1px solid ' + border + ';color:' + color + ';padding:14px 28px;font-family:Montserrat,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;animation:fadeUp .3s ease;box-shadow:0 8px 30px rgba(0,0,0,0.5);border-radius:8px;text-align:center;max-width:90vw;';
  t.innerHTML = message;
  document.body.appendChild(t);
  setTimeout(() => { if (t.parentNode) t.remove(); }, 5000);
}

(function init() {
  if (isLoggedIn()) renderProfile();
  // Check if Supabase is blocked (Brave Shields, ad blocker, etc.)
  setTimeout(function checkSupabase() {
    if (!getSupabase() && !document.getElementById('profileSection').style.display || document.getElementById('profileSection').style.display === 'none') {
      const sbWarning = document.createElement('div');
      sbWarning.id = 'sbWarning';
      sbWarning.style.cssText = 'text-align:center;padding:12px 20px;margin-top:12px;background:rgba(229,115,115,0.1);border:1px solid rgba(229,115,115,0.3);border-radius:6px;font-size:9px;color:#e57373;letter-spacing:0.5px;line-height:1.5;';
      sbWarning.innerHTML = '⚠️ Sign in requires Supabase — if using Brave, disable Shields for this site.';
      document.getElementById('authForm')?.appendChild(sbWarning);
    }
  }, 1500);
})();
