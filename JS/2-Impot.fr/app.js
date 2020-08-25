/**
 * – 14 % pour la fraction supérieure à 10 064 € et inférieure ou égale à 25 660 € ;
 * – 30 % pour la fraction supérieure à 25 660 € et inférieure ou égale à 73 370 € ;
 * – 41 % pour la fraction supérieure à 73 370 € et inférieure ou égale à 157 806 € ;
 * – 45 % pour la fraction supérieure à 157 806 €;
 */
const tranches = [
    { min: 0, max: 10064, bareme: 0 },
    { min: 10065, max: 25659, bareme: 11 },
    { min: 25660, max: 73369, bareme: 30 },
    { min: 73370, max: 157806, bareme: 41 },
    { min: 157807, max: undefined, bareme: 45 }
  ];
  
  function nbr_parts(nbr_enfant = 0, nbr_enfant_cmi = 0, en_couple = false) {
    // par défaut: celibatair ou divorce ou veuf
    let nbr_part = 1;
    nbr_enfant_cmi = nbr_enfant >= nbr_enfant_cmi ? nbr_enfant_cmi : 0;
    if (nbr_enfant > 2) {
      let tmp = nbr_enfant - 2; // nbr enfant supp (au delà de 2)
      return nbr_part + 1 + tmp + (en_couple ? 1 : 0) + nbr_enfant_cmi / 2;
    }
    return nbr_part + 0.5 * nbr_enfant + (en_couple ? 1 : 0) + nbr_enfant_cmi / 2;
  }
  
  function quotient_familial(
    revenu,
    nbr_enfant = 0,
    nbr_enfant_cmi = 0,
    en_couple = false
  ) {
    return revenu / nbr_parts(nbr_enfant, nbr_enfant_cmi, en_couple);
  }
  
  function montant_impot_du(
    revenu,
    nbr_enfant = 0,
    nbr_enfant_cmi = 0,
    en_couple = false
  ) {
    let qf = quotient_familial(revenu, nbr_enfant, nbr_enfant_cmi, en_couple);
    let data = { impot_total: 0 };
    tranches.forEach(function (tranche, i) {
      if (qf > tranche.max) {
        data[`tranche_${i}`] = {
          montant_imposable:
            ((tranche.max - tranche.min + 1) * tranche.bareme) / 100
        };
      } else if (qf > tranche.min) {
        data[`tranche_${i}`] = {
          montant_imposable: ((qf - tranche.min + 1) * tranche.bareme) / 100
        };
      } else {
        data[`tranche_${i}`] = {
          montant_imposable: 0
        };
      }
      data.impot_total += Math.round(data[`tranche_${i}`].montant_imposable);
    });
    data.reste = revenu - data.impot_total;
    return data;
  }
  
  let btn = document.querySelector(".form .btn");
  let sections = document.querySelectorAll(".sections");
  let revenu_entree = document.querySelector("#income");
  let impot_entree = document.querySelector("#tax");
  let apres_impot_entree = document.querySelector("#after_tax");
  
  let option_statut = document.querySelector("#statut");
  let option_enfant = document.querySelector("#nbr_enfant");
  let option_enfant_cmi = document.querySelector("#nbr_enfant_cmi");
  
  impot_entree.disabled = true;
  
  let calcule_impot = function (e) {
    e.preventDefault();
    let revenu = parseInt(revenu_entree.value.replace(/\s/g, ""), 10);
    if (!isNaN(revenu)) {
      let en_couple =
        parseInt(option_statut.value) === 1 ||
        parseInt(option_statut.value) !== 0;
      let nbr_enfant = parseInt(option_enfant.value) || 0;
      let nbr_enfant_cmi = parseInt(option_enfant_cmi.value) || 0;
      let data = montant_impot_du(
        revenu,
        (nbr_enfant = nbr_enfant),
        (nbr_enfant_cmi = nbr_enfant_cmi),
        (en_couple = en_couple)
      );
      impot_entree.value = data.impot_total.toLocaleString("fr") + " €";
      impot_entree.style.color = "#000";
      apres_impot_entree.value = data.reste.toLocaleString("fr") + " €";
  
      sections.forEach((section, i) => {
        let tmp_index_section = section.getAttribute("class").match(/[0-4]/)[0];
        let montant_impot_tranche =
          data[`tranche_${tmp_index_section}`].montant_imposable;
        section.querySelector(".tax_amount").textContent =
          montant_impot_tranche.toLocaleString("fr") + " €";
      });
    }
  };
  revenu_entree.addEventListener("keyup", calcule_impot);
  btn.addEventListener("click", calcule_impot);
  
  apres_impot_entree.addEventListener("keyup", function (e) {
    e.preventDefault();
    let revenu = parseInt(this.value, 10);
  });
  let impot = montant_impot_du(
    32000,
    (nbr_enfant = 0),
    (nbr_enfant_cmi = 0),
    (en_couple = false)
  );
  console.log(impot);
  impot = montant_impot_du(
    100000,
    (nbr_enfant = 0),
    (nbr_enfant_cmi = 0),
    (en_couple = false)
  );
  