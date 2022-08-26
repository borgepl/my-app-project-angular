import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, withLatestFrom } from "rxjs";
import { Recipe } from "src/app/model/recipe";
import * as fromApp from "../../../store/app.reducer";
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipeEffects {
    
    url = 'https://ng-recipebook-11f30-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

    constructor(
                    private actions$: Actions,
                    private http: HttpClient,
                    private store: Store<fromApp.AppState>
                ) {}

    fetchRecipes$ = createEffect( () => this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap( () => {
            return this.http
            .get<Recipe[]>(this.url) }
        ), 
        map(recipes => {
            return recipes.map(recipe => {
                // if there are no ingredients in the recipe - add empty arry of ingredients
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            }) }),
        map(recipes => {
            // set the recipes to the store state by calling the Actions
            return RecipesActions.SET_RECIPES({payload: recipes});
        })
    ));

    
    storeRecipes$ = createEffect( () => this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap( ([actionData, recipesState]) => {
            return this.http.put(this.url, recipesState.recipes)
        })
    ),
    { dispatch: false });
}