import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-panel-entrenador',
  standalone: true,
  templateUrl: './panel-entrenador.page.html',
  imports: [CommonModule, IonicModule, RouterModule],
  styleUrls: ['./panel-entrenador.page.scss'],
})
export class PanelEntrenadorPage implements OnInit {
  nombre = localStorage.getItem('nombre') || '';
  correo = localStorage.getItem('correo') || '';
  idEntrenador = Number(localStorage.getItem('id_usuario'));
  cantidadClientes = 0;
  clientes: any[] = [];
  rutinasClientes: { [id_cliente: number]: any[] } = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    console.log('👤 ID entrenador desde localStorage:', this.idEntrenador);
    await this.obtenerCantidadClientes();
    await this.obtenerClientesAsociados();
  }
  async obtenerClientesAsociados() {
    try {
      const clientes = await this.apiService.get(`entrenador-clientes/clientes-asociados/${this.idEntrenador}`);
      console.log('📦 Clientes que llegan del backend:', clientes);
      this.clientes = clientes;

      for (const cliente of this.clientes) {
        const rutinas = await this.apiService.get(`rutinas/cliente/${cliente.id_cliente}`);
        this.rutinasClientes[cliente.id_cliente] = rutinas;
      }

      this.cdr.detectChanges();
    } catch (error) {
      console.error('❌ Error al obtener clientes asociados:', error);
    }
  }
  async obtenerCantidadClientes() {
    try {
      const response = await this.apiService.get(`entrenador-clientes/contar-clientes/${this.idEntrenador}`);
      console.log('🔢 Cantidad de clientes:', response.total);
      this.cantidadClientes = response.total;
    } catch (error) {
      console.error('❌ Error al obtener cantidad de clientes:', error);
    }
  }

  async cerrarSesion() {
    try {
      await this.authService.cerrarSesion();
      localStorage.clear(); // 🧹 LIMPIA todos los datos
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  }
  

  

  

  irACrearRutina(id_cliente: number) {
    this.router.navigate(['/crear-rutina', id_cliente]);
  }
}
