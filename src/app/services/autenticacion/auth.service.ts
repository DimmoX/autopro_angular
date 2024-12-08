import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { LocalStorageService } from './../localStorage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this._isAuthenticated.asObservable();
  
  login() {
    // lógica para autenticar al usuario
    this._isAuthenticated.next(true);

    this.isAuthenticated$.subscribe(value => {
      console.log('Usuario autenticado', value);
    });
  }
  logout() {
    // lógica para cerrar sesión del usuario
    this._isAuthenticated.next(false);

    this.isAuthenticated$.subscribe(value => {
      console.log('Usuario desautenticado', value);
    });
  }
}
