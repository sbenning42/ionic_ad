import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StockModeProvider } from './../../providers/stock-mode/stock-mode';
import { ArticleProvider } from './../../providers/article/article';
import { basePicturesApi } from './../../api/api';
import { Article } from './../../models/article';
import { StockAddPage } from '../stock-add/stock-add';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the StockAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-all',
  templateUrl: 'stock-all.html',
})
export class StockAllPage {

  articles: Article[];
  basePicturesApi = basePicturesApi;

  mode$: Observable<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private articleProvider: ArticleProvider,
    private stockMode: StockModeProvider
  ) {
    this.mode$ = this.stockMode.getMode();
    this.articleProvider.getApiArticles({
      pageSize: 20,
      pageIndex: 0,
      sort: 'all'
    }).subscribe(response => {
        this.articles = response.products.map(product => {
          const article = new Article(
            product.id,
            product.user_id,
            product.name,
            product.description,
            product.price
          );
          article.attach(product['pictures']);
          article.computeIcon(product['state'], product['marketplaces']);
          return article;
        });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockAllPage');
  }

  details(article: Article) {
    console.log('Must show details for ' + article.name);
  }

}
