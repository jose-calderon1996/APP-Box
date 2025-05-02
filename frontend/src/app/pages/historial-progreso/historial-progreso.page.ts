// 🔥 PRIMERO: Registramos los componentes de Chart.js
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-historial-progreso',
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule, BaseChartDirective],
  templateUrl: './historial-progreso.page.html',
  styleUrls: ['./historial-progreso.page.scss'],
})
export class HistorialProgresoPage implements OnInit {

  historial: any[] = [];
  idCliente: number = 33; // 🔥 ID del cliente (simulado o real)

  // 📸 Modal para ampliar imagen
  imagenSeleccionada: string | null = null;
  @ViewChild(IonModal) modal!: IonModal;

  // 🔥 Gráfico de evolución de peso (línea)
  lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Evolución de Peso',
        fill: true,
        tension: 0.4,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        pointBackgroundColor: '#2e7d32',
        pointBorderColor: '#1b5e20',
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  lineChartType: ChartType = 'line';

  // 🔥 Gráfico de pastel (avance)
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Avance', 'Restante'],
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#4CAF50', '#e0e0e0'],
    }]
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  pieChartType: ChartType = 'pie';

  // 🔥 Variables para cálculo de avance
  pesoInicial: number = 0;
  pesoActual: number = 0;
  porcentajeAvance: number = 0;

  // 📸 Variables para formulario de subida
  pesoInput: number = 0;
  imagenSeleccionadaArchivo: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarHistorial();
    this.cargarPesos();
  }

  // 🔥 Cargar historial para gráfico de línea y galería
  cargarHistorial() {
    this.http.get<any[]>(`http://localhost:3000/api/historial-progreso/${this.idCliente}`)
      .subscribe({
        next: (res) => {
          this.historial = res;
          this.lineChartData.labels = res.map(item => this.formatearFecha(item.fecha));
          this.lineChartData.datasets[0].data = res.map(item => item.peso);
        },
        error: (err) => {
          console.error('Error cargando historial:', err);
        }
      });
  }

  // 🔥 Cargar peso inicial y actual
  cargarPesos() {
    this.http.get<any>(`http://localhost:3000/api/peso-inicial/${this.idCliente}`).subscribe({
      next: (res) => {
        this.pesoInicial = res.peso_inicial;
        this.verificarDatos();
      },
      error: (err) => {
        console.error('Error obteniendo peso inicial:', err);
      }
    });

    this.http.get<any>(`http://localhost:3000/api/peso-actual/${this.idCliente}`).subscribe({
      next: (res) => {
        this.pesoActual = res.peso_actual;
        this.verificarDatos();
      },
      error: (err) => {
        console.error('Error obteniendo peso actual:', err);
      }
    });
  }

  // 🔥 Verificar si ambos pesos fueron cargados
  verificarDatos() {
    if (this.pesoInicial > 0 && this.pesoActual > 0) {
      this.calcularAvance();
    }
  }

  // 🔥 Calcular el avance en porcentaje
  calcularAvance() {
    const diferencia = this.pesoInicial - this.pesoActual;
    this.porcentajeAvance = (diferencia / this.pesoInicial) * 100;

    this.pieChartData.datasets[0].data = [
      parseFloat(this.porcentajeAvance.toFixed(1)), 
      parseFloat((100 - this.porcentajeAvance).toFixed(1))
    ];
  }

  // 📸 Abrir imagen en modal
  abrirImagen(url: string) {
    this.imagenSeleccionada = url;
    this.modal.present();
  }

  cerrarImagen() {
    this.modal.dismiss();
    this.imagenSeleccionada = null;
  }

  // 🔥 Formatear fechas para que se vean bonitas
  formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  // 📤 Captura imagen del input
  seleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.imagenSeleccionadaArchivo = archivo;
    }
  }

  // 📤 Subir imagen + peso al backend
  subirProgreso() {
    if (!this.pesoInput || !this.imagenSeleccionadaArchivo) {
      alert('Debe ingresar el peso y seleccionar una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('id_cliente', this.idCliente.toString());
    formData.append('peso', this.pesoInput.toString());
    formData.append('imagen', this.imagenSeleccionadaArchivo);

    this.http.post('http://localhost:3000/api/subir-foto-progreso', formData)

      .subscribe({
        next: () => {
          alert('✅ Progreso subido con éxito');
          this.pesoInput = 0;
          this.imagenSeleccionadaArchivo = null;
          this.cargarHistorial();
          this.cargarPesos();
        },
        error: (err) => {
          console.error('❌ Error registrando progreso:', err);
          alert('Ocurrió un error al subir el progreso');
        }
      });
  }
}
