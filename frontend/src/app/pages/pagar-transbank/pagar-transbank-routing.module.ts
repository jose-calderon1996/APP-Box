import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarTransbankPage } from './pagar-transbank.page';

const routes: Routes = [
  {
    path: '',
    component: PagarTransbankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarTransbankPageRoutingModule {}
