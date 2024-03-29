import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {AppRoutingModule} from './app-routing.module';
import {RecipeService} from './recipes/recipe.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {appReducer} from "./store/app.reducer";
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from "./auth/store/auth.effects";

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        ShoppingListModule,
        SharedModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([AuthEffects]),
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
