import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaunchesPage } from './launches.page';

const routes: Routes = [
  {
    path: '',
    component: LaunchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchesPageRoutingModule {}
