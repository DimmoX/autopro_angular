import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements AfterViewInit {

  formContact: HTMLElement | null | undefined;
  public isBrowser: boolean;

  constructor() {
    // Verifica si estás en un entorno de navegador
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    console.log(this.isBrowser);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.formContact = document.getElementById('form-contact');
    this.formContact?.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let isValid = true;

      const email = document.getElementById('email') as HTMLInputElement;
      const mensaje = document.getElementById('mensaje') as HTMLInputElement;

      // Validar email
      if (email && !emailRegex.test(email.value)) {
        isValid = false;
        email.classList.add('is-invalid');
      } else {
        email.classList.remove('is-invalid');
      }

      // Validar mensaje
      if (mensaje?.value.length < 15) {
        isValid = false;
        mensaje.classList.add('is-invalid');
      } else {
        mensaje.classList.remove('is-invalid');
      }

      console.log(isValid);

      if (isValid) {
        // Enviar formulario
        alert("Formulario enviado correctamente");
      }
    });
  }
}