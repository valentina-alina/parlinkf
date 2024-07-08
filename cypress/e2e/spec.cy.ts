import { faker } from '@faker-js/faker';

const email = faker.internet.email();
const password = faker.internet.password();

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
    cy.get('[data-cy="cypress-title"]').should('be.visible').should('have.text', 'Connectez-vous');

    cy.wait(20000);
  })

  it('Should check form data and click', () => {
    cy.log('Checking form data and click');

    cy.get('input[role="email"').type('valu@email.fr');
    cy.get('input[role="password"').type('password');

    cy.get('[data-cy="login"]').click();
    cy.url().should('match', /\/ads-list$/);

    cy.wait(20000);
  })

  it('Should fail to login', () => {
    cy.log('Checking form data and click');

    cy.get('input[role="email"').type(email);
    cy.get('input[role="password"').type(password);

    cy.get('[data-cy="login"]').click();

    cy.wait(20000);
  })
})