import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}
  onAddItem(name: string, amount: string) {
    const newIngredient = new Ingredient(name, parseInt(amount));
    this.shoppingListService.addIngredient(newIngredient);
  }
}
