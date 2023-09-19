import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action'
import {AppState} from "../store/app.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  // ingredients: Ingredient[] = [];
  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<AppState>) {}
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredient: Ingredient[]) => {
    //     this.ingredients = ingredient;
    //   }
    // );
  }
  onEditItem(index: number) {
    // this.shoppingListService.ingredientSelected.next(index);
    this.store.dispatch(ShoppingListActions.StartEdit({index: index}));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
