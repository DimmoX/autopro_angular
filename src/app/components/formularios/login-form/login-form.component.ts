import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecupPasswordComponent } from '../recup-password/recup-password.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/autenticacion/auth.service';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RecupPasswordComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  @Input() tipoLista: string = '';
  @ViewChild(RecupPasswordComponent) recupPasswordComponent!: RecupPasswordComponent;

  loginForm: FormGroup;
  isLoading: boolean = false; // Controla el estado del loader

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
  }

  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true; // Se activa el loader
      const email: string = this.loginForm.get('email')?.value;
      const password: string = this.loginForm.get('password')?.value;
      let usersList: Array<any> = [];

      const request = this.tipoLista === 'clientes'
        ? this.usuariosService.getClientes()
        : this.usuariosService.getColaboradores();

      request.subscribe({
        next: (data) => {
          usersList = data || [];
          const dataUser = usersList.find((user) => user.email === email && user.passwd === password);

          if(!dataUser) {
            this.isLoading = false; // Se desactiva el loader
            alert('Usuario no encontrado');
            return;
          }

          this.tipoLista === 'clientes' ? 
            this.localStorageService.setItem('id_usuario', dataUser.id_cliente) 
          : 
            this.localStorageService.setItem('id_usuario', dataUser.id_colaborador)
          
          this.localStorageService.setItem('nombre', dataUser.nombre);
          this.localStorageService.setItem('apellido', dataUser.apellido);
          this.localStorageService.setItem('email', dataUser.email);
          this.localStorageService.setItem('role', dataUser.role);
          this.localStorageService.setItem('telefono', dataUser.telefono);

          const roles = dataUser.role;
          this.authService.login();
          this.isLoading = false; // Desactiva el loader
          this.router.navigate([`/dashboard/${roles[0]}`]);
        },
        error: (err) => {
          console.error('Error al obtener los datos', err);
          alert('Hubo un error al obtener los datos');
          this.isLoading = false; // Desactiva el loader
        },
      });
    }
  }

  toggleModalRecupPassword() {
    if (this.recupPasswordComponent) {
      this.recupPasswordComponent.openModal();
      this.recupPasswordComponent.tipoAcceso = this.tipoLista;
    } else {
      console.error('No se pudo acceder al componente modal');
    }
  }
}
