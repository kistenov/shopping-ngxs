import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ShoppingListState } from './shopping-list/state/shopping-list.state';
import { RecipeState } from './recipes/state/recipes.state';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly:environment.production }),
    StoreRouterConnectingModule.forRoot(),
    NgxsModule.forRoot([
      ShoppingListState,
      RecipeState
    ]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
      name: 'Ngxs State Management'
    }),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
