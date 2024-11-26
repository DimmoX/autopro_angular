import { Component } from '@angular/core';
import { NavComponent } from "../../components/nav/nav.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavComponent, HeaderComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  eliminarFila(button: any) {
    console.log(button);
}
}
