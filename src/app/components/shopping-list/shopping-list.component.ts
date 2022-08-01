import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription : Subscription;

  constructor(private shoppingListservice : ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListservice.getIngredients();
    this.subscription = this.shoppingListservice.ingredientsChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
