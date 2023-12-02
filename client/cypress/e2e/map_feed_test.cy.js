describe('Map Feed and Public Map View Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="username-field"]').type('cypress');
    cy.get('[data-testid="password-field"]').type('abcd1234');
    cy.get('[data-testid="login-button"]').click();
  });
    it('leads to map feed and likes and dislikes',()=>{
    cy.get('[data-testid=map-feed-card-0]').first().within(()=>{
      cy.get('[data-testid=feed-likes-count]')
        .invoke('text')
        .then((initialLikesText) => {
          const initialLikes = parseInt(initialLikesText, 10);
          cy.get('[data-testid=feed-like-button]')
            .click();

          cy.get('[data-testid=feed-likes-count]')
            .invoke('text')
            .should('equal', (initialLikes + 1).toString());
      });
      cy.get('[data-testid=feed-dislikes-count]')
        .invoke('text')
        .then((initialDislikesText) => {
          cy.get('[data-testid=feed-likes-count]')
            .invoke('text')
            .then((initialLikesText) => {
              const initialLikes = parseInt(initialLikesText, 10);

              const initialDislikes = parseInt(initialDislikesText, 10);
              cy.get('[data-testid=feed-dislike-button]')
                .click();

              cy.get('[data-testid=feed-dislikes-count]')
                .invoke('text')
                .should('equal', (initialDislikes + 1).toString());
              cy.get('[data-testid=feed-likes-count]')
                .invoke('text')
                .should('equal', (initialLikes - 1).toString());
          });
      });
    })
  })
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
      cy.get('[data-testid=comment-input]').type("hello")
      cy.get('[data-testid=submit-comment]').click()
    })
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Test Public Map View', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="map-feed-card-0"] > .MuiCardMedia-root').click();
    cy.get('.MuiTypography-h4').should('have.text', 'Map Example');

    cy.get('.MuiTypography-subtitle1').should('have.text', 'Author: asd');
    cy.get('.MuiCardContent-root > .MuiTypography-body1').should('have.text', 'Heat Map');
    cy.get('.PrivateSwitchBase-input').check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.leaflet-control-zoom-out > span').click();
    cy.get('.leaflet-control-zoom-in > span').click();
    cy.get('.css-153odwb').should('be.visible');
    cy.get('.leaflet-control-attribution').should('have.text', ' Leaflet | © OpenStreetMap contributors');
    /* ==== End Cypress Studio ==== */
  });
});
