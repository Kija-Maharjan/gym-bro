const EXERCISE_ANIMATIONS = {
  'Cable overhead triceps extension': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" x2="60" y1="4" y2="4" stroke="var(--gold)" stroke-width="2" opacity="0.25"/>
    <line x1="20" y1="4" x2="20" y2="10" stroke="var(--gold)" stroke-width="1.5" opacity="0.25"/>
    <line x1="60" y1="4" x2="60" y2="10" stroke="var(--gold)" stroke-width="1.5" opacity="0.25"/>
    <circle cx="40" cy="18" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="24" x2="40" y2="48" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="34" x2="26" y2="28" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="34" x2="54" y2="28" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="48" x2="30" y2="66" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="48" x2="50" y2="66" stroke="var(--gold)" stroke-width="2"/>
    <line x1="30" y1="66" x2="26" y2="80" stroke="var(--gold)" stroke-width="2"/>
    <line x1="50" y1="66" x2="54" y2="80" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="24" x2="28" y2="12" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="24" x2="52" y2="12" stroke="var(--gold)" stroke-width="2"/>
    <g class="anim-tri-ext">
      <line x1="28" y1="12" x2="24" y2="22" stroke="var(--gold)" stroke-width="2"/>
      <line x1="52" y1="12" x2="56" y2="22" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-tri-ext { animation: triExt 1.8s ease-in-out infinite; }
      @keyframes triExt { 0%,100% { transform: translateY(7px); } 50% { transform: translateY(-9px); } }
    </style>
  </svg>`,
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(injectExerciseAnimations, 300);
});

function injectExerciseAnimations() {
  const rows = document.querySelectorAll('.ex-row');
  rows.forEach(row => {
    if (row.querySelector('.ex-anim')) return;
    const nameEl = row.querySelector('.en');
    if (!nameEl) return;
    const name = nameEl.textContent.trim();
    const svg = EXERCISE_ANIMATIONS[name];
    if (!svg) return;
    const imgEl = row.querySelector('.ex-img-icon');
    if (!imgEl) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'ex-anim-wrap';
    wrapper.innerHTML = svg;
    imgEl.parentElement.replaceWith(wrapper);
  });
}

window.injectExerciseAnimations = injectExerciseAnimations;
