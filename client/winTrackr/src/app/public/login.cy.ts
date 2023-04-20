import { LoginComponent } from './login/login.component';
describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('/login/');
  });

  it('should display the login form', () => {
    cy.mount(LoginComponent);
    cy.get('form').should('exist');
  });

  it('should display the login title', () => {
    cy.get('.login-container mat-card-title').should('contain.text', 'Login');
  });

  it('should have an email input field', () => {
    cy.get('[formControlName="email"]').should('exist');
  });

  it('should have a password input field', () => {
    cy.get('[formControlName="password"]').should('exist');
  });

  it('should have a login button', () => {
    cy.get('[type="submit"]').should('exist').and('contain.text', 'Login');
  });

  it('should disable the login button by default', () => {
    cy.get('[type="submit"]').should('be.disabled');
  });

  // Add more tests here
});
