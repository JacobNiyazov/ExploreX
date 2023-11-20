describe('Map Feed and Public Map View Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="username-field"]').type('cypress');
    cy.get('[data-testid="password-field"]').type('abcd1234');
    cy.get('[data-testid="login-button"]').click();
  });

  it('leads to public view page and likes and dislikes', ()=>{
    cy.get('[data-testid=map-feed-card-0]').click();
    cy.get('[data-testid=public-map-view]').first().within(()=>{
      cy.get('[data-testid=map-likes-count]')
        .invoke('text')
        .then((initialLikesText) => {
          const initialLikes = parseInt(initialLikesText, 10);
          cy.get('[data-testid=map-like-button]')
            .click();

          cy.get('[data-testid=map-likes-count]')
            .invoke('text')
            .should('equal', (initialLikes + 1).toString());
      });
      cy.get('[data-testid=map-dislikes-count]')
        .invoke('text')
        .then((initialDislikesText) => {
          cy.get('[data-testid=map-likes-count]')
            .invoke('text')
            .then((initialLikesText) => {
              const initialLikes = parseInt(initialLikesText, 10);

              const initialDislikes = parseInt(initialDislikesText, 10);
              cy.get('[data-testid=map-dislike-button]')
                .click();

              cy.get('[data-testid=map-dislikes-count]')
                .invoke('text')
                .should('equal', (initialDislikes + 1).toString());
              cy.get('[data-testid=map-likes-count]')
                .invoke('text')
                .should('equal', (initialLikes - 1).toString());
          });
      });
      cy.get('[data-testid=map-dislikes-count]')
        .invoke('text')
        .then((initialDislikesText) => {
          const initialDislikes = parseInt(initialDislikesText, 10);
          cy.get('[data-testid=map-dislike-button]')
            .click();

          cy.get('[data-testid=map-dislikes-count]')
            .invoke('text')
            .should('equal', (initialDislikes - 1).toString());
      });
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
