describe('Register Screen Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('a').contains("Don't have an account?").click();
    });
  
    it('Veriify successful register', () => {
        cy.get("#username").type("jesse@gmail.com");
        cy.get('#password').type("12345");
        cy.get('#passwordConfirm').type("12345");

        cy.get('button').contains('Create Account').click();
        cy.contains('Welcome to ExploreX!').should('be.visible'); 


    });
  
    it('Verify failed register', () => {
      cy.get("#username").type("jesse@gmail.com");
        cy.get('#password').type("12345");
        cy.get('#passwordConfirm').type("1234512345");

        cy.get('button').contains('Create Account').click();
        cy.contains('Passwords do not match').should('be.visible'); 

    });
  });