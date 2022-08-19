import { Ingredient } from "src/app/model/ingredient";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {

    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',2),
        new Ingredient('Tomatoes',10)
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function ShoppingListReducer(state: State = initialState, action: ShoppingListActions.Actions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPD_INGREDIENT:

            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = { ...ingredient, ...action.payload.newIngredient };
            const UpdatedIngredients = [...state.ingredients];
            UpdatedIngredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: UpdatedIngredients
            }
        case ShoppingListActions.DEL_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    //keep ingredients - not the one to be deleted
                    return igIndex !== action.payload;
                })
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex : action.payload,
                editedIngredient : { ...state.ingredients[action.payload] }  
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex : -1,
                editedIngredient : null
            }
        default: return state;
    } 
}