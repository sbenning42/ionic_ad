import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { basePicturesApi } from './../../api/api';
import { User } from './../../models/user';

/**
 * Generated class for the ModalContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-contact',
  templateUrl: 'modal-contact.html',
})
export class ModalContactPage {

  contact: User;
  basePicturesApi = basePicturesApi;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contact = this.navParams.data.owner;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContactPage');
  }

    dismiss() {
    this.navCtrl.pop();
  }

}
