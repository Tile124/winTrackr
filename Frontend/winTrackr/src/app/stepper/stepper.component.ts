import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-stepper',
  template: `
    <div>
      <button data-cy="decrement" (click)="decrement()">-</button>
      <span data-cy="counter">{{ count }}</span>
      <button data-cy="increment" (click)="increment()">+</button>
    </div>
  `,
})
export class StepperComponent {
  constructor() {}

  ngOnInit(): void {}

  @Input() count = 0
  @Output() change = new EventEmitter()

  increment(): void {
    this.count++
    this.change.emit(this.count)
  }

  decrement(): void {
    this.count--
    this.change.emit(this.count)
  }
}