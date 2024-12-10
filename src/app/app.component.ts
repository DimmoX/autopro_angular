import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocalStorageService } from './services/localStorage/local-storage.service';

/**
 * @description Componente principal de la aplicación
 * @class AppComponent 
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'AutoPro';

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.setItem('authToken', false);
  }

}
