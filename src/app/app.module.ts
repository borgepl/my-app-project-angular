import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListService } from './components/shopping-list/shopping-list.service';
import { RecipeService } from './components/recipes/recipe.service';
import { AppRoutingModule } from './app-routing.module';
import { DataStorageService } from './components/shared/data-storage.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './components/shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducers),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
    SharedModule,
    AuthModule
  ],
  providers: [ShoppingListService,RecipeService, DataStorageService,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
