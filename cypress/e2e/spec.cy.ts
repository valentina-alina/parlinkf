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

  it('Should check form data and click', () => {
    cy.log('Checking form data and click');

    cy.get('input[role="email"').type('valu@email.fr');
    cy.get('input[role="password"').type('password');

    cy.get('[data-cy="login"]').click();

    cy.wait(20000);
  })
})