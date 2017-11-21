import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ModalContactPage } from './../modal-contact/modal-contact';
import { GalleryArticlePage } from './../gallery-article/gallery-article';
import { basePicturesApi } from './../../api/api';
import { SharedModeProvider } from './../../providers/shared-mode/shared-mode';
import { ArticleProvider } from './../../providers/article/article';
import { Article } from './../../models/article';

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
  articlesSubscription: Subscription;

  mode$: Observable<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private articleProvider: ArticleProvider,
    private sharedMode: SharedModeProvider
  ) {
    this.initThis();
    this.articlePageSubscribe(this.makeInitialSream());
  }

  doInfinite(infiniteScroll) {
    this.articlePageSubscribe(this.makeInfiniteSream(infiniteScroll));
  }

  initThis() {
    this.articles = [];
    this.pageSize = 20;
    this.pageIndex = 0;
    this.loaded = 0;
    this.originalCount = 0;
    this.mode$ = this.sharedMode.getMode();
  }

  makeStream(): Observable<any> {
    return this.articleProvider.getApiSharedArticles({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
    });
  }

  makeInitialSream(): Observable<any> {
    return this.makeStream().do(response => this.initCount(response.count));
  }

  makeInfiniteSream(infiniteScroll): Observable<any> {
    return this.makeStream().do(response => infiniteScroll.complete());
  }

  articlePageSubscribe(stream$: Observable<any>) {
    if (this.articlesSubscription) { this.articlesSubscription.unsubscribe(); }
    this.articlesSubscription = stream$.subscribe(
        response => this.cloneProducts(response),
        error => this.alertError(error),
        () => this.nextPage());
  }

  initCount(count: number) {
    this.originalCount = count;
    this.count = count;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  details(article: Article) {
    this.navCtrl.push(GalleryArticlePage, {
      article: article
    });
  }

  changeGalleryMode() {
    this.sharedMode.changeMode();
  }

  contact(article) {
    this.navCtrl.push(ModalContactPage, { owner: article.owner });
  }

}
