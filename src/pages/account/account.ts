import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccountAddressesPage } from './../account-addresses/account-addresses';
import { AccountAvatarPage } from './../account-avatar/account-avatar';
import { AccountChannelsPage } from './../account-channels/account-channels';
import { AccountInformationsPage } from './../account-informations/account-informations';
import { AccountProfilePage } from './../account-profile/account-profile';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  addresses = AccountAddressesPage;
  avatar = AccountAvatarPage;
  channels = AccountChannelsPage;
  informations = AccountInformationsPage;
  profile = AccountProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
