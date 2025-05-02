import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelClientePageRoutingModule } from './panel-cliente-routing.module';

import { PanelClientePage } from './panel-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelClientePageRoutingModule
  ],
  declarations: [PanelClientePage]
})
export class PanelClientePageModule {}
