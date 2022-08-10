import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered? : boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

    authUser = new BehaviorSubject<User>(null);

    
    constructor(private http: HttpClient) {}

    base_url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
    login_url = 'signInWithPassword?key='
    signUp_url = 'signUp?key='
    API_KEY = 'AIzaSyDffrLZE7jkH1xqwNxpHez8GRhENMGzAtw' //ng-recipebook project in FireBase

    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>(this.base_url + this.signUp_url + this.API_KEY,
            { email: email, password:  password, returnSecureToken: true } )
        .pipe(catchError(this.handleError), tap(resData => 
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));   
    }

    
    login(email: string, password: string) {
        return this.http
        .post<AuthResponseData>(this.base_url + this.login_url + this.API_KEY,
            { email: email, password:  password, returnSecureToken: true } )
        .pipe(catchError(this.handleError), tap(resData => 
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));       
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        console.log(user);
        this.authUser.next(user);
    }

    private handleError (errorRes : HttpErrorResponse) {

        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMessage));
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email address already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The email address does not exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.!';
                break;    
        }
        return throwError(() => new Error(errorMessage));
    }
    
}