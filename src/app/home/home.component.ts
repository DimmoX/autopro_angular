import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { NavComponent } from "../components/nav/nav.component";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, NavComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {ngSkipHydration: 'true'},
})
export class HomeComponent {

}
