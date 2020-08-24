## A propos de la solution

Pour cet exercice on a plusieurs solutions possibles mais les critères importants sont : 

- Le code HTMLuniux doit rester simple et extensible (pouvoir rajouter des champs facilement plus tard par exemple, et éviter une structure trop en lien avec le design).
- Faire en sorte que la tabulation sélectionne les champs dans le bon ordre.
- Faire en sorte que le responsive gère un maximum de cas (ne pas oublier les tablettes).
- Gérer convenablement les espaces entre les champs quelquesoit la résolution.

Les quelques points clefs de la solution proposée :

- `grid-template-columns: repeat(auto-fill, minmax(297px, 1fr));` permet de faire en sorte que le navigateur crée automatiquement les colonnes ce qui permet de simplifier le responsive sans avoir à créer des breakpoint.
- `align-content`, `align-self`, `align-items` permettent de gérer convenablement les alignements, surtout si un champs à un message en dessous
- Pour que le champs textarea prenne toute la hauteur on utilise `align-content: stretch;`
