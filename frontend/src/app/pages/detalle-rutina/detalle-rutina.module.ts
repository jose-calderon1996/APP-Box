import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleRutinaPageRoutingModule } from './detalle-rutina-routing.module';

import { DetalleRutinaPage } from './detalle-rutina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleRutinaPageRoutingModule
  ],
  declarations: [DetalleRutinaPage]
})
export class DetalleRutinaPageModule {}
