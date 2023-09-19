// import {Ingredient} from "../../shared/ingredient.model";
// import {Action} from "@ngrx/store";
// import * as ShoppingListAction from "./shopping-list.action";
//
// const initialState = {
//     ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)]
// };
//
// export function shoppingListReducer(
//     state = initialState,
//     action: ShoppingListAction.AddIngredient
// ) {
//     switch (action.type) {
//         case ShoppingListAction.ADD_INGREDIENT:
//             return {
//                 ...state,
//                 ingredients: [...state.ingredients, action.payload]
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

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
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
        const ingredient = state.ingredients[action.index];
        const updatedIngredient = {...ingredient, ...action.ingredient};
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.index] = updatedIngredient;
        return {...state, ingredients: updatedIngredients};
    }),
    on(ShoppingListActions.DeleteIngredient, (state, action) => {
        return {...state, ingredients: state.ingredients.filter((ingredient, index) => {
            return index != action.index
            })}
    })
);