describe('Access the homepage correctly', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('views the main banner', () => {
      cy.get('.main-banner').should('be.visible');
    });
  
    it('views the headline', () => {
      cy.get('.headline').should('contain.text', 'Win Big with Our Lottery Data!');
    });
  
    it('views the subheadline', () => {
      cy.get('.subheadline').should('contain.text', 'Discover trends, patterns, and insights to boost your chances.');
    });
  
    it('views the gambling activity line', () => {
      cy.get('.tax-info').should('contain.text', 'Track your gambling activity and make tax reporting a breeze!');
    });
  

    it('views correct page title', () => {
      cy.title().should('equal', 'WinTrackr');
    });
    it('views correct css for button', () => {
        cy.get('button').should('have.css', 'background-color', 'rgb(0, 33, 165)');
      });
      it('views the register button with the correct background color', () => {
        cy.get('button[mat-raised-button]')
          .should('be.visible')
          .and('have.attr', 'style', 'background-color: #0021A5;')
          .and('contain.text', 'Login');
      });
  });
  
  describe('Signs up for account', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('access registration page', () => {
        cy.get('mat-card-title').should('have.text', 'Register');
      });

    it('views the registration form', () => {
        cy.get('mat-card.registration-container').should('be.visible');
        cy.get('mat-card-title').should('contain', 'Register');
        cy.get('mat-form-field').should('have.length', 6);
      });

      it('fill in form and submit', () => {
        cy.get('input[formControlName="firstName"]').type('Alin');
        cy.get('input[formControlName="lastName"]').type('Dobra');
        cy.get('mat-select[formControlName="gender"]').click();
        cy.get('input[formControlName="birthday"]').type('01/01/1900',{force: true} );
        cy.get('input[formControlName="email"]').type('Alin@Dobra.com', {force: true} );
        cy.get('input[formControlName="password"]').type('password123', {force: true} );
        cy.get('button').contains('Register').click({force: true} );
      });

    it('Register button submit', () => {
      cy.get('button').contains('Register').should('be.visible');
    });
  });
  
  describe('Views Login page', () => {
    it('views the Login component', () => {
      cy.visit('login');
      cy.get('.login-container').should('be.visible');
    });

    it('user enters credentials and gets redirected to dashboard', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('admin');
      cy.get('input[type="password"]').type('password');
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:4200/dashboard');
    });
    });

    describe('Accesses Dashboard', () => {
        beforeEach(() => {
          // Log in and navigate to the dashboard before each test
            cy.visit('/login');
            cy.get('input[type="email"]').type('admin');
            cy.get('input[type="password"]').type('password');
            cy.get('button[type="submit"]').click();
            cy.visit('/dashboard');
        });
      

          it('view add scratch off entry form', () => {
            cy.get('.entry-form-section form').should('be.visible');
          });

        it('add scratch off entry', () => {
            cy.get('button[type="submit"]').click();
        });
      
        it('click refresh button', () => {
          cy.get('button').contains('Refresh').click();
        });
      
        it('click generate tax report but receive error (not enough data)', () => {
          cy.get('.generate-button').click()
          cy.contains('A server error occurred. Please try again later.').should('be.visible');
        });
      
        it('click logout and be redirected to homepage', () => {
          cy.get('.logout-button').click();
          cy.url().should('eq', 'http://localhost:4200/');
        });
    });
        
      
    