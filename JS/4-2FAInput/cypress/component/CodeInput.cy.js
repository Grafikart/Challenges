const expectFieldsToHave = (str) => {
  cy.get("input").should(($input) => {
    const v = Object.values($input)
        .filter(input => input instanceof HTMLElement && input.getAttribute('type') !== 'hidden')
        .map((input) => input.value)
        .join("");
    expect(v).to.eq(str);
  });
};

const expectFormValue = (name, str) => {
  cy.get("form").should(($form) => {
    const data = new FormData($form[0])
    expect(data.get(name)).to.eq(str);
  });
};

const defaultAttrs = {
  name: 'code',
  size: 6,
  legend: "Entrer le code à 6 chiffres généré par votre application"
}

function paste({ destinationSelector, pastePayload, pasteType = 'text' }) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  cy.get(destinationSelector).then($destination => {
    const pasteEvent = Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
      clipboardData: {
        getData: (type = pasteType) => pastePayload,
      },
    });
    $destination[0].dispatchEvent(pasteEvent);
  });
}

describe("Spécification de <code-input>", () => {
  describe('Base', () => {
    beforeEach(() => {
      cy.mount(defaultAttrs)
      cy.get("input:first").focus();
    });
    it("Permet de taper plusieurs nombres à la suite", () => {
      cy.get("body").type("123456");
      expectFieldsToHave("123456");
    });
    it("Respecte l'attribut value", () => {
      cy.mount({...defaultAttrs, value: '123456'})
      expectFieldsToHave("123456");
    })
    it("Limite le nombre de caractères", () => {
      cy.mount(defaultAttrs)
      cy.get("input:first").focus();
      cy.get("body").type("12345678");
      expectFieldsToHave("123458");
    });
    it("Limite les champs à des nombres", () => {
      cy.mount(defaultAttrs)
      cy.get("input:first").focus();
      cy.get("body").type("12345a");
      expectFieldsToHave("12345");
    });
    it("Limite les champs à des nombres même au milieu", () => {
      cy.mount(defaultAttrs)
      cy.get("input:first").focus();
      cy.get("body").type("12a345a6");
      expectFieldsToHave("123456");
    });
  })
  describe('Avancé', () => {
    it('Permet de retaper un nombre par dessus le premier', () => {
      cy.mount({...defaultAttrs, value: '123456'})
      cy.get("input:first").focus();
      cy.get("body").type("234567");
      expectFieldsToHave("234567");
    })
    it("Respecte l'attribut size", () => {
      cy.mount({...defaultAttrs, size: 7})
      cy.get("input:first").focus();
      cy.get("body").type("1234567");
      expectFieldsToHave("1234567");
    })
    it("L'attribut value peut être changé depuis après coup", () => {
      cy.mount({...defaultAttrs, value: '123456'})
      expectFieldsToHave("123456");
      cy.get('code-input').then(el => {
        el[0].setAttribute('value', '234567')
      })
      expectFieldsToHave("234567");
    })
    it("Coller un code valide remplit tous les champs", () => {
      cy.mount(defaultAttrs)
      cy.get("input:first").paste("123456")
      expectFieldsToHave("123456");
    });
    it("Coller un code partiel remplit les champs correspondant", () => {
      cy.mount(defaultAttrs)
      cy.get("input:first").paste("1234")
      expectFieldsToHave("1234");
    });
    it("Coller un code avec des lettres ne garde que les nombres", () => {
      cy.mount(defaultAttrs)
      cy.get("input:first").paste("12a345b6")
      expectFieldsToHave("123456");
    });
    it("Coller un code avec des lettres ne garde que les nombres", () => {
      cy.mount(defaultAttrs)
      cy.get("input:first").focus()
      cy.get('body').type("123456");
      expectFieldsToHave("123456");
      expectFormValue("code", "123456");
    });
  })
});
