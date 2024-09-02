import { NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-display-index',
  standalone: true,
  imports: [NgFor],
  templateUrl: './display-index.component.html',
  styleUrl: './display-index.component.scss'
})
export class DisplayIndexComponent {

  gamePhotos: string[] = [
    'game1.gif',
    'game2.gif',
    'game3.gif',
  ];

}
