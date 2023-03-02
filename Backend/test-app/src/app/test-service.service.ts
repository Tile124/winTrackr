import { Injectable } from '@angular/core';
import { Http } from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: Http) { }
  getTitle() {
    return this.http.get(`${environment.serverUrl}/hello-world`).map((response: { json: () => any; }) => response.json());
  }
}
