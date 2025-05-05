import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuario = localStorage.getItem('usuario');
    const tipoUsuario = usuario ? JSON.parse(usuario).tipo_usuario : null;
    const tipoRequerido = route.data['tipo']; // Para rutas protegidas con tipo

    // 🔐 Si se requiere un tipo específico
    if (tipoRequerido) {
      return tipoUsuario === tipoRequerido;
    }

    // 🔁 Si está en /redirect, lo enviamos según su rol
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

    return false; // Impide cargar la ruta /redirect
  }
}
