import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface ScratchOffEntry {
  name: string;
  id: string;
  winAmount: number;
  date: string;
}

const baseUrl = 'http://localhost:3000/api/scratch-off-entries/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class ScratchOffEntryService {
  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    return throwError(() => new Error(error.error));
  }

  getEntries() {
    return this.http.get<ScratchOffEntry[]>(baseUrl, httpOptions).pipe(catchError(this.handleError));
  }

  addEntry(entry: ScratchOffEntry) {
    return this.http.post(baseUrl, entry, httpOptions).pipe(catchError(this.handleError));
  }
}
