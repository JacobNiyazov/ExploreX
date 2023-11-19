describe('Map Feed and Public Map View Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=guest-button]').click();
  });

  it('updates likes and dislikes', () => {
    cy.get('[data-testid=map-feed-card-0]').first().within(() => {
      cy.get('[data-testid=feed-like-button]').click();
      cy.get('[data-testid=feed-likes-count]').should('have.text', '11');

      cy.get('[data-testid=feed-dislike-button]').click();
      cy.get('[data-testid=feed-dislikes-count]').should('have.text', '3');
      cy.get('[data-testid=feed-likes-count]').should('have.text', '10');
    });
  });
  it('leads to public view page and likes and dislikes', ()=>{
    cy.get('[data-testid=map-feed-card-0]').click();
    cy.get('[data-testid=public-map-view]').first().within(()=>{
      cy.get('[data-testid=map-like-button]').click();
      cy.get('[data-testid=map-likes-count]').should('have.text', '11');

      cy.get('[data-testid=map-dislike-button]').click();
      cy.get('[data-testid=map-dislikes-count]').should('have.text', '3');
      cy.get('[data-testid=map-likes-count]').should('have.text', '10');
    })
  })
  it('leads to public map view and leaves a comment', ()=>{
    cy.get('[data-testid=map-feed-card-0]').click();
    cy.get('[data-testid=public-map-view]').first().within(()=>{
      cy.get('[data-testid=comment-input]').type("hello!!")
      cy.get('[data-testid=submit-comment]').click()
    })
  })
});
