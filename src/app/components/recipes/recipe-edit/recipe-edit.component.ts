import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../store/recipes.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  recipeForm : FormGroup;
  private storeSub : Subscription;

  constructor( private route: ActivatedRoute,
               private recipeService : RecipeService,
               private router: Router,
               private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];   
        this.editMode = params['id'] !== undefined;
        console.log(params['id']);
        console.log(this.editMode);  
        this.initForm(); 
      }
    );
    this.initForm();
  }

  onSubmit() {

    // console.log(this.recipeForm);
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    //  );

    if (this.editMode) {
      this.store.dispatch(RecipeActions.UPDATE_RECIPE({ payload: { index: this.id, newRecipe: this.recipeForm.value} }))
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.store.dispatch(RecipeActions.ADD_RECIPE( { payload: this.recipeForm.value } ));
      //this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel(); // just to navigate away - not realy a cancel.

  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index : number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {

      //const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes').pipe(map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {

        recipeName = recipe.name;
        recipeImg = recipe.imagePath;
        recipeDesc = recipe.description;
        
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      });
     
    }
    
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImg, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
