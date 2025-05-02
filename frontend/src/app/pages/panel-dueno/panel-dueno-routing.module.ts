import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelDuenoPage } from './panel-dueno.page';

const routes: Routes = [
  {
    path: '',
    component: PanelDuenoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelDuenoPageRoutingModule {}
