describe('Toolbar', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should have a logo with the text "winTrackr"', () => {
      cy.get('.logo').should('be.visible').contains('winTrackr');
    });
  
    it('should have a "Dashboard" button', () => {
      cy.get('button[routerLink="/dashboard"]').should('be.visible');
    });
  
    it('should navigate to the dashboard page when "Dashboard" button is clicked', () => {
      cy.get('button[routerLink="/dashboard"]').click();
      cy.url().should('include', '/dashboard');
    });
  
    it('should have a "Login" button', () => {
      cy.get('button[routerLink="/login"]').should('be.visible');
    });
  
    it('should have a "Register" button', () => {
      cy.get('button[routerLink="/register"]').should('be.visible');
    });
  
    it('should navigate to the register page when "Register" button is clicked', () => {
      cy.get('button[routerLink="/register"]').click();
      cy.url().should('include', '/register');
    });
  
    it('should have a mat-toolbar element with padding of 0 1rem', () => {
      cy.get('mat-toolbar').should('have.css', 'padding', '0px 16px');
    });
  
    it('should have a logo with font size 1.5rem and font weight bold', () => {
      cy.get('.logo').should('have.css', 'font-size', '24px');
      cy.get('.logo').should('have.css', 'font-weight', '700');
    });
  
    it('should have a spacer element with flex-grow 1', () => {
      cy.get('.spacer').should('have.css', 'flex-grow', '1');
    });
  });
  