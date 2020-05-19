import { Ingredient } from '../recipes/shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject()
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index) {
    return this.ingredients[index];
  }

  onIngredientAdded(ingredient) {
    this.ingredients.push(ingredient);
    this.notifySubscribers();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.notifySubscribers();
  }

  updateIngredient(index: number,  newIngredient: Ingredient) {
    this.ingredients[index] =  newIngredient;
    this.notifySubscribers();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.ingredientsChanged.next(this.getIngredients());
  }



}