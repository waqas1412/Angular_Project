import {ActionReducerMap} from "@ngrx/store";
import {shoppingListReducer, ShoppingListState} from "../shopping-list/store/shopping-list.reducer";

export interface AppState {
    shoppingList: ShoppingListState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer
}