import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Group } from '../models/group';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private urlForGetGroups: string = 'http://localhost:56137/api/Group/GetAllGroups';
  private urlForGetGroup: string = 'http://localhost:56137/api/Group/GetGroupById';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService) { }

  getGroups(): Observable<Group[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData);

    return this._http.get<Group[]>(this.urlForGetGroups, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  getGroupById(groupId: number): Observable<Group> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
            set('groupId', groupId.toString());   

    return this._http.get<Group>(this.urlForGetGroup, { headers: headers, params: params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
