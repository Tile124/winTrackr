import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string = "Loading...";

  constructor(private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
    this.authService.userLanding()
      .subscribe({
        next: (response: any) => {
          this.message = response;
          return response;
        },
        error: (error: any) => {
          this.message = "Error";
          this.router.navigate(['/']);
        }
      });
  }
}
