const today = immutDate(new Date());

export const Events = [
  {
    name: "All day event",
    type: "doctor",
    fullDay: true,
    start: today.setDate(29).addMonth(-1).target,
    end: today.setDate(2).target,
  },
  {
    name: "FullWeeks",
    fullDay: true,
    type: "holidays",
    start: today.setDate(1).target,
    end: today.setDate(13).target,
  },
  {
    name: "a",
    fullDay: true,
    start: today.setDate(3).target,
    end: today.setDate(6).target,
  },
  {
    name: "b",
    fullDay: true,
    start: today.setDate(5).target,
    end: today.setDate(8).target,
  },
  {
    name: "Long Event",
    fullDay: true,
    start: today.setDate(7).target,
    end: today.setDate(10).target,
  },
  {
    name: "SemiLong Event super long",
    fullDay: true,
    start: today.setDate(8).target,
    end: today.setDate(9).target,
  },
  {
    name: "Repeating event",
    type: "holidays",
    start: today.setDate(9).setHours(16).target,
    end: today.setDate(9).setHours(17).target,
  },
  {
    name: "Conference",
    fullDay: true,
    start: today.setDate(19).target,
    end: today.setDate(20).target,
  },
  {
    name: "Meeting",
    start: today.setDate(20).setHours(10).target,
    end: today.setDate(20).setHours(11).target,
  },
  {
    name: "Lunch",
    start: today.setDate(20).setHours(12).target,
    end: today.setDate(20).setHours(13).target,
  },
  {
    name: "Birthday",
    start: today.setDate(21).setHours(7).target,
    end: today.setDate(21).setHours(7).target,
  },
  {
    name: "Day event",
    fullDay: true,
    start: today.setDate(28).target,
    end: today.setDate(28).target,
  },
];

/**
 * @typedef {{
 *    target: Date,
 *    setMonth: (n: number) => ImmutableDate,
 *    addMonth: (n: number) => ImmutableDate,
 *    setDate: (n: number) => ImmutableDate,
 *    setHours: (n: number) => ImmutableDate,
 *  }} ImmutableDate
 */

/**
 * Crée un proxy pour transformer une date en immutable
 *
 * @param {Date} date
 * @return {ImmutableDate}
 */
function immutDate(date) {
  const immutableHandler = {
    get(target, props) {
      if (props === "target") {
        return target;
      }
      if (typeof props === "string" && props.startsWith("set")) {
        return function (...args) {
          const date = new Date(target);
          Reflect.get(date, props).apply(date, args);
          return new Proxy(date, immutableHandler);
        };
      }
      if (typeof props === "string" && props.startsWith("add")) {
        return function (n) {
          const date = new Date(target);
          Reflect.get(date, props.replace("add", "set")).apply(date, [
            Reflect.get(date, props.replace("add", "get")).apply(date) + n,
          ]);
          return new Proxy(date, immutableHandler);
        };
      }
      const value = Reflect.get(...arguments);
      return typeof value == "function" ? value.bind(target) : value;
    },
  };
  return new Proxy(date, immutableHandler);
}
