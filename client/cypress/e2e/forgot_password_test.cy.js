describe('Forgot Password Screen Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('a').contains("Forgot your password?").click();
    });
  
    it('Veriify successful forgotten password', () => {
        cy.get("#username").type("jesse@gmail.com");

        cy.get('button').contains('Recover').click();
        cy.contains('Password recovery email sent').should('be.visible'); 

    });
  });