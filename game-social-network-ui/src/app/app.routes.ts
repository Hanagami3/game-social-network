import { Routes } from '@angular/router';
import {LoginComponent} from "./layout/security/login/login.component";
import {RegisterComponent} from "./layout/security/register/register.component";
import {ActivateAccountComponent} from "./layout/activate-account/activate-account.component";
import {DisplayIndexComponent} from "./display-index/display-index/display-index.component";
import {FormComponent} from "./layout/form/form.component";
import {PostComponent} from "./post/component/post/post.component";
import {MainComponent} from "./post/pages/main/main.component";
import {PostListComponent} from "./post/pages/post-list/post-list.component";
import {ManagePostComponent} from "./post/pages/manage-post/manage-post.component";
import {MyPostsComponent} from "./post/pages/my-posts/my-posts.component";
import {authGuard} from "./services/guard/auth.guard";
import {SinglePostComponent} from "./post/pages/single-post/single-post.component";
import {CommentsPostComponent} from "./post/pages/comments-post/comments-post.component";
import {UserProfilComponent} from "./layout/security/user-profil/user-profil.component";
import {SearchPostComponent} from "./post/pages/search-post/search-post.component";
import {CalendarComponent} from "./calendar/calendar.component";

export const routes: Routes = [
  {
    path: '',
    component: DisplayIndexComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'form',
    component: FormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-profil',
    component: UserProfilComponent,
    canActivate: [authGuard]
  },
  {
    path: 'post',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: PostListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManagePostComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:postId',
        component: ManagePostComponent,
        canActivate: [authGuard]
      },
      {
        path: 'single-post/:postId',
        component: SinglePostComponent,
        canActivate: [authGuard]
      },
      {
        path: 'comments-post/:postId',
        component: CommentsPostComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-posts',
        component: MyPostsComponent,
        canActivate: [authGuard]
      },
      { path: 'search-results',
        component: SearchPostComponent },
    ]
  }
];
