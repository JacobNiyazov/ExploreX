describe('App Banner Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=guest-button]').click();
  });

  it('should display the app banner with all elements', () => {
    cy.get('[data-testid=app-banner]').should('exist');
    cy.get('[data-testid=logo]').should('exist');
    cy.get('[data-testid=app-name]').should('contain', 'ExploreX');
    cy.get('[data-testid=search-bar]').should('exist');
    cy.get('[data-testid=user-icon]').should('exist');
  });

  it('should allow typing in the search bar', () => {
    cy.get('[data-testid=search-bar]').type('search query');
  });

  it('should display dropdown options when search type is clicked', () => {
    cy.get('[data-testid=search-type]').click();
    cy.get('[data-testid=search-type-option]').should('have.length', 2); // If you have 2 options
  });

  it('should open a menu when user icon is clicked', () => {
    cy.get('[data-testid=user-icon]').click();
    cy.get('[data-testid=user-menu]').should('be.visible');
    cy.get('[data-testid=FAQ]').click();
    cy.contains("Don't know where to start?").should('exist');

  });

});
