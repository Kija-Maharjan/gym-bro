const AVATARS = ['💪','🏋️','🔥','⚡','🎯','💥','🦍','🐺','🦅','👑','💎','🌟','🥇','🚀','💫'];

function getAvatar(username) {
  return AVATARS[username.charCodeAt(0) % AVATARS.length];
}

async function registerUser(email, password, username) {
  try {
    const sb = getSupabase();
    if (!sb) return { error: 'Supabase not loaded. Check internet connection.' };
    const { data, error } = await sb.auth.signUp({
      email, password,
      options: { data: { username, avatar: getAvatar(username) } }
    });
    if (error) return { error: error.message };
    if (!data.user) return { error: 'Registration failed. Try again.' };
    const { error: profileError } = await sb.from('profiles').upsert({
      id: data.user.id, username, avatar: getAvatar(username)
    });
    if (profileError) {
      if (profileError.message?.includes('duplicate key') || profileError.code === '23505') {
        return { error: 'Username "' + username + '" is already taken. Pick another.' };
      }
      console.log('Profile create error:', profileError.message);
    }
    setLocalSession(data.session || data.user);
    setTimeout(pullAllData, 500);
    return { user: { id: data.user.id, username, avatar: getAvatar(username) } };
  } catch (e) {
    return { error: e.message };
  }
}

async function loginUser(email, password) {
  try {
    const sb = getSupabase();
    if (!sb) return { error: 'Supabase not loaded. Check internet connection.' };
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    setLocalSession(data.session);
    const { data: profile } = await sb.from('profiles').select('username,avatar').eq('id', data.user.id).maybeSingle();
    const username = profile?.username || data.user.email;
    const avatar = profile?.avatar || getAvatar(username);
    setTimeout(pullAllData, 500);
    return { user: { id: data.user.id, username, avatar } };
  } catch (e) {
    return { error: e.message };
  }
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
