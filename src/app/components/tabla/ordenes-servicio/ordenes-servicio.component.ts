import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { OrdenesService } from '../../../services/ordenes/ordenes.service';


@Component({
  selector: 'app-ordenes-servicio',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './ordenes-servicio.component.html',
  styleUrl: './ordenes-servicio.component.css',
  providers: [OrdenesService]
})
export class OrdenesServicioComponent implements OnInit{
  data: any[] = [];
  editIndex: number | null = null;
  editForm: FormGroup;

  constructor(private ordenesService: OrdenesService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      field1: [''],
      field2: [''],
      field3: [''],
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.ordenesService.getData().subscribe((response: any[]) => {
      this.data = response;
    });
  }

  onEdit(index: number): void {
    this.editIndex = index;
    const row = this.data[index];
    this.editForm.setValue({
      field1: row.field1,
      field2: row.field2,
      field3: row.field3,
    });
  }

  onSave(): void {
    if (this.editIndex !== null) {
      this.data[this.editIndex] = this.editForm.value;
      this.editIndex = null;
      this.editForm.reset();
    }
  }

  onDelete(index: number): void {
    this.data.splice(index, 1);
  }
}
