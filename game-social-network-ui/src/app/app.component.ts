import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./layout/security/login/login.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MessageService} from "primeng/api";
import {fontAwesomeIcons} from "./shared/font-awesome-icons";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {NavbarComponent} from "./layout/navbar/navbar.component";
import {ToastService} from "./layout/toast.service";
import {FooterComponent} from "./layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, ButtonModule, FontAwesomeModule, NavbarComponent, FooterComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  post = {
    title: 'ed',
    content: 'ded'
  };

  faIconLibrary: FaIconLibrary = inject(FaIconLibrary);
  isListingView: boolean = true;
  toastService = inject(ToastService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.initFontAwesome();
    this.listenToastService();
  }

  private initFontAwesome(): void{
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }


  private listenToastService(): void {
    this.toastService.senSub.subscribe({
      next: newMessage => {
        if(newMessage && newMessage.summary !== this.toastService.INIT_STATE){
          this.messageService.add(newMessage);
        }
      }
    });
  }

  onSubmit() {
    // Logique pour soumettre le post, par exemple un appel à un service Angular
    console.log('Post créé:');
  }
}
