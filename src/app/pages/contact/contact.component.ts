import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ContactComponent {

}
