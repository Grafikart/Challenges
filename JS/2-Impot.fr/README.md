# Calculateur d'impôt sur le revenu

On souhaite créer un formulaire permettant de calculer l'impôt que l'on va payer pour l'année courante.
L'objectif de cet exercice est de tester votre capacité à interpréter une consigne et traduire une explication en algorithme.

Le gouvernement a créer une fiche explicative permettant de comprendre le calcul du taux d'imposition mais ce calcul s'avère relativement complexe et on souhaite créer une interface simplifier pour calculer les choses.

https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu#etapescalculir

## Niveau 1

Pour commencer on souhaite créer un formulaire dans lequel on va entrée la somme que l'on compte déclarer (valeur net) et le système doit automatiquement calculer l'impôt que l'on va avoir à payer ainsi que la somme qu'il nous restera (On prendra le cas d'un célibataire pour commencer).

## Niveau 2

On ajoutera une case à cocher pour préciser si on est en couple et un autre champs nous permettra de préciser le nombre d'enfant. En fonction de ces nouvelles données le système adaptera le taux.

## Niveau 3

On souhaite avoir un détail du montant que l'on paye par tranche. Le système affichera donc un tableau pour préciser le montant que l'on doit payer pour chaque tranche.

## Boss final

Pour l'exercice final on prendra le problème en sens inverse et on permettra à l'utilisateur d'entrer la somme désiré (après impôt) et le système calculera les revenus net à avoir pour obtenir cette somme après l'imposition.

# Solutions :

## Vanilla

- @meschac38700 : https://codesandbox.io/s/purple-frost-b4c8g?file=/app.js

## React

- @Mania#6276 : [CodeSandbox](https://codesandbox.io/s/github/MathisBarre/grafikart-challenge-impots) - [CodeSandbox Livetest](https://sl8sp.csb.app/)
- @LemaireJean-Baptiste : [CodeSandbox](https://codesandbox.io/s/grafikart-challenge-tax-calculator-jbl-dr8zo)
- @jordanmonier : https://codesandbox.io/s/elated-wright-wgt9i (Typescript)
- @samibettayeb : [CODE](https://github.com/dchallenges/tax-calculator) - [DEMO](https://dchallenges.github.io/taxca/)

## VueJS

- @Da-max https://codesandbox.io/s/calcul-impot-3dkxp niveau 3 (avec vue et vuetify)
- @aschelch : https://jsfiddle.net/aschelch/a9emwd1t/9/

## Svelte

- @PeufOne: https://codesandbox.io/s/wandering-morning-g7ow0
