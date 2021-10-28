import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaunchesPageRoutingModule } from './launches-routing.module';

import { LaunchesPage } from './launches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaunchesPageRoutingModule
  ],
  declarations: [LaunchesPage]
})
export class LaunchesPageModule {}
