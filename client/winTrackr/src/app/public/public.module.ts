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
import { RegistrationComponent } from './registration/registration.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomepageComponent,
    PublicStatisticsComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class PublicModule { }
