import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../../component/post-card/post-card.component";
import {PostResponse} from "../../../services/models/post-response";
import {PageResponsePostResponse} from "../../../services/models/page-response-post-response";
import {PostService} from "../../../services/services/post.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-post',
  standalone: true,
  imports: [
    NgForOf,
    PostCardComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './search-post.component.html',
  styleUrl: './search-post.component.scss'
})
export class SearchPostComponent implements OnInit{

  postResponse: PageResponsePostResponse = {};
  page = 0;
  size = 6;
  searchTerm: string = '';

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findPostByTitle();
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
    this.page = this.postResponse.totalPages as number -1;
    this.findPostByTitle();
  }

  get isLastPage(): boolean {
    return this.page == this.postResponse.totalPages as number -1;
  }

  singlePost(post: PostResponse) {
    this.router.navigate(['post','single-post', post.id])
  }

  commentsPost(post: PostResponse) {
    this.router.navigate(['post', 'comments-post', post.id]);
  }

  private findPostByTitle() {
    this.postService.findPostByTitle({
      query: this.searchTerm,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.postResponse = response;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche de posts', err);
      }
    });
  }

  // Méthode appelée lors de la soumission du formulaire de recherche
  onSearch() {
    this.page = 0; // Réinitialiser la page lors d'une nouvelle recherche
    this.findPostByTitle();
  }
}
