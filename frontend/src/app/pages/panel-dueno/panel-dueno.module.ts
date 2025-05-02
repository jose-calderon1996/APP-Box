import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelDuenoPageRoutingModule } from './panel-dueno-routing.module';

import { PanelDuenoPage } from './panel-dueno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelDuenoPageRoutingModule
  ],
  declarations: [PanelDuenoPage]
})
export class PanelDuenoPageModule {}
