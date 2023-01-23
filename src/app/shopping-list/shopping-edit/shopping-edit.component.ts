import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm!: NgForm;
  constructor(private shoppingListService: ShoppingListService) {}
  subscription!: Subscription;
  editMode: boolean = false;
  selectedItemIndex!: number;
  selectedItem!: Ingredient;
  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientSelected.subscribe(
      (index: number) => {
        this.selectedItemIndex = index;
        this.editMode = true;
        this.selectedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.selectedItem.name,
          amount: this.selectedItem.amount,
        });
      }
    );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.selectedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedItemIndex);
    this.shoppingForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
