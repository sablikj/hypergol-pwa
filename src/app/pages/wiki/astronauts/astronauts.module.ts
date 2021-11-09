import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstronautsPageRoutingModule } from './astronauts-routing.module';

import { AstronautsPage } from './astronauts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstronautsPageRoutingModule
  ],
  declarations: [AstronautsPage]
})
export class AstronautsPageModule {}
