import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstronautDetailPageRoutingModule } from './astronaut-detail-routing.module';

import { AstronautDetailPage } from './astronaut-detail.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    AstronautDetailPageRoutingModule
  ],
  declarations: [AstronautDetailPage]
})
export class AstronautDetailPageModule { }
