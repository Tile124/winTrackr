import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string = "Loading...";

  constructor(private httpService: HttpService) { };

  ngOnInit(): void {
    this.httpService.userHome()
      .subscribe({
        next: (response: any) => { // TODO: LOGIN USER (redirect to home/welcome page?)
          this.message = response;
          return response;
        },
        error: (error: any) => {
          this.message = "Error";
        }
      });
  }
}
