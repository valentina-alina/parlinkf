const slowLoad = 30000;

describe('Should display my ads', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('Should display content map page', () => {
        cy.log('Checking if content is displayed');

        cy.get('input[role="email"', { timeout: slowLoad})
            .type('valu@email.fr');
        cy.get('input[role="password"', { timeout: slowLoad})
            .type('password');
        cy.get('[data-cy="login"]', { timeout: slowLoad})
            .click();

        cy.url()
            .should('match', /\/ads-list$/);

        cy.get('[data-cy="map"]', { timeout: slowLoad})
            .click();

        cy.url()
            .should('match', /\/carte$/);

        cy.get('[data-cy="no-ads"]', { timeout: slowLoad})
            .should('not.exist')
    })
})