import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisRutinasPage } from './mis-rutinas.page';

const routes: Routes = [
  {
    path: '',
    component: MisRutinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisRutinasPageRoutingModule {}
