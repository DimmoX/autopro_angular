import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { User } from '../../models/user/user.model';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  emailUsuario: string = '';
  telefonoUsuario: string = '';
  nombreCompletoUsuario: string = '';
  usuario: User | null = null;
  editarPerfil: boolean = false;
  perfilForm!: FormGroup;


  constructor(private localStorageService: LocalStorageService, private fb: FormBuilder, private usuariosService: UsuariosService) {
    let nombre = this.localStorageService.getItem('nombre');
    this.nombreUsuario = typeof nombre === 'string' ? nombre.replace(/"/g, '') : '';

    let apellido = this.localStorageService.getItem('apellido');
    this.apellidoUsuario = typeof apellido === 'string' ? apellido.replace(/"/g, '') : '';

    let email = this.localStorageService.getItem('email');
    this.emailUsuario = typeof email === 'string' ? email.replace(/"/g, '') : '';

    let telefono = this.localStorageService.getItem('telefono');
    this.telefonoUsuario = typeof telefono === 'string' ? telefono.replace(/"/g, '') : '';

    this.nombreCompletoUsuario = `${this.nombreUsuario} ${this.apellidoUsuario}`;

    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    });
  }

  ngOnInit(): void {
    this.nombreUsuario = (this.localStorageService.getItem('nombre') as string).replace(/"/g, '');
    this.apellidoUsuario = (this.localStorageService.getItem('apellido') as string).replace(/"/g, '');
    this.emailUsuario = (this.localStorageService.getItem('email') as string).replace(/"/g, '');
    this.telefonoUsuario = (this.localStorageService.getItem('telefono') as string).replace(/"/g, '');

    this.nombreCompletoUsuario = `${this.nombreUsuario} ${this.apellidoUsuario}`;
  }

  /**
   * @description Función para mostrar u ocultar el formulario de edición de perfil
   */
  toggleEditarPerfil() {
    this.editarPerfil = !this.editarPerfil;
    if (this.editarPerfil) {
      // Inicializa el formulario con los datos actuales
      this.perfilForm.setValue({
        nombre: this.nombreUsuario,
        apellido: this.apellidoUsuario,
        email: this.emailUsuario,
        telefono: this.telefonoUsuario,
      });
    }
  }

  /**
   * @description Función para mostrar u ocultar el formulario de edición de perfil
   */
  editarPerfilUsuaurio() {
    this.editarPerfil = !this.editarPerfil;
  };

  /**
   * @description Función para cancelar la edición del perfil
   */
  cancelarEdicion() {
    this.editarPerfil = false;
    this.perfilForm.reset();
  }

  /**
   * @description Función para guardar los cambios realizados en el perfil
   */
  guardarPerfil() {
    if (this.perfilForm.valid) {
      const idUsuario = Number(this.localStorageService.getItem('id_usuario'));
      const roleUsuario: string | null = this.localStorageService.getItem('role');

      const datosPerfil = this.perfilForm.value;

      // Actualizar el perfil del usuario
      this.usuario = {
        id_cliente: idUsuario,
        nombre: datosPerfil.nombre,
        apellido: datosPerfil.apellido,
        email: datosPerfil.email,
        telefono: datosPerfil.telefono,
        passwd: '',
        role: roleUsuario ? JSON.parse(roleUsuario) : []
      };

      this.usuariosService
          .actualizarRegistroCliente(idUsuario, datosPerfil)
          .subscribe(
            (response: any) => {
              console.log('Perfil actualizado:', response);
              this.aplicarCambiosPerfil(datosPerfil);
            },
            (error: any) => {
              console.error('Error al actualizar el perfil:', error);
            }
          );
    }
  }

  determinarTipoUsuario(): string {
    return 'admin';
  }

  aplicarCambiosPerfil(datosPerfil: any) {
    // Actualizar las variables visibles en la vista
    this.nombreUsuario = datosPerfil.nombre;
    this.apellidoUsuario = datosPerfil.apellido;
    this.emailUsuario = datosPerfil.email;
    this.telefonoUsuario = datosPerfil.telefono;
    this.editarPerfil = false;
  }
}
