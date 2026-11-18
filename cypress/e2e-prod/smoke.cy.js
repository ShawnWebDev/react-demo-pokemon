

it('opens a Pokemon from its address', () => {
  cy.visit('/#/pokemon/25')
  cy.contains('h2', 'Pokemon #25')
})