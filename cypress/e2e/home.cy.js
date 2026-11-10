beforeEach(() => {
    cy.visit('/')
})

it('should have a heading', () => {
    cy.get('#main-header').should('be.visible')
})

it('start with an empty poke-team container', () => {
    cy.get('#poke-team').children().should('have.length', 0)
})

it('counts clicks', () => {
    cy.get('#count_button').click().click()
    cy.get('#count').should('have.text', "Count: 2")
})