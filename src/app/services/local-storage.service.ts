import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public isBrowser: boolean;

  constructor() {
    // Verifica si estás en un entorno de navegador
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    console.log('isBrowser:', this.isBrowser);
  }

  // Guardar datos en localStorage
  setItem(key: string, value: any): void {
    !this.isBrowser ? null : localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener datos de localStorage
  getItem<T>(key: string): T | null {
    if(!this.isBrowser){
      return null;
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  // Eliminar un dato específico
  removeItem(key: string): void {
    !this.isBrowser ? null : localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clear(): void {
    !this.isBrowser ? null : localStorage.clear();
  }
}
