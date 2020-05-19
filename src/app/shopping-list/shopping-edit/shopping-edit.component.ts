import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/recipes/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  unsubscribe = new Subject();
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  onSubmit() {
    const value = this.slForm.value;

    const ingredient = new Ingredient(value.name, value.amount);

    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.shoppingListService.onIngredientAdded(ingredient);
    }
    
    this.clear()
  }

  clear() {
    this.slForm.resetForm();
    this.editMode = false;
    this.editedItemIndex = NaN;
    this.editedItem = undefined;
  }

  onClear() {
    this.clear()
  }

  onDelete() {
    if(this.editMode)
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clear();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
