describe('Edit Map Screen Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid="username-field"]').type('cypress');
      cy.get('[data-testid="password-field"]').type('abcd1234');
      cy.get('[data-testid="login-button"]').click();
      cy.get('[data-testid=user-icon]').click();
      cy.get('[data-testid="My Profile"]').click();
      cy.get('[data-testid=drafts-tab]').click();
      cy.get('[data-testid=EditScreenButton]').first().click();
    });
  
    it('can type into title', () => {
      cy.get('[data-testid=title-input]').click().type('{selectall}{backspace}').type('Example Title');
    });
  
    it('Open color switch and change color', () => {
      cy.get('[data-testid=edit-accordion]').first().click();
      cy.get('[data-testid=color-text]').first().click().type('{selectall}{backspace}').type("FFFFFF")
      cy.get('[data-testid=color-box]').first().should('have.css', 'background-color', 'rgb(255, 255, 255)');
  
      cy.get('[data-testid=color-box]').first().click()
      cy.get('[data-testid=color-picker]').first().should('be.visible')
    }); 
  
    it('navigates to the Public Map View when map is published', () => {
      cy.get('[data-testid=map-publish-button]').click();
      cy.get('[data-testid=map-publish]').click();
    });
  
  });