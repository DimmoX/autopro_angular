import { HeaderComponent } from './../../components/header/header.component';
import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  nombreCliente: string = '';
  marca: string = 'Marca';
  modelo: string = 'Modelo';
  anio: string = 'Año';
  patente: string = 'Patente';

  constructor(private localStorageService: LocalStorageService) {
    let nombre = this.localStorageService.getItem('nombre');
    this.nombreCliente = typeof nombre === 'string' ? nombre.replace(/"/g, '') : '';  
  }

  eliminarFila(event: Event){
    console.log("fila eliminada");
  }
}
