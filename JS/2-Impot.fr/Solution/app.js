export const RATES_2020 = [
  {
    max: 10064,
    rate: 0
  }, {
    max: 25659,
    rate: .11
  }, {
    max: 73369,
    rate: .30
  }, {
    max: 157806,
    rate: .41
  }, {
    max: Infinity,
    rate: .45
  }
]

export const RATES_2019 = [
  {
    max: 10064,
    rate: 0
  }, {
    max: 27794,
    rate: .14
  }, {
    max: 74517,
    rate: .30
  }, {
    max: 157806,
    rate: .41
  }, {
    max: Infinity,
    rate: .45
  }
]

/**
 * Arrondit un nombre
 *
 * @param n
 * @param decimal
 * @returns {number}
 */
function round (n, decimal) {
  return Math.round(n * (10 ** decimal)) / (10 ** decimal)
}

/**
 * Calcul la quantité d'imposition par rapport au tranche
 *
 * @param {number} revenue
 * @param {array} rates
 * @returns {number}
 */
export function impot (revenue, rates = RATES_2020) {
  const tranches = impotWithTranches(revenue, rates)
  return tranches.reduce((acc, tranche) => acc + tranche, 0)
}


/**
 * Calcul la quantité d'imposition par rapport au tranche
 *
 * @param {number} revenue
 * @param {array} rates
 * @returns {number[]}
 */
export function impotWithTranches (revenue, rates = RATES_2020) {
  const tranches = []
  for (const index in rates) {
    const rate = rates[index]
    const min = rates[index - 1] ? rates[index - 1].max + 1 : 0
    if (revenue > rate.max) {
      tranches.push(round((rate.max - min) * rate.rate, 2))
    } else {
      tranches.push(round((revenue - min) * rate.rate, 2))
      break
    }
  }
  return [...tranches, ...new Array(rates.length - tranches.length).fill(0)]
}


/**
 * Calcul le nombre de part d'un couple
 *
 * @param isMarried
 * @param children
 */
export function getParts (isMarried = false, children = 0) {
  return (isMarried ? 2 : 1) + (children * .5)
}

/**
 * Calcul l'impot avec les part
 *
 * @param {number} revenues
 * @param {number} part
 * @param {array} rates
 */
export function impotWithPart (revenues, part, rates = RATES_2020) {
  return Math.round(part * impot(revenues / part, rates))
}

export function impotReversed (value, rates = RATES_2020) {
  const reversedTranches = rates.map(rate => {
    const due = impot(rate.max, rates)
    return {
      ...rate,
      impot: due,
      rest: rate.max === Infinity ? Infinity : rate.max - impot(rate.max, rates),
    }
  })
  let index = reversedTranches.findIndex(tranche => value < tranche.max)
  console.log(reversedTranches, index)
  const rest = value - reversedTranches[index - 1].max
  return value + rest / (1 - reversedTranches[index - 1].rate)
}
