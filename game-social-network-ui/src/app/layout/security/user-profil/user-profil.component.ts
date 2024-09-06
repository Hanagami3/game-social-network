import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RegistrationRequest} from "../../../services/models/registration-request";
import {AuthenticationService} from "../../../services/services/authentication.service";

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
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
        //this.authenticationService.
      }
    }

  onFileSelected($event: Event) {

  }

  saveProfile() {

  }
}
