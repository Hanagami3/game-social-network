import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {DisplayIndexComponent} from "./display-index/display-index/display-index.component";
import {PostingComponent} from "./post/post.component";

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
    path: 'posting',
    component: PostingComponent,
  }
];
