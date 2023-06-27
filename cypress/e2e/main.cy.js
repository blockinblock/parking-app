import credentials from '../fixtures/credentials.json';

describe('Main functionality', () => {
  const firstPage = 10
  const secondPage = 3
  const secondPageId = 11

  beforeEach(() => {
    const username = credentials.username
    const password = credentials.password

    cy.visit('http://localhost:4200')
    cy.get('[data-test=login]').should('have.length', 1)
    cy.get('[data-test=username]').type(`${username}{enter}`)
    cy.get('[data-test=password]').type(`${password}{enter}`)
  })

  it('displays the data table', () => {
    cy.get('[data-test=table]').should('have.length', 1)
    cy.get('[data-test=row]').should('have.length', firstPage)
  })

  it('finds vehicle records', () => {
    const vehicleId = 'B 049532'

    cy.get('[data-test=filter-input]').type(`${vehicleId}{enter}`)
    cy.get('[data-test=row]').should('have.length', 3)
    cy.get('[data-test=cell]').eq(1).should('have.text', vehicleId)
  })

  it('does not find vehicle', () => {
    const vehicleId = 'ABC'
    const errMsg = 'No records found for vehicle id'

    cy.get('[data-test=filter-input]').type(`${vehicleId}{enter}`)
    cy.get('[data-test=message]')
      .should('have.length', 1)
      .should('have.text', `${errMsg} ${vehicleId}`)
  })

  it('resets the list', () => {
    cy.get('[data-test=reset-btn]').click()
    cy.get('[data-test=table]').should('have.length', 1)
    cy.get('[data-test=row]').should('have.length', firstPage)
  })

  it('goes to next page', () => {
    cy.get('.mat-paginator-navigation-next').click()
    cy.get('[data-test=table]').should('have.length', 1)
    cy.get('[data-test=row]').should('have.length', secondPage)
    cy.get('[data-test=cell]').eq(0).should('have.text', secondPageId)
  })

  it('logs out', () => {
    cy.get('[data-test=logout-btn]').click()
    cy.get('[data-test=username]').should('have.length', 1)
  })
})
