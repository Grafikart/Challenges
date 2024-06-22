import { Events } from "../data.js";
import {
  addDays,
  dayId,
  daysBetween,
  diffInDays,
  endOfMonth,
  endOfWeek,
  minDates,
  startOfWeek,
} from "./date.js";

/**
 * @typedef {{name: string, start: Date, end: Date, fullDay?: boolean, type?: string}} CalendarEvent
 */

const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: "long" });
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

class Calendar {
  /** @type {Map<string, CalendarEvent[]>} */
  #eventsMap = new Map();

  /**
   * @param {HTMLElement} root Element sur lequel on monte le calendrier
   * @param {CalendarEvent[]} events Liste des évènements à afficher
   * @param {number} month Mois du calendrier (0 pour Janvier)
   * @param {number} year Année du calendrier
   */
  constructor(root, events, month, year) {
    this.#fillEventsMap(events);
    const startOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
    const start = startOfWeek(startOfMonth);
    const end = endOfWeek(endOfMonth(startOfMonth));
    const days = daysBetween(start, end);
    root.innerHTML = `<table class="calendar">
    <thead>
        <tr>
           ${Array.from(
             { length: 7 },
             (_, k) => `<th>${dayFormatter.format(addDays(start, k))}</th>`,
           ).join("")} 
        </tr>
    </thead>
    <tbody></tbody>
    </table>`;
    const tbody = root.querySelector("tbody");
    let tr = document.createElement("tr");
    /** @type {Map<CalendarEvent, number>} */
    const positionMap = new Map();
    for (const day of days) {
      tr.append(this.#buildCell(day, month, positionMap));
      if (day.getDay() === 0) {
        tbody.append(tr);
        tr = document.createElement("tr");
        positionMap.clear();
      }
    }
  }

  /**
   * Construit l'élément qui représente un jour
   * @param {Date} date
   * @param {number} month
   * @param {Map<CalendarEvent, number>} positionMap
   * @returns {HTMLTableCellElement}
   */
  #buildCell(date, month, positionMap) {
    const getAvailablePosition = () => {
      if (positionMap.size === 0) {
        return 0;
      }
      const positions = Array.from(positionMap.values());
      const max = Math.max(...positions);
      for (let i = 0; i < max; i++) {
        if (!positions.includes(i)) {
          return i;
        }
      }
      return max + 1;
    };
    const td = document.createElement("td");
    const isCurrentMonth = date.getMonth() === month;
    td.innerHTML = `<div class="calendar__cell">
            <div class="calendar__date ${isCurrentMonth ? "" : "calendar__date-diff"}">${date.getDate()}</div>
            <div class="calendar__events"></div>
        </div>`;
    const container = td.querySelector(".calendar__events");
    const idDate = dayId(date);
    const events = this.#eventsMap.get(idDate) ?? [];
    const finishedEvents = [];
    for (const event of events) {
      const classes = ["calendar__event"];
      if (event.type) {
        classes.push("calendar__event-" + event.type);
      }

      // On est au début d'un évènement sur plusieurs jours
      if (
        event.fullDay &&
        (idDate === dayId(event.start) || date.getDay() === 1)
      ) {
        const position = getAvailablePosition();
        positionMap.set(event, position);
        const endDate = minDates([event.end, endOfWeek(date)]);
        const days = diffInDays(endDate, date);
        if (idDate !== dayId(event.start)) {
          classes.push("calendar__event-overflow-left");
        }
        if (endDate !== event.end) {
          classes.push("calendar__event-overflow-right");
        }
        classes.push("calendar__event-fullday");
        container.insertAdjacentHTML(
          "beforeend",
          `<div 
                    class="${classes.join(" ")}"
                    style="--days:${days}; --offset: ${position}"
                    >
    ${event.name}
</div>`,
        );
      }

      if (event.fullDay && idDate === dayId(event.end)) {
        finishedEvents.push(event);
      }
      if (!event.fullDay) {
        classes.push("calendar__event-hour");
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="${classes.join(" ")}">
    <span>${timeFormatter.format(event.start)} - ${event.name}</span>
</div>`,
        );
      }
    }

    container.style.setProperty(
      "--offset",
      (Math.max(...positionMap.values()) + 1).toString(),
    );

    for (const event of finishedEvents) {
      positionMap.delete(event);
    }

    return td;
  }

  /**
   * @param {CalendarEvent[]} events
   */
  #fillEventsMap(events) {
    const sortedEvents = [...events].sort((a, b) =>
      a.start < b.start ? -1 : 1,
    );
    for (const event of sortedEvents) {
      const days = daysBetween(event.start, event.end);
      for (const day of days) {
        const id = dayId(day);
        this.#eventsMap.set(id, [...(this.#eventsMap.get(id) ?? []), event]);
      }
    }
  }
}

const c = new Calendar(
  document.getElementById("app"),
  Events,
  new Date().getMonth(),
  new Date().getFullYear(),
);
console.log(c);
