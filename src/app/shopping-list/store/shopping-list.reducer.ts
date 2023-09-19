// import { Ingredient } from '../../shared/ingredient.model';
// import * as ShoppingListActions from './shopping-list.actions';
//
// export interface State {
//     ingredients: Ingredient[];
//     editedIngredient: Ingredient;
//     editedIngredientIndex: number;
// }
//
// const initialState: State = {
//     ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
//     editedIngredient: null,
//     editedIngredientIndex: -1
// };
//
// export function shoppingListReducer(
//     state: State = initialState,
//     action: ShoppingListActions.ShoppingListActions
// ) {
//     switch (action.type) {
//         case ShoppingListActions.ADD_INGREDIENT:
//             return {
//                 ...state,
//                 ingredients: [...state.ingredients, action.payload]
//             };
//         case ShoppingListActions.ADD_INGREDIENTS:
//             return {
//                 ...state,
//                 ingredients: [...state.ingredients, ...action.payload]
//             };
//         case ShoppingListActions.UPDATE_INGREDIENT:
//             const ingredient = state.ingredients[state.editedIngredientIndex];
//             const updatedIngredient = {
//                 ...ingredient,
//                 ...action.payload
//             };
//             const updatedIngredients = [...state.ingredients];
//             updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
//
//             return {
//                 ...state,
//                 ingredients: updatedIngredients,
//                 editedIngredientIndex: -1,
//                 editedIngredient: null
//             };
//         case ShoppingListActions.DELETE_INGREDIENT:
//             return {
//                 ...state,
//                 ingredients: state.ingredients.filter((ig, igIndex) => {
//                     return igIndex !== state.editedIngredientIndex;
//                 }),
//                 editedIngredientIndex: -1,
//                 editedIngredient: null
//             };
//         case ShoppingListActions.START_EDIT:
//             return {
//                 ...state,
//                 editedIngredientIndex: action.payload,
//                 editedIngredient: { ...state.ingredients[action.payload] }
//             };
//         case ShoppingListActions.STOP_EDIT:
//             return {
//                 ...state,
//                 editedIngredient: null,
//                 editedIngredientIndex: -1
//             };
//         default:
//             return state;
//     }
// }

// Alternative syntax:
// Using recent NgRx features (e.g., createReducer() and on()).

import { createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.action';
import {Ingredient} from "../../shared/ingredient.model";

export interface AppState {
  shoppingList: State
}
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.AddIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient]
  })),
 on(ShoppingListActions.AddIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients]
  })),
  on(ShoppingListActions.UpdateIngredient, (state, action) => {
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.ingredient
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
  }),
  on(ShoppingListActions.DeleteIngredient, (state) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((ig, igIndex) => {
        return igIndex !== state.editedIngredientIndex;
      }),
      editedIngredientIndex: -1,
      editedIngredient: null
    };
  }),
  on(ShoppingListActions.StartEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.index,
      editedIngredient: { ...state.ingredients[action.index] }
    };
  }),
  on(ShoppingListActions.StopEdit, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  })
);
