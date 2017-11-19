import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockAllPage } from './stock-all';

@NgModule({
  declarations: [
    StockAllPage,
  ],
  imports: [
    IonicPageModule.forChild(StockAllPage),
  ],
})
export class StockAllPageModule {}
