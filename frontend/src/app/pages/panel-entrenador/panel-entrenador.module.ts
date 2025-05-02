import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelEntrenadorPageRoutingModule } from './panel-entrenador-routing.module';

import { PanelEntrenadorPage } from './panel-entrenador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelEntrenadorPageRoutingModule
  ],
  declarations: [PanelEntrenadorPage]
})
export class PanelEntrenadorPageModule {}
