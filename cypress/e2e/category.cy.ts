const slowLoadResult = 30000;

describe('Should display my ads', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('Should display content map page', () => {
        cy.log('Checking if content is displayed');

        cy.get('input[role="email"', { timeout: slowLoadResult})
            .type('a-ortiz@email.com');
        cy.get('input[role="password"', { timeout: slowLoadResult})
            .type('contrasena');
        cy.get('[data-cy="login"]', { timeout: slowLoadResult})
            .click();

        cy.url()
            .should('match', /\/ads-list$/);
        
        cy.get('[data-cy="category"]', { timeout: slowLoadResult}).eq(1).should('be.visible')
        cy.get('[data-cy="category"]', { timeout: slowLoadResult}).eq(2).should('have.text', 'Garderie');
        cy.get('[data-cy="category"]', { timeout: slowLoadResult}).eq(5).should('be.visible')
    })
})