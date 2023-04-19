/*
* This module will contain services and 
* other core functionality that should be instantiated only once per application.
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScratchOffEntryService } from './services/scratch-off-entry.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ScratchOffEntryService,
  ]
})
export class CoreModule { }
