import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearRutinaPage } from './crear-rutina.page';

const routes: Routes = [
  {
    path: '',
    component: CrearRutinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearRutinaPageRoutingModule {}
