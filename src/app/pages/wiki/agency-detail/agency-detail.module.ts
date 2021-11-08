import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencyDetailPageRoutingModule } from './agency-detail-routing.module';

import { AgencyDetailPage } from './agency-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgencyDetailPageRoutingModule
  ],
  declarations: [AgencyDetailPage]
})
export class AgencyDetailPageModule {}
