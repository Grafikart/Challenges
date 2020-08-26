/*
** init
*/

const impotBtn = document.getElementById('impot')
const revenueBtn = document.getElementById('revenue')
const impotTarget = document.querySelector(document.getElementById('impot').dataset.target)
const revenueTarget = document.querySelector(document.getElementById('revenue').dataset.target)

const resultTranch2020 = document.getElementById('recap-2020')
const resultTranch2019 = document.getElementById('recap-2019')

const resultTranchRevenue2020 = document.getElementById('recap-2020-revenue')
const resultTranchRevenue2019 = document.getElementById('recap-2019-revenue')

impotBtn.addEventListener('click', () => {
    impotBtn.classList.add('border-blue-700')
    impotBtn.classList.remove('border-transparent')

    revenueBtn.classList.remove('border-blue-700')
    revenueBtn.classList.add('border-transparent')

    impotTarget.classList.remove('hidden')
    revenueTarget.classList.add('hidden')

    resultTranch2020.classList.remove('hidden')
    resultTranch2019.classList.remove('hidden')
    resultTranchRevenue2020.classList.add('hidden')
    resultTranchRevenue2019.classList.add('hidden')
})

revenueBtn.addEventListener('click', () => {
    revenueBtn.classList.add('border-blue-700')
    revenueBtn.classList.remove('border-transparent')

    impotBtn.classList.remove('border-blue-700')
    impotBtn.classList.add('border-transparent')
    
    revenueTarget.classList.remove('hidden')
    impotTarget.classList.add('hidden')

    resultTranch2020.classList.add('hidden')
    resultTranch2019.classList.add('hidden')
    resultTranchRevenue2020.classList.remove('hidden')
    resultTranchRevenue2019.classList.remove('hidden')
})
