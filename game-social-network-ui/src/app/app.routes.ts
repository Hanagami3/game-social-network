import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {DisplayIndexComponent} from "./display-index/display-index/display-index.component";
import {FormComponent} from "./layout/form/form.component";
import {PostComponent} from "./post/component/post/post.component";
import {MainComponent} from "./post/pages/main/main.component";
import {PostListComponent} from "./post/pages/post-list/post-list.component";
import {ManageBookComponent} from "./post/pages/my-post/manage-book/manage-book.component";

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
    path: 'manage',
    component: ManageBookComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'post',
    component: MainComponent,
    children: [
      {
        path: 'post',
        component: PostListComponent
      },
      {
        path: 'manage1',
        component: ManageBookComponent
      },
      {
        path: 'manage/:postId',
        component: ManageBookComponent
      }
    ]
  }
];
