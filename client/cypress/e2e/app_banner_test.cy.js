describe('App Banner Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    // cy.get('[data-testid=guest-button]').click();
  });

  it('should display the app banner with all elements', () => {
    cy.get('[data-testid="username-field"]').type('cypress');
    cy.get('[data-testid="password-field"]').type('abcd1234');
    cy.get('[data-testid="login-button"]').click();

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="logo"] > path').should('be.visible');
    cy.get('[data-testid="app-name"]').should('have.text', 'ExploreX');
    cy.get('[data-testid="search-type"]').click();
    cy.get('[data-testid="search-type-option1"]').should('have.text', 'User');
    cy.get('[data-testid="search-type-option2"]').should('have.text', 'Map Name');
    cy.get('[data-testid="search-type-option2"]').click();
    cy.get('[data-testid="search-bar"] > .MuiInputBase-input').type('abc');
    cy.get('[data-testid="user-icon"]').should('be.visible');
    cy.get('[data-testid="user-icon"]').click();
    cy.get('[data-testid="My Profile"]').should('have.text', 'My Profile');
    cy.get('[data-testid="Edit Account"]').should('have.text', 'Edit Account');
    cy.get('[data-testid="Map Feed"]').should('have.text', 'Map Feed');
    cy.get('[data-testid="FAQ"]').should('have.text', 'FAQ');
    cy.get('[data-testid="Logout"]').should('have.text', 'Logout');
    cy.get('[data-testid="My Profile"]').click();
    cy.get('[data-testid="posts-tab"]').should('have.text', 'Posts');
    cy.get('[data-testid="user-icon"]').click();
    cy.get('[data-testid="Edit Account"]').click();
    cy.get('[data-testid="title"]').should('have.text', 'Let\'s make some changes');
    cy.get('[data-testid="user-icon"]').click();
    cy.get('[data-testid="Map Feed"]').click();
    cy.get('.MuiGrid-container > :nth-child(1)').should('be.visible');
    cy.get('[data-testid="user-icon"]').click();
    cy.get('[data-testid="FAQ"]').click();
    cy.get(':nth-child(2) > :nth-child(3) > #faq4-header > .MuiAccordionSummary-content > .MuiTypography-root').should('have.text', 'More questions?');

    // cy.get('form > .MuiTypography-h5').should('have.text', 'Welcome, Map Lovers!');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="AccountCircleIcon"]').eq(0).click();
    cy.get('.MuiList-root > :nth-child(5)').click();
    cy.get('form > .MuiTypography-h5').should('have.text', 'Welcome, Map Lovers!');
    /* ==== End Cypress Studio ==== */
  });
});
