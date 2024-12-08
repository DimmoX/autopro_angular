import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavComponent } from '../../components/nav/nav.component';
import { LoginFormComponent } from '../../components/formularios/login-form/login-form.component';
import { RegistroClienteComponent } from '../../components/formularios/registro-cliente/registro-cliente.component';
import { User } from '../../models/user.model';
import { provideRouter } from '@angular/router';  // Importa provideRouter



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoginComponent, HeaderComponent, FooterComponent, NavComponent, LoginFormComponent, RegistroClienteComponent ],
      providers: [
        provideRouter([])  // Proporciona el enrutador con una lista vacía de rutas
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe alternar la visibilidad del formulario de cliente de inicio de sesión', () => {
    component.toggleLoginClientForm();
    expect(component.showLoginClientForm).toBeTrue();
    expect(component.showLoginEmployeeForm).toBeFalse();
    expect(component.showCreateAccountForm).toBeFalse();

    component.toggleLoginClientForm();
    expect(component.showLoginClientForm).toBeFalse();
  });

  it('debe alternar la visibilidad del formulario de inicio de sesión del empleado', () => {
    component.toggleLoginEmployeeForm();
    expect(component.showLoginEmployeeForm).toBeTrue();
    expect(component.showLoginClientForm).toBeFalse();
    expect(component.showCreateAccountForm).toBeFalse();

    component.toggleLoginEmployeeForm();
    expect(component.showLoginEmployeeForm).toBeFalse();
  });

  it('debería cambiar la visibilidad del formulario de creación de cuenta', () => {
    component.toggleCreateAccount();
    expect(component.showCreateAccountForm).toBeTrue();
    expect(component.showLoginClientForm).toBeFalse();
    expect(component.showLoginEmployeeForm).toBeFalse();
  });

  it('debe devolver el título correcto en función de la visibilidad del formulario', () => {
    expect(component.dinamicTitleCardLogin()).toBe('Iniciar sesión');

    component.toggleCreateAccount();
    expect(component.dinamicTitleCardLogin()).toBe('Creación de Cuenta');
  });

  it('debería crear un objeto que cumpla con el tipo User', () => {
    const user: User = {
      nombre: 'Diego',
      apellido: 'Muñoz',
      email: 'dmunozm@autopro.cl',
      passwd: 'AB123456',
      role: ['admin', 'mecanico']
    };
    expect(user).toBeTruthy();
    expect(user.email).toBe('dmunozm@autopro.cl');
    expect(user.passwd).toBe('AB123456');
  });
});
