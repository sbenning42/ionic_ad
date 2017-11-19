import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountAddressePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-addresse',
  templateUrl: 'account-addresse.html',
})
export class AccountAddressePage {

  selectedAddress;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedAddress = navParams.get('address');
    console.log('got address: ' + JSON.stringify(this.selectedAddress));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountAddressePage');
  }

}
