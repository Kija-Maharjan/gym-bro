// ─── DATA.JS — Exercise Configuration ────────────────────────────────────────
//
// HOW TO EDIT:
// - Each day has an id, weekday, type, name, focus, tip
// - isRest: true  → shows rehab activities instead of exercises
// - isRest: false → shows exercise rows with checkboxes
//
// EXERCISE LEVELS:
// Each exercise has 3 levels. The app auto-unlocks the next level
// when you tick the exercise for 3 consecutive weeks.
//   level 0 = L1 (starting point)
//   level 1 = L2 (unlocked after 3 weeks)
//   level 2 = L3 (unlocked after 3 more weeks)
//
// type:
//   'ab' = different reps for A and B
//   's'  = same reps for both (Shared)
//
// ─────────────────────────────────────────────────────────────────────────────

const DAYS = [
  // ─────────────────────────────────────────────
  //  SUNDAY — FULL BODY CONDITIONING
  // ─────────────────────────────────────────────
  {
    id: 'sun',
    weekday: 'Sunday',
    type: 'Full Body Conditioning',
    isRest: false,
    name: 'Full Body Flow',
    focus: 'Endurance · Control · Mental Toughness',
    tip: 'Mindset day. AMRAP is not a race — stay composed when it burns. B: swap pull-ups for Australian rows. A: keep moving even if pace slows.',
    exercises: [
      {
        name: 'Jump rope / jog warm-up',
        note: '3 min easy — heart rate up, nothing more',
        type: 's',
        levels: [
          { a: '3 min jog',               b: '3 min low-impact jog',        label: 'L1 — Easy'    },
          { a: '4 min + 20 jumping jacks', b: '4 min + 20 jacks',           label: 'L2 — Active'  },
          { a: '5 min + 10 burpees',       b: '5 min + 10 step burpees',    label: 'L3 — Intense' },
        ],
      },
      {
        name: 'Push + squat superset',
        note: '10 push-ups then 10 squats immediately = 1 round',
        type: 'ab',
        levels: [
          { a: '3 rounds — 60s rest',     b: '3 rounds — 50s rest',         label: 'L1 — Base'         },
          { a: '3 rounds — 45s rest',     b: '3 rounds — 40s rest',         label: 'L2 — Shorter rest' },
          { a: '4 rounds — 30s rest',     b: '4 rounds — 25s rest',         label: 'L3 — Density'      },
        ],
      },
      {
        name: 'Row + lunge superset',
        note: '8 rows then 8 lunges/side = 1 round',
        type: 'ab',
        levels: [
          { a: '3 rounds',                b: '3 rounds',                    label: 'L1 — Volume' },
          { a: '3 rounds faster',         b: '3 rounds faster',             label: 'L2 — Pace'   },
          { a: '4 rounds max pace',       b: '4 rounds max pace',           label: 'L3 — HIIT'   },
        ],
      },
      {
        name: 'Burpees (modified for B)',
        note: 'B: step back to protect shoulder — still brutal',
        type: 'ab',
        levels: [
          { a: '3×5 full',                b: '3×6 step-back',               label: 'L1 — Start'    },
          { a: '3×8 full',                b: '3×10 step-back',              label: 'L2 — More'     },
          { a: '3×10 + clap',             b: '3×12 step-back fast',         label: 'L3 — Explosive'},
        ],
      },
      {
        name: 'AMRAP finisher (8 min)',
        note: 'A: 5 push + 10 squat + 15s plank / B: 8 rows + 10 squat + 15s hollow',
        type: 'ab',
        levels: [
          { a: '8 min — track rounds',    b: '8 min — track rounds',        label: 'L1 — Establish' },
          { a: '9 min — beat last score', b: '9 min — beat last score',     label: 'L2 — Progress'  },
          { a: '10 min — beat best',      b: '10 min — beat best',          label: 'L3 — Peak'      },
        ],
      },
      {
        name: 'Cool-down stretch',
        note: "Child's pose, pigeon, chest opener — 40 sec each",
        type: 's',
        levels: [
          { a: '5 min',                   b: '5 min',                       label: 'L1 — Basic'    },
          { a: '8 min + hip flexors',     b: '8 min + pendulum swings',     label: 'L2 — Full'     },
          { a: '10 min full protocol',    b: '10 min + shoulder rehab',     label: 'L3 — Recovery' },
        ],
      },
    ],
  },
];
  // ─────────────────────────────────────────────
  //  MONDAY — PUSH DAY
  // ─────────────────────────────────────────────
  {
    id: 'mon',
    weekday: 'Monday',
    type: 'Push Day',
    isRest: false,
    name: 'Push Strength',
    focus: 'Chest · Triceps · Safe Press',
    tip: 'B: NO overhead yet. A: elbows at 45°, not flared. B coaches A\'s form first set.',
    exercises: [
      {
        name: 'Wrist circles + arm swings',
        note: '30 sec each direction — never skip warm-up',
        type: 's',
        levels: [
          { a: '2 min easy',               b: '2 min easy',               label: 'L1 — Warm-up'  },
          { a: '3 min + band pull-aparts',  b: '3 min + band pull-aparts', label: 'L2 — Extended' },
          { a: '4 min full mobility circuit',b: '4 min full mobility circuit', label: 'L3 — Full prep' },
        ],
      },
      {
        name: 'Incline push-ups',
        note: 'Hands on bar/bench — safer shoulder angle',
        type: 'ab',
        levels: [
          { a: '3×8 slow',             b: '3×10 tempo',       label: 'L1 — Foundation' },
          { a: '3×12 controlled',      b: '3×15 paused',      label: 'L2 — Volume'     },
          { a: '4×12 + 3s hold',       b: '4×15 weighted vest',label: 'L3 — Strength'  },
        ],
      },
      {
        name: 'Knee push-ups → Full push-ups',
        note: 'A: move to full when 3×15 feels easy',
        type: 'ab',
        levels: [
          { a: '3×8 knee push-ups',           b: '3×10 full push-ups',   label: 'L1 — Base'     },
          { a: '3×12 full push-ups',           b: '3×12 diamond push-ups',label: 'L2 — Progress' },
          { a: '3×15 full + 3×5 archer PU',    b: '3×10 weighted push-ups',label: 'L3 — Advanced'},
        ],
      },
      {
        name: 'Tricep dips',
        note: 'B: shoulders depressed, NO dipping past 90°',
        type: 'ab',
        levels: [
          { a: '3×6 feet on floor assisted',       b: '3×8 bodyweight',            label: 'L1 — Safe start' },
          { a: '3×8 straight legs',                b: '3×12 bodyweight',           label: 'L2 — Build'      },
          { a: '3×10 with pause at bottom',        b: '3×8 weighted (dumbbell)',    label: 'L3 — Load'       },
        ],
      },
      {
        name: 'Plank hold',
        note: 'Head to heel straight — no sagging hips',
        type: 's',
        levels: [
          { a: '3×20 sec',                  b: '3×30 sec',              label: 'L1 — Starter'   },
          { a: '3×35 sec',                  b: '3×45 sec',              label: 'L2 — Endurance' },
          { a: '3×60 sec + shoulder taps',  b: '3×60 sec + leg lifts',  label: 'L3 — Challenge' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  TUESDAY — REST + REHAB
  // ─────────────────────────────────────────────
  {
    id: 'tue',
    weekday: 'Tuesday',
    type: 'Rest + Rehab',
    isRest: true,
    name: 'Rest Day',
    focus: 'Recovery · Shoulder Rehab · Breathwork',
    tip: 'This rest day is ACTIVE — not lying on the couch. B: this is your most important shoulder rehab day. A: hip flexors and thoracic work today.',
    restActivities: [
      { icon: '🫁', name: 'Diaphragmatic breathing',      note: '4 sec in, 6 sec out — 5 min'           },
      { icon: '🐱', name: 'Cat-cow + thoracic rotation',  note: '2×10 each, slow and controlled'         },
      { icon: '🦵', name: 'Hip flexor stretch (couch)',   note: '2×40 sec per side'                      },
      { icon: '🎗️', name: 'Band pull-aparts (B MUST DO)', note: '3×15 light band — rotator cuff rehab'   },
      { icon: '💆', name: 'Foam rolling',                 note: 'Lats, upper back, quads — 30 sec each'  },
      { icon: '🏊', name: 'Optional: light swim or walk', note: '20–30 min easy pace only'               },
    ],
  },

  // ─────────────────────────────────────────────
  //  WEDNESDAY — PULL DAY
  // ─────────────────────────────────────────────
  {
    id: 'wed',
    weekday: 'Wednesday',
    type: 'Pull Day',
    isRest: false,
    name: 'Pull Strength',
    focus: 'Back · Biceps · Scapular Health',
    tip: 'B: scapular pulls rehabilitate the shoulder directly — do not rush them. A: dead hang before every set, feel your lats engaging.',
    exercises: [
      {
        name: 'Dead hang',
        note: 'Passive hang — let shoulders decompress',
        type: 's',
        levels: [
          { a: '3×15 sec',              b: '3×20 sec',             label: 'L1 — Passive' },
          { a: '3×25 sec',              b: '3×30 sec',             label: 'L2 — Build'   },
          { a: '3×40 sec + active shrug',b: '3×45 sec + active',   label: 'L3 — Active'  },
        ],
      },
      {
        name: 'Scapular pulls',
        note: 'Arms straight — shrug blades DOWN then release',
        type: 's',
        levels: [
          { a: '3×8',                      b: '3×10 with 2s hold',   label: 'L1 — Learn it' },
          { a: '3×12',                     b: '3×12 with 3s hold',   label: 'L2 — Control'  },
          { a: '3×15 + leg raise at top',  b: '3×15 + tuck hold',    label: 'L3 — Strength' },
        ],
      },
      {
        name: 'Australian rows',
        note: 'Feet on floor, body at angle — pull chest to bar',
        type: 'ab',
        levels: [
          { a: '3×8 bent knees',           b: '3×10 straight body',  label: 'L1 — Angle easy' },
          { a: '3×10 straight body',       b: '3×12 feet elevated',  label: 'L2 — Progress'   },
          { a: '3×12 elevated + pause',    b: '3×10 weighted vest',  label: 'L3 — Heavy'      },
        ],
      },
      {
        name: 'Negative pull-ups',
        note: 'Jump up, lower in 4–5 sec — control everything',
        type: 'ab',
        levels: [
          { a: '3×3 — 4 sec lower',           b: '3×5 — 5 sec lower',         label: 'L1 — Slow neg'     },
          { a: '3×5 — 5 sec lower',           b: '3×6 — 6 sec + scap pull',   label: 'L2 — Longer'       },
          { a: '3×5 + 1 full pull-up attempt',b: '3×8 + 2 full pull-ups',     label: 'L3 — Unlock PU'    },
        ],
      },
      {
        name: 'Band-assisted pull-ups',
        note: 'Knee in loop band for support',
        type: 'ab',
        levels: [
          { a: '3×5 heavy band',              b: '3×6 medium band',           label: 'L1 — Assisted'   },
          { a: '3×6 medium band',             b: '3×8 light band',            label: 'L2 — Less assist'},
          { a: '3×5 light band + 1 free',     b: '3×5 unassisted pull-ups',   label: 'L3 — Free'       },
        ],
      },
      {
        name: 'Face pulls (band)',
        note: 'B: crucial — external rotation protects rotator cuff',
        type: 's',
        levels: [
          { a: '3×12',                    b: '3×15 with 1s hold', label: 'L1 — Base'      },
          { a: '3×15',                    b: '3×18 with 2s hold', label: 'L2 — Volume'    },
          { a: '3×20 + rotation at end',  b: '3×20 + rotation',   label: 'L3 — Full rehab'},
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  THURSDAY — CORE & SKILL
  // ─────────────────────────────────────────────
  {
    id: 'thu',
    weekday: 'Thursday',
    type: 'Core & Skill Day',
    isRest: false,
    name: 'Core + Skill',
    focus: 'Abs · Stability · Body Control',
    tip: 'Skill work equalizes both athletes. B: no ab wheel (shoulder). A: focus on pattern not reps.',
    exercises: [
      {
        name: 'Dead bug',
        note: 'Lower back FLAT the entire time — non-negotiable',
        type: 's',
        levels: [
          { a: '3×6/side — arms only',       b: '3×8/side — arms + legs',   label: 'L1 — Basics'         },
          { a: '3×8/side — arms + legs',     b: '3×10/side — slow tempo',   label: 'L2 — Full'           },
          { a: '3×10/side + 3s hold',        b: '3×10/side + hold + resist',label: 'L3 — Anti-rotation'  },
        ],
      },
      {
        name: 'Hollow body hold',
        note: 'Arms overhead = harder. By sides = easier start.',
        type: 'ab',
        levels: [
          { a: '3×15 sec arms by sides',    b: '3×25 sec arms overhead',   label: 'L1 — Learn shape' },
          { a: '3×25 sec arms overhead',    b: '3×35 sec + small rocks',   label: 'L2 — Endure'      },
          { a: '3×40 sec + rocking',        b: '3×50 sec weighted',        label: 'L3 — Gymnast'     },
        ],
      },
      {
        name: 'Side plank',
        note: 'B: forearm version — no full hand to avoid shoulder',
        type: 'ab',
        levels: [
          { a: '3×15 sec/side knees bent',  b: '3×20 sec/side forearm',    label: 'L1 — Modified' },
          { a: '3×25 sec/side full',        b: '3×35 sec/side forearm',    label: 'L2 — Build'    },
          { a: '3×35 sec + hip dips',       b: '3×40 sec + hip dips',      label: 'L3 — Dynamic'  },
        ],
      },
      {
        name: 'Tuck L-sit',
        note: 'Press floor away, lift hips, tuck knees — hold',
        type: 'ab',
        levels: [
          { a: '3×6 sec tuck',              b: '3×10 sec tuck',             label: 'L1 — Hold it'     },
          { a: '3×10 sec tuck',             b: '3×15 sec or one-leg',       label: 'L2 — Time'        },
          { a: '3×8 sec one leg extended',  b: '3×12 sec half L',           label: 'L3 — Progress to L'},
        ],
      },
      {
        name: 'Wall sit',
        note: 'Legs only — both athletes push hard here',
        type: 's',
        levels: [
          { a: '3×30 sec',                  b: '3×40 sec',                  label: 'L1 — Base'      },
          { a: '3×45 sec',                  b: '3×60 sec',                  label: 'L2 — Endurance' },
          { a: '3×60 sec + calf raise holds',b: '3×75 sec + calf raises',   label: 'L3 — Strength'  },
        ],
      },
      {
        name: 'Superman hold',
        note: 'Face down — lift chest AND legs. Safe for B shoulder.',
        type: 's',
        levels: [
          { a: '3×20 sec',                  b: '3×30 sec',                  label: 'L1 — Hold'    },
          { a: '3×30 sec',                  b: '3×40 sec',                  label: 'L2 — Longer'  },
          { a: '3×40 sec + alt arm/leg',    b: '3×50 sec + alt',            label: 'L3 — Dynamic' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  FRIDAY — REST + REHAB
  // ─────────────────────────────────────────────
  {
    id: 'fri',
    weekday: 'Friday',
    type: 'Rest + Rehab',
    isRest: true,
    name: 'Rest Day',
    focus: 'Recovery · Flexibility · Mental Reset',
    tip: 'Second rest day of the week. No training. Focus on sleep tonight — that\'s when muscle actually grows.',
    restActivities: [
      { icon: '🧘', name: 'Full body stretch — 15 min',    note: 'Hip flexors, hamstrings, chest opener, lats' },
      { icon: '🎗️', name: 'Band pull-aparts (B MUST DO)',  note: '3×15 — do this even if nothing else'        },
      { icon: '🦶', name: 'Ankle + wrist mobility',        note: 'Circles, flexion, 2 min each joint'         },
      { icon: '🛁', name: 'Contrast shower / cold water',  note: 'Hot 2 min → cold 30 sec — 3 rounds'         },
      { icon: '😴', name: 'Target 8h+ sleep tonight',      note: 'Pre-training day — Saturday is Leg Day'     },
      { icon: '🥗', name: 'Nutrition check',               note: 'A: ~156g protein. B: ~240g protein.'        },
    ],
  },

  // ─────────────────────────────────────────────
  //  SATURDAY — LEG DAY
  // ─────────────────────────────────────────────
  {
    id: 'sat',
    weekday: 'Saturday',
    type: 'Leg Day',
    isRest: false,
    name: 'Legs + Hinge',
    focus: 'Glutes · Hamstrings · Quads · Power',
    tip: 'B can push HARD here — zero shoulder risk. Nordic curls: one holds feet, one does reps. Switch after each set.',
    exercises: [
      {
        name: 'Bodyweight squat',
        note: 'Full depth, heels flat, chest up — film your form',
        type: 's',
        levels: [
          { a: '3×10',                       b: '3×15',                     label: 'L1 — Base'    },
          { a: '3×15',                       b: '3×20 or pause squat',      label: 'L2 — Volume'  },
          { a: '3×20 or 3×10 jump squats',   b: '3×15 pause + 3×5 jump',   label: 'L3 — Power'   },
        ],
      },
      {
        name: 'Glute bridge',
        note: 'Drive through heels — full squeeze and hold at top',
        type: 's',
        levels: [
          { a: '3×12',                       b: '3×20',                     label: 'L1 — Foundation' },
          { a: '3×15 + 2s hold',             b: '3×15 single-leg',          label: 'L2 — Progress'   },
          { a: '3×12 single-leg',            b: '3×15 single-leg + band',   label: 'L3 — Unilateral' },
        ],
      },
      {
        name: 'Reverse lunges',
        note: 'Step BACK — easier on knees. Back knee 2cm off floor.',
        type: 'ab',
        levels: [
          { a: '3×6/side',                   b: '3×10/side',                label: 'L1 — Learn it' },
          { a: '3×10/side',                  b: '3×12/side',                label: 'L2 — Volume'   },
          { a: '3×12/side + front raise',    b: '3×10/side weighted',       label: 'L3 — Loaded'   },
        ],
      },
      {
        name: 'Box step-ups',
        note: 'Slow controlled up AND down — don\'t just drop',
        type: 'ab',
        levels: [
          { a: '3×8/side low box',           b: '3×10/side medium box',     label: 'L1 — Low'    },
          { a: '3×10/side medium box',       b: '3×12/side high box',       label: 'L2 — Height' },
          { a: '3×12/side high box',         b: '3×10/side high + weight',  label: 'L3 — Load'   },
        ],
      },
      {
        name: 'Nordic hamstring curl negatives',
        note: 'Partner holds feet — lean forward SLOWLY, 3 sec',
        type: 'ab',
        levels: [
          { a: '3×3 — 3 sec lower',          b: '3×4 — 3 sec lower',        label: 'L1 — Build tendon' },
          { a: '3×4 — 4 sec lower',          b: '3×6 — 4 sec lower',        label: 'L2 — Eccentric'    },
          { a: '3×5 + 1 full attempt',        b: '3×8 + 2 full',             label: 'L3 — Full Nordic'  },
        ],
      },
      {
        name: 'Calf raises single leg',
        note: 'Off step edge — full range up AND down',
        type: 's',
        levels: [
          { a: '3×10/side',                  b: '3×15/side',                label: 'L1 — Base'    },
          { a: '3×15/side',                  b: '3×20/side',                label: 'L2 — Volume'  },
          { a: '3×20/side slow + pause',     b: '3×20/side weighted',       label: 'L3 — Loaded'  },
        ],
      },
    ],
  },

