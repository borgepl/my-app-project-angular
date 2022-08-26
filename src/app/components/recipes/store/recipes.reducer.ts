import { createReducer, on } from "@ngrx/store";
import { Recipe } from "src/app/model/recipe";
import * as RecipeActions from "./recipes.actions";

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
   recipes: []
};

export const RecipeReducer = createReducer(
    initialState,
    on(RecipeActions.SET_RECIPES, (state, action) => ({
        ...state,
        recipes: [...action.payload]
    })),
    on(RecipeActions.ADD_RECIPE, (state, action) => ({
        ...state,
        recipes:  [...state.recipes, action.payload]
    })),
    on(RecipeActions.UPDATE_RECIPE, (state, action) => {

        const updatedRecipe = { ...state.recipes[action.payload.index], ...action.payload.newRecipe };
        const updatedRecipes = [...state.recipes];
        updatedRecipes[action.payload.index] = updatedRecipe;
        return {
            ...state,
            recipes : updatedRecipes
        }
    }),
    on(RecipeActions.DELETE_RECIPE, (state, action) => ({
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
            return index !== action.payload
        })
    }))
)