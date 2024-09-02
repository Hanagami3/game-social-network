import { Component, effect, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import { CategoryComponent } from './category/category.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DialogService } from "primeng/dynamicdialog"
import { ToastService } from '../toast.service';
import { AuthenticationService} from "../../services/services/authentication.service";
import {User} from "../../models/User.model";


//import { User } from '../../core/model/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    FontAwesomeModule,
    ToolbarModule,
    MenuModule,
    CategoryComponent,
    AvatarComponent
  ],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent //implements OnInit
{

  comment: string = "Add Comment";
  post: string = "Add post";
  dates: string = "Add dates";

  toastService = inject(ToastService);
  authService = inject(AuthenticationService);

  //login = () => this.authService.login();
  //logout = () => this.authService.logout();

  currentMenuItems: MenuItem[] | undefined = [];

  connectedUser: User = {email: this.authService.notConnected};

  // constructor(){
  //   effect(() => {
  //     if (this.authService.fetchUser().status === "OK"){
  //       this.connectedUser = this.authService.fetchUser().value!;
  //       this.currentMenuItems = this.fetchMenu();
  //     }
  //   });
  // }

//   ngOnInit(): void {
//     this.authService.fetch(false);
//     //this.currentMenuItems = this.fetchMenu();
//     //this.toastService.send({severity: "info", summary: "Welcom to Your Game Social App"})
//   }
//
//   private fetchMenu(){
//     if(this.authService.isAuthenticated()) {
//       return[
//         {
//           label: "My properties",
//           routerLink: "moderator/properties",
//           visible: this.hasToBeModerator(),
//         },
//         {
//           label: "My post",
//           routerLink: "view",
//         },
//         {
//           label: "Create Post",
//           routerLink: "posting",
//         },
//         {
//           label: "Log out",
//           command: this.logout
//         },
//         {
//           lable: "Log in"
//         }
//       ]
//     } else {
//       return [
//         {
//           label: "Sign up",
//           styleClass: "font-bold",
//           command: this.login
//         },
//         {
//           label: "Log in",
//           command: this.login
//         }
//       ]
//     }
//   }
//
//   hasToBeModerator(): boolean {
//     return this.authService.hasAnyAuthority("ROLE_MODERATOR");
//   }
 }
