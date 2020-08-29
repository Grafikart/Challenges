//***************************************************************************************************** */
//                                  Challenge Grafikart : impots js
//                                  https://github.com/mojinet
//                                  https://jbco.fr
//***************************************************************************************************** */

const PLAFOND = [0, 10064, 25659, 73369, 157806]
const TAUX = [0, 0.11, 0.3, 0.41, 0.45] 

const TRANCHE1 = 0
const TRANCHE2 = 1
const TRANCHE3 = 2
const TRANCHE4 = 3
const TRANCHE5 = 4

const MAXTAXE = [
    0,
    (( PLAFOND[TRANCHE3] - (PLAFOND[TRANCHE2] + 1) ) * TAUX[TRANCHE2]).toFixed(2),
    (( PLAFOND[TRANCHE4] - (PLAFOND[TRANCHE3] + 1) ) * TAUX[TRANCHE3]).toFixed(2),
    (( PLAFOND[TRANCHE5] - (PLAFOND[TRANCHE4] + 1) ) * TAUX[TRANCHE4]).toFixed(2)
]

//***************************************************************************************************** */

//                                  React Component

//***************************************************************************************************** */

class FormImpot extends React.Component{
    constructor(props){
        super(props)
        this.state = {

            // Input du formulaire
            revenu: 0,
            enfant: 0,
            couple: false,
            netCalc: 0,

            // Calcules fait par la class CalcImpot()
            taxeTotal: 0,
            taxeMarginal: 0,
            trancheMarginal: 0,
            netRest: 0,
            part: 0,
            revenuReverse: 0
        }
        this.handleChange = this.handleChange.bind(this)

        // Notre class utilitaire qui s'occupe des calcules
        this.calc = new CalcImpot()
    }
    
    // pour toute modification des input du formulaire on réalise des calcules
    handleChange(e){
        let name = e.target.name
        let type = e.target.type
        let value = type === 'checkbox' ? e.target.checked : parseInt(e.target.value)
        
        if (name == 'netCalc'){
            this.setState({[name]: value}, ()=>{
                this.calcReverseRender()  
            })

        } else{
            this.setState({[name]: value}, ()=>{
                this.calcRender() 
            })
        }
    }

    // Calcule de l'imposition à partir d'un revenu
    calcRender(){
        this.calc.setState(this.state.revenu, this.state.enfant, this.state.couple)
        this.setState({
            taxeTotal: this.calc.calcTaxeTotal(),
            taxeMarginal: this.calc.calcTaxeMarginal(),
            trancheMarginal: this.calc.calcTrancheMarginal(),
            netRest: this.calc.calcNet(),
            part : this.calc.calcPart(),
            netCalc: this.calc.calcNet()   
        })
    }

    // Calcule de l'imposition à partir d'un NET restant
    calcReverseRender(){
        this.calc.setState(this.state.netCalc, this.state.enfant, this.state.couple)
        this.setState({
            revenuReverse: this.calc.returnReverse(this.state.netCalc, this.state.enfant, this.state.couple),
            taxeTotal: this.calc.calcTaxeTotal(),
            taxeMarginal: this.calc.calcTaxeMarginal(),
            trancheMarginal: this.calc.calcTrancheMarginal(),
            netRest: this.calc.calcNet(),
            part : this.calc.calcPart(),
            revenu : this.calc.returnReverse(this.state.netCalc, this.state.enfant, this.state.couple)
        })
    }

    render(){
        return <div>
            <h3>Ressources et famille</h3> 
            <div className="formGRP">           
                <label forHtml="revenu"> Revenu du foyée </label>
                <input type="number" min="0" id="revenu" name="revenu" value={this.state.revenu} onChange={this.handleChange} />
            </div>
            <div className="formGRP">            
                <label forHtml="couple"> Je suis marié/pacsé </label>
                <input type="checkbox" id="couple" name="couple" value={this.state.couple} onChange={this.handleChange} />
            </div>
            <div className="formGRP">
                <label forHtml="enfant"> Nombre d'enfants </label>
                <input type="number" min="0" id="enfant" name="enfant" value={this.state.enfant}  onChange={this.handleChange}/>
            </div>

            <h3>Reverse tax &copy;</h3> 
            <p>Faite varier votre nombres de part en jouant avec les champs de formulaire nombre d'enfants et la checkbox marié/pacsé</p>
            <div className="formGRP">           
                <label forHtml="netCalc"> Net restant </label>
                <input type="number" min="0" id="netCalc" name="netCalc" value={this.state.netCalc} onChange={this.handleChange} />
            </div> 
            <table>
                <tr>
                    <th>Revenu</th>
                    <td>{this.state.revenuReverse + " €"}</td>
                </tr>       
            </table> 

            <h3>Votre impot</h3>
            <table>
                <tr>
                    <th>Nombre de part</th>
                    <td>{this.state.part}</td>
                </tr>    
                <tr>
                    <th>TOTAL</th>
                    <td>{this.state.taxeTotal + " €"}</td>
                </tr>      
                <tr>
                    <th>NET restant </th>
                    <td>{ this.state.netRest + " €"}</td>
                </tr>    
            </table>  

            <h3>Impots par tranche</h3>
            <table>
                <tr>
                    <th>Tranche 5 <p className="plafond"> plus de {PLAFOND[TRANCHE5]+1} € </p></th>
                    <td>{this.calc.taxeTranche(TRANCHE5)} €</td>
                </tr>     
                <tr>
                    <th>Tranche 4 <p className="plafond"> {PLAFOND[TRANCHE4] +1} à {PLAFOND[TRANCHE5]} € </p></th>
                    <td>{this.calc.taxeTranche(TRANCHE4)} €</td>              
                </tr> 
                <tr>
                    <th>Tranche 3 <p className="plafond"> {PLAFOND[TRANCHE3] +1} à {PLAFOND[TRANCHE4]} € </p></th>
                    <td>{this.calc.taxeTranche(TRANCHE3)} €</td>
                </tr>     
                <tr>
                    <th>Tranche 2 <p className="plafond"> {PLAFOND[TRANCHE2] +1} à {PLAFOND[TRANCHE3]} € </p></th>
                    <td>{this.calc.taxeTranche(TRANCHE2)} €</td>
                </tr> 
                <tr>
                    <th>Tranche 1 <p className="plafond"> {PLAFOND[TRANCHE1]}    à {PLAFOND[TRANCHE2]} € </p></th>
                    <td>0 €</td>
                </tr>   
            </table> 
        </div>
    }
}

//***************************************************************************************************** */

//                                  Classe utilitaire de calcule

//***************************************************************************************************** */

class CalcImpot {
    constructor(revenu = 0, nbEnfant = 0, concubin = false){
        this.state = {
            nbEnfant: nbEnfant,
            concubin: concubin,
            revenu: revenu
        }
    }

    setState(revenu, nbEnfant = 0, concubin = false){
        this.state = {
            nbEnfant: nbEnfant,
            concubin: concubin,
            revenu: revenu
        }
    }

    // Retourne le nombre de part
    calcPart(nbEnfant = this.state.nbEnfant, concubin = this.state.concubin){
        return 1 + (nbEnfant / 2) + (concubin == true ? 1 : 0)
    }

    // Retourne le quotiens familliale
    calcQuotiens(revenu, part){
        return (revenu / part)
    }

    // Retourne l'index de la tranche marginal sur laquel un calcul est necessaire
    calcTrancheMarginal(revenu = this.state.revenu){
        let tranche;
        
        if      (revenu > PLAFOND[TRANCHE5]) {tranche = TRANCHE5}
        else if (revenu > PLAFOND[TRANCHE4]) {tranche = TRANCHE4}
        else if (revenu > PLAFOND[TRANCHE3]) {tranche = TRANCHE3}
        else if (revenu > PLAFOND[TRANCHE2]) {tranche = TRANCHE2}
        else {tranche = TRANCHE1}      
        
        return tranche
    }

    // renvois la taxe total du au impot arrondi au plus proche
    calcTaxeTotal(revenu = this.state.revenu, nbEnfant = this.state.nbEnfant, concubin = this.state.concubin){
        const PART = this.calcPart(nbEnfant, concubin)
        const QUOTIENS = this.calcQuotiens(revenu, PART)
        const TRANCHE = this.calcTrancheMarginal(QUOTIENS)
        let total = 0;        

        for (let i = 1; i < TRANCHE; i ++){
            total += parseFloat(MAXTAXE[i])
        }

        total += this.calcTaxeMarginal(revenu, nbEnfant, concubin)

        return Math.round(total * PART)
    }

    // calcule la taxe de la tranche marginal arrondi à 2 chiffre apres la virgule
    calcTaxeMarginal(revenu = this.state.revenu, nbEnfant = this.state.nbEnfant, concubin = this.state.concubin){
        const PART = this.calcPart(nbEnfant, concubin)
        const REVENU = this.calcQuotiens(revenu, PART)
        const TRANCHE = this.calcTrancheMarginal(REVENU)  
        let taxeMarginal = 0;

        
        if (TRANCHE != 0){
            taxeMarginal = ( REVENU - ( PLAFOND[TRANCHE] + 1 ) ) * TAUX[TRANCHE]
        }   

        return parseFloat(taxeMarginal.toFixed(2)) 
    }

    // Calcule le net restant apres deduction des taxes
    calcNet(revenu = this.state.revenu, nbEnfant = this.state.nbEnfant, concubin = this.state.concubin){
        return revenu - this.calcTaxeTotal(revenu, nbEnfant, concubin)
    }

    // Calcule la valeur de taxe de la tranche demandé
    taxeTranche(trancheCible, revenu = this.state.revenu, nbEnfant = this.state.nbEnfant, concubin = this.state.concubin){
        const PART = this.calcPart(nbEnfant, concubin)
        const REVENU = this.calcQuotiens(revenu, PART)
        const TRANCHE = this.calcTrancheMarginal(REVENU)
        let taxe = 0;

        // si la tranche demandé est inférieur à la tranche marginal on donne le taux plein
        if ( trancheCible < TRANCHE ){
            taxe = MAXTAXE[trancheCible]
        // si la tranche demandé est la tranche marginal on calcule la valeur de la taxe
        } else if (trancheCible == TRANCHE){
            taxe = this.calcTaxeMarginal(revenu,nbEnfant,concubin)
        // la tranche demandé est supérieur à la tranche marginal, on ne doit rien
        }else{
            taxe = 0
        }

        return (taxe * PART).toFixed(2)
    }

    // Calcule inverser, on fournis une valeur net APRES impot pour que ça nous renvois le revenu à avoir
    // Ce n'est pas un calcule a proprement parler mais une série de test pour trouver la valeur
    // Cela demande donc un temps de calcule proportionnel à la somme à convertir
    returnReverse(netTarget, nbEnfant = 0, concubin = false){
        // Si imposition maximal = 45%
        let max = Math.floor(netTarget / 0.55)
        // On définie le revenu au max, plus le revenu est haut plus on approche des 45% d'imposition sans jamais totalement les atteindres
        let revenu = max;
        // Et on calcule toute les valeurs de façon décroissante à partir du max
        while((netTarget != this.calcNet(revenu, nbEnfant, concubin))){
            revenu--
        }

        return revenu
    }
}

//***************************************************************************************************** */

//                                  Zone de test Console

//***************************************************************************************************** */

// On créer un nouveau CalcImpot qui nous permet de faire tout nos calcule
let calc = new CalcImpot();

// Jeu de test
let test = function(revenu = 32000, enfant = 0, concubin = false){
    calc.setState(revenu,enfant,concubin)
    console.log("------------RESSOURCE------------")
    console.log("***Revenu : " + calc.state.revenu)
    console.log("***PART : " + calc.calcPart())

    console.log("------------TAXE------------")
    console.log("***TOTAL TAXE : " + calc.calcTaxeTotal())
    console.log("***NET restant : " + calc.calcNet())

    console.log("------------DETAIL------------")
    console.log("***Tranche 1 : 0 ")
    console.log("***Tranche 2 : " + calc.taxeTranche(TRANCHE2))
    console.log("***Tranche 3 : " + calc.taxeTranche(TRANCHE3))
    console.log("***Tranche 4 : " + calc.taxeTranche(TRANCHE4))
    console.log("***Tranche 5 : " + calc.taxeTranche(TRANCHE5))
}

let reverse = function(revenu = 32000, enfant = 0, concubin = false){
    console.log("Revenu à avoir : " + calc.returnReverse(revenu, enfant, concubin) + " Pour obtenir " + revenu)
}

let oulala = function(){
    console.log("Survol le petit bonhomme en haut avec ta souris ;)")
    let dollard = document.getElementById('mrdollard')
    dollard.addEventListener('mouseover', ()=>{dollard.setAttribute("src", "https://jbco.fr/other/mrdollardpoil.gif")})
    dollard.addEventListener('mouseleave', ()=>{dollard.setAttribute("src", "https://jbco.fr/other/mrdollard.gif")})
}

console.log("Bonjour User :)")
console.log("")
console.log("Pour un Revenu de 32000, avec 3 enfants et marié(=true) faite : ")
console.log("test(32000,3,true)")
console.log("")
console.log("Pour obtenir un revenu à partir d'un net restant faite : ")
console.log("reverse(32000,3,true)")
console.log("")
console.log("Tu veux vivre un moment hot tappe oulala()")

//***************************************************************************************************** */

//                                  ReactDOM

//***************************************************************************************************** */

const main = document.getElementById('main');
ReactDOM.render(<FormImpot />, main)