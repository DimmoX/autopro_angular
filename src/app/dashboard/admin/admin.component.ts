import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent{

  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  emailUsuario: string = '';
  telefonoUsuario: string = '';
  nombreCompletoUsuario: string = '';
  editarPerfil: boolean = false;
  perfilForm!: FormGroup;


  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private localStorageService: LocalStorageService) {

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
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  /**
   * @description Método para mostrar u ocultar el formulario de edición de perfil
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
   * @description Método para cancelar la edición del perfil
   */
  editarPerfilUsuaurio() {
    this.editarPerfil = !this.editarPerfil;
  };

  /**
   * @description Método para cancelar la edición del perfil
   */
  cancelarEdicion() {
    this.editarPerfil = false;
    this.perfilForm.reset();
  }

  /**
   * @description Método para guardar los cambios realizados en el perfil
   */
  guardarPerfil() {
    if (this.perfilForm.valid) {
      const idUsuario = Number(this.localStorageService.getItem('id_usuario'));

      const datosPerfil = this.perfilForm.value;

      this.usuariosService
          .actualizarRegistroCliente(idUsuario, datosPerfil)
          .subscribe(
            (response) => {
              console.log('Perfil actualizado:', response);
              this.aplicarCambiosPerfil(datosPerfil);
            },
            (error) => {
              console.error('Error al actualizar el perfil:', error);
            }
          );
    }
  }

  /**
   * @description Método para determinar el tipo de usuario
   * @returns {string} Tipo de usuario
   */
  determinarTipoUsuario(): string {
    return 'admin';
  }

  /**
   * @description Método para aplicar los cambios realizados en el perfil
   * @param datosPerfil 
   */
  aplicarCambiosPerfil(datosPerfil: any) {
    // Actualizar las variables visibles en la vista
    this.nombreCompletoUsuario = datosPerfil.nombre;
    this.emailUsuario = datosPerfil.email;
    this.telefonoUsuario = datosPerfil.telefono;
    this.editarPerfil = false;
  }
}
