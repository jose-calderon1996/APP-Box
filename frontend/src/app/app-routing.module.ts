import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RolGuard } from './guards/rol.guard';
import { PagarTransbankPage } from './pages/pagar-transbank/pagar-transbank.page';
import { PagoConfirmadoPage } from './pages/pago-confirmado/pago-confirmado.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full'
  },
  {
    path: 'bienvenida',
    loadComponent: () => import('./pages/bienvenida/bienvenida.page').then(m => m.BienvenidaPage)
  },
  {
    path: 'registro-dueno',
    loadComponent: () => import('./pages/registro-dueno/registro-dueno.page').then(m => m.RegistroDuenoPage)
  },
  {
    path: 'registro-entrenador',
    loadComponent: () => import('./pages/registro-entrenador/registro-entrenador.page').then(m => m.RegistroEntrenadorPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'panel-entrenador',
    loadComponent: () => import('./pages/panel-entrenador/panel-entrenador.page').then(m => m.PanelEntrenadorPage),
    canActivate: [RolGuard],
    data: { tipo: 'entrenador' }
  },
  {
    path: 'crear-cliente',
    loadComponent: () => import('./pages/crear-cliente/crear-cliente.page').then(m => m.CrearClientePage),
    canActivate: [RolGuard],
    data: { tipo: 'entrenador' }
  },
  {
    path: 'crear-rutina/:id_cliente',
    loadComponent: () => import('./pages/crear-rutina/crear-rutina.page').then(m => m.CrearRutinaPage),
    canActivate: [RolGuard],
    data: { tipo: 'entrenador' }
  },
  {
    path: 'panel-cliente',
    loadComponent: () => import('./pages/panel-cliente/panel-cliente.page').then(m => m.PanelClientePage),
    canActivate: [RolGuard],
    data: { tipo: 'cliente' }
  },
  {
    path: 'mis-rutinas',
    loadComponent: () => import('./pages/mis-rutinas/mis-rutinas.page').then(m => m.MisRutinasPage),
    canActivate: [RolGuard],
    data: { tipo: 'cliente' }
  },
  {
    path: 'detalle-rutina/:id',
    loadComponent: () => import('./pages/detalle-rutina/detalle-rutina.page').then(m => m.DetalleRutinaPage),
    canActivate: [RolGuard],
    data: { tipo: 'cliente' }
  },
  {
    path: 'registrar-progreso',
    loadComponent: () => import('./pages/registrar-progreso/registrar-progreso.page').then(m => m.RegistrarProgresoPage),
    canActivate: [RolGuard],
    data: { tipo: 'cliente' }
  },
  {
    path: 'historial-progreso',
    loadComponent: () => import('./pages/historial-progreso/historial-progreso.page').then(m => m.HistorialProgresoPage),
    canActivate: [RolGuard],
    data: { tipo: 'cliente' }
  },
  
  {
    path: 'panel-dueno',
    loadComponent: () => import('./pages/panel-dueno/panel-dueno.page').then(m => m.PanelDuenoPage),
    canActivate: [RolGuard],
    data: { tipo: 'dueño' }
  },
  
  {
    path: 'calculo-imc',
    loadComponent: () => import('./pages/calculo-imc/calculo-imc.page').then(m => m.CalculoImcPage)
  },
  {
    path: 'pagar-transbank',
    component: PagarTransbankPage, 
  },
  {
    path: 'pago-confirmado',
    component: PagoConfirmadoPage,
  },
  
  
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// este es