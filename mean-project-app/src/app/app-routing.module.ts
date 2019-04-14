import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { NotPageNotFoundComponent } from './core/not-page-not-found/not-page-not-found.component';

const routes: Routes = [
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
];

@NgModule({
  declarations: [
      NotPageNotFoundComponent
  ],
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
