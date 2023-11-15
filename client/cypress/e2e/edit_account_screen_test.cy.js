describe('Edit Account Screen Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid=guest-button]').click();
      cy.get('[data-testid=user-icon]').click();
      cy.get('[data-testid=EditAccount]').click();
    });
  
    it('displays the title of the screen', () => {
        cy.get('[data-testid=title]').should('be.visible')
    });
  
    it('can edit the email', () => {
      const newEmail = 'newemail@example.com';
      cy.get('[data-testid=email-input]').clear().type(newEmail);
    });
  });