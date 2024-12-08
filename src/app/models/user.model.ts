/**
 * @description estructura json para obtener registro de usuario del localstorage.
 * @interface User
 * @property {string} nombre - Nombre del usuario.
 * @property {string} apellido - Apellido del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} passwd - Contraseña del usuario.
 * @property {Array<string>} role - Rol del usuario.
 */
export interface User {
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    passwd: string,
    role: Array<string>
};
