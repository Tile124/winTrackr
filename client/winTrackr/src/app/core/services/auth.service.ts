import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { tap}   from 'rxjs/operators';

export interface User {
  email: string
  password: string
}

export namespace AuthData {
  export const baseUrl: string = "http://35.225.28.21:3000/auth/";
  export const loginUrl: string = baseUrl + "login";
  export const registerUrl: string = baseUrl + "register";
  export const landingUrl: string = baseUrl + "home";

  export const sessionCookieName = "sessionToken";

  export const baseRequestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    responseType: "text" as const
  };
  export const credentialRequestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    withCredentials: true,
    responseType: "text" as const,
    observe: "response" as const,
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(() => new Error("An error occurred."));
    }
    else {
      return throwError(() => new Error(error.error));
    }
  }

  login(email: string, password: string) {
    const credentials = { email, password } as User;
    return this.http.post(AuthData.loginUrl, credentials, AuthData.credentialRequestOptions)
    .pipe(
      tap((response: HttpResponse<any>) => {
        const setCookieHeader = response.headers.get("Set-Cookie");
        console.log("Set-Cookie header:", setCookieHeader);
      }),
      catchError(this.handleError)
    );
  }

  register(email: string, password: string) {
    const credentials = { email, password } as User;
  return this.http.post(AuthData.registerUrl, credentials, AuthData.credentialRequestOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  userLanding() { // TODO: rework
    return this.http.post(AuthData.landingUrl, null, AuthData.credentialRequestOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    // TODO: to be implemented
  }

  isLoggedIn(): boolean {
    return this.cookieService.check(AuthData.sessionCookieName);
  }

}
