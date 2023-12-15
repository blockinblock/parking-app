import credentials from "../fixtures/credentials.json";

describe("Main functionality", () => {
  const firstPage = 10;
  const secondPage = 4;
  const secondPageId = 11;

  beforeEach(() => {
    const username = credentials.username;
    const password = credentials.password;

    cy.viewport(1280, 720);
    cy.visit("http://localhost:4200");
    cy.get("[data-test=login]").should("have.length", 1);
    cy.get("[data-test=username]").type(`${username}{enter}`);
    cy.get("[data-test=password]").type(`${password}{enter}`);
  });

  it("displays welcome", () => {
    cy.get("[data-test=welcome]").should("contain", credentials.username);
  });

  it("displays the data table", () => {
    cy.get("[data-test=table]").should("have.length", 1);
    cy.get("[data-test=row]").should("have.length", firstPage);
  });

  it("finds records for the given licence number", () => {
    const vehicleId = "B 049532";

    cy.get("[data-test=filter-input]").type(`${vehicleId}`);
    cy.get("[data-test=row]").should("have.length", 3);
    cy.get("[data-test=cell]").eq(1).should("contain", vehicleId);
  });

  it("finds records for the given month", () => {
    const month = "jun";

    cy.get("[data-test=filter-input]").type(month);
    cy.get("[data-test=row]").should("have.length", 5);
  });

  it("shows small logout button (small viewport)", () => {
    cy.viewport(1000, 600);
    cy.get("[data-test=logout-btn-small]").should("have.length", 1);
  });

  it("resets the filter", () => {
    const month = "jun";

    cy.get("[data-test=filter-input]").type(month);
    cy.get("[data-test=form-input]").find(".mdc-icon-button").click();
    cy.get("[data-test=table]").should("have.length", 1);
    cy.get("[data-test=row]").should("have.length", firstPage);
  });

  it("goes to next page", () => {
    cy.get(".mat-mdc-paginator-navigation-next").click();
    cy.get("[data-test=table]").should("have.length", 1);
    cy.get("[data-test=row]").should("have.length", secondPage);
    cy.get("[data-test=cell]").eq(0).should("contain", secondPageId);
  });

  it("logs out", () => {
    cy.get("[data-test=logout-btn-large]").click();
    cy.get("[data-test=username]").should("have.length", 1);
  });
});
