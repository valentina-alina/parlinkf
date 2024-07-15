import { faker } from '@faker-js/faker';

const email = faker.internet.email();
const password = faker.internet.password();
const slowLoader = 30000;

describe('Should display my website', () => {
  beforeEach(() => {
    cy.visit('/login');
  })
  it('Should display content CONNECTEZ-VOUS', () => {
    cy.log('Checking if content is displayed');
    cy.contains(/Connectez-vous/, { timeout: slowLoader});
  })

  it('Should login title be visible', () => {
    cy.log('Checking login title is visible');
    cy.get('[data-cy="cypress-title"]', { timeout: slowLoader})
      .should('be.visible')
      .should('have.text', 'Connectez-vous');
  })
  
  it('Should fail to login', () => {
    cy.log('Checking form data and click');

    cy.get('input[role="email"', { timeout: slowLoader})
      .type(email);
    cy.get('input[role="password"', { timeout: slowLoader})
      .type(password);

    cy.get('[data-cy="login"]', { timeout: slowLoader})
      .click();
  })

  it('Should check form data and click', () => {
    cy.log('Checking form data and click');

    cy.get('input[role="email"', { timeout: slowLoader})
      .type('a-ortiz@email.com');
    cy.get('input[role="password"', { timeout: slowLoader})
      .type('contrasena');

    cy.get('[data-cy="login"]', { timeout: slowLoader})
      .click();
    cy.url()
      .should('match', /\/ads-list$/);
  })

})