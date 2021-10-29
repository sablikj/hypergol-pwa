import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RocketDetailPage } from './rocket-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RocketDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RocketDetailPageRoutingModule {}
