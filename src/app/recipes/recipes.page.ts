import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage{
  recipes: Recipe[] = [];
  private recipesSubs!: Subscription;

  constructor(private recipesService: RecipesService) {}
  
  ionViewWillEnter() {
    this.recipes = this.recipesService.getAllRecipes();
    this.recipesSubs = this.recipesService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });
  }
  
  ionViewWillLeave() {
    this.recipesSubs.unsubscribe();
  }
}
