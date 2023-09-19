import {ActionReducerMap} from "@ngrx/store";
import {shoppingListReducer, ShoppingListState} from "../shopping-list/store/shopping-list.reducer";
import {authReducer, AuthState} from "../auth/store/auth.reducer";

export interface AppState {
    shoppingList: ShoppingListState,
    auth: AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
}