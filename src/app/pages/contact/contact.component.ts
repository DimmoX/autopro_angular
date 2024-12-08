import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ContactFormComponent } from '../../components/formularios/contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,  ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ContactComponent {

}
