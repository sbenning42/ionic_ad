import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { sharedApi, basePicturesApi } from './../../api/api';
import { SharedModeProvider } from './../../providers/shared-mode/shared-mode';
import { ArticleProvider } from './../../providers/article/article';
import { Article } from './../../models/article';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  articles: Article[];
  basePicturesApi = basePicturesApi;

  originalCount: number;
  count: number;
  loaded: number;
  pageIndex: number;
  pageSize: number;

  articlesStream$: Observable<any>;

  mode$: Observable<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private articleProvider: ArticleProvider,
    private sharedMode: SharedModeProvider
  ) {
    this.mode$ = this.sharedMode.getMode();
    this.articles = [];
    this.pageSize = 20;
    this.pageIndex = 0;
    this.loaded = 0;
    this.originalCount = 0;
    this.makeStream({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    });
    const next = response => {
      this.originalCount = response.count;
      this.count = this.originalCount;
      this.cloneProducts(response);
    };
    const error = error => this.alertError(error);
    const complete = () => {
      this.pageIndex += 1;
      this.count -= this.pageSize;
      this.loaded += this.pageSize;
      if (this.loaded > this.originalCount) { this.loaded = this.originalCount; }
    };
    this.articlesStream$.subscribe(next, error, complete);
  }

  makeStream(pageOptions) {
    this.articlesStream$ = this.articleProvider.getApiSharedArticles(pageOptions);
  }

  cloneProducts(response) {
    this.articles = this.articles.concat(response.products.map(product => Article.clone(product)));
  }

  alertError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error.errors,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  doInfinite(infiniteScroll) {
    this.makeStream({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    });
    const next = response => this.cloneProducts(response);
    const error = error => {
      this.alertError(error);
      infiniteScroll.complete();
    };
    const complete = () => {
      this.pageIndex += 1;
      this.count -= this.pageSize;
      this.loaded += this.pageSize;
      if (this.loaded > this.originalCount) { this.loaded = this.originalCount; }
      infiniteScroll.complete();
    };
    this.articlesStream$.subscribe(next, error, complete);
  }

  changeGalleryMode() {
    this.sharedMode.changeMode();
  }

}
