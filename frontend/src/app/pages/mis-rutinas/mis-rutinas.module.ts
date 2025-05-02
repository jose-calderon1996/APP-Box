import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisRutinasPageRoutingModule } from './mis-rutinas-routing.module';

import { MisRutinasPage } from './mis-rutinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisRutinasPageRoutingModule
  ],
  declarations: [MisRutinasPage]
})
export class MisRutinasPageModule {}
