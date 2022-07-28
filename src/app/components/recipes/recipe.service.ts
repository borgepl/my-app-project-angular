import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/app/model/ingredient";
import { Recipe } from "src/app/model/recipe";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    
recipeSelected = new EventEmitter<Recipe>();
    
private recipes: Recipe[] = [
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
    
      ];

constructor(private slService: ShoppingListService) {}

getRecipes() {
   return this.recipes.slice(); 
}

addIngredientsToShoppingList(ingredients : Ingredient[]) {
   this.slService.addIngredients(ingredients);
}

}