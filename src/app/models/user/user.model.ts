/**
 * @description estructura json para obtener registro de usuario del localstorage.
 * @interface User
 * @property {string} nombre - Nombre del usuario.
 * @property {string} apellido - Apellido del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} passwd - Contraseña del usuario.
 * @property {Array<string>} role - Rol del usuario.
 * 
 * @example
 * const user: User = {
 *  nombre: 'Diego',
 *  apellido: 'Muñoz',
 *  email: 'dmunoz@autopro.cl',
 *  passwd: 'ABC123456',
 *  role: ['admin', 'tecnico']
 * };
 */
export interface User {
    id_cliente: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    passwd: string,
    role: Array<string>
};
