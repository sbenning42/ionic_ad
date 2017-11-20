import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { StockMasterPage } from './../stock-master/stock-master';
import { StockAddPage } from './../stock-add/stock-add';

import { StockModeProvider } from './../../providers/stock-mode/stock-mode';
import { ArticleProvider } from './../../providers/article/article';
import { Article } from './../../models/article';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the StockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  all = StockMasterPage;
  creation = StockMasterPage;
  pending = StockMasterPage;
  sold = StockMasterPage;
  add = StockAddPage;

  allCount: number;
  creationCount: number;
  soldsCount: number;

  mode$: Observable<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private articleProvider: ArticleProvider,
    private stockMode: StockModeProvider
  ) {
    this.mode$ = this.stockMode.getMode();
    this.articleProvider.getApiArticles({
      pageSize: 20,
      pageIndex: 0,
      sort: 'all'
    }).subscribe(
      response => {
        this.allCount = response.counts['all'];
        this.creationCount = response.counts['undefined'];
        this.soldsCount = response.counts['sold'];
      },
      error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.errors,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
  }

  changeStockMode() {
    this.stockMode.changeMode();
  }

}
