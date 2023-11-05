describe('Text Presence Test', () => {
  it('Check if ExploreX is on the Screen', () => {
    cy.visit('http://localhost:3000'); 

    cy.contains('ExploreX').should('be.visible'); 
  });
});