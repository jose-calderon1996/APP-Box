
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  templateUrl: './crear-rutina.page.html',
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
})
export class CrearRutinaPage implements OnInit {
  idCliente!: number;
  plantillas: any[] = [];
  diasSemana: string[] = [];
  plantillaSeleccionada: string = '';
  diaSeleccionado: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id_cliente'));
    this.obtenerPlantillas();
    this.obtenerDiasSemana();
  }

  obtenerPlantillas() {
    this.plantillas = [
      { nombre: 'Torso A' },
      { nombre: 'Pierna B' },
      { nombre: 'Full Body' },
      { nombre: 'Push Pull Legs' }
    ];
  }

  obtenerDiasSemana() {
    this.diasSemana = [
      'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
    ];
  }

  async asignarRutina() {
    if (!this.plantillaSeleccionada || !this.diaSeleccionado) {
      alert('Debes seleccionar una plantilla y un día de entrenamiento');
      return;
    }

    try {
      const response = await this.apiService.post('rutinas/crear-desde-plantilla', {
        id_cliente: this.idCliente,
        nombre_plantilla: this.plantillaSeleccionada,
        dia_entrenamiento: this.diaSeleccionado
      });
      console.log(' Rutina asignada:', response);
      alert('Rutina creada exitosamente');
      this.router.navigate(['/panel-entrenador']);
    } catch (error) {
      console.error(' Error al asignar rutina:', error);
      alert('Error al asignar rutina');
    }
  }
}
