import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface User {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    /*
    if (error.status == 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
    */
    if (error.status == 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(() => new Error("An error occurred."));
    }
    else {
      return throwError(() => new Error(error.error));
    }
  }

  userHome() {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true,
      responseType: "text" as const
    };

    const content = null;
    return this.http.post("http://localhost:3000/auth/home", content, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  userLogin(email: string, password: string) {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true,
      responseType: "text" as const
    };

    const content = { email, password } as User;
    return this.http.post("http://localhost:3000/auth/login", content, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  userRegister(email: string, password: string) {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      responseType: "text" as const
    };

    const content = { email, password } as User;
    return this.http.post("http://localhost:3000/auth/register", content, requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
