import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarTransbankPageRoutingModule } from './pagar-transbank-routing.module';

import { PagarTransbankPage } from './pagar-transbank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarTransbankPageRoutingModule
  ],
  declarations: [PagarTransbankPage]
})
export class PagarTransbankPageModule {}
