import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { User } from '../../models/user/user.model';

/**
 * @description Servicio para obtener y manipular la información de los usuarios.
 * 
 * @usage
 * // Importar servicio:
 * import { UsuariosService } from './usuarios.service';
 * 
 * // Inyectar el servicio en el constructor:
 * constructor(private usuariosService: UsuariosService) {}
 * 
 * // ** Obtener la lista de clientes **
 * this.usuariosService.getClientes().subscribe(clientes => {
 *   console.log('Clientes:', clientes);
 * });
 * 
 * // ** Crear un nuevo cliente **
 * const nuevoCliente = {
 *   nombre: 'Juan',
 *   apellido: 'Pérez',
 *   email: 'juan.perez@example.com',
 *   telefono: '123456789',
 * };
 * this.usuariosService.crearClientes(nuevoCliente).subscribe(response => {
 *   console.log('Cliente creado:', response);
 * });
 * 
 * // ** Actualizar un cliente existente **
 * const nuevosDatosCliente = {
 *   email: 'nuevo.email@example.com'
 * };
 * this.usuariosService.actualizarRegistroCliente(1, nuevosDatosCliente).subscribe(response => {
 *   console.log('Cliente actualizado:', response);
 * });
 * 
 * // ** Obtener la lista de colaboradores **
 * this.usuariosService.getColaboradores().subscribe(colaboradores => {
 *   console.log('Colaboradores:', colaboradores);
 * });
 * 
 * // ** Crear un nuevo colaborador **
 * const nuevoColaborador = {
 *   nombre: 'Ana López',
 *   puesto: 'Mecánico'
 * };
 * this.usuariosService.crearColaboradores(nuevoColaborador).subscribe(response => {
 *   console.log('Colaborador creado:', response);
 * });
 */

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  private jsonUrlClientes = 'https://jsons-autopro.s3.us-east-1.amazonaws.com/clientes.json';
  private jsonUrlcolaboradores = 'https://jsons-autopro.s3.us-east-1.amazonaws.com/colaboradores.json';

  constructor(private http: HttpClient) {}

  /**
   * @description Método para obtener la lista de clientes desde el archivo JSON.
   * @returns {Observable<any>} - Lista de clientes
   */
  getClientes(): Observable<any> {
    return this.http.get(this.jsonUrlClientes);
  }

  /**
   * @description Método para obtener la lista de colaboradores desde el archivo JSON.
   * @returns {Observable<any>} - Lista de colaboradores
   */
  getColaboradores(): Observable<any> {
    return this.http.get(this.jsonUrlcolaboradores);
  }

  /**
   * @description Método para crear un nuevo cliente en el archivo JSON de clientes.
   * @param objetoCliente 
   * @returns 
   */
  crearClientes(objetoCliente: User): Observable<any> {
      
      return this.getClientes().pipe(
        map((clientes: Array<object>) => {
          console.log('Clientes obtenidos:', clientes);
          objetoCliente.id_cliente = clientes.length + 1; // Asignar el nuevo ID
          clientes.push(objetoCliente); // Agregar el nuevo cliente
          return clientes;
        }),
        switchMap((clientesActualizados: Array<object>) => { // switchMap se ejecuatrá al obtener resultados de la petición anterior
          return this.http.put(this.jsonUrlClientes, clientesActualizados, this.httpOptions).pipe(
            map(() => {
              console.log('Archivo JSON de Clientes sobrescrito con éxito');
              return { message: 'Clientes actualizados correctamente' };
            }),
            catchError(error => {
              console.error('Error al sobrescribir el archivo JSON de Clientes', error);
              return throwError({ message: 'Error al actualizar los clientes', error });
            })
          );
        }),
        catchError(error => {
          console.error('Error al obtener la lista de clientes', error);
          return throwError({ message: 'Error al obtener clientes', error });
        })
      );
    }

  /**
   * @description Método para crear un nuevo colaborador en el archivo JSON de colaboradores.
   * @param listaColaboradores
   * @returns {object} - Mensaje de éxito o error
   * @memberof UsuariosService
   */
  crearColaboradores(listaColaboradores:any) {
    return this.getColaboradores().pipe(
      map((colaboradores: Array<object>) => {
        console.log('Colaboradores obtenidos:', colaboradores);
        listaColaboradores.id = colaboradores.length + 1; // Asignar el nuevo ID
        colaboradores.push(listaColaboradores); // Agregar el nuevo colaborador
        return colaboradores;
      }),
      switchMap((colaboradoresActualizados: Array<object>) => { // switchMap se ejecuatrá al obtener resultados de la petición anterior
        return this.http.put(this.jsonUrlcolaboradores, colaboradoresActualizados, this.httpOptions).pipe(
          map(() => {
            console.log('Archivo JSON de Colaboradores sobrescrito con éxito');
            return { message: 'Colaboradores actualizados correctamente' };
          }),
          catchError(error => {
            console.error('Error al sobrescribir el archivo JSON de colaboradores', error);
            return throwError({ message: 'Error al actualizar los colaboradores', error });
          })
        );
      }),
      catchError(error => {
        console.error('Error al obtener la lista de colaboradores', error);
        return throwError({ message: 'Error al obtener colaboradores', error });
      })
    );
  }

  /**
   * @description Método para actualizar un registro de cliente en el archivo JSON de clientes.
   * @param id 
   * @param nuevosDatos
   */
  actualizarRegistroCliente(id: number, nuevosDatos: any) {
    return this.http.get<any[]>(this.jsonUrlClientes, this.httpOptions).pipe(
      // Actualizar el cliente
      map(listaClientes => {
        const clienteIndex = listaClientes.findIndex(cliente => cliente.id === id);

        if (clienteIndex === -1) {
          throw new Error('Cliente no encontrado');
        }
        listaClientes[clienteIndex].nombre = nuevosDatos.nombre;
        listaClientes[clienteIndex].apellido = nuevosDatos.apellido;
        listaClientes[clienteIndex].email = nuevosDatos.email;
        listaClientes[clienteIndex].telefono = nuevosDatos.telefono;
        // listaClientes[clienteIndex] = { ...listaClientes[clienteIndex], ...nuevosDatos };
        return listaClientes;
      }),
      // Subir la lista actualizada al bucket
      switchMap(listaActualizada =>
        this.http.put(this.jsonUrlClientes, JSON.stringify(listaActualizada), this.httpOptions)
      ),
      catchError(error => {
        console.error('Error en el proceso:', error.message || error);
        return error;
      })
    );
  }

  eliminarCliente(id: number) {
    return this.http.get<any[]>(this.jsonUrlClientes, this.httpOptions).pipe(
      // Eliminar el cliente
      map(listaClientes => {
        const clienteIndex = listaClientes.findIndex(cliente => cliente.id === id);
        if (clienteIndex === -1) {
          throw new Error('Cliente no encontrado');
        }
        listaClientes.splice(clienteIndex, 1);
        return listaClientes;
      }),
      // Subir la lista actualizada al bucket
      switchMap(listaActualizada =>
        this.http.put(this.jsonUrlClientes, JSON.stringify(listaActualizada), this.httpOptions)
      ),
      catchError(error => {
        console.error('Error en el proceso:', error.message || error);
        return error;
      })
    );
  }

  recuperarContrasena(email: string, tipoAcceso: string) {
    const jsonUrl = tipoAcceso === 'clientes' ? this.jsonUrlClientes : this.jsonUrlcolaboradores;
    return this.http.get<any[]>(jsonUrl).pipe(
      map(listaClientes => {
        const usuario = listaClientes.find(cliente => cliente.email === email);
        console.log('Usuario: ', usuario);
        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }
        return usuario.passwd;
      }),
      catchError(error => {
        console.error('Error al recuperar la contraseña:', error.message || error);
        return error;
      })
    );
  }
}