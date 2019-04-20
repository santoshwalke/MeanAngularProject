import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';

@Component( {
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
} )
export class RecipeListComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService ) { }

  recipes: Recipe[];
  subscription: Subscription;

  ngOnInit() {
    this.dataStorageService.getRecipe();
    this.subscription = this.recipeService.recipeChanged
      .subscribe( ( recipes: Recipe[] ) => {
        this.recipes = recipes;
      } );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate( ['new'], { relativeTo: this.activatedRoute } );
  }

}
