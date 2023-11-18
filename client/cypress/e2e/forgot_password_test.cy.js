describe('Forgot Password Screen Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('a').contains("Forgot your password?").click();
    });
  
    it('Verify successful forgotten password', () => {
        cy.get("#email").type("jessewang20@gmail.com");

        cy.get('button').contains('Recover').click();
        cy.contains('Please check your email for a password recovery link.').should('be.visible'); 

    });

    it('Verify no email modal', () => {
      cy.get('button').contains('Recover').click();
      cy.contains('Please enter an email.').should('be.visible'); 

  });

  it('Verify bad email modal', () => {
    cy.get("#email").type("thisdontexist@gmail.com");

    cy.get('button').contains('Recover').click();
    cy.contains('An account with this email address does not exist.').should('be.visible'); 

});
  });