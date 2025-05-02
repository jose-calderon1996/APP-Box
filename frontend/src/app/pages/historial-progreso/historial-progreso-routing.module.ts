import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialProgresoPage } from './historial-progreso.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialProgresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialProgresoPageRoutingModule {}
