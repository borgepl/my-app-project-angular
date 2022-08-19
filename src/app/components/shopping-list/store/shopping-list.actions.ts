import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/model/ingredient";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPD_INGREDIENT = 'UPD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export type Actions = 
    AddIngredient | 
    AddIngredients | 
    UpdateIngredient | 
    DeleteIngredient |
    StartEdit |
    StopEdit ;

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    
    constructor( public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    
    constructor( public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = UPD_INGREDIENT;
    
    constructor( public payload: {index: number, newIngredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
    readonly type = DEL_INGREDIENT;
    
    constructor( public payload: number ) {}
}

export class StartEdit implements Action {
    readonly type =  START_EDIT;
    
    // index (number) of the editing ingredient.
    constructor( public payload: number) {}
}

export class StopEdit implements Action {
    readonly type =  STOP_EDIT;
    
}

