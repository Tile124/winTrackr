import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-public-statistics',
  templateUrl: './public-statistics.component.html',
  styleUrls: ['./public-statistics.component.scss']
})
export class PublicStatisticsComponent implements OnInit {
  publicStats: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(environment.apiURL + '/api/public-statistics').subscribe(
      (response: any) => {
        this.publicStats = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
