import { CommonModule } from '@angular/common';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  statusLogin: boolean = false;

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.statusLogin = this.localStorageService.getItem('login') || false;
  }

  logout() {
    this.localStorageService.setItem('login', false);
    this.router.navigate([`/home`]);
  }
}
