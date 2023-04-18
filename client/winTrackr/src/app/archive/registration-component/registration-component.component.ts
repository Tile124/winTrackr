/*
* This component is the registration page.
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { Component } from '@angular/core';
import { HttpService, User } from '../../http.service';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent {
  constructor(private httpService: HttpService) {};

  onUserRegister(email: string, password: string, userLabel: HTMLElement) {
    this.httpService.userRegister(email, password)
      .subscribe({
        next: (response) => { // TODO: REGISTER USER (redirect to login page? or home/welcome page?)
          console.log(response);
          return response;
        },
        error: error => {
          userLabel.textContent = error;
        }
      });
  };
}
