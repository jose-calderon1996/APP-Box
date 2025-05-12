import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  estado: string = 'pendiente';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.queryParams.subscribe(async params => {
      const token = params['token_ws'];
      if (token) {
        try {
          const res = await this.apiService.post('pagos/confirmar-transaccion', { token_ws: token });
          this.estado = res.estado;
        } catch (error) {
          this.estado = 'error';
        }
      } else {
        this.estado = 'sin token';
      }
    });
  }
}
