import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEntrenadorPage } from './registro-entrenador.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEntrenadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEntrenadorPageRoutingModule {}
