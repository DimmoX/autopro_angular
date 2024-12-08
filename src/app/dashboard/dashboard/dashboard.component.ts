import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent} from '../admin/admin.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { TecnicoComponent } from '../tecnico/tecnico.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AdminComponent, ClienteComponent, TecnicoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  role: string = '';
  view: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Captura el parámetro 'role' de la URL
    this.role = this.route.snapshot.paramMap.get('role') || '';

    console.log(this.role);

    // Determina qué vista cargar según el rol
    this.view = this.role;
  }
}