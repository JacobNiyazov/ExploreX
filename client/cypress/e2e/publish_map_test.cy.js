describe('Map Feed and Public Map View Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="username-field"]').type('cypress');
    cy.get('[data-testid="password-field"]').type('abcd1234');
    cy.get('[data-testid="login-button"]').click();
  });

  it('Publish a map', ()=>{
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-kn73zm > .MuiButtonBase-root').should('have.text', 'Create Map');
    cy.get('.css-kn73zm > .MuiButtonBase-root').should('be.visible');
    cy.get('.css-kn73zm > .MuiButtonBase-root').click();
    cy.get('.MuiGrid-grid-xs-6 > .MuiBox-root').should('have.text', ' Click to upload.JSON, .SHP/.DBF, .KML');
    cy.get('#demo-radio-buttons-group-label').should('have.text', 'Select a map type:');
    cy.get('.MuiFormGroup-root > :nth-child(2) > .MuiTypography-root').should('have.text', 'Dot Distribution Map');
    cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    const fileName = 'poland.geojson.json';

    cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();

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
    cy.get('[data-value="id"]').click();
    cy.get('.MuiBox-root > .MuiGrid-container > .MuiGrid-root > .MuiButtonBase-root').click();
    cy.get('#\\:r7\\:-label').should('be.visible');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.wait(500);
    cy.get('[data-testid="map-publish-button"] > .MuiTypography-root').should('have.text', 'Publish');
    cy.get('[data-testid="map-publish-button"] > .MuiTypography-root').click();
    cy.get('#modal-modal-description > div > span').should('have.text', 'Ready to Publish?');
    // cy.get('[data-testid="confirm"]').should('be.enabled');
    // cy.get('[data-testid="confirm"]').click();
    // cy.get('.MuiTypography-h4').should('have.text', 'Map Example');
    // cy.get('.MuiTypography-subtitle1').should('have.text', 'Author: cypress');
    // cy.get('.MuiCardContent-root > .MuiTypography-body1').should('have.text', 'Dot Distribution Map');
    // cy.get('.css-153odwb').should('be.visible');
    // cy.get('.PrivateSwitchBase-input').check();
    /* ==== End Cypress Studio ==== */
  })

  it('should delete published map', () =>{
    /* ==== Generated with Cypress Studio ==== */
    // cy.get('[data-testid="AccountCircleIcon"]').click();
    // cy.get('[data-testid="My Profile"]').click();
    // cy.get('.MuiCardMedia-root').last().click();
    // cy.get('[data-testid="delete-button"]').click();
    // cy.get('[data-testid="confirm-delete-button"]').click();
    /* ==== End Cypress Studio ==== */
  })
  
});
