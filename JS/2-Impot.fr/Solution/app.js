export const RATES_2021 = [
  {
    max: 10084,
    rate: 0
  }, {
    max: 25710,
    rate: .11
  }, {
    max: 73516,
    rate: .30
  }, {
    max: 158122,
    rate: .41
  }, {
    max: Infinity,
    rate: .45
  }
]

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
function round(n, decimal) {
  return Math.round(n * (10 ** decimal)) / (10 ** decimal)
}

/**
 * Calcul la quantité d'imposition par rapport au tranche
 *
 * @param {number} revenue
 * @param {array} rates
 * @returns {number}
 */
export function impot(revenue, rates = RATES_2021) {
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
export function impotWithTranches(revenue, rates = RATES_2021) {
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
export function getParts(isMarried = false, children = 0) {
  return (isMarried ? 2 : 1) + (children * .5)
}

/**
 * Calcul l'impot avec les part
 *
 * @param {number} revenues
 * @param {number} part
 * @param {array} rates
 */
export function impotWithPart(revenues, part, rates = RATES_2021) {
  return Math.round(part * impot(revenues / part, rates))
}

/**
 * Calcul l'inversion de l'impot (trouve le revenu avant impot)
 *
 * @param {number} value
 * @param {array} rates
 */
export function impotReversed(value, parts = 1, rates = RATES_2021) {
  // On calcul l'impot associé au max de chaque branche
  const reversedTranches = rates.map(rate => {
    const due = impot(rate.max, rates)
    return {
      ...rate,
      impot: due,
      afterImpotMax: rate.max - due
    }
  })
  // On trouve dans quel tranche va se trouver l'utilisateur
  let index = reversedTranches.findIndex(tranche => value / parts < tranche.afterImpotMax)
  // On récupère les infos de la tranche courante et précédente
  const tranche = reversedTranches[index]
  let previousTranche = reversedTranches[index - 1];
  const previousTrancheImpot = previousTranche ? previousTranche.impot : 0
  const min = previousTranche ? previousTranche.max + 1 : 0
  return round( (value + previousTrancheImpot - min * tranche.rate) / (1 - tranche.rate), 2)
}
