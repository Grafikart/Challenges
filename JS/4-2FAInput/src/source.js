/**
 * Elément web personnalisé
 * Plus d'info : https://grafikart.fr/tutoriels/web-component-1201
 */
class CodeInput extends HTMLElement {

    static get observedAttributes() {
        return ['value'];
    }

    connectedCallback() {
        // Ce code sera éxécuté lorsque le composant entre dans le DOM
        // COMMENCEZ ICI
    }

    /**
     * Code exécuté lorsqu'un attribut change
     *
     * @param name Nom de l'attribut
     * @param oldValue Ancienne valeur
     * @param newValue Nouvelle valeur
     */
    attributeChangedCallback(name, oldValue, newValue) {
    }

}

customElements.define("code-input", CodeInput);
