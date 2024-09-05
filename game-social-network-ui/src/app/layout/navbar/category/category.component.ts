import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from './category.service';
import {Category, CategoryName} from './category.model';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ FontAwesomeModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  categoryService = inject(CategoryService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  isHome = false;

  categories: Category[] | undefined;

  currentActivateCategory = this.categoryService.getCategoryByDefaut();

  ngOnInit(): void {
    //this.listenRouter();
    this.currentActivateCategory.activated = false;
    this.fetchCategories();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

   private fetchCategories(): void {
     this.categories = this.categoryService.getCategories();
   }



  // private listenRouter() {
  //   this.router.events.pipe(
  //     filter((evt): evt is NavigationEnd => evt instanceof NavigationEnd)
  //   )
  //     .subscribe({
  //       next: (evt: NavigationEnd) => {
  //         this.isHome = evt.url.split("?")[0] === "/";
  //         if (this.isHome && evt.url.indexOf("?") === -1) {
  //           const categoryByTechnicalName = this.categoryService.getCategoryByTechnicalName("ALL");
  //           this.categoryService.changeCategory(categoryByTechnicalName!);
  //         }
  //       },
  //     });
  //
  //   this.activatedRoute.queryParams
  //     .pipe(
  //       map(params => params["category"])
  //     )
  //     .subscribe({
  //       next: (categoryName: CategoryName) => {
  //         const category = this.categoryService.getCategoryByTechnicalName(categoryName);
  //         if (category) {
  //           this.activateCategory(category);
  //           this.categoryService.changeCategory(category);
  //         }
  //       }
  //     })
  // }
  //
  //
  // private activateCategory(category: Category) {
  //   this.currentActivateCategory.activated = false;
  //   this.currentActivateCategory = category;
  //   this.currentActivateCategory.activated = true;
  // }
  //
  // onChangeCategory(category: Category) {
  //   this.activateCategory(category);
  //   this.router.navigate(['/' + category.path], {
  //   })
  // }
}
