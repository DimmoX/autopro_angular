import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { NavComponent } from '../../components/nav/nav.component';
import { ContactFormComponent } from '../../components/formularios/contact-form/contact-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavComponent, HeaderComponent, FooterComponent,  ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ContactComponent {

}
