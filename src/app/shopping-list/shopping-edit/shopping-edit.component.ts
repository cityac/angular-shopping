import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/recipes/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd() {
    const ingredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.shoppingListService.onIngredientAdded(ingredient);
    this.clear()
  }

  clear() {
    this.nameInputRef.nativeElement.value = "";
    this.amountInputRef.nativeElement.value = "";
  }

}
