beforeEach(() => {
    cy.visit('/')
})

it('Should render a pokemon stat card after search', () => {
    cy.get('#poke-name').type('ditto')
    cy.get('input[type=submit]').click()
    cy.get('#Ditto-card').should('be.visible')
    cy.get('#Ditto-card img').should('have.attr', 'alt', 'Ditto card image')
})

it('Should clear the input after search', () => {
    // {enter} hits the enter key
    cy.get('#poke-name').type('Ditto{enter}')
    cy.get('#poke-name').should('have.value', '')
})

it('does nothing on empty search submit', () => {
    cy.get('input[type=submit').click()
    cy.get('#name-input-error').should('have.text', 'Must Enter a Name')
})

it('does not add a duplicate pokemon', () => {
    //get input
    cy.get('#poke-name').type('ditto')
    cy.get('input[type=submit]').click()
    //get card is visible
    cy.get('#Ditto-card').should('be.visible')
    //add same input
    cy.get('#poke-name').type('ditto')
    cy.get('input[type=submit]').click()
    //make sure not in team container 'Already have this card.'
    cy.get('#team-error').should('have.text', 'Already have this card.')
    cy.get('#poke-team').children().should('have.length', 1)
})