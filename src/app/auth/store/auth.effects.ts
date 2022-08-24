import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { catchError, switchMap, map, tap, of } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient  } from "@angular/common/http";
import * as AuthActions from "./auth.actions";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered? : boolean
}

const handleAuthentication = (
    expiresIn: number, 
    email: string, 
    userId: string, 
    token: string
    ) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    console.log(user);
    localStorage.setItem('userData', JSON.stringify(user));

    return AuthActions.AUTHENTICATE_SUCCESS({ payload: {
        email: email, 
        userId: userId, 
        token: token, 
        expirationDate: expirationDate} });
};

const handleError = (errorRes) => {
     // ... No real error but observable otherwise chain is broken - so using of()
     let errorMessage = 'An unknown error occured!';
     if (!errorRes.error || !errorRes.error.error) {
         return of(AuthActions.AUTHENTICATE_FAIL({payload: errorMessage}));
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
     return of(AuthActions.AUTHENTICATE_FAIL({payload: errorMessage}));
};


@Injectable()
export class AuthEffects {

    base_url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
    login_url = 'signInWithPassword?key='
    signUp_url = 'signUp?key='
    API_KEY = environment.firebaseAPI_KEY;

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, 
        private authService: AuthService) {}

    @Effect()
    authLogin$ =  this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData) => {
                return this.http
                .post<AuthResponseData>( this.base_url + this.login_url + this.API_KEY,
                    { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true } 
                ).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                     })
                )
            }),

        );

    authSignup$ = createEffect( () => this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction) => {
            return this.http
            .post<AuthResponseData>(this.base_url + this.signUp_url + this.API_KEY,
                { email: signupAction.payload.email, password: signupAction.payload.password, returnSecureToken: true } 
                )
                .pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                            return handleAuthentication(
                                +resData.expiresIn, 
                                resData.email, 
                                resData.localId, 
                                resData.idToken)
                            }
                        ),
                    catchError(errorRes => {
                            return handleError(errorRes)
                            }
                        )
                )
        }
    ))); 

    authRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })),
        { dispatch: false }
    );

    authLogout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
            this.authService.clearLogoutTimer();
            this.router.navigate(['/auth']);
        })),
        { dispatch: false}
    );

    authAutoLogin$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
                const userData: {email: string, id: string, _token: string, _tokenExpirationDate: string } 
                    = JSON.parse(localStorage.getItem('userData'));
                if (!userData) {
                    return {type: 'DUMMY'};
                }
                const loadedUser 
                    = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
                
                if (loadedUser.token) {

                    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    return AuthActions.AUTHENTICATE_SUCCESS({ payload : {
                        email: loadedUser.email, 
                        userId: loadedUser.id, 
                        token: loadedUser.token,
                        expirationDate : new Date(userData._tokenExpirationDate)
                    } } )
                    
                }  else {
                    return {type: 'DUMMY'};
                }  
        } )
    )
    );

}