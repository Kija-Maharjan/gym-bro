const AVATARS = ['💪','🏋️','🔥','⚡','🎯','💥','🦍','🐺','🦅','👑','💎','🌟','🥇','🚀','💫'];

function getAvatar(username) {
  return AVATARS[username.charCodeAt(0) % AVATARS.length];
}

function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

function noSupabaseMsg() {
  return 'Cannot connect. Disable ad blocker / Brave Shields for this site, or use a different browser.';
}

async function registerUser(email, password, username) {
  try {
    const sb = getSupabase();
    if (!sb) return { error: noSupabaseMsg() };
    const avatar = getAvatar(username);
    const { data, error } = await sb.auth.signUp({
      email, password,
      options: { data: { username, avatar } }
    });
    if (error) return { error: error.message };
    if (!data.user) {
      return { error: 'Registration failed. Try again.' };
    }

    // If no session returned, email confirmation is required
    if (!data.session) {
      return { error: 'Check your email to verify your account before signing in.', needsVerification: true };
    }
    const { error: profileError } = await sb.from('profiles').upsert({
      id: data.user.id, username, avatar
    });
    if (profileError) {
      if (profileError.message?.includes('duplicate key') || profileError.code === '23505') {
        return { error: 'Username "' + username + '" is already taken. Pick another.' };
      }
      console.log('Profile create error:', profileError.message);
    }
    setLocalSession(data.session || data.user);
    setTimeout(pullAllData, 500);

    // Migrate guest data if any
    tryMigrateGuestData(data.user.id, username, avatar);

    return { user: { id: data.user.id, username, avatar }, needsVerification: false };
  } catch (e) {
    return { error: e.message };
  }
}

async function loginUser(email, password) {
  try {
    const sb = getSupabase();
    if (!sb) return { error: noSupabaseMsg() };
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    setLocalSession(data.session);
    const { data: profile } = await sb.from('profiles').select('username,avatar').eq('id', data.user.id).maybeSingle();
    const username = profile?.username || data.user.email;
    const avatar = profile?.avatar || getAvatar(username);
    setTimeout(pullAllData, 500);

    // Migrate guest data if any
    tryMigrateGuestData(data.user.id, username, avatar);

    return { user: { id: data.user.id, username, avatar }, needsVerification: false };
  } catch (e) {
    return { error: e.message };
  }
}

async function forgotPassword(email) {
  try {
    const sb = getSupabase();
    if (!sb) return { error: 'Supabase not loaded.' };
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/profile.html'
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
}

async function updateUsername(newUsername) {
  try {
    const sb = getSupabase();
    if (!sb) return { error: 'Supabase not loaded.' };
    const session = getSession();
    if (!session) return { error: 'Not logged in.' };

    const avatar = getAvatar(newUsername);
    const { error: profileError } = await sb.from('profiles').upsert({
      id: session.userId, username: newUsername, avatar
    });
    if (profileError) {
      if (profileError.message?.includes('duplicate key') || profileError.code === '23505') {
        return { error: 'Username "' + newUsername + '" is already taken.' };
      }
      return { error: profileError.message };
    }

    // Update user_metadata
    await sb.auth.updateUser({ data: { username: newUsername, avatar } });

    // Update local session
    const s = getSession();
    s.username = newUsername;
    s.avatar = avatar;
    localStorage.setItem('gymbro_session', JSON.stringify(s));

    return { user: { ...s, username: newUsername, avatar } };
  } catch (e) {
    return { error: e.message };
  }
}

async function updateAvatar(newAvatar) {
  try {
    const sb = getSupabase();
    if (!sb) return { error: 'Supabase not loaded.' };
    const session = getSession();
    if (!session) return { error: 'Not logged in.' };

    const { error: profileError } = await sb.from('profiles').upsert({
      id: session.userId, avatar: newAvatar
    });
    if (profileError) return { error: profileError.message };

    await sb.auth.updateUser({ data: { avatar: newAvatar } });

    const s = getSession();
    s.avatar = newAvatar;
    localStorage.setItem('gymbro_session', JSON.stringify(s));

    return { success: true, avatar: newAvatar };
  } catch (e) {
    return { error: e.message };
  }
}

async function deleteAccount() {
  try {
    const sb = getSupabase();
    if (!sb) return { error: 'Supabase not loaded.' };
    const session = getSession();
    if (!session) return { error: 'Not logged in.' };

    const userId = session.userId;

    // Delete all user data from each table
    const tables = ['workout_checks', 'warmup_checks', 'progression', 'comments', 'skills', 'notes'];
    for (const table of tables) {
      await sb.from(table).delete().eq('user_id', userId);
    }

    // Delete profile
    await sb.from('profiles').delete().eq('id', userId);

    // Delete the auth user via RPC function (must be created in Supabase SQL editor)
    const { error: deleteError } = await sb.rpc('delete_user');
    if (deleteError) {
      console.warn('Account deletion requires a database function. Run the SQL in supabase-migration.sql');
      console.log('delete_user RPC error:', deleteError.message);
    }

    // Clean up local storage
    clearAllLocalData();
    await logoutUser();

    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
}

function clearAllLocalData() {
  // Remove all gymbro-prefixed keys from localStorage
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('u_') || key.startsWith('g_') || key.startsWith('cbros_') || key === 'gymbro_session')) {
      keys.push(key);
    }
  }
  keys.forEach(k => localStorage.removeItem(k));
}

async function needsEmailVerification() {
  try {
    const sb = getSupabase();
    if (!sb) return false;
    const { data: { session } } = await sb.auth.getSession();
    if (!session?.user) return false;
    // Check if email is confirmed
    return !session.user.email_confirmed_at;
  } catch {
    return false;
  }
}

function tryMigrateGuestData(userId, username, avatar) {
  // Check if there's guest data (g_ prefix) in localStorage
  let hasGuestData = false;
  const guestKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('g_')) {
      guestKeys.push(key);
      hasGuestData = true;
    }
  }
  if (!hasGuestData) return;

  // Copy guest data to user-prefixed keys
  const userPrefix = `u_${userId}_`;
  guestKeys.forEach(key => {
    const newKey = key.replace(/^g_/, userPrefix);
    localStorage.setItem(newKey, localStorage.getItem(key));
    // Keep guest data as fallback, don't delete
  });

  // Store migration flag
  localStorage.setItem('gymbro_migrated_from_guest', 'true');
}

function setLocalSession(session) {
  // Accept both Supabase AuthSession (session.user) and raw user object (user)
  const u = session?.user || session;
  if (u?.id) {
    const info = {
      userId: u.id,
      email: u.email || '',
      username: u.user_metadata?.username || u.username || u.email || '',
      avatar: u.user_metadata?.avatar || getAvatar(u.email || u.username || ''),
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('gymbro_session', JSON.stringify(info));
  }
}

function getSession() {
  const raw = localStorage.getItem('gymbro_session');
  return raw ? JSON.parse(raw) : null;
}

function getCurrentUser() {
  return getSession();
}

async function logoutUser() {
  try {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
  } catch (e) { /* ignore */ }
  localStorage.removeItem('gymbro_session');
}

function isLoggedIn() {
  return !!getSession();
}

(async function initAuth() {
  const sb = getSupabase();
  if (!sb) return;
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    setLocalSession(session);
    setTimeout(pullAllData, 500);
  }
  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      setLocalSession(session);
      setTimeout(pullAllData, 500);
    }
    if (event === 'SIGNED_OUT') {
      localStorage.removeItem('gymbro_session');
    }
  });
})();
