import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchpadPageRoutingModule } from './scratchpad-routing.module';

import { ScratchpadPage } from './scratchpad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchpadPageRoutingModule
  ],
  declarations: [ScratchpadPage]
})
export class ScratchpadPageModule {}
