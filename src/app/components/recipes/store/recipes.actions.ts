import { createAction, props } from "@ngrx/store";
import { Recipe } from "src/app/model/recipe";

export const SET_RECIPES = createAction('[Recipes] Set Recipes', props<{ payload: Recipe[] }>());
export const FETCH_RECIPES = createAction('[Recipes] Fetch Recipes');
export const STORE_RECIPES = createAction('[Recipes] Store Recipes');
export const ADD_RECIPE = createAction('[Recipes] Add Recipe', props<{ payload: Recipe }>());
export const UPDATE_RECIPE = createAction('[Recipes] Update Recipe', props<{ payload: { index: number, newRecipe: Recipe } }>());
export const DELETE_RECIPE = createAction('[Recipes] Delete Recipe', props<{ payload: number }>());