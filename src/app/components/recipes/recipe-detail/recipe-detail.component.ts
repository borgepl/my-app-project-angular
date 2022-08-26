import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor( private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router,
               private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {

    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap((id: number) => {
      this.id = id;
      return this.store.select('recipes');
    }), map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.id;
      })
    })
    ).subscribe((recipe: Recipe) => this.recipe = recipe);

    /* this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    ); */
    
  }

  onAddToShoppingList() {
    this.store.dispatch( new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(RecipeActions.DELETE_RECIPE( { payload: this.id }));
    this.router.navigate(['/recipes']);
  }
}
