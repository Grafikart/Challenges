
    // Calcule inverser, on fournis une valeur net APRES impot pour que ça nous renvois la valeur AVANT impot qu'il faut
    // PERF LOG
    // Pour la valeur 99999999
    // 11 seconde a partir du max
    // 50 seconde a partir du min
    returnReverse(netTarget, nbEnfant = 0, concubin = false){
        // si imposition minimal = 0%
        let min = netTarget
        // si imposition maximal = 45%
        let max = Math.floor(netTarget * 1.83)
        // Notre valeur test
        let revenu = max;
        // pour eviter boucle infinie
        let tour = 1

        // tant que la valeur saisie n'est pas égal a calcNet(revenu)
        // calcNet prend un revenu et renvois le reste NET suivant les taxes
        while((netTarget != this.calcNet(revenu, nbEnfant, concubin))){
            revenu--
        }

        return revenu
    }
}