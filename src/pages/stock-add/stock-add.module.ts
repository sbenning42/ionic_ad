import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockAddPage } from './stock-add';

@NgModule({
  declarations: [
    StockAddPage,
  ],
  imports: [
    IonicPageModule.forChild(StockAddPage),
  ],
})
export class StockAddPageModule {}
