import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryArticlePage } from './gallery-article';

@NgModule({
  declarations: [
    GalleryArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryArticlePage),
  ],
})
export class GalleryArticlePageModule {}
