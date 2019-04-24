import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe/recipe.component';

import { AuthGuardService } from '../auth/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: RecipeComponent, children: [
      { path: '', canActivate: [AuthGuardService], component: RecipeStartComponent },
      { path: 'new', canActivate: [AuthGuardService], component: RecipeEditComponent },
      { path: ':id', canActivate: [AuthGuardService], component: RecipeDetailComponent },
      { path: ':id/edit', canActivate: [AuthGuardService], component: RecipeEditComponent }
    ]
  }
];

@NgModule( {
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
} )
export class RecipesRoutingModule { }
