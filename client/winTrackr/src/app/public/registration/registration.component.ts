import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'app/core/services/alert.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    console.log('Registration button pressed')
    //if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      this.authService.register(formData.email, formData.password)
        .subscribe({
          next: (response) => {
            console.log('Registration success:', response);
            // Perform any additional actions upon successful registration, e.g., navigate to another page
          },
          error: error => {
            console.error('Registration error:', error);
            this.alertService.showAlert(error);
          }
        });
    }
  //}
}
