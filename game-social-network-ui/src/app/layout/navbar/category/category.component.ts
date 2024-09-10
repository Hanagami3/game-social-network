import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PostService } from '../../../services/services/post.service';
import { PageResponsePostResponse } from '../../../services/models/page-response-post-response';
import {PostResponse} from "../../../services/models/post-response";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  searchTerm: string = '';
  categoryService = inject(CategoryService);
  postService = inject(PostService); // Inject PostService
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  isHome = false;

  categories: Category[] | undefined;
  currentActivateCategory = this.categoryService.getCategoryByDefaut();

  postResponse: PageResponsePostResponse = {}; // Pour stocker les résultats de la recherche
  page = 0;
  size = 6;

  ngOnInit(): void {
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

  search(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/post/search-results'], { queryParams: { query: this.searchTerm } });
    }
  }

  private findPostByTitle() {
    this.postService.findPostByTitle({
      query: this.searchTerm,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.postResponse = response;
        this.router.navigate(['post/search-results']); // Naviguer vers la page des résultats de recherche
      },
      error: (err) => {
        console.error('Erreur lors de la recherche de posts', err);
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findPostByTitle();
  }

  goToPreviousPage() {
    this.page--;
    this.findPostByTitle();
  }

  goToPage(page: number) {
    this.page = page;
    this.findPostByTitle();
  }

  goToNextPage() {
    this.page++;
    this.findPostByTitle();
  }

  goToLastPage() {
    this.page = this.postResponse.totalPages as number - 1;
    this.findPostByTitle();
  }

  get isLastPage(): boolean {
    return this.page == this.postResponse.totalPages as number - 1;
  }

  singlePost(post: PostResponse) {
    this.router.navigate(['post', 'single-post', post.id]);
  }

  commentsPost(post: PostResponse) {
    this.router.navigate(['post', 'comments-post', post.id]);
  }
}
