describe('Map Feed and Public Map View Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=guest-button]').click();
  });

  it('loads the map feed', () => {
    cy.get('[data-testid=map-feed-card]').should('have.length.at.least', 1);
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > [data-testid="map-feed-card"] > .MuiCardContent-root > .css-8g2ide > .MuiBox-root > :nth-child(1) > [data-testid="ThumbUpIcon"] > path').click();
    cy.get(':nth-child(1) > [data-testid="map-feed-card"] > .MuiCardContent-root > .css-8g2ide > .MuiBox-root > .css-omj7so > [data-testid="ThumbDownIcon"] > path').click();
    cy.get(':nth-child(1) > [data-testid="map-feed-card"] > .MuiCardContent-root > .css-8g2ide > .css-zg1vud > .css-rklg78').should('be.visible');
    cy.get(':nth-child(1) > [data-testid="map-feed-card"] > .MuiCardContent-root > .css-8g2ide > .css-zg1vud > .css-r8b4a').should('be.visible');
    cy.get(':nth-child(1) > [data-testid="map-feed-card"] > .MuiCardContent-root > .css-8g2ide').click();
    cy.get('.MuiButtonBase-root > .MuiTypography-root').should('have.text', 'Fork');
    cy.get('.MuiTypography-h4').should('be.visible');
    cy.get('.MuiCardMedia-root').should('be.visible');
    cy.get('.MuiTypography-subtitle1').should('be.visible');
    cy.get('.MuiCardContent-root > .MuiTypography-body1').should('be.visible');
    cy.get('[data-testid="ThumbUpIcon"] > path').click();
    cy.get('[data-testid="comment-input"]').click();
    cy.get('[data-testid="comment-input"]').type('great map');
    cy.get('[data-testid="submit-comment"]').should('have.text', 'Post Comment');
    /* ==== End Cypress Studio ==== */
  });
});
