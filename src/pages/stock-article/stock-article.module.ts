import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockArticlePage } from './stock-article';

@NgModule({
  declarations: [
    StockArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(StockArticlePage),
  ],
})
export class StockArticlePageModule {}
