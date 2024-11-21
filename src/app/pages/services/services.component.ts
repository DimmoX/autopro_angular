import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  host: {ngSkipHydration: 'true'}
})
export class ServicesComponent {

}
