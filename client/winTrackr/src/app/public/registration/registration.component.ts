import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
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

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Registration button pressed')
    //if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      this.http
        .post('/api/register', formData)
        .subscribe(
          (response) => {
            console.log('Registration success:', response);
            // Perform any additional actions upon successful registration, e.g., navigate to another page
          },
          (error) => {
            console.error('Registration error:', error);
            // Handle errors, e.g., show a message to the user
          }
        );
    }
  //}
}
