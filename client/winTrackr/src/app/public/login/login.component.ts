/*
* This handles the login code
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

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
    }
  }
}


  /*
  constructor(private httpService: HttpService, private router: Router, private cookieService: CookieService) { }

  login(): void {
    // TODO: Authenticate user via API request
    // If successful, navigate to home page
    this.router.navigate(['/dashboard']);
  }

  onUserLogin(email: string, password: string, userLabel: HTMLElement) {
    this.httpService.userLogin(email, password)
      .subscribe({
        next: (response: any) => { // TODO: LOGIN USER (redirect to home/welcome page?)
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

