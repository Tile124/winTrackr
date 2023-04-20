describe('Basic Login tests', () => {
it('should display the Login component', () => {
  cy.visit('login');
  cy.get('.login-container').should('be.visible');
});

it('should display the email input field', () => {
  cy.visit('/login');
  cy.get('input[type="email"]').should('be.visible');
});
it('should display the password input field', () => {
  cy.visit('/login');
  cy.get('input[type="password"]').should('be.visible');
});
it('should display the Login button', () => {
  cy.visit('/login');
  cy.get('button[type="submit"]').should('be.visible');
});
it('should show an error message when clicking Login button without entering credentials', () => {
  cy.visit('/login');
  cy.get('button[type="submit"]').click();
  cy.contains('Login Error').should('be.visible');
});
it('should show an error message when entering an invalid email format', () => {
  cy.visit('/login');
  cy.get('input[type="email"]').type('invalid_email');
  cy.get('button[type="submit"]').click();
  cy.contains('Login Error').should('be.visible');
});
it('should show an error message when entering an invalid password', () => {
  cy.visit('/login');
  cy.get('input[type="email"]').type('test@example.com');
  cy.get('input[type="password"]').type('invalid_password');
  cy.get('button[type="submit"]').click();
  cy.contains('Login Error').should('be.visible');
});
it('should log the user in and redirect to dashboard when entering valid credentials', () => {
  cy.visit('/login');
  cy.get('input[type="email"]').type('admin');
  cy.get('input[type="password"]').type('password');
  cy.get('button[type="submit"]').click();
  cy.url().should('eq', 'http://localhost:4200/dashboard');
});
});

describe('Advanced Login tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should show an error message when email field is left empty and the login button is clicked', () => {
    cy.get('[type="submit"]').click();
    cy.contains('Login Error').should('exist');
  });

  it('should show an error message when an invalid email is entered and the login button is clicked', () => {
    cy.get('[formControlName="email"]').type('test');
    cy.get('[type="submit"]').click();
    cy.contains('Login Error').should('exist');
  });

  it('should show an error message when the password field is left empty and the login button is clicked', () => {
    cy.get('[formControlName="email"]').type('test@test.com');
    cy.get('[type="submit"]').click();
    cy.contains('Login Error').should('exist');
  });
})

