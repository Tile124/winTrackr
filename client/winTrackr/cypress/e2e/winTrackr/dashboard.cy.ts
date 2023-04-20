describe('Dashboard Component', () => {
    beforeEach(() => {
      // Log in and navigate to the dashboard before each test
        cy.visit('/login');
        cy.get('input[type="email"]').type('admin');
        cy.get('input[type="password"]').type('password');
        cy.get('button[type="submit"]').click();
        cy.visit('/dashboard');
    });
  
    it('should display a welcome message', () => {
        cy.get('.welcome-text').should('have.text', 'Loading...');
      });
    
      it('should display scratch off entries', () => {
        cy.get('.entries-section table').should('be.visible');
      });
    
      it('should display an add scratch off entry form', () => {
        cy.get('.entry-form-section form').should('be.visible');
      });
    
      it('should display an overall stats section', () => {
        cy.get('.stats-section').should('be.visible');
      });
    
      it('should display a generate tax report button', () => {
        cy.get('.tax-report-section button').should('be.visible');
      });
    
      it('should display a logout button', () => {
        cy.get('.logout-section button').should('be.visible');
      });
      
    it('should add new entry', () => {
        cy.get('button[type="submit"]').click();
    });
  
    it('should refresh entries', () => {
      cy.get('button').contains('Refresh').click();
    });
  
    it('should display an alert when the generate tax report button is clicked', () => {
      cy.get('.generate-button').click()
      cy.contains('A server error occurred. Please try again later.').should('be.visible');
    });
  
    it('should log out the user and navigate to the home page when the logout button is clicked', () => {
      cy.get('.logout-button').click();
      cy.url().should('eq', 'http://localhost:4200/');
    });
});
    
  