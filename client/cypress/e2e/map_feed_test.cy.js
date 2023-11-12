describe('Map Feed and Public Map View Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=guest-button]').click();
  });

  it('loads the map feed', () => {
    cy.get('[data-testid=map-feed-card]').should('have.length.at.least', 1);
  });

  it('navigates to the Public Map View when a map card is clicked', () => {
    cy.get('[data-testid=map-feed-card]').first().click();
    cy.get('[data-testid=public-map-view]').should('exist');
  });

  it('likes and dislikes work in Public Map View', () => {
    cy.get('[data-testid=map-feed-card]').first().click();
    cy.get('[data-testid=like-button]').click();
    cy.get('[data-testid=dislike-button]').click();
  });

  it('can submit a comment in Public Map View', () => {
    cy.get('[data-testid=map-feed-card]').first().click();
    cy.get('[data-testid=comment-input]').type('This is a test comment');
    cy.get('[data-testid=submit-comment]').click();
  });
});
