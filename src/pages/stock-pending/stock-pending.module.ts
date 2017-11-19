import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockPendingPage } from './stock-pending';

@NgModule({
  declarations: [
    StockPendingPage,
  ],
  imports: [
    IonicPageModule.forChild(StockPendingPage),
  ],
})
export class StockPendingPageModule {}
