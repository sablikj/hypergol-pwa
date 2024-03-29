import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenciesPage } from './agencies.page';

const routes: Routes = [
  {
    path: '',
    component: AgenciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciesPageRoutingModule {}
