import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { Observable, take, map, switchMap, of } from "rxjs";
import { Recipe } from "src/app/model/recipe";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipes.actions";

@Injectable({providedIn : 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService :  DataStorageService,
                private recipeService : RecipeService,
                private store: Store<fromApp.AppState>,
                private actions$: Actions
                ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
       
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => recipesState.recipes),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(RecipesActions.FETCH_RECIPES());
                    return <Observable<Recipe[]>> this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
                } else {
                    return of(recipes);
                } 
            })
        );
       
       /*  const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        } */
        
    }

}