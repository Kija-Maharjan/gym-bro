// ─── DATA.JS — Exercise Configuration ────────────────────────────────────────
//
// HOW TO EDIT:
// - Each day has an id, weekday, type, name, focus, tip
// - isRest: true  → shows rehab activities instead of exercises
// - isRest: false → shows exercise rows with checkboxes
// - Each exercise has: name, note, type, image (emoji), formGuide, levels
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
  //  SUNDAY — PULL (BACK + BICEPS)
  // ─────────────────────────────────────────────
  {
    id: 'sun',
    weekday: 'Sunday',
    type: 'Pull (Back + Biceps)',
    isRest: false,
    name: 'Pull Day',
    focus: 'Back · Biceps · Deadlift',
    tip: 'Start with deadlifts while your form is fresh. Record your sets and review — bracing is everything. Control the negative on every rep.',
    exercises: [
      {
        name: 'Deadlift',
        note: '4×5 @ 90–100kg — fix form first',
        type: 's',
        image: '🏋️',
        formGuide: 'Stand with bar over midfoot, about 1" from shins. Hinge at hips, grip just outside knees. Chest up, brace your core hard. Push the floor away — don\'t pull with your arms. At lockout, squeeze glutes without hyperextending. Lower controlled, bar stays in contact with legs.',
        levels: [
          { a: '4×5 @ 80kg',           b: '4×5 @ 80kg',           label: 'L1 — Form Focus'  },
          { a: '4×5 @ 90kg',           b: '4×5 @ 90kg',           label: 'L2 — Build'       },
          { a: '4×5 @ 100kg',          b: '4×5 @ 100kg',          label: 'L3 — Target'      },
        ],
      },
      {
        name: 'Pull-ups',
        note: '4×max — strict, no kipping',
        type: 's',
        image: '⬆️',
        formGuide: 'Dead hang start — no swinging. Pull your chest to the bar, not your chin. Drive elbows down and back. Lower under control to full hang. If you can\'t get 3+ strict, swap to 4×max negatives (5 sec lower).',
        levels: [
          { a: '4×max strict',         b: '4×max negatives',      label: 'L1 — Strict/Neg'  },
          { a: '4×max+2',              b: '4×max strict',         label: 'L2 — Progress'    },
          { a: '4×max + 5kg',          b: '4×max+2 strict',       label: 'L3 — Weighted'    },
        ],
      },
      {
        name: 'Barbell Row',
        note: '3×8 — 45° hinge, pull to lower ribs',
        type: 's',
        image: '🚣',
        formGuide: 'Hinge at hips until torso is ~45° to floor. Bar hangs at knee height. Pull bar to your lower ribcage, squeeze lats for 1 sec. Lower controlled. Keep neck neutral — don\'t look up. Brace your core to prevent rounding.',
        levels: [
          { a: '3×8 @ 50kg',           b: '3×8 @ 50kg',           label: 'L1 — Moderate'    },
          { a: '3×8 @ 60kg',           b: '3×8 @ 60kg',           label: 'L2 — Heavier'     },
          { a: '3×8 @ 70kg',           b: '3×8 @ 70kg',           label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Cable / Machine Row',
        note: '3×10 — squeeze at peak contraction',
        type: 's',
        image: '🏗️',
        formGuide: 'Use V-grip or straight bar. Sit tall, slight lean forward. Pull handle to your stomach, not chest. Retract scapula fully at the peak. Don\'t use body momentum — controlled tempo: 2 sec pull, 3 sec release.',
        levels: [
          { a: '3×10 moderate',        b: '3×10 moderate',        label: 'L1 — Control'     },
          { a: '3×10 heavier',         b: '3×10 heavier',         label: 'L2 — Load'        },
          { a: '3×10 heavy + pause',   b: '3×10 heavy + pause',   label: 'L3 — Peak Squeeze' },
        ],
      },
      {
        name: 'Barbell Curl',
        note: '3×10 — elbows pinned to sides',
        type: 's',
        image: '💪',
        formGuide: 'Stand tall, elbows pinned to ribs. Curl bar up in a wide arc — don\'t swing. Squeeze biceps at the top. Lower slowly over 3 seconds. Only move your forearms; your body stays still.',
        levels: [
          { a: '3×10 @ 25kg',          b: '3×10 @ 25kg',          label: 'L1 — Light'       },
          { a: '3×10 @ 30kg',          b: '3×10 @ 30kg',          label: 'L2 — Moderate'    },
          { a: '3×10 @ 35kg',          b: '3×10 @ 35kg',          label: 'L3 — Heavy'       },
        ],
      },
      {
        name: 'Hammer Curl',
        note: '2×12 — neutral grip, supinate slightly at top',
        type: 's',
        image: '🔨',
        formGuide: 'Hold dumbbells neutral (palms facing each other). Keep elbows fixed at sides. Curl up, slightly rotate palms outward at top. Lower with control. This targets brachialis for arm thickness.',
        levels: [
          { a: '2×12 @ 12kg',          b: '2×12 @ 12kg',          label: 'L1 — Light'       },
          { a: '2×12 @ 16kg',          b: '2×12 @ 16kg',          label: 'L2 — Moderate'    },
          { a: '2×12 @ 20kg',          b: '2×12 @ 20kg',          label: 'L3 — Heavy'       },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  MONDAY — PUSH (CHEST + TRICEPS)
  // ─────────────────────────────────────────────
  {
    id: 'mon',
    weekday: 'Monday',
    type: 'Push (Chest + Triceps)',
    isRest: false,
    name: 'Push Day',
    focus: 'Chest · Triceps · Pressing',
    tip: 'Bench is the main lift — save energy for it. Keep elbows at ~75° (not flared) to protect shoulders. Full range of motion on every rep.',
    exercises: [
      {
        name: 'Bench Press',
        note: '4×6 — touch lower sternum, not chest',
        type: 's',
        image: '🏋️',
        formGuide: 'Lie back, retract and depress scapula (pinch them together). Grip bar with wrists stacked over elbows. Unrack with control, lower to lower sternum. Touch and press explosively. Keep elbows at ~75°, not flared. Legs drive you into the bench.',
        levels: [
          { a: '4×6 @ 60kg',           b: '4×6 @ 60kg',           label: 'L1 — Build'       },
          { a: '4×6 @ 70kg',           b: '4×6 @ 70kg',           label: 'L2 — Progress'    },
          { a: '4×6 @ 80kg',           b: '4×6 @ 80kg',           label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Incline DB Press',
        note: '3×8 — 30° incline, don\'t over-arch',
        type: 's',
        image: '📐',
        formGuide: 'Set bench to 30° (not 45° — that\'s too much shoulder). Drive dumbbells up and together slightly at top. Lower with elbows at 75°. Keep your back flat against the bench. This targets upper chest.',
        levels: [
          { a: '3×8 @ 18kg',           b: '3×8 @ 18kg',           label: 'L1 — Light'       },
          { a: '3×8 @ 22kg',           b: '3×8 @ 22kg',           label: 'L2 — Moderate'    },
          { a: '3×8 @ 26kg',           b: '3×8 @ 26kg',           label: 'L3 — Heavy'       },
        ],
      },
      {
        name: 'Cable Fly / Pec Deck',
        note: '3×12 — squeeze for 2 sec at peak',
        type: 's',
        image: '🦅',
        formGuide: 'Stand between cables, arms wide, slight forward lean. Bring hands together in a wide arc in front of chest. Squeeze for 2 seconds at the peak. Return slowly — don\'t let the weight stack slam. Constant tension throughout.',
        levels: [
          { a: '3×12 light',           b: '3×12 light',           label: 'L1 — Feel'        },
          { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L2 — Control'     },
          { a: '3×12 heavy squeeze',   b: '3×12 heavy squeeze',   label: 'L3 — Burn'        },
        ],
      },
      {
        name: 'Overhead Press',
        note: '3×8 — standing, core braced',
        type: 's',
        image: '☀️',
        formGuide: 'Stand with feet hip-width, bar at front rack position. Grip slightly wider than shoulders. Press bar directly overhead — don\'t push it forward. Face the bar as it passes your nose. Squeeze glutes and brace core throughout. Keep ribs down.',
        levels: [
          { a: '3×8 @ 35kg',           b: '3×8 @ 35kg',           label: 'L1 — Light'       },
          { a: '3×8 @ 40kg',           b: '3×8 @ 40kg',           label: 'L2 — Moderate'    },
          { a: '3×8 @ 45kg',           b: '3×8 @ 45kg',           label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Tricep Pushdown',
        note: '3×12 — rope or bar, full extension',
        type: 's',
        image: '⬇️',
        formGuide: 'Attach rope or straight bar to high pulley. Elbows pinned to ribs, slightly lean forward. Push down until arms are fully extended. Squeeze triceps for 1 sec. Only your forearms move — upper body stays still.',
        levels: [
          { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L1 — Control'     },
          { a: '3×12 heavier',         b: '3×12 heavier',         label: 'L2 — Load'        },
          { a: '3×12 heavy + pause',   b: '3×12 heavy + pause',   label: 'L3 — Burn'        },
        ],
      },
      {
        name: 'Dips',
        note: '2×max — go to 90° elbow bend',
        type: 's',
        image: '🔽',
        formGuide: 'Grip bars, press yourself up. Lean forward slightly to target chest. Lower until elbows are at 90° — don\'t go deeper. Keep shoulders depressed (don\'t shrug). Press up explosively. If you can\'t do 5+, use assisted band or machine.',
        levels: [
          { a: '2×max full',           b: '2×max assisted',       label: 'L1 — Build'       },
          { a: '2×max+2 full',         b: '2×max full',           label: 'L2 — Progress'    },
          { a: '2×max + 10kg',         b: '2×max+2 full',         label: 'L3 — Weighted'    },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  TUESDAY — LEGS + CORE
  // ─────────────────────────────────────────────
  {
    id: 'tue',
    weekday: 'Tuesday',
    type: 'Legs + Core',
    isRest: false,
    name: 'Legs + Core Day',
    focus: 'Quads · Hamstrings · Glutes · Abs',
    tip: 'Squats first while your CNS is fresh. RDLs stretch and strengthen hamstrings. Don\'t skip core — it ties everything together.',
    exercises: [
      {
        name: 'Squat',
        note: '4×6 — below parallel, brace hard',
        type: 's',
        image: '🦵',
        formGuide: 'Bar on upper traps (not neck). Feet shoulder-width, toes slightly out. Brace your core as if you\'re about to be punched. Break at hips and knees simultaneously. Descend until hip crease is below knee. Drive up through midfoot. Keep chest proud, don\'t good morning the weight.',
        levels: [
          { a: '4×6 @ 70kg',           b: '4×6 @ 70kg',           label: 'L1 — Technique'   },
          { a: '4×6 @ 80kg',           b: '4×6 @ 80kg',           label: 'L2 — Build'       },
          { a: '4×6 @ 90kg',           b: '4×6 @ 90kg',           label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Romanian Deadlift',
        note: '3×10 — soft knees, push hips back',
        type: 's',
        image: '🧎',
        formGuide: 'Hold bar at hip height. Soft bend in knees. Push hips BACK as you lower the bar along your legs. Feel the hamstring stretch. Lower until you feel a stretch (bar below knees). Drive hips forward to return. Keep back flat throughout — no rounding.',
        levels: [
          { a: '3×10 @ 60kg',          b: '3×10 @ 60kg',          label: 'L1 — Learn'       },
          { a: '3×10 @ 70kg',          b: '3×10 @ 70kg',          label: 'L2 — Progress'    },
          { a: '3×10 @ 80kg',          b: '3×10 @ 80kg',          label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Leg Press',
        note: '3×12 — full ROM, don\'t lock knees',
        type: 's',
        image: '🦿',
        formGuide: 'Feet shoulder-width, mid-to-high on platform. Lower until knees are at 90°. Don\'t let your lower back peel off the pad. Press through your heels. Stop just short of knee lockout — keep tension in quads. Control the descent.',
        levels: [
          { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L1 — Volume'      },
          { a: '3×12 heavier',         b: '3×12 heavier',         label: 'L2 — Load'        },
          { a: '3×12 heavy',           b: '3×12 heavy',           label: 'L3 — Max'         },
        ],
      },
      {
        name: 'Leg Curl (Machine)',
        note: '3×12 — squeeze at peak, controlled negative',
        type: 's',
        image: '🌀',
        formGuide: 'Lie face down, pad behind ankles (not calves). Curl legs up, squeezing hamstrings at the peak. Lower over 3 seconds. Keep hips pressed into the pad — don\'t let them lift. Full range of motion every rep.',
        levels: [
          { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L1 — Control'     },
          { a: '3×12 heavier',         b: '3×12 heavier',         label: 'L2 — Load'        },
          { a: '3×12 heavy + pause',   b: '3×12 heavy + pause',   label: 'L3 — Burn'        },
        ],
      },
      {
        name: 'Plank',
        note: '3×45 sec — straight line, no sagging',
        type: 's',
        image: '📏',
        formGuide: 'Elbows under shoulders, body in a straight line from head to heels. Squeeze quads and glutes to maintain alignment. Pull belly button toward spine. Breathe steadily — don\'t hold your breath. Stop if your lower back starts aching (you\'re sagging).',
        levels: [
          { a: '3×45 sec',             b: '3×45 sec',             label: 'L1 — Hold'        },
          { a: '3×60 sec',             b: '3×60 sec',             label: 'L2 — Endurance'   },
          { a: '3×60 sec + leg lift',  b: '3×60 sec + leg lift',  label: 'L3 — Challenge'   },
        ],
      },
      {
        name: 'Hanging Knee Raise',
        note: '3×15 — control the negative, no swinging',
        type: 's',
        image: '🪢',
        formGuide: 'Dead hang from bar. Raise knees to 90° (or higher if possible). Lower slowly — don\'t swing. Keep your body stable; use your abs, not momentum. If you can\'t do 15, do knee tucks on a dip station or lying leg raises.',
        levels: [
          { a: '3×15 knees to 90°',    b: '3×12 knees to 90°',   label: 'L1 — Tuck'        },
          { a: '3×15 knees to chest',  b: '3×15 knees to 90°',   label: 'L2 — Higher'      },
          { a: '3×12 straight leg',    b: '3×15 knees to chest',  label: 'L3 — Advanced'    },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  WEDNESDAY — ENDURANCE + SHOULDERS
  // ─────────────────────────────────────────────
  {
    id: 'wed',
    weekday: 'Wednesday',
    type: 'Endurance + Shoulders',
    isRest: false,
    name: 'Shoulders + Cardio',
    focus: 'Delts · Endurance · Rotator Cuff',
    tip: 'Light day for your CNS. Focus on mind-muscle connection with lateral raises. Face pulls are rehab + posture — don\'t skip them.',
    exercises: [
      {
        name: 'Treadmill Run',
        note: '20–25 min @ 8km/h steady pace',
        type: 's',
        image: '🏃',
        formGuide: 'Stay at 8km/h for the full duration. Land midfoot, not heel. Keep upper body relaxed — shoulders down, arms at 90°. Maintain a consistent breathing rhythm (3 steps in, 2 steps out). Walk 2 min to cool down.',
        levels: [
          { a: '20 min @ 8km/h',       b: '20 min @ 8km/h',       label: 'L1 — Steady'      },
          { a: '22 min @ 8km/h',       b: '22 min @ 8km/h',       label: 'L2 — Extend'      },
          { a: '25 min @ 8km/h',       b: '25 min @ 8km/h',       label: 'L3 — Full'        },
        ],
      },
      {
        name: 'Lateral Raise',
        note: '4×15 — light weight, controlled',
        type: 's',
        image: '↔️',
        formGuide: 'Stand with dumbbells at sides, slight bend in elbows. Raise arms out to the sides until parallel to floor. Lead with your elbows, not your hands. Pause at the top for 1 sec. Lower slowly — don\'t let gravity do the work. Use a weight you can control fully.',
        levels: [
          { a: '4×15 @ 6kg',           b: '4×15 @ 6kg',           label: 'L1 — Light'       },
          { a: '4×15 @ 8kg',           b: '4×15 @ 8kg',           label: 'L2 — Moderate'    },
          { a: '4×15 @ 10kg',          b: '4×15 @ 10kg',          label: 'L3 — Strict'      },
        ],
      },
      {
        name: 'Front Raise',
        note: '3×12 — palms down, stop at shoulder height',
        type: 's',
        image: '➡️',
        formGuide: 'Stand with dumbbells in front of thighs. Raise straight arms forward to shoulder height (parallel to floor). Palms face down throughout. Lower with control. Don\'t use momentum — this is an isolation exercise.',
        levels: [
          { a: '3×12 @ 8kg',           b: '3×12 @ 8kg',           label: 'L1 — Light'       },
          { a: '3×12 @ 10kg',          b: '3×12 @ 10kg',          label: 'L2 — Moderate'    },
          { a: '3×12 @ 12kg',          b: '3×12 @ 12kg',          label: 'L3 — Strict'      },
        ],
      },
      {
        name: 'Face Pull',
        note: '3×15 — external rotation focus',
        type: 's',
        image: '🎯',
        formGuide: 'Set cable at upper-chest height with rope attachment. Pull toward your face, separating the rope at the end. Externally rotate your shoulders — think "break the rope apart." Squeeze rear delts for 2 sec. This fixes posture and protects rotator cuffs.',
        levels: [
          { a: '3×15 light',           b: '3×15 light',           label: 'L1 — Rehab'       },
          { a: '3×15 moderate',        b: '3×15 moderate',        label: 'L2 — Control'     },
          { a: '3×15 heavier + hold',  b: '3×15 heavier + hold',  label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Rear Delt Fly',
        note: '3×12 — on machine or bent-over with DBs',
        type: 's',
        image: '🔙',
        formGuide: 'Bend over with a flat back (or use reverse pec deck). Arms hang down, slight elbow bend. Raise arms back and out to the sides. Squeeze rear delts at the peak. Don\'t use your lower back to lift. Controlled tempo throughout.',
        levels: [
          { a: '3×12 light',           b: '3×12 light',           label: 'L1 — Feel'        },
          { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L2 — Control'     },
          { a: '3×12 heavy squeeze',   b: '3×12 heavy squeeze',   label: 'L3 — Burn'        },
        ],
      },
      {
        name: 'Arnold Press',
        note: '3×10 — rotate as you press',
        type: 's',
        image: '🔄',
        formGuide: 'Hold dumbbells at shoulders, palms facing you. Press up while rotating palms to face forward at the top. Lower and reverse the rotation. This hits all three delt heads. Use a weight that allows full control through the rotation.',
        levels: [
          { a: '3×10 @ 14kg',          b: '3×10 @ 14kg',          label: 'L1 — Light'       },
          { a: '3×10 @ 18kg',          b: '3×10 @ 18kg',          label: 'L2 — Moderate'    },
          { a: '3×10 @ 22kg',          b: '3×10 @ 22kg',          label: 'L3 — Heavy'       },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  THURSDAY — PULL (HEAVY)
  // ─────────────────────────────────────────────
  {
    id: 'thu',
    weekday: 'Thursday',
    type: 'Pull (Heavy)',
    isRest: false,
    name: 'Heavy Pull Day',
    focus: 'Lats · Upper Back · Biceps',
    tip: 'Volume day for back. Weighted pull-ups are the main event. Control every rep — lats respond to tension, not momentum.',
    exercises: [
      {
        name: 'Weighted Pull-ups',
        note: '4×5 — add weight, stay strict',
        type: 's',
        image: '⚡',
        formGuide: 'Attach weight via belt or hold dumbbell between legs. Same form as regular pull-ups: chest to bar, elbows down. Don\'t kip or swing. If you can\'t get 5 reps, reduce the weight. Full dead hang at the bottom of each rep.',
        levels: [
          { a: '4×5 +5kg',             b: '4×5 bodyweight',       label: 'L1 — Light'       },
          { a: '4×5 +10kg',            b: '4×5 +5kg',             label: 'L2 — Build'       },
          { a: '4×5 +15kg',            b: '4×5 +10kg',            label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'T-Bar Row',
        note: '4×8 — squeeze back, don\'t jerk',
        type: 's',
        image: '🎣',
        formGuide: 'Straddle the T-bar, hinge at hips. Pull the bar to your chest. Squeeze your shoulder blades together at the top. Lower with control. Use a neutral grip (palms facing each other) if available — it\'s easier on wrists.',
        levels: [
          { a: '4×8 moderate',         b: '4×8 moderate',         label: 'L1 — Form'        },
          { a: '4×8 heavier',          b: '4×8 heavier',          label: 'L2 — Build'       },
          { a: '4×8 heavy',            b: '4×8 heavy',            label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Lat Pulldown',
        note: '3×10 — wide grip, pull to upper chest',
        type: 's',
        image: '⬇️',
        formGuide: 'Wide grip, lean back slightly. Pull bar to your upper chest, not behind neck. Drive elbows down and back. Squeeze lats at the bottom. Don\'t use body momentum — if you\'re leaning back too much, the weight is too heavy.',
        levels: [
          { a: '3×10 moderate',        b: '3×10 moderate',        label: 'L1 — Volume'      },
          { a: '3×10 heavier',         b: '3×10 heavier',         label: 'L2 — Load'        },
          { a: '3×10 heavy + pause',   b: '3×10 heavy + pause',   label: 'L3 — Peak Squeeze' },
        ],
      },
      {
        name: 'Seated Cable Row',
        note: '3×10 — V-grip, squeeze and hold',
        type: 's',
        image: '🪑',
        formGuide: 'Sit tall, feet braced. Pull V-grip handle to your stomach. Retract scapula fully and hold for 2 seconds. Let your shoulders roll forward at the stretch to get full lat extension. Don\'t round your lower back.',
        levels: [
          { a: '3×10 moderate',        b: '3×10 moderate',        label: 'L1 — Control'     },
          { a: '3×10 heavier',         b: '3×10 heavier',         label: 'L2 — Load'        },
          { a: '3×10 heavy + 3s hold', b: '3×10 heavy + 3s hold', label: 'L3 — Max Squeeze'  },
        ],
      },
      {
        name: 'Incline DB Curl',
        note: '3×10 — stretch at the bottom, squeeze at top',
        type: 's',
        image: '📐',
        formGuide: 'Sit on an incline bench (45-60°), arms hanging straight down. Curl dumbbells up, keeping elbows back past your body. This gives a deep bicep stretch at the bottom. Squeeze at the top. This is the best bicep mass builder.',
        levels: [
          { a: '3×10 @ 10kg',          b: '3×10 @ 10kg',          label: 'L1 — Light'       },
          { a: '3×10 @ 14kg',          b: '3×10 @ 14kg',          label: 'L2 — Moderate'    },
          { a: '3×10 @ 18kg',          b: '3×10 @ 18kg',          label: 'L3 — Heavy'       },
        ],
      },
      {
        name: 'Face Pull',
        note: '2×15 — rear delt + external rotation',
        type: 's',
        image: '🎯',
        formGuide: 'Same as Wednesday — don\'t skip these on pull days either. High reps, light weight, external rotation focus. Think "break the rope apart" at the end of each rep. Great for shoulder health and posture.',
        levels: [
          { a: '2×15 light',           b: '2×15 light',           label: 'L1 — Rehab'       },
          { a: '2×15 moderate',        b: '2×15 moderate',        label: 'L2 — Control'     },
          { a: '2×15 heavier + hold',  b: '2×15 heavier + hold',  label: 'L3 — Strong'      },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  FRIDAY — PUSH + ENDURANCE
  // ─────────────────────────────────────────────
  {
    id: 'fri',
    weekday: 'Friday',
    type: 'Push + Endurance',
    isRest: false,
    name: 'Push + Cardio',
    focus: 'Chest · Shoulders · Triceps · Conditioning',
    tip: 'Push-ups to failure then cardio. This is a lighter push day — you\'ve already done heavy push on Monday. Focus on pump and conditioning.',
    exercises: [
      {
        name: 'Push-ups (weighted)',
        note: '4×max — add weight if possible',
        type: 's',
        image: '🔼',
        formGuide: 'Hands slightly wider than shoulder-width. Body in a straight line from head to heels. Lower chest to ground (not just nose). Elbows at 45° to body. For weighted: have someone place a plate on your upper back. Full ROM every rep.',
        levels: [
          { a: '4×max full',           b: '4×max knee',           label: 'L1 — Volume'      },
          { a: '4×max + 5kg',          b: '4×max full',           label: 'L2 — Weighted'    },
          { a: '4×max + 10kg',         b: '4×max + 5kg',          label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'DB Shoulder Press',
        note: '3×10 — seated or standing',
        type: 's',
        image: '🏋️',
        formGuide: 'Hold dumbbells at shoulders, palms forward. Press up until arms are extended but not locked. Don\'t arch your back excessively. Lower to ear level. If seated, keep back flat against the bench. Control the negative.',
        levels: [
          { a: '3×10 @ 16kg',          b: '3×10 @ 16kg',          label: 'L1 — Light'       },
          { a: '3×10 @ 20kg',          b: '3×10 @ 20kg',          label: 'L2 — Moderate'    },
          { a: '3×10 @ 24kg',          b: '3×10 @ 24kg',          label: 'L3 — Heavy'       },
        ],
      },
      {
        name: 'Close-grip Bench',
        note: '3×8 — triceps focus, hands shoulder-width',
        type: 's',
        image: '✋',
        formGuide: 'Same setup as regular bench but hands shoulder-width apart. Keep elbows tucked to your sides throughout. Lower bar to lower sternum. Press up, focusing on triceps lockout. Don\'t flair your elbows.',
        levels: [
          { a: '3×8 @ 50kg',           b: '3×8 @ 50kg',           label: 'L1 — Build'       },
          { a: '3×8 @ 60kg',           b: '3×8 @ 60kg',           label: 'L2 — Progress'    },
          { a: '3×8 @ 70kg',           b: '3×8 @ 70kg',           label: 'L3 — Strong'      },
        ],
      },
      {
        name: 'Treadmill Intervals',
        note: '15 min — 1 min sprint / 2 min jog',
        type: 's',
        image: '🏃',
        formGuide: 'Warm up 2 min jog. Then alternate: 1 min at 12km/h (sprint), 2 min at 6km/h (jog recovery). Repeat 4-5 rounds. Cool down 2 min walk. Don\'t hold the handrails — let your arms swing naturally.',
        levels: [
          { a: '4 rounds — 12/6 km/h',  b: '4 rounds — 10/5 km/h', label: 'L1 — Start'       },
          { a: '5 rounds — 12/6 km/h',  b: '5 rounds — 10/5 km/h', label: 'L2 — More'        },
          { a: '5 rounds — 13/6 km/h',  b: '5 rounds — 11/5 km/h', label: 'L3 — Intense'     },
        ],
      },
      {
        name: 'Ab Wheel / Crunches',
        note: '3×15 — control the rollout',
        type: 's',
        image: '🎡',
        formGuide: 'Kneel on the floor, hold ab wheel handles. Roll forward slowly, keeping your core braced. Go as far as you can without your back sagging. Pull back using your abs. If you can\'t control the rollout, do crunches instead (feet anchored, hands behind head, lift shoulder blades).',
        levels: [
          { a: '3×15 crunches',        b: '3×15 crunches',        label: 'L1 — Base'        },
          { a: '3×10 ab wheel',        b: '3×12 ab wheel',        label: 'L2 — Rollout'     },
          { a: '3×15 ab wheel full',   b: '3×15 ab wheel',        label: 'L3 — Advanced'    },
        ],
      },
      {
        name: 'Cool Down Walk',
        note: '5 min — slow pace, deep breathing',
        type: 's',
        image: '🚶',
        formGuide: 'Walk at a comfortable pace (3-4 km/h). Focus on deep belly breathing: 4 sec in, 6 sec out. Shake out your arms and legs. This helps clear lactate and brings your heart rate down gradually.',
        levels: [
          { a: '5 min stroll',          b: '5 min stroll',          label: 'L1 — Basic'       },
          { a: '5 min + stretch',      b: '5 min + stretch',       label: 'L2 — Extend'      },
          { a: '5 min + full stretch', b: '5 min + full stretch',  label: 'L3 — Recovery'    },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  //  SATURDAY — FULL REST
  // ─────────────────────────────────────────────
  {
    id: 'sat',
    weekday: 'Saturday',
    type: 'Full Rest',
    isRest: true,
    name: 'Rest Day',
    focus: 'Recovery · Nutrition · Sleep',
    tip: 'This is when your muscle actually grows. Rest hard. Sleep 8 hours, eat your protein, and don\'t feel guilty about doing nothing.',
    restActivities: [
      { icon: '😴', name: 'Sleep 7–8 hours',                  note: 'Growth hormone peaks during deep sleep. Prioritize this above everything.' },
      { icon: '🥩', name: 'Eat your protein (~130g)',          note: 'Spread across 4 meals. Aim for 30-35g per meal. Chicken, eggs, whey, lentils.' },
      { icon: '🚶', name: 'Light walk (optional)',             note: '20 min max — easy pace. Only if you feel like it. Not mandatory.' },
      { icon: '💧', name: 'Hydrate — 3L+ water',               note: 'Muscle recovery needs water. Add electrolytes if you sweat a lot.' },
      { icon: '🦵', name: 'Foam roll if sore',                 note: 'Quads, hamstrings, lats, upper back. 30 sec per area. Don\'t roll lower back.' },
      { icon: '📓', name: 'Log your week',                     note: 'Review what worked, what didn\'t. Plan next week\'s weights.' },
    ],
  },
];

// ─── WARMUPS — Pre-workout routines keyed by day id ──────────────────────────
// Each warm-up has: duration (string), items (array of { name, duration, note })
// Rest days (sat) have no warm-up.
const WARMUPS = {
  sun: {
    duration: '8 min',
    items: [
      { name: 'Arm circles',      duration: '30 sec forward, 30 sec backward', note: 'Loosen the shoulder capsule' },
      { name: 'Band pull-aparts', duration: '3×15 light',                     note: 'Activate rear delts and rotator cuff' },
      { name: 'Dead hang',        duration: '3×10 sec passive',               note: 'Decompress spine, feel lats stretch' },
      { name: 'Scapular shrugs',  duration: '2×10 on bar',                    note: 'Retract and depress — no arm bending' },
      { name: 'Cat-cow',          duration: '2×10 slow',                      note: 'Spine mobility, wake up the core' },
      { name: 'Shoulder dislocates', duration: '10 reps with band/stick',      note: 'Open up chest and front delts' },
    ],
  },
  mon: {
    duration: '6 min',
    items: [
      { name: 'Wrist circles',       duration: '60 sec',              note: 'Both directions, full range' },
      { name: 'Arm swings',          duration: '30 sec across chest', note: 'Swing across, open chest, repeat' },
      { name: 'Wall push-ups',       duration: '2×15 slow',           note: 'Blood flow into chest and triceps' },
      { name: 'Shoulder rolls',      duration: '20 reps',             note: 'Backward circles, big range' },
      { name: 'Chest opener stretch',duration: '40 sec hold',         note: 'Hands behind back, open front' },
      { name: 'Band pull-aparts',    duration: '2×12',                note: 'Wake up the upper back' },
    ],
  },
  tue: {
    duration: '10 min',
    items: [
      { name: 'Hip circles',          duration: '30 sec each side',   note: 'Open the hip capsule' },
      { name: 'Leg swings front-back',duration: '20 reps each leg',   note: 'Controlled — no bouncing' },
      { name: 'Leg swings side-side', duration: '20 reps each leg',   note: 'Across the body, lateral range' },
      { name: 'Bodyweight squat',     duration: '2×10 slow tempo',    note: 'Full depth, 3 sec down, 2 sec up' },
      { name: 'Glute bridge',         duration: '2×15',               note: 'Squeeze glutes at the top for 2 sec' },
      { name: 'Ankle circles',        duration: '60 sec total',       note: 'Both directions, crucial for squat depth' },
      { name: 'Walking lunges',       duration: '10 steps each leg',  note: 'Dynamic stretch for hip flexors' },
    ],
  },
  wed: {
    duration: '5 min',
    items: [
      { name: 'Neck rolls',           duration: '30 sec',             note: 'Slow, full range, both directions' },
      { name: 'Shoulder rolls',       duration: '30 sec',             note: 'Big backward circles' },
      { name: 'Arm circles',          duration: '60 sec',             note: 'Forward then backward' },
      { name: 'Light jog in place',   duration: '2 min',              note: 'Get heart rate up gently' },
      { name: 'Hip swings',           duration: '20 reps',            note: 'Side to side, loosen the hips' },
    ],
  },
  thu: {
    duration: '8 min',
    items: [
      { name: 'Arm circles',      duration: '30 sec forward, 30 sec backward', note: 'Loosen the shoulder capsule' },
      { name: 'Band pull-aparts', duration: '3×15 light',                     note: 'Activate rear delts and rotator cuff' },
      { name: 'Dead hang',        duration: '3×10 sec passive',               note: 'Decompress spine, feel lats stretch' },
      { name: 'Scapular shrugs',  duration: '2×10 on bar',                    note: 'Retract and depress — no arm bending' },
      { name: 'Cat-cow',          duration: '2×10 slow',                      note: 'Spine mobility, wake up the core' },
      { name: 'Shoulder dislocates', duration: '10 reps with band/stick',      note: 'Open up chest and front delts' },
    ],
  },
  fri: {
    duration: '9 min',
    items: [
      { name: 'Light jog',            duration: '3 min',                note: 'Easy pace — get blood flowing' },
      { name: 'Wrist circles',        duration: '60 sec',               note: 'Both directions, full range' },
      { name: 'Arm swings',           duration: '30 sec across chest',  note: 'Swing across, open chest, repeat' },
      { name: 'Wall push-ups',        duration: '2×15 slow',            note: 'Blood flow into chest and triceps' },
      { name: 'Shoulder rolls',       duration: '20 reps',              note: 'Backward circles, big range' },
      { name: 'Chest opener stretch', duration: '40 sec hold',          note: 'Hands behind back, open front' },
      { name: 'Band pull-aparts',     duration: '2×12',                 note: 'Wake up the upper back' },
    ],
  },
};
