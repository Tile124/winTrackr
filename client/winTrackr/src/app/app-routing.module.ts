/*
* This routes pages? 
* @Tile124
* Ryan Rodriguez
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
