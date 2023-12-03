describe('Fork Public Map Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid="username-field"]').type('cypress');
      cy.get('[data-testid="password-field"]').type('abcd1234');
      cy.get('[data-testid="login-button"]').click();
    });
    it('Should fork a map and then later delete it', ()=>{
        cy.get('[data-testid=map-feed-card-0]').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-testid="CallSplitIcon"]').click();
        // cy.get('#\\:r3\\:-label').should('be.visible');
        // cy.get('[data-testid="AccountCircleIcon"]').click();
        // cy.get('[data-testid="My Profile"]').click();
        // cy.wait(1000);
        // cy.get('[data-testid="drafts-tab"]').click();
        // cy.wait(1000);
        // cy.get('[data-testid="map-draft-0"] > .MuiCardActions-root > [data-testid="delete-button"] > [data-testid="DeleteIcon"] > path').click();
        // cy.get('[data-testid="confirm-delete-button"]').click();
        /* ==== End Cypress Studio ==== */
    });
});