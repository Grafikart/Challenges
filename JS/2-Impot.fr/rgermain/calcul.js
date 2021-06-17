const DEBUG = true

function debug(text, value) {
    if (DEBUG) {
        console.log("debug:\n\t" + text + " = ", value)
    }
}

/* list des paliers d'impositions  2020 */
const part2020 = {
    "10064": 11,
    "25659": 30,
    "73369": 41,
    "157806": 45,
}

/* list des paliers d'impositions  2019 */
const part2019 = {
    "10064": 14,
    "27794": 30,
    "74517": 41,
    "157806": 45,
}

/*
**  sorry pour les fautes :D
*/


/*
    function pour calculer le revenue le taux d'imposiition part rapport au revenue
*/
function calculImpot(part, revenue, quotient) {

    /* on divise le revenue par le quotient */
    revenue /= quotient
    debug('revenue par le quotient', revenue)

    let total = 0 // sera le total a payer
    let tranch = [] // sera une liste des tranches avec la valeurs a payer

    const keys = Object.keys(part)

    for (let i = 0; i <= keys.length; i++) {
        
        let older = 0
        let coef = 0
        // check le premier element du tableu et remplace par 0
        if (i != 0) {
            // on ajout 1 a au palier precedent
            older = parseInt(keys[i - 1]) + 1
            coef = part[keys[i - 1]]
        }

        let diff
        if (i != keys.length) {
            // on fait la diff entre le pallier precedent et le palier actuelle
            diff = Math.abs(older - parseInt(keys[i]))
            // on soustrait le revenue - le palier precedent, en prenant au maximun le 0
            // si il vaut 0 c'est que le revenue est trop bas pour ce pallier    
            diff = Math.min(Math.max(revenue - older, 0), diff)
        } else {
            // cas pour le dernier
            diff = Math.max(revenue - older, 0)
        }
            
        // on multiplie la diff par le coef
        const impot = Math.round(diff  * coef / 100)

        // min  = palier min
        // impot = l'impot a payer pour cette tranche
        // coef = le coefitient d'imposiiton
        tranch.push({min: older, impot, coef})

        total += impot
    }
    // on mutiplie par le quotient, et on arondie
    total = Math.round(total * quotient)

    return [total, tranch]
}


/*
    function pour calculer le revenue a declarer part rapport a l'impot
*/
function calculeReverse(part, impot, quotient) {
    impot /= quotient
    debug('impot par le quotient', impot)

    let total = 0 // sera le total a avoir
    let tranch = [] // sera une liste des tranches avec la valeurs a payer
    let finish = false

    const keys = Object.keys(part)

    for (let i = 0; i <= keys.length; i++) {
        
        let older = 0
        let coef = 0
        // check le premier element du tableu et remplace par 0
        if (i != 0) {
            older = parseInt(keys[i - 1]) + 1
            coef = part[keys[i - 1]]
        }

        if (finish) {
            // uniquent pour le front
            tranch.push({min: older, impot: 0, coef})
        }
        else if (i == keys.length) {
            total = (impot * 100 / coef) + older
            tranch.push({min: older, impot: Math.round(impot) * quotient, coef})
        } else {
            const actual = parseInt(keys[i]) // convertie en int la clef
            const diff = Math.abs(older - actual)
            const maxImpot = diff * coef / 100

            if (maxImpot >= impot) {
                
                // on recupere le pourcentage de l'impot par rapport a l'impot maxium du palier
                const diffImpot = (maxImpot / impot)
                
                // on recupere la valuer real de ce pourcentage, et on l'additionne au total
                total = ((actual - older) / diffImpot) + older
                
                // on ajout le palier precedent
                tranch.push({min: older, impot: Math.round(impot) * quotient, coef})
                finish = true
            } else {
                impot = impot - maxImpot
                tranch.push({min: older, impot: Math.ceil(maxImpot) * quotient, coef})
            }
        }
    }
    // on mutiplie par le quotient, et on arondie
    total = Math.round(total * quotient)

    return [total, tranch]
}