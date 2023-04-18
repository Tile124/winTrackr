/*
* This module will contain the components and services for the public-facing parts of the 
* website, such as the Homepage, PublicStatisticsComponent, and ToolbarComponent.
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { PublicStatisticsComponent } from './public-statistics/public-statistics.component';
import { ToolbarComponent } from './toolbar/toolbar.component';



@NgModule({
  declarations: [
    HomepageComponent,
    PublicStatisticsComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublicModule { }
