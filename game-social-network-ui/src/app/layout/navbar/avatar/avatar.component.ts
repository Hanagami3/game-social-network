import { Component, input, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgClass, FontAwesomeModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  imageUrl = input<string>();
  avatarSize = input<"avatar-sm" | "avatar-xl">();

//   @Input() imageUrl: string = '';  // Déclaration de l'input
//   @Input() avatarSize: string = 'avatar-md';  // Autre input, si nécessaire
}
