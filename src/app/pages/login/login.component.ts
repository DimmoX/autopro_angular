import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginFormComponent } from '../../components/formularios/login-form/login-form.component';
import { RegistroClienteComponent } from '../../components/formularios/registro-cliente/registro-cliente.component';

/**
 * @description Componente que representa la página de inicio de sesión.
 * @component
 * @selector 'app-login'
 * @standalone true
 * @imports [CommonModule, NavComponent, HeaderComponent, FooterComponent, LoginFormComponent, RegistroClienteComponent]
 * @templateUrl './login.component.html'
 * @styleUrls ['./login.component.css']
 * @host {ngSkipHydration: 'true'}
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoginFormComponent, RegistroClienteComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {ngSkipHydration: 'true'}
})
/**
 * @description Clase que maneja el formulario de inicio de sesión y la lógica asociada al proceso de autenticación del usuario.
 * @class LoginComponent
 */
export class LoginComponent {

  /**
   * @description Propiedad que determina si el formulario debe ser visible.
   * @type {boolean}
   */
  @Input() isVisibleForm!: boolean;

  /**
   * @description Estado de visibilidad del formulario de inicio de sesión de cliente.
   * @type {boolean}
    */
  showLoginClientForm = false;

  /**
   * @description Estado de visibilidad del formulario de inicio de sesión de empleado.
   * @type {boolean}
   */
  showLoginEmployeeForm = false;

  /**
   * @description Estado de visibilidad del formulario de creación de cuenta.
   * @type {boolean}
   */
  showCreateAccountForm = false;

   /**
   * @description Cambia la visibilidad del formulario de inicio de sesión de cliente y oculta los demás formularios.
   * @returns {void}
   */
  toggleLoginClientForm(): void {
    this.showLoginClientForm = !this.showLoginClientForm;
    this.showLoginEmployeeForm = false;
    this.showCreateAccountForm = false;
  }

  /**
   * @description Cambia la visibilidad del formulario de inicio de sesión de empleado y oculta los demás formularios.
   * @returns {void}
   */
  toggleLoginEmployeeForm(): void {
    this.showLoginEmployeeForm = !this.showLoginEmployeeForm;
    this.showLoginClientForm = false;
    this.showCreateAccountForm = false;
  }

   /**
   * @description Muestra el formulario de creación de cuenta y oculta los demás formularios.
   * @returns {void}
   */
  toggleCreateAccount(): void{
    this.showLoginClientForm = false;
    this.showCreateAccountForm = true;
    this.showLoginEmployeeForm = false;
  }

  /**
   * @description Muestra el formulario de inicio de sesión de cliente y oculta los demás formularios.
   * @returns {void}
   */
  toggleReturnLoginClientForm(): void{
    this.showLoginClientForm = true;
    this.showCreateAccountForm = false;
    this.showLoginEmployeeForm = false;
  }

  /**
   * @description Determina el título dinámico de la tarjeta de inicio de sesión dependiendo del formulario visible.
   * @returns {string} El título de la tarjeta, ya sea "Iniciar sesión" o "Creación de Cuenta".
   */
  dinamicTitleCardLogin(): string {
    return !this.showCreateAccountForm ? 'Iniciar sesión' : 'Creación de Cuenta';
  }
}
