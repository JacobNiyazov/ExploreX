describe('Edit Map Screen Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid=guest-button]').click();
      cy.get('[data-testid=user-icon]').click();
      cy.get('[data-testid=MyProfile]').click();
      cy.get('[data-testid=drafts-tab]').click();
      cy.get('[data-testid=EditScreenButton]').first().click();
    });
  
    it('can type into title', () => {
      cy.get('[data-testid=title-input]').click().type('{selectall}{backspace}').type('Example Title');
    });
  
    it('Open color switch and change color', () => {
      cy.get('[data-testid=edit-accordion]').each((val, i, collection) => {
        cy.wrap(val).click()
        cy.wrap(val).within(()=>{
          cy.get('[data-testid=color-text]').each((color,i,collection)=>{
            cy.get('[data-testid=color-text]').eq(i).click().type('{selectall}{backspace}').type("FFFFFF");
            cy.get('[data-testid=color-box]').eq(i).should('have.css', 'background-color', 'rgb(255, 255, 255)');
            cy.get('[data-testid=color-box]').eq(i).click()
            cy.document().its('body').find('[data-testid=color-picker]').should('be.visible')
            cy.document().its('body').find('[data-testid=color-picker]').click()
          })
        })
      })
    }); 
  
    it('navigates to the Public Map View when map is published', () => {
      cy.get('[data-testid=map-publish-button]').click();
      cy.get('[data-testid=map-publish]').click();
      cy.get('[data-testid=public-map-view]').should('exist');
    });
  
  });