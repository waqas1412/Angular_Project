import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action'
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'Test Description',
  //     'https://www.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-600w-370298699.jpg',
  //     [new Ingredient('Potato', 5), new Ingredient('Bun', 2)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(ShoppingListActions.AddIngredients({ingredients: ingredients}));
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
