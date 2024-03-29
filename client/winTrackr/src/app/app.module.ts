import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepperComponent } from './stepper/stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegistrationComponentComponent } from './archive/registration-component/registration-component.component';
import { LoginComponentComponent } from './archive/old-login-component/login-component.component';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MyMaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { UserStatisticsComponent } from './archive/user-statistics/user-statistics.component';
import { SharedModule } from './shared/shared.module';
/*
import { RegistrationComponent } from './public/registration/registration.component';
import { LoginComponent } from './public/login/login.component';
*/

import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
// add this import at top
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    RegistrationComponentComponent,
    LoginComponentComponent,
    UserStatisticsComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    SharedModule,
    MyMaterialModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    PublicModule,
    PrivateModule,
    MatSnackBarModule,
    
    /*
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'register', component: RegistrationComponentComponent },
      { path: 'login', component: LoginComponent },
      
    
    ]),
    */
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
