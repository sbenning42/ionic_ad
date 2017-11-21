import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { GalleryArticlePage } from './../gallery-article/gallery-article';
import { AnnexeProvider } from './../../providers/annexe/annexe';
import { ChannelsProvider } from './../../providers/channels/channels';
import { basePicturesApi } from './../../api/api';
import { Article } from './../../models/article';

/**
 * Generated class for the StockArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-article',
  templateUrl: 'stock-article.html',
})
export class StockArticlePage {

  article: Article;
  feChannels: any[];
  mkChannels: any[];

  basePicturesApi = basePicturesApi;

  status: { [key: string]: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private annexeProvider: AnnexeProvider,
    private channelsProvider: ChannelsProvider
  ) {
    this.article = this.navParams.data.article;
    this.channelsProvider.get().subscribe(
      response => {
        this.mkChannels = response.filter(mkFilter => mkFilter.type === 1);
        this.feChannels = response.filter(feFilter => feFilter.type === 2);
        this.mkChannels.forEach(mk => {
          const mkFound = this.article.mkChannels.find(mkc => mkc.name === mk.name);
          status[mk.name] = mkFound.statusName;
        });
      },
      errors => this.alertError(errors)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockArticlePage');
  }

  preview() {
    this.annexeProvider.get().subscribe(
      annexe => {
        this.article.annexeFromAnnexe(annexe);
        this.navCtrl.push(GalleryArticlePage, { article: this.article, preview: true });
      }
    )
  }

  alertError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error.errors,
      buttons: ['OK']
    });
    alert.present();
  }

}
