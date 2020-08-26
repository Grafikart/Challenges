//***************************************************************************************************** */
//                                  Challenge Grafikart : impots js
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
//                                  Fonctionnement :
//
// 1 - saisie input de l'user appel handleChange() 
// 2 - handleChange() appel en callBack calcRessources() 
// 3 - calcRessource() appel en callBack calcTaxeMarginal()
// 4 - le render() appel 
//                  calcTaxeTotal()             calcule la valeur total de la taxe
//                  calcNet()                   calcule le net restant
//                  taxeParTranche(TRANCHE)     renvois la valeur de la taxe suivant la tranche
//***************************************************************************************************** */

class FormImpot extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            revenu: 0,
            taxeMarginal: 0,
            enfant: 0,
            couple: false,
            part: 1
        }
        this.handleChange = this.handleChange.bind(this)
    }

    // Update les state avec les champs remplis par l'utilisateur puis appel calcRessource() en callBack
    handleChange(e){
        let name = e.target.name
        let type = e.target.type
        let value = type === 'checkbox' ? e.target.checked : parseInt(e.target.value)
        
        this.setState({[name]: value}, ()=> this.calcRessource())
    }

    // Calcule du taux marginal, du nombre de part puis appel calcTaxeMarginal() en callBack
    calcRessource(){
        const PART = 1 + (this.state.enfant / 2) + (this.state.couple == true ? 1 : 0);
        const REVENU = this.state.revenu / PART
        let trancheMarginal;
        
        if      (REVENU > PLAFOND[TRANCHE5]) {trancheMarginal = TRANCHE5}
        else if (REVENU > PLAFOND[TRANCHE4]) {trancheMarginal = TRANCHE4}
        else if (REVENU > PLAFOND[TRANCHE3]) {trancheMarginal = TRANCHE3}
        else if (REVENU > PLAFOND[TRANCHE2]) {trancheMarginal = TRANCHE2}
        else {trancheMarginal = TRANCHE1}
        this.setState({tranche: trancheMarginal, part: PART}, ()=> this.calcTaxeMarginal())
    }

    // Calcule de la taxe de la tranche marginal SI les revenu sont au dessus de la tranche 1 (+10064€)
    calcTaxeMarginal(){
        const PART = this.state.part
        const REVENU = this.state.revenu / PART
        const TRANCHE = this.state.tranche
        let taxe;
        
        TRANCHE != 0 ? taxe = ( REVENU - ( PLAFOND[TRANCHE] + 1 ) ) * TAUX[TRANCHE] : taxe = 0

        this.setState({taxeMarginal: taxe * PART})
    }

    // Calcule la somme de toute les tranches d'imposition
    calcTaxeTotal(){
        const TRANCHE = this.state.tranche
        let total = 0;
        for (let i = 1; i < TRANCHE; i ++){
            total += parseInt(MAXTAXE[i])
        }
        total += this.state.taxeMarginal
        return total
    }

    // Calcule le net restant apres deduction des taxes
    calcNet(){
        return this.state.revenu - Math.round(this.calcTaxeTotal(this.state.tranche))
    }

    // Calcule la valeur de taxe de la tranche
    taxeParTranche(TRANCHE){
        return this.state.tranche > TRANCHE ? MAXTAXE[TRANCHE] : this.state.tranche == TRANCHE ? this.state.taxeMarginal.toFixed(2) : 0
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

            <h3>Votre impot</h3>
            <table>
                <tr>
                    <th>TOTAL</th>
                    <td>{Math.round(this.calcTaxeTotal()) + " €"}</td>
                </tr>      
                <tr>
                    <th>NET restant </th>
                    <td>{ this.calcNet() + " €"}</td>
                </tr>    
            </table>  

            <h3>Impots par tranche</h3>
            <table>
                <tr>
                    <th>Tranche 5 <p className="plafond"> plus de {PLAFOND[TRANCHE5]+1} € </p></th>
                    <td>{this.taxeParTranche(TRANCHE5)} €</td>
                </tr>     
                <tr>
                    <th>Tranche 4 <p className="plafond"> {PLAFOND[TRANCHE4] +1} à {PLAFOND[TRANCHE5]} € </p></th>
                    <td>{this.taxeParTranche(TRANCHE4)} €</td>              
                </tr> 
                <tr>
                    <th>Tranche 3 <p className="plafond"> {PLAFOND[TRANCHE3] +1} à {PLAFOND[TRANCHE4]} € </p></th>
                    <td>{this.taxeParTranche(TRANCHE3)} €</td>
                </tr>     
                <tr>
                    <th>Tranche 2 <p className="plafond"> {PLAFOND[TRANCHE2] +1} à {PLAFOND[TRANCHE3]} € </p></th>
                    <td>{this.taxeParTranche(TRANCHE2)} €</td>
                </tr> 
                <tr>
                    <th>Tranche 1 <p className="plafond"> {PLAFOND[TRANCHE1]}    à {PLAFOND[TRANCHE2]} € </p></th>
                    <td>0 €</td>
                </tr>   
            </table> 

            <h3>Quotiens familial et part</h3>      
            <table>
                <tr>
                    <th>Nombre de part</th>
                    <td>{this.state.part}</td>
                </tr>      
                <tr>
                    <th>quotiens familial </th>
                    <td>{(this.state.revenu / this.state.part).toFixed(2)} €</td>
                </tr>    
            </table> 
        </div>
    }
}

const main = document.getElementById('main');
ReactDOM.render(<FormImpot />, main)