describe('Voronoi Map Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      // cy.get('[data-testid=guest-button]').click();
    });
  
    it('should create voronoi map', () => {
      cy.get('[data-testid="username-field"]').type('cypress');
      cy.get('[data-testid="password-field"]').type('abcd1234');
      cy.get('[data-testid="login-button"]').click();
  
      const fileName = 'voronoiExample.json';
  
      cy.get('[data-testid="AccountCircleIcon"]').click();
      cy.get('[data-testid="My Profile"]').click();
      cy.get('[data-testid="AddIcon"]').click();
      cy.get(':nth-child(4) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
  
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
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').should('have.text', 'Create Map')
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').click();
      cy.get('body').click();
      cy.wait(500);

      /* ==== End Cypress Studio ==== */
    });

    it('should delete created voronoi map', () =>{
        cy.get('[data-testid="username-field"]').type('cypress');
        cy.get('[data-testid="password-field"]').type('abcd1234');
        cy.get('[data-testid="login-button"]').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-testid="AccountCircleIcon"]').click();
        cy.get('[data-testid="My Profile"]').click();
        cy.wait(200);

        cy.get('[data-testid="drafts-tab"]').click();
        cy.get('.MuiCardActions-root > [data-testid="delete-button"] > [data-testid="DeleteIcon"]').last().click();
        cy.get('[data-testid="confirm-delete-button"]').click();
        /* ==== End Cypress Studio ==== */
    })

    it('should fail to create voronoi map', () => {
      cy.get('[data-testid="username-field"]').type('cypress');
      cy.get('[data-testid="password-field"]').type('abcd1234');
      cy.get('[data-testid="login-button"]').click();
  
      const fileName = 'poland.geojson.json';
  
      cy.get('[data-testid="AccountCircleIcon"]').click();
      cy.get('[data-testid="My Profile"]').click();
      cy.get('[data-testid="AddIcon"]').click();
      cy.get(':nth-child(4) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
  
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').should('have.text', 'Create Map')
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
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').should('have.text', 'Create Map');
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').click()
      cy.get('body').click();

      cy.get('#modal-modal-description > div > p').should('have.text', 'Voronoi Map requires only one Polygon feature.');
    });
  });
  