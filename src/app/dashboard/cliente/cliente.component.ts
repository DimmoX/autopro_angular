import { UsuariosService } from './../../services/usuarios/usuarios.service';
import { map, of, switchMap } from 'rxjs';
import { HeaderComponent } from './../../components/header/header.component';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { Vehiculo } from '../../models/vehiculo/vehiculo.model';
import { VehiculosService } from '../../services/vehiculos/vehiculos.service';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { PerfilComponent } from '../../components/perfil/perfil.component';




@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule, FormsModule, PerfilComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  nombreCliente: string = '';
  id_cliente: number = 0;
  id_vehiculo: number = 0;
  vehiculo: Vehiculo | null = null;
  vehiculoForm!: FormGroup;
  servicioSeleccionado: string = 'none';
  fechaServicio: string = '';
  horaServicio: string = '';
  anioActual: number = new Date().getFullYear();
  
  estadoServicio: string | null = null;
  servicioForm!: FormGroup;
  fechaMinima: string;
  fechaMaxima: string;
  editar: boolean = false; // Variable para controlar el estado de edición
  submitted = false;

  constructor(private localStorageService: LocalStorageService, private vehiculosService: VehiculosService, private fb: FormBuilder, private usuariosService: UsuariosService) {
    let userName = this.localStorageService.getItem('nombre');
    this.nombreCliente = typeof userName === 'string' ? userName.replace(/"/g, '') : '';

    let id_cliente = this.localStorageService.getItem('id_usuario');
    console.log("id cliente: " + id_cliente + " - " + typeof id_cliente);
    this.id_cliente = typeof id_cliente === 'string' ? parseInt(id_cliente.replace(/"/g, '')) : 0;

    if(this.id_cliente !== 0){
      this.obtenerVehiculoCliente(this.id_cliente);
    }

    // Inicializar los datos para editar perfil


    // Manejo de la fecha en agendar cita
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const diaActual = fechaActual.getDate().toString().padStart(2, '0');

    this.fechaMinima = `${anioActual}-${mesActual}-${diaActual}`;

    const anioMaximo = anioActual + 2;
    this.fechaMaxima = `${anioMaximo}-${mesActual}-${diaActual}`;
  }  
  
  ngOnInit(): void {
    this.vehiculoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1960), Validators.max(this.anioActual)]],
      patente: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{4,6}$')]],
      color: ['', Validators.required],
    });

    this.servicioForm = this.fb.group({
      service: ['none', Validators.required],
      date: ['',[
        Validators.required,
        this.validarFechaMinimaMaxima(this.fechaMinima, this.fechaMaxima)
      ]],
      time: ['', [Validators.required, this.validarHora('08:30', '17:30')]],
    });

    // Monitorear cambios en el control de fecha
    this.servicioForm.get('date')?.valueChanges.subscribe((value) => {
      console.log('Fecha ingresada:', value); // Para depuración
    });
    


  }

  /**
   * @description Función para obtener el control de fecha del formulario de Agendar
   */
  get fechaControl() {
    return this.servicioForm.get('date');
  }

  get vehiculoControl() {
    return this.vehiculoForm.get('marca');
  }

  obtenerVehiculoCliente(id_cliente: number) {
    this.vehiculosService.getVehiculos().pipe(
      map((vehiculos: Vehiculo[]) => vehiculos),
      switchMap((vehiculos: Vehiculo[]) => {
        let vehiculo = vehiculos.find((vehiculo: Vehiculo) => vehiculo.id_cliente === id_cliente);
        this.vehiculo = vehiculo ? vehiculo : null;
        return vehiculo ? [vehiculo] : [];
      })
    ).subscribe();
  }

  // Función para alternar entre editar y agregar vehículo
  editarInfoVehiculo() {
    this.editar = !this.editar;
  }

  agregarVehiculo() {
    this.vehiculosService.getVehiculos().pipe(
      map((vehiculos: Vehiculo[]) => {
        return vehiculos.length + 1;
      }),
      switchMap((id: number) => {
        console.log('id - getVehiculos():', id);
        this.id_vehiculo = id; // Aquí actualizamos el valor de id_vehiculo
        this.localStorageService.setItem('id_vehiculo', id); // Almacenamos el id_vehiculo correctamente
        return of(null);
      })
    ).subscribe(() => { 
      console.log("this.id_vehiculo: ", this.id_vehiculo);
      
      // Inicia el objeto vehiculo con los valores de id_vehiculo
      this.vehiculo = {
        id_vehiculo: this.id_vehiculo,
        id_cliente: this.id_cliente,
        marca: '',
        modelo: '',
        anio: '',
        patente: '',
        color: ''
      };
      this.editar = true;  // Activar modo de edición para agregar vehículo
    });
  }

  /**
   * @description Función para validar la fecha mínima y máxima al seleccionar fecha en formulario de Agendar Cita
   * @param min 
   * @param max 
   * @returns {boolean | null}
   */
  validarFechaMinimaMaxima(min: string, max: string) {
    return (control: any) => {
      const fechaSeleccionada = new Date(control.value).getTime();
      const fechaMinima = new Date(min).getTime();
      const fechaMaxima = new Date(max).getTime();

      if (fechaSeleccionada < fechaMinima) {
        return { fechaMinimaInvalida: true };
      }

      if (fechaSeleccionada > fechaMaxima) {
        return { fechaMaximaInvalida: true };
      }

      return null;
    };
  }

  /**
   * @description Función para validar la hora seleccionada en el formulario de Agendar Cita
   * @param min 
   * @param max 
   * @returns 
   */
  validarHora(min: string, max: string) {
    return (control: any) => {
      if (!control.value) {
        return { required: true }; // Si no hay valor, el campo es obligatorio
      }
  
      const horaSeleccionada = control.value; // El valor es un string en formato HH:mm
      if (horaSeleccionada < min || horaSeleccionada > max) {
        return { horaFueraDeRango: true };
      }
  
      return null; // Sin errores
    };
  }
  
  // Función para cerrar el formulario sin guardar los cambios
  cerrarFormulario() {

    if (!this.vehiculoForm.dirty || !this.vehiculoForm.valid) {
      if (this.vehiculo && Object.values(this.vehiculo).includes('')) {
        this.vehiculo = null;
      }
    }

    this.editar = false; // Deja el formulario en modo no editable
  }

  grabarCamposVehiculo() {
    if (this.vehiculoForm.valid) {
      const formValues = this.vehiculoForm.value;
  
      console.log('Vehiculo: \n' + JSON.stringify(formValues));
  
      // Ahora obtenemos correctamente el id_vehiculo y id_cliente desde localStorage
      const id_vehiculo = Number(this.localStorageService.getItem('id_vehiculo'));  // Asegúrate de que se obtiene correctamente
      console.log('id_vehiculo desde localStorage:', id_vehiculo);
  
      const id_cliente = Number(this.localStorageService.getItem('id_cliente'));  // También recuperamos id_cliente
      console.log('id_cliente desde localStorage:', id_cliente);
  
      if (id_vehiculo && id_cliente) {
        this.vehiculo = {
          id_vehiculo: id_vehiculo,
          id_cliente: id_cliente,
          marca: formValues.marca,
          modelo: formValues.modelo,
          anio: formValues.anio,
          patente: formValues.patente,
          color: formValues.color
        };
  
        // Registrar el vehículo en el servicio
        this.vehiculosService.registrarVehiculo(this.vehiculo).subscribe(response => {
          console.log('Vehiculo registrado:', response);
          console.log('Vehiculo:', this.vehiculo);
          this.editar = false; // Deja el formulario en modo no editable
        });
      } else {
        console.log('Error: ID de vehículo o cliente no encontrado en localStorage');
      }
    }
  }
  
  agendarServicio() {
    let servicio = {
      id_cliente: this.id_cliente,
      servicio: this.servicioSeleccionado,
      fecha: this.fechaServicio,
      hora: this.horaServicio
    }
    if (this.servicioForm.invalid) {
      console.log('Errores en el formulario:', this.servicioForm.errors);
      console.log('Estado de los controles:', this.servicioForm.controls);
      return;
    }
  
    console.log('Formulario válido:', this.servicioForm.value);
  }
}


