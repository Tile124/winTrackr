import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../../core/services/auth.service';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  //constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
   // this.authService.logout();
  }
}