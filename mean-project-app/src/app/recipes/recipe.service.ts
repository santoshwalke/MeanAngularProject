import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class RecipeService {

  constructor() { }
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  setRecipe( recipe: Recipe[] ) {
    this.recipes = recipe;
    this.recipeChanged.next( this.recipes.slice() );
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe( index: number ) {
    return this.recipes[index];
  }

  updateRecipe( index: number, newRecipe: Recipe ) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next( this.recipes.slice() );
  }

  addRecipe( recipe: Recipe ) {
    this.recipes.push( recipe );
    this.recipeChanged.next( this.recipes.slice() );
  }

  deleteRecipe( index: number ) {
    this.recipes.splice( index, 1 );
    this.recipeChanged.next( this.recipes.slice() );
  }

  addIngredientsToShoppingList( ingredients: Ingredient[] ) {
    // this.slService.addIngredients(ingredients);
  }
}
