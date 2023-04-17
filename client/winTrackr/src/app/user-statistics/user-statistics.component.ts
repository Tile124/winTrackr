/*
* This component is used on the homepage to make a table of top user statistics (profit) and
* the best scratchoff game odds.
* @Tile124
* Ryan Rodriguez
*
*/
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})


export class UserStatisticsComponent {
  
  @Input() userStats?: PlayerStatistics[];
  @Input() gameOdds?: GameStatistics[];
}

export interface PlayerStatistics {
  username: string;
  profit: string;
}

export interface GameStatistics {
  gameName: string;
  odds: string;
}
