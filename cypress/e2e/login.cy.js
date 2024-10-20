import credentials from "../fixtures/credentials.json";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("login success", () => {
    const username = credentials.username;
    const password = credentials.password;

    cy.get("[data-test=login]").should("have.length", 1);
    cy.get("[data-test=username]").type(`${username}{enter}`);
    cy.get("[data-test=password]").type(`${password}{enter}`);
    cy.get("[data-test=table]").should("have.length", 1);
    cy.get("[data-test=row]").should("have.length", 10);
  });

  it("login failure", () => {
    const username = "";
    const password = "";
    const error = "You are not authorised!";

    cy.get("[data-test=login]").should("have.length", 1);
    cy.get("[data-test=username]").type(`${username}{enter}`);
    cy.get("[data-test=password]").type(`${password}{enter}`);
    cy.get("[data-test=fail-message]").should("contain", `${error}`);
  });
});
