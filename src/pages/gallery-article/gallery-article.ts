import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ModalContactPage } from './../modal-contact/modal-contact';
import { AnnexeProvider } from './../../providers/annexe/annexe';
import { basePicturesApi } from './../../api/api';
import { Article } from './../../models/article';

/**
 * Generated class for the GalleryArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery-article',
  templateUrl: 'gallery-article.html',
})
export class GalleryArticlePage {

  isPreview: boolean;
  article: Article;
  basePicturesApi = basePicturesApi;

  annexeSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private annexeProvider: AnnexeProvider
  ) {
    this.article = this.navParams.data.article;
    if (!(this.isPreview = this.navParams.data.preview)) {
      this.annexeSubscribe();
    }
  }

  annexeSubscribe() {
    if (this.annexeSubscription) { this.annexeSubscription.unsubscribe(); }
    this.annexeSubscription = this.annexeProvider.get().subscribe(
      response => this.annexeArticle(response),
      error => this.alertError(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryArticlePage');
  }

  annexeArticle(annexe) {
    if (!this.article.alreadyAnnexed) {
      console.log('Not already annexed');
      this.article.annexeFromAnnexe(annexe);
    }
  }

  alertError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error.errors,
      buttons: ['OK']
    });
    alert.present();
  }

  contact() {
    this.navCtrl.push(ModalContactPage, { owner: this.article.owner });
  }

}
