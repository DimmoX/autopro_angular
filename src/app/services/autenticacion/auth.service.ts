import { Injectable } from '@angular/core';
import { LocalStorageService } from './../localStorage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private localStorageService = new LocalStorageService();

  isAuthenticated$ = this._isAuthenticated.asObservable();

  isAuthenticated(): boolean {
    // Aquí verifica si el usuario está autenticado
    return this.localStorageService.getItem('authToken') === 'true';
  }
  
  login() {
    // lógica para autenticar al usuario
    this.localStorageService.setItem('authToken', true);
    this._isAuthenticated.next(true);
  }
  logout() {
    // lógica para cerrar sesión del usuario

    this.localStorageService.removeItem('authToken');
    this._isAuthenticated.next(false);
  }
}
