import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/autenticacion/auth.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent{

  statusLogin: any | undefined;
  userName: string = '';
  userRole: string = '';

  constructor(private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) {

    this.authService.isAuthenticated$.subscribe((value) => {
      this.statusLogin = value;

      if(value === true) {
        let nombreUsuario = this.localStorageService.getItem('nombre');
        let rolUsuario = this.localStorageService.getItem('role');
       
        this.userName = typeof nombreUsuario === 'string' ? nombreUsuario.replace(/"/g, '') : 'Usuario';
        this.userRole = typeof rolUsuario === 'string' ? JSON.parse(rolUsuario)[0] : 'role';

        console.log("nombre usuario", this.userName);
        console.log("rol usuario", this.userRole);
      }

    });

  }

  logout() {
    this.authService.logout();
    this.statusLogin = false;
    this.router.navigate([`/home`]);
  }
}
