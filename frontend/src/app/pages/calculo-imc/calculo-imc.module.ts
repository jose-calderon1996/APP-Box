import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculoImcPageRoutingModule } from './calculo-imc-routing.module';

import { CalculoImcPage } from './calculo-imc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculoImcPageRoutingModule
  ],
  declarations: [CalculoImcPage]
})
export class CalculoImcPageModule {}
