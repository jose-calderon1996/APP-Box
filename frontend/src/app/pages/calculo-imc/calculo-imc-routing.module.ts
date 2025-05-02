import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculoImcPage } from './calculo-imc.page';

const routes: Routes = [
  {
    path: '',
    component: CalculoImcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculoImcPageRoutingModule {}
