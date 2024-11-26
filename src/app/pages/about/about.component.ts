import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  host: {ngSkipHydration: 'true'},
})
export class AboutComponent {

}
