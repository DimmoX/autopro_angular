import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { Colaborador, Cliente } from './models/user.model';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

/**
 * @description Componente principal de la aplicación
 * @class AppComponent 
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoPro';

  /**
   * @description Configuración de usuarios colaboradores que se almacerán en localStorage
   * @type {Array<Colaborador>}
   */
  configColaborador : Array<Colaborador> = 
  [
    {
      nombre: 'Diego',
      apellido: 'Muñoz',
      email: 'dmunozm@autopro.cl',
      passwd: 'AB123456',
      role: ['admin', 'mecanico']
    },
    {
      nombre: 'Cristian',
      apellido: 'Cepeda',
      email: 'ccepeda@autopro.cl',
      passwd: 'EF123456',
      role: ['admin', 'mecanico']
    }
  ];

  /**
   * @description Configuración de usuarios clientes que se almacenarán en localStorage
   * @type {Array<Cliente>}
   */
  configCliente: Array<Cliente> =
  [
    {
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'jperez@test.cl',
      passwd: 'CD123456',
      role: ['cliente']
    },
    {
      nombre: 'Andres',
      apellido: 'Gonzales',
      email: 'agonzales@test.cl',
      passwd: 'ZX678901',
      role: ['cliente']
    }
  ];

  /**
   * @description Constructor del componente
   * @param localStorageService Servicio para almacenar datos en localStorage
   */
  constructor(private localStorageService: LocalStorageService) {}

  /**
   * @description Método que se ejecuta al iniciar el componente y guarda los datos de los usuarios en localStorage
   * @returns {void}
   */
  ngOnInit(): void {
    // Guardar datos en localStorage
    this.localStorageService.setItem('clientes', this.configCliente);
    this.localStorageService.setItem('colaboradores', this.configColaborador);
  }
}
