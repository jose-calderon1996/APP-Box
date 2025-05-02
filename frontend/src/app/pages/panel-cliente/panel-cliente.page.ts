import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms'; // ✅ Importa esto

@Component({
  selector: 'app-panel-cliente',
  standalone: true,
  templateUrl: './panel-cliente.page.html',
  styleUrls: ['./panel-cliente.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, FormsModule] // ✅ Agrégalo aquí también
})
export class PanelClientePage implements OnInit {

  nombre = localStorage.getItem('nombre') || '';
  correo = localStorage.getItem('correo') || '';
  idCliente = Number(localStorage.getItem('id_usuario'));

  mostrarComentario: boolean = false;
  comentario: string = '';
  puntuacion: number = 0;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {}

  irMisRutinas() {
    this.router.navigate(['/mis-rutinas']);
  }

  enviarComentario() {
    if (!this.comentario || this.puntuacion === 0) {
      alert('Debes escribir un comentario y seleccionar una puntuación.');
      return;
    }

    const data = {
      id_usuario: this.idCliente,
      comentario: this.comentario,
      puntuacion: this.puntuacion
    };

    this.apiService.post('comentarios-box', data).then(() => {
      this.comentario = '';
      this.puntuacion = 0;
      this.mostrarComentario = false;
      alert('¡Gracias por tu comentario!');
    }).catch(err => {
      console.error('Error al enviar comentario:', err);
      alert('Ocurrió un error al enviar tu comentario.');
    });
  }
}
