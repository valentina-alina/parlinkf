const slowLoader = 30000;

describe('Should display my ads', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('Should display content FILE D\'ANNONCES', () => {
        cy.log('Checking if content is displayed');

        cy.get('input[role="email"', { timeout: slowLoader})
            .type('valu@email.fr');
        cy.get('input[role="password"', { timeout: slowLoader})
            .type('password');
        cy.get('[data-cy="login"]', { timeout: slowLoader})
            .click();

        cy.url()
            .should('match', /\/ads-list$/);

        cy.get('[data-cy="ads"]', { timeout: slowLoader})
            .should('exist')
            .and(($el) => {
                expect($el.text()).to.include('Fil des annonces');
            });
    })
})