/*
* This module will contain shared components, 
* directives, and pipes that can be used throughout the application.
* @Tile124
* Ryan Rodriguez
* Last modified: 04/18/2023
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [
    ToolbarComponent,
  ]

})
export class SharedModule { }
