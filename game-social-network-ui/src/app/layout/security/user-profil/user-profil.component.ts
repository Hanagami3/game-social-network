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
  ) {
  }

    ngOnInit(): void {
      const userId = this.activatedRoute.snapshot.params['userId'];
      if (userId) {
        this.authenticationService.findUserById({
          'user-id': userId
        }).subscribe( user=> {
          this.registerRequest = {
            id: user.id,
            firstname: user.firstname as string,
            lastname: user.lastname as string,
            email: user.email as string,
            password: user.password as string,
          }
        })
      }
    }

  onFileSelected($event: any) {

  }

  saveProfile() {

  }
}
