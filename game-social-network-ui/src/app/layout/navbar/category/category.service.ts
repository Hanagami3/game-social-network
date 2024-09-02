import { Injectable } from '@angular/core';
import { Category, CategoryName } from './category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    //all
    {
      icon: 'eye',
      displayName: "ALL",
      technicalName: "ALL",
      activated: false
    },
    //game
    {
      icon: "dice",
      displayName: "GAME",
      technicalName: "GAME",
      activated: false
    },
    //blog
    {
      icon: "message",
      displayName: "Bloc",
      technicalName: "BLOG",
      activated: false
    },
    //calendar
    {
      icon: "calendar",
      displayName: "CALENDAR",
      technicalName: "CALENDAR",
      activated: false
    },
    //profil
    {
      icon: "user",
      displayName: "PROFIL",
      technicalName: "PROFIL",
      activated: false
    },
  ];

  private changedCategory$: BehaviorSubject<Category> = new BehaviorSubject<Category>(this.getCategoryByDefaut());
  changeCategoryObs = this.changedCategory$.asObservable();

  changeCategory(category: Category): void{
    this.changedCategory$.next(category);
  }

  getCategories(): Category[]{
    return this.categories;
  }

  getCategoryByDefaut(): Category{
    return this.categories[0];
  }

  getCategoryByTechnicalName(technicalName: CategoryName): Category | undefined {
    return this.categories.find(category => category.technicalName === technicalName)
  }
}
