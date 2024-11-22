import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginFormComponent } from '../../components/formularios/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {ngSkipHydration: 'true'}
})
export class LoginComponent {
  showLoginClientForm = false;
  showLoginEmployeeForm = false;

  toggleLoginClientForm(): void {
    this.showLoginClientForm = !this.showLoginClientForm; // se cambiará el valor de showLoginForm a su valor contrario (true/false)
    this.showLoginEmployeeForm = false; // se cambiará el valor de showLoginForm a su valor contrario (true/false)
  }

  toggleLoginEmployeeForm(): void {
    this.showLoginEmployeeForm = !this.showLoginEmployeeForm; // se cambiará el valor de showLoginForm a su valor contrario (true/false)
    this.showLoginClientForm = false; // se cambiará el valor de showLoginForm a su valor contrario (true/false)
  }

  crearCuentaCliente(){
    
  }
}
