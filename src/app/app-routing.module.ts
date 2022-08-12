import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: 'auth', component: AuthComponent}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {}
