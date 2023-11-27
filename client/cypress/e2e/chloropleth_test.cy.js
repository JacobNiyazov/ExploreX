describe('Chloropleth Map Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('should create Chloropleth map', () => {
      cy.get('[data-testid="username-field"]').type('cypress');
      cy.get('[data-testid="password-field"]').type('abcd1234');
      cy.get('[data-testid="login-button"]').click();

      const fileName = 'sampleGeo.json';

      cy.get('[data-testid="AccountCircleIcon"]').click();
      cy.get('[data-testid="My Profile"]').click();
      cy.get('[data-testid="AddIcon"]').click();
      cy.get(':nth-child(3) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();

      cy.fixture(fileName).then(fileContent => {
          const blob = new Blob([JSON.stringify(fileContent)], { type: 'application/json' });
          const testFile = new File([blob], fileName, { type: 'application/json' });
  
          // Trigger the file upload process
          cy.get('.MuiGrid-grid-xs-6 > .MuiBox-root').click();
  
          cy.get('input[type="file"]').then(input => {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            input[0].files = dataTransfer.files;
  
            // Trigger the change event if necessary
            input[0].dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').click();
      cy.get('body').click();
      cy.wait(500);

      cy.get('body').click();

      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-value="Census 2011 Number of usual residents  in households"]').click();
      cy.get('.MuiBox-root > .MuiGrid-container > .MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('#\\:r7\\:-label').should('be.visible');

      /* ==== End Cypress Studio ==== */
    });
    it('should fail to create Chloropleth map', () => {
      cy.get('[data-testid="username-field"]').type('cypress');
      cy.get('[data-testid="password-field"]').type('abcd1234');
      cy.get('[data-testid="login-button"]').click();
  
      const fileName = 'sampleGeo.json';
  
      cy.get('[data-testid="AccountCircleIcon"]').click();
      cy.get('[data-testid="My Profile"]').click();
      cy.get('[data-testid="AddIcon"]').click();
      cy.get(':nth-child(3) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
  
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').click();
      cy.get('#modal-modal-description > div > p').should('have.text', 'There were no files uploaded.');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.fixture(fileName).then(fileContent => {
          const blob = new Blob([JSON.stringify(fileContent)], { type: 'application/json' });
          const testFile = new File([blob], fileName, { type: 'application/json' });
  
          // Trigger the file upload process
          cy.get('.MuiGrid-grid-xs-6 > .MuiBox-root').click();
  
          cy.get('input[type="file"]').then(input => {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            input[0].files = dataTransfer.files;
  
            // Trigger the change event if necessary
            input[0].dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').click();
      cy.get('body').click();
      cy.wait(500);

      /* ==== Generated with Cypress Studio ==== */
      cy.get('body').click();
      cy.get('[data-value="Start with empty map"]').click();
      cy.get('.MuiBox-root > .MuiGrid-container > .MuiGrid-root > .MuiButtonBase-root').click();
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get('#\\:r7\\:-label').should('be.visible');
      /* ==== End Cypress Studio ==== */
    });
  });