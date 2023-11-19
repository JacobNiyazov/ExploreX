describe('Edit Account Screen Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid=guest-button]').click();
      cy.get('[data-testid="user-icon"]').click();
      cy.get('[data-testid="Edit Account"]').click();
    });
  
    it('displays the fields', () => {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-testid="title"]').should('have.text', 'Let\'s make some changes');
      cy.get('[data-testid="username-input"] > #basic-input').should('be.enabled');
      cy.get('[data-testid="bio-input"] > #basic-input').should('be.enabled');
      cy.get('[data-testid="email-input"] > #basic-input').should('be.enabled');
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').should('be.enabled');
      cy.get('.MuiGrid-container > :nth-child(2)').should('have.text', 'Username');
      cy.get('.css-1e6pl0a-MuiGrid-root > .MuiFormControl-root').should('have.text', 'Bio');
      cy.get('.css-1osj8n2-MuiGrid-root > :nth-child(1)').should('have.text', 'Email');
      cy.get('.css-1osj8n2-MuiGrid-root > :nth-child(2)').should('have.text', 'Password');
      cy.get('.css-1osj8n2-MuiGrid-root > :nth-child(3)').should('have.text', 'Confirm Password');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').should('be.enabled');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').should('have.text', 'Save Changes');
      /* ==== End Cypress Studio ==== */
    });

    it('empty username error', () => {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-testid="email-input"] > #basic-input').type('apple@gmail.com');
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').type('abcd1234');
      cy.get(':nth-child(3) > .MuiInputBase-root > #basic-input').type('abcd1234');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('h4').should('have.text', 'Username Required');
      /* ==== End Cypress Studio ==== */
    });
    it('email error', () => {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-testid="username-input"] > #basic-input').type('amazing');
      cy.get('[data-testid="email-input"] > #basic-input').type('apple@mailg');
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').type('abcd1234');
      cy.get(':nth-child(3) > .MuiInputBase-root > #basic-input').type('abcd1234');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('h3').should('have.text', 'Invalid Email');
      /* ==== End Cypress Studio ==== */
    });
    it('password error', () => {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-testid="username-input"] > #basic-input').type('hellomotto');
      cy.get('[data-testid="email-input"] > #basic-input').type('apple@gmail.com');
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').type('abc');
      cy.get(':nth-child(3) > .MuiInputBase-root > #basic-input').type('abc');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('h4').should('have.text', 'Password Too Short');
      cy.get('[data-testid="CloseIcon"] > path').click();
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').type('abc12345');
      cy.get(':nth-child(3) > .MuiInputBase-root > #basic-input').type('abc12346');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('h4').should('have.text', 'Passwords Do Not Match');
      cy.get('[data-testid="CloseIcon"] > path').click();
      /* ==== End Cypress Studio ==== */
    });
    it('email/username not unique error', () => {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-testid="username-input"] > #basic-input').type('explorer');
      cy.get('[data-testid="email-input"] > #basic-input').type('apple@gmail.com');
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').type('abcd1234');
      cy.get(':nth-child(3) > .MuiInputBase-root > #basic-input').type('abcd1234');
      cy.get('[data-testid="submit-button"]').click();
      cy.get('#modal-modal-description > div > p').should('have.text', 'An account with this username already exists.');
      /* ==== End Cypress Studio ==== */

      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-testid="CloseIcon"] > path').click();
      cy.get('[data-testid="email-input"] > #basic-input').click();
      cy.get('[data-testid="email-input"] > #basic-input').clear('apple@gmail.com');
      cy.get('[data-testid="email-input"] > #basic-input').type('explorer@gmail.com');
      cy.get('[data-testid="username-input"] > #basic-input').type('1');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('#modal-modal-description > div > p').should('have.text', 'An account with this email address already exists.');
      /* ==== End Cypress Studio ==== */
    });

    it('successful edit of details', () => {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-testid="username-input"] > #basic-input').type('firstTest');
      cy.get('[data-testid="bio-input"] > #basic-input').clear().type('Hey Im the first');
      cy.get('[data-testid="email-input"] > #basic-input').clear().type('test1@gmail.com');
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').clear().type('12345678');
      cy.get(':nth-child(3) > .MuiInputBase-root > #basic-input').clear().type('12345678');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('h4').should('have.text', 'Success');
      cy.get('[data-testid="CloseIcon"] > path').click();
      cy.get('[data-testid="username-input"] > #basic-input').clear().type('secTest');
      cy.get('[data-testid="bio-input"] > #basic-input').clear().type('Hey Im the second');
      cy.get('[data-testid="email-input"] > #basic-input').clear().type('test2@gmail.com');
      cy.get(':nth-child(2) > .MuiInputBase-root > #basic-input').clear().type('abcd1234');
      cy.get(':nth-child(3) > .MuiInputBase-root > #basic-input').clear().type('abcd1234');
      cy.get('.css-1osj8n2-MuiGrid-root > .MuiButtonBase-root').click();
      cy.get('h4').should('have.text', 'Success');
      /* ==== End Cypress Studio ==== */

    });

  });