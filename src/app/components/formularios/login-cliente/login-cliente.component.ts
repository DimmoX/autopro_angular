import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-cliente.component.html',
  styleUrl: './login-cliente.component.css',
  host: {ngSkipHydration: 'true'},
})
export class LoginClienteComponent {

  // showOption(current: string , next: string): void{
  //   let loginRol: HTMLElement | null;
  //   let loginForm: HTMLElement | null;

  //   current == 'login' ? 
  //       loginForm = document.getElementById('inicio-login') :
  //       current == 'restorepass' ?
  //           loginForm = document.getElementById('restorepass') :
  //       loginForm = document.getElementById(`login-${current}`);
  //   next == 'registro' ? 
  //       loginRol = document.getElementById(`form-${next}`) :
  //       next == 'restorepass' ? 
  //           loginRol = document.getElementById('restorepass') :
  //       loginRol = document.getElementById(`login-${next}`);
    
  //   if (loginForm) {
  //       loginForm.classList.add('d-none');
  //   }
  //   if (loginRol) {
  //       loginRol.classList.remove('d-none');
  //   }
  // }

  // test(): void {
  //   alert('test');
  // }

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Datos del formulario:', this.loginForm.value);
      // Lógica adicional para el inicio de sesión
    }
  }

}
