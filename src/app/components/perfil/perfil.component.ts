import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  nombre: string;
  apellido: string;
  email: string;
  inicialUser: string;
  // dataCurrentUser: object = {};
  constructor(private localStorageService: LocalStorageService) { 
    // this.dataCurrentUser = this.localStorageService.getItem('current_user') || {};
    this.nombre = this.localStorageService.getItem('nombre') || '';
    this.apellido = this.localStorageService.getItem('apellido') || '';
    this.email = this.localStorageService.getItem('email') || '';
    this.inicialUser = this.nombre.charAt(0) + this.apellido.charAt(0);
  }
}
