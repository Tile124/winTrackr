import { HomepageComponent } from './homepage.component';
describe('Homepage Static text', () => {
  it('should display the main banner', () => {
    cy.mount(HomepageComponent);
    cy.get('.main-banner').should('be.visible');
  });
  it('should display the correct headline', () => {
    cy.mount(HomepageComponent);
    cy.get('.headline').should('have.text', 'Win Big with Our Lottery Data!');
  });
  it('should display the correct subheadline', () => {
    cy.mount(HomepageComponent);
    cy.get('.subheadline').should('have.text', 'Discover trends, patterns, and insights to boost your chances.');
  });
  it('should display the correct tax text', () => {
    cy.mount(HomepageComponent);
    cy.get('.tax-info').should('have.text', 'Track your gambling activity and make tax reporting a breeze!');
  });
});

describe('Homepage Login button', () => {
  it('should display the login button', () => {
    cy.mount(HomepageComponent);
    cy.get('button').should('have.text', 'Login');
  });
  it('should have the correct style applied to the login button', () => {
    cy.mount(HomepageComponent);
    cy.get('button').should('have.css', 'background-color', 'rgb(0, 33, 165)');
  });
});