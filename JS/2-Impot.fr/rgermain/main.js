const result = document.getElementById('result')
const result2 = document.getElementById('result-revenue')

function colors(idx) {
    return ["purple", "blue", "orange", "yellow", "red"][Math.floor(idx / 5)]
}

function constructTab(target, tranch, year) {

    const val = tranch.reduce((tab, el, idx) => {
        const v =  `<div class="bg-${colors(idx)}-${idx % 5 + 4}00 h-16 flex justify-center items-center relative">
                    __min__
                    <span class="text-sm italic animate-pulse">
                        ${el.impot}€
                    </span>
                    <span class="mr-2 text-4xl font-bold tracking-tighter absolute right-0 text-tab-percent">
                        ${el.coef}%
                    </span>
                </div>${tab}`
        const v2 = `<span class="font-extrabold tracking-tighter text-tab rounded-md shaodw-sm">${el.min}€</span>`
        return v.replace('__min__', (idx ? v2 : ""))
        }, "")
    target.innerHTML = `<h1 class="text-3xl text-gray-700 text-center">recap ${year}</h1>${val}`
}

// formulaire pour calculer le taux dimposition
const form = document.getElementById('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    const from = new FormData(e.target)

    // nombre de part du quotient familial
    // multiplie de nombre d'enfant par 0.5 si inferieur ou egal a 2 enfant
    // ou on eneleve une part ( is 3 enfant == 3 - 1 donc 2)
    let enfants = parseInt(from.get('enfants'))
    enfants = (enfants > 2 ? enfants - 1 : enfants *= 0.5)
    
    const quotient = parseInt(from.get('situation')) + enfants
    debug('quotient', quotient)

    // revenue
    const revenue = parseInt(from.get('revenue'))
    debug('revenue', revenue)

    // on calcule l'impot et on le multiplie par le quotient
    const [impot2020, tranch2020] = calculImpot(part2020, revenue, quotient)
    const [impot2019, tranch2019] = calculImpot(part2019, revenue, quotient)

    debug('impot 2020', impot2020)
    debug('vos tranche 2020', tranch2020)
    debug('impot 2019', impot2019)
    debug('vos tranche  2019', tranch2019)


    /*
    ** ------- front -------
    */
    result.classList.remove('hidden')
    document.getElementById('2020').innerText = `${impot2020}€`
    document.getElementById('2019').innerText = `${impot2019}€`
    document.getElementById('quotient').innerText = `${quotient} part`

    const diff = impot2019 - impot2020
    if (diff > 0) {
        document.getElementById('diff').innerText = `gagnez ${diff}€`
    } else if (diff < 0) {
        document.getElementById('diff').innerText = `perdu ${diff}€`
    } else {
        document.getElementById('diff').innerText = `rien gagnez ... ${revenue < 500 ? " et rien foutue ..." : ""}`
    }
    constructTab(resultTranch2020, tranch2020, "2020")
    constructTab(resultTranch2019, tranch2019, "2019")

})

// formulaire pour calculer le revenue
const from2 = document.getElementById('form-revenue')
from2.addEventListener('submit', e => {
    e.preventDefault()

    const from = new FormData(e.target)
    
    let enfants = parseInt(from.get('enfants'))
    enfants = (enfants > 2 ? enfants - 1 : enfants *= 0.5)
    
    const quotient = parseInt(from.get('situation')) + enfants
    debug('quotient', quotient)

    // revenue
    const impot = parseInt(from.get('impot'))
    debug('impot', impot)

    // on calcule l'impot et on le multiplie par le quotient
    const [revenue2020, tranch2020] = calculeReverse(part2020, impot, quotient)
    const [revenue2019, tranch2019] = calculeReverse(part2019, impot, quotient)

    debug('revenue 2020', revenue2020)
    debug('vos tranche 2020', tranch2020)
    debug('revenue 2019', revenue2019)
    debug('vos tranche  2019', tranch2019)

        /*
    ** ------- front -------
    */
   result2.classList.remove('hidden')
   document.getElementById('2020-revenue').innerText = `${revenue2020}€`
   document.getElementById('2019-revenue').innerText = `${revenue2019}€`
   document.getElementById('quotient-revenue').innerText = `${quotient} part`

   const diff = revenue2019 - revenue2020
   if (diff > 0) {
       document.getElementById('diff-revenue').innerText = `perdu ${Math.abs(diff)}€`
   } else if (diff < 0) {
       document.getElementById('diff-revenue').innerText = `gagnez ${Math.abs(diff)}€`
   } else {
       document.getElementById('diff-revenue').innerText = `rien gagnez ... ${revenue < 500 ? " et rien foutue ..." : ""}`
   }
   constructTab(resultTranchRevenue2020, tranch2020, "2020")
   constructTab(resultTranchRevenue2019, tranch2019, "2019")
})