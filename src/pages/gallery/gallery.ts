import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { sharedApi, basePicturesApi } from './../../api/api';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private articleProvider: ArticleProvider
  ) {
    this.articleProvider.getApiSharedArticles({
      pageSize: 20,
      pageIndex: 0
    }).subscribe(
      response => {
        this.articles = response.products.map(product => {
          const article = new Article(
            product.id,
            product.user_id,
            product.name,
            product.description,
            product.price
          );
          article.attach(product['pictures']);
          article.owner(product['user']);
          return article;
      })},
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
    console.log('ionViewDidLoad GalleryPage');
  }

}
