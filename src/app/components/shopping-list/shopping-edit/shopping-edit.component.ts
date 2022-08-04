import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class ShoppingEditComponent implements OnInit, AfterViewChecked, OnDestroy {

  //private slForm: NgForm;
  //@ViewChild('f', {static: true}) set formRef(formRef: NgForm) { this.slForm= formRef;}
  
  @ViewChild('f', {read: NgForm}) slForm!: NgForm;
  //@ViewChild('f') slForm!: NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewChecked(): void {
    this.subscription = this.slService.startedEditing.subscribe(
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
    );
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
      this.slService.updateIngredient(this.editedItemIndex , newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
