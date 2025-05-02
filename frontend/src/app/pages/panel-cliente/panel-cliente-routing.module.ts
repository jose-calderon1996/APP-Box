import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelClientePage } from './panel-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: PanelClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelClientePageRoutingModule {}
