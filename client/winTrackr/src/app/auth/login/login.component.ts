/*
* This handles the login code
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  login(): void {
    // TODO: Authenticate user via API request
    // If successful, navigate to home page
    this.router.navigate(['/']);
  }

}
