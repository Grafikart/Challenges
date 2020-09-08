import {getParts, impot, impotWithPart, impotWithTranches, RATES_2020} from './app.js'

const revenuesInput = document.getElementById('revenues')
const impotText = document.getElementById('impot')
const resultInput = document.getElementById('result')
const rateText = document.getElementById('rate')
const coupleCheckbox = document.getElementById('couple')
const childrenInput = document.getElementById('children')
const tableBody = document.getElementById('tbody')
const trancheCells = [];

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  currency: 'EUR',
  style: 'currency',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})
const numberFormat = new Intl.NumberFormat('fr-FR')
const percentFormat = new Intl.NumberFormat('fr-FR', {style: 'percent'})

function handleChange () {
  const value = parseFloat(revenuesInput.value)
  if (Number.isNaN(value)) {
    return ;
  }
  const parts = getParts(coupleCheckbox.checked, parseInt(childrenInput.value, 10))
  const impotValue = Math.round(impotWithPart(value, parts))
  impotText.innerText = currencyFormatter.format(impotValue)
  rateText.innerText = percentFormat.format(impotValue / value)
  resultInput.value = value - impotValue

  // Tranches
  const tranches = impotWithTranches(value / parts)
  for(let index in tranches) {
    trancheCells[index].innerText = currencyFormatter.format(tranches[index])
  }
}

function buildTable () {
  const rates = RATES_2020
  for(const rate of rates) {
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

revenuesInput.addEventListener('input', handleChange)
coupleCheckbox.addEventListener('change', handleChange)
childrenInput.addEventListener('change', handleChange)

buildTable()
handleChange()
