import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../recipes/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  unsubscribe = new Subject()

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
    // this.shoppingListService.addIngredient
    //   .subscribe((ingredient: Ingredient) => {
    //     this.ingredients.push(ingredient);
    //   })
  }

  ngOnDestroy() {
    console.log("DESTROYED!!!")
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
