import { Action, createAction, props } from "@ngrx/store";

//export const LOGIN_START = 'LOGIN START';
//export const AUTHENTICATE_SUCCESS = 'AUTH SUCCESS';
//export const AUTHENTICATE_FAIL = 'AUTH FAILED';
//export const LOGOUT = 'LOGOUT';
//export const SIGNUP_START = 'SIGNUP START';

export const LOGIN_START = createAction('LOGIN START', props<{ payload : {email: string; password: string}}>());
export const AUTHENTICATE_SUCCESS = createAction('AUTH SUCCESS', props<{payload : {email: string; userId: string; token: string; expirationDate: Date}}>());
export const AUTHENTICATE_FAIL = createAction('AUTH FAILED',props<{payload : string}>());
export const LOGOUT = createAction('LOGOUT');
export const SIGNUP_START = createAction('SIGNUP START', props<{payload: {email: string; password: string}}>());
export const CLEAR_ERROR = createAction('CLEAR ERROR');
export const AUTO_LOGIN = createAction('AUTO LOGIN');

export const TEST_ACTION = createAction('TEST_ACTION', props<{email: string; password: string}>())

// export class AuthenticateSuccess implements Action {
//     readonly type = AUTHENTICATE_SUCCESS;
//     constructor( public payload : {email: string; userId: string; token: string; expirationDate: Date} ) {}
// }

// export class Logout implements Action {
//     readonly type = LOGOUT; 
// }

// export class LoginStart implements Action {
//     readonly type = LOGIN_START;
//     constructor( public payload : {email: string; password: string} ) {}
// }

// export class AuthenticateFail implements Action {
//     readonly type = AUTHENTICATE_FAIL;
//     constructor( public payload : string ) {}
// }

// export class SignupStart implements Action {
//     readonly type = SIGNUP_START;
//     constructor( public payload : {email: string; password: string} ) {}
// }

//export type AuthActions = AuthenticateSuccess | AuthenticateFail;
