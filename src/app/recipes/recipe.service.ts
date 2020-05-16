import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "Simply a test",
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
      [ new Ingredient("meet", 1), new Ingredient('French fries', 20)]
    ),
    new Recipe(
      "A Test Recipe 2",
      "It's a test simply",
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      [ new Ingredient("Buns", 2), new Ingredient('Meet', 1)]
    )
  ];

  constructor(private slService: ShoppingListService){}

  getRecepies() {
    // return  [...this.recipes];
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}