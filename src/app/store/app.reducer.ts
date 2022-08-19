import * as fromShoppingList from '../components/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { Actions } from '../components/shopping-list/store/shopping-list.actions';
import { AuthActions } from '../auth/store/auth.actions';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    shoppingList : fromShoppingList.ShoppingListReducer, 
    auth: fromAuth.AuthReducer
};