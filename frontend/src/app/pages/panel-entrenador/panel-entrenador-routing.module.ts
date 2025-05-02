import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelEntrenadorPage } from './panel-entrenador.page';

const routes: Routes = [
  {
    path: '',
    component: PanelEntrenadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelEntrenadorPageRoutingModule {}
