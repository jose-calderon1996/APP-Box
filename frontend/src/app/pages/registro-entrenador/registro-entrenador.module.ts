import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEntrenadorPageRoutingModule } from './registro-entrenador-routing.module';

import { RegistroEntrenadorPage } from './registro-entrenador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEntrenadorPageRoutingModule
  ],
  declarations: [RegistroEntrenadorPage]
})
export class RegistroEntrenadorPageModule {}
