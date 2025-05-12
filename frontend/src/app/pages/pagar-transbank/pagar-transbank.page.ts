import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pagar-transbank',
  standalone: true, // 👈 Hacemos que sea standalone
  imports: [CommonModule, FormsModule, IonicModule, RouterModule], // 👈 Importamos módulos necesarios
  templateUrl: './pagar-transbank.page.html',
  styleUrls: ['./pagar-transbank.page.scss'],
})
export class PagarTransbankPage {
  monto: number = 10000; // Monto inicial por defecto

  constructor(private apiService: ApiService) {}

  // Función que inicia el flujo de pago
  async iniciarPago() {
    try {
      // Hacemos POST al backend para crear la transacción
      const respuesta = await this.apiService.post('pagos/crear-transaccion', {
        monto: this.monto,
      });

      const url = respuesta.url;
      const token = respuesta.token;

      // Creamos formulario oculto y lo enviamos automáticamente
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'token_ws';
      input.value = token;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit(); // Redirige a la página oficial de Transbank (sandbox)
    } catch (error) {
      console.error('❌ Error al iniciar el pago:', error);
    }
  }
}
