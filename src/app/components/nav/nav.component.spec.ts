import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { RouterTestingModule } from '@angular/router/testing';  // Necesario para simular el enrutamiento
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { Router } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock para LocalStorageService
    localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem']);
    // Mock para Router
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Configuración de la prueba
    await TestBed.configureTestingModule({
      imports: [
        NavComponent,  // Importamos el componente Nav directamente
        RouterTestingModule.withRoutes([])  // Proporcionamos rutas mínimas
      ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar "Iniciar Sesión" si statusLogin es false', () => {
    localStorageServiceMock.getItem.and.returnValue(false);  // Simulando que el usuario no está logueado
    fixture.detectChanges();  // Detecta los cambios después de la actualización de statusLogin

    const loginButton = fixture.nativeElement.querySelector('a[routerLink="/login"]');
    expect(loginButton).toBeTruthy();
    expect(loginButton.textContent).toContain('Iniciar Sesión');
  });

  it('debería mostrar "Cerrar Sesión" si statusLogin es true', () => {
    localStorageServiceMock.getItem.and.returnValue(true);  // Simulando que el usuario está logueado
    fixture.detectChanges();  // Detecta los cambios después de la actualización de statusLogin

    const logoutButton = fixture.nativeElement.querySelector('a[routerLink="/home"]');
    expect(logoutButton).toBeTruthy();
    expect(logoutButton.textContent).toContain('Cerrar Sesión');
  });

  it('debería llamar a logout() y navegar a /home cuando se haga clic en "Cerrar Sesión"', () => {
    localStorageServiceMock.getItem.and.returnValue(true);  // Simulando que el usuario está logueado
    fixture.detectChanges();  // Detecta los cambios después de la actualización de statusLogin

    const logoutButton = fixture.nativeElement.querySelector('a[routerLink="/home"]');
    logoutButton.click();  // Simula el clic en "Cerrar sesión"
    
    expect(localStorageServiceMock.setItem).toHaveBeenCalledWith('login', false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('debería alternar el estado de statusLogin correctamente al crear el componente', () => {
    localStorageServiceMock.getItem.and.returnValue(true);  // Simulando que el usuario está logueado
    fixture.detectChanges();  // Detecta los cambios después de la actualización de statusLogin

    expect(component.statusLogin).toBeTrue();

    localStorageServiceMock.getItem.and.returnValue(false);  // Simulando que el usuario no está logueado
    fixture.detectChanges();  // Detecta los cambios después de la actualización de statusLogin

    expect(component.statusLogin).toBeFalse();
  });
});
