class CodeInput extends HTMLElement {
  #inputs = [];

  connectedCallback() {
    const size = parseInt(this.getAttribute("size"), 10);
    const value = this.getAttribute("value") ?? "";
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
                ${Array.from({ length: size }, (_, k) => `<input type="text" value="${value.slice(k, k + 1)}">`).join("")} 
            </div>
            <input type="hidden" value="${value}">
       </fieldset>`;
    this.#inputs = Array.from(this.querySelectorAll(".code-inputs input"));
    this.#inputs.forEach((input) =>
      input.addEventListener("input", this.onInputChange.bind(this)),
    );
  }

  onInputChange(e) {
    const input = e.currentTarget;
    const currentIndex = this.#inputs.findIndex((v) => v === input);
    const numbers = e.currentTarget.value
      .split("")
      .filter((l) => l.match(/\d/));
    const siblings = this.#inputs.slice(
      currentIndex,
      currentIndex + numbers.length,
    );
    // For invalid input just clean the field
    if (numbers.length === 0) {
      input.value = input.value.replaceAll(/\D/g, "");
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      siblings[Math.min(i, siblings.length - 1)].value = numbers[i];
    }
    this.#inputs[
      Math.min(this.#inputs.length - 1, currentIndex + numbers.length)
    ].focus();
  }
}

customElements.define("code-input", CodeInput);
