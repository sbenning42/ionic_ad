import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccountAddressePage } from './../account-addresse/account-addresse';

/**
 * Generated class for the AccountAddressesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-addresses',
  templateUrl: 'account-addresses.html',
})
export class AccountAddressesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountAddressesPage');
  }

  addressTapped(event, address) {
    this.navCtrl.push(AccountAddressePage, {
      address: address
    });
  }

}
