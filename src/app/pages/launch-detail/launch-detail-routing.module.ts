import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaunchDetailPage } from './launch-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LaunchDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchDetailPageRoutingModule {}
