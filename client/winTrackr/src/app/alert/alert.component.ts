import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div [ngStyle]="{ 'background-color': backgroundColor }" class="alert">
      {{ message }}
    </div>
  `,
  styles: [`
    .alert {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1rem;
      color: white;
      font-weight: bold;
      text-align: center;
    }
  `]
})
export class AlertComponent {
  @Input() message = '';
  @Input() backgroundColor = 'red';
}
