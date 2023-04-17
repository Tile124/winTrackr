/*
* This handles the login code
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, User } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpService: HttpService, private router: Router) { }

  login(): void {
    // TODO: Authenticate user via API request
    // If successful, navigate to home page
    this.router.navigate(['/home']);
  }

  onUserLogin(email: string, password: string, userLabel: HTMLElement) {
    this.httpService.userLogin(email, password)
      .subscribe({
        next: (response) => { // TODO: LOGIN USER (redirect to home/welcome page?)
          this.login();
          /*
          console.log(response);
          return response;
          */
        },
        error: error => {
          userLabel.textContent = error;
        }
      });
  };
}
