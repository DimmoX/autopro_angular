/**
 * @description Interface que define el modelo de datos de Vehiculo
 * @interface Vehiculo
 * @property {number} id_cliente - Identificador del cliente.
 * @property {string} marca - Marca del vehiculo.
 * @property {string} modelo - Modelo del vehiculo.
 * @property {number} anio - Año del vehiculo.
 * @property {string} placa - Placa del vehiculo.
 * @property {string} color - Color del vehiculo.
 * 
 * @example
 * const vehiculo: Vehiculo = {
 *  id_cliente: 1,
 *  marca: 'Toyota',
 *  modelo: 'Corolla',
 *  anio: 2020,
 *  placa: 'ABC-123',
 *  color: 'Rojo'
 * };
 */
export interface Vehiculo {
    id_vehiculo: number;
    id_cliente: number;
    marca: string;
    modelo: string;
    anio: number | '';
    patente: string;
    color: string;
}
