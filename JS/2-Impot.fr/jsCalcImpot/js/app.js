//10064 => 0%
//25659 => 11%
//73 369 => 41%
// 157 807 => 45%
function calculationBarem(revenue){
    let montant =0;
    let t4 = 0;
    let t3 = 0;
    let t2 = 0;

    if (revenue >= 157807) {
        montant = revenue - 157807;
        t4 = tranche4(montant);
        montant = 157807 - 73369;

        t3 = tranche3(montant);
        montant = 73369 - 25659;

        t2 = tranche2(montant);

        return Math.round(t4 + t3 + t2 + tranche1());
    }

    if (revenue > 73369 && revenue <= 157807) {
        montant = revenue - 73369;
        t3 = tranche3(montant);
        montant = 73369 - 25659;

        t2 = tranche2(montant);

        return Math.round(t3 + t2 + tranche1());
    }

    if (revenue > 10064 && revenue <= 25659) {
        montant = revenue - 10064
        return Math.round(tranche2(montant) + tranche1());
    }

    if (revenue <= 10064){
        return tranche1();
    }
}

//Different palier, function permettant de faire les calculs de pourcentages
function tranche1 (){
    return 0;
}

function tranche2 (montant){
    return montant * 11 / 100;
}
function tranche3 (montant){
    return montant * 41 / 100;
}
function tranche4 (montant){
    return montant * 45 / 100;
}

test = calculationBarem(158000)
console.log(test)


document.getElementById("revenu").addEventListener("keyup", (event) => {
    revenu = document.getElementById("revenu").value;
    result = calculationBarem(revenu);
    document.getElementById("impot").value = result;
    document.getElementById("afterImpot").value = revenu - result;
});


