/**
 * @description estructura json para crear registro de cliente en el localstorage.
 * @interface Cliente
 * @property {string} nombre - Nombre del cliente.
 * @property {string} apellido - Apellido del cliente.
 * @property {string} email - Correo electrónico del cliente.
 * @property {string} passwd - Contraseña del cliente.
 * @property {Array<string>} role - Rol del cliente.
 */
export interface Cliente {
    nombre: string,
    apellido: string,
    email: string,
    passwd: string,
    role: Array<string>
};

/**
 * @description estructura json para crear registro de colaborador en el localstorage.
 * @interface Colaborador
 * @property {string} nombre - Nombre del colaborador.
 * @property {string} apellido - Apellido del colaborador.
 * @property {string} email - Correo electrónico del colaborador.
 * @property {string} passwd - Contraseña del colaborador.
 * @property {Array<string>} role - Rol del colaborador.
 */
export interface Colaborador{
    nombre: string,
    apellido: string,
    email: string,
    passwd: string,
    role: Array<string>
};

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
    nombre: string,
    apellido: string,
    email: string,
    passwd: string,
    role: Array<string>
};
