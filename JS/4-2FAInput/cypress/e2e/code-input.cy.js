const expectFieldsToHave = (str) => {
  cy.get("input").should(($input) => {
    const v = Object.values($input)
      .slice(0, 6)
      .map((input) => input.value)
      .join("");
    expect(v).to.eq(str);
  });
};

describe("Spécification de <code-input>", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input:first").focus();
  });
  it("Permet de taper plusieurs nombres à la suite", () => {
    cy.get("body").type("123456");
    expectFieldsToHave("123456");
  });
  it("Limite le nombre de caractères", () => {
    cy.get("body").type("12345678");
    expectFieldsToHave("123458");
  });
  it("Limite les champs à des nombres", () => {
    cy.get("body").type("12345a");
    expectFieldsToHave("12345");
  });
  it("Limite les champs à des nombres même au milieu", () => {
    cy.get("body").type("12a345a6");
    expectFieldsToHave("123456");
  });
  it("Coller un code valide remplit tous les champs", () => {
    cy.get("input:first").invoke("val", "123456").trigger("input");
    expectFieldsToHave("123456");
  });
  it("Coller un code partiel remplit les champs correspondant", () => {
    cy.get("input:first").invoke("val", "1234").trigger("input");
    expectFieldsToHave("1234");
  });
});
