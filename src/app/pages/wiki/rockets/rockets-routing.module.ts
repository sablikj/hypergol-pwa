import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RocketsPage } from './rockets.page';

const routes: Routes = [
  {
    path: '',
    component: RocketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RocketsPageRoutingModule {}
