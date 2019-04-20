import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';

import { environment } from '../../environments/environment';
import { RecipeService } from '../recipes/recipe.service';

@Injectable( {
  providedIn: 'root'
} )
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService ) { }
  baseUrl: string = environment.baseUrl;

  header = new HttpHeaders( {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem( 'token' )
  } );

  getRecipe() {
    this.httpClient.get<Recipe[]>( `${this.baseUrl}/recipe`, {
      headers: this.header,
      observe: 'body',
      responseType: 'json'
    } )
      .subscribe(
        ( recipe: Recipe[] ) => {
          this.recipeService.setRecipe( recipe );
        }
      );
  }

  addRecipe( data: Recipe[] ) {
    this.httpClient.post( `${this.baseUrl}/recipe/add`, data, {
      headers: this.header,
      observe: 'body'
    } )
      .subscribe(
        ( response: Recipe ) => {
          this.recipeService.addRecipe( response );
        }
      );
  }

  removeRecipe( index: string ) {
    const req = new HttpRequest(
      'DELETE',
      `${this.baseUrl}/recipe/delete`,
      {
        id: index
      },
      {
        headers: this.header,
        responseType: 'json'
      }
    );
    this.httpClient.request( req )
      .subscribe(
        ( response: object ) => {
          console.log( response );
        }
      );
  }

  updateRecipe( recipeObj: any, data: Recipe ) {
    this.httpClient.put( `${this.baseUrl}/recipe/update`, { _id: recipeObj._id, data }, {
      headers: this.header,
      responseType: 'json'
    } )
      .subscribe(
        ( response: any ) => {
          if ( response.status ) {
            this.getRecipe();
          }
        }
      );
  }
}
