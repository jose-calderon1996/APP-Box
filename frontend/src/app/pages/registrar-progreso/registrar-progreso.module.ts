import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarProgresoPageRoutingModule } from './registrar-progreso-routing.module';

import { RegistrarProgresoPage } from './registrar-progreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarProgresoPageRoutingModule
  ],
  declarations: [RegistrarProgresoPage]
})
export class RegistrarProgresoPageModule {}
