import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

/**
 * @description este arreglo contiene las rutas de la aplicación
 * - `''` redirige a 'home'
 * - `**` es una ruta comodín que redirige a home si no se encuentra la ruta solicitada.
 * @type {Routes}
 * @const routes
 */
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'dashboard/:role', component: DashboardComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
