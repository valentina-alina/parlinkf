describe('Should display my website', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  })
  it('Should display content CONNECTEZ-VOUS', () => {
    cy.contains(/Connectez-vous/);
  })

  it('Should login title exist', () => {
    cy.get('[data-cy="cypress-title"]').should('exist');
  })
})