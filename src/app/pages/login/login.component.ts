import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginClienteComponent } from '../../components/formularios/login-cliente/login-cliente.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, LoginClienteComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {ngSkipHydration: 'true'}
})
export class LoginComponent {
  showLoginForm = false;

  toggleLoginForm(): void {
    this.showLoginForm = !this.showLoginForm; // se cambiará el valor de showLoginForm a su valor contrario (true/false)
  }
}
