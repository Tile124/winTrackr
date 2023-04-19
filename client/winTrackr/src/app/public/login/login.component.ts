/*
* This handles the login code
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    // TODO: Authenticate user via API request
    // If successful, navigate to home page 
    this.router.navigate(['/dashboard']);
  }

  onUserLogin(email: string, password: string, userLabel: HTMLElement) {
    this.authService.login(email, password)
      .subscribe({
        next: (response: any) => {
          this.login();
          return response;
        },
        error: (error: any) => {
          userLabel.textContent = error;
        }
      });
  };
}
