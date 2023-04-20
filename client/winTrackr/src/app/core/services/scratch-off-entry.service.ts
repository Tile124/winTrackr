import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface ScratchOffEntry {
  name: string | undefined;
  id: string | undefined;
  winAmount: number | undefined;
  date: string | undefined;
}

interface ScratchOffData {
  Name: string;
  GameId: string;
  Prize: number;
  Date: string;
}

export interface ScratchoffFullData {
	Id: number;
	Name: string;
	GameId: string;
	Prize: number;
	Date: string;
	UserId: string;
}

const baseUrl = 'http://localhost:3000/api/'
const getScratchoffsUrl = baseUrl + 'get-scratchoffs';
const addScratchoffUrl = baseUrl + 'add-scratchoff';

const getScratchoffsRequestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }),
  withCredentials: true
};

const httpOptions = {
  /*
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  */
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
    return this.http.get(getScratchoffsUrl, getScratchoffsRequestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addEntry(entry: ScratchOffEntry) {
    const scratchoffData = {
      Name: entry.name,
      GameId: entry.id,
      Prize: entry.winAmount,
      Date: entry.date,
    } as ScratchOffData;
    return this.http.post(addScratchoffUrl, scratchoffData, httpOptions).pipe(catchError(this.handleError))
    .subscribe((res)=>{
      console.log(res)
    });
  }
}
