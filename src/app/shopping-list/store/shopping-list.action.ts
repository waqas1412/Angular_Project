import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
//
// export class AddIngredient implements Action {
//     readonly type = ADD_INGREDIENT;
//     payload!: Ingredient;
// }

// Alternative syntax (using createAction() and props()):
import { createAction, props } from '@ngrx/store';

export const AddIngredient = createAction(
  '[Shopping List] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const AddIngredients = createAction(
    '[Shoppping List] Add Ingredients',
    props<{ingredients: Ingredient[]}>()
)

export const UpdateIngredient = createAction(
    '[Shopping List] Update Ingredient',
    props<{ index: number, ingredient: Ingredient }>()
);

export const DeleteIngredient = createAction(
    '[Shopping List] Delete Ingredient',
    props<{ index: number }>()
);