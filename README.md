# 💪 Gym Bro — Calisthenics Training Tracker

A luxury dark-gold fitness web app built for two brothers training calisthenics together in Nepal. Tracks workouts, progressions, comments and session notes — fully offline.

---

## 🗂️ Project Structure

```
gym-bro/
├── index.html          ← Training tracker (main page)
├── learning.html       ← Full-stack dev roadmap checklist
│
├── css/
│   ├── base.css        ← Shared: design tokens, nav, cursor, reset
│   ├── index.css       ← Tracker page styles
│   └── learning.css    ← Roadmap page styles
│
├── js/
│   ├── data.js         ← ✏️ EDIT THIS to change exercises
│   ├── storage.js      ← localStorage helpers (shared)
│   ├── nav.js          ← Hamburger menu + custom cursor (shared)
│   ├── index.js        ← Tracker page logic
│   └── learning.js     ← Roadmap checklist logic
│
├── sw.js               ← Service worker (offline PWA)
├── manifest.json       ← PWA manifest (install to home screen)
├── vercel.json         ← Vercel deployment config
└── package.json
```

---

## 🏋️ The Athletes

| | Athlete A | Athlete B |
|---|---|---|
| **Weight** | 71 kg | 100 kg |
| **Level** | Beginner | Comeback |
| **Focus** | Building foundation, learning form | Shoulder rehab — 3 months off |
| **Restriction** | Form before reps | NO overhead pressing, NO dips past 90° |

---

## 📅 Weekly Schedule

| Day | Training |
|---|---|
| **Monday** | Push Day — Chest · Triceps · Safe Press |
| **Tuesday** | 😴 REST + Rehab — Shoulder work for B |
| **Wednesday** | Pull Day — Back · Biceps · Scapular Health |
| **Thursday** | Core & Skill Day — Abs · Stability · Control |
| **Friday** | 😴 REST + Rehab — Flexibility · Recovery |
| **Saturday** | Leg Day — Glutes · Hamstrings · Power |
| **Sunday** | Full Body Flow — Endurance · Conditioning |

---

## 🔓 Progression System

Every exercise has **3 levels** (L1 → L2 → L3). The app tracks your streak:

- Tick an exercise for **3 consecutive weeks** → next level unlocks automatically
- A toast notification appears when you level up
- Each level shows current reps for A and B separately

---

## 🚀 Deploy to Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/gym-bro.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project** → Import from GitHub
3. Select your repo → click **Deploy**

---

## ✏️ How to Change Exercises

Open **`js/data.js`** — it's a clean, well-commented config file.

Each day looks like this:

```js
{
  id: 'mon',
  weekday: 'Monday',
  type: 'Push Day',
  isRest: false,
  name: 'Push Strength',
  focus: 'Chest · Triceps · Safe Press',
  tip: 'Your coaching tip here...',
  exercises: [
    {
      name: 'Exercise name',
      note: 'Form tip shown below the name',
      type: 'ab',    // 'ab' = different for A and B, 's' = same (shared)
      levels: [
        { a: '3×8',  b: '3×10',  label: 'L1 — Foundation' },
        { a: '3×12', b: '3×15',  label: 'L2 — Volume'     },
        { a: '3×15', b: 'weighted', label: 'L3 — Strength' },
      ],
    },
  ],
}
```

For rest days, use `isRest: true` and add `restActivities` instead of `exercises`.

---

## 📱 Offline / PWA

The app works **fully offline** after the first visit on WiFi:

- All HTML, CSS, JS and fonts are cached by the service worker
- Checkboxes, notes, comments and progression data save to `localStorage`
- You can **install the app** on your phone's home screen (PWA)

---

## 🎨 Design

- **Fonts:** Cormorant Garamond (serif, headings) + Montserrat (sans, body)
- **Color palette:** Luxury dark gold — `#111010` background, `#b8960c` gold accent
- **Athlete A:** Purple (`#b39ddb`)
- **Athlete B:** Teal (`#80cbc4`)
- **Custom cursor:** Gold dot + ring on desktop
- **Noise overlay:** Subtle film grain texture
- **Mobile:** Full hamburger menu, responsive grids, pill labels stack below exercise name

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML, CSS, JS — no framework |
| Styles | Custom CSS with CSS variables (no Tailwind needed) |
| Storage | Browser localStorage (offline-first) |
| Offline | Service Worker + PWA manifest |
| Deploy | Vercel (free tier) |

---

## 👥 Built For

Two brothers — a 71 kg beginner and a 100 kg comeback athlete — training calisthenics together in Nepal. 🇳🇵💪
