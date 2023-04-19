import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  constructor(private authService: AuthService) {};

  onUserLogin(email: string, password: string, userLabel: HTMLElement) {
    this.authService.login(email, password)
      .subscribe({
        next: (response) => {
          console.log(response);
          return response;
        },
        error: error => {
          userLabel.textContent = error;
        }
      });
  };
}
