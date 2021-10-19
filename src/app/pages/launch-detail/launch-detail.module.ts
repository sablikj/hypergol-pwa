import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaunchDetailPageRoutingModule } from './launch-detail-routing.module';

import { LaunchDetailPage } from './launch-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaunchDetailPageRoutingModule
  ],
  declarations: [LaunchDetailPage]
})
export class LaunchDetailPageModule {}
