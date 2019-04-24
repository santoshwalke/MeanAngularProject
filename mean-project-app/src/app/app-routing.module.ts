import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { NotPageNotFoundComponent } from './core/not-page-not-found/not-page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] }
];

@NgModule( {
  declarations: [
    NotPageNotFoundComponent
  ],
  imports: [RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
