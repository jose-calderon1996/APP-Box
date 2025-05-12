import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Usamos Router para redirigir
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pago-confirmado',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './pago-confirmado.page.html',
  styleUrls: ['./pago-confirmado.page.scss'],
})
export class PagoConfirmadoPage {
  estado: string = 'pendiente'; // Estado del pago: 'pendiente', 'aprobado', 'rechazado', etc.

  constructor(
    private route: ActivatedRoute, // Para leer el token desde la URL
    private router: Router,        // Para redirigir al usuario después
    private apiService: ApiService // Para comunicar con el backend
  ) {
    // Escuchar los parámetros de la URL (Transbank redirige con ?token_ws=...)
    this.route.queryParams.subscribe(async params => {
      const token = params['token_ws']; // Obtenemos el token_ws

      if (token) {
        try {
          // Confirmamos el pago con el backend
          const res = await this.apiService.post('pagos/confirmar-transaccion', {
            token_ws: token
          });

          this.estado = res.estado; // 'aprobado' o 'rechazado'

          // Si fue exitoso, redirigimos a home después de 5 segundos
          if (this.estado === 'aprobado') {
            setTimeout(() => {
              this.router.navigate(['/bienvenida']);
            }, 5000);
          }

        } catch (error) {
          this.estado = 'error'; // Error al conectar con el backend
        }
      } else {
        this.estado = 'sin token'; // No llegó token_ws en la URL
      }
    });
  }
}
