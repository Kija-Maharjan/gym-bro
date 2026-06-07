// ─── EXERCISE-ANIMATIONS.JS ───────────────────────────────────────────────────
// Animated SVG stick figures for every exercise in the Gym Bro app.
// Each key matches an exercise name in data.js exactly.
// ─────────────────────────────────────────────────────────────────────────────

const EXERCISE_ANIMATIONS = {

  // ── PULL ──────────────────────────────────────────────────────────────────────
  'Pull-ups': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" x2="70" y1="5" y2="5" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
    <g class="anim-pullup">
      <circle cx="40" cy="24" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="5" x2="40" y2="18" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="38" x2="28" y2="48" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="38" x2="52" y2="48" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="32" y2="66" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="48" y2="66" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-pullup { animation: pullup 2s ease-in-out infinite; transform-origin: 40px 5px; }
      @keyframes pullup { 0%,100% { transform: translateY(18px); } 40%,60% { transform: translateY(0px); } }
    </style>
  </svg>`,

  'Weighted Pull-ups': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" x2="70" y1="5" y2="5" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
    <g class="anim-wpullup">
      <circle cx="40" cy="24" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="5" x2="40" y2="18" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="38" x2="28" y2="48" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="38" x2="52" y2="48" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="32" y2="66" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="48" y2="66" stroke="var(--gold)" stroke-width="2"/>
      <rect x="34" y="66" width="12" height="8" rx="2" fill="var(--gold)" opacity="0.3"/>
    </g>
    <style>
      .anim-wpullup { animation: pullup 2.5s ease-in-out infinite; transform-origin: 40px 5px; }
    </style>
  </svg>`,

  'Deadlift': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-deadlift">
      <circle cx="40" cy="18" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="24" x2="40" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="32" x2="26" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="32" x2="54" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="46" x2="30" y2="64" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="64" x2="26" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="46" x2="50" y2="64" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="64" x2="54" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <rect x="22" y="68" width="36" height="6" rx="2" fill="var(--gold)" opacity="0.35"/>
    </g>
    <style>
      .anim-deadlift { animation: deadlift 2.5s ease-in-out infinite; transform-origin: 40px 80px; }
      @keyframes deadlift {
        0%,100% { transform: translateY(0) scaleY(1); }
        45%,55% { transform: translateY(12px) scaleY(0.7); }
      }
    </style>
  </svg>`,

  'Barbell Row': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <g class="anim-brow">
      <circle cx="40" cy="16" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="22" x2="40" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="26" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="54" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="40" x2="30" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="58" x2="24" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="40" x2="50" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="58" x2="56" y2="72" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-brow { animation: brow 2s ease-in-out infinite; transform-origin: 40px 58px; }
      @keyframes brow { 0%,100% { transform: rotate(-10deg) translateY(4px); } 50% { transform: rotate(0deg) translateY(0); } }
    </style>
  </svg>`,

  'T-Bar Row': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <g class="anim-trow">
      <circle cx="40" cy="16" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="22" x2="40" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="26" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="54" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="40" x2="30" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="58" x2="24" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="40" x2="50" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="58" x2="56" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <ellipse cx="40" cy="76" rx="14" ry="4" fill="var(--gold)" opacity="0.15"/>
    </g>
    <style>
      .anim-trow { animation: brow 2.2s ease-in-out infinite; transform-origin: 40px 58px; }
    </style>
  </svg>`,

  'Cable / Machine Row': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="72" y1="5" x2="72" y2="80" stroke="var(--gold)" stroke-width="1.5" opacity="0.3"/>
    <g class="anim-crow">
      <circle cx="30" cy="20" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="26" x2="30" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="36" x2="16" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="36" x2="46" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="46" x2="20" y2="64" stroke="var(--gold)" stroke-width="2"/>
      <line x1="20" y1="64" x2="16" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="46" x2="40" y2="64" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="64" x2="44" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="46" y1="44" x2="72" y2="30" stroke="var(--a-col)" stroke-width="1.5" stroke-dasharray="3,3"/>
    </g>
    <style>
      .anim-crow { animation: crow 2s ease-in-out infinite; }
      @keyframes crow { 0%,100% { transform: translateX(6px); } 50% { transform: translateX(-4px); } }
    </style>
  </svg>`,

  'Seated Cable Row': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="72" y1="5" x2="72" y2="80" stroke="var(--gold)" stroke-width="1.5" opacity="0.3"/>
    <g class="anim-scrow">
      <circle cx="30" cy="20" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="26" x2="30" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="36" x2="16" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="36" x2="46" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="46" x2="20" y2="64" stroke="var(--gold)" stroke-width="2"/>
      <line x1="20" y1="64" x2="16" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="46" x2="40" y2="64" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="64" x2="44" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="46" y1="44" x2="72" y2="30" stroke="var(--a-col)" stroke-width="1.5" stroke-dasharray="3,3"/>
    </g>
    <style>
      .anim-scrow { animation: crow 2s ease-in-out infinite; }
    </style>
  </svg>`,

  'Lat Pulldown': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" x2="70" y1="12" y2="12" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
    <line x1="30" y1="12" x2="30" y2="28" stroke="var(--gold)" stroke-width="1.5"/>
    <line x1="50" y1="12" x2="50" y2="28" stroke="var(--gold)" stroke-width="1.5"/>
    <g class="anim-lat">
      <circle cx="40" cy="30" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="40" y2="52" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="42" x2="30" y2="52" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="52" x2="30" y2="28" stroke="var(--gold)" stroke-width="1.5"/>
      <line x1="40" y1="42" x2="50" y2="52" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="52" x2="50" y2="28" stroke="var(--gold)" stroke-width="1.5"/>
      <line x1="40" y1="52" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="52" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-lat { animation: latpull 2s ease-in-out infinite; transform-origin: 40px 12px; }
      @keyframes latpull { 0%,100% { transform: translateY(10px); } 50% { transform: translateY(0); } }
    </style>
  </svg>`,

  'Barbell Curl': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <g class="anim-curl">
      <circle cx="40" cy="18" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="24" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="28" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="28" y1="46" x2="28" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="52" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="52" y1="46" x2="52" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-curl { animation: curl 1.8s ease-in-out infinite; transform-origin: 40px 50px; }
      @keyframes curl { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }
    </style>
  </svg>`,

  'Hammer Curl': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <g class="anim-hcurl">
      <circle cx="40" cy="18" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="24" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="26" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="26" y1="44" x2="22" y2="36" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="54" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="54" y1="44" x2="58" y2="36" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-hcurl { animation: hcurl 1.8s ease-in-out infinite; }
      @keyframes hcurl { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-12deg); } }
    </style>
  </svg>`,

  'Incline DB Curl': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="20" x2="60" y2="65" stroke="var(--gold)" stroke-width="2" opacity="0.15"/>
    <g class="anim-icurl">
      <circle cx="36" cy="16" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="36" y1="22" x2="36" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="36" y1="32" x2="24" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="24" y1="40" x2="22" y2="32" stroke="var(--gold)" stroke-width="2"/>
      <line x1="36" y1="32" x2="48" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="48" y1="40" x2="50" y2="32" stroke="var(--gold)" stroke-width="2"/>
      <line x1="36" y1="42" x2="28" y2="56" stroke="var(--gold)" stroke-width="2"/>
      <line x1="36" y1="42" x2="44" y2="56" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-icurl { animation: curl 1.8s ease-in-out infinite; }
    </style>
  </svg>`,

  // ── PUSH ──────────────────────────────────────────────────────────────────────
  'Bench Press': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="68" width="60" height="6" rx="3" fill="var(--gold)" opacity="0.12"/>
    <g class="anim-bench">
      <circle cx="40" cy="28" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="34" x2="40" y2="52" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="42" x2="24" y2="52" stroke="var(--gold)" stroke-width="2"/>
      <line x1="24" y1="52" x2="20" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="42" x2="56" y2="52" stroke="var(--gold)" stroke-width="2"/>
      <line x1="56" y1="52" x2="60" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="52" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="52" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-bench { animation: bench 1.6s ease-in-out infinite; }
      @keyframes bench { 0%,100% { transform: translateY(6px); } 50% { transform: translateY(0); } }
    </style>
  </svg>`,

  'Close-grip Bench': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="68" width="60" height="6" rx="3" fill="var(--gold)" opacity="0.12"/>
    <g class="anim-cbench">
      <circle cx="40" cy="28" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="34" x2="40" y2="52" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="42" x2="30" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="50" x2="28" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="42" x2="50" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="50" x2="52" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="52" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="52" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-cbench { animation: bench 1.6s ease-in-out infinite; }
    </style>
  </svg>`,

  'Incline DB Press': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="10" x2="30" y2="70" stroke="var(--gold)" stroke-width="2" opacity="0.12"/>
    <g class="anim-idb">
      <circle cx="34" cy="22" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="34" y1="28" x2="34" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="34" y1="36" x2="20" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="20" y1="44" x2="16" y2="34" stroke="var(--gold)" stroke-width="2"/>
      <line x1="34" y1="36" x2="48" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="48" y1="44" x2="52" y2="34" stroke="var(--gold)" stroke-width="2"/>
      <line x1="34" y1="46" x2="26" y2="60" stroke="var(--gold)" stroke-width="2"/>
      <line x1="34" y1="46" x2="42" y2="60" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-idb { animation: bench 1.6s ease-in-out infinite; }
    </style>
  </svg>`,

  'Cable Fly / Pec Deck': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="30" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="36" x2="40" y2="58" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="58" x2="30" y2="74" stroke="var(--gold)" stroke-width="2"/>
    <line x1="30" y1="74" x2="24" y2="82" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="58" x2="50" y2="74" stroke="var(--gold)" stroke-width="2"/>
    <line x1="50" y1="74" x2="56" y2="82" stroke="var(--gold)" stroke-width="2"/>
    <g class="anim-fly">
      <line x1="40" y1="44" x2="20" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="60" y2="38" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-fly { animation: fly 1.8s ease-in-out infinite; transform-origin: 40px 44px; }
      @keyframes fly { 0%,100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
    </style>
  </svg>`,

  'Overhead Press': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <g class="anim-ohp">
      <circle cx="40" cy="22" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="28" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="28" y2="28" stroke="var(--gold)" stroke-width="2"/>
      <line x1="28" y1="28" x2="28" y2="18" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="52" y2="28" stroke="var(--gold)" stroke-width="2"/>
      <line x1="52" y1="28" x2="52" y2="18" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-ohp { animation: ohp 1.8s ease-in-out infinite; }
      @keyframes ohp { 0%,100% { transform: translateY(6px); } 50% { transform: translateY(-4px); } }
    </style>
  </svg>`,

  'DB Shoulder Press': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <g class="anim-dbohp">
      <circle cx="40" cy="22" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="28" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="26" y2="26" stroke="var(--gold)" stroke-width="2"/>
      <line x1="26" y1="26" x2="22" y2="16" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="54" y2="26" stroke="var(--gold)" stroke-width="2"/>
      <line x1="54" y1="26" x2="58" y2="16" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-dbohp { animation: ohp 1.8s ease-in-out infinite; }
    </style>
  </svg>`,

  'Tricep Pushdown': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="5" x2="20" y2="80" stroke="var(--gold)" stroke-width="1.5" opacity="0.3"/>
    <g class="anim-tricep">
      <circle cx="20" cy="18" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="20" y1="24" x2="20" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="20" y1="32" x2="10" y2="28" stroke="var(--gold)" stroke-width="2"/>
      <circle cx="10" cy="14" r="3" fill="var(--gold)" opacity="0.3"/>
      <line x1="20" y1="32" x2="30" y2="28" stroke="var(--gold)" stroke-width="2"/>
      <circle cx="30" cy="14" r="3" fill="var(--gold)" opacity="0.3"/>
      <line x1="20" y1="44" x2="20" y2="62" stroke="var(--gold)" stroke-width="2"/>
      <line x1="20" y1="62" x2="14" y2="76" stroke="var(--gold)" stroke-width="2"/>
      <line x1="20" y1="62" x2="26" y2="76" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-tricep { animation: tricep 1.6s ease-in-out infinite; }
      @keyframes tricep { 0%,100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
    </style>
  </svg>`,

  'Dips': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="30" width="70" height="6" rx="3" fill="var(--gold)" opacity="0.3"/>
    <line x1="5" y1="30" x2="5" y2="80" stroke="var(--gold)" stroke-width="2" opacity="0.4"/>
    <line x1="75" y1="30" x2="75" y2="80" stroke="var(--gold)" stroke-width="2" opacity="0.4"/>
    <g class="anim-dip">
      <circle cx="40" cy="20" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="26" x2="40" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="32" x2="24" y2="36" stroke="var(--gold)" stroke-width="2"/>
      <line x1="24" y1="36" x2="20" y2="30" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="32" x2="56" y2="36" stroke="var(--gold)" stroke-width="2"/>
      <line x1="56" y1="36" x2="60" y2="30" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="32" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="48" y2="58" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-dip { animation: dip 2s ease-in-out infinite; }
      @keyframes dip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
    </style>
  </svg>`,

  'Push-ups (weighted)': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="72" y2="72" stroke="#333" stroke-width="2"/>
    <g class="anim-wpushup">
      <circle cx="40" cy="36" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="42" x2="40" y2="56" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="48" x2="22" y2="56" stroke="var(--gold)" stroke-width="2"/>
      <line x1="22" y1="56" x2="22" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="48" x2="58" y2="56" stroke="var(--gold)" stroke-width="2"/>
      <line x1="58" y1="56" x2="58" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="56" x2="30" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="56" x2="50" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <rect x="34" y="26" width="12" height="6" rx="2" fill="var(--gold)" opacity="0.25"/>
    </g>
    <style>
      .anim-wpushup { animation: wpushup 1.8s ease-in-out infinite; transform-origin: 40px 72px; }
      @keyframes wpushup { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
    </style>
  </svg>`,

  // ── LEGS + CORE ────────────────────────────────────────────────────────────────
  'Squat': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-squat">
      <circle cx="40" cy="18" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="24" x2="40" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="34" x2="24" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="34" x2="56" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="46" x2="28" y2="66" stroke="var(--gold)" stroke-width="2"/>
      <line x1="28" y1="66" x2="22" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="46" x2="52" y2="66" stroke="var(--gold)" stroke-width="2"/>
      <line x1="52" y1="66" x2="58" y2="80" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-squat { animation: squat 2s ease-in-out infinite; transform-origin: 40px 80px; }
      @keyframes squat { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(10px) scaleY(0.85); } }
    </style>
  </svg>`,

  'Romanian Deadlift': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-rdl">
      <circle cx="40" cy="14" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="20" x2="40" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="28" x2="26" y2="36" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="28" x2="54" y2="36" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="40" x2="30" y2="60" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="60" x2="26" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="40" x2="50" y2="60" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="60" x2="54" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <rect x="24" y="64" width="32" height="6" rx="2" fill="var(--gold)" opacity="0.35"/>
    </g>
    <style>
      .anim-rdl { animation: rdl 2.5s ease-in-out infinite; transform-origin: 40px 80px; }
      @keyframes rdl { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(8px) scaleY(0.8) rotate(-5deg); } }
    </style>
  </svg>`,

  'Leg Press': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="62" y1="12" x2="62" y2="80" stroke="var(--gold)" stroke-width="3" opacity="0.35"/>
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-legpress">
      <circle cx="38" cy="20" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="38" y1="26" x2="38" y2="46" stroke="var(--gold)" stroke-width="2"/>
      <line x1="38" y1="34" x2="24" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="38" y1="34" x2="52" y2="42" stroke="var(--gold)" stroke-width="2"/>
      <line x1="38" y1="46" x2="50" y2="60" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="60" x2="54" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="38" y1="46" x2="26" y2="60" stroke="var(--gold)" stroke-width="2"/>
      <line x1="26" y1="60" x2="22" y2="80" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-legpress { animation: legpress 2s ease-in-out infinite; }
      @keyframes legpress { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    </style>
  </svg>`,

  'Leg Curl (Machine)': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="10" x2="5" y2="80" stroke="var(--gold)" stroke-width="2" opacity="0.25"/>
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-legcurl">
      <circle cx="16" cy="24" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="16" y1="30" x2="16" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="16" y1="50" x2="16" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="16" y1="68" x2="22" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="16" y1="68" x2="10" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <path d="M16 50 L40 50 L40 68" stroke="var(--gold)" stroke-width="2" fill="none"/>
    </g>
    <style>
      .anim-legcurl { animation: legcurl 1.8s ease-in-out infinite; transform-origin: 16px 50px; }
      @keyframes legcurl { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-25deg); } }
    </style>
  </svg>`,

  'Plank': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="72" y2="72" stroke="#333" stroke-width="2"/>
    <circle cx="18" cy="48" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <line x1="18" y1="54" x2="62" y2="54" stroke="var(--gold)" stroke-width="2"/>
    <line x1="18" y1="54" x2="14" y2="72" stroke="var(--gold)" stroke-width="2"/>
    <line x1="62" y1="54" x2="58" y2="72" stroke="var(--gold)" stroke-width="2"/>
    <line x1="62" y1="54" x2="66" y2="72" stroke="var(--gold)" stroke-width="2"/>
    <line x1="14" y1="54" x2="8" y2="72" stroke="var(--gold)" stroke-width="2"/>
    <style>
      .anim-plank { animation: plankshake 0.6s ease-in-out infinite alternate; transform-origin: 18px 54px; }
      @keyframes plankshake { from { transform: scaleY(1); } to { transform: scaleY(0.97); } }
    </style>
  </svg>`,

  'Hanging Knee Raise': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" x2="70" y1="5" y2="5" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
    <g class="anim-hkr">
      <line x1="40" y1="5" x2="40" y2="16" stroke="var(--gold)" stroke-width="2"/>
      <circle cx="40" cy="24" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="38" x2="28" y2="48" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="38" x2="52" y2="48" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="30" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="50" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="30" y1="58" x2="28" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="50" y1="58" x2="52" y2="50" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-hkr { animation: hkr 2s ease-in-out infinite; transform-origin: 40px 5px; }
      @keyframes hkr { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
    </style>
  </svg>`,

  'Ab Wheel / Crunches': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="72" y2="72" stroke="#333" stroke-width="2"/>
    <g class="anim-ab">
      <circle cx="40" cy="36" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="42" x2="40" y2="54" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="48" x2="24" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="24" y1="44" x2="20" y2="56" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="48" x2="56" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="56" y1="44" x2="60" y2="56" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="54" x2="30" y2="72" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="54" x2="50" y2="72" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-ab { animation: ab 2s ease-in-out infinite; transform-origin: 40px 72px; }
      @keyframes ab { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
    </style>
  </svg>`,

  // ── SHOULDERS ──────────────────────────────────────────────────────────────────
  'Lateral Raise': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <circle cx="40" cy="22" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="28" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="50" x2="30" y2="68" stroke="var(--gold)" stroke-width="2"/>
    <line x1="30" y1="68" x2="24" y2="80" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="50" x2="50" y2="68" stroke="var(--gold)" stroke-width="2"/>
    <line x1="50" y1="68" x2="56" y2="80" stroke="var(--gold)" stroke-width="2"/>
    <g class="anim-latraise">
      <line x1="40" y1="36" x2="16" y2="22" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="64" y2="22" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-latraise { animation: latraise 1.6s ease-in-out infinite; transform-origin: 40px 36px; }
      @keyframes latraise { 0%,100% { transform: rotate(-30deg); } 50% { transform: rotate(30deg); } }
    </style>
  </svg>`,

  'Front Raise': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <circle cx="40" cy="22" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="28" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="50" x2="30" y2="68" stroke="var(--gold)" stroke-width="2"/>
    <line x1="30" y1="68" x2="24" y2="80" stroke="var(--gold)" stroke-width="2"/>
    <line x1="40" y1="50" x2="50" y2="68" stroke="var(--gold)" stroke-width="2"/>
    <line x1="50" y1="68" x2="56" y2="80" stroke="var(--gold)" stroke-width="2"/>
    <g class="anim-frontraise">
      <line x1="40" y1="36" x2="40" y2="10" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="68" y2="14" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-frontraise { animation: frontraise 1.6s ease-in-out infinite; }
      @keyframes frontraise { 0%,100% { transform: translateY(4px); } 50% { transform: translateY(-4px); } }
    </style>
  </svg>`,

  'Face Pull': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" x2="10" y1="38" y2="38" stroke="var(--gold)" stroke-width="2"/>
    <circle cx="28" cy="30" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <line x1="28" y1="36" x2="28" y2="58" stroke="var(--gold)" stroke-width="2"/>
    <line x1="28" y1="46" x2="16" y2="54" stroke="var(--gold)" stroke-width="2"/>
    <line x1="28" y1="58" x2="20" y2="74" stroke="var(--gold)" stroke-width="2"/>
    <line x1="28" y1="58" x2="36" y2="74" stroke="var(--gold)" stroke-width="2"/>
    <g class="anim-facepull">
      <line x1="28" y1="46" x2="42" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <path d="M42 38 Q55 38 65 38" stroke="var(--a-col)" stroke-width="2" fill="none" stroke-dasharray="4,3"/>
    </g>
    <style>
      .anim-facepull { animation: facepull 1.8s ease-in-out infinite; transform-origin: 28px 46px; }
      @keyframes facepull { 0%,100% { transform: translateX(8px); } 50% { transform: translateX(0px); } }
    </style>
  </svg>`,

  'Rear Delt Fly': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="22" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <line x1="36" y1="28" x2="36" y2="46" stroke="var(--gold)" stroke-width="2"/>
    <line x1="36" y1="46" x2="26" y2="62" stroke="var(--gold)" stroke-width="2"/>
    <line x1="26" y1="62" x2="20" y2="76" stroke="var(--gold)" stroke-width="2"/>
    <line x1="36" y1="46" x2="46" y2="62" stroke="var(--gold)" stroke-width="2"/>
    <line x1="46" y1="62" x2="52" y2="76" stroke="var(--gold)" stroke-width="2"/>
    <g class="anim-reardelt">
      <line x1="36" y1="34" x2="18" y2="24" stroke="var(--gold)" stroke-width="2"/>
      <line x1="36" y1="34" x2="54" y2="24" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-reardelt { animation: reardelt 1.8s ease-in-out infinite; transform-origin: 36px 34px; }
      @keyframes reardelt { 0%,100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
    </style>
  </svg>`,

  'Arnold Press': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <g class="anim-arnold">
      <circle cx="40" cy="22" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="28" x2="40" y2="50" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="26" y2="26" stroke="var(--gold)" stroke-width="2"/>
      <line x1="26" y1="26" x2="20" y2="16" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="36" x2="54" y2="26" stroke="var(--gold)" stroke-width="2"/>
      <line x1="54" y1="26" x2="60" y2="16" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="32" y2="68" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="50" x2="48" y2="68" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-arnold { animation: arnold 2s ease-in-out infinite; }
      @keyframes arnold {
        0%,100% { transform: translateY(4px) scaleX(1); }
        50% { transform: translateY(-4px) scaleX(0.9); }
      }
    </style>
  </svg>`,

  // ── CARDIO ──────────────────────────────────────────────────────────────────────
  'Treadmill Run': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-run">
      <circle cx="40" cy="16" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="22" x2="40" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="24" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="56" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="28" y2="62" stroke="var(--gold)" stroke-width="2"/>
      <line x1="28" y1="62" x2="22" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="52" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="52" y1="58" x2="50" y2="44" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-run { animation: jog 0.6s ease-in-out infinite alternate; }
      @keyframes jog { from { transform: translateY(0) rotate(-2deg); } to { transform: translateY(-8px) rotate(2deg); } }
    </style>
  </svg>`,

  'Treadmill Intervals': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-sprint">
      <circle cx="40" cy="16" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="22" x2="40" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="24" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="30" x2="56" y2="38" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="28" y2="62" stroke="var(--gold)" stroke-width="2"/>
      <line x1="28" y1="62" x2="22" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="52" y2="58" stroke="var(--gold)" stroke-width="2"/>
      <line x1="52" y1="58" x2="50" y2="44" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-sprint { animation: sprint 0.4s ease-in-out infinite alternate; }
      @keyframes sprint { from { transform: translateY(0) rotate(-3deg); } to { transform: translateY(-12px) rotate(3deg); } }
    </style>
  </svg>`,

  'Cool Down Walk': `
  <svg class="ex-anim" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="80" y1="80" y2="80" stroke="#333" stroke-width="2"/>
    <g class="anim-walk">
      <circle cx="40" cy="16" r="6" fill="none" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="22" x2="40" y2="44" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="32" x2="26" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="32" x2="54" y2="40" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="28" y2="62" stroke="var(--gold)" stroke-width="2"/>
      <line x1="28" y1="62" x2="24" y2="80" stroke="var(--gold)" stroke-width="2"/>
      <line x1="40" y1="44" x2="52" y2="60" stroke="var(--gold)" stroke-width="2"/>
      <line x1="52" y1="60" x2="56" y2="80" stroke="var(--gold)" stroke-width="2"/>
    </g>
    <style>
      .anim-walk { animation: walk 1.6s ease-in-out infinite alternate; }
      @keyframes walk { from { transform: translateY(0); } to { transform: translateY(-4px); } }
    </style>
  </svg>`,
};

// ── INJECT ANIMATIONS ──────────────────────────────────────────────────────────
// Finds every exercise row and replaces the emoji with the matching SVG animation.
// Call after renderAll() or after a single row is re-rendered.

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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(injectExerciseAnimations, 300);
});

window.injectExerciseAnimations = injectExerciseAnimations;
