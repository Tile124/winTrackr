/*
* This module will contain the components and services for authenticated users, 
* such as ScratchOffDataComponent, UserDashboardComponent, PrivacySettingsComponent, 
* and UserProfileComponent.
*
* IMPORTANT: This module will be lazy-loaded, so it will not be loaded until the user 
* is authenticated.
*
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScratchOffDataComponent } from '../scratch-off-data/scratch-off-data.component';



@NgModule({
  declarations: [
    ScratchOffDataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
