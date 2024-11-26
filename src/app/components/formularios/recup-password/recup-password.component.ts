import { Component, AfterViewInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-recup-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recup-password.component.html',
  styleUrl: './recup-password.component.css'
})


export class RecupPasswordComponent{

  constructor(private localStorageService: LocalStorageService) {}

  email: string = '';
  password: string | null = null;
  errorMessage: string | null = null;
  private bootstrap: any = (window as any)['bootstrap'];
  static openModal: any;
  tipoAcceso: string | undefined;

  openModal() {
    const modalElement = document.getElementById('recoverPasswordModal');
    const modal = new this.bootstrap.Modal(modalElement);
    modal.show();
  }

  recoverPassword(email: string) {

    console.log(this.tipoAcceso)

    let listUsers = this.tipoAcceso ? this.localStorageService.getItem(this.tipoAcceso) : null;

    console.log("lista de usuarios", " tipo: " + this.tipoAcceso + " Lista: " + (listUsers ? JSON.stringify(listUsers) : 'null'));

    if (Array.isArray(listUsers)) {
      listUsers.forEach((user: User) => {
        if (email === user.email) {
          this.password = user.passwd;
          this.errorMessage = null;
        } else {
          this.password = null;
          this.errorMessage = 'Usuario no encontrado';
        }
      });
    } else {
      this.errorMessage = 'No se pudo recuperar la lista de usuarios';
    }
  }
}
