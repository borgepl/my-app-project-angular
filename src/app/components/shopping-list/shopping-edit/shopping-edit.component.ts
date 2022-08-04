import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  encapsulation: ViewEncapsulation.Emulated // default
})
export class ShoppingEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('f', {read: NgForm, static:true}) slForm!: NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient[index];
        console.log(this.editMode, this.editedItemIndex);
        // this.slForm.setValue({
        //   name:this.editedItem.name,
        //   amount:this.editedItem.amount
        // });
        //this.InitForm();
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.editMode) {
      setTimeout(() => {
      console.log(this.slForm);  
      this.slForm.setValue({
        amount: this.editedItem.amount,
        name: this.editedItem.name
      });
      },0);
   }
  }

  InitForm(): void {

    this.slForm.controls['name'].setValue(this.editedItem.name);
}

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
