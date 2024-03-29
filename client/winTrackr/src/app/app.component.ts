/*
* This is the main TS file for the app.component
* @Tile124
* Ryan Rodriguez
*
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStatisticsComponent } from './archive/user-statistics/user-statistics.component';
import { PlayerStatistics, GameStatistics } from './archive/user-statistics/user-statistics.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  userStats: PlayerStatistics[] = [
    { username: 'Alin Dobra, FL', profit: '$635.00' },
    { username: 'Kent Fuchs, FL', profit: '$294.50' },
    { username: 'Ryan Rodriguez, FL', profit: '$30.14' }
  ];
  gameOdds: GameStatistics[] = [
    { gameName: '500X THE CASH #5029', odds: '85.01%' },
    { gameName: 'GOLD RUSH LIMITED #1501', odds: '79.83%%' },
    { gameName: '$1M YR/LIFE SPEC #1529', odds: '79.62%' }
  ];
  title = 'winTrackr';
}
