describe('Profile Screen Test', () => {
  beforeEach(() => {
    cy.viewport(1200,900);
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=username-field]').type("cypress")
    cy.get('[data-testid=password-field]').type("abcd1234")
    cy.get('[data-testid=login-button]').click();
    cy.get('[data-testid=user-icon]').click();
    cy.get('[data-testid="My Profile"]').click();
  });

  it('displays the user bio', () => {
    cy.get('[data-testid=bio-text]').should('exist');
  });

  it('can switch between Posts and Drafts tabs', () => {
    cy.get('[data-testid=drafts-tab]').click();
    cy.get('[data-testid=drafts-tab]').should('have.css', 'color', 'rgb(255, 118, 214)');
    cy.get('[data-testid=posts-tab]').should('have.css', 'color', 'rgb(255, 255, 255)');

    cy.get('[data-testid=posts-tab]').click();
    cy.get('[data-testid=posts-tab]').should('have.css', 'color', 'rgb(255, 118, 214)');
    cy.get('[data-testid=drafts-tab]').should('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('shows the import modal when import button is clicked', () => {
    cy.get('[data-testid=AddIcon]').click();
    cy.get('[data-testid=import-modal]').should('be.visible');
  });

  it('deletes a draft post when confirm is pressed in the delete modal', () => {
    cy.get('[data-testid=drafts-tab]').click();
    cy.get('[data-testid=map-draft-1]').first().within(() => {
      cy.get('[data-testid=delete-button]').click();
    });

  });

  it('navigates to the edit screen when edit button is pressed on a draft post', () => {
    cy.get('[data-testid=drafts-tab]').click();
    cy.get('[data-testid=map-draft-0]').first().within(() => {
      cy.get('[data-testid=edit-button]').click();
    });
  });
});
