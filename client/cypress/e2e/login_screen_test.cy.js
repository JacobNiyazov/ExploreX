describe('Edit Account Screen Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });
  it('Empty field check', function() {
    cy.get('#username').type('failedaccount');
    cy.get('.MuiButton-containedPrimary').click();
    cy.contains('Please enter all required fields.').should('be.visible'); 
    cy.get('[data-testid="CloseIcon"]').click();
  });
  it('Unsucessful Login', function() {
    cy.get('#username').type('failedaccount');
    cy.get('#password').type('WRONGPASSWORD');
    cy.get('.MuiButton-containedPrimary').click();
    cy.contains('Wrong username or password provided.').should('be.visible'); 
    cy.get('[data-testid="CloseIcon"]').click();
  });
  it('Successful Login', function() {
    cy.get('#username').type('tester123');
    cy.get('#password').type('tester123');
    cy.get('.MuiButton-containedPrimary').click();
    cy.get('[data-testid=user-icon]').should('be.visible');
  });
});