# Manipulation du DOM et récursivité

L'objectif est ici de créer une fonction capable d'entourer chaque mot d'un élément `span`


## Scénario

J'aimerais créer un effet d'animation mot par mot et il me faut donc convertir la structure HTML de mon titre 

```html
<h1>Ceci est <strong>un titre</strong></h1>
```

En entourant chaque mot d'une <span>

```html
<h1 class="title"><span>Ceci</span> <span>est</span> <strong><span>un</span> <span>titre</span></strong></h1>
```

Vous pouvez utiliser ce template CodeSandbox <https://codesandbox.io/s/challenge-spanify-4oxrr?file=/src/index.js> pour tester votre code (actualiser dans la partie de droite pour tester votre solution).
Vous pouvez soumettre votre solution ici (un seul message par personne et la solution peut être un lien jsfiddle / codesandbox / github...)

## Les solutions

Présentation des solutions : https://www.youtube.com/watch?v=4BB7KjRqS2Y

### Solutions basées sur le traitement du texte

- @Hachemarre : https://codesandbox.io/s/challenge-spanify-0hl99?fontsize=14&hidenavigation=1&theme=dark Machine à état pour trouver les espaces
- @Alex : https://codesandbox.io/s/challenge-spanify-h2lxd (split par espace)
- @roulianne : https://codesandbox.io/s/challenge-spanify-xbrbv?file=/src/index.js (split par espace)
- @Pierre MINIGGIO : https://codesandbox.io/s/challenge-spanify-n7sm5?file=/src/index.js (split par espace)
- @dukizwee : https://codesandbox.io/s/challenge-spanify-z703k?file=/src/index.js (construit l'html puis innerHTML)
- @Thilladon : https://codesandbox.io/s/challenge-spanify-uxsp6 (split par espace)
- @[P5]Assane : https://codesandbox.io/s/challenge-spanify-q09bf?file=/src/index.js
- @M0rg1tOu : https://codesandbox.io/s/challenge-spanify-cech4?file=/src/index.js (remplace mot par mot)
- @Gm Fmi : https://codesandbox.io/s/challenge-spanify-sqbs2?file=/src/index.js
- @Papa Mouhamadou DIOP : https://codesandbox.io/s/challenge-spanify-pd0hq?file=/src/index.js
- @Julien Jamet : https://codesandbox.io/s/challenge-spanify-xbrbv?file=/src/index.js (split par ' ')
- @Luc Varoqui : https://codesandbox.io/s/challenge-spanify-dn3b9 
- @KR.FM : https://codesandbox.io/s/challenge-spanify-uib08?file=/src/index.js
- @Yoyo Bu : https://codesandbox.io/s/challenge-spanify-i2tb3?file=/src/index.js remplacement mot par mot 
- @Nekena Ratafita Haritsimba : https://codesandbox.io/s/challenge-spanify-00b18 (mot par mot)
- @Mael Genevrais : https://codesandbox.io/s/challenge-spanify-e7dgm?file=/src/index.js
- @One3yeDriss : https://codesandbox.io/s/challenge-spanify-eu9wx?file=/src/index.js:383-556
- @Arthir Varennes : https://codesandbox.io/s/challenge-spanify-xhy4m?file=/src/index.js 
- @Marcel Gnac : https://codesandbox.io/s/challenge-spanify-z26vr?file=/src/index.js
- @Alain Brunel : https://codesandbox.io/s/challenge-spanify-7k34d?file=/src/index.js
- @Mike Mirosz : https://codesandbox.io/s/challenge-spanify-uif9q?file=/src/index.js
- @Maxime Girard : https://codesandbox.io/s/challenge-spanify-dxdcn?file=/src/index.js:298-421


### Solution basées sur une expressions régulière

- @Arnich : https://codesandbox.io/s/challenge-spanify-2lfik 
- @Gux : https://codesandbox.io/s/challenge-spanify-c1tdb?file=/src/index.js (très court)
- @Julian : https://codesandbox.io/s/challenge-spanify-d1cqb?file=/src/index.js:84-88 (split basé sur une regex)
- @Negwael : https://codesandbox.io/s/challenge-spanify-m5z20 
- @Senoyoru : https://codesandbox.io/s/challenge-spanify-zdxzr (replace)
- @Radonirina : https://codesandbox.io/s/challenge-spanify-4jxij
- @D0rian : https://codesandbox.io/s/challenge-spanify-gjd28?file=/src/index.js 
- @Sylvain : https://codesandbox.io/s/challenge-spanify-tx9rx?file=/src/index.js
- @Jojopata : https://codesandbox.io/s/challenge-spanify-v8ool (oneliner)
- @Max : https://codesandbox.io/s/challenge-spanify-d3phi?file=/src/index.js (oneliner)
- @betaWeb : https://codesandbox.io/s/challenge-spanify-uxsp6 (oneliner)
- @Maxime Chêne : https://codesandbox.io/s/challenge-spanify-d3phi?file=/src/index.js

### Solutions basées sur la manipulation du DOM

- @RomainLanz : https://codesandbox.io/s/challenge-spanify-wskw2?file=/src/index.js (petites fonctions)
- @Grafikart : https://codesandbox.io/s/challenge-spanify-answer-nm8i2?file=/src/index.js
- @bernard-ng : https://codesandbox.io/s/challenge-spanify-jjq2w?file=/src/index.js:738-748 (une seule fonction)
- @Wassim : https://codesandbox.io/s/challenge-spanify-u6q7h?file=/src/index.js 
- @nuks : https://codesandbox.io/s/challenge-spanify-lpcol
- @Clément : https://codesandbox.io/s/challenge-spanify-i2ix7?file=/src/index.js
- @Voltra : https://codesandbox.io/s/challenge-spanify-3ttir?file=/src/index.js (dom + regex pour les espaces)
- @HyOsh : https://codesandbox.io/s/challenge-spanify-w7g94?file=/src/index.js (TreeWalker)
- @Akanoa : https://codesandbox.io/s/challenge-spanify-4gdzf 
- @elkolotfi : https://codesandbox.io/s/challenge-spanify-gskd6?file=/src/index.js
- @Callan : https://codesandbox.io/s/challenge-spanify-zfcq5
- @Mathieu : https://codesandbox.io/s/challenge-spanify-f600w?file=/src/index.js
- @magicshark : https://codesandbox.io/s/challenge-spanify-ipj51?file=/src/index.js
- @François : https://codesandbox.io/embed/challenge-spanify-vtlhv ([].forEach.call())
- @Nioub : https://codesandbox.io/s/challenge-spanify-s8vp4?file=/src/index.js (récursivité + regex)
- @Apox : https://codesandbox.io/s/challenge-spanify-x1tte?file=/src/index.js
- @Jérémie Sellam : https://codesandbox.io/s/challenge-spanify-br3du?file=/src/index.js (attention à utiliser des constantes)
- @Fx : https://codesandbox.io/s/challenge-spanify-uindv (code propre / simple) 
- @fred : https://codesandbox.io/s/challenge-spanify-ssx8x?file=/src/index.js 
- @Barnard Ngandu : https://codesandbox.io/s/challenge-spanify-jjq2w?file=/src/index.js
- @Log Wagler : https://codepen.io/YggLife/pen/RwWVWRo?editors=0010 
- @Wassim Bechouel : https://codesandbox.io/s/challenge-spanify-u6q7h?file=/src/index.js (logique un peu complexe)
- @Vincent Diezel https://codesandbox.io/s/challenge-spanify-snj0t?file=/src/index.js
- @Deltackro : https://codesandbox.io/s/challenge-spanify-93jnz?file=/src/index.js (bien commenté)
- @InfrazFull : https://codesandbox.io/s/challenge-spanify-9q1zc
- @Mr. Kèive : https://codesandbox.io/s/challenge-spanify-rw0yw?file=/src/index.js
- @ridrum ridrum : https://codesandbox.io/s/challenge-spanify-w94n8
- @Vasco Compain : https://codesandbox.io/s/challenge-spanify-g7zm1?file=/src/index.js (utilise des constante ;)
- @IoDream : https://codesandbox.io/s/challenge-spanify-s8vp4?file=/src/index.js
- @Epic Kiwi : https://codesandbox.io/s/challenge-spanify-czm1d?file=/src/index.js
- @Jérémie Sellam : https://codesandbox.io/s/challenge-spanify-br3du?file=/src/index.js:95-111
- @Darcy Dar'c https://codesandbox.io/s/challenge-spanify-z703k?file=/src/index.js:97-104 (ne gère pas plus d'1 niveau de profondeur)
- @Cedric Cholley https://codesandbox.io/s/challenge-spanify-l5fdg?file=/src/index.js:696-768

### Solutions trop spécifique au problème, presque de la triche ;)

- @Julien G : https://codesandbox.io/s/challenge-spanify-3s4mn?file=/src/index.js
- @Hugo : https://codesandbox.io/s/challenge-spanify-64dvm?file=/src/index.js


