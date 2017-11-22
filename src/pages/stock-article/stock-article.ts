import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { GalleryArticlePage } from './../gallery-article/gallery-article';
import { AnnexeProvider } from './../../providers/annexe/annexe';
import { ChannelsProvider } from './../../providers/channels/channels';
import { basePicturesApi, baseLogoApi } from './../../api/api';
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
    this.computeTemplatedChannel();
  }

  computeTemplatedChannel() {
    this.mkChannels = this.navParams.data.channels
      .filter(mkFilter => mkFilter.type === 1 || mkFilter.type === 3)
      .map(mkMap => new Channel(mkMap.name, baseLogoApi + mkMap.avatar, this.findMkStatus(mkMap)));
    this.feChannels = this.navParams.data.channels
      .filter(feFilter => feFilter.type === 2)
      .map(feMap => new Channel(feMap.name, baseLogoApi + feMap.avatar, this.findFeStatus(feMap)));
  }

  findMkStatus(channel: Channel) {
    const found = this.article.mkChannels.find(mk => mk.name === channel.name);
    return found ? found.statusName : '';
  }

  findFeStatus(channel: Channel) {
    const found = this.article.feChannels.find(mk => mk.name === channel.name);
    return found ? found.statusName : '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockArticlePage');
  }

  preview() {
    this.annexeProvider.get().subscribe(
      annexe => {
        this.article.annexeFromAnnexe(annexe);
        this.navCtrl.push(GalleryArticlePage, { article: this.article, preview: true });
      });
  }

  handlePublicationOn(channel) {
    this.channelsProvider.post(this.article, channel).subscribe(
      response => {
        this.article = Article.clone(response);
        console.log('Sold: ' + this.article.alreadySold);
        const i = this.navParams.data.fromPage.articles.findIndex(a => +a.id === +this.article.id);
        this.navParams.data.fromPage.articles[i] = this.article;
        this.computeTemplatedChannel();
      },
      error => this.alertError(error));
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

class Channel {

  icon: string;
  disabled: boolean;
  checked: boolean;

  constructor(
    public name: string,
    public logo: string,
    public status: string,
  ) {
    switch (status) {
      case 'To Do': {
        this.checked = true;
        this.disabled = false;
        break ;
      }
      case 'To Update': {
        this.checked = true;
        this.disabled = false;
        break ;
      }
      case 'Remove': {
        this.checked = false;
        this.disabled = false;
        break ;
      }
      case 'Online': {
        this.checked = true;
        this.disabled = false;
        break ;
      }
      case 'Sold': {
        this.checked = true;
        this.disabled = true;
        break ;
      }
      case '': {
        this.checked = false;
        this.disabled = false;
        break ;
      }
      default: {
        this.checked = false;
        this.disabled = true;
        break ;
      }
      
    }
  }
}