
import { Subject } from "rxjs";
import { Ingredient } from "src/app/model/ingredient";

export class ShoppingListService {
    
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',2),
        new Ingredient('Tomatoes',10)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }  

    getIngredient(index : number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient : Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}