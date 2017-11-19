import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StockAllPage } from './../stock-all/stock-all';
import { StockCreationPage } from './../stock-creation/stock-creation';
import { StockPendingPage } from './../stock-pending/stock-pending';
import { StockSoldPage } from './../stock-sold/stock-sold';

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

  all = StockAllPage;
  creation = StockCreationPage;
  pending = StockPendingPage;
  sold = StockSoldPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
  }

}
