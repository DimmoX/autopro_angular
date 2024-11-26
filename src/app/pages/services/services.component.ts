import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, NavComponent, HeaderComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  host: {ngSkipHydration: 'true'}
})
export class ServicesComponent {

}
