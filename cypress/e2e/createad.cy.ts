const slowLoadRes = 30000;

describe('Should display my ads', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('Should display content map page', () => {
        cy.log('Checking if content is displayed');

        cy.get('input[role="email"', { timeout: slowLoadRes})
            .type('valu@email.fr');
        cy.get('input[role="password"', { timeout: slowLoadRes})
            .type('password');
        cy.get('[data-cy="login"]', { timeout: slowLoadRes})
            .click();

        cy.url()
            .should('match', /\/ads-list$/);

        cy.get('[data-cy="create-ad"]', { timeout: slowLoadRes})
            .click();

        cy.url()
            .should('match', /\/ajouter-annonce$/);

        cy.get('h1', { timeout: slowLoadRes})
            .should('exist')
    })
})