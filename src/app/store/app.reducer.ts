import * as fromShoppingList from '../components/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../components/recipes/store/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    shoppingList : fromShoppingList.ShoppingListReducer, 
    auth: fromAuth.AuthReducer,
    recipes: fromRecipes.RecipeReducer
};