//***************************************************************************************************** */
//                                           Challenge Grafikart : impots js
//                                           Solution en React proposé par jbco.fr
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
    ( PLAFOND[TRANCHE3] - (PLAFOND[TRANCHE2] + 1) ) * TAUX[TRANCHE2],
    ( PLAFOND[TRANCHE4] - (PLAFOND[TRANCHE3] + 1) ) * TAUX[TRANCHE3],
    ( PLAFOND[TRANCHE5] - (PLAFOND[TRANCHE4] + 1) ) * TAUX[TRANCHE4]
]

//***************************************************************************************************** */
//                                           Fonctionnement :
//
//
//
//
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

    calcTaxeTotal(TRANCHE){
        let total =0;
        for (let i = 1; i < TRANCHE; i ++){
            total += MAXTAXE[i]
        }
        total += this.state.taxeMarginal
        return total
    }

    render(){
        return <div>
            <h3>Ressources et famille</h3> 
            <div className="formGRP">           
                <label forHtml="revenu"> Revenu do foyée </label>
                <input type="number" id="revenu" name="revenu" value={this.state.revenu} onChange={this.handleChange} />
            </div>
            <div className="formGRP">            
                <label forHtml="couple"> En Couple </label>
                <input type="checkbox" id="couple" name="couple" value={this.state.couple} onChange={this.handleChange} />
            </div>
            <div className="formGRP">
                <label forHtml="enfant"> Nombre d'enfants </label>
                <input type="number" id="enfant" name="enfant" value={this.state.enfant}  onChange={this.handleChange}/>
            </div>
            
            <h3>Détail de la taxe</h3> 
            <table>
                <tr>
                    <th>Tranche 1 <p className="plafond"> {PLAFOND[TRANCHE1]}    à {PLAFOND[TRANCHE2]} € </p></th>
                    <th>Tranche 2 <p className="plafond"> {PLAFOND[TRANCHE2] +1} à {PLAFOND[TRANCHE3]} € </p></th>
                    <th>Tranche 3 <p className="plafond"> {PLAFOND[TRANCHE3] +1} à {PLAFOND[TRANCHE4]} € </p></th>
                    <th>Tranche 4 <p className="plafond"> {PLAFOND[TRANCHE4] +1} à {PLAFOND[TRANCHE5]} € </p></th>
                    <th>Tranche 5 <p className="plafond"> plus de {PLAFOND[TRANCHE5]+1} € </p></th>
                    <th>TOTAL</th>
                </tr>     
                <tr>
                    <td>0 €</td>
                    <td>{this.state.tranche > TRANCHE2 ? MAXTAXE[TRANCHE2] : this.state.tranche == TRANCHE2 ? this.state.taxeMarginal : 0} €</td>
                    <td>{this.state.tranche > TRANCHE3 ? MAXTAXE[TRANCHE3] : this.state.tranche == TRANCHE3 ? this.state.taxeMarginal : 0} €</td>
                    <td>{this.state.tranche > TRANCHE4 ? MAXTAXE[TRANCHE4] : this.state.tranche == TRANCHE4 ? this.state.taxeMarginal : 0} €</td>
                    <td>{this.state.tranche > TRANCHE5 ? MAXTAXE[TRANCHE5] : this.state.tranche == TRANCHE5 ? this.state.taxeMarginal : 0} €</td>
                    <td>{Math.trunc(this.calcTaxeTotal(this.state.tranche)) + " €"}</td>
                </tr>        
            </table>

            <h3>Reste NET</h3>
            <div className="formGRP">
                <p>Votre Net : {this.state.revenu - Math.trunc(this.calcTaxeTotal(this.state.tranche)) + " €"} </p>             
            </div>            

        </div>
    }
}

const main = document.getElementById('main');
ReactDOM.render(<FormImpot />, main)