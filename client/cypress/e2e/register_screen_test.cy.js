describe('Register Screen Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('a').contains("Don't have an account?").click();
    });
  
    it('Verify weak password modal', () => {
        cy.get("#email").type("jesse@gmail.com");
        cy.get("#username").type("jesse");
        cy.get('#password').type("12345");
        cy.get('#passwordConfirm').type("12345");
        cy.get('button').contains('Create Account').click();
        cy.contains('Please enter a password of at least 8 characters.').should('be.visible'); 
    });
    
    it('Verify invalid email modal', () => {
      cy.get("#email").type("jesse");
      cy.get("#username").type("jesse");
      cy.get('#password').type("12345");
      cy.get('#passwordConfirm').type("12345");
      cy.get('button').contains('Create Account').click();
      cy.contains('Invalid email format, please try again.').should('be.visible'); 
    });

    it('Verify empty fields modal', () => {
      cy.get("#email").type("jesse@gmail.com");
      cy.get('#password').type("12345");
      cy.get('#passwordConfirm').type("12345");
      cy.get('button').contains('Create Account').click();
      cy.contains('Please enter all required fields.').should('be.visible'); 
    });

    it('Verify mismatching password modal', () => {
      cy.get("#email").type("jesse@gmail.com");
      cy.get("#username").type("jesse");
      cy.get('#password').type("1112345555");
      cy.get('#passwordConfirm').type("1112345555555555");
      cy.get('button').contains('Create Account').click();
      cy.contains('Please enter the same password twice.').should('be.visible'); 
    });

    it('Verify email already exists', () => {
      cy.get("#email").type("explorer@gmail.com");
      cy.get("#username").type("jesse");
      cy.get('#password').type("1234512345");
      cy.get('#passwordConfirm').type("1234512345");

      cy.get('button').contains('Create Account').click();
      cy.contains('An account with this email address already exists.').should('be.visible'); 

    });

    it('Verify username already exists', () => {
      cy.get("#email").type("explorerGuys@gmail.com");
      cy.get("#username").type("explorer");
      cy.get('#password').type("1234512345");
      cy.get('#passwordConfirm').type("1234512345");

      cy.get('button').contains('Create Account').click();
      cy.contains('An account with this username already exists.').should('be.visible'); 

    });

    it('Successful Register', () => {
      cy.request({
        method: 'DELETE',
        url: 'http://localhost:4000/auth/deleteAccount',
        body: {
          email: "explorerGuy@gmail.com" // Pass the email as part of the request body
        }
      });

      cy.get("#email").type("explorerGuy@gmail.com");
      cy.get("#username").type("explorerGuy");
      cy.get('#password').type("1234512345");
      cy.get('#passwordConfirm').type("1234512345");

      cy.get('button').contains('Create Account').click();
      cy.contains('Welcome to ExploreX!').should('be.visible'); 

    });
    
  });