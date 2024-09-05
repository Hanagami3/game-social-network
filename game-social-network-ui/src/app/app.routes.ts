import { Routes } from '@angular/router';
import {LoginComponent} from "./layout/security/login/login.component";
import {RegisterComponent} from "./layout/security/register/register.component";
import {ActivateAccountComponent} from "./layout/activate-account/activate-account.component";
import {DisplayIndexComponent} from "./display-index/display-index/display-index.component";
import {FormComponent} from "./layout/form/form.component";
import {PostComponent} from "./post/component/post/post.component";
import {MainComponent} from "./post/pages/main/main.component";
import {PostListComponent} from "./post/pages/post-list/post-list.component";
import {ManagePostComponent} from "./post/pages/manage-book/manage-post.component";
import {MyPostsComponent} from "./post/pages/my-posts/my-posts.component";
import {authGuard} from "./services/guard/auth.guard";

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
        path: 'my-posts',
        component: MyPostsComponent,
        canActivate: [authGuard]
      }
    ]
  }
];
