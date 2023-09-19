import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSubscription!: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.userSubscription = this.store.select('auth').pipe(map(state => state.user)).subscribe((user) => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
