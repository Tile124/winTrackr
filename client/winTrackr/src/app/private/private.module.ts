import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScratchoffComponent } from './scratchoff/scratchoff.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ScratchoffComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PrivateModule { }
