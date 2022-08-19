import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  encapsulation: ViewEncapsulation.Emulated // default
})
export class ShoppingEditComponent implements OnInit, AfterViewChecked, OnDestroy {

  //private slForm: NgForm;
  //@ViewChild('f', {static: true}) set formRef(formRef: NgForm) { this.slForm= formRef;}
  
  @ViewChild('f', {read: NgForm}) slForm!: NgForm;
  //@ViewChild('f') slForm!: NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {

    // console.log('NgonInit started ...');
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      console.log(stateData);
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.editedItem = stateData.editedIngredient;
        console.log(this.editMode, this.editedItemIndex);
        this.slForm.reset();
          this.slForm.setValue({
            name:this.editedItem.name,
             amount:this.editedItem.amount
           });

      } else {
        this.editMode = false;
      }
    });
  }

  ngAfterViewChecked(): void {
   

    /* this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient[index];
        console.log(this.editMode, this.editedItemIndex);
        //console.log(this.slForm);
        //this.slForm.reset();
      //  this.slForm.setValue({
      //    name:this.editedItem.name,
      //     amount:this.editedItem.amount
      //   });
        //this.InitForm();
      }
    ); */
  }

  InitForm(): void {

    this.slForm.form.controls['name'].setValue(this.editedItem.name);
    this.slForm.form.controls['ammount'].setValue(this.editedItem.amount);
}

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      //this.slService.updateIngredient(this.editedItemIndex , newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex,newIngredient: newIngredient}))
    } else {
      //this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
