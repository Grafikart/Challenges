const weekStartsOn = 1;

const dayMs = 86400000;

/**
 * Renvoie un identifiant unique pour un jour
 * @param {Date} date
 * @returns {string}
 */
export function dayId(date) {
  return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

/**
 * Renvoie la date en début de semaine
 * @param {Date} date
 * @returns {Date}
 */
export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Renvoie la date en fin de semaine
 * @param {Date} date
 * @returns {Date}
 */
export function endOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  d.setDate(d.getDate() + diff);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Renvoie la date en fin de mois
 * @param {Date} date
 * @returns {Date}
 */
export function endOfMonth(date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Ajoute plusieurs jours à une date
 * @param {Date} date
 * @param {number} n
 * @returns {Date}
 */
export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/**
 * Renvoie les jours compris entre les 2 dates
 * @param {Date} start
 * @param {Date} end
 * @returns {Date[]}
 */
export function daysBetween(start, end) {
  if (start > end) {
    throw new Error(
      "La date de début ne peut pas être supérieur à la date de fin",
    );
  }
  const days = [];
  let cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);
  while (cursor < end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

/**
 * Trouve le nombre de jours (calendrier) entre 2 dates
 * @param {Date} end
 * @param {Date} start
 * @returns {number}
 */
export function diffInDays(end, start) {
  const b = new Date(end);
  b.setHours(23, 59, 59, 999);
  const a = new Date(start);
  a.setHours(0, 0, 0, 0);
  return Math.round((b.getTime() - a.getTime()) / dayMs);
}

/**
 * Trouve la date la plus loin dans le temps
 * @param {Date[]} dates
 */
export function minDates(dates) {
  if (dates.length === 0) {
    throw new Error("Impossible de trouver le minimum sans dates");
  }
  let min = dates[0];
  for (const date of dates) {
    if (date < min) {
      min = date;
    }
  }
  return min;
}
