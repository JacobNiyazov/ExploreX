describe('Edit Map Screen Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
      cy.get('[data-testid="username-field"]').type('cypress');
      cy.get('[data-testid="password-field"]').type('abcd1234');
      cy.get('[data-testid="login-button"]').click();
      cy.get('[data-testid=user-icon]').click();
      cy.get('[data-testid="My Profile"]').click();
      cy.get('[data-testid=drafts-tab]').click();
      cy.get('[data-testid=EditScreenButton]').first().click();
    });
  
    it('can type into title', () => {
      cy.get('[data-testid=title-input]').click().type('{selectall}{backspace}').type('Example Title')
      cy.get('[data-testid=title-input]').find('input').should('have.value', 'Example Title');
    });
  
    it('Open color switch and change color', () => {
      cy.get('[data-testid~=edit-accordion]').each((val, i, collection) => {
        cy.wrap(val).click()
        cy.wrap(val).within(()=>{
          cy.get('[data-testid=color-text]').each((color,i,collection)=>{
            cy.get('[data-testid=color-text]').eq(i).click().type('{selectall}{backspace}').type("FFFFFF");
            cy.get('[data-testid=color-text]').find('input').should('have.value', 'FFFFFF');
            cy.get('[data-testid=color-box]').eq(i).should('have.css', 'background-color', 'rgb(255, 255, 255)');
            cy.get('[data-testid=color-box]').eq(i).click()
            cy.document().its('body').find('[data-testid=color-picker]').should('be.visible')
            cy.document().its('body').find('[data-testid=color-picker]').click()
          })
        })
      })
    }); 
  
    /*it('navigates to the Public Map View when map is published', () => {
      cy.get('[data-testid=map-publish-button]').click();
      cy.get('[data-testid=map-publish]').click();
      cy.get('[data-testid=public-map-view]').should('exist');
    });*/

    it('Test Text Accordian Buttons', () => {
      cy.get('[data-testid~=edit-accordion]').eq(0).click();
      cy.get('[data-testid=font-selector]').click();
      cy.get('[data-value="Andale Mono"]').click();
      cy.get('[data-testid=font-selector]').find('input').should('have.value', 'Andale Mono');
      cy.get('[data-testid=text-selector]').clear();
      cy.get('[data-testid=text-selector]').type('20');
      cy.get('[data-testid=text-selector]').find('input').should('have.value', '20');
      
    })

    it('Test Legend Accordian Buttons', () => {
      cy.get('[data-testid~=edit-accordion]').eq(1).click();

      cy.get('[data-testid=legend-selector]').clear();
      cy.get('[data-testid=legend-selector]').type('20');
      cy.get('[data-testid=legend-selector]').find('input').should('have.value', '20');
      
      cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > .MuiList-root > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
      cy.get('.MuiPaper-root.Mui-expanded > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > .MuiList-root > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
      
    })

    it('Test Region Accordian Buttons', () => {
      cy.get('body').then((body) => {
        if (body.find('[data-testid~=region]').length > 0) {
            cy.get('[data-testid~=region]').click();
            cy.get('[data-testid=region-selector1]').clear();
            cy.get('[data-testid=region-selector1]').type('20');
            cy.get('[data-testid=region-selector1]').find('input').should('have.value', '20');

            cy.get('[data-testid=region-selector2]').clear();
            cy.get('[data-testid=region-selector2]').type('20');
            cy.get('[data-testid=region-selector2]').find('input').should('have.value', '20');
        }
      });
    })

    it('Test Heat Map Accordian Buttons', () => {
      cy.get('body').then((body) => {
        if (body.find('[data-testid~=heat-map]').length > 0) {
            cy.get('[data-testid~=heat-map]').click();
            cy.get('[data-testid=heat-map-selector]').clear();
            cy.get('[data-testid=heat-map-selector]').type('20');
            cy.get('[data-testid=heat-map-selector]').find('input').should('have.value', '20');
        }
      });
    })

    it('Test Dot Map Accordian Buttons', () => {
      cy.get('body').then((body) => {
        if (body.find('[data-testid~=dot-map]').length > 0) {
            cy.get('[data-testid~=dot-map]').click();
            cy.get('[data-testid=dot-map-selector]').clear();
            cy.get('[data-testid=dot-map-selector]').type('20');
            cy.get('[data-testid=dot-map-selector]').find('input').should('have.value', '20');
        }
      });
    })

    it('Test Spike Map Accordian Buttons', () => {
      cy.get('body').then((body) => {
        if (body.find('[data-testid~=spike-map]').length > 0) {
            cy.get('[data-testid~=spike-map]').click();
            cy.get('[data-testid=spike-map-selector]').clear();
            cy.get('[data-testid=spike-map-selector]').type('20');
            cy.get('[data-testid=spike-map-selector]').find('input').should('have.value', '20');
        }
      });
    })

    it('Test Voronoi Map Accordian Buttons', () => {
      cy.get('body').then((body) => {
        if (body.find('[data-testid~=voronoi-map]').length > 0) {
            cy.get('[data-testid~=voronoi-map]').click();
            cy.get('[data-testid=voronoi-map-selector]').clear();
            cy.get('[data-testid=voronoi-map-selector]').type('20');
            cy.get('[data-testid=voronoi-map-selector]').find('input').should('have.value', '20');
        }
      });
    })  
  });