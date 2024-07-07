describe('Should display my website', () => {
  beforeEach(() => {
    cy.visit('/login');
  })
  it('Should display content CONNECTEZ-VOUS', () => {
    cy.contains(/Connectez-vous/);

    cy.wait(20000);
  })

  it('Should login title exist', () => {
    cy.get('[data-cy="cypress-title"]').should('be.visible');

    cy.wait(20000);
  })
})