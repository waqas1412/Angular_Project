import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";

@Injectable({
    providedIn: 'root',
})
export class AuthGaurd {
    constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(state => state.user),
            map((user) => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
    }
}
