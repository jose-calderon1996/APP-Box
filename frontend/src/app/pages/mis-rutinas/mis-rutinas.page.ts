import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // ✅ Importa Router
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  templateUrl: './mis-rutinas.page.html',
  styleUrls: ['./mis-rutinas.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class MisRutinasPage implements OnInit {
  idCliente = Number(localStorage.getItem('id_usuario'));
  rutinas: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router // ✅ INYECTA Router aquí
  ) {}

  async ngOnInit() {
    await this.obtenerRutinas();
  }

  async obtenerRutinas() {
    try {
      const response = await this.apiService.get(`rutinas/cliente/${this.idCliente}`);
      this.rutinas = response;
    } catch (error) {
      console.error('❌ Error al obtener rutinas:', error);
    }
  }

  verDetalleRutina(idRutina: number) {
    console.log('🔵 Navegando a detalle de rutina con ID:', idRutina); // ✅ Agregado para verificar el ID
    this.router.navigate(['/detalle-rutina', idRutina]); // ✅ Ahora se navega bien
  }
}
