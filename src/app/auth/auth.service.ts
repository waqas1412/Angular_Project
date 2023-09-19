import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';
import {User, UserModel} from '../shared/user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {login, logout} from './store/auth.actions'

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // user = new BehaviorSubject<UserModel>(null!);
    private tokenExpirationTimer: any;

    constructor(private httpClient: HttpClient, private router: Router,
                private store: Store<AppState>) {
    }

    signup(user: User) {
        return this.httpClient
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                environment.firebaseAPIKey,
                {email: user.email, password: user.password, returnSecureToken: true}
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    login(user: User) {
        return this.httpClient
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                environment.firebaseAPIKey,
                {email: user.email, password: user.password, returnSecureToken: true}
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')!);
        if (!userData) {
            return;
        }

        const loadedUser = new UserModel(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(login({
                email: loadedUser.email,
                password: loadedUser.password,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }));

            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        // this.user.next(null!);
        this.store.dispatch(logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An Error Occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'User with this email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'User with this email does not exists';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect Password';
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new UserModel(email, userId, token, expirationDate);
        // this.user.next(user);
        this.store.dispatch(login({
            email: email,
            password: user.password,
            token: token,
            expirationDate: expirationDate
        }));
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
