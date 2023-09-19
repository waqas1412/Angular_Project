// import { User } from '../user.model';
// import * as AuthActions from './auth.actions';
//
// export interface State {
//     user: User;
// }
//
// const initialState: State = {
//     user: null
// };
//
// export function authReducer(
//     state = initialState,
//     action: AuthActions.AuthActions
// ) {
//     switch (action.type) {
//         case AuthActions.LOGIN:
//             const user = new User(
//                 action.payload.email,
//                 action.payload.userId,
//                 action.payload.token,
//                 action.payload.expirationDate
//             );
//             return {
//                 ...state,
//                 user: user
//             };
//         case AuthActions.LOGOUT:
//             return {
//                 ...state,
//                 user: null
//             };
//         default:
//             return state;
//     }
// }

// Alternative syntax:
import {createReducer, on} from '@ngrx/store';

import {User} from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null
};

export const authReducer = createReducer(
    initialState,
    on(
        AuthActions.login,
        (state, action) => {
            const user = new User(
                action.email,
                action.password,
                action.token,
                action.expirationDate
            );
            return {
                ...state,
                user: user
            };
        }
    ),
    on(
        AuthActions.logout,
        (state) => {
            return {
                ...state,
                user: null
            };
        }
    )
);
