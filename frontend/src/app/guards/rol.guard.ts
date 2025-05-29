import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const tipoUsuario = localStorage.getItem('tipo_usuario');
    const tipoRequerido = route.data['tipo']; // existe solo en rutas protegidas

    //  Rutas protegidas: valida tipo
    if (tipoRequerido) {
      return tipoUsuario === tipoRequerido;
    }

    //  Redirección automática desde /redirect
    switch (tipoUsuario) {
      case 'cliente':
        this.router.navigate(['/panel-cliente']);
        break;
      case 'entrenador':
        this.router.navigate(['/panel-entrenador']);
        break;
      case 'dueño':
        this.router.navigate(['/panel-dueno']);
        break;
      default:
        this.router.navigate(['/login']);
    }

    return false; // evita que cargue la ruta dummy
  }
}
