import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RegistrationRequest} from "../../../services/models/registration-request";
import {AuthenticationService} from "../../../services/services/authentication.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit{

  userProfile: any;
  errorMsg: Array<String> = [];
  registerRequest: RegistrationRequest = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    // if (userId) {
    //   this.authService.findUserByIdBis(Number(userId)).subscribe({
    //     next: (data) => {
    //       this.userProfile = data;
    //       this.registerRequest = {
    //         id: this.userProfile.id,
    //         firstname: this.userProfile.firstname,
    //         lastname: this.userProfile.lastname,
    //         email: this.userProfile.email,
    //         password: '' // Ne remplissez pas le mot de passe
    //       };
    //     },
    //     error: (error) => {
    //       console.error('Erreur lors de la récupération du profil utilisateur', error);
    //     }
    //   });
    // } else {
    //   console.error('ID utilisateur non trouvé dans localStorage');
    // }
  }

  onFileSelected($event: any) {

  }

  saveProfile() {

  }
}
