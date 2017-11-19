import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockCreationPage } from './stock-creation';

@NgModule({
  declarations: [
    StockCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(StockCreationPage),
  ],
})
export class StockCreationPageModule {}
