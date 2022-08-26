import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Recipe } from 'src/app/model/recipe';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor( 
               private router: Router,
               private route: ActivatedRoute,
               private store: Store<fromApp.AppState>
             ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').pipe(
      map((recipesState) => recipesState.recipes)
    )
    .subscribe(
      ((recipes)  => this.recipes = recipes)
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
