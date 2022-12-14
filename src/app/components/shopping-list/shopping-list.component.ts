import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import { ShoppingListService } from './shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[];
  ingredients: Observable<{ingredients: Ingredient[]}>
  private subscription : Subscription;

  constructor(private shoppingListservice : ShoppingListService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppingListservice.getIngredients();
    // this.subscription = this.shoppingListservice.ingredientsChanged.subscribe(
    //   (ingredients : Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // )
  }

  onEditItem(index : number) {
    // this.shoppingListservice.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
