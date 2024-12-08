import { Injectable } from '@angular/core';

/**
 * @usageNotes
 * Servicio que se proporciona a nivel raíz de la aplicación.
 * 
 * La anotación `@Injectable()` indica que esta clase puede ser inyectada como una dependencia
 * en otras partes de la aplicación. La propiedad `providedIn: 'root'` asegura que el servicio
 * estará disponible en toda la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * @description Clase que proporciona métodos para interactuar con el almacenamiento local del navegador.
 * @class LocalStorageService
 */
export class LocalStorageService {
  public isBrowser: boolean;

  /**
   * @description Constructor de la clase
   * @returns {void}
   * @constructor
   */
  constructor() {
    // Verifica si estás en un entorno de navegador
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * @description Almacena un item en localStorage
   * @param key  - contiene la key del item a almacenar
   * @type {string}
   * @param value - contiene el valor a almacenar
   * @type {any}
   */
  setItem(key: string, value: any): void {
    !this.isBrowser ? null : localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @description Obtiene un item de localStorage
   * @param key - contiene la key del item a obtener
   * @type {string}
   * @returns {T | null} - T es el tipo de dato que se espera obtener, null si no se encuentra el item
   */
  getItem<T>(key: string): T | null {
    if(!this.isBrowser){
      return null;
    }
    const item = localStorage.getItem(key);
    return item ? item as T : null;
  }

  /**
   * @description Elimina un item de localStorage
   * @param key contiene la key del item a eliminar
   * @type {string}
   * @returns {void}
   */
  removeItem(key: string): void {
    !this.isBrowser ? null : localStorage.removeItem(key);
  }

  /**
   * @description Elimina todos los datos almacenados en localStorage
   * @returns {void}
   */
  clear(): void {
    !this.isBrowser ? null : localStorage.clear();
  }
}
