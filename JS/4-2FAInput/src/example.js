/**
 * Elément web personnalisé
 * Plus d'info : https://grafikart.fr/tutoriels/web-component-1201
 */
class CodeInput extends HTMLElement {

    /** @var {HTMLInputElement[]} */
    #inputs = []
    /** @var {HTMLInputElement | null} */
    #hiddenInput = null

    static get observedAttributes() {
        return ['value'];
    }

    connectedCallback() {
        const legend = this.getAttribute('legend') ?? 'Entrez votre code'
        const name = this.getAttribute('name') ?? ''
        const size = parseInt(this.getAttribute('size') ?? '6', 10)
        const value = this.getAttribute('value') ?? ''
        this.innerHTML = `
        <fieldset>
            <legend>${legend}</legend>  
            <div class="code-inputs">
                ${Array.from({length: size}, (_, k) => `<input
                  type="text" 
                  inputmode="numeric"
                  aria-label="Chiffre ${k}"
                  pattern="[0-9]{1}"
                  value="${value.slice(k, k + 1)}"
                  required
                >`).join('')}
            </div>
            <input type="hidden" name="${name}" value="${value}">
        </fieldset>`
        this.#hiddenInput = this.querySelector('input[type="hidden"]')
        this.#inputs = Array.from(this.querySelectorAll('input[type="text"]'))
        this.#inputs.forEach(input => {
            input.addEventListener('paste', this.#onPaste.bind(this))
            input.addEventListener('input', this.#onInput.bind(this))
            input.addEventListener('keydown', this.#onKeyDown.bind(this))
        })
    }

    /**
     * Code exécuté lorsqu'un attribut change
     *
     * @param name Nom de l'attribut
     * @param oldValue Ancienne valeur
     * @param newValue Nouvelle valeur
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') {
            this.value = newValue
        }
    }

    /**
     * @param {string | null} str
     */
    set value (str) {
        if (!this.#inputs || this.#inputs.length <= 0) {
            return;
        }
        const value = str ?? ''
        this.#inputs.forEach((input, k) => {
            input.value = value[k] ?? ''
        })
        this.#updateHiddenInput()
    }

    /**
     * @param {InputEvent} e
     */
    #onInput (e) {
        e.currentTarget.value = e.currentTarget.value.replaceAll(/\D/g, '').slice(0, 1)
        this.#updateHiddenInput()
    }

    /**
     * @param {KeyboardEvent} e
     */
    #onKeyDown (e) {
        if (e.key.match(/\d/)) {
            e.preventDefault()
            e.currentTarget.value = e.key
            const nextInput = e.currentTarget.nextElementSibling
            if (nextInput) {
                nextInput.focus()
            }
            this.#updateHiddenInput()
        }
        if (e.key === 'Backspace' && e.currentTarget.value === '') {
            const previousInput = e.currentTarget.previousElementSibling
            if (!previousInput) {
                return;
            }
            previousInput.value = ''
            previousInput.focus()
            this.#updateHiddenInput()
        }
    }

    #updateHiddenInput() {
        this.#hiddenInput.value = this.#inputs.map(input => input.value).join('')
    }

    /**
     * @param {ClipboardEvent} e
     */
    #onPaste(e) {
        e.preventDefault()
        const index = this.#inputs.findIndex(input => input === e.currentTarget)
        const text = e.clipboardData.getData('text').replaceAll(/\D/g, '')
        if (text.length === 0) {
            return;
        }
        let lastInput
        this.#inputs.slice(index).forEach((input, k) => {
            if (!text[k]) {
                return;
            }
            input.value = text[k]
            lastInput = input
        })
        const nextAfterLastInput = lastInput.nextElementSibling
        if (nextAfterLastInput) {
            nextAfterLastInput.focus()
        } else {
            lastInput.focus()
        }
        this.#updateHiddenInput()
    }

}

customElements.define("code-input", CodeInput);
