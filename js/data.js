// ─── DATA.JS — Exercise Configuration ────────────────────────────────────────
//
// HOW TO EDIT:
// - The app supports multiple workout plans stored in the PLANS object
// - PLANS.calisthenics = original calisthenics plan
// - PLANS.gym = gym upper/lower split
// - Each plan has: id, name, days[], warmups{}
// - DAYS and WARMUPS are auto-set from the active plan (stored in localStorage)
// - Add more plans by adding entries to PLANS
//
// DAY STRUCTURE:
// - Each day has: id, weekday, type, name, focus, tip
// - isRest: true  → shows rehab activities instead of exercises
// - isRest: false → shows exercise rows with checkboxes
// - exercises[]: each has name, note, type, image, formGuide, levels[]
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

const PLANS = {

  // ═══════════════════════════════════════════════════════════════════════════
  //  PLAN 1: CALISTHENICS SPLIT (Original)
  // ═══════════════════════════════════════════════════════════════════════════
  calisthenics: {
    id: 'calisthenics',
    name: 'Calisthenics Split',
    days: [
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
            image: '\u{1F3CB}\uFE0F',
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
            image: '\u2B06\uFE0F',
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
            image: '\u{1F6A3}',
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
            image: '\u{1F3D7}\uFE0F',
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
            image: '\u{1F4AA}',
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
            image: '\u{1F528}',
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
            image: '\u{1F3CB}\uFE0F',
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
            image: '\u{1F4D0}',
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
            image: '\u{1F985}',
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
            image: '\u2600\uFE0F',
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
            image: '\u2B07\uFE0F',
            formGuide: 'Attach rope or straight bar to high pulley. Elbows pinned to ribs, slightly lean forward. Push down until arms are fully extended. Squeeze triceps for 1 sec. Only your forearms move — upper body stays still.',
            levels: [
              { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L1 — Control'     },
              { a: '3×12 heavier',         b: '3×12 heavier',         label: 'L2 — Load'        },
              { a: '3×12 heavy + pause',   b: '3×12 heavy + pause',   label: 'L3 — Burn'        },
            ],
          },
          {
            name: 'Cable overhead triceps extension',
            note: 'Elbows stay beside ears — face away from cable, full stretch at top',
            type: 'ab',
            image: '\u{1F51D}',
            levels: [
              { a: '2×8 light cable',    b: '2×10 moderate',     label: 'L1 — Learn it' },
              { a: '3×8',                b: '3×10',              label: 'L2 — Volume'   },
              { a: '3×10 controlled',    b: '3×8 heavy',         label: 'L3 — Strength' },
            ],
          },
          {
            name: 'Dips',
            note: '2×max — go to 90° elbow bend',
            type: 's',
            image: '\u{1F53D}',
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
            image: '\u{1F9B5}',
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
            image: '\u{1F9CE}',
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
            image: '\u{1F9BF}',
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
            image: '\u{1F300}',
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
            image: '\u{1F4CF}',
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
            image: '\u{1FAA2}',
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
            image: '\u{1F3C3}',
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
            image: '\u2194\uFE0F',
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
            image: '\u27A1\uFE0F',
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
            image: '\u{1F3AF}',
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
            image: '\u{1F519}',
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
            image: '\u{1F504}',
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
            image: '\u26A1',
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
            image: '\u{1F3A3}',
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
            image: '\u2B07\uFE0F',
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
            image: '\u{1FAA9}',
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
            image: '\u{1F4D0}',
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
            image: '\u{1F3AF}',
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
            image: '\u{1F53C}',
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
            image: '\u{1F3CB}\uFE0F',
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
            image: '\u270B',
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
            image: '\u{1F3C3}',
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
            image: '\u{1F3A1}',
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
            image: '\u{1F6B6}',
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
          { icon: '\u{1F634}', name: 'Sleep 7–8 hours',                  note: 'Growth hormone peaks during deep sleep. Prioritize this above everything.' },
          { icon: '\u{1F969}', name: 'Eat your protein (~130g)',          note: 'Spread across 4 meals. Aim for 30-35g per meal. Chicken, eggs, whey, lentils.' },
          { icon: '\u{1F6B6}', name: 'Light walk (optional)',             note: '20 min max — easy pace. Only if you feel like it. Not mandatory.' },
          { icon: '\u{1F4A7}', name: 'Hydrate — 3L+ water',               note: 'Muscle recovery needs water. Add electrolytes if you sweat a lot.' },
          { icon: '\u{1F9B5}', name: 'Foam roll if sore',                 note: 'Quads, hamstrings, lats, upper back. 30 sec per area. Don\'t roll lower back.' },
          { icon: '\u{1F4D3}', name: 'Log your week',                     note: 'Review what worked, what didn\'t. Plan next week\'s weights.' },
        ],
      },
    ],
    warmups: {
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
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  PLAN 2: GYM — UPPER / LOWER SPLIT
  // ═══════════════════════════════════════════════════════════════════════════
  gym: {
    id: 'gym',
    name: 'Gym — Upper / Lower',
    days: [
      // ─────────────────────────────────────────────
      //  SUNDAY — UPPER BODY
      // ─────────────────────────────────────────────
      {
        id: 'sun',
        weekday: 'Sunday',
        type: 'Upper Body',
        isRest: false,
        name: 'Upper Body Day',
        focus: 'Chest · Back · Shoulders · Arms',
        tip: 'Start with compound lifts (incline bench, rows) while you\'re fresh. Save lateral raises and curls for the end. Control the negative on every rep.',
        exercises: [
          {
            name: 'Incline Bench Press',
            note: '4×8–10 — 30° incline, touch upper chest',
            type: 's',
            image: '\u{1F3CB}\uFE0F',
            formGuide: 'Set bench to 30°. Retract scapula and keep them pinned. Lower bar to upper chest (not sternum). Press explosively. Keep elbows at ~75° to protect shoulders. Don\'t bounce off the chest — control the descent.',
            levels: [
              { a: '4×8 @ 40kg',           b: '4×8 @ 40kg',           label: 'L1 — Technique'   },
              { a: '4×9 @ 45kg',           b: '4×9 @ 45kg',           label: 'L2 — Build'       },
              { a: '4×10 @ 50kg',          b: '4×10 @ 50kg',          label: 'L3 — Target'      },
            ],
          },
          {
            name: 'Barbell Row',
            note: '4×8–10 — 45° hinge, pull to lower ribs',
            type: 's',
            image: '\u{1F6A3}',
            formGuide: 'Hinge at hips until torso ~45° to floor. Bar hangs at knee height. Pull to lower ribcage, squeeze lats for 1 sec. Lower controlled with a 2-count. Neck neutral. Brace core to prevent spinal rounding.',
            levels: [
              { a: '4×8 @ 50kg',           b: '4×8 @ 50kg',           label: 'L1 — Moderate'    },
              { a: '4×9 @ 55kg',           b: '4×9 @ 55kg',           label: 'L2 — Heavier'     },
              { a: '4×10 @ 60kg',          b: '4×10 @ 60kg',          label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Dumbbell Shoulder Press',
            note: '3×10–12 — seated, control the negative',
            type: 's',
            image: '\u{1F3CB}\uFE0F',
            formGuide: 'Sit with back flat against bench. Hold DBs at shoulders, palms forward. Press up until arms extended (not locked). Lower to ear level. Don\'t arch lower back excessively. Breathe out on the press.',
            levels: [
              { a: '3×10 @ 14kg',          b: '3×10 @ 14kg',          label: 'L1 — Light'       },
              { a: '3×11 @ 18kg',          b: '3×11 @ 18kg',          label: 'L2 — Moderate'    },
              { a: '3×12 @ 22kg',          b: '3×12 @ 22kg',          label: 'L3 — Heavy'       },
            ],
          },
          {
            name: 'Lat Pulldown',
            note: '3×10–12 — wide grip, pull to upper chest',
            type: 's',
            image: '\u2B07\uFE0F',
            formGuide: 'Wide grip, lean back slightly. Pull bar to upper chest (not behind neck). Drive elbows down and back. Squeeze lats at the bottom. Don\'t use body momentum — if leaning back too much, weight is too heavy.',
            levels: [
              { a: '3×10 moderate',        b: '3×10 moderate',        label: 'L1 — Volume'      },
              { a: '3×11 heavier',         b: '3×11 heavier',         label: 'L2 — Load'        },
              { a: '3×12 heavy + pause',   b: '3×12 heavy + pause',   label: 'L3 — Peak Squeeze' },
            ],
          },
          {
            name: 'Lateral Raises',
            note: '3×12–15 — light weight, strict form',
            type: 's',
            image: '\u2194\uFE0F',
            formGuide: 'Stand with DBs at sides, slight elbow bend. Raise arms out to sides until parallel to floor. Lead with elbows. Pause at top for 1 sec. Lower slowly — don\'t let gravity drop them. Use a weight you can control.',
            levels: [
              { a: '3×12 @ 6kg',           b: '3×12 @ 6kg',           label: 'L1 — Light'       },
              { a: '3×13 @ 8kg',           b: '3×13 @ 8kg',           label: 'L2 — Moderate'    },
              { a: '3×15 @ 10kg',          b: '3×15 @ 10kg',          label: 'L3 — Strict'      },
            ],
          },
          {
            name: 'Barbell Curl',
            note: '3×10–12 — elbows pinned to sides',
            type: 's',
            image: '\u{1F4AA}',
            formGuide: 'Stand tall, elbows pinned to ribs. Curl bar in a wide arc. Squeeze biceps at top. Lower slowly for 3 seconds. Only forearms move. Don\'t swing your body. Use a controlled tempo throughout.',
            levels: [
              { a: '3×10 @ 25kg',          b: '3×10 @ 25kg',          label: 'L1 — Light'       },
              { a: '3×11 @ 30kg',          b: '3×11 @ 30kg',          label: 'L2 — Moderate'    },
              { a: '3×12 @ 35kg',          b: '3×12 @ 35kg',          label: 'L3 — Heavy'       },
            ],
          },
          {
            name: 'Tricep Pushdown',
            note: '3×12 — rope or bar, full extension',
            type: 's',
            image: '\u2B07\uFE0F',
            formGuide: 'Rope or straight bar on high pulley. Elbows pinned to ribs, slight forward lean. Push down to full extension. Squeeze triceps for 1 sec. Only forearms move. Avoid letting elbows flare out.',
            levels: [
              { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L1 — Control'     },
              { a: '3×12 heavier',         b: '3×12 heavier',         label: 'L2 — Load'        },
              { a: '3×12 heavy + pause',   b: '3×12 heavy + pause',   label: 'L3 — Burn'        },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────────
      //  MONDAY — LOWER BODY
      // ─────────────────────────────────────────────
      {
        id: 'mon',
        weekday: 'Monday',
        type: 'Lower Body',
        isRest: false,
        name: 'Lower Body Day',
        focus: 'Quads · Hamstrings · Glutes · Calves',
        tip: 'Squats first while CNS is fresh. RDLs stretch and strengthen hamstrings. Don\'t rush — rest 2-3 min between heavy sets.',
        exercises: [
          {
            name: 'Barbell Squat',
            note: '4×8–10 — below parallel, brace hard',
            type: 's',
            image: '\u{1F9B5}',
            formGuide: 'Bar on upper traps, feet shoulder-width. Brace core hard. Break at hips and knees simultaneously. Descend until hip crease below knee. Drive up through midfoot. Keep chest up. Don\'t let knees cave in.',
            levels: [
              { a: '4×8 @ 60kg',           b: '4×8 @ 60kg',           label: 'L1 — Technique'   },
              { a: '4×9 @ 70kg',           b: '4×9 @ 70kg',           label: 'L2 — Build'       },
              { a: '4×10 @ 80kg',          b: '4×10 @ 80kg',          label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Romanian Deadlift',
            note: '4×8–10 — soft knees, push hips back',
            type: 's',
            image: '\u{1F9CE}',
            formGuide: 'Bar at hip height, soft knee bend. Push hips BACK as you lower bar along legs. Feel hamstring stretch. Lower until bar passes knees. Drive hips forward to return. Keep back flat throughout. No spinal rounding.',
            levels: [
              { a: '4×8 @ 50kg',           b: '4×8 @ 50kg',           label: 'L1 — Learn'       },
              { a: '4×9 @ 60kg',           b: '4×9 @ 60kg',           label: 'L2 — Progress'    },
              { a: '4×10 @ 70kg',          b: '4×10 @ 70kg',          label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Leg Press',
            note: '3×12–15 — full ROM, don\'t lock knees',
            type: 's',
            image: '\u{1F9BF}',
            formGuide: 'Feet shoulder-width, mid platform. Lower until knees at 90°. Don\'t let lower back peel off pad. Press through heels. Stop short of knee lockout. Control the descent.',
            levels: [
              { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L1 — Volume'      },
              { a: '3×13 heavier',         b: '3×13 heavier',         label: 'L2 — Load'        },
              { a: '3×15 heavy',           b: '3×15 heavy',           label: 'L3 — Max'         },
            ],
          },
          {
            name: 'Leg Curl (Machine)',
            note: '3×12 — squeeze at peak, controlled negative',
            type: 's',
            image: '\u{1F300}',
            formGuide: 'Face down, pad behind ankles. Curl legs up squeezing hamstrings at peak. Lower over 3 seconds. Keep hips pressed into pad — don\'t let them lift. Full ROM every rep.',
            levels: [
              { a: '3×12 moderate',        b: '3×12 moderate',        label: 'L1 — Control'     },
              { a: '3×12 heavier',         b: '3×12 heavier',         label: 'L2 — Load'        },
              { a: '3×12 heavy + pause',   b: '3×12 heavy + pause',   label: 'L3 — Burn'        },
            ],
          },
          {
            name: 'Calf Raises',
            note: '4×15–20 — standing or seated, full ROM',
            type: 's',
            image: '\u{1F9B6}',
            formGuide: 'Stand on edge of step or use calf raise machine. Lower heels for full stretch. Press up onto toes as high as possible. Hold the peak contraction for 1 sec. Full range — don\'t bounce.',
            levels: [
              { a: '4×15 moderate',        b: '4×15 moderate',        label: 'L1 — Light'       },
              { a: '4×17 heavier',         b: '4×17 heavier',         label: 'L2 — Build'       },
              { a: '4×20 heavy',           b: '4×20 heavy',           label: 'L3 — Burn'        },
            ],
          },
          {
            name: 'Glute Bridge',
            note: '3×15 — squeeze glutes at the top',
            type: 's',
            image: '\u{1F9D8}',
            formGuide: 'Lie on back, knees bent, feet flat. Drive hips up squeezing glutes at top. Pause for 2 seconds. Lower slowly. Don\'t hyperextend lower back at the top. Add weight on hips for progression.',
            levels: [
              { a: '3×15 bodyweight',      b: '3×15 bodyweight',      label: 'L1 — Activate'    },
              { a: '3×15 + 10kg',          b: '3×15 + 10kg',          label: 'L2 — Weighted'    },
              { a: '3×15 + 20kg',          b: '3×15 + 20kg',          label: 'L3 — Strong'      },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────────
      //  TUESDAY — REST
      // ─────────────────────────────────────────────
      {
        id: 'tue',
        weekday: 'Tuesday',
        type: 'Rest',
        isRest: true,
        name: 'Rest Day',
        focus: 'Recovery · Mobility · Sleep',
        tip: 'Rest days are when your body rebuilds. Don\'t feel guilty — the walk and stretch keep you loose without adding fatigue.',
        restActivities: [
          { icon: '\u{1F6B6}', name: 'Light 20 min walk',                note: 'Keeps blood flowing without taxing CNS. Fresh air helps recovery too.' },
          { icon: '\u{1F9D8}', name: 'Full body stretch — 10 min',       note: 'Hold each stretch 30-45 sec. Focus on hips, hamstrings, chest, and lats.' },
          { icon: '\u{1F634}', name: 'Sleep early — 8 hours',            note: 'Set a bedtime alarm. No screens 30 min before sleep.' },
          { icon: '\u{1F4A7}', name: 'Hydrate — 3L+ water',              note: 'Recovery is 80% hydration and sleep. Drink up throughout the day.' },
          { icon: '\u{1F969}', name: 'Eat maintenance calories',          note: 'No deficit on rest days. Your body needs fuel to repair muscle tissue.' },
        ],
      },

      // ─────────────────────────────────────────────
      //  WEDNESDAY — CORE + SKILL
      // ─────────────────────────────────────────────
      {
        id: 'wed',
        weekday: 'Wednesday',
        type: 'Core + Skill',
        isRest: false,
        name: 'Core & Skill Day',
        focus: 'L-sit · Handstand · Core Strength',
        tip: 'Do skill work FIRST while fresh. L-sit and handstand progressions need focus. Core after — treat it as the finisher.',
        exercises: [
          {
            name: 'Tuck L-sit on Bars',
            note: '5×max hold — push shoulders down, keep chest up',
            type: 's',
            image: '\u{1F9D8}',
            formGuide: 'Grip parallel bars or parallettes. Press shoulders DOWN (depress scapula). Lift hips, bring knees to chest. Hold as long as possible. Breathe steadily. Aim for 10+ sec holds.',
            levels: [
              { a: '5×5 sec hold',         b: '5×5 sec hold',         label: 'L1 — Build'       },
              { a: '5×8 sec hold',         b: '5×8 sec hold',         label: 'L2 — Progress'    },
              { a: '5×12 sec hold',        b: '5×12 sec hold',        label: 'L3 — Solid'       },
            ],
          },
          {
            name: 'Leg Raises on Bars',
            note: '3×10 reps — controlled, no swinging',
            type: 's',
            image: '\u{1FAA2}',
            formGuide: 'Support on bars or parallettes. Keep legs straight. Raise legs to 90° (or higher). Lower controlled. Don\'t swing. Keep shoulders depressed throughout. Core engaged at all times.',
            levels: [
              { a: '3×8 reps',             b: '3×8 reps',             label: 'L1 — Learn'       },
              { a: '3×10 reps',            b: '3×10 reps',            label: 'L2 — Volume'      },
              { a: '3×12 reps',            b: '3×12 reps',            label: 'L3 — Advanced'    },
            ],
          },
          {
            name: 'Compression Holds (Floor)',
            note: '3×20 sec — sit up, compress legs to chest',
            type: 's',
            image: '\u{1F9D8}',
            formGuide: 'Sit on floor, legs straight. Lean forward slightly. Lift legs and compress them toward your chest. Hold. This builds the active compression needed for L-sit. Keep back as straight as possible.',
            levels: [
              { a: '3×15 sec',             b: '3×15 sec',             label: 'L1 — Start'       },
              { a: '3×20 sec',             b: '3×20 sec',             label: 'L2 — Hold'        },
              { a: '3×30 sec',             b: '3×30 sec',             label: 'L3 — Long'        },
            ],
          },
          {
            name: 'Wall Handstand Hold',
            note: '5×20–30 sec — stomach to wall',
            type: 's',
            image: '\u{1F9D8}',
            formGuide: 'Facing away from wall, walk feet up. Keep body in straight line (no arch). Push through shoulders — don\'t let them cave. Squeeze glutes and legs together. Point toes.',
            levels: [
              { a: '5×20 sec',             b: '5×20 sec',             label: 'L1 — Build'       },
              { a: '5×25 sec',             b: '5×25 sec',             label: 'L2 — Extend'      },
              { a: '5×30 sec',             b: '5×30 sec',             label: 'L3 — Solid'       },
            ],
          },
          {
            name: 'Pike Pushups',
            note: '3×10 — hips high, elbows back',
            type: 's',
            image: '\u{1F3CB}\uFE0F',
            formGuide: 'Start in pike position (hips high, legs straight). Lower head toward floor by bending elbows. Elbows point back, not out. Press back up. Builds overhead pressing strength for handstands.',
            levels: [
              { a: '3×8 reps',             b: '3×8 reps',             label: 'L1 — Build'       },
              { a: '3×10 reps',            b: '3×10 reps',            label: 'L2 — Volume'      },
              { a: '3×12 reps',            b: '3×12 reps',            label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Shoulder Taps in Plank',
            note: '3×10 each — stable hips, don\'t rock',
            type: 's',
            image: '\u{1F9D8}',
            formGuide: 'High plank position, hands slightly wider than shoulders. Lift one hand and tap opposite shoulder. Keep hips as still as possible. Don\'t rock side to side. This builds shoulder stability for handstands.',
            levels: [
              { a: '3×8 each',             b: '3×8 each',             label: 'L1 — Stability'   },
              { a: '3×10 each',            b: '3×10 each',            label: 'L2 — Control'     },
              { a: '3×12 each',            b: '3×12 each',            label: 'L3 — Solid'       },
            ],
          },
          {
            name: 'Hanging Leg Raises',
            note: '4×12–15 — control the negative, no swing',
            type: 's',
            image: '\u{1FAA2}',
            formGuide: 'Dead hang from bar. Raise legs to 90° (straight or bent). Lower slowly — 3 sec negative. Don\'t swing. Use your abs, not momentum. If you can\'t keep legs straight, bend knees.',
            levels: [
              { a: '4×12 knees to 90°',    b: '4×12 knees to 90°',   label: 'L1 — Tuck'        },
              { a: '4×13 knees to chest',  b: '4×13 knees to chest',  label: 'L2 — Higher'      },
              { a: '4×15 straight leg',    b: '4×15 straight leg',    label: 'L3 — Advanced'    },
            ],
          },
          {
            name: 'Cable Crunches',
            note: '3×15 — kneeling, curl the weight with abs',
            type: 's',
            image: '\u{1F3CB}\uFE0F',
            formGuide: 'Attach rope to high pulley, kneel facing away. Hold rope by head. Crunch down by flexing spine — don\'t use arms. Squeeze abs at the bottom. Return slowly. Controlled tempo.',
            levels: [
              { a: '3×15 light',           b: '3×15 light',           label: 'L1 — Learn'       },
              { a: '3×15 moderate',        b: '3×15 moderate',        label: 'L2 — Control'     },
              { a: '3×15 heavy',           b: '3×15 heavy',           label: 'L3 — Burn'        },
            ],
          },
          {
            name: 'Plank',
            note: '3×45 sec — straight line, no sagging',
            type: 's',
            image: '\u{1F4CF}',
            formGuide: 'Elbows under shoulders. Body in straight line head to heels. Squeeze quads and glutes. Pull belly button to spine. Breathe steadily. Stop if lower back aches (you\'re sagging).',
            levels: [
              { a: '3×45 sec',             b: '3×45 sec',             label: 'L1 — Hold'        },
              { a: '3×60 sec',             b: '3×60 sec',             label: 'L2 — Endurance'   },
              { a: '3×60 sec + leg lift',  b: '3×60 sec + leg lift',  label: 'L3 — Challenge'   },
            ],
          },
          {
            name: 'Side Plank',
            note: '3×30 sec each side — body in straight line',
            type: 's',
            image: '\u{1F9D8}',
            formGuide: 'Lie on side, elbow under shoulder. Stack feet. Lift hips forming straight line. Keep core braced. Don\'t let hips sink. Breathe throughout. Switch sides.',
            levels: [
              { a: '3×30 sec',             b: '3×30 sec',             label: 'L1 — Hold'        },
              { a: '3×40 sec',             b: '3×40 sec',             label: 'L2 — Endurance'   },
              { a: '3×45 sec + leg raise', b: '3×45 sec + leg raise', label: 'L3 — Challenge'   },
            ],
          },
          {
            name: 'Ab Wheel Rollout',
            note: '3×10 — control the rollout, don\'t sag',
            type: 's',
            image: '\u{1F3A1}',
            formGuide: 'Kneel on floor, hold ab wheel. Roll forward slowly, core braced. Go as far as you can without back sagging. Pull back using abs. If you can\'t control it, do crunches instead.',
            levels: [
              { a: '3×8 half-rollouts',    b: '3×8 half-rollouts',    label: 'L1 — Learn'       },
              { a: '3×10 full rollouts',   b: '3×10 full rollouts',   label: 'L2 — Full ROM'    },
              { a: '3×12 full rollouts',   b: '3×12 full rollouts',   label: 'L3 — Advanced'    },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────────
      //  THURSDAY — CARDIO + MOBILITY
      // ─────────────────────────────────────────────
      {
        id: 'thu',
        weekday: 'Thursday',
        type: 'Cardio + Mobility',
        isRest: false,
        name: 'Cardio & Mobility Day',
        focus: 'Conditioning · Mobility · Flexibility',
        tip: 'This is active recovery. Keep cardio at a conversational pace. The mobility flow is the main event — don\'t rush through it.',
        exercises: [
          {
            name: 'Cardio Run/Bike',
            note: '20–25 min — 5 min easy, 15 min moderate, 5 min easy',
            type: 's',
            image: '\u{1F3C3}',
            formGuide: 'First 5 min: easy pace (conversational). Middle 15 min: push pace (7-8/10 effort, can speak a few words). Last 5 min: easy cooldown. Treadmill, bike, or outdoor run your choice.',
            levels: [
              { a: '20 min — steady',      b: '20 min — steady',      label: 'L1 — Build'       },
              { a: '22 min — moderate push',b: '22 min — moderate',   label: 'L2 — Extend'      },
              { a: '25 min — push pace',   b: '25 min — push pace',   label: 'L3 — Full'        },
            ],
          },
          {
            name: 'Hip 90/90 Stretch',
            note: '2 min each side — sit in 90/90 position, lean forward',
            type: 's',
            image: '\u{1F9B5}',
            formGuide: 'Sit with both knees bent at 90°, front leg 90° externally rotated, back leg 90° internally rotated. Lean forward over front leg. Keep back straight. Breathe deep into the hip.',
            levels: [
              { a: '2 min — light lean',   b: '2 min — light lean',   label: 'L1 — Open'        },
              { a: '2 min — moderate lean',b: '2 min — moderate lean',label: 'L2 — Deeper'      },
              { a: '2 min — full lean',    b: '2 min — full lean',    label: 'L3 — Full ROM'    },
            ],
          },
          {
            name: 'Thoracic Spine Rotation',
            note: '1 min each side — 90/90 position, rotate torso',
            type: 's',
            image: '\u{1F9CD}',
            formGuide: 'Side lying, knees stacked at 90°, arms extended. Rotate top arm overhead keeping hips stacked. Follow hand with eyes. Breathe and relax into the stretch.',
            levels: [
              { a: '1 min each — moderate rotation', b: '1 min each — moderate', label: 'L1 — Mobilize' },
              { a: '1 min each — deeper rotation',   b: '1 min each — deeper',   label: 'L2 — Open'    },
              { a: '1 min each — full rotation',     b: '1 min each — full',     label: 'L3 — Full ROM'},
            ],
          },
          {
            name: 'Pigeon Pose',
            note: '2 min each side — front leg bent, back leg straight',
            type: 's',
            image: '\u{1F9D8}',
            formGuide: 'Front knee bent at 90° in front of hip. Back leg straight behind. Fold forward over front leg. Keep hips square. Breathe into the glute and hip of the front leg. Switch sides.',
            levels: [
              { a: '2 min — slight fold',  b: '2 min — slight fold',  label: 'L1 — Gentle'      },
              { a: '2 min — deeper fold',  b: '2 min — deeper fold',  label: 'L2 — Stretch'     },
              { a: '2 min — full fold',    b: '2 min — full fold',    label: 'L3 — Deep'        },
            ],
          },
          {
            name: 'Shoulder Dislocations',
            note: '2 min — band or stick, wide grip to overhead and back',
            type: 's',
            image: '\u{1F9F8}',
            formGuide: 'Hold band/stick with wide grip in front of hips. Keep arms straight. Bring it overhead and behind. Control the movement — don\'t force. Narrow grip as mobility improves.',
            levels: [
              { a: '2 min — wide grip',    b: '2 min — wide grip',    label: 'L1 — Open'        },
              { a: '2 min — moderate grip',b: '2 min — moderate grip',label: 'L2 — Progress'    },
              { a: '2 min — narrow grip',  b: '2 min — narrow grip',  label: 'L3 — Full ROM'    },
            ],
          },
          {
            name: 'Deep Squat Hold',
            note: '2 min — hold at bottom, elbows pushing knees out',
            type: 's',
            image: '\u{1F9B5}',
            formGuide: 'Go to bottom of squat, feet flat. Push elbows against knees to open hips. Keep chest up, heels down. Relax and breathe. Use this time to open the hips and ankles.',
            levels: [
              { a: '2 min — assisted',     b: '2 min — assisted',     label: 'L1 — Build'       },
              { a: '2 min — unassisted',   b: '2 min — unassisted',   label: 'L2 — Hold'        },
              { a: '2 min — unassisted + weight shift', b: '2 min — unassisted', label: 'L3 — Advanced' },
            ],
          },
          {
            name: 'Full Body Foam Roll',
            note: '5 min — quads, hamstrings, glutes, upper back, lats',
            type: 's',
            image: '\u{1F9F8}',
            formGuide: 'Take 5 min to roll major muscle groups. Spend 30-45 sec per area. Move slowly. DON\'T roll lower back. Focus on quads, hamstrings, glutes, lats, and upper back.',
            levels: [
              { a: '5 min — light pressure', b: '5 min — light',      label: 'L1 — Release'     },
              { a: '5 min — moderate',      b: '5 min — moderate',    label: 'L2 — Deep'        },
              { a: '5 min — deep + targeted', b: '5 min — deep',      label: 'L3 — Full Recover'},
            ],
          },
        ],
      },

      // ─────────────────────────────────────────────
      //  FRIDAY — FULL BODY
      // ─────────────────────────────────────────────
      {
        id: 'fri',
        weekday: 'Friday',
        type: 'Full Body',
        isRest: false,
        name: 'Full Body Day',
        focus: 'Deadlift · Pull-ups · Press · Legs',
        tip: 'Deadlifts first while CNS is fresh. Keep rest 2-3 min between deadlift sets. Farmer carries are a great finisher for grip and core.',
        exercises: [
          {
            name: 'Deadlift',
            note: '4×6–8 — brace hard, push floor away',
            type: 's',
            image: '\u{1F3CB}\uFE0F',
            formGuide: 'Bar over midfoot, grip just outside knees. Chest up, brace core. Push floor away. At lockout squeeze glutes without hyperextending. Lower controlled. Bar stays in contact with legs.',
            levels: [
              { a: '4×6 @ 80kg',           b: '4×6 @ 80kg',           label: 'L1 — Form Focus'  },
              { a: '4×7 @ 90kg',           b: '4×7 @ 90kg',           label: 'L2 — Build'       },
              { a: '4×8 @ 100kg',          b: '4×8 @ 100kg',          label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Weighted Pull-ups',
            note: '4×6–8 — add weight, stay strict',
            type: 's',
            image: '\u26A1',
            formGuide: 'Attach weight or hold DB between legs. Chest to bar, elbows down. No kipping. Full dead hang at bottom. If you can\'t get 6 reps, reduce weight.',
            levels: [
              { a: '4×6 bodyweight',       b: '4×6 bodyweight',       label: 'L1 — Build'       },
              { a: '4×7 +5kg',             b: '4×7 +5kg',             label: 'L2 — Progress'    },
              { a: '4×8 +10kg',            b: '4×8 +10kg',            label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Dumbbell Bench Press',
            note: '3×10–12 — control the negative, full ROM',
            type: 's',
            image: '\u{1F3CB}\uFE0F',
            formGuide: 'Lie back with DBs at shoulders. Press up and together slightly at top. Lower with elbows at 75°. Touch DBs to shoulders at bottom. Don\'t arch excessively. Control every rep.',
            levels: [
              { a: '3×10 @ 18kg',          b: '3×10 @ 18kg',          label: 'L1 — Light'       },
              { a: '3×11 @ 22kg',          b: '3×11 @ 22kg',          label: 'L2 — Moderate'    },
              { a: '3×12 @ 26kg',          b: '3×12 @ 26kg',          label: 'L3 — Heavy'       },
            ],
          },
          {
            name: 'Bulgarian Split Squat',
            note: '3×10 each — back foot elevated, front foot forward',
            type: 's',
            image: '\u{1F9B5}',
            formGuide: 'Back foot on bench, front foot far enough for 90° knee bend. Lower until front thigh parallel to floor. Drive up through front heel. Keep torso upright. Add DBs for weight.',
            levels: [
              { a: '3×10 each — bodyweight', b: '3×10 each — BW',     label: 'L1 — Learn'       },
              { a: '3×10 each — 8kg DBs',  b: '3×10 each — 8kg',     label: 'L2 — Weighted'    },
              { a: '3×10 each — 14kg DBs', b: '3×10 each — 14kg',    label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Face Pulls',
            note: '3×15 — external rotation focus, squeeze rear delts',
            type: 's',
            image: '\u{1F3AF}',
            formGuide: 'Cable at upper-chest height with rope. Pull to face separating rope at end. Externally rotate shoulders — "break the rope apart." Squeeze rear delts for 2 sec. Posture fix.',
            levels: [
              { a: '3×15 light',           b: '3×15 light',           label: 'L1 — Rehab'       },
              { a: '3×15 moderate',        b: '3×15 moderate',        label: 'L2 — Control'     },
              { a: '3×15 heavier + hold',  b: '3×15 heavier + hold',  label: 'L3 — Strong'      },
            ],
          },
          {
            name: 'Farmer Carries',
            note: '3×30 sec — heavy DBs, tall posture, core braced',
            type: 's',
            image: '\u{1F3C3}',
            formGuide: 'Hold heavy DBs at sides. Stand tall, shoulders back and down. Brace core. Walk with short, controlled steps. Keep body as still as possible. Breathe steadily. Go heavy.',
            levels: [
              { a: '3×30 sec — 20kg each', b: '3×30 sec — 20kg each', label: 'L1 — Light'       },
              { a: '3×30 sec — 28kg each', b: '3×30 sec — 28kg each', label: 'L2 — Moderate'    },
              { a: '3×30 sec — 36kg each', b: '3×30 sec — 36kg each', label: 'L3 — Heavy'       },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────────
      //  SATURDAY — REST
      // ─────────────────────────────────────────────
      {
        id: 'sat',
        weekday: 'Saturday',
        type: 'Rest',
        isRest: true,
        name: 'Rest Day',
        focus: 'Recovery · Nutrition · Sleep',
        tip: 'Muscle grows on rest days, not in the gym. Eat well, sleep 8 hours, and enjoy that dal bhat guilt-free.',
        restActivities: [
          { icon: '\u{1F6B6}', name: 'Walk only — no training',            note: 'Light activity keeps blood flowing. 20 min max. Don\'t do anything intense.' },
          { icon: '\u{1F634}', name: 'Sleep 8 hours',                      note: 'Prioritize sleep above everything. Growth hormone peaks during deep sleep.' },
          { icon: '\u{1F958}', name: 'Eat as much dal bhat as possible',    note: 'Carbs replenish glycogen. Protein repairs muscle. Enjoy the food.' },
          { icon: '\u{1F4A7}', name: 'Hydrate — 3L+ water',                note: 'Recovery needs water. Flush out metabolic waste from the week.' },
          { icon: '\u{1F4D3}', name: 'Log your week & plan next',          note: 'Review weights, reps, how you felt. Set goals for next week.' },
        ],
      },
    ],
    warmups: {
      sun: {
        duration: '8 min',
        items: [
          { name: 'Jump rope or jog',    duration: '3 min',                note: 'Get heart rate up, warm up the whole body' },
          { name: 'Arm circles',         duration: '30 sec each direction', note: 'Forward then backward, full range' },
          { name: 'Band pull-aparts',    duration: '3×15',                 note: 'Activate rear delts and rotator cuff' },
          { name: 'Scapular pushups',    duration: '2×10',                 note: 'Scap retraction and protraction, no arm bend' },
          { name: 'Wrist circles',       duration: '30 sec',               note: 'Both directions, prep for pressing' },
        ],
      },
      mon: {
        duration: '8 min',
        items: [
          { name: 'Bike or jog',         duration: '3 min',                note: 'Elevate heart rate, warm up legs' },
          { name: 'Hip circles',         duration: '30 sec each direction', note: 'Open the hip capsule' },
          { name: 'Bodyweight squats',   duration: '2×15',                 note: 'Full depth, 2 sec down, 1 sec up' },
          { name: 'Leg swings',          duration: '10 each direction',    note: 'Front-back then side-side, controlled' },
          { name: 'Ankle rotations',     duration: '30 sec',               note: 'Both directions, crucial for squat depth' },
        ],
      },
      wed: {
        duration: '8 min',
        items: [
          { name: 'Light jog',           duration: '3 min',                note: 'Easy pace — get blood flowing' },
          { name: 'Wrist warmup circles',duration: '1 min',               note: 'Both directions, full range' },
          { name: 'Shoulder rotations',  duration: '30 sec',               note: 'Big backward circles' },
          { name: 'Dead hang',           duration: '3×20 sec',             note: 'Passive hang, decompress spine' },
          { name: 'Cat-cow',             duration: '10 reps',              note: 'Spine mobility, wake up the core' },
        ],
      },
      thu: {
        duration: '5 min',
        items: [
          { name: 'Easy pace cardio',    duration: '5 min',                note: 'First 5 min of cardio at conversational pace' },
          { name: 'Hip circles',         duration: '30 sec each',          note: 'Open hips for mobility flow' },
          { name: 'Arm circles',         duration: '30 sec each direction', note: 'Loosen shoulders for mobility work' },
        ],
      },
      fri: {
        duration: '8 min',
        items: [
          { name: 'Light jog',           duration: '3 min',                note: 'Easy pace — get blood flowing' },
          { name: 'Full body dynamic stretch', duration: '2 min',          note: 'Leg swings, torso twists, arm circles' },
          { name: 'Bodyweight squats',   duration: '2×10',                 note: 'Full depth, warm up hips and knees' },
          { name: 'Push-ups',            duration: '2×10',                 note: 'Warm up chest, shoulders, triceps' },
        ],
      },
    },
  },
};

// ─── ACTIVE PLAN MANAGEMENT ─────────────────────────────────────────────────
let DAYS = [];
let WARMUPS = {};

function getActivePlanId() {
  return localStorage.getItem('gymbro_active_plan') || 'calisthenics';
}

function getActivePlan() {
  return PLANS[getActivePlanId()] || PLANS.calisthenics;
}

function applyPlan(planId) {
  const plan = PLANS[planId];
  if (!plan) return;
  DAYS = plan.days;
  WARMUPS = plan.warmups;
  localStorage.setItem('gymbro_active_plan', planId);
}

// Initialize from saved preference
(function initPlan() {
  applyPlan(getActivePlanId());
})();
