import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AstronautsPage } from './astronauts.page';

const routes: Routes = [
  {
    path: '',
    component: AstronautsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstronautsPageRoutingModule {}
