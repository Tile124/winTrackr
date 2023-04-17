import { Component } from '@angular/core';
import { HttpService, User } from '../../http.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  constructor(private httpService: HttpService) {};

  onUserLogin(email: string, password: string, userLabel: HTMLElement) {
    this.httpService.userLogin(email, password)
      .subscribe({
        next: (response) => { // TODO: LOGIN USER (redirect to home/welcome page?)
          console.log(response);
          return response;
        },
        error: error => {
          userLabel.textContent = error;
        }
      });
  };
}
