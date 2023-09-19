import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.action'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm!: NgForm;
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}
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
      // this.shoppingListService.updateIngredient(
      //   this.selectedItemIndex,
      //   newIngredient
      // );
      this.store.dispatch(ShoppingListActions.UpdateIngredient({ ingredient: newIngredient }));
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(ShoppingListActions.AddIngredient({ingredient: newIngredient}));
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }
  onDelete() {
    // this.shoppingListService.deleteIngredient(this.selectedItemIndex);
    this.store.dispatch(ShoppingListActions.DeleteIngredient());
    this.shoppingForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
