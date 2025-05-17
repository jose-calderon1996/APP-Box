import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-panel-dueno',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './panel-dueno.page.html',
  styleUrls: ['./panel-dueno.page.scss'],
})
export class PanelDuenoPage implements OnInit {

  totalEntrenadores = 0;
  totalClientes = 0;
  comentarios: any[] = [];
  mostrarTodos: boolean = false;


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.obtenerResumen();
    this.obtenerComentarios();
  }

  obtenerResumen() {
    this.apiService.get('resumen-dueno').then(res => {
      this.totalEntrenadores = res.totalEntrenadores;
      this.totalClientes = res.totalClientes;
    }).catch(error => {
      console.error('Error al obtener resumen:', error);
    });
  }

  obtenerComentarios() {
    this.apiService.get('comentarios-box').then(res => {
      this.comentarios = res;
    }).catch(error => {
      console.error('Error al obtener comentarios:', error);
    });
  }

  

}
