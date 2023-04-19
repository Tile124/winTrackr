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
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MyMaterialModule } from '../material.module';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';



@NgModule({
  declarations: [
    HomepageComponent,
    PublicStatisticsComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MyMaterialModule,
    MatTableModule,
    MatOptionModule,
  ]
})
export class PublicModule { }
