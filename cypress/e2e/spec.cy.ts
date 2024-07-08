describe('Should display my website', () => {
  beforeEach(() => {
    cy.visit('/login');
  })
  it('Should display content CONNECTEZ-VOUS', () => {
    cy.log('Checking if content is displayed');
    cy.contains(/Connectez-vous/);

    cy.wait(20000);
  })

  it('Should login title be visible', () => {
    cy.log('Checking login title is visible');
    cy.get('[data-cy="cypress-title"]').should('be.visible');

    cy.wait(20000);
  })
})