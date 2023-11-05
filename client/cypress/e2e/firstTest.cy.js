describe('Text Presence Test', () => {
  it('Check if ExploreX is on the Screen', () => {
    cy.visit('http://localhost:4000/api/items'); 

    cy.contains('ExploreX').should('be.visible'); 
  });
});
