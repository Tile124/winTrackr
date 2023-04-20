describe('Homepage Component', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('displays the main banner', () => {
      cy.get('.main-banner').should('be.visible');
    });
  
    it('displays the headline', () => {
      cy.get('.headline').should('contain.text', 'Win Big with Our Lottery Data!');
    });
  
    it('displays the subheadline', () => {
      cy.get('.subheadline').should('contain.text', 'Discover trends, patterns, and insights to boost your chances.');
    });
  
    it('displays the gambling activity line', () => {
      cy.get('.tax-info').should('contain.text', 'Track your gambling activity and make tax reporting a breeze!');
    });
  
    it('displays the login button', () => {
        cy.get('button').should('contain.text', 'Login');
      });
  
      it('displays the login button with the correct background color', () => {
        cy.get('button[mat-raised-button]')
          .should('be.visible')
          .and('have.attr', 'style', 'background-color: #0021A5;')
          .and('contain.text', 'Login');
      });

    it('has the correct page title', () => {
      cy.title().should('equal', 'WinTrackr');
    });
    it('displays correct css for button', () => {
        cy.get('button').should('have.css', 'background-color', 'rgb(0, 33, 165)');
      });
  
  });
  