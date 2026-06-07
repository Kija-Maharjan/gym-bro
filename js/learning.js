// ─── LEARNING.JS — Calisthenics Skill Progression Tracker ─────────────────────

const SKILLS = [
  {
    id: 'lsit',
    emoji: '📐',
    name: 'L-Sit',
    desc: 'Core compression strength — the foundation of straight-arm skills',
    steps: [
      'Tuck hold — 10 sec (knees to chest, hands flat)',
      'One-leg L-sit — 10 sec each side (one leg extended, one tucked)',
      'Full L-sit — 5 sec (both legs extended, hips off ground)',
      'V-sit — 5 sec (legs above parallel, chest open)',
      'Straddle V-sit — 5 sec (legs wide, torso between them)',
    ],
  },
  {
    id: 'handstand',
    emoji: '🙃',
    name: 'Handstand',
    desc: 'Balance, body tension, and overhead confidence',
    steps: [
      'Wall plank — 30 sec (feet on wall, hollow body, arms locked)',
      'Wall handstand — 30 sec (chest to wall, stacked alignment)',
      'Kick to wall — 10 controlled kicks each side',
      'Freestanding handstand — 5 sec hold',
      'Freestanding handstand — 10 sec hold',
      'Press handstand — controlled pike press to handstand',
    ],
  },
  {
    id: 'pullup',
    emoji: '⬆️',
    name: 'Pull-up Mastery',
    desc: 'Vertical pulling from strength to extreme control',
    steps: [
      '8 clean pull-ups (full dead hang, chest to bar)',
      '12 clean pull-ups (strict, no kipping)',
      'Weighted pull-up — +10kg × 5 (add load safely)',
      'Archer pull-up — 3 each side (one arm pulls, other reaches)',
      'One-arm negative — 5 sec lower each rep, 3×3',
      'One-arm pull-up — 1 rep (the final milestone)',
    ],
  },
  {
    id: 'pushup',
    emoji: '💥',
    name: 'Push-up Mastery',
    desc: 'Horizontal pushing — from endurance to planche',
    steps: [
      '30 clean push-ups (full ROM, body straight)',
      'Diamond push-ups — 3×15 (triceps focus)',
      'Pseudo planche push-up — 3×10 (hands at hips, lean forward)',
      'Planche lean — 3×15 sec (straight arms, 45° lean)',
      'Tuck planche — 5 sec hold (knees to chest, hips level)',
      'Full planche — 1 sec (straight body, arms locked)',
    ],
  },
  {
    id: 'flag',
    emoji: '🚩',
    name: 'Human Flag',
    desc: 'Extreme lateral core and shoulder strength',
    steps: [
      'Side plank — 60 sec each side (feet stacked, body straight)',
      'Arch body hold — 30 sec (on pole, top arm pulls, bottom arm pushes)',
      'Tuck flag — 10 sec (knees tucked to chest, body parallel to ground)',
      'Advanced tuck flag — 10 sec (one leg extended, one tucked)',
      'Full human flag — 5 sec (both legs straight, controlled)',
    ],
  },
  {
    id: 'lever',
    emoji: '📏',
    name: 'Front Lever',
    desc: 'Straight-arm pulling strength — the ultimate back lever',
    steps: [
      'Tuck front lever — 15 sec (knees to chest, back parallel)',
      'Advanced tuck front lever — 15 sec (shins parallel, back flat)',
      'One-leg front lever — 10 sec (one leg extended, one tucked)',
      'Straddle front lever — 10 sec (legs wide, straight)',
      'Full front lever — 5 sec (legs together, body horizontal)',
    ],
  },
  {
    id: 'muscleup',
    emoji: '🔄',
    name: 'Muscle-up',
    desc: 'The transition — pulling power meets pressing strength',
    steps: [
      '8 clean pull-ups (base requirement for muscle-up work)',
      'Explosive pull-up — 3×5 (pull to sternum, fast)',
      'Chest-to-bar pull-up — 3×5 (touch bar at lower chest)',
      'False grip hang — 20 sec (wrists over bar, no thumb wrap)',
      'Negative muscle-up — 3×3 (jump to support, lower 5 sec)',
      'Full muscle-up — 1 rep (pull, transition, press out)',
    ],
  },
];

function skillsKey() {
  return (typeof prefixedKey === 'function' ? prefixedKey('') : '') + 'gymbro_calisthenics_skills';
}

function getProgress() {
  const saved = localStorage.getItem(skillsKey());
  return saved ? JSON.parse(saved) : {};
}

function saveProgress(progress) {
  localStorage.setItem(skillsKey(), JSON.stringify(progress));
}

function getSkillProgress(skillId) {
  const all = getProgress();
  return all[skillId] || [];
}

function setSkillProgress(skillId, steps) {
  const all = getProgress();
  all[skillId] = steps;
  saveProgress(all);
}

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = SKILLS.map(skill => {
    const p = getSkillProgress(skill.id);
    const done = p.filter(Boolean).length;
    const total = skill.steps.length;
    const pct = Math.round((done / total) * 100);
    const complete = done === total;

    const stepsHtml = skill.steps.map((step, i) => {
      const checked = p[i] || false;
      const unlocked = i === 0 || p[i - 1] === true;
      const cls = checked ? 'ss-item done' : unlocked ? 'ss-item unlocked' : 'ss-item locked';
      return `<div class="${cls}" onclick="${unlocked ? `toggleStep('${skill.id}',${i})` : ''}">
        <div class="ss-cb"><span class="ss-cb-chk">✓</span></div>
        <div class="ss-text">${step}</div>
        ${checked ? '' : unlocked ? '' : '<div class="ss-lock">🔒</div>'}
      </div>`;
    }).join('');

    return `<div class="skill-card${complete ? ' complete' : ''}" id="card_${skill.id}">
      <div class="sc-header">
        <div class="sc-emoji">${skill.emoji}</div>
        <div class="sc-info">
          <div class="sc-name">${skill.name}</div>
          <div class="sc-desc">${skill.desc}</div>
        </div>
        <div class="sc-meta">
          ${complete ? '<span class="sc-trophy">🏆</span>' : ''}
          <div class="sc-pct">${pct}%</div>
        </div>
      </div>
      <div class="sc-bar-bg"><div class="sc-bar-fill" style="width:${pct}%"></div></div>
      <div class="sc-steps">${stepsHtml}</div>
      <div class="sc-footer">
        <span class="sc-count">${done}/${total}</span>
        ${complete ? '<span class="sc-complete-label">✦ MASTERED</span>' : ''}
      </div>
    </div>`;
  }).join('');
  updateOverall();
}

function toggleStep(skillId, idx) {
  const p = getSkillProgress(skillId);
  const unlocked = idx === 0 || p[idx - 1] === true;
  if (!unlocked) return;
  p[idx] = !p[idx];
  setSkillProgress(skillId, p);
  renderSkills();
}

function updateOverall() {
  let total = 0;
  let done = 0;
  SKILLS.forEach(s => {
    const p = getSkillProgress(s.id);
    s.steps.forEach((_, i) => {
      total++;
      if (p[i]) done++;
    });
  });
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('overallBar').style.width = pct + '%';
  document.getElementById('overallPct').textContent = pct + '%';
  document.getElementById('overallDetail').textContent = done + ' / ' + total + ' steps completed';
}

renderSkills();
