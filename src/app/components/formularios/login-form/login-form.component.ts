import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecupPasswordComponent } from '../recup-password/recup-password.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RecupPasswordComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @ViewChild(RecupPasswordComponent) recupPasswordComponent!: RecupPasswordComponent;
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

  toggleModalRecupPassword() {
    if (this.recupPasswordComponent) {
      this.recupPasswordComponent.openModal();
    } else {
      console.error('No se pudo acceder al componente modal');
    }
  }
}
