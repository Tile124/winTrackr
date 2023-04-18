/*
* This module will contain shared components, 
* directives, and pipes that can be used throughout the application.
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }