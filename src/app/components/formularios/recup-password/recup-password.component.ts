import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { Component, AfterViewInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { User } from '../../../models/user/user.model';
import { map, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-recup-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recup-password.component.html',
  styleUrl: './recup-password.component.css',
})


export class RecupPasswordComponent{

  constructor(private UsuariosService: UsuariosService) {}

  email: string = '';
  password: string | null = null;
  errorMessage: string | null = null;
  private bootstrap: any = (window as any)['bootstrap'];
  static openModal: any;
  tipoAcceso: string = '';

  openModal() {
    const modalElement = document.getElementById('recoverPasswordModal');
    const modal = new this.bootstrap.Modal(modalElement);
    modal.show();
  }

  recoverPassword(email: string) {

    console.log(this.tipoAcceso)

    this.UsuariosService.recuperarContrasena(email, this.tipoAcceso).subscribe({
      next: (data) => {
        console.log(data)
        this.password = data;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error;
        this.password = null;
      }
    });
  }
}
