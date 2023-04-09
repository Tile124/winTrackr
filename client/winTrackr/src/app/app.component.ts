import { Component } from '@angular/core';
import { HttpService, User } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'winTrackr';

  constructor(private httpService: HttpService) {};

  onUserRegister(username: string, password: string) {
    /*
    this.httpService.userLogin(username, password)
      .subscribe((response) => {
        console.log(response);
        return response;
      });
    */
  };

  onUserLogin(username: string, password: string) {
    this.httpService.userLogin(username, password)
      .subscribe((response) => {
        console.log(response);
        return response;
      });
  };
}
