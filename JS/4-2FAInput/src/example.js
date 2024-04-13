class CodeInput extends HTMLElement {
    /** @var HTMLInputElement[] **/
    #inputs = [];
    /** @var {HTMLInputElement | null} */
    #hiddenInput = null

    static get observedAttributes() {
        return ['value'];
    }

    connectedCallback() {
        const size = parseInt(this.getAttribute("size"), 10);
        const value = this.getAttribute("value") ?? "";
        const name = this.getAttribute("name") ?? "";
        if (Number.isNaN(size) || size <= 0) {
            console.error(
                "Impossible de générer un champs code sans attribut size correct",
                size,
            );
            return;
        }
        this.innerHTML = `<fieldset>
            <legend>${this.getAttribute("legend")}</legend>
            <div class="code-inputs">
                ${Array.from({length: size}, (_, k) => `<input
                    type="text" 
                    value="${value.slice(k, k + 1)}"
                    pattern="[0-9]{1}"
                    >`).join("")} 
            </div>
            <input type="hidden" name="${name}" value="${value}">
       </fieldset>`;
        this.#inputs = Array.from(this.querySelectorAll("input[type='text']"));
        this.#hiddenInput = this.querySelector("input[type='hidden']");
        this.#inputs.forEach((input) => {
            input.addEventListener("keydown", this.#onKeyPress.bind(this))
            input.addEventListener("input", this.#onInput.bind(this))
            input.addEventListener("paste", this.#onPaste.bind(this))
        });
    }

    #onKeyPress (e) {
        const index = this.#inputs.findIndex(input => e.currentTarget === input)
        if (e.key.match(/\d/)) {
            e.preventDefault()
            e.currentTarget.value = e.key
            this.#inputs[Math.min(index + 1, this.#inputs.length - 1)].focus()
            this.#applyValueHiddenField()
        } else if (e.key === 'Backspace' && e.currentTarget.value === '') {
            e.preventDefault()
            this.#inputs[Math.max(index - 1, 0)].value = ''
            this.#inputs[Math.max(index - 1, 0)].focus()
            this.#applyValueHiddenField()
        }
    }

    /**
     * @param {ClipboardEvent} e
     */
    #onPaste (e) {
        e.preventDefault()
        const index = this.#inputs.findIndex(input => e.currentTarget === input)
        const numbers = e
            .clipboardData.getData('text')
            .replaceAll(/\D/g, '')
        let lastInput = null
        this.#inputs.slice(index, index + numbers.length).forEach((input, k) => {
            input.value = numbers[k]
            lastInput = input
        })
        lastInput.focus()
        this.#applyValueHiddenField()
    }

    #applyValueHiddenField () {
        this.#hiddenInput.value = this.#inputs.map(input => input.value).join('')
    }

    #onInput (e) {
        e.currentTarget.value = e.currentTarget.value.replaceAll(/\D/g, '')
    }

    set value (str) {
        const numbers = str.replaceAll(/\D/g, '')
        this.#inputs.slice(0, numbers.length).forEach((input, k) => {
            input.value = numbers[k]
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && this.#inputs) {
            this.value = newValue
        }
    }

}

customElements.define("code-input", CodeInput);
