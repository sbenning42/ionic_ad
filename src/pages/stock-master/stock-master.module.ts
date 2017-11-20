import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockMasterPage } from './stock-master';

@NgModule({
  declarations: [
    StockMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(StockMasterPage),
  ],
})
export class StockMasterPageModule {}
