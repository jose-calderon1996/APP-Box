import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexDataLabels,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-calculo-imc',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, NgApexchartsModule],
  templateUrl: './calculo-imc.page.html',
  styleUrls: ['./calculo-imc.page.scss'],
})
export class CalculoImcPage {
  peso: number = 0;
  estatura: number = 0;
  imc: number = 0;
  clasificacion: string = '';

  public chartOptions: ChartOptions = {
    series: [0],
    chart: {
      type: 'radialBar',
      height: 300, 
      offsetY: -20,
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: '60%' },
        dataLabels: {
          name: {
            show: true,
            fontSize: '16px'
          },
          value: {
            show: true,
            fontSize: '22px',
            formatter: (val: number) => `${val.toFixed(1)}`
          }
        }
      }
    },
    labels: ['IMC'],
    colors: ['#8884d8'],
    dataLabels: {
      enabled: true
    }
  };

  calcularIMC() {
    if (!this.peso || !this.estatura || this.estatura <= 0) {
      alert('Por favor ingresa peso y estatura válidos');
      return;
    }

    const estaturaM = this.estatura / 100;
    const imcCalculado = this.peso / (estaturaM * estaturaM);
    this.imc = Math.round(imcCalculado * 100) / 100;
    this.clasificacion = this.getClasificacion(this.imc);

    this.chartOptions.series = [this.imc];
    this.chartOptions.colors = [this.getColor(this.imc)];
  }

  getClasificacion(imc: number): string {
    if (imc < 18.5) return 'Bajo peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Sobrepeso';
    return 'Obesidad';
  }

  getColor(imc: number): string {
    if (imc < 18.5) return '#42a5f5'; // celeste
    if (imc < 24.9) return '#66bb6a'; // verde
    if (imc < 29.9) return '#ffa726'; // naranja
    return '#ef5350';                // rojo
  }
}
