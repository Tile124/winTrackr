import { StepperComponent } from './stepper.component'
import { createOutputSpy } from 'cypress/angular'
describe('StepperComponent', () => {
  it('mounts', () => {
    cy.mount(StepperComponent)
  })
  it('stepper should default to 0', () => {
    cy.mount(StepperComponent)
    cy.get('span').should('have.text', '0')
  })
  it('supports an "initial" prop to set the value', () => {
    cy.mount(StepperComponent, {
      componentProperties: {
        count: 100,
      },
    })
    cy.get('[data-cy=counter]').should('have.text', '100')
  })
  it('when the increment button is pressed, the counter is incremented', () => {
    cy.mount(StepperComponent)
    cy.get('[data-cy=increment]').click()
    cy.get('[data-cy=counter]').should('have.text', '1')
  })
  
  it('when the decrement button is pressed, the counter is decremented', () => {
    cy.mount(StepperComponent)
    cy.get('[data-cy=decrement]').click()
    cy.get('[data-cy=counter]').should('have.text', '-1')
  })
  it('clicking + fires a change event with the incremented value', () => {
    cy.mount(StepperComponent, {
      componentProperties: {
        change: createOutputSpy('changeSpy'),
      },
    })
    cy.get('[data-cy=increment]').click()
    cy.get('@changeSpy').should('have.been.calledWith', 1)
  })
})