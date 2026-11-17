it('reads the id from the URL', () => {
  cy.visit('/pokemon/25')
  cy.contains('h2', '#25')
})