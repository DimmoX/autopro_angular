import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoPro';

  configApp : Array<User> = 
  [
    {
      nombre: 'Diego',
      apellido: 'Muñoz',
      email: 'dmunozm@autopro.cl',
      passwd: 'AB123456',
      role: 'admin'
    }
  ];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // Guardar datos en localStorage
    this.localStorageService.setItem('users', this.configApp);
  }
}
