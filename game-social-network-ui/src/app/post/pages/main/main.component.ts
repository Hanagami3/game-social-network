import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../component/menu/menu.component";
import {PostListComponent} from "../post-list/post-list.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    PostListComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
