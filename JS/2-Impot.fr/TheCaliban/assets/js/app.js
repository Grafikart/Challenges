$('#tax-input-income, #tax-input-status, #tax-input-child').on('input', function () {
    let taxStep = {
        45: {
            max: Infinity,
            min: 157807
        },
        41: {
            max: 157806,
            min: 73370
        },
        30: {
            max: 73369,
            min: 25660
        },
        11: {
            max: 25659,
            min: 10065
        }
    }

    let taxDuByStep = {
        45: 0,
        41: 0,
        30: 0,
        11: 0,
        0: 0
    }

    let brutIncome = ($('#tax-input-income').val() != '') ? parseInt($('#tax-input-income').val()) : 0;
    let status = (!$('#tax-input-status').prop('checked')) ? 1 : 2;
    let nbChild = ($('#tax-input-child').val() != '') ? parseInt($('#tax-input-child').val()) : 0;
    if (nbChild > 2) {
        nbChild = 1 + (nbChild - 2)
    }
    let quotientFam = status + nbChild;

    let qfBrutIncome = brutIncome / quotientFam;
    let netIncome = 0;
    let incrementTax = 0;
    let duEachStep = 0;


    $.each(taxStep, (pourcent, limit) => {
        if (qfBrutIncome > limit.min) {
            if (qfBrutIncome > limit.max) {
                duEachStep = (limit.max - limit.min) * (pourcent / 100);
            }
            else {
                duEachStep = (qfBrutIncome - limit.min) * (pourcent / 100);
            }
            taxDuByStep[pourcent] = duEachStep;
            incrementTax += duEachStep;
        }
    });

    let $table = $('#table-step-tax tbody');
    $table.html('');

    $.each(taxDuByStep, (pourcent, amount) => {

        if (amount > 0) {
            $table.append(`<tr>
                            <td class="table-tax-pourcent">${pourcent}</td>
                            <td class="table-tax-amount">${amount.toFixed(2)}</td>
                            <td colspan="2" class="table-tax-limit">${taxStep[pourcent].min} - ${taxStep[pourcent].max}</td>
                            </tr>`);
        }
    });

    if (incrementTax > 0) {
        $('.table-div').css('display', 'block');
        $('#no-tax-msg').css('display', 'none');
    }
    else {

        $('.table-div').css('display', 'none');
        $('#no-tax-msg').css('display', 'block');
    }

    netIncome = brutIncome - incrementTax;

    $('#tax-span-amount').html(`${incrementTax.toFixed(2)} €`);
    $('#tax-span-rest').html(`${netIncome} €`);
});