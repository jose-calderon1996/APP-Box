import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms'; // ✅

@Component({
  selector: 'app-detalle-rutina',
  standalone: true,
  templateUrl: './detalle-rutina.page.html',
  styleUrls: ['./detalle-rutina.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, FormsModule], 
})
export class DetalleRutinaPage implements OnInit {
  idRutina!: number;
  nombreRutina = '';
  diaEntrenamiento = '';
  ejercicios: any[] = [];
  idCliente = Number(localStorage.getItem('id_usuario'));
  comentario: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idRutina = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerDetalleRutina();
  }

  async obtenerDetalleRutina() {
    try {
      const response = await this.apiService.get(`rutinas/detalle/${this.idRutina}`);
      this.nombreRutina = response.nombre_rutina;
      this.diaEntrenamiento = response.dia_entrenamiento;
      this.ejercicios = response.ejercicios;
    } catch (error) {
      console.error('❌ Error al obtener detalle de rutina:', error);
    }
  }

  async marcarRutinaRealizada() {
    try {
      // ✅ Primero registramos que completó la rutina
      await this.apiService.post('rutinas/rutina-realizada', {
        id_cliente: this.idCliente,
        id_rutina: this.idRutina
      });

      // ✅ Segundo, si escribió un comentario, lo guardamos también
      if (this.comentario.trim() !== '') {
        await this.apiService.post('rutinas/comentarios/agregar', {
          id_rutina: this.idRutina,
          id_cliente: this.idCliente,
          comentario: this.comentario.trim()
        });
      }

      alert(' Rutina marcada como realizada');
      this.router.navigate(['/panel-cliente']); // vuelve al panel cliente o donde quieras
    } catch (error) {
      console.error(' Error registrando rutina realizada o comentario:', error);
      alert('Error al registrar rutina realizada o comentario');
    }
  }

  //  FUNCIÓN CORREGIDA para guardar cada ejercicio uno a uno
async guardarRegistroEjercicios() {
  console.log(' Botón presionado, preparando envíos uno por uno...');

  for (const ejercicio of this.ejercicios) {
    const registro = {
      id_cliente: this.idCliente,
      nombre_ejercicio: ejercicio.nombre_ejercicio,
      peso: ejercicio.peso || 0,
      series_realizadas: ejercicio.series_realizadas || 0,
      repeticiones_realizadas: ejercicio.repeticiones_realizadas || 0,
      fecha: ejercicio.fecha || new Date().toISOString().slice(0, 10)
    };

    try {
      console.log('📤 Enviando registro:', registro);
      await this.apiService.post('rutinas/registro-ejercicios', registro);
      console.log(' Registro guardado correctamente:', registro);
    } catch (error) {
      console.error(' Error guardando registro:', error);
    }
  }

  alert(' Todos los ejercicios registrados correctamente');
}

  
  
  
}
