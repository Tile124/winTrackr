/*
* This routes pages!
* @Tile124
* Ryan Rodriguez
* Last modified: 04/18/2023
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './public/homepage/homepage.component';
import { LoginComponent } from './public/login/login.component';
import { RegistrationComponent } from './public/registration/registration.component';
import { PublicStatisticsComponent } from './public/public-statistics/public-statistics.component';
import { ScratchoffComponent } from './private/scratchoff/scratchoff.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'statistics', component: PublicStatisticsComponent },
  { path: 'scratchoff', component: ScratchoffComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





// Old 04/16 code
/*
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { AppComponent } from './app.component';

// Added 04/16 by Ryan. Routes pages 
const routes: Routes = [
  { path: 'home', component: AppComponent }, //TODO: Look into making homepage it's own component
  { path: 'login', component: LoginComponent },
  //{ path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/