import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

/**
 * @description Servicio para obtener y manipular la información de los vehiculos.
 * @usage
  * // Importar servicio:
 * import { VehiculosService } from './vehiculos/vehiculos.service';
 * 
 * // Inyectar el servicio en el constructor:
 * constructor(private vehiculosService: VehiculosService) {}
 * 
 * // ** Obtener la lista de vehiculos **
 * getVhiculos(): Observable<any> {
 *  return this.http.get(this.jsonUrlVehiculos);
 * }
 * 
 * // ** Registrar un nuevo vehiculo **
 * const nuevoVehiculo = {
 *  marca: 'Toyota',
 *  modelo: 'Corolla',
 *  anio: 2020,
 *  placa: 'ABC-123',
 *  color: 'Rojo'
 * };
 * this.vehiculosService.registrarVehiculo(nuevoVehiculo).subscribe(response => {
 *  console.log('Vehiculo registrado:', response);
 * });
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  // Se definen el header para las peticiones HTTP
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  // Se define la URL del archivo JSON
  private jsonUrlVehiculos= 'https://jsons-autopro.s3.us-east-1.amazonaws.com/vehiculos.json';

  constructor(private http: HttpClient) { }

  /**
   * @description Método para obtener la lista de vehiculos desde el archivo JSON.
   * @returns {Observable<any>} - Lista de vehiculos
   */
  getVehiculos(): Observable<any> {
    return this.http.get(this.jsonUrlVehiculos);
  }

  /**
   * @description Método para registrar un nuevo vehiculo en el archivo JSON de vehiculos.
   * @param objetoVehiculo 
   * @returns 
   */
  registrarVehiculo(objetoVehiculo: any): Observable<any> {

    return this.getVehiculos().pipe(
      map((vehiculos: Array<object>) => {
        vehiculos.push(objetoVehiculo);
        return vehiculos;
      }),
      switchMap((vehiculos: Array<object>) => {
        return this.http.put(this.jsonUrlVehiculos, vehiculos, this.httpOptions);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
