import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Login } from '../models/login';
import { Constants } from '../constants';

@Injectable({
    providedIn: 'root'
})

export class AuthorizationService {

    private urlForRegistration: string = 'http://localhost:56137/api/Account/Register';
    private urlForRegisterUser: string = 'http://localhost:56137/api/Account/RegisterOfUser';
    private urlForLogin: string = 'http://localhost:56137/Token';
    private urlForCheckRegisteredUsers: string = 'http://localhost:56137/api/Account/HasRegisteredUsers';
    private token: string;

    constructor(private _http: HttpClient) {
        this.token = this.getToken();
    }

    register(user: User): Observable<any> {
        var headers = new HttpHeaders();
        var content = user;
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.urlForRegistration, content, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    registerUser(user: User): Observable<any> {
        let tokenData = 'Bearer ' + this.getToken(),        
            headers = new HttpHeaders().
                        set('Content-Type', 'application/json').
                        set('Authorization', tokenData),        
           content = user;
        
        return this._http.post(this.urlForRegisterUser, content, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    login(user: Login): Observable<any> {
        var headers = new HttpHeaders();
        var content = Constants.RegistrationConstants.GrantType + 
                      '&username=' + user.UserName + 
                      '&password=' + user.Password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.urlForLogin, content, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    setAuthData(tokenData: any) {
        localStorage.setItem("user", btoa(JSON.stringify(tokenData)));
    }

    hasRegisteredUsers(): Observable<boolean> {
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._http.get<boolean>(this.urlForCheckRegisteredUsers, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    getToken(): string {
        if (localStorage.getItem("user")) {
            let user = JSON.parse(atob(localStorage.getItem("user")));
            return user ? user.access_token : null;
        } else {
            return null;
        }
    }

    isLoginUser(): boolean {
        return this.getToken() !== null;
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem("user");
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
