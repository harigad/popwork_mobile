import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapperPage } from './mapper.page';

const routes: Routes = [
  {
    path: '',
    component: MapperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapperPageRoutingModule {}
