import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencyDetailPage } from './agency-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AgencyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyDetailPageRoutingModule {}
