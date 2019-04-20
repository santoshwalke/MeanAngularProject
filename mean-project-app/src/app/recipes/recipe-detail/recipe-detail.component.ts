import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import { DataStorageService } from '../../shared/data-storage.service';

@Component( {
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
} )
export class RecipeDetailComponent implements OnInit {

  id: number;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataStorageService: DataStorageService ) { }

  ngOnInit() {
    this.route.params
      .subscribe( ( params: Params ) => {
        this.id = params.id;
        this.recipe = this.recipeService.getRecipe( this.id );
      } );
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate( ['edit'], { relativeTo: this.route } );
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe( index: string ) {
    this.dataStorageService.removeRecipe( index );
    this.recipeService.deleteRecipe( this.id );
    this.router.navigate( ['/recipes'] );
  }

}
