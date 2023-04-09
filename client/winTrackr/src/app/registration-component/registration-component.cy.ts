/*describe('registration-component.cy.ts', () => {
  it('playground', () => {
    // cy.mount()
  })
})
*/
import { RegistrationComponentComponent } from './registration-component.component'

describe('RegistrationComponent', () => {
  it('mounts', () => {
    cy.mount(RegistrationComponentComponent)
  })
  /*
  it('Name textbook should be empty', () => {
    cy.mount(RegistrationComponentComponent)
    cy.get('matInput').should('have.text', '')
  })
  */
})