const NEPALI_MONTHS = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

const NEPALI_YEARS = {
  2082: [30, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2083: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [30, 31, 31, 32, 31, 31, 30, 30, 29, 29, 30, 30],
  2085: [30, 31, 31, 32, 31, 31, 30, 30, 29, 30, 29, 30],
};

const REFERENCE = { year: 2082, month: 0, day: 1 };
const REF_GREGORIAN = new Date(2025, 3, 16);

function toNepali(date) {
  const diffDays = Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()) - REF_GREGORIAN) / 86400000);
  let remaining = diffDays;
  let year = REFERENCE.year;
  let monthIdx = REFERENCE.month;
  let day = REFERENCE.day;

  while (remaining > 0) {
    const yearData = NEPALI_YEARS[year];
    if (!yearData) break;
    let yearDays = yearData.reduce((a, b) => a + b, 0);
    if (remaining >= yearDays && monthIdx === 0 && day === 1) {
      remaining -= yearDays;
      year++;
      continue;
    }
    let monthDays = yearData[monthIdx];
    let canAdd = Math.min(remaining, monthDays - day + 1);
    day += canAdd;
    remaining -= canAdd;
    if (day > monthDays) {
      day = 1;
      monthIdx++;
      if (monthIdx >= 12) {
        monthIdx = 0;
        year++;
      }
    }
  }

  while (remaining < 0) {
    monthIdx--;
    if (monthIdx < 0) {
      monthIdx = 11;
      year--;
    }
    const yearData = NEPALI_YEARS[year];
    if (!yearData) break;
    day += yearData[monthIdx];
    remaining++;
  }

  return { year, month: monthIdx + 1, monthName: NEPALI_MONTHS[monthIdx], day };
}

function getNepaliDateString(date) {
  const n = toNepali(date);
  return `${n.monthName} ${n.day}, ${n.year} BS`;
}

function getNepaliDateShort(date) {
  const n = toNepali(date);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  return `${weekday} · ${n.monthName.slice(0, 3).toUpperCase()} ${n.day}, ${n.year} BS`;
}
