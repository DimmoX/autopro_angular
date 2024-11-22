import { Component, AfterViewInit } from '@angular/core';
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


export class RecupPasswordComponent implements AfterViewInit{
  constructor(private localStorageService: LocalStorageService) {}

  email: string = '';
  password: string | null = null;
  errorMessage: string | null = null;
  private bootstrap: any;
  static openModal: any;

  ngAfterViewInit() {
    // Asegura que el objeto de Bootstrap esté disponible
    this.bootstrap = (window as any)['bootstrap'];
  }

  openModal() {
    if (!this.bootstrap) {
      console.error('Bootstrap no está definido. Asegúrate de que el script está cargado.');
      return;
    }
    const modalElement = document.getElementById('recoverPasswordModal');
    const modal = new this.bootstrap.Modal(modalElement);
    modal.show();
  }

  recoverPassword(email: string) {
    let listUsers = this.localStorageService.getItem('users');

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
