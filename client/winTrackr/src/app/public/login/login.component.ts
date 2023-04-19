/*
* This handles the login code
* @Tile124
* Ryan Rodriguez
* Last modified: 04/19/2023
*/
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from 'app/core/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Login button pressed')
  //  if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      /*
      this.http
        .post('/api/login', { email, password })
        .subscribe(
          (response) => {
            console.log('Login success:', response);
            // Perform any additional actions upon successful login, e.g., navigate to another page
          },
          (error) => {
            console.error('Login error:', error);
            // Handle errors, e.g., show a message to the user
          }
        );
      */

      this.authService.login(email, password)
        .subscribe({
          next: (response: any) => {
            this.router.navigate(['/dashboard']);
            return response;
          },
          error: (error: any) => {
            this.alertService.showAlert('Invalid email or password');
          }
        });
    }
 // }
}


  /*
  constructor(private httpService: HttpService, private router: Router, private cookieService: CookieService) { }

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
*/

