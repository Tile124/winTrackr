import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface User {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  userLogin(username: string, password: string) {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        Username: username,
        Passwordhash: password,
      }),
    };
    
    return this.http.get("http://localhost:3000/auth/login", requestOptions);
  }
}
