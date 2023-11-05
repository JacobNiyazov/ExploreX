describe('Form Input and Button Click Test', () => {
    it('Fill form and click submit', () => {
      // Visit the webpage with the form
      cy.visit('http://localhost:3000'); // Replace with your URL
  
      // Find the input field and type a value
      cy.get('input[name="textField"]').type('Whats good'); // Replace with the actual input field selector and the desired input
  
      // Find the button and click it
      cy.get('button[type="submit"]').click(); // Replace with the actual button selector
      
    });
  });
  