import { getParts, impot, impotWithPart, impotWithTranches, RATES_2020, impotReversed } from './app.js'

const revenusInput = document.getElementById('revenues')
const impotText = document.getElementById('impot')
const resultInput = document.getElementById('result')
const rateText = document.getElementById('rate')
const coupleCheckbox = document.getElementById('couple')
const childrenInput = document.getElementById('children')
const tableBody = document.getElementById('tbody')
const trancheCells = [];
let direction = 1; // Direction du calcul

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  currency: 'EUR',
  style: 'currency',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})
const numberFormat = new Intl.NumberFormat('fr-FR')
const percentFormat = new Intl.NumberFormat('fr-FR', { style: 'percent' })

function handleChange(e = null) {
  // On définit la direction du calcul
  if (e && e.target === resultInput) {
    direction = -1
  } else if (e === null || e.target === revenusInput) {
    direction = 1
  }
  const sourceInput = direction === 1 ? revenusInput : resultInput
  const targetInput = direction === 1 ? resultInput : revenusInput
  let value = parseFloat(sourceInput.value)
  if (Number.isNaN(value)) {
    return;
  }
  // On calcul le nbre de part
  const parts = getParts(coupleCheckbox.checked, parseInt(childrenInput.value, 10))
  let impotValue
  if (direction === 1) {
    impotValue = impotWithPart(value, parts)
    targetInput.value = value - impotValue
  } else {
    const revenusBeforeImpot = impotReversed(value, parts)
    targetInput.value = revenusBeforeImpot
    impotValue = revenusBeforeImpot - value
    value = revenusBeforeImpot
  }

  // On met à jour les texte avec le taux / et les chiffres
  impotText.innerText = currencyFormatter.format(impotValue)
  rateText.innerText = percentFormat.format(impotValue / value)
  resultInput.value = value - impotValue

  // On met à jour la valeur des tranches
  const tranches = impotWithTranches(value / parts)
  for (let index in tranches) {
    trancheCells[index].innerText = currencyFormatter.format(tranches[index])
  }
}

function buildTable() {
  const rates = RATES_2020
  for (const rate of rates) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${rate.max}</td>
      <td>${percentFormat.format(rate.rate)}</td>
      <td>0 €</td>
    `
    trancheCells.push(tr.lastElementChild)
    tableBody.appendChild(tr)
  }
}

revenusInput.addEventListener('input', handleChange)
coupleCheckbox.addEventListener('change', handleChange)
childrenInput.addEventListener('change', handleChange)
resultInput.addEventListener('input', handleChange)

buildTable()
handleChange()
