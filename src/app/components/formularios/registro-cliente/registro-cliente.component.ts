import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      'email-registro': ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      'fecha-nac': ['', [Validators.required, this.validarEdad]],
      'passwd-registro': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  validarEdad(control: any) {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    if (edad < 18) {
      return { menorDeEdad: true };
    } else if(edad > 100) {
      return { edadInvalida: true };
    }
    return null;
  }

  onSubmit() {

    if (this.registroForm.valid) {
      // Procesar el formulario
      console.log(this.registroForm.value);

      let nuevoCliente: User = {
        id_cliente: 0, // <- se inicializa en 0
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        email: this.registroForm.value['email-registro'],
        passwd: this.registroForm.value['passwd-registro'],
        telefono: this.registroForm.value.telefono,
        role: ['cliente']
      }

      let resultUpdateCliente: any = '';

      this.usuariosService.crearClientes(nuevoCliente).subscribe({
        next: (data) => {
          console.log('data en registro-cliente: ' + data.message);
          resultUpdateCliente = data;
          console.log('resultUpdateCliente en registro-cliente: ' + resultUpdateCliente);
        },
        error: (error) => {
          console.error(error);
          resultUpdateCliente = error;
        }
      });

      this.usuariosService.getClientes().subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      // Mostrar mensajes de error
      alert('Formulario inválido');
      console.log(this.registroForm.value);
    }
  }
}
