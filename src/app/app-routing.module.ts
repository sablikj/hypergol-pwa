import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'launches/:id',
    loadChildren: () => import('./pages/launch-detail/launch-detail.module').then(m => m.LaunchDetailPageModule)
  },
  {
    path: 'launches',
    loadChildren: () => import('./pages/wiki/launches/launches.module').then(m => m.LaunchesPageModule)
  },
  {
    path: 'rockets',
    loadChildren: () => import('./pages/wiki/rockets/rockets.module').then(m => m.RocketsPageModule)
  },
  {
    path: 'rockets/:id',
    loadChildren: () => import('./pages/wiki/rocket-detail/rocket-detail.module').then(m => m.RocketDetailPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
