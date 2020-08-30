const taxRanges = [{
        min: 0,
        max: 10064,
        tax: 0
    },
    {
        min: 10065,
        max: 25659,
        tax: 0.11
    },
    {
        min: 25660,
        max: 73369,
        tax: 0.3
    },
    {
        min: 73370,
        max: 157806,
        tax: 0.41
    },
    {
        min: 157807,
        max: Number.MAX_SAFE_INTEGER,
        tax: 0.45
    }
]

function getChildrenQuotient(children) {
    if (children === 0) return 0
    else if (children === 1) return 0.5
    else return children - 1
}

function getStatus(status) {
    return (status === 's' ? 1 : 2)
}

function getQuotient(children, status) {
    return getChildrenQuotient(children) + getStatus(status)
}

export function calculTax(netRevenue, numChildren, status) {
    const quotient = getQuotient(numChildren, status)
    const revenue = netRevenue / quotient
    let taxFromRevenue = 0
    taxRanges.every((t) => {
        if (revenue > t.max) {
            taxFromRevenue += (t.max - t.min) * t.tax
            return true
        } else {
            taxFromRevenue += (revenue - t.min) * t.tax
            return false
        }
    })
    taxFromRevenue = taxFromRevenue * quotient
    const restAfterTaxing = netRevenue - taxFromRevenue
    return {
        tax: taxFromRevenue,
        rest: restAfterTaxing
    }
}

export function reverseTax(tax, numChildren, status) {
    const quotient = getQuotient(numChildren, status)
    let taxBefore = tax / quotient
    let revenue = 0
    taxRanges.every((t) => {
        const rangeTax = (t.max - t.min) * t.tax
        if (taxBefore >= rangeTax) {
            taxBefore -= rangeTax
            return true
        } else {
            revenue = (taxBefore / t.tax) + t.min
            return false
        }
    })
    revenue = revenue * quotient
    const restAfterTaxing = revenue - tax
    return {
        revenue: revenue,
        rest: restAfterTaxing
    }
}

export function netToBrut(rest, numChildren, status) {
    const quotient = getQuotient(numChildren, status)
    const restRevenue = rest / quotient
    let netRev = 0
    let taxFromRevenue = 0
    taxRanges.every((t) => {
        const rangeTax = (t.max - t.min) * t.tax
        if ((restRevenue + rangeTax) > t.max) {
            taxFromRevenue += rangeTax
            return true
        } else {
            netRev = (restRevenue + taxFromRevenue - t.tax * t.min) / (1 - t.tax)
            taxFromRevenue += (netRev - t.min) * t.tax
            return false
        }
    })
    return {
        revenue: netRev * quotient,
        tax: taxFromRevenue * quotient
    }
}