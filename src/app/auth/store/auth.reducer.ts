import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    authError : string;
    loading : boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export const AuthReducer = createReducer(
    initialState,
    on(AuthActions.SIGNUP_START, AuthActions.LOGIN_START, (state, action) => ({
        ...state,
        authError: null,
        loading: true
    })),
    on(AuthActions.LOGOUT, (state, action) => ({
        ...state,
        user: null
    })),
    on(AuthActions.AUTHENTICATE_SUCCESS, (state, action) => {
        const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
        return {
            ...state,
            authError: null,
            user: user,
            loading: false
        }
    }),
    on(AuthActions.AUTHENTICATE_FAIL, (state, action) => ({
        ...state,
        user: null,
        authError: action.payload,
        loading: false
    })),
    on(AuthActions.CLEAR_ERROR, (state, action) => ({
        ...state,
        authError: null
    }))
)

/* export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        // case AuthActions.AUTHENTICATE_SUCCESS:
        //     const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
        //     return {
        //         ...state,
        //         authError: null,
        //         user: user,
        //         loading: false
        //     }
        // case AuthActions.LOGOUT:
        //     return {
        //         ...state,
        //         user: null
        //     }
        //case AuthActions.LOGIN_START:
        //case AuthActions.SIGNUP_START:
            // return {
            //     ...state,
            //     authError: null,
            //     loading: true
            // }
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        
        default: return state;
    }
} */
