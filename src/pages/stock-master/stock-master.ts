import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { StockArticlePage } from './../stock-article/stock-article';
import { ArticlesStorageProvider } from './../../providers/articles-storage/articles-storage';
import { ChannelsProvider } from './../../providers/channels/channels';
import { StockModeProvider } from './../../providers/stock-mode/stock-mode';
import { ArticleProvider } from './../../providers/article/article';
import { basePicturesApi } from './../../api/api';
import { Article } from './../../models/article';
import { StockAddPage } from '../stock-add/stock-add';

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

  channels: any[];
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
    private channelsProvider: ChannelsProvider,
    private stockMode: StockModeProvider,
    private articleStorage: ArticlesStorageProvider
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
    this.articleStorage.reset(this.sort);
  }

  makeStream(): Observable<Article[]> {
    return this.channelsProvider.get()
      .switchMap(channels => {
        this.channels = channels;
        return this.articleProvider.getApiArticles({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        sort: this.sort
      });
    });
  }

  makeInfiniteStream(infiniteScroll): Observable<any> {
    return this.makeStream().do(response => infiniteScroll.complete());
  }

  articlePageSubscribe(stream$: Observable<Article[]>) {
    if (this.articlesSubscription) { this.articlesSubscription.unsubscribe(); }
    this.articlesSubscription = stream$.subscribe(
        response => this.cloneProducts(response),
        error => this.alertError(error),
        () => this.nextPage());
  }

  cloneProducts(response) {
    console.log(response);
    this.articles = this.articles.concat(response.products.map(product => Article.clone(product)));
    //this.articles = response;
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
    this.articleStorage.nextPage();
  }

  details(article: Article) {
    this.navCtrl.push(StockArticlePage, {
      article: article,
      channels: this.channels,
      fromPage: this
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockMasterPage');
  }

}
