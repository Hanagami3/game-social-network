import { Injectable } from '@angular/core';
import { Category, CategoryName } from './category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  private categories: Category[] = [
    //game
    {
      icon: "television",
      displayName: "GAME",
      technicalName: "",
      activated: true,
      path: ''
    },
    //blog
    {
      icon: "message",
      displayName: "BLOG",
      technicalName: "post",
      path: '/',
      activated: true
    },
    //calendar
    {
      icon: "calendar",
      displayName: "CALENDAR",
      technicalName: "calendar",
      path: '/',
      activated: false
    },
    //My Post
    {
      icon: "book-atlas",
      displayName: "MY POST",
      technicalName: "post/my-posts",
      path: '/',
      activated: false
    },
    //profil
    {
      icon: "user",
      displayName: "PROFIL",
      technicalName: "/user-profil",
      path: '/',
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
