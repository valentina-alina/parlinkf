const slowLoading = 30000;

describe('Should display my ads', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('Should display content FILE D\'ANNONCES', () => {
        cy.log('Checking if content is displayed');

        cy.get('input[role="email"', { timeout: slowLoading})
            .type('a-ortiz@email.com');
        cy.get('input[role="password"', { timeout: slowLoading})
            .type('contrasena');
        cy.get('[data-cy="login"]', { timeout: slowLoading})
            .click();

        cy.url()
            .should('match', /\/ads-list$/);

        cy.get('[data-cy="adslist"]', { timeout: slowLoading})
            .click();

        cy.url()
            .should('match', /\/ads-list2$/);
    })
})