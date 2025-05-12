import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pagar-transbank',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './pagar-transbank.page.html',
  styleUrls: ['./pagar-transbank.page.scss'],
})
export class PagarTransbankPage {
  monto: number = 0; // Solo guarda el valor a pagar

  constructor(private apiService: ApiService) {}

  // Elegir una membresía (solo define el monto)
  seleccionarMembresia(monto: number) {
    this.monto = monto;
  }

  // Enviar la solicitud de pago
  async iniciarPago() {
    try {
      const respuesta = await this.apiService.post('pagos/crear-transaccion', {
        monto: this.monto
      });

      const url = respuesta.url;
      const token = respuesta.token;

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'token_ws';
      input.value = token;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('❌ Error al iniciar el pago:', error);
    }
  }
}
