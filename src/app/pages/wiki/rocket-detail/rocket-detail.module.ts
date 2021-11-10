import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RocketDetailPageRoutingModule } from './rocket-detail-routing.module';
import { RocketDetailPage } from './rocket-detail.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    RocketDetailPageRoutingModule
  ],
  declarations: [RocketDetailPage]
})
export class RocketDetailPageModule { }
