import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { StockModeProvider } from './../../providers/stock-mode/stock-mode';
import { ArticleProvider } from './../../providers/article/article';
import { basePicturesApi } from './../../api/api';
import { Article } from './../../models/article';
import { StockAddPage } from '../stock-add/stock-add';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the StockMasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-master',
  templateUrl: 'stock-master.html',
})
export class StockMasterPage {

  articles: Article[];
  articlesSubscription: Subscription;
  mode$: Observable<string>;
  basePicturesApi = basePicturesApi;
  loaded: number;
  originalCount: number;
  count: number;
  pageSize: number;
  pageIndex: number;
  sort: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private articleProvider: ArticleProvider,
    private stockMode: StockModeProvider
  ) {
    this.initThis();
    this.articlePageSubscribe(this.makeStream());
  }

  doInfinite(infiniteScroll) {
    this.articlePageSubscribe(this.makeInfiniteStream(infiniteScroll));
  }

  initThis() {
    this.articles = [];
    this.loaded = 0;
    this.pageIndex = 0;
    this.pageSize = 20;
    this.sort = this.navParams.data.sort;
    this.originalCount = this.navParams.data.count;
    this.count = this.originalCount;
    this.mode$ = this.stockMode.getMode();
  }

  makeStream(): Observable<any> {
    return this.articleProvider.getApiArticles({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      sort: this.sort
    });
  }

  makeInfiniteStream(infiniteScroll): Observable<any> {
    return this.makeStream().do(response => infiniteScroll.complete());
  }

  articlePageSubscribe(stream$: Observable<any>) {
    if (this.articlesSubscription) { this.articlesSubscription.unsubscribe(); }
    this.articlesSubscription = stream$.subscribe(
        response => this.cloneProducts(response),
        error => this.alertError(error),
        () => this.nextPage());
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

  nextPage() {
    this.pageIndex += 1;
    this.count -= this.pageSize;
    this.loaded += this.pageSize;
    if (this.loaded > this.originalCount) { this.loaded = this.originalCount; }
  }

  details(article: Article) {
    console.log('Must show details for ' + article.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockMasterPage');
  }

}
