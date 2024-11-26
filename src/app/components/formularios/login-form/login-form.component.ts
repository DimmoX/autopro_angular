import { LoginComponent } from './../../../pages/login/login.component';
import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecupPasswordComponent } from '../recup-password/recup-password.component';
// import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RecupPasswordComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  @Input() tipoLista: string = '';

  @ViewChild(RecupPasswordComponent) recupPasswordComponent!: RecupPasswordComponent;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const email: string = this.loginForm.get('email')?.value;
      console.log(email);
      console.log(this.tipoLista);
      const usersList: Array<any> = this.localStorageService.getItem(this.tipoLista) || [];
      console.log(usersList);
      const dataUser = usersList.find((user) => user.email === email);
      console.log(dataUser);
      if(!dataUser){
        alert('Cliente no encontrado');
        return;
      } 

      const userExists = Object.keys(dataUser).length > 0 ? true : false;
      console.log(userExists);
      const roles = dataUser.role;
      console.log(roles);

      this.localStorageService.setItem('login', true);

      this.router.navigate([`/dashboard/${roles[0]}`]);
      
    }
  }

  toggleModalRecupPassword() {
    if (this.recupPasswordComponent) {
      this.recupPasswordComponent.openModal();
      this.recupPasswordComponent.tipoAcceso = this.tipoLista;
    } else {
      console.error('No se pudo acceder al componente modal');
    }
  }

}
