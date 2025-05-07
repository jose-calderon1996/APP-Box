// 🔰 Registramos los componentes de Chart.js
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-historial-progreso',
  standalone: true,
  imports: [CommonModule, IonicModule, BaseChartDirective],
  templateUrl: './historial-progreso.page.html',
  styleUrls: ['./historial-progreso.page.scss'],
})
export class HistorialProgresoPage implements OnInit {

  historial: any[] = [];
  idCliente: number | null = null;

  // 🖼️ Imagen seleccionada para ampliar en modal
  imagenSeleccionada: string | null = null;
  @ViewChild(IonModal) modal!: IonModal;

  // 📈 Configuración del gráfico de línea (evolución de peso)
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

  // 🥧 Configuración del gráfico de pastel (avance hacia la meta)
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

  pesoInicial: number = 0;
  pesoActual: number = 0;
  porcentajeAvance: number = 0;

  constructor(
    private apiService: ApiService
  ) {}

  // ✅ Se ejecuta al iniciar la vista
  ngOnInit() {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.idCliente = Number(id_usuario);
      console.log('🟢 ID Cliente logueado:', this.idCliente);
      this.cargarHistorial();
      this.cargarPesos();
    } else {
      console.warn('⚠️ No hay cliente logueado en el localStorage');
    }
  }
  

  // 🔃 Obtiene el historial del progreso desde el backend
  cargarHistorial() {
    this.apiService.get(`historial-progreso/${this.idCliente}`)
      .then((res) => {
        console.log('📦 Historial recibido:', res); // DEBUG
        this.historial = res;
        this.lineChartData.labels = res.map((item: any) => this.formatearFecha(item.fecha));
        this.lineChartData.datasets[0].data = res.map((item: any) => item.peso);
      })
      .catch((err) => {
        console.error('❌ Error cargando historial:', err);
      });
  }

  // ⚖️ Obtiene peso inicial y actual para calcular avance
  cargarPesos() {
    this.apiService.get(`peso-inicial/${this.idCliente}`)
      .then((res) => {
        this.pesoInicial = res.peso_inicial;
        this.verificarDatos();
      })
      .catch((err) => {
        console.error('❌ Error obteniendo peso inicial:', err);
      });

    this.apiService.get(`peso-actual/${this.idCliente}`)
      .then((res) => {
        this.pesoActual = res.peso_actual;
        this.verificarDatos();
      })
      .catch((err) => {
        console.error('❌ Error obteniendo peso actual:', err);
      });
  }

  // 🧮 Verifica si ya se tienen ambos pesos para calcular avance
  verificarDatos() {
    if (this.pesoInicial > 0 && this.pesoActual > 0) {
      this.calcularAvance();
    }
  }

  // 📊 Calcula el porcentaje de avance y actualiza el gráfico de pastel
  calcularAvance() {
    const diferencia = this.pesoInicial - this.pesoActual;
    this.porcentajeAvance = (diferencia / this.pesoInicial) * 100;

    this.pieChartData.datasets[0].data = [
      parseFloat(this.porcentajeAvance.toFixed(1)),
      parseFloat((100 - this.porcentajeAvance).toFixed(1))
    ];
  }

  // 🖼️ Abre el modal para mostrar la imagen grande
  abrirImagen(url: string) {
    this.imagenSeleccionada = url;
    this.modal.present();
  }

  // ❌ Cierra el modal de la imagen
  cerrarImagen() {
    this.modal.dismiss();
    this.imagenSeleccionada = null;
  }

  // 🧾 Formatea fecha ISO a formato chileno dd/MM/yyyy
  formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
}
