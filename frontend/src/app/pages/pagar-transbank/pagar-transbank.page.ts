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
  monto: number = 0;
  tipoSeleccionado: string = ''; // 👈 Esto se mostrará en el botón final

  constructor(private apiService: ApiService) {}

  // ✅ Función para seleccionar membresía y asignar el tipo
  seleccionarMembresia(monto: number, tipo: string) {
    this.monto = monto;
    this.tipoSeleccionado = tipo;
  }

  // ✅ Lógica de redirección a Transbank
  async iniciarPago() {
    try {
      const respuesta = await this.apiService.post('pagos/crear-transaccion', {
        monto: this.monto
        // También podrías enviar el tipo aquí si el backend lo necesita más adelante
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
