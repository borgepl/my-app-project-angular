import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map , tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Recipe } from "src/app/model/recipe";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService {

url = 'https://ng-recipebook-11f30-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

constructor(    private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService 
                    
            ) {}

storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(response => {
        console.log(response);
    })
}

fetchRecipes() {
    
    return this.http
    .get<Recipe[]>(this.url)
    .pipe(
     map(recipes => {
        return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        }) }), 
        tap(recipes => {
        this.recipeService.setRecipes(recipes);
    }))
}


}