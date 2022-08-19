import { EventEmitter, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/model/ingredient";
import { Recipe } from "src/app/model/recipe";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import * as ShoppingListActions from 'src/app/components/shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
    
recipeSelected = new Subject<Recipe>();
recipesChanged = new Subject<Recipe[]>();
    
/* private recipes: Recipe[] = [
        new Recipe(
         'Tasty Schnitzel',
         'A super-tasty schnitzel - just awesome',
         'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
         [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',20)
         ]),
        new Recipe(
         'Big Fat Burger',
         'What else you need to say?',
         'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/1200px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg?20160330203741',
         [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)
         ]),
    
      ]; */

private recipes: Recipe[] = [];

constructor(private slService: ShoppingListService, 
            private store: Store<fromShoppingList.AppState>) {}

setRecipes(recipes : Recipe[]) {
   this.recipes = recipes;
   this.recipesChanged.next(this.recipes.slice());
}

getRecipes() {
   return this.recipes.slice(); 
}

getRecipe(id: number) {
   return this.recipes.slice()[id];
}

addIngredientsToShoppingList(ingredients : Ingredient[]) {
   // this.slService.addIngredients(ingredients);
   this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
}

addRecipe(recipe : Recipe) {
   this.recipes.push(recipe);
   this.recipesChanged.next(this.recipes.slice());
}

updateRecipe(index: number, recipe : Recipe) {
   this.recipes[index] = recipe;
   this.recipesChanged.next(this.recipes.slice());
}

deleteRecipe(index: number) {
   this.recipes.splice(index, 1);
   this.recipesChanged.next(this.recipes.slice());
}

}