describe('Profile Screen Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid=guest-button]').click();
      cy.get('[data-testid=user-icon]').click();
      cy.get('[data-testid=MyProfile]').click();
    });
  
    it('displays the user bio', () => {
      cy.get('[data-testid=bio-text]').should('exist');
    });
  
    it('can switch between Posts and Drafts tabs', () => {
      cy.get('[data-testid=drafts-tab]').click();
      cy.get('[data-testid=drafts-tab]').should('have.css', 'background-color', 'rgb(255, 118, 214)'); // Check the color
      cy.get('[data-testid=posts-tab]').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  
      cy.get('[data-testid=posts-tab]').click();
      cy.get('[data-testid=posts-tab]').should('have.css', 'background-color', 'rgb(255, 118, 214)'); // Check the color
      cy.get('[data-testid=drafts-tab]').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });  
  });