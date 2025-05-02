import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialProgresoPageRoutingModule } from './historial-progreso-routing.module';

import { HistorialProgresoPage } from './historial-progreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialProgresoPageRoutingModule
  ],
  declarations: [HistorialProgresoPage]
})
export class HistorialProgresoPageModule {}
