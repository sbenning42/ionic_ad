import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockSoldPage } from './stock-sold';

@NgModule({
  declarations: [
    StockSoldPage,
  ],
  imports: [
    IonicPageModule.forChild(StockSoldPage),
  ],
})
export class StockSoldPageModule {}
