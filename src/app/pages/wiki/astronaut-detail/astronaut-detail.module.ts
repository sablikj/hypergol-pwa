import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstronautDetailPageRoutingModule } from './astronaut-detail-routing.module';

import { AstronautDetailPage } from './astronaut-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstronautDetailPageRoutingModule
  ],
  declarations: [AstronautDetailPage]
})
export class AstronautDetailPageModule {}
