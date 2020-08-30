import React, { useState } from 'react';
import { calculTax, reverseTax, netToBrut } from './utils';

export default function TaxCalculator() {
    const [status, setStatus] = useState('s')
    const [numChildren, setNumChildren] = useState(0)
    const [netRevenue, setNetRenue] = useState(0)
    const [tax, setTax] = useState(0)
    const [rest, setRest] = useState(0)

    function hundleStatusChange(event) {
        setStatus(event.target.value)
    }

    function hundleNumChildrenChange(event) {
        setNumChildren(event.target.value)
    }

    function hundleRevenueChange(event) {
        setNetRenue(event.target.value)
        const { rest, tax } = calculTax(event.target.value, numChildren, status)
        setTax(tax)
        setRest(rest)
    }

    function hundleTaxChange(event) {
        setTax(event.target.value)
        const { revenue, rest } = reverseTax(event.target.value, numChildren, status)
        setNetRenue(revenue)
        setRest(rest)
    }

    function hundleRestChange(event) {
        setRest(event.target.value)
        const { revenue, tax } = netToBrut(event.target.value, numChildren, status)
        setNetRenue(revenue)
        setTax(tax)
    }

    return <form>
        <input type="radio" id="single" name="status" value="s" checked={status === "s"} onChange={hundleStatusChange} />
        <label htmlFor="single">Célibataire</label>
        <input type="radio" id="couple" name="status" value="c" checked={status === "c"} onChange={hundleStatusChange} />
        <label htmlFor="couple">En couple</label><br />
        <label htmlFor="children">Nombre des enfants:</label><br />
        <input type="number" id="children" value={numChildren} onChange={hundleNumChildrenChange} /><br />
        <label htmlFor="netRev">Revenu Net:</label><br />
        <input type="number" id="netRev" value={netRevenue} onChange={hundleRevenueChange} /><br />
        <label htmlFor="tax">Impot:</label><br />
        <input type="number" id="tax" value={tax} onChange={hundleTaxChange} /><br />
        <label htmlFor="rest">Revenu après imposition:</label><br />
        <input type="number" id="rest" value={rest} onChange={hundleRestChange} /><br />
    </form>
}