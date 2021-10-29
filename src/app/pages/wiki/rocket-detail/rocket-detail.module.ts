import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RocketDetailPageRoutingModule } from './rocket-detail-routing.module';

import { RocketDetailPage } from './rocket-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RocketDetailPageRoutingModule
  ],
  declarations: [RocketDetailPage]
})
export class RocketDetailPageModule {}
