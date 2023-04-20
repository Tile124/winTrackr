describe('Registration', () => {
    beforeEach(() => {
      cy.visit('/register');
    });
  
    it('should have a title of "Register" on the page', () => {
      cy.get('mat-card-title').should('have.text', 'Register');
    });
    it('should show a link to the login page', () => {
        cy.get('mat-card-actions button').contains('Already have an account? Login').click();
        cy.url().should('include', '/login');
      });

    it('should display the registration form', () => {
        cy.get('mat-card.registration-container').should('be.visible');
        cy.get('mat-card-title').should('contain', 'Register');
        cy.get('mat-form-field').should('have.length', 6);
      });
  
    it('should have a first name input field', () => {
      cy.get('input[formControlName="firstName"]').should('be.visible');
    });
  
    it('should have a last name input field', () => {
      cy.get('input[formControlName="lastName"]').should('be.visible');
    });
  
    it('should have a gender select field', () => {
      cy.get('mat-select[formControlName="gender"]').should('be.visible');
    });
  
  
    it('should have a birthday input field', () => {
      cy.get('input[formControlName="birthday"]').should('be.visible');
    });
  
    it('should have an email input field', () => {
      cy.get('input[formControlName="email"]').should('be.visible');
    });
  
    it('should have a password input field', () => {
      cy.get('input[formControlName="password"]').should('be.visible');
    });
  
    it('should have a register button', () => {
      cy.get('button').contains('Register').should('be.visible');
    });
  
    it('should navigate to the login page when already have account button clicked', () => {
      cy.get('button').contains('Already have an account? Login').click();
      cy.url().should('include', '/login');
    });
  
    it('should not submit form if all fields are empty', () => {
      cy.get('button').contains('Register').click();
      cy.url().should('not.include', '/dashboard');
    });
  
    it('should not submit form if some fields are empty', () => {
      cy.get('input[formControlName="firstName"]').type('Alin');
      cy.get('input[formControlName="lastName"]').type('Dobra');
      cy.get('mat-select[formControlName="gender"]').click();
      cy.get('input[formControlName="birthday"]').type('01/01/1900',{force: true} );
      cy.get('input[formControlName="email"]').type('Alin@Dobra.com', {force: true} );
      cy.get('button').contains('Register').click({force: true} );
      cy.url().should('not.include', '/dashboard');
    });
  
    it('should submit form if all fields are valid', () => {
      cy.get('input[formControlName="firstName"]').type('Alin');
      cy.get('input[formControlName="lastName"]').type('Dobra');
      cy.get('mat-select[formControlName="gender"]').click();
      cy.get('input[formControlName="birthday"]').type('01/01/1900',{force: true} );
      cy.get('input[formControlName="email"]').type('Alin@Dobra.com', {force: true} );
      cy.get('input[formControlName="password"]').type('password123', {force: true} );
      cy.get('button').contains('Register').click({force: true} );
    });
    it('should display an error message when submitting an empty form', () => {
        cy.get('button').contains('Register').click({force: true} );
        cy.get('button').contains('Register').click({force: true} );
        cy.contains('Error: User with the given email already exists').should('exist');
      });
  });
  