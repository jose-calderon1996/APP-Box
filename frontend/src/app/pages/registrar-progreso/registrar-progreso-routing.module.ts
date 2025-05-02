import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarProgresoPage } from './registrar-progreso.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarProgresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarProgresoPageRoutingModule {}
