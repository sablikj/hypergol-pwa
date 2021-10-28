import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RocketsPageRoutingModule } from './rockets-routing.module';

import { RocketsPage } from './rockets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RocketsPageRoutingModule
  ],
  declarations: [RocketsPage]
})
export class RocketsPageModule {}
